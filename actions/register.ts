"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import connectDB from "@/lib/db";
import { User } from "@/models/User";

import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/query/route";
import { VerificationToken } from "@/models/VerificationToken";
import mail from "@/app/utils/mail";

const handleVerificationToken = async (user: {
  id: string;
  name: string;
  email: string;
}) => {
  const userId = user.id;
  const token = crypto.randomBytes(36).toString("hex");

  await connectDB();

  await VerificationToken.findOneAndDelete({ userId });

  await VerificationToken.create({ userId, token });

  const link = `${process.env.VERIFICATION_LINK}?token=${token}&userId=${userId}`;

  await mail.sendVerificationMail({ name: user.name, link, to: user.email });
};

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  // server side validation
  const validatedFields = RegisterSchema.safeParse(values);

  console.log(validatedFields);

  if (!validatedFields.success) return { error: "Invalid fields!" };

  const { name, email, password } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  await connectDB();

  const existingUser = await getUserByEmail(email);
  // const existingUser = await User.findOne({ email });

  if (existingUser) return { error: "Email already in use!" };

  const createdUser = await User.create({
    name,
    password: hashedPassword,
    email,
  });

  // TODO: Send veerification token email
  await handleVerificationToken({ id: createdUser._id, name, email });

  return { success: "Email sent!" };
};
