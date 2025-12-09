import { Paperclip, PlusIcon, X } from "lucide-react";
import { Badge } from "./ui/badge";
import z from "zod";
import { ChangeEvent, useState } from "react";
import { ImagePreviewDialog } from "./image-preview-dialog";
import { router } from "@inertiajs/react";
import usePermission from "@/hooks/use-permission";

interface linkedImageList {
    images: App.Data.ImageData[],
    onAddImages: (images: FileList) => void,
}

export default function LinkedImageList({ images, onAddImages }: linkedImageList) {
    const [imagePreviewOpen, setImagePreviewOpen] = useState(false)
    const [selectedImage, setSelectedImage] = useState<App.Data.ImageData | undefined>(undefined)
    const { can } = usePermission()

    return (
        <>
            <ImagePreviewDialog
                image={selectedImage}
                open={imagePreviewOpen}
                setOpen={setImagePreviewOpen}
            />
            <div className="flex flex-wrap gap-2">
                {images.map((image) => (
                    <Badge
                        key={image.id}
                        variant="secondary"
                    >
                        <Paperclip />
                        <span
                            onClick={() => {
                                setSelectedImage(image)
                                setImagePreviewOpen(true)
                            }}
                            className="hover:cursor-pointer hover:underline"
                        >{image.name}</span>
                        {can("media.delete") && (
                            <div className="hover:cursor-pointer" onClick={() => {
                                router.post(route("media.delete"), {
                                    id: image.id,
                                }, {
                                    onSuccess: () => {
                                        const index = images.indexOf(image)
                                        if (index !== -1) {
                                            images.splice(index, 1)
                                        }
                                        router.reload()
                                    },
                                })
                            }}>
                                <X size={16} />
                            </div>
                        )}
                    </Badge>
                ))}
                {can("media.add") && (
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
                                        onAddImages(files)
                                    }
                                }}
                            />
                        </label>
                    </div>
                )}
            </div>
        </>
    )
}
