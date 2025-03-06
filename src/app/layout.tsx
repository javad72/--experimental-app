import { AppSidebar } from "@/components/app-sidebar"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import "@/styles/globals.css";
import React from "react";
import {ChevronLeft} from "lucide-react";


export default async function Layout({
         children,
     }: {
    children: React.ReactNode;
}) {
    return (
        <html dir="rtl">
          <body>

             <SidebarProvider>
                  <AppSidebar menu={[]} />
                  <SidebarInset>
                      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                          <SidebarTrigger className="-ml-1" />
                          <Separator orientation="vertical" className="mr-2 h-4" />
                          <Breadcrumb>
                              <BreadcrumbList>
                                  <BreadcrumbItem className="hidden md:block">
                                      <BreadcrumbLink href="#">
                                          home
                                      </BreadcrumbLink>
                                  </BreadcrumbItem>
                                  <BreadcrumbSeparator>
                                      <ChevronLeft />
                                  </BreadcrumbSeparator>
                                  <BreadcrumbItem>
                                      <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                                  </BreadcrumbItem>
                              </BreadcrumbList>
                          </Breadcrumb>
                      </header>
                     <div className='p-3'>
                         {children}
                     </div>
                  </SidebarInset>
              </SidebarProvider>
          </body>
        </html>
    )
}
// export async function getStaticProps() {
// export async function getServerSideProps() {
//     const res = await fetch('http://localhost:3001/navMain'); // JSON Server endpoint
//     const data1 = await res.json();
//     console.log(data1)
//     console.log('data1')
//     return {
//         props: {
//             menu: data1, // Pass menu data as a prop
//         },
//     };
// }