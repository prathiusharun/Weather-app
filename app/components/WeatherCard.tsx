import { MapPin, Trash2 } from "lucide-react";
import { deleteCity } from "../actions";

export default function WeatherCard({ city }: { city: any }) {
  return (
    <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] shadow-xl">
      <div className="flex justify-between mb-6">
        <div>
          <div className="flex items-center gap-2">
            <MapPin size={14} />
            <h2 className="text-xl font-bold">{city.name}</h2>
          </div>
          <p className="text-xs opacity-50">
            {city.country} • {city.lat?.toFixed(2)}°N
          </p>
        </div>
        <div className="text-5xl">{city.temp ?? "--"}°</div>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-xs uppercase">{city.condition}</span>
        
  <form action={deleteCity}>
  <input type="hidden" name="id" value={city.id} />
  <button className="text-red-500">
    Delete
  </button>
</form>
      </div>
    </div>
  );
}