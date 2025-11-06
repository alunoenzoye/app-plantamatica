import api from "@/services/api"
import { User } from "@/types"
import { useEffect, useState } from "react"
import { Loader2Icon } from "lucide-react"

interface asyncUserInfoProps {
    userId: number
}

export default function AsyncUserInfo({ userId }: asyncUserInfoProps) {
    const [user, setUser] = useState<User | undefined>()

    useEffect(() => {
        async function fetchUser() {
            api.get<User>(`/user/${userId}`)
                .then(response => {
                    setUser(response.data)
                }).catch(() => {
                    setUser(undefined)
                })
        }

        fetchUser()
    }, [userId])

    return (
        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm w-full">
            {
                (user !== undefined) ? (
                    user.name
                ): (
                    <Loader2Icon className="animate-spin"/>
                )
            }
        </div>
    )
}

