import { TransformComponent, TransformWrapper, useControls } from "react-zoom-pan-pinch"
import TestMap from "../../assets/test-map.jpg"
import { Button } from "./ui/button"
import { LucidePlus, LucideX, LucideZoomIn, LucideZoomOut } from "lucide-react"
import { RefObject, useEffect, useRef, useState } from "react"
import CallCreateForm from "./call-create-form"
import MapCallCreateForm from "./map-call-create-form"

interface coordinates {
    x: number,
    y: number
}

interface locationPickerProps {
    mapRef: RefObject<HTMLDivElement | null>,
    wrapperRef: RefObject<HTMLDivElement | null>,
    onLocationPicked: (coordinates: coordinates) => void,
}

function LocationPicker({ mapRef, wrapperRef, onLocationPicked, onCancelled }: locationPickerProps) {
    const [hoveringMap, setHoveringMap] = useState(false)
    const locationPickerXRef = useRef<HTMLDivElement | null>(null)
    const locationPickerYRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const map = mapRef.current
        const wrapper = wrapperRef.current
        if (map === null || wrapper === null) {
            return
        }

        const enterListener = () => {
            setHoveringMap(true)
        }
        const leaveListener = () => {
            setHoveringMap(false)
        }
        const moveListener = (event: MouseEvent) => {
            const currentLocationPickerX = locationPickerXRef.current
            const currentLocationPickerY = locationPickerYRef.current
            if (currentLocationPickerX !== null && currentLocationPickerY !== null) {
                const rect = wrapper.getBoundingClientRect()
                const x = event.clientX - rect.x
                const y = event.clientY - rect.y

                currentLocationPickerY.style.top = `${y}px`
                currentLocationPickerX.style.left = `${x}px`
            }
        }
        const mapClickListener = (mouseEvent: MouseEvent) => {
            mouseEvent.preventDefault()
            mouseEvent.stopPropagation()

            const rect = map.getBoundingClientRect()
            const x = mouseEvent.clientX - rect.left
            const y = mouseEvent.clientY - rect.top

            onLocationPicked({
                x: x,
                y: y,
            })
        }

        map.addEventListener("mousemove", moveListener)
        map.addEventListener("mouseenter", enterListener)
        map.addEventListener("mouseleave", leaveListener)
        map.addEventListener("click", mapClickListener)

        return () => {
            map.removeEventListener("mousemove", moveListener)
            map.removeEventListener("mouseenter", enterListener)
            map.removeEventListener("mouseleave", enterListener)
            map.removeEventListener("click", mapClickListener)
        }
    }, [mapRef, wrapperRef, onCancelled, onLocationPicked])

    return (
        (hoveringMap && (
            <>
                <div className="pointer-events-none absolute h-full w-[2px] bg-blue-500 transform -translate-x-0.5 z-9" ref={locationPickerXRef}></div>
                <div className="pointer-events-none absolute h-[2px] w-full bg-blue-500 z-9" ref={locationPickerYRef}></div>
            </>
        ))
    )
}

interface callCreatorButtonProps {
    state: "create" | "cancel",
    onClick: (action: "create" | "cancel") => void,
}

function CallCreatorButton({ state, onClick }: callCreatorButtonProps) {
    return (
        <Button
            className={(state === "create")
                ? "absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-600 hover:bg-blue-500 active:bg-blue-300 z-10"
                : "absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10"
            }
            variant={(state !== "create") ? "destructive" : "default"}
            onClick={() => {
                onClick(state)
            }}
        >
            {(state === "create") ? (
                <>
                    <LucidePlus />
                    Criar chamado
                </>
            ) : (
                <>
                    <LucideX />
                    Cancelar
                </>
            )}
        </Button >
    )
}

interface callCreatorProps {
    mapRef: RefObject<HTMLDivElement | null>,
    wrapperRef: RefObject<HTMLDivElement | null>,
}

function CallCreator({ mapRef, wrapperRef }: callCreatorProps) {
    const [creationState, setCreationState] = useState<"none" | "pickingLocation" | "pickedLocation">("none")
    const [callCoordinates, setCallCoordinates] = useState<coordinates | undefined>(undefined)

    return (
        <>
            {(creationState === "pickingLocation") && (
                <LocationPicker
                    mapRef={mapRef}
                    wrapperRef={wrapperRef}
                    onLocationPicked={(coordinates) => {
                        setCallCoordinates(coordinates)
                        setCreationState("pickedLocation")
                    }}
                />
            )}
            <MapCallCreateForm
                open={creationState === "pickedLocation"}
                setOpen={(state) => {
                    if (!state) {
                        setCallCoordinates(undefined)
                        setCreationState("none")
                    }
                }}
                callCoordinates={callCoordinates}
            />
            <CallCreatorButton
                state={(creationState === "none") ? "create" : "cancel"}
                onClick={(action) => {
                    if (action === "create") {
                        setCreationState("pickingLocation")
                    } else {
                        setCreationState("none")
                    }
                }}
            />
        </>
    )
}

function ZoomControls() {
    const { zoomIn, zoomOut } = useControls()

    return (
        <div className="absolute flex flex-col gap-2.5 right-4 bottom-4 z-10">
            <Button variant={"outline"} size={"lg"} onClick={() => zoomIn()}>
                <LucideZoomIn />
            </Button>
            <Button variant={"outline"} size={"lg"} onClick={() => zoomOut()}>
                <LucideZoomOut />
            </Button>
        </div>

    )
}

export default function BlueprintMap() {
    const mapRef = useRef<HTMLDivElement | null>(null)
    const wrapperRef = useRef<HTMLDivElement | null>(null)

    return (
        <div className="relative w-full h-full" ref={wrapperRef}>
            <CallCreator
                mapRef={mapRef}
                wrapperRef={wrapperRef}
            />
            <TransformWrapper
                centerOnInit={true}
            >
                <>
                    <ZoomControls />
                    <TransformComponent
                        wrapperStyle={{
                            width: "100%",
                            height: "100%",
                        }}
                    >
                        <div ref={mapRef}>
                            <img
                                className="block w-full"
                                src={TestMap}
                            />
                        </div>
                    </TransformComponent>
                </>
            </TransformWrapper>
        </div>
    )
}
