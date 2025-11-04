import { DataTable } from '@/components/data-table';
import { router } from '@inertiajs/react';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { formatDate } from 'date-fns';
import { Checkbox } from './ui/checkbox';
import { useMemo, useState } from 'react';

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


interface taskListProps {
    tasks: App.Data.TaskData[],
}

export default function TaskList({ tasks }: taskListProps) {
    const [taskData, setTaskData] = useState(tasks);

    const columns = useMemo(() => {
        const columns: ColumnDef<App.Data.TaskData>[] = [
            columnHelper.display({
                id: "complete_checkbox",
                size: 32,
                cell: ((props) => {
                    const done = props.row.original.done;

                    return (<Checkbox
                        className="hover:cursor-pointer p-0"
                        checked={done}
                        onCheckedChange={() => {
                            const toggle = !props.row.original.done

                            const cloned = [...taskData]
                            const row = cloned.at(props.row.index)
                            if (row) row.done = toggle

                            setTaskData(cloned)

                            router.patch(route(
                                'tasks.complete', props.row.original.id),
                                {
                                    done: toggle
                                }
                            );
                        }}
                    />)
                }),
                enableSorting: false,
                enableHiding: false,
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

                    if (date) {
                        return formatDate(date, "dd/MM/yyyy")
                    } else {
                        return null;
                    }
                }
            },
        ]

        return columns
    }, [taskData, setTaskData]);

    return (
        <DataTable columns={columns} data={taskData} />
    )
}
