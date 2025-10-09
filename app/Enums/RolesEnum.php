<?php

namespace App\Enums;

use Spatie\TypeScriptTransformer\Attributes\TypeScript as TypeScript;

#[TypeScript]
enum RolesEnum: string
{
    case user = "user";
    case principal = "principal";
    case maintenance = "maintenance";
    case super_admin = "super_admin";

    public function label(): string
    {
        return match ($this) {
            self::user => "Usuário",
            self::maintenance => "Manutenção",
            self::principal => "Diretor",
            self::super_admin => "Super Admin",
        };
    }
}
