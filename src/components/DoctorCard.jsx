import Image from "next/image";
import Link from "next/link";
import { Card, Button, Chip } from "@heroui/react";
import { FaStar, FaMapMarkerAlt, FaRegClock } from "react-icons/fa";

const DoctorCard = ({ doctor }) => {
  if (!doctor) return null;

  const imageSrc =
    typeof doctor.image === "string" && doctor.image.trim() !== ""
      ? doctor.image
      : "/placeholder.png";

  return (
    <Card className="group border rounded-2xl p-4 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 bg-white">

      {/* IMAGE SECTION */}
      <div className="relative w-full h-64 bg-gray-100 rounded-xl overflow-hidden">
        <Image
          src={imageSrc}
          alt={doctor.name || "Doctor"}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-full flex items-center gap-1 shadow-md">
          <FaStar className="text-yellow-500 text-sm" />
          <span className="text-sm font-semibold">{doctor.rating}</span>
        </div>

        {/* Specialty Badge */}
        <Chip className="absolute bottom-3 left-3 bg-black/70 text-white">
          {doctor.specialty}
        </Chip>
      </div>

      {/* INFO SECTION */}
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
            View Details
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default DoctorCard;