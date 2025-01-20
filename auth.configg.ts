import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { LoginSchema } from "@/schemas";
import { User } from "./models/User";
import { getUserByEmail } from "./query/route";

// export const authConfig = {
//   pages: {
//     signIn: "/login",
//   },
//   callbacks: {
//     authorized({ auth, request: { nextUrl } }) {
//       const isLoggedIn = !!auth?.user;
//       const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
//       if (isOnDashboard) {
//         if (isLoggedIn) return true;
//         return false; // Redirect unauthenticated users to login page
//       } else if (isLoggedIn) {
//         return Response.redirect(new URL("/dashboard", nextUrl));
//       }
//       return true;
//     },
//   },
//   providers: [], // Add providers with an empty array for now
// } satisfies NextAuthConfig;

// export default authConfig;

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        // const validatedFields = LoginSchema.safeParse(credentials);

        // console.log("credentials: ", credentials);
        // console.log("validated fields: ", validatedFields);

        // if (validatedFields.success) {
        //   const { email, password } = validatedFields.data;

        //   console.log(email, password);

        //   const user: any = await getUserByEmail(email);
        //   // const user: any = await User.find({
        //   //   email,
        //   // });

        //   // console.log("user: ", user);

        //   // if (!user || !user.password) return null;

        //   // const passwordsMatch = await bcrypt.compare(password, user.password);

        //   // if (passwordsMatch) return user;
        // }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
