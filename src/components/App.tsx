import React from "react";
import { useState, useEffect, useRef } from "react";
import { ItoDo } from "../components/types/data";
import { TodoList } from "../components/TodoList";
import Plus from "../img/plus.svg";
import { ItemPlus } from "./ItemPlus";

const App: React.FC = () => {
  const [value, setValue] = useState("");
  const [search, searchValue] = useState("");
  let [checkPlus, setCheckPlus] = useState("");
  let [todos, setTodos] = useState<ItoDo[]>([]);
  let [selectedGroup, setSelectedGroup] = useState("All");

  const toDoViewing = () => {
    return setSelectedGroup("Todo");
  };
  const completedTasks = () => {
    return setSelectedGroup("Complete");
  };
  const fullTasksList = () => {
    return setSelectedGroup("All");
  };
  const addTodo = () => {
    if (value) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          title: value,
          complete: false,
          check: true,
        },
      ]);

      setValue("");
    }
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  const selectAll: React.MouseEventHandler<HTMLLabelElement> = (e) => {
    setTodos(
      todos.map((todo) => {
        return {
          ...todo,
          complete: true,
        };
      })
    );
  };

  const removeTodo = (id: number): void => {
    return setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id: number, title: string): void => {
    setTodos(
      todos.map((todo) => {
        if (todo.id !== id) return todo;
        return {
          ...todo,
          complete: !todo.complete,
        };
      })
    );
  };

  const inputText = (id: number, title: string) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id !== id) return todo;
        return {
          ...todo,
          title: value,
        };
      })
    );
  };
  const FocusInput: React.FocusEventHandler<HTMLInputElement> = () => {
    return setCheckPlus((checkPlus = "1"));
  };

  const BlurInput: React.FocusEventHandler<HTMLInputElement> = () => {
    return setCheckPlus((checkPlus = ""));
  };

  return (
    <div className="items-center flex flex-col  mb-4 rounded-2xl p-5 w-full ">
      <div className="card">
        <input
          className="text-todo"
          type="text"
          placeholder="Add your ToDO"
          value={value}
          onFocus={FocusInput}
          onBlur={BlurInput}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button id="addTask" className="adding-button" onClick={addTodo}>
          <ItemPlus checkPlus={checkPlus} />
        </button>
      </div>
      <input
        className="text-search"
        type="search"
        placeholder="Search.."
        value={search}
        onChange={(e) => searchValue(e.target.value)}
        //onInput={handleKeyDownSearch}
      />
      <div className="row">
        <div className="select-all">
          <label id="selectAll" className="label-text" onClick={selectAll}>
            {""}
          </label>
        </div>
        <div className="butts">
          <button className="button" onClick={toDoViewing}>
            TODO
          </button>
          <button className="button" onClick={completedTasks}>
            DONE
          </button>
          <button className="button" onClick={fullTasksList}>
            ALL
          </button>
        </div>
      </div>
      <TodoList
        selectedGroup={selectedGroup}
        search={search}
        setItems={setTodos}
        items={todos}
        inputText={inputText}
        //editTodo={editTodo}
        removeTodo={removeTodo}
        toggleTodo={toggleTodo}
      />
    </div>
  );
};

export { App };
