import { getAllComments } from '@/lib/api/comments';
import { getUserSession } from '@/lib/core/session';
import React from 'react';

const CommentPage = async () => {
  const user = await getUserSession();
  const allComments = await getAllComments();

  const userComments = allComments?.filter((c) => c.userId === user?.id) || [];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="border-b border-[#27405d]/50 pb-4">
        <h1 className="text-2xl font-bold text-black">My Reviews</h1>
        <p className="mt-1 text-sm text-gray-400">
          Reviews you've submitted for lawyers you've consulted with.
        </p>
      </div>

      {/* Count badge */}
      <div className="flex items-center gap-2">
        <span className="rounded-full border border-[#814f30]/30 bg-[#814f30]/10 px-3 py-1 text-xs font-semibold text-[#c8956e]">
          {userComments.length} {userComments.length === 1 ? "Review" : "Reviews"}
        </span>
      </div>

      {userComments.length > 0 ? (
        <div className="flex flex-col gap-3">
          {userComments.map((comment) => (
            <div
              key={comment._id?.$oid || comment._id}
              className="rounded-2xl border border-[#27405d] p-5 transition-colors hover:border-[#814f30]/40"
            >
              <p className="text-sm leading-relaxed text-gray-400">{comment.text}</p>
              <div className="mt-3 flex items-center justify-between border-t border-[#27405d]/50 pt-3">
                <span className="text-xs font-medium text-[#c8956e]">
                  {comment.lawyerName || "Lawyer"}
                </span>
                <span className="text-xs text-gray-500">
                  {new Date(comment.createdAt?.$date || comment.createdAt).toLocaleDateString("en-US", {
                    year: "numeric", month: "short", day: "numeric",
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-[#27405d]/50 border-dashed p-10 text-center">
          <p className="text-sm font-medium text-gray-400">No reviews yet.</p>
          <p className="mt-1 text-xs text-gray-500">
            After booking and completing a consultation, you can leave a review.
          </p>
        </div>
      )}
    </div>
  );
};

export default CommentPage;