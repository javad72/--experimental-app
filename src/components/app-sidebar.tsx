import * as React from "react"
import { SearchForm } from "@/components/search-form"
import { VersionSwitcher } from "@/components/version-switcher"
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
// This is sample data.
const data =
    {
        "languages": ["fa", "en", "de"],
        "navMain": [
            {
                "title": "Overview",
                "url": "overview",
                "items": []
            },
            {
                "title": "Orders",
                "url": "#",
                "items": [
                    {
                        "title": "Pending Orders",
                        "url": "#pending-orders",
                        "items": []
                    },
                    {
                        "title": "Completed Orders",
                        "url": "#completed-orders",
                        "items": []
                    },
                    {
                        "title": "Cancelled Orders",
                        "url": "#cancelled-orders",
                        "items": []
                    },
                    {
                        "title": "Order History",
                        "url": "#order-history",
                        "items": []
                    },
                    {
                        "title": "Track Order",
                        "url": "#track-order",
                        "items": []
                    }
                ]
            },
            {
                "title": "Settings",
                "url": "settings",
                "items": []
            }
        ]
    }




export function AppSidebar({ menu , ...props }: React.ComponentProps<typeof Sidebar>  & { menu: any }) {
    return (
        <Sidebar {...props}>
            <SidebarHeader >
                <VersionSwitcher
                    versions={data.languages}
                    defaultVersion={data.languages[0]}
                />
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

