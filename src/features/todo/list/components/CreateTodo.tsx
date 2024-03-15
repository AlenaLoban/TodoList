import React, { useState } from "react";
import AddTodo from "./AddTodo";
import { FaPlus } from "react-icons/fa6";
import style from "../todos.module.scss";

const CreateTodo: React.FC = () => {
   
  const [openForm, setOpenForm] = useState(false);

  return (
    <div className={style.create}>
      <div className={style.create__box} onClick={() => setOpenForm(!openForm)}>
        <h2>Добавить задачу</h2>
        <FaPlus className={style.create__box__icon} />
      </div>
      {openForm && <AddTodo />}
    </div>
  );
};
export default CreateTodo;
