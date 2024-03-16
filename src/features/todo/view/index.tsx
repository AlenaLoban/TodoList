import React, { useState } from "react";
import style from "./index.module.scss";
import { FiEdit, FiDelete } from "react-icons/fi";
import { FaCheck } from "react-icons/fa6";
import { ITodo } from "../../../core/types/todoType";
import { removeTodo, toogleStatus } from "./todoSlice";
import { useAppDispatch } from "../../../core/store/hooks";
import cn from "classnames";
import AddTodo from "../list/components/AddTodo";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GoGrabber } from "react-icons/go";

const Todo: React.FC<ITodo> = (item) => {
  const { body, completed, id } = item;
  const dispatch = useAppDispatch();
  const [edit, setEdit] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: id,
    });

  return (
    <div
      className={cn(style.todo, completed ? style.todo__completed : "")}
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
    >
      <div
        className={style.todo__checkbox}
        onClick={() => dispatch(toogleStatus(id))}
      >
        {completed && <FaCheck className={style.todo__checkbox_active} />}
      </div>
      <div className={style.todo__body}>
        {edit ? <AddTodo item={item} setEdit={setEdit} edit={edit} /> : body}
      </div>
      <div ref={setNodeRef} {...attributes} {...listeners}>
        <GoGrabber className={style.todo__grab} size={40} />
      </div>

      <div className={style.todo__settings}>
        <FiEdit
          className={style.todo__settings__edit}
          onClick={() => setEdit(!edit)}
        />
        <FiDelete
          className={style.todo__settings__delete}
          onClick={() => dispatch(removeTodo(id))}
        />
      </div>
    </div>
  );
};
export default Todo;
