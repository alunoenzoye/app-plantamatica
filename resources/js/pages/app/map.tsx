import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head } from "@inertiajs/react";
import { Separator } from '@/components/ui/separator';
import BlueprintMap from "@/components/blueprint-map";

export default function Calls() {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Planta',
            href: '/planta',
        },
    ];

    return (
        <>
            <AppLayout breadcrumbs={breadcrumbs} floatingSidebar={true} className="!bg-none">
                <Head title="Planta" />
                <BlueprintMap />
            </AppLayout>
        </>
    )
}
