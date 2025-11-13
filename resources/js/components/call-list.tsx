import { DataTable } from '@/components/data-table';
import { createColumnHelper } from '@tanstack/react-table';
import AsyncUserInfo from './async-user-info';
import { Button } from './ui/button';
import { LucideExternalLink, LucideGavel, LucideMapPinned } from 'lucide-react';
import { useMemo, useState } from 'react';
import CallInformationDialog from './call-information-dialog';
import { CallManageDialog } from './call-manage-dialog';
import usePermission from '@/hooks/use-permission';

interface callListProps {
    calls: App.Data.CallData[],
}

const columnHelper = createColumnHelper<App.Data.CallData>()

export default function CallList({ calls: calls }: callListProps) {
    const { can } = usePermission()
    const [selectedCall, setSelectedCall] = useState<App.Data.CallData | undefined>(undefined)
    const [callInformationDialogOpen, setCallInformationDialogOpen] = useState(false)
    const [callManageDialogOpen, setCallManageDialogOpen] = useState(false)

    const columns = useMemo(() => {
        return [
            columnHelper.accessor("name", {
                header: "Nome",
                cell: (({ row }) =>
                    <span className="block truncate">{row.original.name}</span>
                ),
            }),
            columnHelper.accessor("creator_id", {
                header: "Emissor",
                cell: ({ row }) =>
                    <AsyncUserInfo userId={row.original.creator_id} />
            }),
            columnHelper.accessor("description", {
                header: "Descrição",
                cell: (({ row }) =>
                    <span className="block truncate">{row.original.description}</span>
                )
            }),
            columnHelper.group({
                id: "actions",
                header: "",
                cell: (({ row }) =>
                    <div className="flex gap-2 justify-end">
                        <Button
                            onClick={() => {
                                setSelectedCall(row.original)
                                setCallInformationDialogOpen(true)
                            }}
                            variant="outline"
                            size="icon"
                        >
                            <LucideExternalLink />
                        </Button>
                        {can("calls.manage") && (
                            <Button
                                onClick={() => {
                                    setSelectedCall(row.original)
                                    setCallManageDialogOpen(true)
                                }}
                                variant="outline"
                                size="icon"
                            >
                                <LucideGavel />
                            </Button>
                        )}
                        <Button variant="outline" size="icon">
                            <LucideMapPinned />
                        </Button>
                    </div>
                )
            })
        ]
    }, [])

    return (
        <>
            <CallInformationDialog
                call={selectedCall}
                open={callInformationDialogOpen}
                setOpen={setCallInformationDialogOpen}
                onManageClicked={() => setCallManageDialogOpen(true)}
            />
            <CallManageDialog
                call={selectedCall}
                open={callManageDialogOpen}
                setOpen={(state) => {
                    if (!state) {
                        setCallInformationDialogOpen(false)
                    }

                    setCallManageDialogOpen(state)
                }}
            />
            <DataTable columns={columns} data={calls} className={"table-fixed"} />
        </>
    )
}
