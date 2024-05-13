"use client";

import React, { useState } from "react";
import TodoListItem from "./TodoListItem";
import { useAddTodoMutation, useGetTodosQuery } from "@/lib/todo/apiSlice";
import { useForm } from "react-hook-form";
export default function TodoList() {
  const { register, handleSubmit, reset } = useForm();

  const { data: todos = [], isLoading, isError } = useGetTodosQuery();
  const [addTodo, { isLoading: isAddingTodo }] = useAddTodoMutation();
  const onSubmit = async (data) => {
    try {
      await addTodo({ title: data.text });
      reset(); // Reset the form after successful submission
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching todos</div>;
  return (
    <div className="flex items-center flex-col">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex justify-between items-center mt-20"
      >
        <input
          {...register("text", { required: true })}
          type="text"
          placeholder="Add a new task..."
          className="w-full mr-2 py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 text-black"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Add
        </button>
      </form>
      <div className="flex items-center flex-col">
        {todos.map((todo) => (
          <TodoListItem key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  );
}
