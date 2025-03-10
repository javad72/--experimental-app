// "use client"
import { Search } from "lucide-react"

import { Label } from "@/components/ui/label"
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarInput,
} from "@/components/ui/sidebar"
// import React, {useEffect, useState} from "react";

interface link{
    "title": String ,
    "link": String ,
}
interface SearchFormProps extends React.ComponentProps<"form"> {
    links: link[];
}
export function SearchForm({...props }: SearchFormProps) {
    const {links}  = props ;
    // const [search , setSearch] = useState()

    // useEffect(()=>{
    //
    // } , [search])
    // const searchHandle=(input)=>{
    //     console.log(input)
    // }
    return (
        <form {...props}>
            <SidebarGroup className="py-0">
                <SidebarGroupContent className="relative">
                    <Label htmlFor="search" className="sr-only">
                        جست و جو
                    </Label>
                    <SidebarInput
                        id="search"
                        placeholder="جست و جو..."
                        className="pl-8"

                    />
                    <Search  className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
                </SidebarGroupContent>
            </SidebarGroup>
        </form>
    )
}
