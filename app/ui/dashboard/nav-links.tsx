"use client";

import {
  HomeIcon,
  UsersIcon,
  BuildingOffice2Icon,
  RectangleGroupIcon,
  Cog6ToothIcon,
  LifebuoyIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const topLinks = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon, alert: false },
  {
    name: "Users",
    href: "/users",
    icon: UsersIcon,
    alert: false,
  },
  {
    name: "Organizations",
    href: "/organizations",
    icon: BuildingOffice2Icon,
    alert: true,
  },
  {
    name: "Machines",
    href: "/machines",
    icon: RectangleGroupIcon,
    alert: false,
    submenu: true,
    subMenuItems: [
      { name: "All", href: "/machines" },
      { name: "388 CRD", href: "/machines/388-CRD" },
      { name: "388 CRD 2PR", href: "/machines/388-CRD-2PR" },
      { name: "888 CRD", href: "/machines/888-CRD" },
    ],
  },
];

const bottomLinks = [
  { name: "Settings", href: "/settings", icon: Cog6ToothIcon, alert: false },
  {
    name: "Help",
    href: "/help",
    icon: LifebuoyIcon,
    alert: false,
  },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {topLinks.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow my-2 items-center justify-center rounded-md p-3 text-sm font-medium hover:bg-gray-50 hover:text-red-600 md:flex-none md:justify-between",
              {
                "bg-gray-50 text-red-600": pathname.includes(link.href),
                // "bg-gray-50 text-red-600": pathname === link.href,
              }
            )}
          >
            <div className="flex items-center justify-center gap-2 md:flex-none md:justify-start">
              <LinkIcon className="w-6" />
              <p className="hidden md:block">{link.name}</p>
            </div>
            {link.alert && (
              <div className="right-2 w-2 h-2 rounded bg-red-600" />
            )}
          </Link>
        );
      })}
      <hr className="my-3" />
      {bottomLinks.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow my-2 items-center justify-center rounded-md p-3 text-sm font-medium hover:bg-gray-50 hover:text-red-600 md:flex-none md:justify-between",
              {
                "bg-gray-50 text-red-600": pathname === link.href,
              }
            )}
          >
            <div className="flex items-center justify-center gap-2 md:flex-none md:justify-start">
              <LinkIcon className="w-6" />
              <p className="hidden md:block">{link.name}</p>
            </div>
            {link.alert && (
              <div className="right-2 w-2 h-2 rounded bg-red-600" />
            )}
          </Link>
        );
      })}
    </>
  );
}
