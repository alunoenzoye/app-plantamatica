import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Painel',
        href: '/painel',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Painel" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <h1 className='text-4xl'>Bem vindo!</h1>
                <div className="flex flex-col gap-2">
                    <p>Esse aplicativo web fornece ferramentas para o gerenciamento de tarefas relativas a manutenção da escola.</p>
                </div>
            </div>
        </AppLayout>
    );
}
