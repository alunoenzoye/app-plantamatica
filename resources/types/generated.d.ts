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
export type TaskPriorityEnum = 'low' | 'medium' | 'high';
}
