"use client";

import { generateVerificationLink } from "@/actions/generate-verification-link";
import { VerificationFormSubmit } from "@/components/verification-form-submit";
import { LoginSchema } from "@/schemas";
import { startTransition, useState } from "react";
import { useFormState } from "react-dom";
import { any, boolean, z } from "zod";

interface VerificationProps {
  visible?: boolean;
}

export const VerificationStatus = ({ visible }: VerificationProps) => {
  // export const VerificationStatus = ({ visible }: { visible?: boolean }) => {
  // const [error, setError] = useState<string | undefined>("");
  // const [success, setSuccess] = useState<string | undefined>("");
  // const [state, action] = useFormState(generateVerificationLink, {
  //   success: boolean,
  // });
  // const onSubmit = () => {
  //   // setError("");
  //   // setSuccess("");
  //   console.log("Test");
  //   // startTransition(() => {
  //   //   // calling action called 'register' from /actions/register.ts
  //   //   // register(values).then((data) => {
  //   //   //   setError(data.error);
  //   //   //   setSuccess(data.success);
  //   //   // });
  //   // });
  // };
  // if (!visible) return null;
  // if (state.success) {
  //   return (
  //     <div className="text-center p-2">
  //       <p>Please check your inbox</p>
  //     </div>
  //   );
  // }
  // return (
  //   <form action={action} className="text-center p-2">
  //     <span>Please check your inbox to verify your email.</span>
  //     <div>
  //       {"Didn't get link "}
  //       <VerificationFormSubmit />
  //     </div>
  //   </form>
  // );
};
