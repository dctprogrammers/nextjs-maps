import CardWrapper from "@/app/ui/dashboard/cards";
import { CardsSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();

  if (!session) return redirect("/");

  return (
    <>
      <main>
        <h1 className="mb-4 text-xl md:text-2xl">Dashboard</h1>
        <p>{JSON.stringify(session.user)}</p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* <Card title="Collected" value={totalPaidInvoices} type="collected" /> */}
          {/* <Card title="Pending" value={totalPendingInvoices} type="pending" /> */}
          {/* <Card title="Total Invoices" value={numberOfInvoices} type="invoices" /> */}
          {/* <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        /> */}
          <Suspense fallback={<CardsSkeleton />}>
            <CardWrapper />
          </Suspense>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
          {/* <RevenueChart revenue={revenue}  /> */}
          {/* <LatestInvoices latestInvoices={latestInvoices} /> */}
        </div>
      </main>
    </>
  );
}
