import connectDB from "@/app/query/database";
import { User } from "@/models/User";

export default async function Page() {
  await connectDB();
  const users = await User.find({}).lean();

  return (
    <>
      {/* <h1>Users Page</h1> */}
      <section>
        <div>
          {users.length === 0 ? (
            <p>No users found</p>
          ) : (
            <div>
              {users.map((user: any) => (
                <div key={user._id}>{user.name}</div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
