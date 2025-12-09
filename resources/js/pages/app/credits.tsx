import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Creditos',
        href: '/creditos',
    },
];

export default function Credits() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Painel" />
            <div className="flex h-full w-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto items-center">
                <div className="flex flex-col gap-2 mb-2">
                    <h1 className='text-center text-4xl font-bold'>Creditos</h1>
                    <p>Responsáveis pelo desenvolvimento do projeto</p>
                </div>
                <div className="flex gap-4 flex-wrap justify-center">
                    <div className="w-96 bg-card rounded-md p-2 border-ring border shadow-xs">
                        <h3 className="text-center font-semibold text-2xl mb-2">Fundador</h3>
                        <hr className="mb-2 mt-2" />
                        <h2 className="font-semibold text-xl">Enzo Yuji Eto</h2>
                        <ul className="list-disc list-inside">
                            <li>Fundação do Projeto</li>
                            <li>Desenvolvimento do Projeto</li>
                            <li>Prototipação do Projeto</li>
                        </ul>
                    </div>
                    <div className="w-96 bg-card rounded-md p-2 border-ring border shadow-xs">
                        <h3 className="text-center font-semibold text-2xl mb-2">Co-fundador</h3>
                        <hr className="mb-2 mt-2" />
                        <h2 className="font-semibold text-xl">Felipe Augusto Guimarães Gomes</h2>
                        <ul className="list-disc list-inside">
                            <li>Gerenciamento do Projeto</li>
                            <li>Icone do Projeto</li>
                            <li>Prototipação do Projeto</li>
                        </ul>
                    </div>
                    <div className="w-96 bg-card rounded-md p-2 border-ring border shadow-xs">
                        <h3 className="text-center font-semibold text-2xl mb-2">Docente</h3>
                        <hr className="mb-2 mt-2" />
                        <h2 className="font-semibold text-xl">Valter Santos</h2>
                        <ul className="list-disc list-inside">
                            <li>Orientação do Prjeto</li>
                            <li>Docente Back-End</li>
                            <li>Sugestões para o Projeto</li>
                        </ul>
                    </div>
                    <div className="w-96 bg-card rounded-md p-2 border-ring border shadow-xs">
                        <h3 className="text-center font-semibold text-2xl mb-2">Docente</h3>
                        <hr className="mb-2 mt-2" />
                        <h2 className="font-semibold text-xl">Ricardo Caironi</h2>
                        <ul className="list-disc list-inside">
                            <li>Orientação do Prjeto</li>
                            <li>Docente Front-End</li>
                            <li>Sugestões para o Projeto</li>
                        </ul>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
