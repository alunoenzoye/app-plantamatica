<?php

namespace App\Providers;

use App\Enums\RolesEnum;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Gate;
use App\Models\User;
use Spatie\Permission\Models\Permission;
use Exception;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
        Gate::before(function ($user, $ability) {
            return $user->hasRole(RolesEnum::super_admin->value) ? true : null;
        });

        try {
            foreach (Permission::pluck('name') as $permission) {
                Gate::define($permission, function (User $user) use ($permission) {
                    return $user->roles()->whereHas('permissions', function ($query) use ($permission) {
                        $query->where('name', $permission);
                    })->count() > 0;
                });
            }
        } catch (Exception $e) {
            info('registerUserAccessToGates: Database not found or not yet migrated. Ignoring user permissions while booting app.');
        }
    }
}
