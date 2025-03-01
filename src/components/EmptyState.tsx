
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

interface EmptyStateProps {
  onCreateTask: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onCreateTask }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center glass-card rounded-lg animate-fade-in">
      <div className="mb-6">
        <svg 
          className="mx-auto h-20 w-20 text-muted-foreground/50"
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          aria-hidden="true"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={1} 
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      </div>
      <h3 className="text-lg font-medium mb-2">No tasks yet</h3>
      <p className="text-sm text-muted-foreground max-w-md mb-6">
        Get started by creating your first task. Stay organized and track your progress as you complete tasks.
      </p>
      <Button onClick={onCreateTask} className="button-hover-effect">
        <PlusCircle className="mr-2 h-4 w-4" />
        Create Your First Task
      </Button>
    </div>
  );
};
