import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head } from "@inertiajs/react";
import { Separator } from "@radix-ui/react-separator";

interface callsProps {
    calls: App.Data.CallData[]
}

export default function Calls({ calls }: callsProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Chamados',
            href: '/chamados',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tarefas" />
            <div className="p-4 flex flex-col gap-2">
                <Separator className="mt-2 mb-2" />
            </div>

        </AppLayout>
    )
}
