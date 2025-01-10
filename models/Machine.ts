import { Schema, model, models } from "mongoose";

const MachineSchema = new Schema(
  {
    machineSerialNumber: {
      type: String,
      trim: true,
      unique: [true, "Serial number already exists"],
      required: [true, "Serial number is required"],
    },
    machineType: {
      type: String,
      required: [true, "Machine type is required"],
    },
    machineCycleInfo: {
      cleanTimeSet: { type: Number },
      cleanTempSet: { type: Number },
      rinseTimeSet: { type: Number },
      rinseTempSet: { type: Number },
      rinseConductivitySetMin: { type: Number },
      rinseConductivitySetMax: { type: Number },
      dryTimeSet: { type: Number },
    },
    machineAlarmLog: [
      {
        message: { type: String },
        alarmCreated: { type: Date },
        alarmSolved: { type: Date },
      },
      {
        message: { type: String },
        alarmCreated: { type: Date },
        alarmSolved: { type: Date },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Machine = models.Machine || model("Machine", MachineSchema);
