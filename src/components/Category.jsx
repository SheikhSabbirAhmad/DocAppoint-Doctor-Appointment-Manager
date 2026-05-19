"use client";

import { Button } from "@heroui/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Category = () => {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category");

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch(
        "https://doc-appoint-doctor-appointment-mana.vercel.app/category.json"
      );
      const data = await res.json();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-3 mb-10">
      <Link href="/all-appointments">
        <Button
          size="sm"
          className={`px-4 py-2 rounded-full transition-all ${
            !activeCategory
              ? "bg-emerald-600 text-white scale-105 shadow"
              : "bg-white border text-gray-700 hover:bg-gray-100"
          }`}
        >
          All
        </Button>
      </Link>

      {categories.map((category) => {
        const isActive = activeCategory === category.slug;

        return (
          <Link
            key={category.id}
            href={`/all-appointments?category=${category.slug}`}
          >
            <Button
              size="sm"
              className={`px-4 py-2 rounded-full transition-all ${
                isActive
                  ? "bg-emerald-600 text-white scale-105 shadow"
                  : "bg-white border text-gray-700 hover:bg-gray-100"
              }`}
            >
              {category.name}
            </Button>
          </Link>
        );
      })}
    </div>
  );
};

export default Category;