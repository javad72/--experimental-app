import { AppSidebar } from "@/components/app-sidebar"

import AppHeader from "@/components/app-header"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import React from "react";


export default async function Layout({
         children,
     }) {
    return (

             <SidebarProvider>
                  <AppSidebar  />
                  <SidebarInset>
                     <AppHeader />
                     <div className='p-3'>
                         {children}
                     </div>
                  </SidebarInset>
              </SidebarProvider>

    )
}
