"use server";

import prisma from "@/prisma/prisma";
import { revalidatePath } from "next/cache";

// 🔹 Background updater (non-blocking)
async function refreshWeather(city: string) {
  const API_KEY = process.env.OPENWEATHER_API_KEY;

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`,
      {
        next: { revalidate: 600 },
      }
    );

    const data = await res.json();
    if (!res.ok) return;

    await prisma.savedCity.update({
      where: { name: data.name },
      data: {
        country: data.sys.country,
        lat: data.coord.lat,
        lon: data.coord.lon,
        temp: Math.round(data.main.temp),
        condition: data.weather[0].main || "Clear",
      },
    });

    revalidatePath("/");
  } catch (e) {
    console.error("Background update failed", e);
  }
}

// 🔹 Add City (FAST response)
export async function addCity(formData: FormData) {
  const city = formData.get("city") as string;

  try {
    // 1. Check DB first
    const existing = await prisma.savedCity.findUnique({
      where: { name: city },
    });

    // 2. If exists → return instantly
    if (existing) {
      refreshWeather(city); // async
      return ;
    }

    // 3. Create placeholder instantly
    await prisma.savedCity.create({
      data: {
        name: city,
        country: "Loading...",
        lat: 0,
        lon: 0,
        temp: null,
        condition: "Fetching...",
      },
    });

    // 4. Background update
    refreshWeather(city);

    revalidatePath("/");
    return ;

  } catch (error) {
    console.error("Action Error:", error);
    return ;
  }
}

// 🔹 Delete City
export async function deleteCity(formData: FormData) {
  const id = formData.get("id") as string;

  try {
    await prisma.savedCity.delete({
      where: { id },
    });

    revalidatePath("/");
    return;

  } catch (error) {
    console.error("Delete Error:", error);
    return ;
  }
}