interface Review {
  id: number;
  user: {
    id: number;
    name: string;
    email: string;
  };
  rating: number;
  comment: string;
  created_at: string;
  updated_at: string;
}

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