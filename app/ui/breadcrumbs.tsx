import { clsx } from "clsx";
import Link from "next/link";
// import { lusitana } from '@/app/ui/fonts';
import { ChevronRightIcon } from "@heroicons/react/24/outline";

interface Breadcrumb {
  label: string;
  href: string;
  active?: boolean;
}

export default function Breadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: Breadcrumb[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="flex mb-6">
      <ol className={clsx("flex text-sm font-medium")}>
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.href}
            aria-current={breadcrumb.active}
            className={clsx(
              breadcrumb.active
                ? "flex items-center text-gray-900"
                : "flex items-center text-gray-500"
            )}
          >
            <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
            {index < breadcrumbs.length - 1 ? (
              <ChevronRightIcon className="w-4 mx-2" />
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
