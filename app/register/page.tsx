import RegisterForm from "@/components/register-form";
// import connectDB from "../lib/database";

export default async function RegisterPage() {
  // await connectDB();

  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <RegisterForm />
      </div>
    </main>
  );
}
