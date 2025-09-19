export interface Register {
  email: string;
  password: string;
  password_confirmation: string;
  name: string;
  phone: string;
  role: string;
}

export interface Profile {
  email: string;
  name: string;
  phone: string;
  roles: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface UpdateProfile {
  name: string;
  phone: string;
  email: string;
}

export interface UpdateProfileImage {
  photo: File;
}
