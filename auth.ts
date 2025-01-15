import NextAuth from "next-auth";
// import { authConfig } from "./auth.config";
import { User } from "./models/User";

// async function getUser(email: string): Promise<User | undefined> {
async function getUser(email: string): Promise<typeof User | undefined> {
  try {
    // const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    const user: any = await User.find({ email });
    // return user.rows[0];
    return user;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const { auth, signIn, signOut } = NextAuth({
  // ...authConfig,
  providers: [
    // Credentials({
    //   credentials: {
    //     email: {},
    //     password: {},
    //   },
    // async authorize(credentials) {
    //   const parsedCredentials = z
    //     .object({ email: z.string().email(), password: z.string().min(6) })
    //     .safeParse(credentials);
    //   if (parsedCredentials.success) {
    //     const { email, password } = parsedCredentials.data;
    //     const user = await getUser(email);
    //     if (!user) return null;
    //     const passwordsMatch = await bcrypt.compare(password, user.password);
    //     if (passwordsMatch) return user;
    //   }
    //   console.log("Invalid credentials");
    //   return null;
    // },
    // }),
  ],
});
