"use client";

import { Button } from "@heroui/react";
import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Category = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const activeCategory = searchParams.get("category");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          "https://sun-cart-summer-essentials-store-xi.vercel.app/category.json"
        );
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Failed to load categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="mb-8">

      {/* TITLE */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Browse by Specialties
        </h2>
        <p className="text-sm text-gray-500">
          Select a category to filter doctors
        </p>
      </div>

      {/* CATEGORY LIST */}
      <div className="flex flex-wrap gap-3">

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
          <div className="text-sm text-gray-400">Loading categories...</div>
        )}

        {/* CATEGORY BUTTONS */}
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
    </div>
  );
};

export default Category;