import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex grow flex-col md:gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <p className="text-x font-bold text-gray-800 md:text-4xl md:leading-normal">
            Welcome to DCT MAPS
          </p>
          {/* <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-md bg-red-600 px-6 py-3 text-sm/6 font-semibold text-white shadow-sm hover:bg-red-500 md:text-base"
          >
            <span>Sign in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link> */}
          <Link
            href="/login"
            className={`flex items-center gap-5 self-start md:text-base
              ${buttonVariants({
                variant: "red",
              })}`}
          >
            <span>Sign in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          <Image
            src="/MAPS_main.png"
            width={1000}
            height={760}
            className="hidden md:block rounded-xl"
            alt="Screenshots of the project showing desktop version"
            priority
          />
          {/* <Image
            src="/hero-mobile.png"
            width={560}
            height={620}
            className="block md:hidden"
            alt="Screenshots of the project showing mobile version"
          ></Image> */}
        </div>
      </div>
    </main>
  );
}
