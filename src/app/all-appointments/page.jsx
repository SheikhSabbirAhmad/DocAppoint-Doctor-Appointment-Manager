import Image from "next/image";
import Link from "next/link";
import { Card, Button, Chip } from "@heroui/react";
import { FaCalendarAlt, FaClock, FaUserMd } from "react-icons/fa";

const AllAppointmentsPage = async () => {
  const res = await fetch(
    "https://doc-appoint-doctor-appointment-mana.vercel.app/appointments.json",
    { cache: "no-store" }
  );

  const appointments = await res.json();

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      {/* TITLE */}
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        All Appointments
      </h1>
      <p className="text-gray-500 mb-8">
        Manage and view all your scheduled doctor appointments.
      </p>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {appointments.map((app) => (
          <Card
            key={app.id}
            className="border rounded-2xl p-4 hover:shadow-xl transition duration-300 bg-white"
          >

            {/* DOCTOR INFO */}
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-14 h-14 rounded-full overflow-hidden bg-gray-100">
                <Image
                  src={app.doctorImage || "/placeholder.png"}
                  alt={app.doctorName}
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <h2 className="font-semibold text-lg text-gray-800">
                  {app.doctorName}
                </h2>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <FaUserMd /> {app.specialty}
                </p>
              </div>
            </div>

            {/* APPOINTMENT DETAILS */}
            <div className="space-y-2 text-sm text-gray-600">

              <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-emerald-500" />
                <span>{app.date}</span>
              </div>

              <div className="flex items-center gap-2">
                <FaClock className="text-emerald-500" />
                <span>{app.time}</span>
              </div>

            </div>

            {/* STATUS */}
            <div className="mt-4">
              <Chip
                className={
                  app.status === "confirmed"
                    ? "bg-green-100 text-green-700"
                    : app.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }
              >
                {app.status}
              </Chip>
            </div>

            {/* ACTION */}
            <div className="mt-4 flex justify-end">
              <Link href={`/appointments/${app.id}`}>
                <Button className="bg-emerald-600 text-white hover:bg-emerald-700">
                  View Details
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