<?php

namespace App\Enums;

enum PermissionsEnum: string
{
    case calls_approve = 'calls.approve';

    case tasks_index = 'tasks.index';
    case tasks_edit = 'tasks.edit';
    case tasks_complete = 'tasks.complete';
}
