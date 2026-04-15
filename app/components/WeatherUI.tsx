"use client";

import { useRef, useState, useEffect } from "react";
import { addCity, deleteCity } from "../actions";
import { Sun, Moon, Trash2, MapPin } from "lucide-react";

export default function WeatherUI({ savedCities = [] }: { savedCities: any[] }) {
  // 1. Initialize state from localStorage if available, otherwise default to dark
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // 2. Handle Initial Mounting (Prevents Hydration Errors)
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDark(savedTheme === "dark");
    }
    setMounted(true);
  }, []);

  // 3. Sync theme with the HTML element
  useEffect(() => {
    if (!mounted) return;

    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark, mounted]);

  // Prevent rendering until mounted to ensure icons and colors match localStorage
  if (!mounted) return <div className="min-h-screen bg-slate-50 dark:bg-[#020617]" />;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-white transition-colors duration-500">
      <div className="max-w-6xl mx-auto p-6 md:p-12">
        
        {/* Top Navigation */}
        <nav className="flex justify-between items-center mb-16">
          <div>
            <h1 className="text-3xl font-black tracking-tighter italic">WEATHER.IO</h1>
            <p className="text-[10px] font-mono opacity-50 uppercase tracking-[0.2em]">System Status: Nominal</p>
          </div>
          
          <button 
            onClick={() => setIsDark(!isDark)}
            className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl hover:scale-110 transition-all active:scale-90"
            aria-label="Toggle Theme"
          >
            {/* Logic swap: If Dark, show Sun (to go light). If Light, show Moon (to go dark) */}
            {isDark ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-blue-600" />}
          </button>
        </nav>

        {/* Search Section */}
        <div className="max-w-2xl mx-auto mb-20">
          <form 
            ref={formRef}
            action={async (fd) => {
              await addCity(fd);
              formRef.current?.reset();
            }}
            className="group relative"
          >
            <input
              name="city"
              type="text"
              required
              placeholder="Search for a city (e.g., Ottappalam)..."
              className="w-full bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl px-8 py-6 outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-all shadow-2xl dark:shadow-none text-lg"
            />
            <button className="absolute right-3 top-3 bottom-3 bg-blue-600 hover:bg-blue-700 text-white px-8 rounded-2xl font-bold transition-all active:scale-95">
              SEARCH
            </button>
          </form>
        </div>

        {/* Weather Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {savedCities.map((city) => (
            <div key={city.id} className="group relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="flex justify-between items-start mb-10">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin size={14} className="text-blue-500 opacity-70" />
                    <h2 className="text-2xl font-bold tracking-tight">{city.name}</h2>
                  </div>
                  <p className="text-xs font-mono opacity-40 ml-5">{city.country} • {city.lat.toFixed(2)}°N</p>
                </div>
                <div className="text-6xl font-thin tracking-tighter">
                  {city.temp ?? "--"}°
                </div>
              </div>

              <div className="flex justify-between items-end">
                <span className="px-5 py-2 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-black tracking-widest uppercase">
                  {city.condition || "Clear"}
                </span>
                <button 
                  onClick={() => deleteCity(city.id)}
                  className="p-3 text-slate-300 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}