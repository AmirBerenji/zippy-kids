// model/doctor.ts

export interface DoctorTranslation {
  id?: number;
  language_id: number;
  language_code?: string;
  language_name?: string;
  name: string;
  bio?: string;
  education?: string;
  address?: string;
}

export interface Doctor {
  id?: number;
  user_id: number;
  email: string;
  phone?: string;
  specialization: string;
  experience_years: number;
  license_number?: string;
  image?: string;
  location_id: number;
  status: "active" | "inactive" | "suspended";
  translations: DoctorTranslation[];
  location?: {
    id: number;
    city: string;
    district?: string;
    postal_code?: string;
  };
  user?: {
    id: number;
    name: string;
    email: string;
  };
  created_at?: string;
  updated_at?: string;
}