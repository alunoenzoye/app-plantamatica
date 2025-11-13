<?php

namespace App\Enums;

enum PermissionsEnum: string
{
    case calls_manage = 'calls.manage';
    case calls_delete = 'calls.delete';

    case tasks_index = 'tasks.index';
    case tasks_edit = 'tasks.edit';
    case tasks_complete = 'tasks.complete';
}
