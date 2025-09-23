import z, { keyof } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TaskRequest } from "@/schema";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { cn } from "@/lib/utils";
import { router } from "@inertiajs/react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Loader2Icon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { ReactNode, useRef, useState } from "react";
import { ptBR } from "date-fns/locale";

type fields = keyof z.infer<typeof TaskRequest>

interface taskCreateFormProps {
    openButton: ReactNode
}

const YEARS_VARIATION = 5;

const currentDate = new Date()
const dateAgo = new Date(currentDate.getFullYear() - YEARS_VARIATION, 11)
const dateFuture = new Date(currentDate.getFullYear() + YEARS_VARIATION, 11)

export default function TaskCreateForm({ openButton }: taskCreateFormProps) {
    const [open, setOpen] = useState(false);
    const [sendingRequest, setSendingRequest] = useState(false);

    const form = useForm<z.infer<typeof TaskRequest>>({
        resolver: zodResolver(TaskRequest),
        defaultValues: {
            name: "",
            due_date: undefined,
            priority: "",
            description: ""
        }
    })

    function onSubmit(values: z.infer<typeof TaskRequest>) {
        if (sendingRequest == true) {
            return;
        }

        setSendingRequest(true);

        router.post(route('tasks.create'), values, {
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
                form.reset();
                router.reload();
            },

            onFinish: () => {
                setSendingRequest(false);
            }
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {openButton}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Criar tarefa</DialogTitle>
                    <DialogDescription>Insira as informações para criar uma tarefa</DialogDescription>
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
                                        <Input placeholder="Nome da tarefa" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex gap-4">
                            <FormField
                                control={form.control}
                                name="priority"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Prioridade</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Nenhuma" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>Proridade</SelectLabel>
                                                        <SelectItem value="low">Baixo</SelectItem>
                                                        <SelectItem value="medium">Médio</SelectItem>
                                                        <SelectItem value="high">Alto</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="due_date"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Prazo</FormLabel>
                                        <Popover modal={true}>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-[240px] pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(field.value, "PPP", {
                                                                locale: ptBR
                                                            })
                                                        ) : (
                                                            <span>Escolha o prazo</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    locale={ptBR}
                                                    startMonth={dateAgo}
                                                    endMonth={dateFuture}
                                                    captionLayout="dropdown"
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Descrição</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Descrição da tarefa" {...field} />
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
                                {sendingRequest && <Loader2Icon className="animate-spin"/>}
                                Enviar
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
