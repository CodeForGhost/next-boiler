import React from "react";
import { Todo } from "@/types/todo.types";
import { Button } from "@/components/ui/Button";
import { formatDate, truncateText } from "@/lib/utils";

interface TodoCardProps {
  todo: Todo;
  onToggle: (id: string, completed: boolean) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

export const TodoCard: React.FC<TodoCardProps> = ({
  todo,
  onToggle,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={(e) => onToggle(todo.id, e.target.checked)}
              className="mr-3 rounded"
            />
            <h3
              className={`font-medium ${
                todo.completed ? "line-through text-gray-500" : "text-gray-900"
              }`}
            >
              {todo.title}
            </h3>
          </div>
          {todo.description && (
            <p className="mt-2 text-gray-600 text-sm">
              {truncateText(todo.description, 100)}
            </p>
          )}
          <p className="mt-2 text-xs text-gray-400">
            Created: {formatDate(todo.createdAt)}
          </p>
        </div>
        <div className="flex space-x-2 ml-4">
          <Button size="sm" variant="outline" onClick={() => onEdit(todo)}>
            Edit
          </Button>
          <Button size="sm" variant="danger" onClick={() => onDelete(todo.id)}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};
