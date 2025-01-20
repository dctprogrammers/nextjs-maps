"use server";

import * as z from "zod";
import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  // console.log(values);

  // server side validation
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid fields!" };

  const { email, password } = validatedFields.data;

  // console.log("validatedfields: ", validatedFields);

  // return { success: "Email sent!" };
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });

    return { success: "Email sent!" };
  } catch (error) {
    return { error: "Something went wrong!" };
  }
};
