"use client";

import { useRef } from "react";
import { addCity } from "../actions";

export default function SearchForm() {
  const formRef = useRef<HTMLFormElement>(null);

  return (
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
        placeholder="Search for a city..."
        className="w-full bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl px-8 py-6 outline-none"
      />
      <button className="absolute right-3 top-3 bottom-3 bg-blue-600 text-white px-8 rounded-2xl">
        SEARCH
      </button>
    </form>
  );
}