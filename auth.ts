import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { LoginSchema } from "./schemas";
import { User } from "./models/User";

export interface SessionUserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  emailVerified: Date | null;
  role: string;
}

declare module "next-auth" {
  interface Session {
    user: SessionUserProfile;
  }
}

class CustomError extends CredentialsSignin {
  constructor(message: string) {
    super(message);
    this.message = message;
  }

  // code = "custom_error";
}

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const result = LoginSchema.safeParse({
          email: credentials.email,
          password: credentials.password,
        });

        if (!result.success)
          throw new CustomError("Please provide a valid email & password!");

        const { email, password } = result.data;

        const user = await User.findOne({ email });

        const comparedPassword = await bcrypt.compare(password, user.password);

        if (!comparedPassword) throw new CustomError("Password mismatched!");

        return {
          id: user?._id.toString(),
          name: user?.name,
          email: user?.email,
          avatar: user?.avatar,
          // avatar: user?.avatar || "default value",
          emailVerified: user?.emailVerified,
          role: user?.role,
        };
        // return null;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token = { ...token, ...user };

      return token;
    },
    session({ session, token }) {
      const user = token as typeof token & SessionUserProfile;

      if (user && session.user) {
        session.user = {
          ...session.user,
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          emailVerified: user.emailVerified
            ? new Date(user.emailVerified)
            : null,
          role: user.role,
        };
      }

      return session;
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
});

// import bcrypt from "bcryptjs";
// import NextAuth from "next-auth";
// import authConfig from "./auth.config";
// import Credentials from "next-auth/providers/credentials";
// import { z } from "zod";
// import { getUserByEmail } from "./query/route";
// // import { MongoDBAdapter } from "@auth/mongodb-adapter";

// // // async function getUser(email: string): Promise<User | undefined> {
// // async function getUser(email: string): Promise<typeof User | undefined> {
// //   try {
// //     // const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
// //     const user: any = await User.find({ email });
// //     // return user.rows[0];
// //     return user;
// //   } catch (error) {
// //     console.error("Failed to fetch user:", error);
// //     throw new Error("Failed to fetch user.");
// //   }
// // }

// export const {
//   handlers,
//   // handlers: { GET, POST },
//   auth,
//   signIn,
//   signOut,
// } = NextAuth({
//   // adapter: MongoDBAdapter(connectDB()),
//   ...authConfig,
//   // providers: [
//   //   Credentials({
//   //     credentials: {
//   //       email: {},
//   //       password: {},
//   //     },
//   //     async authorize(credentials) {
//   //       const validatedFields = LoginSchema.safeParse(credentials);

//   //       console.log("credentials: ", credentials);
//   //       console.log("validated fields: ", validatedFields);

//   //       if (validatedFields.success) {
//   //         const { email, password } = validatedFields.data;

//   //         const user: any = await User.find({
//   //           email,
//   //         });

//   //         console.log("user: ", user);

//   //         //   if (!user || !user.password) return null;
//   //         //   const passwordsMatch = await bcrypt.compare(password, user.password);
//   //         //   if (passwordsMatch) return user;
//   //         //   console.log(user);
//   //       }

//   //       return null;
//   //     },
//   //   }),
//   // ],
//   providers: [
//     // Credentials({
//     //   credentials: {
//     //     email: {},
//     //     password: {},
//     //   },
//     //   async authorize(credentials) {
//     //     const parsedCredentials = z
//     //       .object({ email: z.string().email(), password: z.string().min(6) })
//     //       .safeParse(credentials);
//     //     console.log('parsed', parsedCredentials);
//     //     if (parsedCredentials.success) {
//     //       const { email, password } = parsedCredentials.data;
//     //       const user = await getUserByEmail(email);
//     //       // if (!user) return null;
//     //       // if (user) {
//     //       //   const passwordsMatch = await bcrypt.compare(
//     //       //     password,
//     //       //     user?.password
//     //       //   );
//     //       //   if (passwordsMatch) return user;
//     //       // } else return null;
//     //       // console.log("user", user);
//     //       return user;
//     //     }
//     //     console.log("Invalid credentials");
//     //     // return null;
//     //   },
//     // }),
//   ],
// });
