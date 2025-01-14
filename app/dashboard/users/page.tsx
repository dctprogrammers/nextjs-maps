import connectDB from "@/app/query/database";
import { User } from "@/models/User";

import Pagination from "@/app/ui/invoices/pagination";
import Search from "@/app/ui/search";
import Table from "@/app/ui/invoices/table";
import { CreateInvoice } from "@/app/ui/invoices/buttons";
import { lusitana } from "@/app/ui/fonts";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  await connectDB();
  const users = await User.find({}).lean();

  return (
    <>
      <section>
        <div className="w-full">
          <div className="flex w-full items-center justify-between">
            <h1 className={`${lusitana.className} text-2xl`}>Users</h1>
          </div>
          <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
            <Search placeholder="Search users..." />
            <CreateInvoice />
          </div>
          <Suspense
            key={query + currentPage}
            fallback={<InvoicesTableSkeleton />}
          >
            {/* <Table query={query} currentPage={currentPage} /> */}
          </Suspense>
          <div className="mt-5 flex w-full justify-center">
            {/* <Pagination totalPages={totalPages} /> */}
          </div>
        </div>
        <div>
          {users.length === 0 ? (
            <p>No users found</p>
          ) : (
            <div>
              {users.map((user: any) => (
                <div key={user._id}>{user.name}</div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
