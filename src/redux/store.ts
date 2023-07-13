import { configureStore } from "@reduxjs/toolkit";
import todosSlice from "./reducers/todosSlice";

export const store = configureStore({
  reducer: {
    store: todosSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
