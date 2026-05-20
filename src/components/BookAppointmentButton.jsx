"use client";

import { useState } from "react";
import BookAppointmentModal from "./BookAppointmentModal";

const BookAppointmentButton = ({ doctor }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (data) => {
    console.log("BOOKING DATA:", data);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-8 py-4 bg-cyan-600 hover:bg-cyan-700 transition-all duration-300 text-white rounded-2xl text-lg font-semibold shadow-md cursor-pointer"
      >
        Book Appointment
      </button>

      <BookAppointmentModal
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        doctor={doctor}
        user={{ email: "tom@gmail.com" }}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default BookAppointmentButton;