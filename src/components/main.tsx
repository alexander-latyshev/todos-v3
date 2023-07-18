import { ITodo } from "../models/todo";
import { useAppSelector } from "../redux/hooks";
import TodoItem from "./todoItem";

const Main = () => {
  const { todoList } = useAppSelector((state) => state.store);

  return (
    <main className="w-full flex flex-col gap-1">
      {!todoList.length ? (
        <h2 className="mb-[50px] text-secondary flex justify-center">
          No business today? :(
        </h2>
      ) : (
        todoList.map((el: ITodo, idx: number) => {
          return (
            <TodoItem
              content={el.content}
              key={idx}
              isCompleted={el.isCompleted}
              isEditing={el.isEditing}
              id={el.id}
            />
          );
        })
      )}
    </main>
  );
};

export default Main;
