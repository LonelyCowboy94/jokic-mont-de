import mongoose from "mongoose";

export interface IAppointment extends Document {
  name: string;
  email: string;
  note?: string;
  date: Date;
  time: string;
}

const AppointmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    note: { type: String },
    date: { type: Date, required: true },
    time: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Appointment ||
  mongoose.model("Appointment", AppointmentSchema);
