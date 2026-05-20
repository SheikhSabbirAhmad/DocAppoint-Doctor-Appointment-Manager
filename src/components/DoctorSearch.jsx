"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";

const DoctorSearch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSearch = searchParams.get("search") || "";

  const [search, setSearch] = useState(currentSearch);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams);

      if (search) {
        params.set("search", search);
      } else {
        params.delete("search");
      }

      router.push(`/all-appointments?${params.toString()}`);
    }, 400);

    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <div className="flex justify-center mb-10">
      <div className="relative w-full max-w-xl">
        <FiSearch className="absolute left-4 top-3.5 text-gray-400 text-lg" />

        <input
          type="text"
          placeholder="Search by doctor name or specialty..."
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  );
};

export default DoctorSearch;