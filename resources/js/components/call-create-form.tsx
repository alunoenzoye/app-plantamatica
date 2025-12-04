import z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CallRequest } from "@/schema";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { router } from "@inertiajs/react";
import { Loader2Icon } from "lucide-react";
import { ReactNode, useState } from "react";

type fields = keyof z.infer<typeof CallRequest>

interface callCreateFormProps {
    openButton: ReactNode
}

export default function CallCreateForm({ openButton }: callCreateFormProps) {
    const [open, setOpen] = useState(false);
    const [sendingRequest, setSendingRequest] = useState(false);

    const form = useForm<z.infer<typeof CallRequest>>({
        resolver: zodResolver(CallRequest),
        defaultValues: {
            name: "",
            description: ""
        }
    })

    function onSubmit(values: z.infer<typeof CallRequest>) {
        if (sendingRequest == true) {
            return;
        }

        setSendingRequest(true);

        router.post(route('calls.create'), values, {
            onError: (error) => {
                console.log(error)
                for (const [field, message] of Object.entries(error)) {
                    form.setError(field as fields, {
                        type: "custom",
                        message: message
                    })
                }
            },
            onSuccess: () => {
                setOpen(false);
                router.reload();
                form.reset();
            },

            onFinish: () => {
                setSendingRequest(false);
            }
        })
    }

    return (
        <Dialog open={open} onOpenChange={(state) => {
            if (!state) {
                form.reset()
            }

            setOpen(state)
        }}>
            <DialogTrigger asChild>
                {openButton}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Criar chamado</DialogTitle>
                    <DialogDescription>Insira as informações para criar uma chamado</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nome do chamado" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Descrição</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Descrição do chamado" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter className="mt-2">
                            <DialogClose asChild>
                                <Button variant="outline">Cancelar</Button>
                            </DialogClose>
                            <Button
                                type="submit"
                                disabled={sendingRequest}
                            >
                                {sendingRequest && <Loader2Icon className="animate-spin" />}
                                Enviar
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
