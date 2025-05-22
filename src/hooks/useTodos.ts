import { useState, useEffect } from "react";
import { Todo, TodoInput, TodoUpdate } from "@/types/todo.types";
import { todoService } from "@/services/todoService";
import toast from "react-hot-toast";

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const data = await todoService.getAllTodos();
      setTodos(data);
    } catch (error: any) {
      toast.error("Failed to fetch todos");
    } finally {
      setLoading(false);
    }
  };

  const createTodo = async (data: TodoInput) => {
    try {
      const newTodo = await todoService.createTodo(data);
      setTodos((prev) => [newTodo, ...prev]);
      toast.success("Todo created successfully");
      return newTodo;
    } catch (error: any) {
      toast.error("Failed to create todo");
      throw error;
    }
  };

  const updateTodo = async (id: string, data: TodoUpdate) => {
    try {
      const updatedTodo = await todoService.updateTodo(id, data);
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
      toast.success("Todo updated successfully");
      return updatedTodo;
    } catch (error: any) {
      toast.error("Failed to update todo");
      throw error;
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await todoService.deleteTodo(id);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
      toast.success("Todo deleted successfully");
    } catch (error: any) {
      toast.error("Failed to delete todo");
      throw error;
    }
  };

  const toggleTodo = async (id: string, completed: boolean) => {
    await updateTodo(id, { completed });
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return {
    todos,
    loading,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    refetch: fetchTodos,
  };
};
