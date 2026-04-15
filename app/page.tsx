export const dynamic = "force-dynamic";
import prisma from "@/prisma/prisma";
import WeatherUI from "./components/WeatherUI";

export default async function Home() {
  const savedCities = await prisma.savedCity.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <WeatherUI savedCities={savedCities} />;
}