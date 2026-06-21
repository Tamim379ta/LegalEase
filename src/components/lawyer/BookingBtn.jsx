"use client"

import { sendBooking } from "@/lib/action/booking";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

const BookingBtn = ({ lawyer }) => {
  const { photoUrl, name,_id, specialization, bio, fee, status,lawyerId } = lawyer;
  const { data: session, isPending } = authClient.useSession();
  if(isPending){
    return;
  }
  const user = session?.user
  const handleBook = async (e) => {
    e.preventDefault();

    const res = await sendBooking({
      userName: user?.name,
      userId: user?.id,
      lawyerId: lawyerId,
      lawyerName: name,
      specialization,
      fee,
      haringStatus: "pending"
    })
    toast.success("Booking Sent Successfully")
  }
  return (
    <div>
      <button onClick={handleBook} className="mt-2 h-12 w-full rounded-xl bg-[#814F30] font-semibold text-white transition-all hover:bg-[#814F30]/90 active:scale-[0.98]">
        Book a Consultation
      </button>

    </div>
  );
};

export default BookingBtn;