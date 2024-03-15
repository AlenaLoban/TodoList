import React, { useState } from "react";
import { useAppDispatch } from "../../../../core/store/hooks";
import { addTodo } from "../../view/todoSlice";
import { ITodo } from "../../../../core/types/todoType";
import { TiDeleteOutline } from "react-icons/ti";
import style from "../todos.module.scss";

interface IProps {
  item?: ITodo,
  setEdit?: React.Dispatch<React.SetStateAction<boolean>>,
  edit?: boolean,
}

const AddTodo: React.FC<IProps> = ({ item, edit, setEdit }) => {
   
  const id = item?.id;
  const [newTodo, setNewTodo] = useState(item ? item.body : "");
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(addTodo({ newTodo, id }));
    setNewTodo("");
    id && setEdit && setEdit(!edit);
  };

  return (
    <div className={style.newTodo}>
      <div className={style.newTodo__inputBox}>
        <input
          value={newTodo}
          type="text"
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <TiDeleteOutline
          className={style.newTodo__inputBox__icon}
          onClick={() => setNewTodo("")}
        />
      </div>
      <button onClick={() => handleClick()} disabled={!newTodo}>
        {" "}
        <span> {id ? "изменить" : "добавить"}</span>
      </button>
    </div>
  );
};
export default AddTodo;
