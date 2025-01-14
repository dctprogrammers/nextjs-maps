import Image from "next/image";
import Link from "next/link";
import dctlogo from "@/components/ui/assets/logo_dct.svg";

export default function DCTLogo() {
  return (
    <div className="flex">
      <Link href="/" className="mx-auto">
        <Image
          src={dctlogo}
          width={64}
          height={64}
          alt="DCT Czech logo"
          priority
        />
      </Link>
    </div>
  );
}
