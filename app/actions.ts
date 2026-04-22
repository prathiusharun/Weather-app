"use server";


import prisma from "@/prisma/prisma";
import { revalidatePath } from "next/cache";

const weatherCache: Record<string, { data: any; timestamp: number }> = {};

// --- 1. The Add City Action ---
export async function addCity(formData: FormData) {
  const city = formData.get("city") as string;
  const API_KEY = process.env.OPENWEATHER_API_KEY;

  try {
   const cacheKey = city.toLowerCase();
   const cached = weatherCache[cacheKey];

// 30 seconds cache
if (cached && Date.now() - cached.timestamp < 30000) {
  console.log("Using cached data");
  var data = cached.data;
} else {
  console.log("Fetching from API");

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  );

  const freshData = await res.json();
  if (!res.ok) throw new Error("City not found");

  weatherCache[cacheKey] = {
    data: freshData,
    timestamp: Date.now(),
  };

  var data = freshData;
}

 const existing = await prisma.savedCity.findUnique({
  where: { name: data.name },
});
    let updated = false;

if (
  existing &&
  existing.temp === Math.round(data.main.temp) &&
  existing.condition === (data.weather[0].main || "Clear")
) {
  console.log("Skipping DB write (no change)");
} else {
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
      condition: data.weather[0].main || "Clear",
    },
  });

  updated = true;
}

// 👇 ONLY revalidate if needed
if (updated) {
  revalidatePath("/");
}
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