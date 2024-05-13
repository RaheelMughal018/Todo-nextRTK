"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from "@/lib/todo/apiSlice";

const TodoListItem = ({ todo }) => {
  const { register, handleSubmit } = useForm();
  const [updateTodo, { isLoading: isUpdating }] = useUpdateTodoMutation();
  const [deleteTodo, { isLoading: isDeleting }] = useDeleteTodoMutation();
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.title);

  const handleDelete = async () => {
    try {
      await deleteTodo(todo.id);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = async (data) => {
    try {
      await updateTodo({
        id: todo.id,
        title: data.editedText,
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving todo:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditedText(todo.title);
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-between border-b border-gray-300 py-2">
      <form onSubmit={handleSubmit(handleSaveEdit)}>
        {isEditing ? (
          <input
            type="text"
            defaultValue={todo.title}
            {...register("editedText", { required: true })}
            autoFocus
            className="text-black"
          />
        ) : (
          <span className="flex-grow">{todo.title}</span>
        )}
        {isEditing ? (
          <>
            <button
              type="submit"
              className="ml-5 text-green-500 hover:text-green-600"
              disabled={isUpdating}
            >
              Save
            </button>
            <button
              type="button"
              className="ml-2 text-gray-500 hover:text-gray-600"
              onClick={handleCancelEdit}
              disabled={isUpdating}
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            type="button"
            className="ml-5 text-blue-500 hover:text-blue-600"
            onClick={handleEdit}
            disabled={isUpdating}
          >
            Edit
          </button>
        )}
      </form>
      <span>/</span>
      <button
        className="ml-5 text-red-500 hover:text-red-600"
        onClick={handleDelete}
        disabled={isDeleting}
      >
        {isDeleting ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
};

export default TodoListItem;
