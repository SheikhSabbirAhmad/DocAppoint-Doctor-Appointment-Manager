import Image from "next/image";
import Link from "next/link";
import { Card, Button, Chip } from "@heroui/react";
import { FaStar, FaMapMarkerAlt, FaRegClock } from "react-icons/fa";

const AllAppointmentsPage = async ({ searchParams }) => {
  const params = await searchParams;
  const category = params?.category;

  const res = await fetch(
    "https://doc-appoint-doctor-appointment-mana.vercel.app/data.json",
    { cache: "no-store" }
  );

  const doctors = await res.json();

  // filter by category (specialty)
  const filteredDoctors = category
    ? doctors.filter(
        (doc) =>
          doc.specialty?.toLowerCase() === category.toLowerCase()
      )
    : doctors;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      {/* TITLE */}
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        All Doctors
      </h1>
      <p className="text-gray-500 mb-8">
        Browse and book appointments with trusted medical specialists.
      </p>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {filteredDoctors.map((doctor) => (
          <Card
            key={doctor.id}
            className="group border rounded-2xl p-4 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 bg-white"
          >

            {/* IMAGE */}
            <div className="relative w-full h-64 bg-gray-100 rounded-xl overflow-hidden">
              <Image
                src={doctor.image || "/placeholder.png"}
                alt={doctor.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* RATING */}
              <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-full flex items-center gap-1 shadow-md">
                <FaStar className="text-yellow-500 text-sm" />
                <span className="text-sm font-semibold">
                  {doctor.rating}
                </span>
              </div>

              {/* SPECIALTY */}
              <Chip className="absolute bottom-3 left-3 bg-black/70 text-white">
                {doctor.specialty}
              </Chip>
            </div>

            {/* INFO */}
            <div className="mt-4 space-y-1">
              <h2 className="text-xl font-bold group-hover:text-emerald-600 transition">
                {doctor.name}
              </h2>

              <p className="text-sm text-gray-500 line-clamp-2">
                {doctor.description}
              </p>
            </div>

            {/* LOCATION + EXPERIENCE */}
            <div className="mt-3 space-y-2 text-sm text-gray-600">

              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-emerald-500" />
                <span>{doctor.location}</span>
              </div>

              <div className="flex items-center gap-2">
                <FaRegClock className="text-emerald-500" />
                <span>{doctor.experience} experience</span>
              </div>

            </div>

            {/* FEE + BUTTON */}
            <div className="flex items-center justify-between mt-4">
              <p className="text-lg font-bold text-emerald-600">
                ৳{doctor.fee}
              </p>

              <Link href={`/doctors/${doctor.id}`}>
                <Button className="bg-emerald-600 text-white hover:bg-emerald-700 transition">
                  Book Appointment
                </Button>
              </Link>
            </div>

          </Card>
        ))}

      </div>
    </div>
  );
};

export default AllAppointmentsPage;