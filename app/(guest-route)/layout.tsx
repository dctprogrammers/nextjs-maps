import { auth } from "@/auth";
import "@/components/global.css";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { redirect } from "next/navigation";

export default async function GuestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session) return redirect(DEFAULT_LOGIN_REDIRECT);

  return <>{children}</>;
}
