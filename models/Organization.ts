import { Schema, model, models } from "mongoose";

const OrganizationSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      unique: [true, "Organization already exists"],
      required: [true, "Organization name is required"],
    },
    info: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    web: {
      type: String,
      trim: true,
    },
    contact: { type: String },
    country: { type: String },
    location: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zipcode: { type: String },
    },
    logo: { type: String },
  },
  {
    timestamps: true,
  }
);

export const Organization =
  models.Organization || model("Organization", OrganizationSchema);
