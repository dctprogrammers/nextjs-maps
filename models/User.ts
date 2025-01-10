import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
      minLength: [3, "Name must be at least 3 characters, got {VALUE}"],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: [true, "Email already exists"],
      required: [true, "Email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w+)+$/,
        // /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: {
        values: ["admin", "service", "distributor", "manager"],
        message: "{Value} is not supprted",
      },
    },
    position: { type: String },
    phone: { type: String },
    country: { type: String },
    description: { type: String },
    profile: {
      type: String,
      default: "defaultProfile.jpg",
    },
  },
  {
    timestamps: true,
  }
);

export const User = models.User || model("User", UserSchema);
