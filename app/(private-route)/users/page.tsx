import { auth } from "@/auth";
import { Columns } from "@/components/ui/users/columns";
import { DataTable } from "@/components/ui/users/data-table";
import connectDB from "@/lib/db";
import { User } from "@/models/User";
import { UserColumnSchemaType } from "@/schemas";
import { redirect } from "next/navigation";

async function getData(): Promise<UserColumnSchemaType[]> {
  // Fetch data from your API here.
  const users = await User.find()
    .select("_id name email role position urlname") // Vrátí jen vybraná pole
    .lean<typeof User>();
  // const machines = await Machine.find()
  //   .populate("contact", "email -_id") // Načte pouze `email` z kolekce User
  //   .select("machineSerialNumber machineType contact") // Vrátí jen vybraná pole
  //   .lean<typeof Machine>();

  // Object.values(machines).forEach((machine: { contact: { email: any } }) => {
  //   if (machine.contact) {
  //     machine.contact = machine.contact.email; // Přepíšeme objekt na samotný e-mail
  //   }
  // });

  // console.log(users);

  return JSON.parse(JSON.stringify(users));
  // return [
  //   {
  //     // _id: new ObjectId("6780ddbc49658a7be51d5f55"),
  //     name: "David Krénar",
  //     email: "dk@dct.cleaning",
  //     position: "Software Specialist",
  //     role: "admin",
  //   },
  //   {
  //     // _id: new ObjectId("6780de0b49658a7be51d5f57"),
  //     name: "Pavel Henček",
  //     email: "ph@dct.cleaning",
  //     position: "Service Technician",
  //     role: "service",
  //   },
  //   {
  //     // _id: new ObjectId("6780de1849658a7be51d5f58"),
  //     name: "Jiří Urban",
  //     email: "ju@dct.cleaning",
  //     position: "Technical Sales Manager",
  //     role: "manager",
  //   },
  //   {
  //     // _id: new ObjectId("6780de2449658a7be51d5f59"),
  //     name: "Leo Wang",
  //     email: "leowang@hi-glory.com",
  //     position: "DCT Distributor",
  //     role: "distributor",
  //   },
  //   {
  //     // _id: new ObjectId("6790af9b508a33d094e1b6d1"),
  //     name: "Mario",
  //     email: "mario@mail.com",
  //     position: "DCT mascot",
  //     role: "admin",
  //   },
  //   {
  //     // _id: new ObjectId("6780ddbc49658a7be51d5f55"),
  //     name: "David Krénar",
  //     email: "dk@dct.cleaning",
  //     position: "Software Specialist",
  //     role: "admin",
  //   },
  //   {
  //     // _id: new ObjectId("6780de0b49658a7be51d5f57"),
  //     name: "Pavel Henček",
  //     email: "ph@dct.cleaning",
  //     position: "Service Technician",
  //     role: "service",
  //   },
  //   {
  //     // _id: new ObjectId("6780de1849658a7be51d5f58"),
  //     name: "Jiří Urban",
  //     email: "ju@dct.cleaning",
  //     position: "Technical Sales Manager",
  //     role: "manager",
  //   },
  //   {
  //     // _id: new ObjectId("6780de2449658a7be51d5f59"),
  //     name: "Leo Wang",
  //     email: "leowang@hi-glory.com",
  //     position: "DCT Distributor",
  //     role: "distributor",
  //   },
  //   {
  //     // _id: new ObjectId("6790af9b508a33d094e1b6d1"),
  //     name: "Mario",
  //     email: "mario@mail.com",
  //     position: "DCT mascot",
  //     role: "admin",
  //   },
  // ];
}

export default async function Page() {
  // export default async function Page(props: {
  //   searchParams?: Promise<{
  //     query?: string;
  //     page?: string;
  //   }>;
  // }) {
  // const searchParams = await props.searchParams;
  // const query = searchParams?.query || "";
  // const currentPage = Number(searchParams?.page) || 1;

  // console.log(query);
  // console.log(currentPage);

  const session = await auth();

  if (!session) return redirect("/");

  await connectDB();

  const data = await getData();

  return (
    <>
      <div className="mb-6">
        <h1 className="font-semibold text-gray-900">Users</h1>
        <p className="mt-1 text-sm text-gray-700">
          A list of all the users including their name, title, email and role.
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
