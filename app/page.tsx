import prisma from "../prisma/prisma"; 
import { fetchWeather, deleteCity } from "./actions";
import { revalidatePath } from "next/cache";

export default async function Home() {
  // 1. Fetch data from DB
  const savedCities = await prisma.savedCity.findMany({
    orderBy: { createdAt: "desc" },
  });

  // 2. Search Function
  async function handleSearch(formData: FormData) {
    "use server";
    const cityName = formData.get("city") as string;
    if (cityName) {
      await fetchWeather(cityName);
      revalidatePath("/");
    }
  }

  return (
    <main className="p-10 max-w-4xl mx-auto min-h-screen bg-gray-50 text-black">
      <h1 className="text-4xl font-black mb-10 text-center text-blue-600">Weather Engine</h1>

      {/* BUILT-IN SEARCH BAR */}
      <section className="mb-12 flex justify-center">
        <form action={handleSearch} className="flex gap-2 w-full max-w-md">
          <input 
            name="city" 
            placeholder="Search city..." 
            className="flex-1 p-3 border-2 border-gray-200 rounded-xl outline-none focus:border-blue-500 text-black" 
            required 
          />
          <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700">
            Search
          </button>
        </form>
      </section>

      {/* RECENT SEARCHES (DIVS) */}
      <section>
        <h2 className="text-xl font-bold mb-6 text-gray-700 uppercase">Pinned Locations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {savedCities.map((city) => (
            <div key={city.id} className="p-6 bg-white border rounded-2xl shadow-sm flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{city.name}</h3>
                <p className="text-sm text-blue-500 font-bold uppercase">{city.country}</p>
                <p className="text-xs text-gray-400 mt-2">{city.lat.toFixed(2)}°N, {city.lon.toFixed(2)}°E</p>
              </div>
              
              <form action={async () => {
                "use server";
                await deleteCity(city.id);
              }}>
                <button className="text-red-500 font-bold hover:underline">Delete</button>
              </form>
            </div>
          ))}

          {savedCities.length === 0 && (
            <p className="text-gray-400 italic py-10 text-center col-span-full">No history yet.</p>
          )}
        </div>
      </section>
    </main>
  );
}