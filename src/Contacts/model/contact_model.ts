export interface Contact {
  id: string;
  fullName: string;
  email: string;
  message?: string;
}

export interface ContactResponse {
  id?: string;
  fullName?: string;
  email?: string;
  message?: string;
}

export interface ContactInput {
  name: string;
  email: string;
  message?: string;
  phoneNumber?: string; // optional
  project?: string; // optional
  source?: string; // optional ,
  sent?: boolean;
}
