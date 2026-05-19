"use client";

import { Button } from "@heroui/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Category = () => {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category");

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          "https://doc-appoint-doctor-appointment-mana.vercel.app/category.json"
        );

        if (!res.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await res.json();
        setCategories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="flex flex-wrap gap-3 mb-6">

      {/* ALL BUTTON */}
      <Link href="/products">
        <Button
          size="sm"
          className={`transition-all duration-300 px-4 py-2 rounded-full ${
            !activeCategory
              ? "bg-emerald-600 text-white scale-105 shadow-md"
              : "bg-white text-gray-700 border hover:bg-gray-100"
          }`}
        >
          All
        </Button>
      </Link>

      {/* LOADING STATE */}
      {loading && (
        <p className="text-sm text-gray-400">Loading categories...</p>
      )}

      {/* ERROR STATE */}
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      {/* CATEGORY LIST */}
      {categories.map((category) => {
        const isActive = activeCategory === category.slug;

        return (
          <Link
            key={category.id}
            href={`/products?category=${category.slug}`}
          >
            <Button
              size="sm"
              className={`transition-all duration-300 px-4 py-2 rounded-full ${
                isActive
                  ? "bg-emerald-600 text-white scale-105 shadow-md"
                  : "bg-white text-gray-700 border hover:bg-gray-100"
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