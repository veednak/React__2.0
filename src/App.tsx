import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { ItoDo } from "./types/data";
import { TodoList } from "./components/TodoList";
import { ItemPlus } from "./components/ItemPlus";

const App: React.FC = () => {
  const [value, setValue] = useState("");
  const [search, searchValue] = useState("");
  let [checkPlus, setCheckPlus] = useState("");
  let [todos, setTodos] = useState<ItoDo[]>([]);
  let [selectedGroup, setSelectedGroup] = useState("All");

  const completedTasks = (type: string) => {
    return setSelectedGroup(type);
  };

  useEffect(() => {
    const row: string = localStorage.getItem("todos")!;
    setTodos(JSON.parse(row));
  }, []);

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

  const FocusInput = (type: string) => {
    return setCheckPlus(type);
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data: any) => {};

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="items-center flex flex-col  mb-4 rounded-2xl p-5 w-full ">
      <h1>TODO LIST</h1>

      <div className="card">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("newTodo")}
            className="text-todo"
            type="text"
            placeholder="Add your ToDO"
            value={value}
            onFocus={() => {
              FocusInput("1");
            }}
            onBlur={() => {
              FocusInput("");
            }}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </form>
        <button id="addTask" className="adding-button" onClick={addTodo}>
          <ItemPlus checkPlus={checkPlus} />
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("searchTodo")}
          className="text-search"
          type="search"
          placeholder="Search.."
          value={search}
          onChange={(e) => searchValue(e.target.value)}
        />
      </form>
      <div className="row">
        <div className="select-all">
          <label id="selectAll" className="label-text" onClick={selectAll}>
            {""}
          </label>
        </div>
        <div className="butts">
          <button
            className="button"
            onClick={() => {
              completedTasks("Todo");
            }}
          >
            TODO
          </button>
          <button
            className="button"
            onClick={() => {
              completedTasks("Done");
            }}
          >
            DONE
          </button>
          <button
            className="button"
            onClick={() => {
              completedTasks("All");
            }}
          >
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
        removeTodo={removeTodo}
      />
    </div>
  );
};

export { App };