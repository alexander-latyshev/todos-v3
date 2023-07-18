import { ITodo } from "../models/todo";
import { useAppDispatch } from "../redux/hooks";
import { addNewTodo } from "../redux/reducers/todosSlice";
import Input from "./input";
import { useState } from "react";

const Header = () => {
  const [value, setValue] = useState<string>("");
  const dispatch = useAppDispatch();

  const addNewTodoHandler = (event: any) => {
    const todoProps: ITodo = {
      content: event.target.value,
      id: performance.now() * 1000,
      isCompleted: false,
      isEditing: false,
    };

    if (event.code !== "Enter" || event.target.value === "") {
      return;
    }
    
    dispatch(addNewTodo(todoProps));
    event.target.value = "";
  };

  return (
    <header className="w-full">
      <Input value={value} setValue={setValue} handler={addNewTodoHandler} />
    </header>
  );
};

export default Header;
