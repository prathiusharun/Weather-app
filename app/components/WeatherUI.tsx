import SearchForm from "./SearchForm";
import ThemeToggle from "./ThemeToggle";
import WeatherCard from "./WeatherCard";

export default function WeatherUI({ savedCities }: { savedCities: any[] }) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-white transition-colors duration-500">
      <div className="max-w-6xl mx-auto p-6 md:p-12">
        
        {/* Top Nav */}
        <nav className="flex justify-between items-center mb-16">
          <div>
            <h1 className="text-3xl font-black tracking-tighter italic">WEATHER.IO</h1>
            <p className="text-[10px] font-mono opacity-50 uppercase tracking-[0.2em]">
              System Status: Nominal
            </p>
          </div>

          <ThemeToggle />
        </nav>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-20">
          <SearchForm />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {savedCities.map((city) => (
            <WeatherCard key={city.id} city={city} />
          ))}
        </div>
      </div>
    </div>
  );
}