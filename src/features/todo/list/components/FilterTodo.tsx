import React, { useState } from "react";
import { toogleFilter } from "../../view/todoSlice";
import { useAppDispatch } from "../../../../core/store/hooks";
import style from "../todos.module.scss";

const FilterTodo: React.FC = () => {

  const dispatch = useAppDispatch();
  const [activeIndex, setActiveIndex] = useState(0);
  const category = ["все", "выполненные", "невыполненные"];

  const handleGetCategory = (index: number): void => {
    setActiveIndex(index);
    setActiveIndex(index);
    dispatch(toogleFilter(index));
  };
  
  return (
    <div className={style.filter}>
      <ul>
        {category.map((item, index) => (
          <li
            key={index}
            onClick={() => handleGetCategory(index)}
            className={activeIndex === index ? style.active : ""}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default FilterTodo;
