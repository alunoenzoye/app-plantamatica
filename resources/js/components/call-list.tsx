import { DataTable } from '@/components/data-table';
import { createColumnHelper } from '@tanstack/react-table';
import { useMemo } from 'react';
import AsyncUserInfo from './async-user-info';

interface callListProps {
    calls: App.Data.CallData[],
}

const columnHelper = createColumnHelper<App.Data.CallData>()

export default function CallList({ calls: calls }: callListProps) {
    const columns = useMemo(() => {
        const columns = [
            columnHelper.accessor("name", {
                header: "Nome"
            }),
            columnHelper.accessor("creator_id", {
                header: "Criador",
                cell: ({ row }) =>
                    <AsyncUserInfo userId={row.original.creator_id} />
            }),
        ]

        return columns
    }, []);

    return (
        <DataTable columns={columns} data={calls} />
    )
}
