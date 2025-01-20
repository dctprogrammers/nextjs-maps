// import NextAuth from "next-auth";
// import authConfig from "./auth.configg";
// import {
//   DEFAULT_LOGIN_REDIRECT,
//   apiAuthPrefix,
//   authRoutes,
//   publicRoutes,
// } from "@/routes";
// import { NextResponse } from "next/server";

// const { auth } = NextAuth(authConfig);
// // import { auth } from "@/auth";

// export default auth((req) => {
//   const { nextUrl } = req;
//   const isLoggedIn = !!req.auth;

//   const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
//   const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
//   const isAuthRoute = authRoutes.includes(nextUrl.pathname);

//   if (isApiAuthRoute) return NextResponse.next();
//   // if (isApiAuthRoute) return null;

//   if (isAuthRoute) {
//     if (isLoggedIn) {
//       console.log("IS LOGGEDIN 2: ", isLoggedIn);
//       return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
//     }

//     return NextResponse.next();
//     // return null;
//   }

//   if (!isLoggedIn && !isPublicRoute) {
//     // console.log(isLoggedIn);
//     // console.log(isPublicRoute);
//     // console.log(DEFAULT_LOGIN_REDIRECT);
//     // console.log(nextUrl);
//     // console.log(NextResponse.next());

//     return NextResponse.next();
//   }
//   // return Response.redirect(new URL("/login", nextUrl));

//   console.log("ROUTE: ", req.nextUrl.pathname);
//   console.log("IS LOGGEDIN: ", isLoggedIn);

//   return NextResponse.next();
//   // return null;
// });

// // Optionally, don't invoke Middleware on some paths
// export const config = {
//   // matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],´
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
//     // Always run for API routes
//     "/(api|trpc)(.*)",
//   ],
// };
