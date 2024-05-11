import TodoList from "@/components/TodoList";
import React from "react";
export default function HomePage() {
  return (
    <div className="w-full bg-black flex justify-center items-center mb-4">
      <TodoList />
    </div>
  );
}
