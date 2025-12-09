import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { LucideMap, LucideMegaphone, LucidePencil } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Ajuda',
        href: '/ajuda',
    },
];

export default function Help() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Painel" />
            <div className="flex h-full w-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto items-center">
                <div className="text-center flex flex-col gap-2 mb-2">
                    <h1 className='text-4xl font-bold'>Página de Ajuda</h1>
                    <p>Informações sobre o projeto</p>
                </div>
                <div className="flex flex-col gap-4 flex-wrap justify-center">
                    <div className="w-full bg-card rounded-md p-2 border-ring border shadow-xs">
                        <div className="flex gap-2 items-center mb-2">
                            <LucideMegaphone />
                            <h3 className="flex font-semibold text-2xl">
                                Chamados
                            </h3>
                        </div>
                        <p className="text-body mb-2">Os chamados são levantamentos de problemas de infraestrutura realizados pelos usuários que serão avaliados pela equipe do SESI</p>
                        <hr className="mb-2 mt-2" />
                        <ul className="list-disc list-inside">
                            <li>Crie chamados (sem localização)</li>
                            <li>Visualize os chamados criados</li>
                            <li>Gerencie chamados para a aprovação</li>
                            <li>Chamados aprovados viram <strong>tarefas</strong></li>
                            <li>Anexe imagens</li>
                        </ul>
                    </div>
                    <div className="flex gap-4 flex-wrap justify-center">
                        <div className="w-full bg-card rounded-md p-2 border-ring border shadow-xs">
                            <div className="flex gap-2 items-center mb-2">
                                <LucidePencil />
                                <h3 className="flex font-semibold text-2xl">
                                    Tarefas
                                </h3>
                            </div>
                            <p className="text-body mb-2">As tarefas representam a lista de atividades de manutenção pendentes a serem resolvidas</p>
                            <hr className="mb-2 mt-2" />
                            <ul className="list-disc list-inside">
                                <li>Chamados aprovados viram tarefas</li>
                                <li>Organizados por <strong>prioridade</strong> e <strong>prazo</strong></li>
                                <li>Podem ser marcadas como completas</li>
                                <li>Anexe imagens</li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex gap-4 flex-wrap justify-center">
                        <div className="w-full bg-card rounded-md p-2 border-ring border shadow-xs">
                            <div className="flex gap-2 items-center mb-2">
                                <LucideMap />
                                <h3 className="flex font-semibold text-2xl">
                                    Planta
                                </h3>
                            </div>
                            <p className="text-body mb-2">A planta é uma visualização plana da infraestrutura escolar, permitindo a localização de chamados e tarefas</p>
                            <hr className="mb-2 mt-2" />
                            <ul className="list-disc list-inside">
                                <li>Visualize chamados e tarefas com localização atrelada de forma visual</li>
                                <li>Navegue e atribua uma localização para um chamado</li>
                                <li>Crie chamados com <strong>localização</strong> atribuída.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
