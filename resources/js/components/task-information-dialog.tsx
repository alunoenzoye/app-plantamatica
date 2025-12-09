import { LucideCheck, LucideFlag, LucideGavel, LucideX } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Separator } from "./ui/separator";
import usePermission from "@/hooks/use-permission";
import { router, usePage } from "@inertiajs/react";
import { Badge } from "./ui/badge";
import getPriorityStyle from "@/utils/getPriorityStyle";
import { formatDate } from "date-fns";
import LinkedImageList from "./linked-image-list";

interface callInformationDialogProps {
    task: App.Data.TaskData | undefined,
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    onTaskComplete: (task: App.Data.TaskData) => void,
}

export default function TaskInformationDialog({ task, open, setOpen, onTaskComplete }: callInformationDialogProps) {
    const { can } = usePermission()

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{task?.name}</DialogTitle>
                    <DialogDescription hidden={true}>Informações da tarefa</DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4 overflow-hidden">
                    <Separator />
                    <div className="flex gap-4">
                        <div className="flex flex-col gap-1">
                            <span>Prioridade</span>
                            {task?.priority && (
                                <Badge className={`${getPriorityStyle(task.priority).backgroundClassName}`}>
                                    <LucideFlag />
                                    {getPriorityStyle(task.priority).text}
                                </Badge>
                            )}
                        </div>
                        <div className="flex flex-col gap-1">
                            <span>Prazo</span>
                            <Badge variant={"secondary"}>
                                {(task?.due_date) ? (
                                    formatDate(task.due_date, "dd/MM/yyyy")
                                ) : (
                                    "N/A"
                                )}
                            </Badge>
                        </div>
                    </div>
                    <div>
                        <h2 className="font-bold">Descrição</h2>
                        <div className="overflow-x-hidden overflow-y-auto max-h-60">
                            <p className='wrap-break-word w-full'>{
                                (task?.description) ? task.description : "Descrição vazia."
                            }</p>
                        </div>
                    </div>
                    <div>
                        <h2 className="font-bold">Anexos</h2>
                        <LinkedImageList
                            images={task?.images}
                            onAddImages={(imageList) => {
                                if (task === undefined) {
                                    return;
                                }

                                router.post(route("tasks.add-image", task?.id), {
                                    image: imageList[0],
                                }, {
                                    onSuccess: () => {
                                        setOpen(false)
                                        router.reload({
                                            preserveState: false,
                                        })
                                    },
                                })
                            }}
                        />
                    </div>
                </div>
                <DialogFooter>
                    {can("tasks.complete") && (
                        <Button onClick={() => {
                            if (task !== undefined) {
                                onTaskComplete(task)
                            }
                        }}>
                            <LucideCheck />
                            Concluir
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
