"use client";

import { getNuresById } from "@/action/nurseApiAction";
import {
  getNurseReviews,
  checkNurseReview,
  submitNurseReview,
  updateReview,
  deleteReview,
} from "@/action/reviewApiAction";
import LoadingPage from "@/app/component/general/Loading";
import StarRating from "@/app/component/general/StarRating";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


export default function NurseProfilePage() {
  const { id } = useParams();
  const [nurse, setNurse] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [reviewsData, setReviewsData] = useState<ReviewsData | null>(null);
  const [newReview, setNewReview] = useState({ rating: 0, comment: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasReviewed, setHasReviewed] = useState(false);
  const [userReview, setUserReview] = useState<Review | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    fetchNurseProfile();
  }, [id, mounted]);

  const fetchNurseProfile = async () => {
    try {
      const response = await getNuresById(Number(id));
      console.log("NurseProfileResponse", response);
      setNurse(response);

      await fetchReviews();
      await checkUserReviewStatus();
    } catch (error) {
      console.error("Error fetching nurse profile:", error);
      setError("Failed to load nurse profile");
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async (page = 1) => {
    try {
      const data = await getNurseReviews(Number(id), page);
      if (data.success) {
        setReviewsData(data.data);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const checkUserReviewStatus = async () => {
    try {
      const data = await checkNurseReview(Number(id));
      if (data.success) {
        setHasReviewed(data.data.has_reviewed);
        setUserReview(data.data.review);

        if (data.data.review) {
          setNewReview({
            rating: data.data.review.rating,
            comment: data.data.review.comment || "",
          });
        }
      }
    } catch (error) {
      console.error("Error checking user review:", error);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newReview.rating === 0 || newReview.comment.trim() === "") {
      alert("Please provide both rating and comment");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      let data;

      if (isEditing && userReview) {
        data = await updateReview(userReview.id, newReview);
        alert("Review updated successfully!");
      } else {
        data = await submitNurseReview(Number(id), newReview);
        alert("Review submitted successfully!");
      }

      if (data.success) {
        setHasReviewed(true);
        setIsEditing(false);
        await fetchReviews();
        await checkUserReviewStatus();
      }
    } catch (error: any) {
      console.error("Error submitting review:", error);

      if (error.message.includes("already submitted")) {
        setError("You have already submitted a review for this nurse.");
        setHasReviewed(true);
        await checkUserReviewStatus();
      } else {
        setError(error.message || "Failed to submit review");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteReview = async () => {
    if (
      !userReview ||
      !confirm("Are you sure you want to delete your review?")
    ) {
      return;
    }

    try {
      const data = await deleteReview(userReview.id);

      if (data.success) {
        alert("Review deleted successfully!");
        setHasReviewed(false);
        setUserReview(null);
        setNewReview({ rating: 0, comment: "" });
        setIsEditing(false);
        await fetchReviews();
      }
    } catch (error: any) {
      console.error("Error deleting review:", error);
      alert(error.message || "Failed to delete review");
    }
  };

  const handleEditReview = () => {
    setIsEditing(true);
    if (userReview) {
      setNewReview({
        rating: userReview.rating,
        comment: userReview.comment || "",
      });
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    if (userReview) {
      setNewReview({
        rating: userReview.rating,
        comment: userReview.comment || "",
      });
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

  if (!mounted) return null;
  if (loading) return <LoadingPage />;

  if (!nurse) {
    return (
      <div className="min-h-96 flex items-center justify-center">
        <div className="text-xl font-semibold text-orange-300 bg-white px-12 transform hover:scale-105 transition-transform duration-300">
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

  const averageRating = reviewsData?.average_rating || 0;
  const totalReviews = reviewsData?.total_reviews || 0;
  const reviews = reviewsData?.reviews.data || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        {/* Nurse Profile Header */}
        <div className="flex flex-col items-center">
          <img
            src={
              "https://zippy.elrincondsabor.com/storage/app/public/" +
              nurse.user.photo
            }
            alt={nurse.translations[0].full_name}
            className="w-48 h-48 object-cover mb-4 rounded-lg shadow-md"
          />
          <h1 className="text-2xl font-bold mb-2 text-[#2f3e4e]">
            {nurse.translations[0].full_name}
          </h1>
          <p className="mb-4">
            <StarRating
              rating={averageRating}
              reviewCount={totalReviews}
              size="sm"
            />
          </p>
        </div>

        {/* Professional Details */}
        <div className="mt-14 ml-3">
          <h2 className="font-semibold text-[19px] mb-3 text-[#ff9a5a]">
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
          <h2 className="font-semibold text-[19px] mb-4 text-[#ff9a5a]">
            Reviews ({totalReviews})
          </h2>

          {/* Add/Edit Review Form */}
          {(!hasReviewed || isEditing) && (
            <div className="mb-8 bg-gray-50 p-6 rounded-lg">
              <h3 className="font-medium text-lg mb-4">
                {isEditing ? "Edit Your Review" : "Write a Review"}
              </h3>

              {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmitReview}>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Your Rating *
                  </label>
                  {renderStars(newReview.rating, true)}
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Your Comment *
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
                    required
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#ff9a5a] text-white px-6 py-2 rounded-lg hover:bg-[#ff8a4a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting
                      ? "Submitting..."
                      : isEditing
                      ? "Update Review"
                      : "Submit Review"}
                  </button>
                  {isEditing && (
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          )}

          {/* User's Existing Review */}
          {hasReviewed && !isEditing && userReview && (
            <div className="mb-8 bg-blue-50 p-6 rounded-lg border border-blue-200">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-medium text-lg">Your Review</h3>
                <div className="flex gap-2">
                  <button
                    onClick={handleEditReview}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={handleDeleteReview}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="mb-2">{renderStars(userReview.rating)}</div>
              <p className="text-gray-700">{userReview.comment}</p>
              <p className="text-sm text-gray-500 mt-2">
                {new Date(userReview.created_at).toLocaleDateString()}
              </p>
            </div>
          )}

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

          {/* Pagination */}
          {reviewsData && reviewsData.reviews.last_page > 1 && (
            <div className="mt-6 flex justify-center gap-2">
              {Array.from(
                { length: reviewsData.reviews.last_page },
                (_, i) => i + 1
              ).map((page) => (
                <button
                  key={page}
                  onClick={() => fetchReviews(page)}
                  className={`px-4 py-2 rounded ${
                    page === reviewsData.reviews.current_page
                      ? "bg-[#ff9a5a] text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// import { getNuresById } from "@/action/nurseApiAction";
// import LoadingPage from "@/app/component/general/Loading";
// import StarRating from "@/app/component/general/StarRating";
// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";

// // Review interface
// interface Review {
//   id: number;
//   user_name: string;
//   user_photo?: string;
//   rating: number;
//   comment: string;
//   date: string;
// }

// export default function NurseProfilePage() {
//   const { id } = useParams();
//   const [nurse, setNurse] = useState<any>();
//   const [loading, setLoading] = useState(true);
//   const [mounted, setMounted] = useState(false);
//   const [reviews, setReviews] = useState<Review[]>([]);
//   const [newReview, setNewReview] = useState({
//     rating: 0,
//     comment: "",
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     setLoading(true);
//     setMounted(true);
//   }, []);

//   useEffect(() => {
//     if (!mounted) return;

//     const fetchNurseProfile = async () => {
//       try {
//         const response = await getNuresById(Number(id));
//         console.log("NurseProfileResponse", response);
//         setNurse(response);

//         // TODO: Fetch reviews from your API
//         // const reviewsResponse = await getReviewsByNurseId(Number(id));
//         // setReviews(reviewsResponse);

//         // Mock reviews for demonstration
//         setReviews([
//           {
//             id: 1,
//             user_name: "John Doe",
//             rating: 5,
//             comment: "Excellent care! Very professional and attentive.",
//             date: "2025-10-15",
//           },
//           {
//             id: 2,
//             user_name: "Jane Smith",
//             rating: 4,
//             comment: "Great experience. Highly recommend!",
//             date: "2025-10-10",
//           },
//         ]);
//       } catch (error) {
//         console.error("Error fetching nurse profile:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNurseProfile();
//   }, [id, mounted]);

//   const handleSubmitReview = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (newReview.rating === 0 || newReview.comment.trim() === "") {
//       alert("Please provide both rating and comment");
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       // TODO: Submit review to your API
//       // await submitReview(Number(id), newReview);

//       // Mock submission - add review to list
//       const review: Review = {
//         id: Date.now(),
//         user_name: "Current User", // Replace with actual user name
//         rating: newReview.rating,
//         comment: newReview.comment,
//         date: new Date().toISOString().split('T')[0],
//       };

//       setReviews([review, ...reviews]);
//       setNewReview({ rating: 0, comment: "" });

//       alert("Review submitted successfully!");
//     } catch (error) {
//       console.error("Error submitting review:", error);
//       alert("Failed to submit review");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const renderStars = (rating: number, interactive: boolean = false) => {
//     return (
//       <div className="flex gap-1">
//         {[1, 2, 3, 4, 5].map((star) => (
//           <button
//             key={star}
//             type="button"
//             disabled={!interactive}
//             onClick={() => interactive && setNewReview({ ...newReview, rating: star })}
//             className={`text-2xl ${
//               interactive ? "cursor-pointer hover:scale-110 transition-transform" : ""
//             } ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
//           >
//             ★
//           </button>
//         ))}
//       </div>
//     );
//   };

//   // Prevent hydration mismatch by not rendering until mounted
//   if (!mounted) {
//     return null;
//   }

//   if (loading) {
//     return <LoadingPage />;
//   }

//   if (!nurse) {
//     return (
//       <div className="min-h-96 flex items-center justify-center">
//         <div
//           className="text-xl font-semibold text-orange-300 bg-white
//                 px-12
//                 transform hover:scale-105 transition-transform duration-300"
//         >
//           <span className="flex items-center">
//             <svg
//               className="w-6 h-6 mr-2 text-orange-500"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
//               />
//             </svg>
//             Nurse not found
//           </span>
//         </div>
//       </div>
//     );
//   }

//   const averageRating = reviews.length > 0
//     ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
//     : 0;

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
//         <div className="flex flex-col items-center ">
//           <img
//             src={
//               "https://zippy.elrincondsabor.com/storage/app/public/" +
//               nurse.user.photo
//             }
//             alt={nurse.translations[0].full_name}
//             className="w-48 h-48  object-cover mb-4 rounded-lg shadow-md"
//           />
//           <h1 className="text-2xl font-bold mb-2 text-[#2f3e4e] ">
//             {nurse.translations[0].full_name}
//           </h1>
//           <p className="mb-4">
//             <StarRating rating={averageRating} reviewCount={reviews.length} size="sm" />
//           </p>
//         </div>

//         <div className="mt-14 ml-3">
//           <h2 className=" font-semibold text-[19px] mb-3 text-[#ff9a5a] ">
//             Professional Details
//           </h2>
//           <div className="space-y-4">
//             <div>
//               <h3 className="font-medium">Specialization</h3>
//               <p className="text-gray-600">
//                 {nurse.translations[0].specialization}
//               </p>
//             </div>
//             <div>
//               <h3 className="font-medium">Gender</h3>
//               <p className="text-gray-600">{nurse.gender}</p>
//             </div>
//             <div>
//               <h3 className="font-medium">Experience</h3>
//               <p className="text-[#2f3e4e]">{nurse.years_experience} years</p>
//             </div>
//             <div>
//               <h3 className="font-medium">Hourly Price</h3>
//               <p className="text-gray-600">{nurse.hourly_rate}($)</p>
//             </div>
//             <div className="w-full">
//               <h3 className="font-medium">Available Days:</h3>
//               <p className="text-gray-600 break-words whitespace-normal">
//                 {nurse.days_available}
//               </p>
//             </div>
//             <div>
//               <h3 className="font-medium">Location:</h3>
//               <p className="text-gray-600">{nurse.location.city}</p>
//             </div>
//             <div>
//               <h3 className="font-medium">Working Hours:</h3>
//               <p className="text-gray-600">{nurse.working_hours}</p>
//             </div>

//             <div>
//               <h3 className="font-medium">Commitment Type</h3>
//               <p className="text-gray-600">{nurse.commitment_type}</p>
//             </div>
//             <div>
//               <h3 className="font-medium">Booking Type</h3>
//               <p className="text-gray-600">{nurse.booking_type}</p>
//             </div>

//             <div>
//               <h3 className="font-medium">Description:</h3>
//               <p className="text-gray-600">{nurse.fixed_package_description}</p>
//             </div>
//           </div>
//         </div>

//         {/* Reviews Section */}
//         <div className="mt-10 border-t border-t-gray-200 pt-4">
//           <h2 className="font-semibold text-[14px] mb-4 text-[#ff9a5a]">
//             Reviews ({reviews.length})
//           </h2>

//           {/* Add Review Form */}
//           <div className="mb-8 bg-gray-50 p-6 rounded-lg">
//             <h3 className="font-medium text-lg mb-4">Write a Review</h3>
//             <form onSubmit={handleSubmitReview}>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium mb-2">
//                   Your Rating
//                 </label>
//                 {renderStars(newReview.rating, true)}
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium mb-2">
//                   Your Comment
//                 </label>
//                 <textarea
//                   value={newReview.comment}
//                   onChange={(e) =>
//                     setNewReview({ ...newReview, comment: e.target.value })
//                   }
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff9a5a]"
//                   rows={4}
//                   placeholder="Share your experience..."
//                   disabled={isSubmitting}
//                 />
//               </div>
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="bg-[#ff9a5a] text-white px-6 py-2 rounded-lg hover:bg-[#ff8a4a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {isSubmitting ? "Submitting..." : "Submit Review"}
//               </button>
//             </form>
//           </div>

//           {/* Reviews List */}
//           <div className="space-y-6">
//             {reviews.length === 0 ? (
//               <p className="text-gray-500 text-center py-8">
//                 No reviews yet. Be the first to review!
//               </p>
//             ) : (
//               reviews.map((review) => (
//                 <div
//                   key={review.id}
//                   className="border-b pb-6 last:border-b-0 border-b-gray-200"
//                 >
//                   <div className="flex items-start gap-4">
//                     <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-semibold">
//                       {review.user_name.charAt(0).toUpperCase()}
//                     </div>
//                     <div className="flex-1">
//                       <div className="flex items-center justify-between mb-2">
//                         <h4 className="font-medium">{review.user_name}</h4>
//                         <span className="text-sm text-gray-500">
//                           {new Date(review.date).toLocaleDateString()}
//                         </span>
//                       </div>
//                       <div className="mb-2">{renderStars(review.rating)}</div>
//                       <p className="text-gray-600">{review.comment}</p>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
