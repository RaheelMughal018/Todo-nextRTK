import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    data: [],
    isCompleted: false,
  },
  reducers: {
    addTodo: (state, action) => {
      state.data.push(action.payload);
    },
    getTodo: (state, action) => {
      state.data = action.payload;
      state.isCompleted = action.payload;
    },
    updateTodo: (state, action) => {
      const { id, title } = action.payload;
      const index = state.data.findIndex((todo) => todo.id === id);
      if (index !== -1) {
        state.data[index].title = title;
      }
    },
    deleteTodo: (state, action) => {
      const { id } = action.payload;
      state.data = state.data.filter((todo) => todo.id !== id);
    },
  },
});

export const { addTodo, deleteTodo, getTodo, updateTodo } = todoSlice.actions;

export default todoSlice.reducer;
