import { auth } from "@/auth";
import { User } from "@/models/User";
import { handleVerificationToken } from "@/actions/register";

export const generateVerificationLink = async () => {
  const session = await auth();

  if (!session) return { success: false };

  // const user = await User.findById(session.user.id);

  // //   user is already verified
  // if (user?.emailVerified) return { success: false };

  // const { id, name, email } = session.user;

  // await handleVerificationToken({ id, name, email });

  return { success: true };
};
