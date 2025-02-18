import connectDB from "@/lib/db";

import { DataTable } from "@/components/ui/organizations/data-table";
import { Columns } from "@/components/ui/organizations/columns";
import { OrganizationColumnSchemaType } from "@/schemas";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Organization } from "@/models/Organization";

async function getData(): Promise<OrganizationColumnSchemaType[]> {
  // Fetch data from your API here.
  const organizations = await Organization.find()
    // .populate("contact", "email -_id") // Načte pouze `email` z kolekce User
    .select("title info web contact country logo urlTitle -_id") // Vrátí jen vybraná pole
    .lean<typeof Organization>();

  // console.log(organizations);

  return JSON.parse(JSON.stringify(organizations));
}

export default async function Page() {
  const session = await auth();

  if (!session) return redirect("/");

  await connectDB();

  const data = await getData();

  return (
    <>
      <div className="mb-6">
        <h1 className="font-semibold text-gray-900">Organizations</h1>
        <p className="mt-1 text-sm text-gray-700">
          A list of all the organizations in your account including their logo,
          title, information, country and web address.
        </p>
      </div>

      <div className="container mx-auto">
        <DataTable
          columns={Columns}
          data={data}
          size={data.length}
          role={session.user.role}
        />
      </div>
    </>
  );
}
