
import React, { useState } from 'react';
import { Task } from '@/types/task';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { formatRelativeDate, isOverdue, isDueSoon } from '@/lib/date-utils';
import { Check, Calendar, Pencil, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion } from 'framer-motion';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggleComplete,
  onEdit,
  onDelete,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile();
  const showControls = isMobile || isHovered;

  const handleToggleComplete = () => {
    onToggleComplete(task.id);
  };

  const handleEdit = () => {
    onEdit(task);
  };

  const handleDelete = () => {
    onDelete(task.id);
  };
  
  const priorityClasses = {
    low: 'bg-priority-low text-indigo-700',
    medium: 'bg-priority-medium text-amber-700',
    high: 'bg-priority-high text-rose-700',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.2 }}
    >
      <Card 
        className={cn(
          "mb-3 glass-card task-item p-4 transition-all duration-300 hover:shadow-md",
          task.completed && "completed opacity-80"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-start gap-3">
          <div className="pt-1">
            <Checkbox 
              checked={task.completed}
              onCheckedChange={handleToggleComplete}
              className="task-checkbox"
            >
              <Check className="check-icon" />
            </Checkbox>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h3 className={cn(
                "text-base font-medium line-clamp-1 task-title transition-colors duration-300",
                task.completed && "text-gray-400 line-through"
              )}>
                {task.title}
              </h3>
              
              <span className={cn(
                "priority-badge text-xs",
                priorityClasses[task.priority]
              )}>
                {task.priority}
              </span>
            </div>
            
            {task.description && (
              <p className={cn(
                "text-sm text-gray-600 line-clamp-2 mb-2 transition-colors duration-300",
                task.completed && "text-gray-400"
              )}>
                {task.description}
              </p>
            )}
            
            {task.dueDate && (
              <div className="flex items-center text-xs text-gray-500 mt-1">
                <Calendar className="h-3 w-3 mr-1" />
                <span className={cn(
                  isOverdue(task.dueDate) && !task.completed ? "text-rose-600 font-medium" : "",
                  isDueSoon(task.dueDate) && !task.completed ? "text-amber-600 font-medium" : ""
                )}>
                  {formatRelativeDate(task.dueDate)}
                </span>
              </div>
            )}
          </div>
          
          <div className={cn(
            "flex items-center gap-1 transition-opacity duration-200 ease-in-out", 
            showControls ? "opacity-100" : "opacity-0"
          )}>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 button-hover-effect"
              onClick={handleEdit}
            >
              <Pencil className="h-4 w-4 text-gray-500" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive button-hover-effect"
              onClick={handleDelete}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
