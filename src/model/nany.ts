export interface Nanny {
  id: number;
  gender: string;
  location_id: number;
  years_experience: number;
  working_hours: string;
  days_available: string;
  commitment_type: string;
  hourly_rate: number;
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
