import prisma from "@/prisma/prisma";
import WeatherUI from "./components/WeatherUI";
import { Prisma } from "@prisma/client";

export const revalidate = 30;

type SavedCityType = Prisma.SavedCityGetPayload<{
  select: {
    id: true;
    name: true;
    country: true;
    lat: true;
    temp: true;
    condition: true;
  };
}>;

export default async function Home() {
  let savedCities: SavedCityType[] = [];

  try {
    savedCities = await prisma.savedCity.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        country: true,
        lat: true,
        temp: true,
        condition: true,
      },
    });
  } catch (error) {
    console.error("DB fetch failed:", error);

    // Optional: surface failure in dev (helps debugging)
    if (process.env.NODE_ENV === "development") {
      throw error;
    }
  }

  return <WeatherUI savedCities={savedCities} />;
}