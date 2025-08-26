import { DataTable } from '@/components/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { formatDate } from 'date-fns';

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

const columns: ColumnDef<App.Data.TaskData>[] = [
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
