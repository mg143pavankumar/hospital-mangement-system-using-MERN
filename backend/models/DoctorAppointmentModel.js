import mongoose from "mongoose";

const doctorAppointmentSchema = new mongoose.Schema({
  doctorName: {
    type: String,
    required: [true, "Please select doctor for appointment"],
  },
});

const DoctorAppointmentModel = mongoose.model(
  "DoctorAppointmentModel",
  doctorAppointmentSchema
);

export default DoctorAppointmentModel;
