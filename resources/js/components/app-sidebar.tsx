import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Award, BookOpen, Folder, HelpCircle, LayoutGrid, Map, Megaphone, Pencil, PersonStanding, PersonStandingIcon, PowerSquareIcon } from 'lucide-react';
import AppLogo from './app-logo';
import usePermission from '@/hooks/use-permission';

export function AppSidebar() {
    const { can } = usePermission();

    const mainNavItems: NavItem[] = [
        {
            title: 'Painel',
            href: '/painel',
            icon: LayoutGrid,
        },
        {
            title: 'Chamados',
            href: '/chamados',
            icon: Megaphone
        },
        can("tasks.index") ? {
            title: 'Tarefas',
            href: '/tarefas',
            icon: Pencil,
        } : undefined,
        {
            title: 'Planta',
            href: '/planta',
            icon: Map,
        },
        {
            title: 'Creditos',
            href: '/creditos',
            icon: Award,
        },
        {
            title: 'Ajuda',
            href: '/ajuda',
            icon: HelpCircle,
        },
    ].filter((e) => e !== undefined);

    return (
        <Sidebar collapsible="icon" variant="sidebar">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/painel" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
