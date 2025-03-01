
import { useState, useEffect } from 'react';
import { Task, TaskFormData, PriorityLevel } from '@/types/task';
import { toast } from '@/components/ui/use-toast';

const STORAGE_KEY = 'todo-tasks';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTasks = () => {
      try {
        const storedTasks = localStorage.getItem(STORAGE_KEY);
        if (storedTasks) {
          setTasks(JSON.parse(storedTasks));
        }
      } catch (error) {
        console.error('Failed to load tasks from localStorage:', error);
        toast({
          title: 'Error loading tasks',
          description: 'We couldn\'t load your saved tasks.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadTasks();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
      } catch (error) {
        console.error('Failed to save tasks to localStorage:', error);
        toast({
          title: 'Error saving tasks',
          description: 'We couldn\'t save your tasks.',
          variant: 'destructive',
        });
      }
    }
  }, [tasks, isLoading]);

  const addTask = (taskData: TaskFormData) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: taskData.title,
      description: taskData.description,
      completed: false,
      createdAt: new Date().toISOString(),
      dueDate: taskData.dueDate,
      priority: taskData.priority || 'medium',
    };

    setTasks((prevTasks) => [newTask, ...prevTasks]);
    toast({
      title: 'Task added',
      description: 'New task has been added successfully.',
    });

    return newTask;
  };

  const updateTask = (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, ...updates } : task
      )
    );
    toast({
      title: 'Task updated',
      description: 'Task has been updated successfully.',
    });
  };

  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    toast({
      title: 'Task deleted',
      description: 'Task has been deleted successfully.',
    });
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const clearCompletedTasks = () => {
    setTasks((prevTasks) => prevTasks.filter((task) => !task.completed));
    toast({
      title: 'Completed tasks cleared',
      description: 'All completed tasks have been removed.',
    });
  };

  return {
    tasks,
    isLoading,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    clearCompletedTasks,
  };
}
