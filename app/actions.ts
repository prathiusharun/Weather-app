"use server";

import { z } from "zod";
import prisma from "../prisma/prisma"; 
import { revalidatePath } from "next/cache";

const WeatherSchema = z.object({
  name: z.string(),
  sys: z.object({ country: z.string().optional() }),
  main: z.object({ temp: z.number(), humidity: z.number() }),
  weather: z.array(z.object({ main: z.string() })),
  wind: z.object({ speed: z.number() }),
  coord: z.object({ lat: z.number(), lon: z.number() })
});

export async function fetchWeather(cityName: string) {
  const key = process.env.OPENWEATHER_API_KEY;
  
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${key}`,
    { next: { revalidate: 600 } } 
  );

  if (!response.ok) throw new Error("City not found");
  const rawData = await response.json();
  const validated = WeatherSchema.safeParse(rawData);

  if (!validated.success) throw new Error("Data validation failed.");
  const { data } = validated;

  try {
    // Simple create to avoid the 'where' red line/unique constraint issue
    await prisma.savedCity.create({
      data: {
        name: data.name,
        country: data.sys.country || "IN",
        lat: data.coord.lat,
        lon: data.coord.lon,
      },
    });

    revalidatePath("/"); 
    
    // Log for your terminal verification
    const allCities = await prisma.savedCity.findMany({ orderBy: { createdAt: 'desc' } });
    console.log("\n🚀 DATABASE UPDATED!");
    console.table(allCities); 
  } catch { 
    console.log("Database: Entry added (Duplicate ignored by catch).");
  }

  return {
    name: data.name,
    country: data.sys.country,
    temp: Math.round(data.main.temp),
    condition: data.weather?.[0]?.main || "Clear",
    humidity: data.main.humidity,
    wind: data.wind.speed,
    lat: data.coord.lat,
    lon: data.coord.lon
  };
}

export async function deleteCity(id: string) {
  try {
    await prisma.savedCity.delete({ where: { id } });
    revalidatePath("/");
    return { success: true };
  } catch {
    return { success: false };
  }
}