import { useState, useEffect, useRef } from "react";
import React from "react";
import { ItoDo } from "../components/types/data";
import { TodoList } from "../components/TodoList";
import { title } from "process";
import ReactDOM from "react-dom";

const App: React.FC = () => {
  const [value, setValue] = useState("");
  const [search, searchValue] = useState("");
  let [todos, setTodos] = useState<ItoDo[]>([]);
  let [condition, setCondition] = useState("All");

  const toDoViewing = () => {
    setCondition((condition = "Todo"));
    console.log(condition);
  };
  const completedTasks = () => {
    setCondition((condition = "Complete"));
    console.log(condition);
  };
  const fullTasksList = () => {
    setCondition((condition = "All"));
    console.log(condition);
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
    console.log(todos);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") addTodo();
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
    console.log("12");
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id: number, title: string): void => {
    console.log("11");
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

  // const editTodo = (id: number): void => {
  //   setTodos(
  //     todos.map((todo) => {
  //       if (todo.id !== id) return todo;
  //       return {
  //         ...todo,
  //         check: !todo.check,
  //       };
  //     })
  //   );
  // };
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

  return (
    <div className="items-center flex flex-col  mb-4 rounded-2xl p-5 w-full ">
      <div className="card">
        <input
          className="text-todo"
          type="text"
          placeholder="Add your ToDO"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div id="addTask" className="adding-button">
          <img
            className="button-plus-image"
            src="../img/plus.svg"
            onClick={addTodo}
          />
        </div>
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
            {" "}
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
        condition={condition}
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
