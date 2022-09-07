import express from "express";
import {
  bookNewAppointment,
  loginPatient,
  logoutPatient,
  registerPatient,
} from "../controllers/patientControllers.js";

const router = express.Router();

router.route("/patient-register").post(registerPatient);
router.route("/patient-login").post(loginPatient);
router.route("/patient-logout").post(logoutPatient);

router.route("/patient-book-appointment/:id").post(bookNewAppointment);

export default router;
