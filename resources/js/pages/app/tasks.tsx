import TaskCreateForm from '@/components/task-create-form';
import TaskList from '@/components/task-list';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { Task, type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { PlusIcon } from 'lucide-react';

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
                <TaskCreateForm openButton={
                    <Button className="w-fit bg-blue-600 hover:bg-blue-500 active:bg-blue-300">
                        <PlusIcon />Nova Tarefa
                    </Button>
                } />
                <Separator className="mt-2 mb-2" />
                <TaskList tasks={tasks}/>
            </div>
        </AppLayout >
    );
}
