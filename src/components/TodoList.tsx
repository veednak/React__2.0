import React, { useState } from "react";
import { TodoItem } from "../components/TodoItem";
import { ItoDo } from "../types/data";

interface ITodoListProps {
  selectedGroup: string;
  search: string;
  setItems: React.Dispatch<React.SetStateAction<ItoDo[]>>;
  items: ItoDo[];
  inputText: (id: number, title: string) => void;
  removeTodo(id: number): void;
}

const TodoList: React.FC<ITodoListProps> = ({
  selectedGroup,
  search,
  setItems,
  items,
  inputText,
  removeTodo,
}) => {
  let [currentTodo, setCurrentTodo] = useState<ItoDo>();

  function dragStartHandler(e: any, todo: ItoDo) {
    setCurrentTodo(todo);
  }

  function dragEndHandler(e: any) {}

  function dragOverHandler(e: any) {
    e.preventDefault();
  }

  function dropHandler(e: any, todo: ItoDo) {
    e.preventDefault();
    setItems(
      items.map((dropTodo) => {
        if (dropTodo.id === todo.id) {
          return { ...dropTodo, id: currentTodo!.id };
        }
        if (dropTodo.id === currentTodo!.id) {
          return { ...dropTodo, id: todo.id };
        }
        return dropTodo;
      })
    );
  }

  const todoSort = (a: ItoDo, b: ItoDo) => {
    if (a.id > b.id) return 1;
    else return -1;
  };
  const todoFilter = (todo: ItoDo) => {
    if (selectedGroup === "All") {
      return true;
    }
    if (selectedGroup === "Todo") {
      return !todo.complete;
    }
    return todo.complete;
  };
  return (
    <div className="list-todo">
      {items
        .sort(todoSort)
        .filter((item) => item.title.includes(search))
        .filter(todoFilter)
        .map((todo) => (
          <div
            draggable={true}
            onDragStart={(e) => dragStartHandler(e, todo)}
            onDragEnd={(e) => dragEndHandler(e)}
            onDragLeave={(e) => dragEndHandler(e)}
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dropHandler(e, todo)}
          >
            <TodoItem
              setItems={setItems}
              items={items}
              inputText={inputText}
              removeTodo={removeTodo}
              {...todo}
            />
          </div>
        ))}
    </div>
  );
};
export { TodoList };
