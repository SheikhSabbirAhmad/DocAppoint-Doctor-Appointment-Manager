"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

const BookAppointmentModal = ({
  isOpen,
  onOpenChange,
  doctor,
  onSubmit,
}) => {

  // LOGIN USER SESSION
  const session = authClient.useSession();
  const user = session.data?.user;

  const [patientName, setPatientName] = useState("");
  const [gender, setGender] = useState("Male");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");

  // RESET FUNCTION
  const resetForm = () => {
    setPatientName("");
    setGender("Male");
    setPhone("");
    setDate("");
    setTime("");
    setReason("");
  };

  // BODY SCROLL LOCK + RESET
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      resetForm();
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // FORM SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!patientName || !gender || !phone || !date || !time) {
      alert("Please fill all required fields");
      return;
    }

    const bookingData = {
      userEmail: user?.email,
      doctorName: doctor?.name,
      specialty: doctor?.specialty,
      patientName,
      gender,
      phone,
      date,
      time,
      reason,
      fee: doctor?.fee,
      hospital: doctor?.hospital,
      location: doctor?.location,
      createdAt: new Date(),
    };

    try {

      // API CALL
      const res = await fetch("http://localhost:5000/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      const data = await res.json();

      console.log(data);

      if (data.insertedId) {
        alert("Appointment booked successfully!");

        onSubmit?.(bookingData);

        resetForm();
        onOpenChange(false);
      }

    } catch (error) {
      console.log(error);
      alert("Something went wrong!");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-3 py-4 overflow-y-auto">

      {/* MODAL */}
      <div className="w-full max-w-md md:max-w-xl bg-white rounded-2xl shadow-xl border border-gray-100 p-4 sm:p-5 md:p-6 relative my-auto">

        {/* CLOSE */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-3 right-3 md:top-4 md:right-4 text-gray-500 hover:text-black transition cursor-pointer"
        >
          ✕
        </button>

        {/* HEADER */}
        <div className="mb-4 pr-6">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800">
            Book Appointment
          </h1>

          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            with {doctor?.name}
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-3">

          {/* USER EMAIL */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">
              User Email
            </label>

            <input
              readOnly
              value={user?.email || ""}
              className="w-full h-[44px] sm:h-[48px] rounded-lg border bg-gray-100 px-3 text-sm outline-none"
            />
          </div>

          {/* DOCTOR */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">
              Doctor Name
            </label>

            <input
              readOnly
              value={doctor?.name || ""}
              className="w-full h-[44px] sm:h-[48px] rounded-lg border bg-gray-100 px-3 text-sm outline-none"
            />
          </div>

          {/* PATIENT */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">
              Patient Name *
            </label>

            <input
              type="text"
              placeholder="Full name"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              className="w-full h-[44px] sm:h-[48px] rounded-lg border px-3 text-sm outline-none focus:border-cyan-500"
            />
          </div>

          {/* GENDER + PHONE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

            <div>
              <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">
                Gender *
              </label>

              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full h-[44px] sm:h-[48px] rounded-lg border px-3 text-sm outline-none cursor-pointer"
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">
                Phone *
              </label>

              <input
                type="text"
                placeholder="01XXXXXXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full h-[44px] sm:h-[48px] rounded-lg border px-3 text-sm outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* DATE + TIME */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

            <div>
              <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">
                Date *
              </label>

              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full h-[44px] sm:h-[48px] rounded-lg border px-3 text-sm outline-none cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">
                Time *
              </label>

              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full h-[44px] sm:h-[48px] rounded-lg border px-3 text-sm outline-none cursor-pointer"
              />
            </div>
          </div>

          {/* REASON */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">
              Reason (optional)
            </label>

            <input
              type="text"
              placeholder="Brief reason for visit"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full h-[44px] sm:h-[48px] rounded-lg border px-3 text-sm outline-none focus:border-cyan-500"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full h-[46px] sm:h-[50px] rounded-lg bg-gradient-to-r from-cyan-700 to-cyan-500 text-white text-sm sm:text-base font-semibold hover:opacity-90 transition cursor-pointer"
          >
            Confirm Booking
          </button>

        </form>
      </div>
    </div>
  );
};

export default BookAppointmentModal;