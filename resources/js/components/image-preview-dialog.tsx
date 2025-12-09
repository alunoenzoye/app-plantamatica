import { Dispatch, SetStateAction } from "react"
import { PopoverDialog, PopoverDialogContent } from "./ui/popover-dialog"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { DialogDescription } from "@radix-ui/react-dialog"

interface imagePreviewProps {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>
    image?: App.Data.ImageData,
}

export function ImagePreviewDialog({ image, open, setOpen }: imagePreviewProps) {
    return (
        <Dialog open={open} onOpenChange={(state) => {
            setOpen(state)
        }}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Visualizando Imagem</DialogTitle>
                    <DialogDescription hidden={true}>Visualizando anexo</DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-2 items-center justify-center">
                    <img src={image?.url} alt={image?.name} />
                    <h1>{image?.name}</h1>
                </div>
            </DialogContent>
        </Dialog>
    )
}
