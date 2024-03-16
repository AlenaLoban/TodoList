import React, { useMemo } from "react";
import { selectTodo, selectFilter, reorderTodos } from "../../view/todoSlice";
import { useAppDispatch, useAppSelector } from "../../../../core/store/hooks";
import Todo from "../../view";
import style from "../todos.module.scss";
import {
  DndContext,
  DragEndEvent,
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
  closestCenter,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const Todos: React.FC = () => {
  let todos = useAppSelector(selectTodo) || [];
  const filter = useAppSelector(selectFilter);
  const dispatch = useAppDispatch();

  const handleReorderTodos = (e: DragEndEvent) => {
    const { active, over } = e;
    if (active.id === over?.id) {
      return;
    }
    const oldIndex = todos.findIndex((todo) => todo.id === active.id);
    const newIndex = todos.findIndex((todo) => todo.id === over?.id);

    let newArr = arrayMove(todos, oldIndex, newIndex);
    dispatch(reorderTodos(newArr));
  };
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const filteredTodos = useMemo(() => {
    if (filter === 1) {
      return todos.filter((todo) => todo.completed === true);
    }
    if (filter === 2) {
      return todos.filter((todo) => todo.completed === false);
    } else return todos;
  }, [filter, todos]);

  return (
    <DndContext
      onDragEnd={handleReorderTodos}
      sensors={sensors}
      collisionDetection={closestCenter}
    >
      <div className={style.todos}>
        <SortableContext
          items={filteredTodos}
          strategy={verticalListSortingStrategy}
        >
          {filteredTodos.length > 0 &&
            filteredTodos.map((item) => <Todo key={item.id} {...item} />)}
        </SortableContext>
      </div>
    </DndContext>
  );
};
export default Todos;

