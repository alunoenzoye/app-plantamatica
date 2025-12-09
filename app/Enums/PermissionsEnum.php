<?php

namespace App\Enums;

enum PermissionsEnum: string
{
    case calls_manage = 'calls.manage';
    case calls_approve = 'calls.approve';
    case calls_delete = 'calls.delete';

    case media_delete = 'media.delete';
    case media_add = 'media.add';

    case tasks_index = 'tasks.index';
    case tasks_edit = 'tasks.edit';
    case tasks_complete = 'tasks.complete';
}
