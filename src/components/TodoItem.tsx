import React from "react";
import { ItoDo } from "../components/types/data";
import { useState, useEffect, useRef } from "react";
import Trash from "../img/Trash.svg";
import Drag from "../img/DragVertical.svg";
import Pencil from "../img/Pencil.svg";

export interface ItoDoItem extends ItoDo {
  items: ItoDo[];
  setItems: React.Dispatch<React.SetStateAction<ItoDo[]>>;
  //editTodo: (id: number) => void;

  removeTodo: (id: number) => void;
  inputText: (id: number, title: string) => void;
  toggleTodo: (id: number, title: string) => void;
}

const TodoItem: React.FC<ItoDoItem> = ({
  setItems,
  items,
  id,
  inputText,
  title,
  check,
  complete,
  //editTodo,
  removeTodo,
  toggleTodo,
}) => {
  const [value, setValue] = useState("");
  const editTodo = (id: number) => {
    setItems(
      items.map((todo) => {
        if (todo.id !== id) return todo;
        return {
          ...todo,
          check: !todo.check,
        };
      })
    );
  };
  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      setItems(
        items.map((todo) => {
          if (todo.id !== id) return todo;
          return {
            ...todo,
            check: !todo.check,
            title: value,
          };
        })
      );
    }
  };

  return (
    <div className="wrapper">
      <img className="button-drag-image" src={Drag} />

      <label className={complete ? "checked" : ""}>
        <input
          className={"check-box"}
          type="checkbox"
          checked={complete}
          onChange={() => toggleTodo(id, title)}
        />
        <input
          className={"text-list " + (complete ? "complete" : "")}
          type="text-list"
          placeholder={title}
          checked={complete}
          value={value}
          readOnly={check}
          onKeyDown={handleKeyDown}
          onChange={(e) => setValue(e.target.value)}
        />
      </label>
      <div>
        <button className="mr-5" onClick={() => editTodo(id)}>
          <img className="button-editing-image" src={Pencil} />
        </button>
        <button onClick={() => removeTodo(id)}>
          <img className="button-trash-image" src={Trash} />
        </button>
      </div>
    </div>
  );
};
export { TodoItem };
