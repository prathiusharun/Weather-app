import prisma from "@/prisma/prisma";
import WeatherUI from "./components/WeatherUI";

export const revalidate = 30;

export default async function Home() {
 const savedCities = await prisma.savedCity.findMany({
  orderBy: { createdAt: "desc" },
  select: {
    id: true,
    name: true,
    country: true,
    lat:true,
    temp: true,
    condition: true,
  },
});

  return <WeatherUI savedCities={savedCities} />;
}