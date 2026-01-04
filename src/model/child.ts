export interface ChildFormData {
  name: string;
  last_name: string;
  address: string;
  birthday: string;
  blood_type: string;
  gender: string;
  uuid: string;
  image: File | null;
}

export interface childMessage {
  type: string;
  text: string;
}
