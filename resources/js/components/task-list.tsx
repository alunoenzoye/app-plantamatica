import { DataTable } from '@/components/data-table';
import { Button } from './ui/button';
import { router } from '@inertiajs/react';
import { createColumnHelper } from '@tanstack/react-table';
import { formatDate } from 'date-fns';
import { Checkbox } from './ui/checkbox';
import { useMemo, useState } from 'react';
import { LucideExternalLink, LucideMapPinned } from 'lucide-react';
import getPriorityStyle from '@/utils/getPriorityStyle';
import TaskInformationDialog from './task-information-dialog';

const columnHelper = createColumnHelper<App.Data.TaskData>()

interface taskListProps {
    tasks: App.Data.TaskData[],
}

export default function TaskList({ tasks }: taskListProps) {
    const [taskData, setTaskData] = useState(tasks)
    const [selectedTask, setSelectedTask] = useState<App.Data.TaskData | undefined>(undefined)
    const [taskInformationDialogOpen, setTaskInformationDialogOpen] = useState(false)

    function markTaskAsDone(id: number, mark: boolean) {
        const cloned = [...taskData]
        const taskIndex = cloned.findIndex((value) => {
            return value.id === id
        })

        if (taskIndex !== -1) {
            taskData[taskIndex].done = mark
        }

        setTaskData(cloned)

        router.patch(route(
            'tasks.complete', id),
            {
                done: mark
            }, {
            onFinish: () => {
                router.reload()
            }
        }
        );
    }

    const columns = useMemo(() => {
        const columns = [
            columnHelper.accessor("done", {
                header: "",
                size: 32,
                cell: ((props) => {
                    const done = props.row.original.done;

                    return (<Checkbox
                        className="hover:cursor-pointer p-0"
                        checked={done}
                        onCheckedChange={() => {
                            const toggle = !props.row.original.done
                            markTaskAsDone(props.row.original.id, toggle)
                        }}
                    />)
                }),
                enableSorting: false,
                enableHiding: false,
            }),
            columnHelper.accessor("name", {
                header: "Nome"
            }),
            columnHelper.accessor("priority", {
                header: "Prioridade",
                cell: ({ row }) => {
                    const priorityStyle = getPriorityStyle(row.getValue("priority"))

                    return <span className={priorityStyle.className}>{priorityStyle.text}</span>
                }
            }),
            columnHelper.accessor("due_date", {
                header: "Prazo",
                enableSorting: true,
                sortingFn: (rowA, rowB) => {
                    if (rowA.getValue("due_date") === undefined) {
                        return -1
                    }
                    const rowADate = new Date(rowA.getValue("due_date"))
                    const rowBDate = new Date(rowB.getValue("due_date"))

                    if (rowADate === rowBDate) {
                        return 0
                    }

                    return (rowADate > rowBDate) ? -1 : 1
                },
                cell: ({ row }) => {
                    const date: Date = row.getValue("due_date");

                    if (date) {
                        return formatDate(date, "dd/MM/yyyy")
                    } else {
                        return "N/A";
                    }
                }
            }),
            columnHelper.group({
                id: "actions",
                header: "",
                cell: ({ row }) => (
                    <div className="flex gap-2 justify-end">
                        <Button
                            onClick={() => {
                                setSelectedTask(row.original)
                                setTaskInformationDialogOpen(true)
                            }}
                            variant="outline"
                            size="icon"
                        >
                            <LucideExternalLink />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            disabled={(row.original.position === null || row.original.position === undefined || row.original.done)}
                            onClick={() => {
                                console.log(row.original.position)
                                router.visit(route("map.index"), {
                                    method: 'get',
                                    data: {
                                        "go_to": row.original.id,
                                        "go_to_category": 'task'
                                    }
                                })
                            }}
                        >
                            <LucideMapPinned />
                        </Button>
                    </div >

                )
            })
        ]

        return columns
    }, [taskData, setTaskData]);

    return (
        <>
            <TaskInformationDialog
                task={selectedTask}
                open={taskInformationDialogOpen}
                setOpen={setTaskInformationDialogOpen}
                onTaskComplete={(task) => {
                    setTaskInformationDialogOpen(false)
                    markTaskAsDone(task.id, true)
                }}
            />
            <DataTable
                columns={columns}
                data={taskData}
                initialSort={[
                    {
                        id: "due_date",
                        desc: false
                    }
                ]}
            />
        </>
    )
}
