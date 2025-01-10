import connectDB from "@/app/query/database";
import { Machine } from "@/models/Machine";

export default async function Page() {
  await connectDB();
  const machines = await Machine.find({}).lean();

  return (
    <section>
      <div>
        {machines.length === 0 ? (
          <p>No machines found</p>
        ) : (
          <div>
            {machines.map((machine: any) => (
              <div key={machine._id}>{machine.machineSerialNumber}</div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
