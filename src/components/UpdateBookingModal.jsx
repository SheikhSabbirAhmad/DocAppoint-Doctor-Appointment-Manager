"use client";

import {
  Modal,
  Button,
  Input,
  Label,
  Surface,
  TextField,
} from "@heroui/react";

import { Pencil } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

const UpdateBookingModal = ({ booking }) => {
  // TIME FIX
  const formatTime = (time) => {
    if (!time) return "";

    if (
      time.includes(":") &&
      !time.includes("AM") &&
      !time.includes("PM")
    ) {
      return time;
    }

    const [clock, modifier] = time.split(" ");
    let [hours, minutes] = clock.split(":");

    if (hours === "12") {
      hours = "00";
    }

    if (modifier === "PM") {
      hours = parseInt(hours, 10) + 12;
    }

    return `${hours.toString().padStart(2, "0")}:${minutes}`;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const form = e.target;

    const updatedBooking = {
      doctorName: booking.doctorName,
      patientName: form.patientName.value,
      date: form.date.value,
      time: form.time.value,
      reason: form.reason.value,
    };

    try {
      // ✅ FIX: always fresh token (VERY IMPORTANT)
      const tokenRes = await authClient.token();
      const token = tokenRes?.data?.token;

      const res = await fetch(
        `http://localhost:5000/booking/${booking._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedBooking),
        }
      );

      const data = await res.json();

      console.log("UPDATE RESPONSE:", data);

      if (data.modifiedCount > 0) {
        toast.success("Appointment updated successfully!", {
          style: {
            background: "#ecfeff",
            color: "#0f172a",
            border: "1px solid #a5f3fc",
            borderRadius: "14px",
          },
        });

        setTimeout(() => {
          window.location.reload();
        }, 800);
      } else {
        toast.error("No changes were made!");
      }
    } catch (error) {
      console.log("UPDATE ERROR:", error);

      toast.error("Something went wrong!", {
        style: {
          background: "#fef2f2",
          color: "#991b1b",
          border: "1px solid #fecaca",
          borderRadius: "14px",
        },
      });
    }
  };

  return (
    <Modal>
      {/* BUTTON */}
      <Button
        variant="secondary"
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl border bg-white text-gray-700 hover:bg-gray-100 transition shadow-sm"
      >
        <Pencil size={16} />
        Update
      </Button>

      {/* MODAL */}
      <Modal.Backdrop className="bg-black/40 backdrop-blur-sm">
        <Modal.Container placement="center">
          <Modal.Dialog className="w-full max-w-2xl rounded-3xl bg-white p-8 shadow-2xl">
            <Modal.CloseTrigger className="absolute right-5 top-5 text-gray-500 hover:text-black" />

            {/* HEADER */}
            <Modal.Header className="pb-2">
              <Modal.Heading className="text-3xl font-bold text-gray-900">
                Update Appointment
              </Modal.Heading>
            </Modal.Header>

            {/* BODY */}
            <Modal.Body>
              <Surface variant="default" className="border-none shadow-none">
                <form onSubmit={handleUpdate} className="flex flex-col gap-5">

                  {/* Doctor */}
                  <TextField className="w-full">
                    <Label className="mb-2 font-semibold">Doctor</Label>
                    <Input
                      name="doctorName"
                      value={booking.doctorName}
                      readOnly
                      disabled
                      className="cursor-not-allowed opacity-70"
                    />
                  </TextField>

                  {/* Patient */}
                  <TextField className="w-full">
                    <Label className="mb-2 font-semibold">Patient Name</Label>
                    <Input
                      name="patientName"
                      defaultValue={booking.patientName}
                      placeholder="Patient full name"
                    />
                  </TextField>

                  {/* DATE + TIME */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <TextField className="w-full">
                      <Label className="mb-2 font-semibold">Date</Label>
                      <Input
                        type="date"
                        name="date"
                        defaultValue={booking.date}
                      />
                    </TextField>

                    <TextField className="w-full">
                      <Label className="mb-2 font-semibold">Time</Label>
                      <Input
                        type="time"
                        name="time"
                        defaultValue={formatTime(booking.time)}
                      />
                    </TextField>
                  </div>

                  {/* Reason */}
                  <TextField className="w-full">
                    <Label className="mb-2 font-semibold">Reason (Optional)</Label>
                    <Input
                      name="reason"
                      defaultValue={booking.reason}
                      placeholder="Brief reason for visit"
                    />
                  </TextField>

                  {/* BUTTON */}
                  <Modal.Footer className="px-0">
                    <Button
                      type="submit"
                      className="w-full bg-teal-600 hover:bg-teal-700 text-white h-12 rounded-xl"
                    >
                      Save Changes
                    </Button>
                  </Modal.Footer>

                </form>
              </Surface>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default UpdateBookingModal;