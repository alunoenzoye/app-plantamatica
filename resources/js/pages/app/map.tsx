import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head } from "@inertiajs/react";
import { Separator } from '@/components/ui/separator';
import BlueprintMap from "@/components/blueprint-map";

interface callsProps {
    calls: App.Data.CallData[],
    tasks: App.Data.TaskData[],
}

export default function Calls({ calls, tasks }: callsProps) {
    console.log(calls)
    console.log(tasks)
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
                <BlueprintMap
                    tasks={tasks}
                    calls={calls}
                />
            </AppLayout>
        </>
    )
}
