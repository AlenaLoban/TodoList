import Todos from "../features/todo/list/components/Todos";
import FilterTodo from "../features/todo/list/components/FilterTodo";
import style from "../core/scss/index.module.scss";
import CreateTodo from "../features/todo/list/components/CreateTodo";
import { useAppSelector } from "../core/store/hooks";
import { selectTodo } from "../features/todo/view/todoSlice";

const MainPage = () => {

  const todos = useAppSelector(selectTodo);
  
  return (
    <div className={style.main}>
      <h1>Список задач</h1>
      <CreateTodo />
      {todos.length ? <FilterTodo /> : ''}
      {todos.length ? <Todos /> : ''}
    </div>
  );
};
export default MainPage;
