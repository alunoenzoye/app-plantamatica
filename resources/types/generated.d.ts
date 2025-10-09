declare namespace App.Data {
export type TaskData = {
id: number;
creator_id: number;
name: string;
priority: App.Enums.TaskPriorityEnum;
due_date?: string;
description?: string;
done: boolean;
};
}
declare namespace App.Enums {
export enum PermissionsEnum { calls_approve = 'calls.approve', tasks_index = 'tasks.index', tasks_edit = 'tasks.edit', tasks_complete = 'tasks.complete' };
export enum RolesEnum { user = 'user', principal = 'principal', maintenance = 'maintenance', super_admin = 'super_admin' };
export enum TaskPriorityEnum { low = 'low', medium = 'medium', high = 'high' };
}
