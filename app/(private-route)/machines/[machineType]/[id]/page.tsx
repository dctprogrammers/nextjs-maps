import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Columns } from "@/components/ui/machine-alarm/columns";
import { DataTable } from "@/components/ui/machine-alarm/data-table";
import { Machine } from "@/models/Machine";
import { MachineDetailAlarmLogColumnSchemaType } from "@/schemas";
import { notFound } from "next/navigation";
import Image from "next/image";
import { cache } from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

async function getData(): Promise<MachineDetailAlarmLogColumnSchemaType[]> {
  // Fetch data from your API here.
  const machines = await Machine.find()
    .populate("contact", "email -_id") // Načte pouze `email` z kolekce User
    .select("machineSerialNumber machineType contact") // Vrátí jen vybraná pole
    .lean<typeof Machine>();
  // const machines: any = await Machine.find(
  //   {},
  //   { _id: 0, machineSerialNumber: 1, machineType: 1, "contact.email": 1 }
  // ).populate("contact", "email");
  // .lean<typeof Machine>();

  Object.values(machines).forEach((machine: { contact: { email: any } }) => {
    if (machine.contact) {
      machine.contact = machine.contact.email; // Přepíšeme objekt na samotný e-mail
    }
  });

  // machines.map((machine: any) => {
  //   console.log(machine.contact.email);
  // });

  // console.log(machines);

  // return JSON.parse(JSON.stringify(machines));
  return [
    {
      message: "Low clean fluid level",
      alarmCreated: "2025-01-01T06:32:17.000Z",
      alarmSolved: "2025-01-01T07:05:54.000Z",
    },
    {
      message: "High dry temperature",
      alarmCreated: "2025-01-01T09:32:17.000Z",
      alarmSolved: "2025-01-01T13:05:54.000Z",
    },
    {
      message: "Low clean fluid level",
      alarmCreated: "2025-01-01T06:32:17.000Z",
      alarmSolved: "2025-01-01T07:05:54.000Z",
    },
    {
      message: "High dry temperature",
      alarmCreated: "2025-01-01T09:32:17.000Z",
      alarmSolved: "2025-01-01T13:05:54.000Z",
    },
    {
      message: "Low clean fluid level",
      alarmCreated: "2025-01-01T06:32:17.000Z",
      alarmSolved: "2025-01-01T07:05:54.000Z",
    },
    {
      message: "High dry temperature",
      alarmCreated: "2025-01-01T09:32:17.000Z",
      alarmSolved: "2025-01-01T13:05:54.000Z",
    },
    {
      message: "Low clean fluid level",
      alarmCreated: "2025-01-01T06:32:17.000Z",
      alarmSolved: "2025-01-01T07:05:54.000Z",
    },
    {
      message: "High dry temperature",
      alarmCreated: "2025-01-01T09:32:17.000Z",
      alarmSolved: "2025-01-01T13:05:54.000Z",
    },
    {
      message: "Low clean fluid level",
      alarmCreated: "2025-01-01T06:32:17.000Z",
      alarmSolved: "2025-01-01T07:05:54.000Z",
    },
    {
      message: "High dry temperature",
      alarmCreated: "2025-01-01T09:32:17.000Z",
      alarmSolved: "2025-01-01T13:05:54.000Z",
    },
    {
      message: "Low clean fluid level",
      alarmCreated: "2025-01-01T06:32:17.000Z",
      alarmSolved: "2025-01-01T07:05:54.000Z",
    },
    {
      message: "High dry temperature",
      alarmCreated: "2025-01-01T09:32:17.000Z",
      alarmSolved: "2025-01-01T13:05:54.000Z",
    },
    {
      message: "Low clean fluid level",
      alarmCreated: "2025-01-01T06:32:17.000Z",
      alarmSolved: "2025-01-01T07:05:54.000Z",
    },
    {
      message: "High dry temperature",
      alarmCreated: "2025-01-01T09:32:17.000Z",
      alarmSolved: "2025-01-01T13:05:54.000Z",
    },
  ];
}

const machineCycleLabels: Record<string, { label: string; unit: string }> = {
  cleanTimeSet: { label: "Cleaning Time", unit: "s" },
  cleanTempSet: { label: "Cleaning Temperature", unit: "°C" },
  rinseTimeSet: { label: "Rinse Time", unit: "s" },
  rinseTempSet: { label: "Rinse Temperature", unit: "°C" },
  rinseConductivitySetMin: {
    label: "Minimum Rinse Conductivity",
    unit: "µS",
  },
  rinseConductivitySetMax: {
    label: "Maximum Rinse Conductivity",
    unit: "µS",
  },
  dryTimeSet: { label: "Drying Time", unit: "s" },
};

const getMachine = cache(async (serialNumber: string) => {
  return await Machine.findOne<typeof Machine>({
    machineSerialNumber: serialNumber,
  }).lean();
});

export default async function Page({
  params,
}: {
  params: Promise<{ id?: string; machineType?: string }>;
}) {
  const serialNumber = (await params).id;
  const type = (await params).machineType;

  // console.log(type);
  // console.log(serialNumber);

  if (!params || !serialNumber) {
    throw new Error("ID param missing");
  }
  // const machine = await Machine.findOne<typeof Machine>({
  //   machineSerialNumber: serialNumber,
  // }).lean();
  const machine = await getMachine(serialNumber);

  if (!machine) return notFound();

  // if (!machine) {
  //   throw new Error("Stroj nenalezen");
  // }

  // console.log(machine.machineAlarmLog.length);
  // console.log(machine.machineAlarmLog);

  // const data = await getData();

  return (
    <>
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/machines">Machines</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="">
              Machine: {serialNumber}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <section className="flex flex-col gap-4">
        <div className="w-full flex flex-col md:flex-row gap-4">
          <Card className="w-full shadow-none md:w-1/3">
            <Image
              src={`/machines/${type}.png`}
              width={600}
              height={600}
              className="hidden md:block"
              alt={machine.machineType}
              priority
            />
          </Card>
          <Card className="w-full shadow-none md:w-2/3">
            <CardHeader className="pb-4">
              <CardTitle>Machine type: {machine.machineType}</CardTitle>
              {/* <CardDescription>Card Description</CardDescription> */}
            </CardHeader>
            <CardContent>
              <h1 className="mb-2">Cycle info:</h1>
              <Table>
                {/* <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Invoice</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader> */}
                <TableBody>
                  {Object.entries(machine.machineCycleInfo).map(
                    ([key, value]) => {
                      const { label, unit } = machineCycleLabels[key] || {
                        label: key,
                        unit: "",
                      };

                      return (
                        <TableRow key={key}>
                          {/* <TableCell className="font-medium">INV001</TableCell> */}
                          <TableCell className="text-sm">{label}:</TableCell>
                          <TableCell className="text-right">
                            {String(value)} {unit}
                          </TableCell>
                        </TableRow>
                      );
                    }
                  )}
                </TableBody>
              </Table>
            </CardContent>
            {/* <CardFooter>
              <p>Card Footer</p>
            </CardFooter> */}
          </Card>
        </div>
        {machine.machineAlarmLog && (
          <DataTable
            columns={Columns}
            // data={data}
            data={machine.machineAlarmLog}
            size={machine.machineAlarmLog.length}
            // role={session.user.role}
          />
        )}
      </section>
    </>
  );
}
