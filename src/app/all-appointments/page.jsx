import DoctorCard from "@/components/DoctorCard";
import Category from "@/components/Category";
import DoctorSearch from "@/components/DoctorSearch";

const AllAppointmentsPage = async ({ searchParams }) => {
  const params = await searchParams;

  const category = params?.category;
  const search = params?.search?.toLowerCase() || "";

  const res = await fetch(
    "https://doc-appoint-doctor-appointment-mana.vercel.app/data.json",
    { cache: "no-store" }
  );

  const doctors = await res.json();

  let filteredDoctors = doctors;

  // Category filter
  if (category) {
    filteredDoctors = filteredDoctors.filter(
      (doctor) =>
        doctor.specialty?.toLowerCase() === category.toLowerCase()
    );
  }

  // Search filter
  if (search) {
    filteredDoctors = filteredDoctors.filter(
      (doctor) =>
        doctor.name.toLowerCase().includes(search) ||
        doctor.specialty.toLowerCase().includes(search)
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 text-center">
        All Appointments
      </h1>

      <p className="mt-3 text-slate-500 text-base md:text-lg leading-8 mb-8 text-center">
        Browse and book appointments with trusted medical specialists.
      </p>

      {/* SEARCH */}
      <DoctorSearch />

      {/* CATEGORY */}
      <Category />

      {/* DOCTOR GRID */}
      {filteredDoctors.length === 0 ? (
        <p className="text-center text-gray-500 mt-10 text-lg">
          No doctors match your search.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {filteredDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      )}

    </div>
  );
};

export default AllAppointmentsPage;