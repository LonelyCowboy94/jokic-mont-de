export type Appointment = {
  id: number;
  name: string;
  email: string | null;
  note: string;
  date: Date;
  time: string;     // ili Date, zavisi kako ti Neon vraća
  confirmed: boolean;
};

export type NewAppointment = {
  name: string;
  email: string;
  date: string;     // "YYYY-MM-DD"
  time: string;     // "HH:mm"
  confirmed?: boolean; // default false
};

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  image_url?: string;
};