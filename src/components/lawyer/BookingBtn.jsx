"use client"
const handleBook = () => {
    e.preventDefault();

  }
const BookingBtn = ({lawyer}) => {
  return (
    <div>
      <button onClick={handleBook} className="mt-2 h-12 w-full rounded-xl bg-[#814F30] font-semibold text-white transition-all hover:bg-[#814F30]/90 active:scale-[0.98]">
        Book a Consultation
      </button>

    </div>
  );
};

export default BookingBtn;