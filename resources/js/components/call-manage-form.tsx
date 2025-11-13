import { ApproveCallRequest } from "@/schema"
import { format, isBefore } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { CalendarIcon, Loader2Icon, Scroll } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { UseFormReturn } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";
import z from "zod"
import { PopoverDialog, PopoverDialogContent, PopoverDialogTrigger } from "./ui/popover-dialog";

export type callManageForm = z.infer<typeof ApproveCallRequest>

interface callManageFormProps {
    form: UseFormReturn<callManageForm>,
    onSubmit: (fields: callManageForm) => void,
}

const YEARS_VARIATION = 5;

const currentDate = new Date()
const yesterday = (new Date(currentDate)).setDate(currentDate.getDate() - 1)
const dateFuture = new Date(currentDate.getFullYear() + YEARS_VARIATION, 11)

const disablePastDates = (date: Date) => isBefore(date, yesterday)

export default function CallManageForm({ form, onSubmit }: callManageFormProps) {
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
                                <PopoverDialog>
                                    <PopoverDialogTrigger asChild>
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
                                    </PopoverDialogTrigger>
                                    <PopoverDialogContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            locale={ptBR}
                                            startMonth={currentDate}
                                            endMonth={dateFuture}
                                            captionLayout="dropdown"
                                            disabled={disablePastDates}
                                        />
                                    </PopoverDialogContent>
                                </PopoverDialog>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </form>
        </Form>
    )
}
