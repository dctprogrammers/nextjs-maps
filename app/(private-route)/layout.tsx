import SideNav from "@/app/ui/dashboard/sidenav";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) return redirect("/");

  return (
    // <div className="flex overflow-hidden">
    <div className="flex flex-col md:flex-row md:overflow-hidden">
      {/* <div className="w-full h-screen fixed flex-none md:w-64"> */}
      <SideNav />
      <main className="flex-grow p-4 md:overflow-y-auto md:p-12 md:pl-[19rem]">
        {/* <VerificationStatus
          visible={session && !session.user?.emailVerified ? true : false}
          /> */}
        {/* <VerificationStatus visible={session && !session.user?.emailVerified} /> */}
        {children}
      </main>
    </div>
  );
}
