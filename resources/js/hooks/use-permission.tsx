import { usePage } from "@inertiajs/react";
import { useMemo } from "react";

type permissions = `${App.Enums.PermissionsEnum}`
type roles = `${App.Enums.RolesEnum}`

interface auth {
    user: {
        roles: {
            id: number,
            name: roles,
        }[]
    },
    can: {
        [K in permissions]: boolean
    }
}

export default function usePermission() {
    const page = usePage();
    console.log(page.props.auth)

    const can = useMemo(function () {
        return function (permission: permissions) {
            const auth = page.props.auth as auth
            const is_super_admin = auth.user.roles.find(function (role) {
                return role.name === "super_admin";
            }) !== undefined

            if (is_super_admin) {
                return true;
            }

            const can = auth.can
            const permissionProperty = Object.hasOwn(can, permission)
            return permissionProperty ? auth.can[permission] : false;
        }
    }, [page])

    return { can }
}
