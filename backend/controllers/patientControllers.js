import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import AppointmentModel from "../models/AppointmentModel.js";
import PatientModel from "../models/PatientModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendToken from "../utils/jwtToken.js";

export const registerPatient = catchAsyncErrors(async (req, res, next) => {
  const {
    name,
    email,
    password,
    address,
    phoneNumber,
    symptoms,
    appointmentTo,
  } = req.body;

  const patientDetails = await PatientModel.create({
    name,
    email,
    password,
    address,
    phoneNumber,
    symptoms,
    appointmentTo,

    // avatar: {
    //   //   public_id: myCloud.public_id,
    //   //   url: myCloud.secure_url,
    // },
  });

  sendToken(patientDetails, 200, res, "Registered Successfully");
});

// Patient Login Controller
export const loginPatient = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler(401, "Please Enter Email & Password"));
  }

  const patient = await PatientModel.findOne({ email }).select("+password");

  if (!patient) {
    return next(new ErrorHandler(401, "Invalid Email or password"));
  }

  // check that password is matched with our database by using own define comparePassword method
  const isPasswordMatched = await patient.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler(401, "Invalid Email or password"));
  }

  sendToken(patient, 200, res, "Login is success");
});

// Logout Patient controller
export const logoutPatient = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out Successfully",
  });
});

// book a new appointment
export const bookNewAppointment = catchAsyncErrors(async (req, res, next) => {
  const { description, appointmentToDoctor } = req.body;

  if (!description || !appointmentToDoctor) {
    return next(
      new ErrorHandler("Please enter description and select doctor", 401)
    );
  }

  const appointment = await AppointmentModel.create({
    description,
    appointmentToDoctor,
    patient: req.user._id,
  });

  const patient = await PatientModel.findById(req.user._id);
  patient.appointments.push(appointment._id);

  await patient.save();

  res.status(200).json({
    success: true,
    message: "Your appointment is created",
    appointment,
  });
});
