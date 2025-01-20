import mongoose, { Schema, model, models } from "mongoose";

const VerificationTokenSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    expires: {
      type: Date,
      default: Date.now(),
      expires: 86400, // 60 * 60 * 24, // 24 hours
    },
  },
  {
    timestamps: true,
  }
);

// VerificationTokenSchema.methods.greeting = function (token: string) {
//   return `Hi. Good morning, ${token}`;
// };

// VerificationTokenSchema.methods.compare = function (token: string) {
//   return mongoose.model("VerificationToken").findOne({ token });
// };

export const VerificationToken =
  models.VerificationToken ||
  model("VerificationToken", VerificationTokenSchema);
