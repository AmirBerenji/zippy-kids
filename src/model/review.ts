interface ReviewsData {
  reviews: {
    data: Review[];
    current_page: number;
    last_page: number;
    total: number;
  };
  average_rating: number;
  total_reviews: number;
}

interface ReviewSubmission {
  type: string; // e.g., "nurse"
  reviewable_id: number; // ID of the nurse being reviewed,
  rating: number; // Rating given by the user (1-5),
  comment: string; // Review comment,
}

interface ReviewResponse {
  success: boolean;
  message: string;
  data: ReviewData;
}

interface ReviewData {
  review: Review;
  average_rating: number;
  total_reviews: number;
}

interface Review {
  id: number;
  reviewable_id: number;
  reviewable_type: string;
  user_id: number;
  rating: number;
  comment: string;
  created_at: string;
  updated_at: string;
  user: ReviewUser;
}

interface ReviewUser {
  id: number;
  name: string;
  email: string;
}
