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
  Loader2,
} from "lucide-react";

import Link from "next/link";
import { Modal, Button } from "@heroui/react";
import { toast, Toaster } from "sonner";

import UpdateBookingModal from "@/components/UpdateBookingModal";
import Image from "next/image";

const DashboardPage = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  // GET BOOKINGS
  const fetchBookings = async () => {
    try {
      setLoading(true);

      const tokenRes = await authClient.token();
      const token = tokenRes?.data?.token;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/booking/my-bookings`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      setBookings(data);

    } catch (error) {
      console.log(error);
      toast.error("Failed to load bookings!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // DELETE
  const handleDelete = async (id) => {
    try {
      const tokenRes = await authClient.token();
      const token = tokenRes?.data?.token;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/booking/${id}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (data.deletedCount > 0) {
        setBookings((prev) =>
          prev.filter((booking) => booking._id !== id)
        );

        setSelectedBooking(null);

        toast.success("Appointment deleted successfully!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <Toaster position="top-right" richColors closeButton />

      <div className="max-w-6xl mx-auto px-4">

        {/* TITLE */}
        <div className="flex gap-1 mb-5">
          <h1 className="text-4xl font-bold text-slate-900">
            Dashboard
          </h1>

          <Image
            src="/NavbarImg3.png"
            alt="logo"
            width={30}
            height={30}
            className="rounded-md"
          />
        </div>

        {/* TABS */}
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

        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-teal-600" size={40} />
            <p className="text-gray-500 mt-3">Loading your bookings...</p>
          </div>
        )}

        {/* BOOKINGS */}
        {!loading && (
          <div className="grid md:grid-cols-2 gap-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white border rounded-3xl p-6 shadow-sm hover:shadow-md transition"
              >
                <h2 className="text-2xl font-bold text-teal-700">
                  {booking.doctorName}
                </h2>

                <p className="text-sm text-gray-500">
                  {booking.specialty}
                </p>

                <div className="space-y-3 mt-4 text-gray-700">
                  <p className="flex items-center gap-3">
                    <User size={18} />
                    {booking.patientName} ({booking.gender})
                  </p>

                  <p className="flex items-center gap-3">
                    <CalendarDays size={18} />
                    {booking.date}
                  </p>

                  <p className="flex items-center gap-3">
                    <Clock size={18} />
                    {booking.time}
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
                    <b>Reason:</b> {booking.reason}
                  </p>

                  <p>
                    <b>Fee:</b> ৳{booking.fee}
                  </p>
                </div>

                {/* ACTIONS */}
                <div className="flex gap-3 mt-6">
                  <UpdateBookingModal booking={booking} />

                  {/* DELETE MODAL */}
                  <Modal>
                    <Button
                      onClick={() => setSelectedBooking(booking)}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-500 text-white"
                    >
                      <Trash2 size={16} />
                      Delete
                    </Button>

                    {selectedBooking?._id === booking._id && (
                      <Modal.Backdrop className="bg-black/40 backdrop-blur-sm">
                        <Modal.Container placement="center">
                          <Modal.Dialog className="max-w-md bg-white rounded-3xl p-4">

                            <Modal.Body className="text-center">
                              <div className="w-20 h-20 mx-auto rounded-full bg-red-100 flex items-center justify-center mb-4">
                                <TriangleAlert className="text-red-500" />
                              </div>

                              <h2 className="text-xl font-bold">
                                Delete Booking?
                              </h2>

                              <p className="text-gray-500 mt-2">
                                This action cannot be undone.
                              </p>

                              <div className="flex gap-3 mt-6">
                                <Button
                                  slot="close"
                                  className="w-full border"
                                >
                                  Cancel
                                </Button>

                                <Button
                                  slot="close"
                                  onClick={() =>
                                    handleDelete(booking._id)
                                  }
                                  className="w-full bg-red-500 text-white"
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
        )}

        {/* EMPTY STATE */}
        {!loading && bookings.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No bookings found.
          </p>
        )}

      </div>
    </div>
  );
};

export default DashboardPage;