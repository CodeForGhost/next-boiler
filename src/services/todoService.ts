import { api } from "@/lib/api";
import { Todo, TodoInput, TodoUpdate } from "@/types/todo.types";

export const todoService = {
  async getAllTodos(): Promise<Todo[]> {
    const response = await api.get("/todos");
    return response.data;
  },

  async getTodoById(id: string): Promise<Todo> {
    const response = await api.get(`/todos/${id}`);
    return response.data;
  },

  async createTodo(data: TodoInput): Promise<Todo> {
    const response = await api.post("/todos", data);
    return response.data;
  },

  async updateTodo(id: string, data: TodoUpdate): Promise<Todo> {
    const response = await api.put(`/todos/${id}`, data);
    return response.data;
  },

  async deleteTodo(id: string): Promise<void> {
    await api.delete(`/todos/${id}`);
  },
};
