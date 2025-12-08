import { TransformComponent, TransformWrapper, useControls, useTransformComponent, useTransformContext } from "react-zoom-pan-pinch"
import TestMap from "../../assets/test-map.jpg"
import { Button } from "./ui/button"
import { Compass, ListFilter, LucideMap, LucideMapPin, LucideMegaphone, LucidePlus, LucideX, LucideZoomIn, LucideZoomOut } from "lucide-react"
import React, { RefObject, SetStateAction, useEffect, useRef, useState } from "react"
import MapCallCreateForm from "./map-call-create-form"
import getPriorityStyle from "@/utils/getPriorityStyle"
import { Select, SelectItem, SelectTrigger, SelectContent, SelectGroup, SelectLabel, SelectValue } from "./ui/select"

interface coordinates {
    x: number,
    y: number
}

interface locationPickerProps {
    mapRef: RefObject<HTMLDivElement | null>,
    wrapperRef: RefObject<HTMLDivElement | null>,
    onLocationPicked: (coordinates: coordinates) => void,
}

function LocationPicker({ mapRef, wrapperRef, onLocationPicked }: locationPickerProps) {
    const [hoveringMap, setHoveringMap] = useState(false)
    const locationPickerXRef = useRef<HTMLDivElement | null>(null)
    const locationPickerYRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const map = mapRef.current as HTMLDivElement
        const wrapper = wrapperRef.current as HTMLDivElement

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
            const x = (mouseEvent.clientX - rect.left) / rect.width
            const y = (mouseEvent.clientY - rect.top) / rect.height

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
    }, [onLocationPicked, mapRef, wrapperRef])

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

type creationState = "none" | "pickingLocation" | "pickedLocation"

interface callCreatorProps {
    mapRef: RefObject<HTMLDivElement | null>,
    wrapperRef: RefObject<HTMLDivElement | null>,
    creationState: creationState,
    setCreationState: React.Dispatch<React.SetStateAction<creationState>>,
}

function CallCreator({ mapRef, wrapperRef, creationState, setCreationState }: callCreatorProps) {
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

function MapNavigationControls() {
    const { zoomIn, zoomOut, resetTransform, centerView } = useControls()

    useEffect(() => {
        centerView(0)
    }, [])

    const transformedComponent = useTransformComponent(({ state }) => {

        return (
            <div className="absolute flex flex-col gap-2.5 right-4 bottom-4 z-10">
                <div className="border border-input rounded-md border-ring bg-background shadow-xs p-2">
                    <span className="text-sm text-center block w-full">{state.scale.toFixed(1)}x</span>
                </div>
                <Button variant={"outline"} size={"lg"} onClick={() => {
                    resetTransform()
                    centerView()
                }}>
                    <Compass />
                </Button>
                <Button variant={"outline"} size={"lg"} onClick={() => zoomIn()}>
                    <LucideZoomIn />
                </Button>
                <Button variant={"outline"} size={"lg"} onClick={() => zoomOut()}>
                    <LucideZoomOut />
                </Button>
            </div>
        )
    })

    return transformedComponent
}

interface markerProps {
    xPosition: number,
    yPosition: number,
    onClick?: () => void,
    children: React.ReactNode,
}

function Marker({ children, xPosition, yPosition, onClick }: markerProps) {
    return (
        <div
            onClick={onClick}
            style={{
                position: "absolute",
                top: `${yPosition * 100}%`,
                left: `${xPosition * 100}%`,
                transform: "translateX(-50%) translateY(-50%)"
            }}
        >
            {children}
        </div>
    )
}

interface callMarkerProps {
    data: App.Data.CallData,
    visible?: boolean,
    onClick?: () => void,
}

function CallMarker({ data, onClick, visible }: callMarkerProps) {
    if (data.position === undefined) {
        return
    }

    if (visible === false) {
        return
    }

    return (
        <Marker
            onClick={onClick}
            xPosition={data.position.x}
            yPosition={data.position.y}
        >
            <div className="hover:cursor-pointer flex flex-col justify-center items-center">
                <LucideMegaphone stroke="#000" fill="#fff" />
                <span className="text-sm text-black">{data.name}</span>
            </div>
        </Marker>
    )
}

interface taskMarkerProps {
    data: App.Data.TaskData,
    visible?: boolean,
    onClick?: () => void,
}

function TaskMarker({ data, onClick, visible }: taskMarkerProps) {
    if (data.position === undefined) {
        return
    }

    if (visible === false) {
        return
    }

    return (
        <Marker
            onClick={onClick}
            xPosition={data.position.x}
            yPosition={data.position.y}
        >
            <div className="hover:cursor-pointer flex flex-col justify-center items-center accent-red-600">
                <LucideMapPin
                    stroke="#000"
                    fill={getPriorityStyle(data.priority).color}
                />
                <span className="text-sm text-black">{data.name}</span>
            </div>
        </Marker>
    )
}

type mapFilter = "all" | "tasks" | "calls"

interface mapFilterProps {
    filter: mapFilter,
    setFilter: React.Dispatch<SetStateAction<mapFilter>>,
}

function MapFilter({ filter, setFilter }: mapFilterProps) {
    return (
        <div className="absolute top-4 left-4 z-10">
            <Select
                value={filter}
                onValueChange={(value) => setFilter(value as mapFilter)}
            >
                <SelectTrigger className="flex gap-2 p-2 w-36 bg-background">
                    <ListFilter />
                    <SelectValue placeholder="Tudo" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Filtros</SelectLabel>
                        <SelectItem value="all">Nenhum</SelectItem>
                        <SelectItem value="tasks">Tarefas</SelectItem>
                        <SelectItem value="calls">Chamados</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}

interface blueprintMapProps {
    calls: App.Data.CallData[],
    tasks: App.Data.TaskData[],
    onCallSelected: (call: App.Data.CallData) => void,
    onTaskSelected: (task: App.Data.TaskData) => void,
}

export default function BlueprintMap({ calls, tasks, onCallSelected, onTaskSelected }: blueprintMapProps) {
    const mapRef = useRef<HTMLDivElement | null>(null)
    const wrapperRef = useRef<HTMLDivElement | null>(null)
    const [creationState, setCreationState] = useState<creationState>("none")
    const [filter, setFilter] = useState<mapFilter>("all")

    return (
        <div className="relative w-full h-full" ref={wrapperRef}>
            <CallCreator
                creationState={creationState}
                setCreationState={setCreationState}
                mapRef={mapRef}
                wrapperRef={wrapperRef}
            />
            <TransformWrapper
                centerOnInit={true}
                minScale={0.5}
                limitToBounds={false}
            >
                <>
                    <MapFilter
                        filter={filter}
                        setFilter={setFilter}
                    />
                    <MapNavigationControls />
                    <TransformComponent
                        wrapperStyle={{
                            width: "100%",
                            height: "100%",
                        }}
                    >
                        <div className="border-black border-1 relative transform translate-0">
                            <>
                                {
                                    calls.map(call => (
                                        <CallMarker
                                            onClick={() => {
                                                onCallSelected(call)
                                            }}
                                            data={call}
                                            key={`call-${call.id}`}
                                            visible={creationState !== "pickingLocation"
                                                && (filter === "all" || filter === "calls")}
                                        />
                                    ))
                                }
                                {
                                    tasks.map(task => (
                                        <TaskMarker
                                            onClick={() => {
                                                onTaskSelected(task)
                                            }}
                                            data={task}
                                            key={`task-${task.id}`}
                                            visible={creationState !== "pickingLocation"
                                                && (filter === "all" || filter === "tasks")}
                                        />
                                    ))
                                }
                            </>
                            <div ref={mapRef}>
                                <img
                                    className="block w-full"
                                    src={TestMap}
                                />
                            </div>
                        </div>
                    </TransformComponent>
                </>
            </TransformWrapper>
        </div>
    )
}
