"use client";

import { getNuresById } from "@/action/nurseApiAction";
import { addReview, checkReview, getReviews } from "@/action/reviewApiAction";
import LoadingPage from "@/app/component/general/Loading";
import StarRating from "@/app/component/general/StarRating";
import { Review, ReviewsData, ReviewSubmission } from "@/model/review";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function NurseProfilePage() {
  const { id } = useParams();
  const [nurse, setNurse] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: "",
  });
  const [reviewCount, setReviewCount] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [reviewData, setReviewData] = useState<ReviewsData>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchNurseProfile = async () => {
    try {
      const response = await getNuresById(Number(id));
      console.log("NurseProfileResponse", response);
      setNurse(response);

      var commentList = await getReviews("nurse", id as string);
      console.log("CommentList", commentList.data);

      setReviewData(commentList.data);
      setReviews(commentList.data.reviews.data);

      setReviewCount(commentList.data.total_reviews || 0);
      setAverageRating(commentList.data.average_rating || 0);
    } catch (error) {
      console.error("Error fetching nurse profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    fetchNurseProfile();
  }, [id, mounted]);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newReview.rating === 0 || newReview.comment.trim() === "") {
      alert("Please provide both rating and comment");
      return;
    }

    setIsSubmitting(true);

    try {
      const value: ReviewSubmission = {
        type: "nurse",
        reviewable_id: Number(id),
        rating: newReview.rating,
        comment: newReview.comment,
      };
      console.log("Submitting Review:", value);
      const data = await addReview(value);
      console.log("Review Submission Response:", data);

      if (data?.success) {
        const reviewData = await checkReview("nurse", "1");
        setReviewData(reviewData.data);
        setReviews(reviewData.data.reviews.data);

        setReviewCount(reviewData.data.total_reviews || 0);
        setAverageRating(reviewData.data.average_rating || 0);
      }

      // setReviews([review, ...reviews]);
      setNewReview({ rating: 0, comment: "" });

      alert("Review submitted successfully!");
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (rating: number, interactive: boolean = false) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            disabled={!interactive}
            onClick={() =>
              interactive && setNewReview({ ...newReview, rating: star })
            }
            className={`text-2xl ${
              interactive
                ? "cursor-pointer hover:scale-110 transition-transform"
                : ""
            } ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
          >
            ★
          </button>
        ))}
      </div>
    );
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return null;
  }

  if (loading) {
    return <LoadingPage />;
  }

  if (!nurse) {
    return (
      <div className="min-h-96 flex items-center justify-center">
        <div
          className="text-xl font-semibold text-orange-300 bg-white
                px-12
                transform hover:scale-105 transition-transform duration-300"
        >
          <span className="flex items-center">
            <svg
              className="w-6 h-6 mr-2 text-orange-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            Nurse not found
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col items-center ">
          <img
            src={
              "https://zippy.elrincondsabor.com/storage/app/public/" +
              nurse.user.photo
            }
            alt={nurse.translations[0].full_name}
            className="w-48 h-48  object-cover mb-4 rounded-lg shadow-md"
          />
          <h1 className="text-2xl font-bold mb-2 text-[#2f3e4e] ">
            {nurse.translations[0].full_name}
          </h1>
          <p className="mb-4">
            <StarRating
              rating={averageRating}
              reviewCount={reviewCount}
              size="sm"
            />
          </p>
        </div>

        <div className="mt-14 ml-3">
          <h2 className=" font-semibold text-[19px] mb-3 text-[#ff9a5a] ">
            Professional Details
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">Specialization</h3>
              <p className="text-gray-600">
                {nurse.translations[0].specialization}
              </p>
            </div>
            <div>
              <h3 className="font-medium">Gender</h3>
              <p className="text-gray-600">{nurse.gender}</p>
            </div>
            <div>
              <h3 className="font-medium">Experience</h3>
              <p className="text-[#2f3e4e]">{nurse.years_experience} years</p>
            </div>
            <div>
              <h3 className="font-medium">Hourly Price</h3>
              <p className="text-gray-600">{nurse.hourly_rate}($)</p>
            </div>
            <div className="w-full">
              <h3 className="font-medium">Available Days:</h3>
              <p className="text-gray-600 break-words whitespace-normal">
                {nurse.days_available}
              </p>
            </div>
            <div>
              <h3 className="font-medium">Location:</h3>
              <p className="text-gray-600">{nurse.location.city}</p>
            </div>
            <div>
              <h3 className="font-medium">Working Hours:</h3>
              <p className="text-gray-600">{nurse.working_hours}</p>
            </div>

            <div>
              <h3 className="font-medium">Commitment Type</h3>
              <p className="text-gray-600">{nurse.commitment_type}</p>
            </div>
            <div>
              <h3 className="font-medium">Booking Type</h3>
              <p className="text-gray-600">{nurse.booking_type}</p>
            </div>

            <div>
              <h3 className="font-medium">Description:</h3>
              <p className="text-gray-600">{nurse.fixed_package_description}</p>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-10 border-t border-t-gray-200 pt-4">
          <h2 className="font-semibold text-[14px] mb-4 text-[#ff9a5a]">
            Reviews ({reviewCount})
          </h2>

          {/* Add Review Form */}
          <div className="mb-8 bg-gray-50 p-6 rounded-lg">
            <h3 className="font-medium text-lg mb-4">Write a Review</h3>
            <form onSubmit={handleSubmitReview}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Your Rating
                </label>
                {renderStars(newReview.rating, true)}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Your Comment
                </label>
                <textarea
                  value={newReview.comment}
                  onChange={(e) =>
                    setNewReview({ ...newReview, comment: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff9a5a]"
                  rows={4}
                  placeholder="Share your experience..."
                  disabled={isSubmitting}
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#ff9a5a] text-white px-6 py-2 rounded-lg hover:bg-[#ff8a4a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          </div>

          {/* Reviews List */}
          <div className="space-y-6">
            {reviews.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No reviews yet. Be the first to review!
              </p>
            ) : (
              reviews.map((review) => (
                <div
                  key={review.id}
                  className="border-b pb-6 last:border-b-0 border-b-gray-200"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-semibold">
                      {review.user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{review.user.name}</h4>
                        <span className="text-sm text-gray-500">
                          {new Date(review.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="mb-2">{renderStars(review.rating)}</div>
                      <p className="text-gray-600">{review.comment}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
