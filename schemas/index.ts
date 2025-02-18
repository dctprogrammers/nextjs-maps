import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().trim().email({
    message: "Email is required.",
  }),
  password: z.string().trim().min(8, {
    message: "Minimum 8 characters required.",
  }),
});

export const RegisterSchema = z.object({
  name: z.string().trim().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  email: z.string().trim().email({
    message: "Email is required.",
  }),
  password: z.string().min(8, {
    message: "Minimum 8 characters required.",
  }),
});

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
// export type UserSchema = {
//   name: string;
//   email: string;
//   role: string;
//   position: string;
//   urlname: string;
// };
const UserColumnSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  role: z.string(),
  position: z.string(),
  urlname: z.string(),
});

export type UserColumnSchemaType = z.infer<typeof UserColumnSchema>;

const OrganizationColumnSchema = z.object({
  title: z.string(),
  info: z.string(),
  web: z.string(),
  country: z.string(),
  logo: z.string(),
  urlTitle: z.string(),
});

export type OrganizationColumnSchemaType = z.infer<
  typeof OrganizationColumnSchema
>;

const MachineColumnSchema = z.object({
  machineSerialNumber: z.string(),
  machineType: z.string(),
  status: z.enum(["online", "offline"]),
  contact: z.string(),
  urlname: z.string(),
});

export type MachineColumnSchemaType = z.infer<typeof MachineColumnSchema>;

const MachineDetailAlarmLogColumnSchema = z.object({
  message: z.string(),
  alarmCreated: z.string(),
  alarmSolved: z.string(),
});

export type MachineDetailAlarmLogColumnSchemaType = z.infer<
  typeof MachineDetailAlarmLogColumnSchema
>;
