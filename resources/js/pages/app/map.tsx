import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head } from "@inertiajs/react";
import { Separator } from '@/components/ui/separator';

export default function Calls() {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Planta',
            href: '/planta',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Planta" />
            <div className="p-4 flex flex-col gap-2">
                <Separator className="mt-2 mb-2" />
            </div>

        </AppLayout>
    )
}
