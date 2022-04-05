import { ItoDo } from "../components/types/data";
import { useState, useEffect, useRef } from "react";
import React from "react";

interface ItoDoItem extends ItoDo {
  items: ItoDo[];
  setItems: React.Dispatch<React.SetStateAction<ItoDo[]>>;
  //editTodo: (id: number) => void;

  removeTodo: (id: number) => void;
  inputText: (id: number, title: string) => void;
  toggleTodo: (id: number, title: string) => void;
}

const TodoItem: React.FC<ItoDoItem> = (props) => {
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

  const {
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
  } = props;
  return (
    <div className="wrapper">
      <label>
        <input
          className="check-box"
          type="checkbox"
          checked={complete}
          onChange={() => toggleTodo(id, title)}
        />
        <input
          className="text-list"
          type="text-list"
          placeholder={title}
          value={value}
          readOnly={check}
          onKeyDown={handleKeyDown}
          onChange={(e) => setValue(e.target.value)}
        />
      </label>
      <div>
        <button className="mr-5" onClick={() => editTodo(id)}>
          <img className="button-editing-image" />
        </button>
        <button onClick={() => removeTodo(id)}>
          <img className="button-trash-image" />
        </button>
      </div>
    </div>
  );
};
export { TodoItem };
