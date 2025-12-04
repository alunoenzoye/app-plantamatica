const priorityStyles = {
    low: {
        text: "Baixo",
        className: "text-green-700",
        backgroundClassName:  "bg-green-700",
        color: "oklch(52.7% 0.154 150.069)"
    },
    medium: {
        text: "Médio",
        className: "text-yellow-600",
        backgroundClassName:  "bg-yellow-600",
        color: "oklch(68.1% 0.162 75.834)"
    },
    high: {
        text: "Alto",
        className: "text-red-600",
        backgroundClassName:  "bg-red-600",
        color: "oklch(57.7% 0.245 27.325)"
    },
}

export default function getPriorityStyle(priority: App.Enums.TaskPriorityEnum) {
    return priorityStyles[priority]
}
