"use server";

import * as z from "zod";
import bcrypt from "bcrypt";
import connectDB from "@/app/lib/database";
import { User } from "@/models/User";

import { RegisterSchema } from "@/schemas";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  await connectDB();

  // server side validation
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid fields!" };

  const { name, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await User.findOne({ email });

  if (existingUser) return { error: "Email already in use!" };

  await User.create({
    name,
    password: hashedPassword,
    email,
  });

  // TODO: Send veerification token email

  return { success: "Email sent!" };
};
