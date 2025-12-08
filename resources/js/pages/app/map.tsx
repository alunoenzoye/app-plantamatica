import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head, router } from "@inertiajs/react";
import { Separator } from '@/components/ui/separator';
import BlueprintMap from "@/components/blueprint-map";
import CallInformationDialog from "@/components/call-information-dialog";
import TaskInformationDialog from "@/components/task-information-dialog";
import { useState } from "react";
import { CallManageDialog } from "@/components/call-manage-dialog";

interface callsProps {
    calls: App.Data.CallData[],
    tasks: App.Data.TaskData[],
}

export default function Calls({ calls, tasks }: callsProps) {
    const [callInformationOpen, setCallInformationOpen] = useState(false)
    const [callManageDialogOpen, setCallManageDialogOpen] = useState(false)
    const [taskInformationOpen, setTaskInformationOpen] = useState(false)
    const [selectedCall, setSelectedCall] = useState<App.Data.CallData | undefined>(undefined)
    const [selectedTask, setSelectedTask] = useState<App.Data.TaskData | undefined>(undefined)
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Planta',
            href: '/planta',
        },
    ];

    return (
        <>
            <CallManageDialog
                call={selectedCall}
                open={callManageDialogOpen}
                setOpen={setCallManageDialogOpen}
            />
            <CallInformationDialog
                setOpen={setCallInformationOpen}
                open={callInformationOpen}
                call={selectedCall}
                onManageClicked={() => {
                    setCallManageDialogOpen(true)
                }}
            />
            <TaskInformationDialog
                setOpen={setTaskInformationOpen}
                open={taskInformationOpen}
                task={selectedTask}
                onTaskComplete={(task) => {
                    router.patch(route(
                        'tasks.complete', task.id
                    ), {
                        done: !task.done
                    }, {
                        onFinish: () => {
                            setTaskInformationOpen(false)
                            setSelectedTask(undefined)
                            router.reload()
                        }
                    })
                }}
            />
            <AppLayout breadcrumbs={breadcrumbs} floatingSidebar={true} className="!bg-none">
                <Head title="Planta" />
                <BlueprintMap
                    tasks={tasks}
                    calls={calls}
                    onCallSelected={(call) => {
                        setSelectedTask(undefined)
                        setTaskInformationOpen(false)

                        setSelectedCall(call)
                        setCallInformationOpen(true)
                    }}
                    onTaskSelected={(task) => {
                        setSelectedCall(undefined)
                        setTaskInformationOpen(true)

                        setSelectedTask(task)
                        setCallInformationOpen(false)
                    }}
                />
            </AppLayout>
        </>
    )
}
