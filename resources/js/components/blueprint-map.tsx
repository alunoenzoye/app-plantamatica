import { ReactZoomPanPinchRef, TransformComponent, TransformWrapper, useControls, useTransformComponent } from "react-zoom-pan-pinch"
import TestMap from "../../assets/test-map.jpg"
import { Button } from "./ui/button"
import { LucidePlus, LucideZoomIn, LucideZoomOut } from "lucide-react"
import { RefObject, useEffect, useRef } from "react"

interface locationPickerProps {
    parentRef: RefObject<HTMLDivElement | null>
}

function LocationPicker({ parentRef }: locationPickerProps) {
    const parentRef = useRef(null)
    const locationPickerXRef = useRef<HTMLDivElement | null>(null)
    const locationPickerYRef = useRef<HTMLDivElement | null>(null)

    const transformedComponent = useTransformComponent(({ state, instance }) => {
        parentRef.current = instance.contentComponent
    })

    useEffect(() => {
        const parent = parentRef.current
        if (parent === null) {
            return
        }

        const listener = (event: MouseEvent) => {
            const currentLocationPickerX = locationPickerXRef.current
            const currentLocationPickerY = locationPickerYRef.current
            if (currentLocationPickerX !== null && currentLocationPickerY !== null) {
                const rect = parent.getBoundingClientRect()
                const x = event.clientX - rect.x
                const y = event.clientY - rect.y

                currentLocationPickerY.style.top = `${y}px`
                currentLocationPickerX.style.left = `${x}px`
            }
        }

        parent.addEventListener("mousemove", listener)

        return () => {
            parent.removeEventListener("mousemove", listener)
        }
    }, [parentRef])

    return (
        <>
            <div className="absolute h-full w-0.5 bg-black transform -translate-x-0.5 z-9" ref={locationPickerXRef}></div>
            <div className="absolute h-0.5 w-full bg-black z-9" ref={locationPickerYRef}></div>
        </>
    )
}

interface callCreatorProps {
    blueprintMapRef: RefObject<HTMLDivElement | null>
}

function CallCreator({ blueprintMapRef }: callCreatorProps) {
    return (
        <>
            <LocationPicker parentRef={blueprintMapRef} />
            <Button
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-600 hover:bg-blue-500 active:bg-blue-300 z-10"
                onClick={() => console.log("asdsad")}
            >
                <LucidePlus />
                Criar chamado
            </Button>
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
    const blueprintMapRef = useRef<HTMLDivElement | null>(null)
    const transformComponentRef = useRef<ReactZoomPanPinchRef | null>(null)

    return (
        <div className="relative w-full h-full" ref={blueprintMapRef}>
            <TransformWrapper
                centerOnInit={true}
                ref={transformComponentRef}
            >
                <>
                    <ZoomControls />
                    <CallCreator
                        blueprintMapRef={blueprintMapRef}
                    />
                    <TransformComponent
                        wrapperStyle={{
                            width: "100%",
                            height: "100%",
                        }}
                    >
                        <div className="w-full bg-pink-50">
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
