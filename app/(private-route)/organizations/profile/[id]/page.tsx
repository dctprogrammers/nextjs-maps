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
import { Organization } from "@/models/Organization";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Fragment } from "react";

const getOrganization = cache(async (urlTitle: string) => {
  return await Organization.findOne<typeof Organization>({
    urlTitle,
  }).lean();
});

const firstLetterUpper = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export default async function Page({
  params,
}: {
  params: Promise<{ id?: string }>;
}) {
  const urlTitle = (await params).id;

  if (!params || !urlTitle) {
    throw new Error("ID param missing");
  }

  const organization = await getOrganization(urlTitle);

  if (!organization) return notFound();

  console.log(organization);

  // const organizationInfo = [
  //   { value: , label: organization.card.employees },
  //   { users: "60.7M", label: organization.card.users },
  //   { machines: "1000+", label: organization.card.machines },
  // ];

  return (
    <>
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/organizations">Organizations</BreadcrumbLink>
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
              src={`/users/${organization.logo}`}
              width={100}
              height={100}
              alt={organization.title}
            />
            <div className="flex items-center gap-1.5">
              <div className="text-lg leading-5 font-semibold text-gray-900">
                {organization.title}
              </div>
              {/* {user.emailVerified && (
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
              )} */}
            </div>
            <div>
              <p>{organization.info}</p>
            </div>
            {/* <div className="flex flex-wrap justify-center gap-4 lg:gap-4.5 text-sm">
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
            </div> */}
          </div>
        </div>
        <div className="">
          <div className="flex items-center flex-wrap md:flex-nowrap lg:items-end justify-between gap-3 lg:gap-6">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="machines">Machines</TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>
              <TabsContent value="profile">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-7">
                  <div className="col-span-1 lg:col-span-3">
                    <Card>
                      <CardHeader className="px-8 py-5 flex-grow">
                        <div className="flex lg:px-10 py-2 gap-2">
                          {Object.entries(organization.card).map(
                            ([key, value]) => (
                              <Fragment key={key}>
                                <div className="grid grid-cols-1 flex-1 gap-1 text-center place-content-center">
                                  <CardTitle className="text-2xl leading-none">
                                    {String(value)}
                                  </CardTitle>
                                  <CardDescription>
                                    {firstLetterUpper(key)}
                                  </CardDescription>
                                </div>
                                <span className="[&:not(:last-child)]:border-e border-e-gray-300 my-1"></span>
                              </Fragment>
                            )
                          )}
                        </div>
                      </CardHeader>
                    </Card>
                  </div>
                  <div className="col-span-1">
                    <Card>
                      <CardHeader>
                        <CardTitle>About</CardTitle>
                        {/* <CardDescription>Card Description</CardDescription> */}
                      </CardHeader>
                      <CardContent>
                        <p>{organization.description}</p>
                      </CardContent>
                      {/* <CardFooter>
                        <p>Card Footer</p>
                      </CardFooter> */}
                    </Card>
                  </div>
                  <div className="col-span-1 lg:col-span-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Location</CardTitle>
                        {/* <CardDescription>Card Description</CardDescription> */}
                      </CardHeader>
                      <CardContent>
                        <p>Map from Google Maps</p>
                        <p>Location</p>
                      </CardContent>
                      {/* <CardFooter>
                        <p>Card Footer</p>
                      </CardFooter> */}
                    </Card>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="machines">List of machines.</TabsContent>
              <TabsContent value="users">
                List of users of organization.
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
