<?php

namespace Database\Seeders;

use App\Enums\PermissionsEnum;
use App\Enums\RolesEnum;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run(): void
    {
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        foreach (PermissionsEnum::cases() as $permission) {
            Permission::create(['name' => $permission->value]);
        }

        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        $user_role = Role::create(['name' => RolesEnum::user->value]);

        $maintenance_role = Role::create(['name' => RolesEnum::maintenance->value]);
        $maintenance_role->givePermissionTo(PermissionsEnum::calls_approve);
        $maintenance_role->givePermissionTo(PermissionsEnum::calls_delete);
        $maintenance_role->givePermissionTo(PermissionsEnum::tasks_index);
        $maintenance_role->givePermissionTo(PermissionsEnum::tasks_edit);
        $maintenance_role->givePermissionTo(PermissionsEnum::tasks_complete);

        $principal_role = Role::create(['name' => RolesEnum::principal->value]);
        $principal_role->givePermissionTo(PermissionsEnum::calls_approve);
        $principal_role->givePermissionTo(PermissionsEnum::calls_delete);
        $principal_role->givePermissionTo(PermissionsEnum::tasks_index);
        $principal_role->givePermissionTo(PermissionsEnum::tasks_edit);
        $principal_role->givePermissionTo(PermissionsEnum::tasks_complete);

        $super_admin_role = Role::create(['name' => RolesEnum::super_admin->value]);
    }
}
