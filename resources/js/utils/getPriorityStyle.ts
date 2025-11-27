const priorityStyles = {
    low: {
        text: "Baixo",
        className: "text-green-700",
        backgroundClassName:  "bg-green-700",
    },
    medium: {
        text: "Médio",
        className: "text-yellow-600",
        backgroundClassName:  "bg-yellow-600",
    },
    high: {
        text: "Alto",
        className: "text-red-600",
        backgroundClassName:  "bg-red-600",
    },
}

export default function getPriorityStyle(priority: App.Enums.TaskPriorityEnum) {
    return priorityStyles[priority]
}
