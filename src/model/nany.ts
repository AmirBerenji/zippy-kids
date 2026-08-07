export interface Nanny {
  id: number;
  gender: string;
  location_id: number;
  years_experience: number;
  working_hours: string;
  days_available: string;
  commitment_type: string;
  hourly_rate: string;
  fixed_package_description: string;
  contact_enabled: true;
  booking_type: string;
  availability_calendar: [];
  is_verified: true;
  video_intro_url: string;
  resume_url: string;
  photoes: File[];
  nannytranslation: NannyTranslation[];
  age_groups: string;
}

export interface NannyTranslation {
  language_code: string;
  full_name: string;
  specialization: string;
}

/**
 * What `GET /nannies` actually returns per row — richer than `Nanny`, which is
 * the shape used when creating or updating a profile.
 */
export interface NannyDetails {
  id: number;
  gender: string | null;
  user: NannyUser;
  location: NannyLocation | null;
  years_experience: number | null;
  working_hours: string | null;
  days_available: string | null;
  commitment_type: string | null;
  /** Free text on the server — "1500", "5000 AMD/hour" are both real values. */
  hourly_rate: string | null;
  fixed_package_description: string | null;
  contact_enabled: boolean;
  booking_type: string | null;
  is_verified: boolean;
  video_intro_url: string | null;
  resume_url: string | null;
  age_groups: string | null;
  reviews_count: number;
  average_rating: number;
  languages: NannyLanguage[];
  translations: NannyTranslationResponse[];
}

export interface NannyUser {
  id: number;
  name: string;
  email: string;
  roles: string[];
  phone: string | null;
  photo: string | null;
  photoUrl: string | null;
}

export interface NannyLocation {
  id: number;
  city: string | null;
  district: string | null;
  postal_code: string | null;
}

export interface NannyLanguage {
  id: number;
  name: string;
  code: string;
}

export interface NannyTranslationResponse {
  id: number;
  nanny_id: number;
  language_code: string;
  full_name: string;
  specialization: string | null;
}

/** `data` of the `GET /nannies` envelope. */
export interface NannyListData {
  nannies: NannyDetails[];
  pagination: NannyPagination;
  total_available?: number;
}

export interface NannyPagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  has_more_pages?: boolean;
}

export interface NurseFormData {
  gender: string;
  location_id: string;
  years_experience: string;
  working_hours: string;
  commitment_type: string;
  hourly_rate: string;
  booking_type: string;
  fixed_package_description: string;
  video_intro_url: string;
  resume_url: string;
  ageGroups: string;
  id: number;
}
