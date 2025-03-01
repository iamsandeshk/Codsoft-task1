
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { PriorityLevel } from '@/types/task';
import { ListFilter, Calendar, ArrowUpDown } from 'lucide-react';

export type FilterOption = 'all' | 'active' | 'completed';
export type SortOption = 'newest' | 'oldest' | 'dueDate' | 'priority';

interface TaskFiltersProps {
  filter: FilterOption;
  setFilter: (filter: FilterOption) => void;
  sort: SortOption;
  setSort: (sort: SortOption) => void;
  priorityFilter: PriorityLevel | 'all';
  setPriorityFilter: (priority: PriorityLevel | 'all') => void;
  onClearCompleted: () => void;
  hasCompletedTasks: boolean;
}

export const TaskFilters: React.FC<TaskFiltersProps> = ({
  filter,
  setFilter,
  sort,
  setSort,
  priorityFilter,
  setPriorityFilter,
  onClearCompleted,
  hasCompletedTasks,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('all')}
          className="transition-all"
        >
          All
        </Button>
        <Button
          variant={filter === 'active' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('active')}
          className="transition-all"
        >
          Active
        </Button>
        <Button
          variant={filter === 'completed' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('completed')}
          className="transition-all"
        >
          Completed
        </Button>
        
        {hasCompletedTasks && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearCompleted}
            className="ml-auto transition-all"
          >
            Clear completed
          </Button>
        )}
      </div>
      
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center">
          <ListFilter className="mr-2 h-4 w-4 text-muted-foreground" />
          <Select
            value={priorityFilter}
            onValueChange={(value) => setPriorityFilter(value as PriorityLevel | 'all')}
          >
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center">
          <ArrowUpDown className="mr-2 h-4 w-4 text-muted-foreground" />
          <Select
            value={sort}
            onValueChange={(value) => setSort(value as SortOption)}
          >
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="dueDate">Due Date</SelectItem>
              <SelectItem value="priority">Priority</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
