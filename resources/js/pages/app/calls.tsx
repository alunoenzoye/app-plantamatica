import CallCreateForm from "@/components/call-create-form";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head } from "@inertiajs/react";
import { Separator } from '@/components/ui/separator';
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import CallList from "@/components/call-list";

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
                <CallCreateForm openButton={
                    <Button className="w-fit bg-blue-600 hover:bg-blue-500 active:bg-blue-300">
                        <PlusIcon />Novo chamado
                    </Button>
                } />
                <Separator className="mt-2 mb-2" />
                <CallList calls={calls} />
            </div>

        </AppLayout>
    )
}
