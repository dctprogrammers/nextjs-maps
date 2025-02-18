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
import { OrganizationColumnSchemaType } from "@/schemas";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

//  title: z.string(),
//   info: z.string(),

//   web: z.string(),
//   country: z.string(),
//   logo: z.string(),

export const Columns: ColumnDef<OrganizationColumnSchemaType>[] = [
  {
    accessorKey: "logo",
    header: "Logo",
    cell: ({ row }) => (
      <div>
        <Avatar>
          <AvatarImage src={`/users/${row.getValue("logo")}`} />
          <AvatarFallback>C</AvatarFallback>
        </Avatar>
      </div>
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="font-semibold w-full justify-normal rounded-none hover:text-red-600"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="w-5 h-5" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
  {
    accessorKey: "info",
    header: "Info",
    cell: ({ row }) => <div>{row.getValue("info")}</div>,
  },
  {
    accessorKey: "country",
    header: "Country",
    cell: ({ row }) => <div>{row.getValue("country")}</div>,
  },
  {
    accessorKey: "web",
    header: "Web",
    cell: ({ row }) => {
      return (
        <Link
          href={row.getValue("web")}
          target="_blank"
          rel="noopener noreferrer"
        >
          {String(row.getValue("web")).replace(/^https?:\/\//, "")}
        </Link>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      // const machineType = row.original.machineType.replace(/\s+/g, "-");
      const urlTitle = row.original.urlTitle;

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
              <Link
                href={`/organizations/profile/${encodeURIComponent(urlTitle)}`}
              >
                View organization
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
