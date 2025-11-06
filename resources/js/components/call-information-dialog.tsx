import { LucideGavel, LucideX } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Separator } from "./ui/separator";
import usePermission from "@/hooks/use-permission";
import { router } from "@inertiajs/react";

interface callInformationDialogProps {
    call: App.Data.CallData | undefined,
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

export default function CallInformationDialog({ call, open, setOpen }: callInformationDialogProps) {
    const { can } = usePermission()

    function onDelete() {
        if (call === undefined) {
            return
        }

        router.delete(route('calls.delete', call.id), {
            onFinish: () => {
                setOpen(false);
                router.reload()
            }
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{call?.name}</DialogTitle>
                    <DialogDescription hidden={true}>Informações do chamado</DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4 overflow-hidden">
                    <Separator />
                    <div>
                        <h2 className="font-bold">Descrição</h2>
                        <div className="overflow-x-hidden overflow-y-auto max-h-60">
                            <p className='wrap-break-word w-full'>{
                                (call?.description) ? call.description : "Descrição vazia."
                            }</p>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    {can("calls.delete") &&
                        <Button variant={"destructive"} onClick={onDelete}>
                            <LucideX />
                            Apagar
                        </Button>
                    }
                    <Button>
                        <LucideGavel />
                        Gerenciar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
