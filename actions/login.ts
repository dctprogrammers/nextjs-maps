"use server";

import { z } from "zod";
import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import connectDB from "@/lib/db";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  // console.log(values);

  try {
    // server side validation
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) return { error: "Invalid fields!" };

    const { email, password } = validatedFields.data;

    // console.log("validatedfields: ", email, " - ", password);

    await connectDB();

    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });

    // return { success: "Email sent!" };
  } catch (error) {
    let errorMsg = "";

    // console.log("error: ", error);

    if (error instanceof Error && error.message === "NEXT_REDIRECT")
      // User is signed in just handle the redirect
      redirect(DEFAULT_LOGIN_REDIRECT);
    else if (error instanceof AuthError) errorMsg = error.message;
    else errorMsg = (error as any).message;

    // return { error: errorMsg };
    return { error: "Incorrect username or password." };
    // return null;
  }
};
