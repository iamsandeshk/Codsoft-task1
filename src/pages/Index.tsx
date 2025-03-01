
import React, { useState, useCallback, useMemo } from 'react';
import { Task, TaskFormData, PriorityLevel } from '@/types/task';
import { useTasks } from '@/hooks/use-tasks';
import { TaskForm } from '@/components/TaskForm';
import { TaskList } from '@/components/TaskList';
import { TaskFilters, FilterOption, SortOption } from '@/components/TaskFilters';
import { EmptyState } from '@/components/EmptyState';
import { Plus, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { parseISO } from 'date-fns';

const Index = () => {
  const { tasks, isLoading, addTask, updateTask, deleteTask, toggleTaskCompletion, clearCompletedTasks } = useTasks();
  const [filter, setFilter] = useState<FilterOption>('all');
  const [sort, setSort] = useState<SortOption>('newest');
  const [priorityFilter, setPriorityFilter] = useState<PriorityLevel | 'all'>('all');
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  const handleCreateTask = () => {
    setEditingTask(undefined);
    setShowForm(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingTask(undefined);
  };

  const handleSubmitTask = (taskData: TaskFormData) => {
    if (editingTask) {
      updateTask(editingTask.id, taskData);
    } else {
      addTask(taskData);
    }
    setShowForm(false);
    setEditingTask(undefined);
  };

  const handleDeleteTask = useCallback((id: string) => {
    setTaskToDelete(id);
  }, []);

  const confirmDeleteTask = useCallback(() => {
    if (taskToDelete) {
      deleteTask(taskToDelete);
      setTaskToDelete(null);
    }
  }, [taskToDelete, deleteTask]);

  const cancelDeleteTask = useCallback(() => {
    setTaskToDelete(null);
  }, []);

  // Filter and sort tasks
  const filteredAndSortedTasks = useMemo(() => {
    // Apply filter
    let filtered = [...tasks];
    if (filter === 'active') {
      filtered = filtered.filter(task => !task.completed);
    } else if (filter === 'completed') {
      filtered = filtered.filter(task => task.completed);
    }

    // Apply priority filter
    if (priorityFilter !== 'all') {
      filtered = filtered.filter(task => task.priority === priorityFilter);
    }

    // Apply sort
    return filtered.sort((a, b) => {
      if (sort === 'newest') {
        return parseISO(b.createdAt).getTime() - parseISO(a.createdAt).getTime();
      } else if (sort === 'oldest') {
        return parseISO(a.createdAt).getTime() - parseISO(b.createdAt).getTime();
      } else if (sort === 'dueDate') {
        // Handle tasks without due dates
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return parseISO(a.dueDate).getTime() - parseISO(b.dueDate).getTime();
      } else if (sort === 'priority') {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      return 0;
    });
  }, [tasks, filter, sort, priorityFilter]);

  const hasCompletedTasks = useMemo(() => {
    return tasks.some(task => task.completed);
  }, [tasks]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-center">
          <h2 className="text-xl font-medium text-gray-600">Loading your tasks...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-8">
          <div className="inline-block">
            <span className="text-xs font-medium text-primary/60 uppercase tracking-wider px-2 py-1 border border-primary/10 rounded-full">Tasks</span>
          </div>
          <h1 className="text-3xl font-bold mt-3 mb-2">Task Management</h1>
          <p className="text-gray-600">Stay organized and boost your productivity</p>
        </header>

        <div className="animate-scale-in">
          {showForm ? (
            <TaskForm 
              task={editingTask} 
              onSubmit={handleSubmitTask} 
              onCancel={handleCancelForm} 
            />
          ) : (
            <div className="flex justify-end mb-6">
              <Button onClick={handleCreateTask} className="button-hover-effect">
                <Plus className="mr-2 h-4 w-4" />
                Add New Task
              </Button>
            </div>
          )}

          {tasks.length > 0 ? (
            <>
              <div className="glass-card p-4 sm:p-6 rounded-lg mb-6">
                <TaskFilters
                  filter={filter}
                  setFilter={setFilter}
                  sort={sort}
                  setSort={setSort}
                  priorityFilter={priorityFilter}
                  setPriorityFilter={setPriorityFilter}
                  onClearCompleted={clearCompletedTasks}
                  hasCompletedTasks={hasCompletedTasks}
                />
              </div>

              <div className="glass-card p-4 sm:p-6 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">
                    {filter === 'all' && 'All Tasks'}
                    {filter === 'active' && 'Active Tasks'}
                    {filter === 'completed' && 'Completed Tasks'}
                  </h2>
                  <div className="text-sm text-muted-foreground">
                    {filteredAndSortedTasks.length} task{filteredAndSortedTasks.length !== 1 && 's'}
                  </div>
                </div>
                
                <TaskList 
                  tasks={filteredAndSortedTasks}
                  onToggleComplete={toggleTaskCompletion}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                />
                
                {filteredAndSortedTasks.length === 0 && (
                  <div className="bg-secondary/50 rounded-lg py-8 px-4 text-center">
                    <p className="text-muted-foreground">No tasks match your current filters</p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <EmptyState onCreateTask={handleCreateTask} />
          )}
        </div>

        {/* Achievement Summary */}
        {hasCompletedTasks && (
          <div className="mt-8 glass-card p-4 rounded-lg text-center animate-fade-in">
            <div className="flex items-center justify-center">
              <CheckCircle2 className="text-green-500 h-5 w-5 mr-2" />
              <span className="text-sm font-medium">
                You've completed {tasks.filter(t => t.completed).length} of {tasks.length} tasks
              </span>
            </div>
          </div>
        )}
      </div>

      <AlertDialog open={!!taskToDelete} onOpenChange={taskToDelete ? undefined : cancelDeleteTask}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Task</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this task? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelDeleteTask}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteTask}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Index;
