import {
  ShieldCheck,
  Clock3,
  Stethoscope,
  HeartPulse,
} from "lucide-react";

const features = [
  {
    id: 1,
    icon: <ShieldCheck size={28} strokeWidth={2.2} />,
    title: "Verified Specialists",
    description:
      "Consult licensed and experienced doctors for accurate diagnosis and trusted medical care.",
  },
  {
    id: 2,
    icon: <Clock3 size={28} strokeWidth={2.2} />,
    title: "Quick Booking",
    description:
      "Schedule appointments instantly with real-time availability and instant confirmation.",
  },
  {
    id: 3,
    icon: <Stethoscope size={28} strokeWidth={2.2} />,
    title: "Modern Care System",
    description:
      "Experience smooth digital healthcare with organized scheduling and patient-focused service.",
  },
  {
    id: 4,
    icon: <HeartPulse size={28} strokeWidth={2.2} />,
    title: "Secure Platform",
    description:
      "Your personal data and booking information are fully protected with strong security.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="relative overflow-hidden bg-[#f7fbfb] py-20 md:py-28">

      {/* BACKGROUND EFFECT */}
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-cyan-100/40 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[320px] h-[320px] bg-teal-100/40 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-14">

          <span className="inline-flex items-center px-4 py-2 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-700 text-sm font-semibold mb-5">
            Why Choose DocAppoint
          </span>

          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight">
            Healthcare Booking <br className="hidden md:block" />
            Made Simple & Reliable
          </h2>

          <p className="mt-5 text-slate-500 text-base md:text-lg leading-8">
            We connect patients with trusted doctors through a secure and seamless appointment system.
          </p>

        </div>

        {/* FEATURE CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {features.map((feature) => (
            <div
              key={feature.id}
              className="group relative bg-white rounded-3xl border border-slate-100 p-7 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
            >

              {/* HOVER BG */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 to-teal-50 opacity-0 group-hover:opacity-100 transition duration-500" />

              {/* TOP BORDER */}
              <div className="absolute top-0 left-0 h-1 w-0 bg-gradient-to-r from-cyan-600 to-teal-400 group-hover:w-full transition-all duration-500" />

              {/* ICON */}
              <div className="relative z-10 w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-600 to-teal-500 flex items-center justify-center text-white shadow-lg mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">

                <div className="absolute inset-0 rounded-2xl bg-cyan-400 blur-xl opacity-0 group-hover:opacity-40 transition duration-500" />

                <span className="relative z-10">
                  {feature.icon}
                </span>

              </div>

              {/* TITLE */}
              <h3 className="relative z-10 text-xl font-bold text-slate-900 mb-3 leading-snug">
                {feature.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="relative z-10 text-slate-500 text-[15px] leading-7">
                {feature.description}
              </p>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;