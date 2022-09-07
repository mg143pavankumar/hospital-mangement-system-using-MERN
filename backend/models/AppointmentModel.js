import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true, "Please specify your symptoms"],
  },
  appointmentToDoctor: {
    type: String,
    required: [true, "Please select the doctor"],
  },

  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const AppointmentModel = mongoose.model("Appointment", appointmentSchema);
export default AppointmentModel;
