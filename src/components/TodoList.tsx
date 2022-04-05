import { TodoItem } from "../components/TodoItem";

import { ItoDo } from "../components/types/data";
import React, { useState } from "react";

interface ITodoListProps {
  condition: string;
  search: string;
  setItems: React.Dispatch<React.SetStateAction<ItoDo[]>>;
  items: ItoDo[];
  //editTodo: (id: number) => void;
  inputText: (id: number, title: string) => void;
  toggleTodo(id: number, title: string): void;
  removeTodo(id: number): void;
}

const TodoList: React.FC<ITodoListProps> = (props) => {
  let [currentTodo, setCurrentTodo] = useState<ItoDo>();

  function dragStartHandler(e: any, todo: ItoDo) {
    console.log("drag", todo);
    setCurrentTodo(todo);
  }
  function dragEndHandler(e: any) {}
  function dragOverHandler(e: any) {
    e.preventDefault();
  }
  function dropHandler(e: any, todo: ItoDo) {
    e.preventDefault();
    console.log("drop", todo);
    setItems(
      items.map((c) => {
        if (c.id === todo.id) {
          return { ...c, id: currentTodo!.id };
        }
        if (c.id === currentTodo!.id) {
          return { ...c, id: todo.id };
        }
        return c;
      })
    );
    console.log(condition);
  }
  const todoSort = (a: ItoDo, b: ItoDo) => {
    if (a.id > b.id) return 1;
    else return -1;
  };

  const {
    condition,
    search,
    setItems,
    items,
    inputText,
    toggleTodo,
    removeTodo,
  } = props;
  return (
    <div className="list-todo">
      {items
        .sort(todoSort)
        .filter((item) => item.title.includes(search))
        .filter((todo) => {
          if (condition === "All") {
            return true;
          }
          if (condition === "Todo") {
            return !todo.complete;
          }
          return todo.complete;
        })
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
              key={todo.id}
              //editTodo={editTodo}
              inputText={inputText}
              toggleTodo={toggleTodo}
              removeTodo={removeTodo}
              {...todo}
            />
          </div>
        ))}
    </div>
  );
};
export { TodoList };
