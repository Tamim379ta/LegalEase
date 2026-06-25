import { getAllComments } from '@/lib/api/comments';
import { getUserSession } from '@/lib/core/session';
import CommentInput from './CommentInput';

const LawyerCommentSection = async ({ lawyerId, allBookings }) => {
  const user = await getUserSession();
  const allComments = await getAllComments();

  // Filter comments for this specific lawyer
  const lawyerComments = allComments?.filter((c) => c.lawyerId === lawyerId) || [];

  // Find this user's booking for this lawyer
  const userBooking = allBookings?.find(
    (b) => b.userId === user?.id && b.lawyerId === lawyerId
  );

  const isPaid = userBooking?.haringStatus === "paid";
  const isPending = userBooking?.haringStatus === "pending";
  const canInteract = isPaid || isPending; // has a booking

  return (
    <div className="rounded-2xl border border-[#27405d] bg-[#1A2E44] p-6">
      <h2 className="text-lg font-semibold text-white mb-4">Reviews</h2>

      {/* All comments visible to everyone */}
      {lawyerComments.length > 0 ? (
        <div className="flex flex-col gap-3 mb-6">
          {lawyerComments.map((comment) => (
            <div
              key={comment._id?.$oid || comment._id}
              className="rounded-xl bg-[#102235]/40 border border-[#27405d]/30 p-4"
            >
              <p className="text-sm font-medium text-[#d09a75] mb-1">
                {comment.userName || "Anonymous"}
              </p>
              <p className="text-sm text-gray-300">{comment.text}</p>
              <span className="mt-1 block text-xs text-gray-500">
                {new Date(comment.createdAt.$date || comment.createdAt).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500 mb-6">No reviews yet.</p>
      )}

      {/* Only show input if user has a booking */}
      {canInteract ? (
        <>
          <CommentInput
            userId={user?.id}
            userName={user?.name}
            lawyerId={lawyerId}
            disabled={isPending}
          />
          {isPending && (
            <p className="mt-2 text-xs text-yellow-400/80">
              Your payment is pending. You can leave a review once payment is confirmed.
            </p>
          )}
        </>
      ) : (
        <p className="mt-2 text-xs text-gray-500">
          Only clients who have booked this lawyer can leave a review.
        </p>
      )}
    </div>
  );
};

export default LawyerCommentSection;