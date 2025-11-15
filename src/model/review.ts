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

interface ReviewsResponse {
  success: boolean;
  message: string;
  data: ReviewsData;
}

interface ReviewsData {
  reviews: BaseInfo;
  average_rating: number;
  total_reviews: number;
}

interface Review {
  id: number;
  reviewable_type: string;
  reviewable_id: number;
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

interface ReviewLink {
  url: string | null;
  label: string;
  active: boolean;
}

interface BaseInfo {
  current_page: number;
  data: Review[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: ReviewLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}
