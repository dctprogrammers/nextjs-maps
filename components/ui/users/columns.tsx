"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { UserColumnSchemaType } from "@/schemas";
import Link from "next/link";

export const Columns: ColumnDef<UserColumnSchemaType>[] = [
  {
    accessorKey: "name",
    // header: "Name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0 font-semibold w-full justify-normal rounded-none rounded-tl-md hover:text-red-600"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="w-5 h-5" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-gray-700 font-semibold">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "position",
    header: "Title",
    // header: ({ column }) => {
    //   return (
    //     <Button
    //       variant="ghost"
    //       className="font-semibold w-full justify-normal rounded-none hover:text-red-600"
    //       onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //     >
    //       Title
    //       <ArrowUpDown className="w-5 h-5" />
    //     </Button>
    //   );
    // },
    cell: ({ row }) => <div>{row.getValue("position")}</div>,
  },
  {
    accessorKey: "email",
    header: "Email",
    // header: ({ column }) => {
    //   return (
    //     <Button
    //       variant="ghost"
    //       className="font-semibold w-full justify-normal rounded-none hover:text-red-600"
    //       onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //     >
    //       Email
    //       <ArrowUpDown className="w-5 h-5" />
    //     </Button>
    //   );
    // },
    cell: ({ row }) => (
      <div>
        <Link
          href={`mailto:${row.getValue("email")}`}
          className="hover:text-red-600"
        >
          {row.getValue("email")}
        </Link>
      </div>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => <div>{row.getValue("role")}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const urlname = row.original.urlname;

      // console.log(row.original);

      // <div>
      //   <Button variant="ghost" className="h-8 w-8 p-0">
      //     <MoreHorizontal className="h-4 w-4" />
      //   </Button>
      // </div>
      return (
        <DropdownMenu>
          <TooltipProvider>
            <Tooltip>
              <DropdownMenuTrigger asChild>
                <TooltipTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
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
            <DropdownMenuItem>
              <Link href={`/users/profile/${encodeURIComponent(urlname)}`}>
                View profile
              </Link>
            </DropdownMenuItem>
            {/* <DropdownMenuItem>Message</DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
      // ),
      //   {
    },
  },
];
