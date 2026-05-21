import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "DocAppoint | Doctor Appointment Manager",
  description:
    "Doctor Appointment Booking System where users can browse doctors and book appointments easily.",
  keywords: [
    "doctor appointment",
    "medical booking",
    "healthcare",
    "doctor booking system",
    "DocAppoint",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar></Navbar>
        {children}
        <Footer></Footer>

         {/* Toast container */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          theme="colored"
        />
        </body>
    </html>
  );
}
