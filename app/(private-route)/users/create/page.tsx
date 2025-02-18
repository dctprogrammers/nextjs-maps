// import Form from "@/app/ui/invoices/create-form";
import Breadcrumbs from "@/app/ui/breadcrumbs";
// import { fetchCustomers } from "@/app/lib/data";

export default async function Page() {
  //   const customers = await fetchCustomers();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Users", href: "/dashboard/users" },
          {
            label: "Create User",
            href: "/dashboard/users/create",
            active: true,
          },
        ]}
      />
      {/* <Form customers={customers} /> */}
      {/* <Form customers={[]} /> */}
    </main>
  );
}
