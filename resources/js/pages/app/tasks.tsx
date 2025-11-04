import TaskList from '@/components/task-list';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tarefas',
        href: '/tarefas',
    },
];

interface tasksProps {
    tasks: App.Data.TaskData[]
}


export default function Tasks({ tasks }: tasksProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tarefas" />
            <div className="p-4 flex flex-col gap-2">
                <TaskList tasks={tasks} />
            </div>
        </AppLayout >
    );
}
