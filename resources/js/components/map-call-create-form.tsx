import z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { CallRequest } from "@/schema";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { router } from "@inertiajs/react";
import { Loader2Icon, Paperclip, PlusIcon, X } from "lucide-react";
import { ChangeEvent, useState } from "react";

type fields = keyof z.infer<typeof CallRequest>

interface callCreateFormProps {
    open: boolean,
    setOpen: (state: boolean) => void,
    callCoordinates?: {
        x: number,
        y: number
    },
}

export default function MapCallCreateForm({ open, setOpen, callCoordinates }: callCreateFormProps) {
    const [sendingRequest, setSendingRequest] = useState(false);

    const form = useForm<z.infer<typeof CallRequest>>({
        resolver: zodResolver(CallRequest),
        defaultValues: {
            images: [],
            name: "",
            description: ""
        }
    })

    const { fields, append, remove } = useFieldArray({
        name: "images",
        control: form.control,
    })

    function onSubmit(values: z.infer<typeof CallRequest>) {
        if (sendingRequest == true) {
            return;
        }


        // prepare images array for the backend
        values.images = values.images.map((imageObject) => {
            return imageObject.value
        })

        values.position = callCoordinates

        setSendingRequest(true);

        router.post(route('calls.create'), values, {
            onError: (error) => {
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
                        <div>
                            <FormLabel>Anexos</FormLabel>
                            <div className="flex flex-wrap gap-2">
                                {fields.map((field, index) => (
                                    <Badge key={field.id} variant={"secondary"}>
                                        <Paperclip />
                                        {field.value.name}
                                        <button
                                            className="hover:cursor-pointer"
                                            onClick={() => {
                                                remove(index)
                                            }}
                                        >
                                            <X size={16} />
                                        </button>
                                    </Badge>
                                ))}
                                <div>
                                    <label htmlFor="images" className="flex items-center justify-center">
                                        <div className="h-5.5 w-5.5 bg-secondary flex items-center justify-center rounded-full">
                                            <PlusIcon size={16} className="hover:cursor-pointer" />
                                        </div>
                                        <input type="file"
                                            id="images"
                                            className="hidden"
                                            accept="image/png, image/jpeg, image/jpg"
                                            placeholder=""
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                const files = e.target.files
                                                if (files !== null) {
                                                    Array.from(files).forEach((file) => {
                                                        append({
                                                            value: file
                                                        })
                                                    })
                                                }
                                            }}
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
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
