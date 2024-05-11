"use client";
import React, { useState } from "react";
import {
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from "@/lib/todo/apiSlice";

const TodoListItem = ({ todo }) => {
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

  const handleSaveEdit = async () => {
    try {
      await updateTodo({
        id: todo.id,
        title: editedText,
      });
      setIsEditing(false);
    } catch (error) {
      console.log("Error saving todo:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditedText(todo.title);
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-between border-b border-gray-300 py-2">
      {isEditing ? (
        <input
          type="text"
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          autoFocus
          className="text-black"
        />
      ) : (
        <span className="flex-grow">{todo.title}</span>
      )}
      {isEditing ? (
        <>
          <button
            className="ml-5 text-green-500 hover:text-green-600"
            onClick={handleSaveEdit}
            disabled={isUpdating}
          >
            Save
          </button>
          <button
            className="ml-2 text-gray-500 hover:text-gray-600"
            onClick={handleCancelEdit}
            disabled={isUpdating}
          >
            Cancel
          </button>
        </>
      ) : (
        <button
          className="ml-5 text-blue-500 hover:text-blue-600"
          onClick={handleEdit}
          disabled={isUpdating}
        >
          Edit
        </button>
      )}
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
