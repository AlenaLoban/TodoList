import { ITodo } from "./../../../core/types/todoType";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../../core/store";

interface IProps {
  id?: number,
  newTodo: string,
}

interface TodoState {
  todos: ITodo[],
  filter: number,
}

const initialState: TodoState = {
  todos: [
   {
      id: Date.now(),
      body: 'Найти работу',
      completed: false
   },
  ],
  filter: 0,
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<IProps>) => {
      if (action.payload.id) {
        state.todos.map((todo) => {
          if (todo.id === action.payload.id) todo.body = action.payload.newTodo;
        });
      } else {
        const newTodo: ITodo = {
          id: Date.now(),
          body: action.payload.newTodo,
          completed: false,
        };
        state.todos.push(newTodo);
      }
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    toogleStatus: (state, action: PayloadAction<number>) => {
      state.todos.map((todo) => {
        if (todo.id === action.payload) todo.completed = !todo.completed;
      });
    },
    toogleFilter: (state, action: PayloadAction<number>) => {
      state.filter = action.payload;
    },
  },
});

export const { addTodo, removeTodo, toogleStatus, toogleFilter } = todoSlice.actions;
export const selectTodo = (state: RootState) => state.todo.todos;
export const selectFilter = (state: RootState) => state.todo.filter;

export default todoSlice.reducer;
