import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please enter your email"],
    validator: [validator.isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [8, "Password should be greater than 8 characters"],
    select: false,
  },

  // avatar: {
  //   public_id: {
  //     type: String,
  //     required: true,
  //   },
  //   url: {
  //     type: String,
  //     required: true,
  //   },
  // },

  address: {
    type: String,
    required: [true, "Please enter your address"],
  },

  phoneNumber: {
    type: Number,
    required: [true, "Please enter your phone number"],
  },

  symptoms: {
    type: String,
    required: [true, "Please specify your symptoms"],
  },

  role: {
    type: String,
    default: "patient",
  },

  appointmentTo: {
    type: String,
    required: [true, "Please select a doctor for your treatment"],
  },

  appointments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },
  ],

  admitted: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// encrypting the password for security
patientSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  // bcrypting the password
  this.password = await bcrypt.hash(this.password, 10);
});

// decrypting the password for verification
patientSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// JWT TOKEN
patientSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const PatientModel = mongoose.model("Patient", patientSchema);
export default PatientModel;
