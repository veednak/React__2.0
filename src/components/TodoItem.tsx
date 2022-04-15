import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { ItoDo } from "../types/data";
import Trash from "../img/Trash.svg";
import Drag from "../img/DragVertical.svg";
import Pencil from "../img/Pencil.svg";
import White from "../img/White.png";
import Done from "../img/Done.svg";

export interface ItoDoItem extends ItoDo {
  items: ItoDo[];
  setItems: React.Dispatch<React.SetStateAction<ItoDo[]>>;
  removeTodo: (id: number) => void;
  inputText: (id: number, title: string) => void;
}

const TodoItem: React.FC<ItoDoItem> = ({
  setItems,
  editing,
  items,
  id,
  title,
  check,
  complete,
  removeTodo,
}) => {
  const [value, setValue] = useState("");
  const editTodo = (id: number) => {
    setItems(
      items.map((todo) => {
        if (todo.id !== id) return todo;
        else if (todo.complete != true) {
          return {
            ...todo,
            check: !todo.check,
            editing: Done,
          };
        }
        return todo;
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
            editing: Pencil,
          };
        })
      );
    }
  };

  const toggleTodo = (id: number, title: string): void => {
    setItems(
      items.map((todo) => {
        if (todo.id !== id) return todo;
        if (todo.complete == false) {
          return { ...todo, editing: White, complete: !complete };
        }
        if (todo.complete == true) {
          return { ...todo, editing: Pencil, complete: !complete };
        }
        return {
          ...todo,
          complete: !todo.complete,
        };
      })
    );
  };

  const BlurInput: React.FocusEventHandler<HTMLInputElement> = () => {
    setItems(
      items.map((todo) => {
        if (todo.id !== id) return todo;
        else if (value != "") {
          return {
            ...todo,
            check: true,
            title: value,
          };
        }
        return {
          ...todo,
          check: true,
          editing: Pencil,
        };
      })
    );
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data: any) => {};

  return (
    <div className="wrapper">
      <img className="button-drag-image" src={Drag} />
      <form>
        <label className={complete ? "checked" : ""}>
          <input
            className={"check-box"}
            type="checkbox"
            checked={complete}
            onChange={() => toggleTodo(id, title)}
          />
          <input
            className={
              "text-list " +
              (complete ? "complete" : "") +
              (check ? "" : "check")
            }
            type="text-list"
            onBlur={BlurInput}
            placeholder={title}
            checked={complete}
            value={value}
            readOnly={check}
            onKeyDown={handleKeyDown}
            onChange={(e) => setValue(e.target.value)}
          />
        </label>
      </form>
      <div>
        <button className="mr-5" onClick={() => editTodo(id)}>
          <img className="button-editing-image" alt="Edit" src={editing} />
        </button>
        <button onClick={() => removeTodo(id)}>
          <img className="button-trash-image" alt="Delete" src={Trash} />
        </button>
      </div>
    </div>
  );
};

export { TodoItem };
