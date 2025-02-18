import NavLinks from "@/app/ui/dashboard/nav-links";

import { PowerIcon } from "@heroicons/react/24/outline";
import { auth, signOut } from "@/auth";
import DCTLogo from "@/components/dct-logo";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { redirect } from "next/navigation";

export default async function SideNav() {
  const session = await auth();

  if (!session) return redirect("/");

  const firstChar = session.user.name.length > 0 ? session.user.name[0] : "A";

  return (
    <aside className="w-full h-screen flex-none md:fixed md:w-64">
      <nav className="h-full flex flex-col border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <DCTLogo />
        </div>
        <div className="flex-1 px-3">
          <NavLinks />
        </div>
        <div className="border-t flex p-3 items-center">
          {/* <Image
            className="w-10 h-10 rounded-full"
            src="/users/lee-robinson.png"
            width={32}
            height={32}
            alt="Avatar"
            // priority
          /> */}
          <Avatar>
            <AvatarImage src={`/users/${session.user.avatar}`} />
            <AvatarFallback>{firstChar}</AvatarFallback>
          </Avatar>
          <div className="flex justify-between items-center w-52 ml-3">
            <div className="leading-4">
              <h4 className="font-semibold">{session.user.name}</h4>
              <span className="text-xs text-gray-600">
                {session.user.email}
              </span>
            </div>
            <TooltipProvider>
              <Tooltip>
                <form
                  action={async () => {
                    "use server";
                    // if (process.env.NODE_ENV === "development") {
                    // await signOut();
                    // } else {
                    await signOut();
                    // }
                  }}
                  name="Sign Out"
                >
                  <TooltipTrigger asChild>
                    <Button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md p-3 bg-white text-black text-sm font-medium hover:bg-gray-50 hover:text-red-600 md:flex-none md:justify-start md:p-2 md:px-3">
                      <PowerIcon className="w-6" />
                      {/* <div className="hidden md:block">Sign Out</div> */}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Sign Out</p>
                  </TooltipContent>
                </form>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </nav>
    </aside>

    // <div className="flex h-full flex-col px-3 py-4 md:px-2">
    //   <Link
    //     className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
    //     href="/"
    //   ></Link>
    //   <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
    //     <NavLinks />
    //     <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
    //     <form
    //       action={async () => {
    //         "use server";
    //         await signOut();
    //       }}
    //     >
    //       <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
    //         <PowerIcon className="w-6" />
    //         <div className="hidden md:block">Sign Out</div>
    //       </button>
    //     </form>
    //   </div>
    // </div>
  );
}

// export default function SidebarItem({ icon, text, active, alert }) {
//   return (
//     <li>
//       {icon}
//       <span>{text}</span>
//     </li>
//   );
// }
