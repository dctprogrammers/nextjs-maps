"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { useState, useTransition } from "react";

export const VerificationFormSubmit = () => {
  const [isPending, startTransition] = useTransition();

  console.log("isPending: ", isPending);

  return (
    <Button
      disabled={isPending}
      type="submit"
      // className={`flex w-full justify-center
      //   ${buttonVariants({
      //     variant: "red",
      //     size: "sm",
      //   })}`}
      className="font-semibold underline"
    >
      {isPending ? "Please wait..." : "Click Here"}
    </Button>
  );
};
