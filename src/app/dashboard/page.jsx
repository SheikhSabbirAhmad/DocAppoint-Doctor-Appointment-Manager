"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

import {
  CalendarDays,
  Clock,
  User,
  Trash2,
  MapPin,
  Hospital,
  TriangleAlert,
} from "lucide-react";

import Link from "next/link";
import { Modal, Button } from "@heroui/react";
import { toast, Toaster } from "sonner";

import UpdateBookingModal from "@/components/UpdateBookingModal";



const DashboardPage = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);

  //GET BOOKINGS (TOKEN FIXED)
  const fetchBookings = async () => {
    try {
      const tokenRes = await authClient.token();
      const token = tokenRes?.data?.token;

      const res = await fetch("http://localhost:5000/booking", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setBookings(data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load bookings!");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  //DELETE BOOKING (TOKEN FIXED)
  const handleDelete = async (id) => {
    try {
      const tokenRes = await authClient.token();
      const token = tokenRes?.data?.token;

      const res = await fetch(
        `http://localhost:5000/booking/${id}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (data.deletedCount > 0) {
        const remainingBookings = bookings.filter(
          (booking) => booking._id !== id
        );

        setBookings(remainingBookings);
        setSelectedBooking(null);

        toast.success("Appointment deleted successfully!", {
          style: {
            background: "#f8fafc",
            color: "#0f172a",
            border: "1px solid #e2e8f0",
          },
        });
      }
    } catch (error) {
      console.log(error);

      toast.error("Something went wrong!", {
        style: {
          background: "#fef2f2",
          color: "#991b1b",
          border: "1px solid #fecaca",
        },
      });
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      {/*TOASTER */}
      <Toaster position="top-right" richColors closeButton />

      <div className="max-w-6xl mx-auto px-4">
        {/* Title */}
        <h1 className="text-4xl font-bold mb-6 text-slate-900">
          Dashboard
        </h1>

        {/* Tabs */}
        <div className="flex gap-2 bg-gray-200 p-1 rounded-full w-fit mb-8">
          <Link href={"/dashboard"}>
            <button className="px-5 py-2 rounded-full bg-white text-gray-800 font-medium shadow-sm">
              My Bookings
            </button>
          </Link>

          <Link href={"/profile"}>
            <button className="px-5 py-2 rounded-full text-gray-600 hover:bg-white transition">
              My Profile
            </button>
          </Link>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition"
            >
              {/* Doctor */}
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-teal-700">
                  {booking.doctorName}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {booking.specialty}
                </p>
              </div>

              {/* Info */}
              <div className="space-y-3 text-gray-700">
                <p className="flex items-center gap-3">
                  <User size={18} />
                  Patient: {booking.patientName} ({booking.gender})
                </p>

                <p className="flex items-center gap-3">
                  <CalendarDays size={18} />
                  Date: {booking.date}
                </p>

                <p className="flex items-center gap-3">
                  <Clock size={18} />
                  Time: {booking.time}
                </p>

                <p className="flex items-center gap-3">
                  <Hospital size={18} />
                  {booking.hospital}
                </p>

                <p className="flex items-center gap-3">
                  <MapPin size={18} />
                  {booking.location}
                </p>

                <p>
                  <span className="font-medium">Reason:</span>{" "}
                  {booking.reason}
                </p>

                <p>
                  <span className="font-medium">Fee:</span> ৳{booking.fee}
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-6">

                {/*UPDATE (REMOVE WRONG WRAPPER) */}
                <UpdateBookingModal booking={booking} />

                {/* DELETE */}
                <Modal>
                  <Button
                    onClick={() => setSelectedBooking(booking)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-500 text-white hover:bg-red-600 transition"
                  >
                    <Trash2 size={16} />
                    Delete
                  </Button>

                  {selectedBooking?._id === booking._id && (
                    <Modal.Backdrop className="bg-black/40 backdrop-blur-sm">
                      <Modal.Container placement="center">
                        <Modal.Dialog className="max-w-md rounded-3xl bg-white p-2 shadow-2xl">
                          <Modal.CloseTrigger />

                          <Modal.Body className="py-8 flex flex-col items-center text-center">
                            <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mb-5">
                              <TriangleAlert
                                size={40}
                                className="text-red-500"
                              />
                            </div>

                            <h2 className="text-2xl font-bold text-gray-900">
                              Delete Booking?
                            </h2>

                            <p className="text-gray-500 mt-3">
                              This action cannot be undone.
                            </p>

                            <div className="flex gap-3 w-full mt-8">
                              <Button
                                slot="close"
                                variant="secondary"
                                className="w-full h-12 rounded-xl border"
                              >
                                Cancel
                              </Button>

                              <Button
                                slot="close"
                                onClick={() =>
                                  handleDelete(booking._id)
                                }
                                className="w-full h-12 rounded-xl bg-red-500 text-white"
                              >
                                Delete
                              </Button>
                            </div>
                          </Modal.Body>
                        </Modal.Dialog>
                      </Modal.Container>
                    </Modal.Backdrop>
                  )}
                </Modal>
              </div>
            </div>
          ))}
        </div>

        {/* Empty */}
        {bookings.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No bookings found.
          </p>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;