"use client";

import { authClient } from "@/lib/auth-client";
import { Avatar, Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { HiMenu } from "react-icons/hi";
import { toast } from "react-toastify";

const Navbar = () => {
  const userData = authClient.useSession();
  const user = userData.data?.user;

  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await authClient.signOut();

      toast.success("You have been logged out successfully.", {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
      });
    } catch (error) {
      toast.error("Logout failed. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "All-Appointments", href: "/all-appointments" },
    { name: "Profile", href: "/profile" },
  ];

  return (
    <div className="border-b bg-[#e6f4f1]/90 backdrop-blur-md px-4 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto flex items-center justify-between py-4 relative">

        {/* Mobile Menu */}
        <div className="md:hidden">
          <button onClick={() => setOpen(!open)} className="text-[#0f766e]">
            <HiMenu size={24} />
          </button>

          {open && (
            <div className="absolute top-14 left-0 w-44 bg-white rounded-xl shadow-lg border p-2 z-50">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block px-3 py-2 rounded-md text-sm transition ${
                    pathname === link.href
                      ? "bg-[#d1fae5] text-[#0f766e] font-semibold"
                      : "hover:bg-[#f0fdfa] text-gray-700"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image
            src="/NavbarImg2.png"
            alt="logo"
            width={40}
            height={40}
            className="rounded-md"
          />
          <h2 className="font-bold text-3xl text-[#0f766e]">
            DocAppoint
          </h2>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-10 text-lg font-medium text-gray-700">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`px-4 py-2 rounded-full transition ${
                  pathname === link.href
                    ? "bg-[#d1fae5] text-[#0f766e] font-semibold"
                    : "hover:text-[#0f766e]"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          {!user && (
            <>
              <Link
                href="/signin"
                className="text-gray-700 font-medium hover:text-[#0f766e] transition"
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="px-5 py-2 rounded-xl text-white font-semibold bg-[#0f766e] hover:bg-[#115e59] hover:scale-105 transition"
              >
                Register
              </Link>
            </>
          )}

          {user && (
            <div className="flex items-center gap-3">
              <Link href="/profile">
                <Avatar size="md">
                  <Avatar.Image
                    src={user?.image}
                    alt="user"
                    referrerPolicy="no-referrer"
                  />
                  <Avatar.Fallback>
                    {user?.name?.charAt(0)}
                  </Avatar.Fallback>
                </Avatar>
              </Link>

              <Button
                size="sm"
                onClick={handleSignOut}
                className="bg-[#0f766e] text-white hover:bg-[#115e59] hover:scale-105 transition"
              >
                Logout
              </Button>
            </div>
          )}

        </div>
      </nav>
    </div>
  );
};

export default Navbar;