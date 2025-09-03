import mongoose, { Model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

interface Iuser {
  email: string;
  password: string;
  name: string;
  login_pin: string;
  phone_number?: string;
  date_of_birth?: Date;
  biometrictKey?: string;
  gender: "male" | "female" | "other";
  wrong_pin_attempts: number;
  blocked_until_pin?: Date;
  balance: number;
  refreshToken?: string;
  accessToken?: string;
}

export interface IUserMethods {
  comparePassword(password: string): Promise<boolean>;
  comparePin(pin: string): Promise<boolean>;
}

export interface IUserModel extends Model<Iuser, {}, IUserMethods> {
  updatePin(email: string, pin: string): Promise<Iuser | null>;
  createAccessToken(email: string): Promise<string>;
}

const userSchema = new mongoose.Schema<Iuser, IUserModel, IUserMethods>(
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
        validator: (v: string) =>
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          ),
        message: "Invalid email address",
      },
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      minlength: 3,
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
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.pre("save", async function (next) {
  if (this.isModified("login_pin")) {
    this.login_pin = await bcrypt.hash(this.login_pin, 10);
  }
  next();
});

userSchema.methods.comparePassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

userSchema.methods.comparePin = async function (pin: string) {
  return bcrypt.compare(pin, this.login_pin);
};

userSchema.statics.updatePin = async function (email: string, pin: string) {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");
  user.login_pin = await bcrypt.hash(pin, 10);
  await user.save();
  return user;
};

userSchema.statics.createAccessToken = async function (email: string) {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: "1h", issuer: "TradingApp" }
  );
};

userSchema.statics.createRefreshToken = async function (email: string) {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: "7d", issuer: "TradingApp" }
  );
};

const User = mongoose.model<Iuser, IUserModel>("User", userSchema);

export default User;
