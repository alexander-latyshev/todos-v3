import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ITodo } from "../../models/todo";

interface IInitialState {
  todoList: Array<ITodo>;
}

const initialState: IInitialState = {
  todoList: [],
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addNewTodo: (state, { payload }: PayloadAction<ITodo>) => {
      state.todoList.push(payload);
    },
    removeTodo: (state, { payload }: PayloadAction<number>) => {
      const filteredTodos = state.todoList.filter((el) => el.id !== payload);
      return {
        ...state,
        todoList: filteredTodos,
      };
    },
    toggleTodo: (state, { payload }: PayloadAction<number>) => {
      const changedTodo = state.todoList.map((todo) => {
        if (todo.id !== payload) return todo;
        return {
          ...todo,
          isCompleted: !todo.isCompleted,
        };
      });

      return {
        ...state,
        todoList: changedTodo,
      };
    },
    startEditingTodo: (state, { payload }: PayloadAction<number>) => {
      const editedTodo = state.todoList.map((todo) => {
        if (todo.id !== payload) return todo;
        return {
          ...todo,
          isEditing: !todo.isEditing,
        };
      });

      return {
        ...state,
        todoList: editedTodo,
      };
    },
    endEditingTodo: (state, { payload }: PayloadAction<ITodo>) => {
      const submitTodo = state.todoList.map((todo) => {
        if (todo.id !== payload.id) return todo;
        return {
          ...todo,
          isEditing: false,
          content: payload.content,
        };
      });

      return {
        ...state,
        todoList: submitTodo,
      };
    },
  },
});

export const {
  addNewTodo,
  toggleTodo,
  removeTodo,
  startEditingTodo,
  endEditingTodo,
} = todosSlice.actions;

export default todosSlice.reducer;
