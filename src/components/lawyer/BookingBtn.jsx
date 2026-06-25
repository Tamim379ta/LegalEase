"use client";

import { sendBooking } from "@/lib/action/booking";
import { authClient } from "@/lib/auth-client";
import { Button, Modal } from "@heroui/react";
import { useState } from "react";
import toast from "react-hot-toast";

const BookingBtn = ({ lawyer, allBookings }) => {
  const { name, lawyerId, specialization, fee } = lawyer;
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: session, isPending } = authClient.useSession();

  if (isPending) return null;

  const user = session?.user;
  const isLawyer = user?.role === "lawyer";

  const existingBooking = allBookings?.find(
    (b) => b.userId === user?.id && b.lawyerId === lawyerId
  );

  const isAlreadyPending = existingBooking?.haringStatus === "pending";
  const isAlreadyPaid = existingBooking?.haringStatus === "paid";
  const isDisabled = isLawyer || isAlreadyPending || isAlreadyPaid;

  const getButtonLabel = () => {
    if (isLawyer) return "Lawyers Cannot Book";
    if (isAlreadyPaid) return "Consultation Booked";
    if (isAlreadyPending) return "Booking Pending...";
    return "Book a Consultation";
  };

  const handleConfirm = async () => {
    setIsSubmitting(true);
    try {
      await sendBooking({
        userName: user?.name,
        userId: user?.id,
        lawyerId,
        lawyerName: name,
        specialization,
        fee,
        haringStatus: "pending",
      });
      toast.success("Booking Sent Successfully");
      setIsOpen(false);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => !isDisabled && setIsOpen(true)}
        disabled={isDisabled}
        className={`mt-2 h-12 w-full rounded-xl font-semibold text-white transition-all active:scale-[0.98] ${
          isDisabled
            ? "cursor-not-allowed bg-gray-600 opacity-60"
            : "bg-[#814F30] hover:bg-[#814F30]/90"
        }`}
      >
        {getButtonLabel()}
      </button>

      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog className="sm:max-w-[360px]">
              <Modal.CloseTrigger />
              <Modal.Header>
                <Modal.Heading>Confirm Booking</Modal.Heading>
              </Modal.Header>
              <Modal.Body>
                <p className="text-sm text-gray-400">
                  Are you sure you want to book a consultation with{" "}
                  <span className="font-semibold text-black">Advocate {name}</span>?
                </p>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  slot="close"
                  variant="secondary"
                  className="w-full"
                  isDisabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  className="w-full bg-[#814F30] text-white hover:bg-[#814F30]/80"
                  onPress={handleConfirm}
                  isLoading={isSubmitting}
                >
                  Confirm
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
};

export default BookingBtn;