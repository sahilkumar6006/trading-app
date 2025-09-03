import { Timestamp } from "./../../node_modules/bson/src/timestamp";
import mongoose from "mongoose";

import bycrptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { time } from "console";

interface Iuser {
  email: string;
  password: string;
  name: string;
  login_pin: string;
  phone_number: string;
  date_of_birth: Date;
  biometrictKey: string;
  gender: string;
  wrong_pin_attempts: number;
  blocked_until_pin: Date;
  balance: number;
}

const userSchema = new mongoose.Schema<Iuser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
      validate: {
        validator: function (v) {
          return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          );
        },
        message: "Invalid email address",
      },
    },

    password: {
      required: true,
    },
    name: {
      type: String,
      required: true,
      minlenght: 3,
      maxlength: 50,
    },

    login_pin: {
      type: String,
      minlength: 4,
      maxlength: 4,
    },
    phone_number: {
      type: String,
      match: [/^\+[0-9]{6,14}$/, "Please enter a valid phone number"],
      unique: true,
      sparse: true,
    },

    date_of_birth: Date,
    biometrictKey: String,
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "other",
    },

    wrong_pin_attempts: {
      type: Number,
      default: 0,
    },

    blocked_until_pin: {
      type: Date,
      default: null,
    },

    balance: {
      type: Number,
      default: 50000,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<Iuser>("User", userSchema);

export default User;
