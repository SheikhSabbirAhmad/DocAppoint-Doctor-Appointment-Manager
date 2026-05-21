import DoctorCard from "./DoctorCard";

const TopRatedDoc = async () => {
  const res = await fetch(
    "https://doc-appoint-doctor-appointment-mana.vercel.app/data.json",
    { cache: "no-store" }
  );

  const doctors = await res.json();

  const topRatedDoctors = doctors
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-16">
      <div className="max-w-[1500px] mx-auto px-6 lg:px-10">

        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-5xl font-bold text-slate-900">
            Top Rated Doctors
          </h1>
          <p className="mt-5 text-slate-500 text-base md:text-lg leading-8">
            Trusted medical professionals with exceptional patient care.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {topRatedDoctors.map((doctor) => (
            <div
              key={doctor.id}
              className="transform hover:-translate-y-2 transition duration-300"
            >
              <DoctorCard doctor={doctor} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TopRatedDoc;