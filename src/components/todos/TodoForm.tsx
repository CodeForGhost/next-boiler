import React, { useState, useEffect } from "react";
import { Todo, TodoInput } from "@/types/todo.types";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

interface TodoFormProps {
  todo?: Todo;
  onSubmit: (data: TodoInput) => Promise<void>;
  onCancel: () => void;
}

export const TodoForm: React.FC<TodoFormProps> = ({
  todo,
  onSubmit,
  onCancel,
}) => {
  const [data, setData] = useState<TodoInput>({
    title: "",
    description: "",
    completed: false,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (todo) {
      setData({
        title: todo.title,
        description: todo.description || "",
        completed: todo.completed,
      });
    }
  }, [todo]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setData({
      ...data,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onSubmit(data);
      if (!todo) {
        setData({ title: "", description: "", completed: false });
      }
    } catch (error) {
      // Error handled in parent
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Title"
        name="title"
        value={data.title}
        onChange={handleChange}
        required
      />
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          name="description"
          value={data.description}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter todo description..."
        />
      </div>
      {todo && (
        <div className="flex items-center">
          <input
            type="checkbox"
            name="completed"
            checked={data.completed}
            onChange={handleChange}
            className="mr-2 rounded"
          />
          <label className="text-sm text-gray-700">Mark as completed</label>
        </div>
      )}
      <div className="flex space-x-4">
        <Button type="submit" loading={loading}>
          {todo ? "Update Todo" : "Create Todo"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};
