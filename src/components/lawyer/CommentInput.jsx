"use client";

import { postComment } from '@/lib/action/comments';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const CommentInput = ({ userId, lawyerId, disabled, userName , lawyerName}) => {
  const [text, setText] = useState("");
  const router = useRouter()

  const handleSubmit = async () => {
    if (!text.trim()) return;
    await postComment({ userName, text, userId, lawyerId, lawyerName  });
    setText("");
    router.refresh()
  };

  return (
    <div className="flex flex-col gap-3">
      <textarea
        rows={3}
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={disabled}
        placeholder={
          disabled
            ? "Available after payment is confirmed..."
            : "Share your experience with this lawyer..."
        }
        className={`w-full rounded-xl border border-[#27405d] bg-[#102235]/60 px-4 py-3 text-sm text-gray-200 placeholder-gray-500 outline-none resize-none transition
          ${disabled
            ? "cursor-not-allowed opacity-50"
            : "focus:border-[#814F30]/60 focus:ring-1 focus:ring-[#814F30]/30"
          }`}
      />
      <button
        onClick={handleSubmit}
        disabled={disabled}
        className={`self-end rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-all
          ${disabled
            ? "cursor-not-allowed bg-gray-600/50 opacity-50"
            : "bg-[#814F30] hover:bg-[#814F30]/80 active:scale-95"
          }`}
      >
        Submit Review
      </button>
    </div>
  );
};

export default CommentInput;