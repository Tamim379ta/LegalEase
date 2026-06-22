"use client";

import { sendBooking } from "@/lib/action/booking";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

const BookingBtn = ({ lawyer }) => {
  const { photoUrl, name, lawyerId, specialization, fee } = lawyer;

  const { data: session, isPending } = authClient.useSession();

  if (isPending) return null;

  const user = session?.user;
  const isLawyer = user?.role === "lawyer";

  const handleBook = async (e) => {
    e.preventDefault();

    if (isLawyer) {
      toast.error("Lawyers cannot book consultations");
      return;
    }

    try {
      await sendBooking({
        userName: user?.name,
        userId: user?.id,
        lawyerId: lawyerId,
        lawyerName: name,
        specialization,
        fee,
        haringStatus: "pending",
      });

      toast.success("Booking Sent Successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <button
        onClick={handleBook}
        disabled={isLawyer}
        className={`mt-2 h-12 w-full rounded-xl font-semibold text-white transition-all active:scale-[0.98] ${
          isLawyer
            ? "cursor-not-allowed bg-gray-600 opacity-60"
            : "bg-[#814F30] hover:bg-[#814F30]/90"
        }`}
      >
        {isLawyer ? "Lawyers Cannot Book" : "Book a Consultation"}
      </button>
    </div>
  );
};

export default BookingBtn;