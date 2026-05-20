import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Ariana Sultana",
    role: "Dermatology Patient",
    review:
      "The appointment process was smooth and the doctor listened carefully to every concern. Very professional service.",
    rating: 5,
  },
  {
    id: 2,
    name: "Mahin Chowdhury",
    role: "Cardiology Patient",
    review:
      "Booked an appointment within minutes. Clean interface, quick response, and excellent doctor support.",
    rating: 4.5,
  },
  {
    id: 3,
    name: "Nabila Ahmed",
    role: "Neurology Patient",
    review:
      "DocAppoint made healthcare much easier for my family. The reminders and booking system are fantastic.",
    rating: 5,
  },
  {
    id: 4,
    name: "Tanvir Hasan",
    role: "Orthopedic Patient",
    review:
      "Very reliable platform with experienced doctors. The consultation experience exceeded my expectations.",
    rating: 4,
  },
  {
    id: 5,
    name: "Sadia Karim",
    role: "Pediatric Patient",
    review:
      "The pediatric specialist was extremely kind and patient. Booking and confirmation were effortless and incredibly convenient throughout.",
    rating: 4.5,
  },
  {
    id: 6,
    name: "Farhan Rahman",
    role: "ENT Patient",
    review:
      "Transparent fees, trusted doctors, and a modern experience from start to finish. Highly recommended.",
    rating: 5,
  },
];

const renderStars = (rating) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(
        <FaStar
          key={i}
          className="text-yellow-400"
        />
      );
    } else if (rating >= i - 0.5) {
      stars.push(
        <FaStarHalfAlt
          key={i}
          className="text-yellow-400"
        />
      );
    } else {
      stars.push(
        <FaRegStar
          key={i}
          className="text-yellow-400"
        />
      );
    }
  }

  return stars;
};

const Testimonials = () => {
  return (
    <section className="bg-gradient-to-b from-[#f4fbfb] to-[#eef7f7] py-24 overflow-hidden">

      <div className="max-w-7xl mx-auto px-4">

        {/* HEADER */}
        <div className="text-center mb-16">

          <span className="inline-block px-5 py-2 rounded-full bg-cyan-100 text-cyan-700 text-sm font-semibold mb-5 shadow-sm">
            Patient Experiences
          </span>

          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight">
            What Our Patients Say
          </h2>

          <p className="text-slate-500 mt-5 max-w-3xl mx-auto text-lg leading-8">
            Thousands of patients trust DocAppoint for secure appointments,
            experienced specialists, and a seamless healthcare experience.
          </p>

        </div>

        {/* TESTIMONIALS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">

          {testimonials.map((item, index) => (
            <div
              key={item.id}
              className="group bg-white/90 backdrop-blur-sm rounded-[28px] border border-cyan-100 p-7 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative overflow-hidden"
              style={{
                animationDelay: `${index * 120}ms`,
              }}
            >

              {/* TOP GLOW */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-teal-400 opacity-0 group-hover:opacity-100 transition-all duration-500" />

              {/* STARS */}
              <div className="flex items-center justify-between mb-6">

                <div className="flex items-center gap-1 text-[15px]">
                  {renderStars(item.rating)}
                </div>

                <div className="w-11 h-11 rounded-full bg-cyan-50 flex items-center justify-center">
                  <Quote
                    className="text-cyan-300"
                    size={22}
                  />
                </div>

              </div>

              {/* REVIEW */}
              <p className="text-slate-600 leading-8 mb-8 text-[15px]">
                “{item.review}”
              </p>

              {/* USER */}
              <div className="flex items-center gap-4">

                {/* AVATAR */}
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-600 to-teal-400 flex items-center justify-center text-white font-bold text-lg shadow-md shrink-0">
                  {item.name.charAt(0)}
                </div>

                {/* INFO */}
                <div>
                  <h4 className="font-bold text-slate-900 text-lg">
                    {item.name}
                  </h4>

                  <p className="text-sm text-slate-500">
                    {item.role}
                  </p>
                </div>

              </div>

              {/* FLOATING BLUR */}
              <div className="absolute -bottom-10 -right-10 w-28 h-28 bg-cyan-100 rounded-full blur-3xl opacity-0 group-hover:opacity-60 transition-all duration-500" />

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;