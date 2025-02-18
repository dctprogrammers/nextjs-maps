"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { MachineColumnSchemaType } from "@/schemas";
import Link from "next/link";

// // This type is used to define the shape of our data.
// // You can use a Zod schema here if you want.
// export type MachineColumn = {
//   //   id: string;
//   //   amount: number;
//   //   status: "pending" | "processing" | "success" | "failed";
//   //   email: string;
//   machineSerialNumber: string;
//   machineType: string;
//   status: "online" | "offline";
//   contact: string;
// };

export const Columns: ColumnDef<MachineColumnSchemaType>[] = [
  {
    accessorKey: "machineSerialNumber",
    // header: "Serial Number",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="font-semibold w-full justify-normal rounded-none rounded-tl-md hover:text-red-600"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Serial Number
          <ArrowUpDown className="w-5 h-5" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("machineSerialNumber")}</div>,
  },
  {
    accessorKey: "machineType",
    // header: "Type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="font-semibold w-full justify-normal rounded-none hover:text-red-600"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Type
          <ArrowUpDown className="w-5 h-5" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("machineType")}</div>
    ),
  },
  {
    accessorKey: "contact",
    // header: "Contact",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="font-semibold w-full justify-normal rounded-none hover:text-red-600"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Contact
          <ArrowUpDown className="w-5 h-5" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("contact")}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const machineType = row.original.machineType.replace(/\s+/g, "-");
      const machineSerialNumber = row.original.machineSerialNumber;
      const urlname = row.original.urlname;

      return (
        <DropdownMenu>
          <TooltipProvider>
            <Tooltip>
              <DropdownMenuTrigger asChild>
                <TooltipTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    {/* <span className="sr-only">Open menu</span> */}
                    <TooltipContent>
                      <p>Open actions</p>
                    </TooltipContent>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
              </DropdownMenuTrigger>
            </Tooltip>
          </TooltipProvider>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            {/* <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
              >
              Copy payment ID
              </DropdownMenuItem> */}
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link
                href={`/machines/${encodeURIComponent(
                  machineType
                )}/${machineSerialNumber}`}
                // data={machineSerialNumber}
              >
                View machine
              </Link>
            </DropdownMenuItem>
            {urlname && (
              <DropdownMenuItem>
                <Link href={`/users/profile/${encodeURIComponent(urlname)}`}>
                  View contact details
                </Link>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
