"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Pagination,
  Navigation,
  EffectFade,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

import Link from "next/link";

import {
  FaArrowRight,
  FaCalendarCheck,
  FaStar,
  FaUserMd,
} from "react-icons/fa";

const slides = [
  {
    id: 1,
    image: "/assets/BannerImg1.jpg",
    badge: "Verified Healthcare",
    title: "Your Health, Our Priority",
    desc: "Trusted clinics, experienced doctors, and seamless appointment booking for better healthcare experience.",
  },
  {
    id: 2,
    image: "/assets/BannerImg2.jpg",
    badge: "Expert Specialists",
    title: "Book Top Rated Doctors",
    desc: "Find highly qualified specialists and schedule appointments instantly from anywhere.",
  },
  {
    id: 3,
    image: "/assets/BannerImg3.jpg",
    badge: "24/7 Service",
    title: "Healthcare Made Simple",
    desc: "Manage appointments, reviews, and medical consultations with ease and confidence.",
  },
  {
    id: 4,
    image: "/assets/BannerImg4.jpg",
    badge: "Smart Appointment",
    title: "Fast & Secure Booking",
    desc: "Get instant confirmation and secure appointment management in just a few clicks.",
  },
  {
    id: 5,
    image: "/assets/BannerImg5.jpg",
    badge: "Trusted Platform",
    title: "Connecting Patients & Doctors",
    desc: "A modern healthcare platform designed for patients, clinics, and medical professionals.",
  },
];

const Banner = () => {
  return (
    <div className="w-full">
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        effect={"fade"}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[
          Autoplay,
          Pagination,
          Navigation,
          EffectFade,
        ]}
        className="rounded-b-3xl overflow-hidden bannerSwiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="relative h-[92vh] w-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            >
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/60"></div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>

              {/* Content */}
              <div className="relative z-10 flex h-full items-center">
                <div className="max-w-7xl mx-auto px-6 md:px-10 w-full">
                  <div className="max-w-3xl">
                    
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 border border-white/20 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-white text-sm font-medium mb-6">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                      {slide.badge}
                    </div>

                    {/* Heading */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-white mb-6">
                      {slide.title}
                    </h1>

                    {/* Description */}
                    <p className="text-gray-200 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl">
                      {slide.desc}
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-12">
                      
                      <Link
                        href="/all-appointments"
                        className="group bg-cyan-500 hover:bg-cyan-600 transition-all duration-300 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-3 shadow-2xl w-fit"
                      >
                        Browse Doctors

                        <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                      </Link>

                      <Link
                        href="/dashboard"
                        className="border border-white/30 hover:bg-white/10 backdrop-blur-md transition-all duration-300 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-3 w-fit"
                      >
                        <FaCalendarCheck />
                        My Bookings
                      </Link>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-2xl">
                      
                      <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-5">
                        <div className="flex items-center gap-3 mb-2">
                          <FaUserMd className="text-cyan-400 text-2xl" />

                          <h3 className="text-3xl font-bold text-white">
                            500+
                          </h3>
                        </div>

                        <p className="text-gray-300 text-sm">
                          Verified Doctors
                        </p>
                      </div>

                      <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-5">
                        <div className="flex items-center gap-3 mb-2">
                          <FaStar className="text-yellow-400 text-2xl" />

                          <h3 className="text-3xl font-bold text-white">
                            4.9
                          </h3>
                        </div>

                        <p className="text-gray-300 text-sm">
                          Average Rating
                        </p>
                      </div>

                      <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-5 col-span-2 md:col-span-1">
                        <div className="flex items-center gap-3 mb-2">
                          <FaCalendarCheck className="text-cyan-400 text-2xl" />

                          <h3 className="text-3xl font-bold text-white">
                            50K+
                          </h3>
                        </div>

                        <p className="text-gray-300 text-sm">
                          Appointments
                        </p>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;