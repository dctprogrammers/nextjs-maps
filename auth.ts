import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { getUserByEmail } from "./query/route";

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
      // async authorize(credentials) {
      //   const { email, password } = credentials;

      //   if (email === "maria@mail.com" && password === "maria")
      //     return {
      //       id: "123",
      //       name: "Maria",
      //       email: "maria@mail.com",
      //     };

      //   return null;
      // },
      async authorize(credentials) {
        // const parsedCredentials = z
        //   .object({ email: z.string().email(), password: z.string().min(6) })
        //   .safeParse(credentials);

        // console.log("parsed", parsedCredentials);

        // if (!parsedCredentials.success)
        //   return console.log(parsedCredentials.error.formErrors.fieldErrors);

        //   const { email, password } = parsedCredentials.data;
        //   const user = await getUserByEmail(email);
        //   // if (!user) return null;
        //   // if (user) {
        //   //   const passwordsMatch = await bcrypt.compare(
        //   //     password,
        //   //     user?.password
        //   //   );
        //   //   if (passwordsMatch) return user;
        //   // } else return null;
        //   // console.log("user", user);
        //   return user;

        // console.log("Invalid credentials");

        return null;
      },
    }),
  ],
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
