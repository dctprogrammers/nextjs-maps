import { User } from "@/models/User";

export const getUserByEmail = async (
  email: string
): Promise<typeof User | undefined> => {
  try {
    const user = await User.findOne({ email });

    return user;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await User.findOne({ _id: id });

    return user;
  } catch {
    return null;
  }
};
