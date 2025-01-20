import { User } from "@/models/User";
import { VerificationToken } from "@/models/VerificationToken";
import { notFound } from "next/navigation";

export default async function VerifyPage(_props: any) {
  const searchParams = await _props.searchParams;
  const { userId, token } = searchParams;

  // console.log(searchParams);
  // console.log("userId:", userId);
  // console.log("token: ", token);

  try {
    const verificationToken = await VerificationToken.findOne({ userId });

    // console.log(verificationToken);

    if (verificationToken?.token === token) {
      //  token is verified
      await User.findByIdAndUpdate(userId, { emailVerified: true });
      await VerificationToken.findByIdAndDelete(verificationToken._id);
    } else {
      // Token is mismatched or something wrong happened
      throw new Error();
    }
  } catch (error) {
    // Redirect user to notFound page
    return notFound();
  }

  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        Congrats! Your email is verified.
      </div>
    </main>
  );
}
