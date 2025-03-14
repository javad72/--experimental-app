"use client";
import {SidebarTrigger} from "@/components/ui/sidebar";
import {Separator} from "@/components/ui/separator";
import React from "react";
import { useUser} from "@/lib/user-context";
const  AppHeader =props => {
    const {user} = useUser()
    return (
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1"/>
            <Separator orientation="vertical" className="mr-2 h-4"/>
            <span>سلام {user}</span>
        </header>
    )
}
export  default AppHeader ;

