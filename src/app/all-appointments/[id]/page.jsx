import Image from "next/image";
import Link from "next/link";
import {
  FaStar,
  FaBriefcaseMedical,
  FaHospital,
} from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { BsCalendar2Week } from "react-icons/bs";

import BookAppointmentButton from "@/components/BookAppointmentButton";

const AllAppointmentDetailsPage = async ({ params }) => {
  const { id } = await params;

  const res = await fetch(
    "https://doc-appoint-doctor-appointment-mana.vercel.app/data.json",
    { cache: "no-store" }
  );

  const doctors = await res.json();
  const doctor = doctors.find((d) => d.id === id);

  if (!doctor) {
    return (
      <p className="text-center mt-10 text-xl text-red-500">
        Doctor not found
      </p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-[#f4f9f9] rounded-[30px] p-5 md:p-8 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

          {/* IMAGE */}
          <div>
            <Image
              src={doctor.image}
              alt={doctor.name}
              width={600}
              height={700}
              className="w-full h-[520px] object-cover rounded-[28px]"
            />
          </div>

          {/* CONTENT */}
          <div>

            {/* SPECIALTY */}
            <span className="inline-block px-3 py-1 rounded-full bg-cyan-100 text-cyan-700 text-xs font-medium">
              {doctor.specialty}
            </span>

            {/* NAME */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">
              {doctor.name}
            </h1>

            {/* RATING */}
            <div className="flex items-center gap-2 mt-2">
              <FaStar className="text-yellow-500 text-sm" />
              <p className="text-base font-semibold text-gray-800">
                {doctor.rating}
                <span className="text-gray-500 font-normal">
                  {" "} / 5.0
                </span>
              </p>
            </div>

            {/* DESCRIPTION */}
            <p className="text-gray-600 text-base leading-7 mt-4">
              {doctor.description}
            </p>

            {/* INFO */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">

              {/* EXPERIENCE */}
              <div className="flex items-center gap-3 border border-cyan-100 rounded-2xl p-4 bg-white">
                <div className="w-12 h-12 rounded-xl bg-cyan-50 flex items-center justify-center">
                  <FaBriefcaseMedical className="text-xl text-cyan-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Experience</p>
                  <h3 className="text-lg font-bold text-gray-900">
                    {doctor.experience}
                  </h3>
                </div>
              </div>

              {/* HOSPITAL */}
              <div className="flex items-center gap-3 border border-cyan-100 rounded-2xl p-4 bg-white">
                <div className="w-12 h-12 rounded-xl bg-cyan-50 flex items-center justify-center">
                  <FaHospital className="text-xl text-cyan-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Hospital</p>
                  <h3 className="text-base font-semibold text-gray-900">
                    {doctor.hospital}
                  </h3>
                </div>
              </div>

              {/* LOCATION */}
              <div className="flex items-center gap-3 border border-cyan-100 rounded-2xl p-4 bg-white">
                <div className="w-12 h-12 rounded-xl bg-cyan-50 flex items-center justify-center">
                  <IoLocationOutline className="text-xl text-cyan-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Location</p>
                  <h3 className="text-lg font-bold text-gray-900">
                    {doctor.location}
                  </h3>
                </div>
              </div>

              {/* FEE */}
              <div className="flex items-center gap-3 border border-cyan-100 rounded-2xl p-4 bg-white">
                <div className="w-12 h-12 rounded-xl bg-cyan-50 flex items-center justify-center">
                  <BsCalendar2Week className="text-xl text-cyan-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-xs">
                    Consultation Fee
                  </p>
                  <h3 className="text-lg font-bold text-gray-900">
                    ৳{doctor.fee}
                  </h3>
                </div>
              </div>
            </div>

            {/* AVAILABILITY */}
            <div className="mt-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Availability
              </h2>

              <div className="flex flex-wrap gap-2">
                {doctor.availability.map((time, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 rounded-full border border-cyan-300 text-cyan-700 bg-cyan-50 text-sm font-medium"
                  >
                    {time}
                  </span>
                ))}
              </div>
            </div>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-3 mt-8">

              <BookAppointmentButton doctor={doctor} />

              <Link href="/all-appointments">
                <button className="px-6 py-3 bg-white hover:bg-gray-100 border border-gray-200 transition text-gray-800 rounded-xl text-base font-semibold shadow-sm cursor-pointer">
                  ← Back
                </button>
              </Link>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllAppointmentDetailsPage;