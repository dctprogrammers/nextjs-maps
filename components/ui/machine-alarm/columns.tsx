"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MachineDetailAlarmLogColumnSchemaType } from "@/schemas";

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

function getUserTimeZone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

function getUserLocale() {
  return navigator.language || "cs-CZ"; // Výchozí hodnota, pokud není dostupná
}

function formatDateTime(isoDate: string, timeZone: string) {
  const date = new Date(isoDate);
  return new Intl.DateTimeFormat(getUserLocale(), {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
    .format(date)
    .replace(",", "");
}

export const Columns: ColumnDef<MachineDetailAlarmLogColumnSchemaType>[] = [
  {
    accessorKey: "message",
    header: "Message",
    // header: ({ column }) => {
    //   return (
    //     <Button
    //       variant="ghost"
    //       className="w-full justify-normal rounded-none rounded-tl-md hover:text-red-600"
    //       onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //     >
    //       Serial Number
    //       <ArrowUpDown className="w-5 h-5" />
    //     </Button>
    //   );
    // },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("message")}</div>
    ),
  },
  {
    accessorKey: "alarmCreated",
    header: "Alarm Created",
    // header: ({ column }) => {
    //   return (
    //     <Button
    //       variant="ghost"
    //       className="w-full justify-normal rounded-none hover:text-red-600"
    //       onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //     >
    //       Type
    //       <ArrowUpDown className="w-5 h-5" />
    //     </Button>
    //   );
    // },
    cell: ({ row }) => (
      <div className="capitalize">
        {formatDateTime(row.getValue("alarmCreated"), getUserTimeZone())}
      </div>
    ),
  },
  {
    accessorKey: "alarmSolved",
    header: "Alarm Solved",
    // header: ({ column }) => {
    //   return (
    //     <Button
    //       variant="ghost"
    //       className="w-full justify-normal rounded-none hover:text-red-600"
    //       onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //     >
    //       Contact
    //       <ArrowUpDown className="w-5 h-5" />
    //     </Button>
    //   );
    // },
    cell: ({ row }) => (
      <div>
        {formatDateTime(row.getValue("alarmSolved"), getUserTimeZone())}
      </div>
    ),
  },
];
