import { Schema, model, models } from "mongoose";

const MachineSchema = new Schema(
  {
    machineSerialNumber: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Serial number is required"],
    },
    machineType: {
      type: String,
      required: [true, "Machine type is required"],
    },
    machineCycleInfo: {
      cleanTimeSet: { type: Number, default: null },
      cleanTempSet: { type: Number, default: null },
      rinseTimeSet: { type: Number, default: null },
      rinseTempSet: { type: Number, default: null },
      rinseConductivitySetMin: { type: Number, default: null },
      rinseConductivitySetMax: { type: Number, default: null },
      dryTimeSet: { type: Number, default: null },
    },
    machineAlarmLog: [
      {
        message: { type: String },
        alarmCreated: { type: Date, default: Date.now },
        alarmSolved: { type: Date, default: null },
      },
    ],
    contact: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export const Machine = models.Machine || model("Machine", MachineSchema);
