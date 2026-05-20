import Image from "next/image";
import Link from "next/link";
import {
  FaStar,
  FaBriefcaseMedical,
  FaHospital,
} from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { BsCalendar2Week } from "react-icons/bs";

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
    <div className="max-w-7xl mx-auto px-4 py-10">

      <div className="bg-[#f4f9f9] rounded-[40px] p-6 md:p-10 shadow-sm">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* IMAGE */}
          <div>
            <Image
              src={doctor.image}
              alt={doctor.name}
              width={600}
              height={700}
              className="w-full h-[650px] object-cover rounded-[35px]"
            />
          </div>

          {/* CONTENT */}
          <div>

            {/* SPECIALTY */}
            <span className="inline-block px-4 py-1 rounded-full bg-cyan-100 text-cyan-700 text-sm font-medium">
              {doctor.specialty}
            </span>

            {/* NAME */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4">
              {doctor.name}
            </h1>

            {/* RATING */}
            <div className="flex items-center gap-2 mt-3">
              <FaStar className="text-yellow-500" />
              <p className="text-lg font-semibold text-gray-800">
                {doctor.rating}
                <span className="text-gray-500 font-normal">
                  {" "}
                  / 5.0
                </span>
              </p>
            </div>

            {/* DESCRIPTION */}
            <p className="text-gray-600 text-lg leading-8 mt-6">
              {doctor.description}
            </p>

            {/* INFO BOXES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">

              {/* EXPERIENCE */}
              <div className="flex items-center gap-4 border border-cyan-100 rounded-3xl p-5 bg-white">

                <div className="w-14 h-14 rounded-2xl bg-cyan-50 flex items-center justify-center">
                  <FaBriefcaseMedical className="text-2xl text-cyan-600" />
                </div>

                <div>
                  <p className="text-gray-500 text-sm">
                    Experience
                  </p>

                  <h3 className="text-2xl font-bold text-gray-900">
                    {doctor.experience}
                  </h3>
                </div>
              </div>

              {/* HOSPITAL */}
              <div className="flex items-center gap-4 border border-cyan-100 rounded-3xl p-5 bg-white">

                <div className="w-14 h-14 rounded-2xl bg-cyan-50 flex items-center justify-center">
                  <FaHospital className="text-2xl text-cyan-600" />
                </div>

                <div>
                  <p className="text-gray-500 text-sm">
                    Hospital
                  </p>

                  <h3 className="text-xl font-semibold text-gray-900">
                    {doctor.hospital}
                  </h3>
                </div>
              </div>

              {/* LOCATION */}
              <div className="flex items-center gap-4 border border-cyan-100 rounded-3xl p-5 bg-white">

                <div className="w-14 h-14 rounded-2xl bg-cyan-50 flex items-center justify-center">
                  <IoLocationOutline className="text-2xl text-cyan-600" />
                </div>

                <div>
                  <p className="text-gray-500 text-sm">
                    Location
                  </p>

                  <h3 className="text-2xl font-bold text-gray-900">
                    {doctor.location}
                  </h3>
                </div>
              </div>

              {/* FEE */}
              <div className="flex items-center gap-4 border border-cyan-100 rounded-3xl p-5 bg-white">

                <div className="w-14 h-14 rounded-2xl bg-cyan-50 flex items-center justify-center">
                  <BsCalendar2Week className="text-2xl text-cyan-600" />
                </div>

                <div>
                  <p className="text-gray-500 text-sm">
                    Consultation Fee
                  </p>

                  <h3 className="text-2xl font-bold text-gray-900">
                    ৳{doctor.fee}
                  </h3>
                </div>
              </div>
            </div>

            {/* AVAILABILITY */}
            <div className="mt-8">

              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Availability
              </h2>

              <div className="flex flex-wrap gap-3">
                {doctor.availability.map((time, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 rounded-full border border-cyan-300 text-cyan-700 bg-cyan-50 font-medium"
                  >
                    {time}
                  </span>
                ))}
              </div>
            </div>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4 mt-10">

              <button className="px-8 py-4 bg-cyan-600 hover:bg-cyan-700 transition-all duration-300 text-white rounded-2xl text-lg font-semibold shadow-md cursor-pointer">
                Book Appointment
              </button>

              <Link href="/all-appointments">
                <button className="px-8 py-4 bg-white hover:bg-gray-100 border border-gray-200 transition-all duration-300 text-gray-800 rounded-2xl text-lg font-semibold shadow-sm cursor-pointer">
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