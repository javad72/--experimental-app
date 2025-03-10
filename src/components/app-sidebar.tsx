import {SearchForm} from "@/components/search-form";
import {
    Sidebar,
    SidebarContent, SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu, SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarRail
} from "@/components/ui/sidebar";
import {APP_URL_HOST} from "@/lib/const";
import {ChevronDown} from "lucide-react";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible";
import Logo from "@/components/logo";

// دریافت داده‌های منو در سمت سرور
async function getMenuData() {
    const response = await fetch(`${APP_URL_HOST}/navMain`, {
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("خطا در دریافت منو");
    }

    return response.json();
}

export async function AppSidebar(props) {
    const menu = await getMenuData();
    let links = [];
    menu.forEach((item) => {
        if (item.items && item.items.length > 0 && item.link !== '#') {
            item.items.forEach((subItem) => {
                links.push({ link: subItem.link, title: subItem.title });
            });
        } else {
            links.push({ link: item.link, title: item.title });
        }
    });

    return (
        <Sidebar variant="inset" side="right" {...props}>
            <SidebarHeader>
                <Logo />
                <SearchForm links={links} />
            </SidebarHeader>
            <SidebarContent>
                {menu.length > 0 ? (
                    <Menus navMain={menu}/>
                ) : (
                    <p>منو در دسترس نیست</p>
                )}
            </SidebarContent>
            <SidebarRail/>
        </Sidebar>
    );
}

const SvgIcon = ({svgString}) => (
    <span dangerouslySetInnerHTML={{__html: svgString}}/>
);
const Menus = ({navMain}) => {
    return (
        <SidebarMenu>
            {navMain.map((item) => (
                <SidebarMenuItem key={item.id}>


                    {
                        item.items.length == 0 &&
                        <SidebarMenuButton>
                            <SvgIcon svgString={item.icon}/> <span>{item.title}</span>
                        </SidebarMenuButton>
                    }
                    {item.items.length > 0 && (
                        <Collapsible>
                            <CollapsibleTrigger asChild className='w-full'>
                                <SidebarMenuButton>
                                    <SvgIcon svgString={item.icon}/> <span className='w-100 block'> {item.title}</span>
                                </SidebarMenuButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <SidebarMenuSub>
                                    {item.items.map((subItem) => (
                                        <SidebarMenuSubItem key={subItem.id}>
                                            <SidebarMenuSubButton asChild>
                                                <a href={subItem.url}>{subItem.title}</a>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                    ))}
                                </SidebarMenuSub>
                            </CollapsibleContent>

                        </Collapsible>
                    )}

                </SidebarMenuItem>
            ))}
        </SidebarMenu>
    );
};
// <SidebarMenu>
//     {projects.map((project) => (
//         <SidebarMenuItem key={project.name}>
//             <SidebarMenuButton asChild>
//                 <a href={project.url}>
//                     <project.icon />
//                     <span>{project.name}</span>
//                 </a>
//             </SidebarMenuButton>
//         </SidebarMenuItem>
//     ))}
// </SidebarMenu>