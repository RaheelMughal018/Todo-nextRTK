const { configureStore } = require("@reduxjs/toolkit");

import todoApi from "./todo/apiSlice";
export const store = configureStore({
  reducer: {
    [todoApi.reducerPath]: todoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todoApi.middleware),
});
