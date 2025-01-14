import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { lusitana } from "@/app/ui/fonts";
import Link from "next/link";

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <Link
        href="/"
        className="flex items-center self-start rounded-lg bg-blue-500 px-2 py-1 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
      >
        <GlobeAltIcon className="h-12 w-12 rotate-[15deg]" />
        <p className="text-[44px]">Acme</p>
      </Link>
    </div>
  );
}
