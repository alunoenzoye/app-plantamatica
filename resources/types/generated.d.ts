declare namespace App.Data {
export type CallData = {
id: number;
creator_id: number;
name: string;
description?: string;
position?: App.Data.PositionData;
images: Array<App.Data.ImageData>;
};
export type ImageData = {
id: number;
name: string;
url: string;
};
export type PositionData = {
x: number;
y: number;
};
export type TaskData = {
id: number;
creator_id: number;
name: string;
priority: App.Enums.TaskPriorityEnum;
due_date?: string;
description?: string;
position?: App.Data.PositionData;
done: boolean;
images: Array<App.Data.ImageData>;
};
}
declare namespace App.Enums {
export enum PermissionsEnum { calls_manage = 'calls.manage', calls_approve = 'calls.approve', calls_delete = 'calls.delete', media_delete = 'media.delete', media_add = 'media.add', tasks_index = 'tasks.index', tasks_edit = 'tasks.edit', tasks_complete = 'tasks.complete' };
export enum RolesEnum { user = 'user', principal = 'principal', maintenance = 'maintenance', super_admin = 'super_admin' };
export enum TaskPriorityEnum { low = 'low', medium = 'medium', high = 'high' };
}
