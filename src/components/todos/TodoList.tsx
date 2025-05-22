import React, { useState } from "react";
import { Todo } from "@/types/todo.types";
import { TodoCard } from "./TodoCard";
import { TodoForm } from "./TodoForm";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { useTodos } from "@/hooks/useTodos";

export const TodoList: React.FC = () => {
  const { todos, loading, createTodo, updateTodo, deleteTodo, toggleTodo } =
    useTodos();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | undefined>();

  const handleCreateTodo = async (data: any) => {
    await createTodo(data);
    setIsModalOpen(false);
  };

  const handleUpdateTodo = async (data: any) => {
    if (editingTodo) {
      await updateTodo(editingTodo.id, data);
      setEditingTodo(undefined);
      setIsModalOpen(false);
    }
  };

  const handleEditTodo = (todo: Todo) => {
    setEditingTodo(todo);
    setIsModalOpen(true);
  };

  const handleDeleteTodo = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this todo?")) {
      await deleteTodo(id);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTodo(undefined);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">My Todos</h2>
        <Button onClick={() => setIsModalOpen(true)}>Add New Todo</Button>
      </div>

      {todos.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No todos yet. Create your first one!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {todos.map((todo) => (
            <TodoCard
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onEdit={handleEditTodo}
              onDelete={handleDeleteTodo}
            />
          ))}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingTodo ? "Edit Todo" : "Create New Todo"}
      >
        <TodoForm
          todo={editingTodo}
          onSubmit={editingTodo ? handleUpdateTodo : handleCreateTodo}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  );
};
