import * as React from "react"
import { SearchForm } from "@/components/search-form"
import { LangSwitcher } from "@/components/lang-switcher"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"
type defaultLang = {
    "title": string , 
    "id": number
}

export  function AppSidebar({ menu , ...props }: React.ComponentProps<typeof Sidebar>  & { menu: any }) {

    let data = { navMain: [] }; 

    const LanguageComponent = async()=>{
       
        try {
        const res = await fetch('http://localhost:4000/languages', {
            cache: 'no-store',
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const langs:defaultLang[] = await res.json();
        console.log('langs:');
        console.log(langs);
        return(
            <LangSwitcher
                    langs={langs}
                    defaultLang={langs[0]}
                />
        )
        
    } catch (error) {
        console.error('Error fetching data:', error);
        return <div>Failed to load languages</div>;
    } 
    }
   

    return (
        <Sidebar side="right" {...props}>
            <SidebarHeader >
                <LanguageComponent />
                <SearchForm />
            </SidebarHeader>
            <SidebarContent>
                {/* We create a SidebarGroup for each parent. */}
                {data.navMain.map((item) => (
                    <SidebarGroup key={item.title}>
                        <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {item.items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild isActive={item.isActive}>
                                            <a href={item.url}>{item.title}</a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    )
}

