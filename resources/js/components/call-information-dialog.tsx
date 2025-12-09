import { LucideGavel, LucideX, Paperclip } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Separator } from "./ui/separator";
import usePermission from "@/hooks/use-permission";
import { router, usePage } from "@inertiajs/react";
import { Badge } from "./ui/badge";
import LinkedImageList from "./linked-image-list";

interface callInformationDialogProps {
    call: App.Data.CallData | undefined,
    open: boolean,
    onManageClicked: () => void,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

export default function CallInformationDialog({ call, open, setOpen, onManageClicked }: callInformationDialogProps) {
    const { can } = usePermission()
    const { url } = usePage();

    function onDelete() {
        if (call === undefined) {
            return
        }

        router.delete(route('calls.delete', call.id), {
            onSuccess: () => {
                setOpen(false)
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
                <div>
                    <h2 className="font-bold">Anexos</h2>
                    <LinkedImageList
                        images={call?.images}
                        onAddImages={(imageList) => {
                            if (call === undefined) {
                                return;
                            }

                            router.post(route("calls.add-image", call?.id), {
                                image: imageList[0],
                            }, {
                                onSuccess: () => {
                                    router.reload()
                                    setOpen(false)
                                }
                            })
                        }}
                    />
                </div>
                <DialogFooter>
                    {can("calls.delete") && (
                        <Button variant={"destructive"} onClick={onDelete}>
                            <LucideX />
                            Apagar
                        </Button>
                    )}
                    {can("calls.manage") && (
                        <Button onClick={onManageClicked}>
                            <LucideGavel />
                            Gerenciar
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
