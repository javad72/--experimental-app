"use client"
import { Search} from "lucide-react";
import { Label } from "@/components/ui/label";
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarInput,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";


interface Link {
    title: string;
    link: string;
}

interface SearchFormProps extends React.ComponentProps<"form"> {
    links: Link[];
}

export function SearchForm({ ...props }: SearchFormProps) {
    const { links } = props;
    const [search, setSearch] = useState<string>(""); 
    const [searchResault, setSearchResault] = useState<Link[]>([]); 

    useEffect(() => {
        
        if(!search){
            setSearchResault(links);
        }else{
            const resault = links.filter(item=>{return item.title.indexOf(search)>-1})
            setSearchResault(resault)
        }
        
        
    }, [search]);

    const searchHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value); 
    };


    return (
       <div className="relative px-0">
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
                        value={search}
                        onChange={searchHandle} 
                    />
                    <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
                </SidebarGroupContent>
            </SidebarGroup>
        </form>
         
            {
                searchResault.length>0 && searchResault.length !== links.length &&
                <div className="absolute bootom-0 right-0 w-full px-2 z-50">
                    <Card>
                    <CardHeader>
                        <CardTitle>جست و جوی سریع</CardTitle>
                    </CardHeader>
                    <CardContent>
                    <SidebarMenu>
                        {
                            searchResault.map((item , index)=>{
                                return(
                                    <SidebarMenuItem key={index}>
                                        <Link href={item.link}>{item.title}</Link>
                                    </SidebarMenuItem>
                                )
                            })
                        }
                    </SidebarMenu>
                    </CardContent>
                    <CardFooter>
                    </CardFooter>
                    </Card>
                </div>
            }
          
       </div>
      
    );
}
