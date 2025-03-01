
export type PriorityLevel = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  dueDate?: string;
  priority: PriorityLevel;
}

export type TaskFormData = Omit<Task, 'id' | 'createdAt' | 'completed'>;
