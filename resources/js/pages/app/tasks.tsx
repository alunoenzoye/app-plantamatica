import { DataTable } from '@/components/data-table';
import TaskCreateForm from '@/components/task-create-form';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { Task, type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { formatDate } from 'date-fns';
import { PlusIcon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tarefas',
        href: '/tarefas',
    },
];

interface tasksProps {
    tasks: Task[]
}

const priorityStyles = {
    low: {
        text: "Baixo",
        className: "text-green-700"
    },
    medium: {
        text: "Médio",
        className: "text-yellow-600"
    },
    high: {
        text: "Alto",
        className: "text-red-600"
    },
}

const columns: ColumnDef<Task>[] = [
    {
        accessorKey: "name",
        header: "Nome"
    },
    {
        accessorKey: "priority",
        header: "Prioridade",
        cell: ({ row }) => {
            const priorityStyle = priorityStyles[row.getValue("priority") as keyof typeof priorityStyles];

            return <span className={priorityStyle.className}>{priorityStyle.text}</span>
        }
    },
    {
        accessorKey: "due_date",
        header: "Prazo",
        cell: ({ row }) => {
            const date: Date = row.getValue("due_date");

            return formatDate(date, "dd/MM/yyyy")
        }
    },
    // {
    //     accessorKey: "name",
    //     header: "Nome"
    // },
]

export default function Tasks({ tasks }: tasksProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tarefas" />
            <div className="p-4 flex flex-col gap-2">
                <TaskCreateForm openButton={
                    <Button className="w-fit bg-blue-600 hover:bg-blue-500 active:bg-blue-300">
                        <PlusIcon />Nova Tarefa
                    </Button>
                } />
                <Separator className="mt-2 mb-2" />
                <DataTable columns={columns} data={tasks} />
            </div>
        </AppLayout >
    );
}
