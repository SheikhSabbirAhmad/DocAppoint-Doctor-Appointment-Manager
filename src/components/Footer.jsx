import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative bg-[#e6f4f1] text-gray-700 overflow-hidden">

      {/* soft gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#e6f4f1] via-[#d1fae5] to-[#ccfbf1] opacity-80 -z-10" />

      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* BRAND */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-wide text-[#0f766e]">
              DocAppoint
            </h2>

            <p className="text-sm text-gray-600 leading-relaxed">
              DocAppoint is a modern doctor appointment manager that helps
              patients easily find doctors, schedule visits, and manage
              healthcare appointments smoothly and securely.
            </p>
          </div>

          {/* ABOUT */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-[#0f766e]">
              About
            </h3>

            <p className="text-sm text-gray-600 leading-relaxed">
              Our platform connects patients with trusted healthcare
              professionals and simplifies the process of booking and
              managing doctor appointments online.
            </p>
          </div>

          {/* CONTACT */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[#0f766e]">
              Contact
            </h3>

            <div className="space-y-3 text-sm text-gray-600">

              <div className="flex items-center gap-2">
                <FaPhone className="text-[#0f766e]" />
                +880 1700-000000
              </div>

              <div className="flex items-center gap-2">
                <FaEnvelope className="text-[#0f766e]" />
                support@docappoint.com
              </div>

              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-[#0f766e]" />
                Dhaka, Bangladesh
              </div>

            </div>
          </div>

          {/* FOLLOW */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[#0f766e]">
              Follow Us
            </h3>

            <div className="flex gap-3">

              <Link
                href="#"
                className="p-3 bg-white shadow-sm hover:bg-[#d1fae5] rounded-full transition"
              >
                <FaFacebookF className="text-[#0f766e]" />
              </Link>

              <Link
                href="#"
                className="p-3 bg-white shadow-sm hover:bg-[#d1fae5] rounded-full transition"
              >
                <FaInstagram className="text-[#0f766e]" />
              </Link>

              <Link
                href="#"
                className="p-3 bg-white shadow-sm hover:bg-[#d1fae5] rounded-full transition"
              >
                <FaTwitter className="text-[#0f766e]" />
              </Link>

            </div>

            <p className="text-sm text-gray-600 mt-4">
              Stay connected for health updates and appointment reminders.
            </p>
          </div>

        </div>

        {/* DIVIDER */}
        <div className="mt-12 border-t border-gray-200" />

        {/* BOTTOM */}
        <div className="mt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-3">

          <p>© {new Date().getFullYear()} DocAppoint. All rights reserved.</p>

          <div className="flex gap-6">
            <Link className="hover:text-[#0f766e] transition" href="/privacy">
              Privacy
            </Link>

            <Link className="hover:text-[#0f766e] transition" href="/terms">
              Terms
            </Link>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;