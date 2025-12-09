import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { ApproveCallRequest } from "@/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CallManageForm, { callManageForm } from "./call-manage-form";
import { Loader2Icon, LucideCheck, LucideX } from "lucide-react";
import { useState } from "react";
import { router } from "@inertiajs/react";
import usePermission from "@/hooks/use-permission";

interface callManageDialogProps {
    call: App.Data.CallData | undefined,
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

export function CallManageDialog({ call, open, setOpen }: callManageDialogProps) {
    const { can } = usePermission()
    const [approveRequestProcessing, setApproveRequestProcessing] = useState(false);
    const [refuseRequestProcessing, setRefuseRequestProcessing] = useState(false);
    const form = useForm<callManageForm>({
        resolver: zodResolver(ApproveCallRequest),
        defaultValues: {
            due_date: undefined,
            priority: "",
        }
    })

    async function refuse() {
        if (call === undefined) {
            return
        }

        const isValid = await form.trigger()
        if (isValid) {
            form.handleSubmit(() => {
                setRefuseRequestProcessing(true)

                router.post(route("calls.refuse", call.id), {}, {
                    onError: (error) => {
                        for (const [field, message] of Object.entries(error)) {
                            form.setError(field as keyof callManageForm, {
                                type: "custom",
                                message: message
                            })
                        }
                    },
                    onSuccess: () => {
                        setOpen(false)
                        router.reload({
                            preserveState: false,
                        })
                    },
                    onFinish: () => {
                        form.reset()
                        setRefuseRequestProcessing(false)
                    }
                })
            })()
        }
    }

    async function approve() {
        if (call === undefined) {
            return
        }

        const isValid = await form.trigger()
        if (isValid) {
            form.handleSubmit((values) => {
                setApproveRequestProcessing(true)

                router.post(route("calls.approve", call.id), values, {
                    onError: (error) => {
                        for (const [field, message] of Object.entries(error)) {
                            form.setError(field as keyof callManageForm, {
                                type: "custom",
                                message: message
                            })
                        }
                    },
                    onSuccess: () => {
                        setOpen(false)
                        router.reload({
                            preserveState: false,
                        })
                    },
                    onFinish: () => {
                        form.reset()
                        setApproveRequestProcessing(false)
                    }
                })
            })()
        }
    }

    return (
        <Dialog open={open} onOpenChange={(state) => {
            if (!state) {
                form.reset()
            }

            setOpen(state)
        }}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{call?.name}</DialogTitle>
                    <DialogDescription>Gerenciar chamado</DialogDescription>
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
                    <Separator />
                    <CallManageForm
                        form={form}
                        onSubmit={() => {}}
                    />
                </div>
                <DialogFooter>
                    {can("calls.manage") && (
                        <>
                            <Button
                                variant={"destructive"}
                                disabled={(approveRequestProcessing || refuseRequestProcessing)}
                                type="submit"
                                onClick={refuse}
                            >
                                {(refuseRequestProcessing) ? (
                                    <Loader2Icon className="animate-spin" />
                                ) : (
                                    <LucideX />
                                )}
                                Negar
                            </Button>
                            <Button
                                className="w-fit bg-blue-600 hover:bg-blue-500 active:bg-blue-300"
                                disabled={(approveRequestProcessing || refuseRequestProcessing)}
                                onClick={approve}
                            >
                                {(approveRequestProcessing) ? (
                                    <Loader2Icon className="animate-spin" />
                                ) : (
                                    <LucideCheck />
                                )}
                                Aprovar
                            </Button>

                        </>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}
