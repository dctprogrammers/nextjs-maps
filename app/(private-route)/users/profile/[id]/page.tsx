import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { notFound } from "next/navigation";
import Image from "next/image";
import { cache } from "react";
import { User } from "@/models/User";
import {
  CheckBadgeIcon,
  EnvelopeIcon,
  TagIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

const getUser = cache(async (urlname: string) => {
  return await User.findOne<typeof User>({
    urlname,
  }).lean();
});

export default async function Page({
  params,
}: {
  params: Promise<{ id?: string }>;
}) {
  const urlname = (await params).id;

  if (!params || !urlname) {
    throw new Error("ID param missing");
  }

  const user = await getUser(urlname);

  if (!user) return notFound();

  console.log(user);

  const userInfo = [
    { icon: StarIcon, label: user.position, link: false },
    { icon: TagIcon, label: user.role, link: false },
    { icon: EnvelopeIcon, label: user.email, link: true },
  ];

  return (
    <>
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/users">Users</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="">Profile</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <section className="flex flex-col">
        <div className="bg-center bg-cover bg-no-repeat bg-[url(/bg-1.png)]">
          <div className="flex flex-col items-center gap-2 lg:gap-3.5 py-4 lg:pt-5 lg:pb-10">
            <Image
              className="rounded-full border-3 border-success size-[100px] shrink-0"
              src={`/users/${user.avatar}`}
              width={100}
              height={100}
              alt={user.name}
            />
            <div className="flex items-center gap-1.5">
              <div className="text-lg leading-5 font-semibold text-gray-900">
                {user.name}
              </div>
              {user.emailVerified && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div>
                        <TooltipContent>User verified</TooltipContent>
                        <CheckBadgeIcon className="w-5 h-5" />
                      </div>
                    </TooltipTrigger>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
            <div className="flex flex-wrap justify-center gap-4 lg:gap-4.5 text-sm">
              {userInfo.map(({ icon: Icon, label, link }, index) => (
                <div key={index} className="flex gap-1 items-center">
                  <Icon className="w-4 h-4 text-gray-500" />
                  {link ? (
                    <Link
                      href={`mailto:${label}`}
                      className="text-gray-600 hover:text-red-600"
                    >
                      {label}
                    </Link>
                  ) : (
                    <span className="text-gray-600 font-medium">{label}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="">
          {/* <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button className="w-fit absolute right-12 rounded-md p-2 bg-white text-gray-900 text-sm font-medium hover:bg-gray-50 hover:text-red-600">
                  <ChatBubbleBottomCenterTextIcon className="w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Message</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider> */}
          <div className="flex items-center flex-wrap md:flex-nowrap lg:items-end justify-between gap-3 lg:gap-6">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="machines">Machines</TabsTrigger>
                <TabsTrigger value="organizations">Organizations</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>
              <TabsContent value="profile">
                <p>Profile info about user here.</p>
                <p>Profile info about user here.</p>
                <p>Profile info about user here.</p>
                <p>Profile info about user here.</p>
                <p>Profile info about user here.</p>
                <p>Profile info about user here.</p>
              </TabsContent>
              <TabsContent value="machines">List of machines.</TabsContent>
              <TabsContent value="organizations">
                List of organizations of every role (not for customer).
              </TabsContent>
              <TabsContent value="activity">List of activities.</TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="container-fixed">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 lg:gap-7">
            <div className="col-span-1"></div>
            <div className="col-span-2"></div>
          </div>
        </div>
      </section>
    </>
  );
}
