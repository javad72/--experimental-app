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
export default function Page(props) {

    return (
        <html>
          <body>

             <SidebarProvider>
              <AppSidebar />
              <SidebarInset>
                  <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                      <SidebarTrigger className="-ml-1" />
                      <Separator orientation="vertical" className="mr-2 h-4" />
                      <Breadcrumb>
                          <BreadcrumbList>
                              <BreadcrumbItem className="hidden md:block">
                                  <BreadcrumbLink href="#">
                                      Building Your Application
                                  </BreadcrumbLink>
                              </BreadcrumbItem>
                              <BreadcrumbSeparator className="hidden md:block" />
                              <BreadcrumbItem>
                                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                              </BreadcrumbItem>
                          </BreadcrumbList>
                      </Breadcrumb>
                  </header>
                 <div className='p-3'>
                     {props.children}
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