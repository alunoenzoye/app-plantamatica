import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
    floatingSidebar?: boolean;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, floatingSidebar, ...props }: AppLayoutProps) => (
    <AppLayoutTemplate
        breadcrumbs={breadcrumbs}
        floatingSidebar={floatingSidebar}
        {...props}
    >
        {children}
    </AppLayoutTemplate>
);
