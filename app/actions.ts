"use server";


import prisma from "@/prisma/prisma";
import { revalidatePath } from "next/cache";

// --- 1. The Add City Action ---
export async function addCity(formData: FormData) {
  const city = formData.get("city") as string;
  const API_KEY = process.env.OPENWEATHER_API_KEY;

  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
    const data = await res.json();
    if (!res.ok) throw new Error("City not found");

    await prisma.savedCity.upsert({
      where: { name: data.name },
      update: {
        temp: Math.round(data.main.temp),
        condition: data.weather[0].main || "Clear",
      },
      create: {
        name: data.name,
        country: data.sys.country,
        lat: data.coord.lat,
        lon: data.coord.lon,
        temp: Math.round(data.main.temp),
        condition: data.weather[0].main || "CLear",
      },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Action Error:", error);
    return { success: false };
  }
}

// --- 2. The Missing Delete Action ---
// Add this exact block below addCity
export async function deleteCity(id: string) {
  try {
    await prisma.savedCity.delete({
      where: { id },
    });
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Delete Error:", error);
    return { success: false };
  }
}