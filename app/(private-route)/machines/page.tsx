// "use client";

import connectDB from "@/lib/db";
import { Machine } from "@/models/Machine";

// import * as React from "react";

import { DataTable } from "@/components/ui/machines/data-table";
import { Columns } from "@/components/ui/machines/columns";
import { MachineColumnSchemaType } from "@/schemas";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

// const data: Payment[] = [
//   {
//     id: "155-886149-574",
//     type: "388 CRD 2PR",
//     status: "online",
//     contact: "nancy57@yahoo.com",
//   },
//   {
//     id: "209-656599-468",
//     type: "388 CRD",
//     status: "offline",
//     contact: "lisa49@gmail.com",
//   },
//   {
//     id: "719-236495-483",
//     type: "388 CRD 2PR",
//     status: "online",
//     contact: "dave68@outlook.com",
//   },
//   {
//     id: "280-395920-611",
//     type: "388 CRD 2PR",
//     status: "offline",
//     contact: "ken9937@yahoo.com",
//   },
//   {
//     id: "114-152776-259",
//     type: "388 CRD 2PR",
//     status: "offline",
//     contact: "john13@yahoo.com",
//   },
//   {
//     id: "496-483718-359",
//     type: "388 CRD",
//     status: "offline",
//     contact: "susan96@example.com",
//   },
//   {
//     id: "382-958081-781",
//     type: "388 CRD 2PR",
//     status: "offline",
//     contact: "steve15@yahoo.com",
//   },
//   {
//     id: "976-811351-992",
//     type: "388 CRD 2PR",
//     status: "offline",
//     contact: "mike17@mail.com",
//   },
//   {
//     id: "939-769006-596",
//     type: "388 CRD 2PR",
//     status: "offline",
//     contact: "mike59@yahoo.com",
//   },
//   {
//     id: "542-181935-187",
//     type: "388 CRD",
//     status: "offline",
//     contact: "steve79@yahoo.com",
//   },
//   {
//     id: "663-916753-299",
//     type: "388 CRD 2PR",
//     status: "offline",
//     contact: "jane14@outlook.com",
//   },
//   {
//     id: "184-374473-929",
//     type: "388 CRD",
//     status: "online",
//     contact: "ken9944@gmail.com",
//   },
//   {
//     id: "628-328568-149",
//     type: "388 CRD 2PR",
//     status: "offline",
//     contact: "mike37@example.com",
//   },
//   {
//     id: "331-744619-431",
//     type: "388 CRD",
//     status: "online",
//     contact: "lisa67@mail.com",
//   },
//   {
//     id: "515-599197-718",
//     type: "888 CRD",
//     status: "offline",
//     contact: "ken9993@outlook.com",
//   },
//   {
//     id: "917-387598-361",
//     type: "388 CRD 2PR",
//     status: "online",
//     contact: "ken9949@gmail.com",
//   },
//   {
//     id: "890-756898-539",
//     type: "888 CRD",
//     status: "offline",
//     contact: "steve61@example.com",
//   },
//   {
//     id: "767-566042-808",
//     type: "388 CRD 2PR",
//     status: "offline",
//     contact: "jane28@outlook.com",
//   },
//   {
//     id: "576-419316-648",
//     type: "388 CRD 2PR",
//     status: "offline",
//     contact: "john26@mail.com",
//   },
//   {
//     id: "971-604406-757",
//     type: "388 CRD",
//     status: "offline",
//     contact: "dave47@example.com",
//   },
// ];

// type Payment = {
//   // export type Payment = {
//   id: string;
//   type: string;
//   // amount: number;
//   status: "online" | "offline";
//   // status: "pending" | "processing" | "success" | "failed";
//   contact: string;
//   // email: string;
// };

// const columns: ColumnDef<Payment>[] = [
//   // export const columns: ColumnDef<Payment>[] = [
//   // {
//   //   id: "select",
//   //   header: ({ table }) => (
//   //     <Checkbox
//   //       checked={
//   //         table.getIsAllPageRowsSelected() ||
//   //         (table.getIsSomePageRowsSelected() && "indeterminate")
//   //       }
//   //       onCheckedChange={(value: any) =>
//   //         table.toggleAllPageRowsSelected(!!value)
//   //       }
//   //       aria-label="Select all"
//   //     />
//   //   ),
//   //   cell: ({ row }) => (
//   //     <Checkbox
//   //       checked={row.getIsSelected()}
//   //       onCheckedChange={(value: any) => row.toggleSelected(!!value)}
//   //       aria-label="Select row"
//   //     />
//   //   ),
//   //   enableSorting: false,
//   //   enableHiding: false,
//   // },
//   // {
//   //   accessorKey: "status",
//   //   header: "Status",
//   //   cell: ({ row }) => (
//   //     <div className="capitalize">{row.getValue("status")}</div>
//   //   ),
//   // },
//   {
//     accessorKey: "id",
//     // header: "Serial Number",
//     header: ({ column }) => {
//       return (
//         <Button
//           variant="ghost"
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           Serial Number
//           <ArrowUpDown />
//         </Button>
//       );
//     },
//     cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
//   },
//   {
//     accessorKey: "type",
//     // header: "Type",
//     header: ({ column }) => {
//       return (
//         <Button
//           variant="ghost"
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           Type
//           <ArrowUpDown />
//         </Button>
//       );
//     },
//     cell: ({ row }) => <div className="capitalize">{row.getValue("type")}</div>,
//   },
//   {
//     accessorKey: "contact",
//     // accessorKey: "email",
//     header: ({ column }) => {
//       return (
//         <Button
//           variant="ghost"
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           Email
//           <ArrowUpDown />
//         </Button>
//       );
//     },
//     cell: ({ row }) => (
//       <div className="lowercase">{row.getValue("contact")}</div>
//     ),
//     // cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
//   },
//   // {
//   //   accessorKey: "amount",
//   //   header: () => <div className="text-right">Amount</div>,
//   //   cell: ({ row }) => {
//   //     const amount = parseFloat(row.getValue("amount"));

//   //     // Format the amount as a dollar amount
//   //     const formatted = new Intl.NumberFormat("en-US", {
//   //       style: "currency",
//   //       currency: "USD",
//   //     }).format(amount);

//   //     return <div className="text-right font-medium">{formatted}</div>;
//   //   },
//   // },
//   {
//     id: "actions",
//     enableHiding: false,
//     cell: ({ row }) => {
//       const payment = row.original;

//       return (
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" className="h-8 w-8 p-0">
//               <span className="sr-only">Open menu</span>
//               <MoreHorizontal />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuLabel>Actions</DropdownMenuLabel>
//             {/* <DropdownMenuItem
//               onClick={() => navigator.clipboard.writeText(payment.id)}
//             >
//               Copy payment ID
//             </DropdownMenuItem> */}
//             <DropdownMenuSeparator />
//             <DropdownMenuItem>View machine</DropdownMenuItem>
//             <DropdownMenuItem>View contact details</DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       );
//     },
//   },
// ];

// export default function DataTableDemo() {
//   const [sorting, setSorting] = React.useState<SortingState>([]);
//   const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
//     []
//   );
//   const [columnVisibility, setColumnVisibility] =
//     React.useState<VisibilityState>({});
//   const [rowSelection, setRowSelection] = React.useState({});

//   const table = useReactTable({
//     data,
//     columns,
//     onSortingChange: setSorting,
//     onColumnFiltersChange: setColumnFilters,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     onColumnVisibilityChange: setColumnVisibility,
//     onRowSelectionChange: setRowSelection,
//     state: {
//       sorting,
//       columnFilters,
//       columnVisibility,
//       rowSelection,
//     },
//   });

//   return (
//     <div className="w-full">
//       <div className="flex items-center py-4">
//         <Input
//           placeholder="Filter contacts..."
//           // placeholder="Filter emails..."
//           value={(table.getColumn("contact")?.getFilterValue() as string) ?? ""}
//           // value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
//           onChange={
//             (event) =>
//               table.getColumn("contact")?.setFilterValue(event.target.value)
//             // table.getColumn("email")?.setFilterValue(event.target.value)
//           }
//           className="max-w-sm"
//         />
//         {/* <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="outline" className="ml-auto">
//               Columns <ChevronDown />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             {table
//               .getAllColumns()
//               .filter((column) => column.getCanHide())
//               .map((column) => {
//                 return (
//                   <DropdownMenuCheckboxItem
//                     key={column.id}
//                     className="capitalize"
//                     checked={column.getIsVisible()}
//                     onCheckedChange={(value) =>
//                       column.toggleVisibility(!!value)
//                     }
//                   >
//                     {column.id}
//                   </DropdownMenuCheckboxItem>
//                 );
//               })}
//           </DropdownMenuContent>
//         </DropdownMenu> */}
//       </div>
//       <div className="rounded-md border">
//         <Table>
//           <TableHeader>
//             {table.getHeaderGroups().map((headerGroup) => (
//               <TableRow key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => {
//                   return (
//                     <TableHead key={header.id}>
//                       {header.isPlaceholder
//                         ? null
//                         : flexRender(
//                             header.column.columnDef.header,
//                             header.getContext()
//                           )}
//                     </TableHead>
//                   );
//                 })}
//               </TableRow>
//             ))}
//           </TableHeader>
//           <TableBody>
//             {table.getRowModel().rows?.length ? (
//               table.getRowModel().rows.map((row) => (
//                 <TableRow
//                   key={row.id}
//                   data-state={row.getIsSelected() && "selected"}
//                 >
//                   {row.getVisibleCells().map((cell) => (
//                     <TableCell key={cell.id}>
//                       {flexRender(
//                         cell.column.columnDef.cell,
//                         cell.getContext()
//                       )}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell
//                   colSpan={columns.length}
//                   className="h-24 text-center"
//                 >
//                   No results.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>
//       <div className="flex items-center justify-end space-x-2 py-4">
//         <div className="flex-1 text-sm text-muted-foreground">
//           {table.getFilteredSelectedRowModel().rows.length} of{" "}
//           {table.getFilteredRowModel().rows.length} row(s) selected.
//         </div>
//         <div className="space-x-2">
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => table.previousPage()}
//             disabled={!table.getCanPreviousPage()}
//           >
//             Previous
//           </Button>
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => table.nextPage()}
//             disabled={!table.getCanNextPage()}
//           >
//             Next
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }

async function getData(): Promise<MachineColumnSchemaType[]> {
  // Fetch data from your API here.
  const machines = await Machine.find()
    .populate("contact", "email urlname -_id") // Načte pouze `email` z kolekce User
    .select("machineSerialNumber machineType contact") // Vrátí jen vybraná pole
    .lean<typeof Machine>();
  // const machines: any = await Machine.find(
  //   {},
  //   { _id: 0, machineSerialNumber: 1, machineType: 1, "contact.email": 1 }
  // ).populate("contact", "email");
  // .lean<typeof Machine>();

  Object.values(machines).forEach(
    (machine: { contact: { email: any; urlname: any } }) => {
      if (machine.contact && typeof machine.contact === "object") {
        const { email, urlname } = machine.contact;

        (machine as any).contact = email; // Přepíšeme objekt na samotný e-mail
        (machine as any).urlname = urlname; // Přepíšeme objekt na samotný e-mail
      }
    }
  );

  // machines.map((machine: any) => {
  //   console.log(machine.contact.email);
  // });

  // console.log(machines);

  return JSON.parse(JSON.stringify(machines));
  // return [
  //   {
  //     machineSerialNumber: "890-756898-539",
  //     machineType: "888 CRD",
  //     status: "offline",
  //     contact: "steve61@example.com",
  //   },
  //   {
  //     machineSerialNumber: "767-566042-808",
  //     machineType: "388 CRD 2PR",
  //     status: "offline",
  //     contact: "jane28@outlook.com",
  //   },
  //   {
  //     machineSerialNumber: "576-419316-648",
  //     machineType: "388 CRD 2PR",
  //     status: "offline",
  //     contact: "john26@mail.com",
  //   },
  //   {
  //     machineSerialNumber: "890-756898-539",
  //     machineType: "888 CRD",
  //     status: "offline",
  //     contact: "steve61@example.com",
  //   },
  //   {
  //     machineSerialNumber: "767-566042-808",
  //     machineType: "388 CRD 2PR",
  //     status: "offline",
  //     contact: "jane28@outlook.com",
  //   },
  //   {
  //     machineSerialNumber: "576-419316-648",
  //     machineType: "388 CRD 2PR",
  //     status: "offline",
  //     contact: "john26@mail.com",
  //   },
  //   {
  //     machineSerialNumber: "890-756898-539",
  //     machineType: "888 CRD",
  //     status: "offline",
  //     contact: "steve61@example.com",
  //   },
  //   {
  //     machineSerialNumber: "767-566042-808",
  //     machineType: "388 CRD 2PR",
  //     status: "offline",
  //     contact: "jane28@outlook.com",
  //   },
  //   {
  //     machineSerialNumber: "576-419316-648",
  //     machineType: "388 CRD 2PR",
  //     status: "offline",
  //     contact: "john26@mail.com",
  //   },
  //   {
  //     machineSerialNumber: "890-756898-539",
  //     machineType: "888 CRD",
  //     status: "offline",
  //     contact: "steve61@example.com",
  //   },
  //   {
  //     machineSerialNumber: "767-566042-808",
  //     machineType: "388 CRD 2PR",
  //     status: "offline",
  //     contact: "jane28@outlook.com",
  //   },
  //   {
  //     machineSerialNumber: "576-419316-648",
  //     machineType: "388 CRD 2PR",
  //     status: "offline",
  //     contact: "john26@mail.com",
  //   },
  //   {
  //     machineSerialNumber: "890-756898-539",
  //     machineType: "888 CRD",
  //     status: "offline",
  //     contact: "steve61@example.com",
  //   },
  //   {
  //     machineSerialNumber: "767-566042-808",
  //     machineType: "388 CRD 2PR",
  //     status: "offline",
  //     contact: "jane28@outlook.com",
  //   },
  //   {
  //     machineSerialNumber: "576-419316-648",
  //     machineType: "388 CRD 2PR",
  //     status: "offline",
  //     contact: "john26@mail.com",
  //   },
  // ];
}

export default async function Page() {
  const session = await auth();

  if (!session) return redirect("/");

  await connectDB();
  // const machines = await Machine.find({}).lean();

  const data = await getData();

  // const [sorting, setSorting] = React.useState<SortingState>([]);
  // const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
  // []
  // );
  // const [columnVisibility, setColumnVisibility] =
  // React.useState<VisibilityState>({});
  // const [rowSelection, setRowSelection] = React.useState({});

  // const table = useReactTable({
  //   data,
  //   columns,
  //   // onSortingChange: setSorting,
  //   // onColumnFiltersChange: setColumnFilters,
  //   getCoreRowModel: getCoreRowModel(),
  //   getPaginationRowModel: getPaginationRowModel(),
  //   getSortedRowModel: getSortedRowModel(),
  //   getFilteredRowModel: getFilteredRowModel(),
  //   // onColumnVisibilityChange: setColumnVisibility,
  //   // onRowSelectionChange: setRowSelection,
  //   state: {
  //     // sorting,
  //     // columnFilters,
  //     // columnVisibility,
  //     // rowSelection,
  //   },
  // });

  return (
    <>
      <div className="mb-6">
        <h1 className="font-semibold text-gray-900">Machines</h1>
        <p className="mt-1 text-sm text-gray-700">
          A list of all the machines in your account including their serial
          number, type and contact.
        </p>
      </div>
      {/* <p>{JSON.stringify(session.user.role)}</p> */}
      {/* <Breadcrumb className="mb-8"> */}
      {/* <BreadcrumbList> */}
      {/* <BreadcrumbItem>
            <BreadcrumbLink href="/machines">Machines</BreadcrumbLink>
          </BreadcrumbItem> */}
      {/* <BreadcrumbSeparator /> */}
      {/* <BreadcrumbItem>
            <BreadcrumbLink href="/components">Components</BreadcrumbLink>
          </BreadcrumbItem> */}
      {/* <BreadcrumbSeparator /> */}
      {/* <BreadcrumbItem>
            <BreadcrumbPage>Machines</BreadcrumbPage>
          </BreadcrumbItem> */}
      {/* </BreadcrumbList> */}
      {/* </Breadcrumb> */}
      {/* <section>
        {machines.length === 0 ? (
          <p>No machines found</p>
        ) : (
          <div>
            {machines.map((machine: any) => (
              <div key={machine._id}>{machine.machineSerialNumber}</div>
            ))}
          </div>
        )}
      </section> */}
      <div className="container mx-auto">
        <DataTable
          columns={Columns}
          data={data}
          size={data.length}
          role={session.user.role}
        />
      </div>
      {/* <div className="w-full">
        <div className="flex items-center py-4">
          <Input
            placeholder="Filter contacts..."
            value={
              (table.getColumn("contact")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("contact")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div> */}
    </>

    // <>
    //   <div>
    //     <Breadcrumbs
    //       breadcrumbs={[
    //         { label: "Machines", href: "/dashboard/machines" },
    //         {
    //           label: "Edit Machine",
    //           // href: `/dashboard/users/${id}/edit`,
    //           href: ``,
    //           active: true,
    //         },
    //       ]}
    //     />
    //     {machines.length === 0 ? (
    //       <p>No machines found</p>
    //     ) : (
    //       <div>
    //         {machines.map((machine: any) => (
    //           <div key={machine._id}>{machine.machineSerialNumber}</div>
    //         ))}
    //       </div>
    //     )}
    //   </div>
    // </>
  );
}
