import React, { useMemo } from "react";
import { selectTodo, selectFilter } from "../../view/todoSlice";
import { useAppSelector } from "../../../../core/store/hooks";
import Todo from "../../view";
import style from "../todos.module.scss";

const Todos: React.FC = () => {

  let todos = useAppSelector(selectTodo);
  const filter = useAppSelector(selectFilter);

  const filteredTodos = useMemo(() => {
    if (filter === 1) {
      return todos.filter((todo) => todo.completed === true);
    }
    if (filter === 2) {
      return todos.filter((todo) => todo.completed === false);
    } else return todos;
  }, [filter, todos]);

  return (
    <div className={style.todos}>
      {filteredTodos.length > 0 &&
        filteredTodos.map((item) => <Todo key={item.id} {...item} />)}
    </div>
  );
};
export default Todos;
