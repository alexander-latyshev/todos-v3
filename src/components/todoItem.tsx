import { ITodo } from "../models/todo";
import Checkbox from "./checkbox";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { AiTwotoneEdit, AiOutlineCheck } from "react-icons/ai";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import {
  endEditingTodo,
  removeTodo,
  startEditingTodo,
  toggleTodo,
} from "../redux/reducers/todosSlice";
import classNames from "classnames";

const TodoItem = (props: ITodo) => {
  const { content, isCompleted, id, isEditing } = props;
  const [isHover, setIsHover] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const inputEditRef = useRef<HTMLInputElement>(null);

  const toggleTodoHandler = (e: any) => {
    e.stopPropagation();
    dispatch(toggleTodo(id));
  };

  const iconStyle = {
    opacity: isHover ? 1 : 0.7,
    transition: "all 0.3s ease-in-out",
  };

  const todo = {
    id: id,
    content: content,
    isEditing: isEditing,
    isCompleted: isCompleted,
  };

  const editTodoHandler = (e: any) => {
    if (e.code === "Enter" && e.target.value) {
      dispatch(
        endEditingTodo({
          ...todo,
          content: e.target.value,
          isEditing: false,
        })
      );
    }
    if (e.code === "Enter" && !e.target.value) {
      dispatch(removeTodo(id));
    }
    if (e.code === "Escape") {
      dispatch(
        endEditingTodo({
          ...todo,
          isEditing: false,
        })
      );
    }
    if (!e.code && e.target.value) {
      dispatch(
        endEditingTodo({
          ...todo,
          content: e.target.value,
          isEditing: false,
        })
      );
    }
    if (!e.code && !e.target.value) dispatch(removeTodo(id));
  };

  useEffect(() => {
    if (inputEditRef.current) {
      inputEditRef.current.focus();
    }
  }, []);

  return (
    <div className="flex items-center justify-between bg-zinc-900 outline-1 outline-white group relative min-h-[44px] flex-wrap">
      {!isEditing ? (
        <Checkbox isChecked={isCompleted} toggle={toggleTodoHandler} />
      ) : null}

      <span
        className={classNames(
          "w-3/6 min-h-[44px] mx-auto z-1 flex items-center justify-center break-all mobile:text-sm laptop:text-base dekstop:text-big",
          {
            "line-through": isCompleted,
            hidden: isEditing,
          }
        )}
        onDoubleClick={() => dispatch(startEditingTodo(id))}
      >
        {content}
      </span>

      <input
        type="text"
        defaultValue={content}
        className={classNames(
          "w-full min-h-[44px] mx-auto bg-zinc-900 self-center text-center align-middle mobile:text-sm laptop:text-base dekstop:text-big",
          {
            block: isEditing,
            hidden: !isEditing,
          }
        )}
        onKeyDown={(e) => editTodoHandler(e)}
        onBlur={(e) => editTodoHandler(e)}
        ref={inputEditRef}
      />

      <button
        className={classNames(
          "transparent items-center justify-center dekstop:hidden laptop:flex absolute right-9",
          {
            hidden: isEditing,
          }
        )}
        onClick={() =>
          !isEditing
            ? dispatch(startEditingTodo(id))
            : dispatch(endEditingTodo(todo))
        }
      >
        {!isEditing ? (
          <AiTwotoneEdit style={{ ...iconStyle }} size={20} />
        ) : (
          <AiOutlineCheck style={{ ...iconStyle }} size={20} />
        )}
      </button>

      {!isEditing ? (
        <button
          className={classNames(
            "transparent items-center justify-center dekstop:hidden laptop:flex absolute right-1",
            {
              "group-hover:flex": !isEditing,
              hidden: isEditing,
            }
          )}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          onClick={() => dispatch(removeTodo(id))}
        >
          <IoIosCloseCircleOutline size={25} style={iconStyle} />
        </button>
      ) : null}
    </div>
  );
};

export default TodoItem;
