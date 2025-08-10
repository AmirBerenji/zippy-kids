export interface Register {
  email: string;
  password: string;
  password_confirmation: string;
  name: string;
  phone: string;
  role: string[];
}

export interface Profile {
  email: string;
  name: string;
  phone: string;
  role: string[];
}

export interface Login {
  email: string;
  password: string;
}
