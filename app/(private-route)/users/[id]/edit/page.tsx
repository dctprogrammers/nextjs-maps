import Breadcrumbs from "@/app/ui/breadcrumbs";
// import { fetchCustomers } from "@/app/lib/data";

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Users", href: "/dashboard/users" },
          {
            label: "Edit User",
            // href: `/dashboard/users/${id}/edit`,
            href: ``,
            active: true,
          },
        ]}
      />
      {/* <Form invoice={invoice} customers={customers} /> */}
      {/* <Form customers={[]} /> */}
    </main>
  );
}
