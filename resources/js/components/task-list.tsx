import { DataTable } from '@/components/data-table';
import { router } from '@inertiajs/react';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { formatDate } from 'date-fns';
import { Checkbox } from './ui/checkbox';

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

const columnHelper = createColumnHelper<App.Data.TaskData>()

const columns: ColumnDef<App.Data.TaskData>[] = [
    // {
    //     accessorKey: "id",
    //     header: "ID"
    // },
    columnHelper.display({
        id: "complete_checkbox",
        size: 32,
        cell: (( props ) => {
            const done = props.row.original.done;

            return <Checkbox
                className="hover:cursor-pointer"
                checked={done}
                onCheckedChange={(checked) => {
                    if (checked === true) {
                        router.patch(route('tasks.complete', {
                            id: props.row.original.id
                        }));
                        router.reload();
                    }
                }}
            />
        })
    }),
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

interface taskListProps {
    tasks: App.Data.TaskData[],
}

export default function TaskList({ tasks }: taskListProps) {
    return (
        <DataTable columns={columns} data={tasks} />
    )
}
