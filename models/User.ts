import { Schema, model, models } from "mongoose";
import { unique } from "next/dist/build/utils";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required."],
      minLength: [3, "Name must be at least 3 characters, got {VALUE}"],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, "Email is required."],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w+)+$/,
        // /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        "Please fill a valid email address.",
      ],
      index: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
      minLength: [8, "Password must be at least 8 characters, got {VALUE}"],
    },
    role: {
      type: String,
      enum: {
        values: ["admin", "service", "distributor", "manager", "customer"],
        message: "{VALUE} is not supported",
      },
      default: "customer",
      index: true,
    },
    position: { type: String, trim: true },
    phone: {
      type: String,
      trim: true,
      match: [/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number."],
    },
    country: { type: String, trim: true },
    description: { type: String, trim: true },
    avatar: {
      type: String,
      default: "defaultAvatar.jpg",
    },
    urlname: { type: String, unique: true, index: true, trim: true },
    emailVerified: {
      type: Date,
      default: null,
    },
    machines: [
      {
        type: Schema.Types.ObjectId,
        ref: "Machine",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const User = models.User || model("User", UserSchema);
