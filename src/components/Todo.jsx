import React, { useEffect, useState } from "react";
import LightModeImg from "../assets/bg-desktop-light.jpg";
import MobileLightModeImg from "../assets/bg-mobile-light.jpg";
import MobileDarkModeImg from "../assets/bg-mobile-dark.jpg";
import DarkModeImg from "../assets/bg-desktop-dark.jpg";
import MoonIcon from "../assets/icon-moon.svg";
import SunIcon from "../assets/icon-sun.svg";
import TodoList from "../components/TodoList";
import Input from "../components/Input";

const Todo = () => {
  // theme state
  const [isDark, setDark] = useState(
    JSON.parse(localStorage.getItem("isDark")),
  );

  // main todos useState
  const [todo, setTodoList] = useState([
    {
      id: crypto.randomUUID(),
      todo: "Purchase computer monitor",
      isComplete: false,
    },
    {
      id: crypto.randomUUID(),
      todo: "Go to gym",
      isComplete: false,
    },
    {
      id: crypto.randomUUID(),
      todo: "Buy a T-shirt",
      isComplete: false,
    },
    {
      id: crypto.randomUUID(),
      todo: "Go for a walk",
      isComplete: false,
    },
  ]);

  // updating data to existing todo
  const handleSubmitTodo = () => {
    if (todoList.todo === "") return;
    setTodoList((prevState) => [
      ...prevState,
      { ...todoList, isComplete: false, id: crypto.randomUUID() },
    ]);
  };

  const [todoList, setTodo] = useState({
    todo: "",
    isComplete: null,
    id: null,
  });

  // getting data from input field
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // filter methods
  const [filteredData, setFilterData] = useState("All");

  const filteredTodos = todo.filter((todo) => {
    if (filteredData === "All") return true;
    if (filteredData === "Active") return !todo.isComplete;
    if (filteredData === "Completed") return todo.isComplete;
    return false;
  });

  const handleClearComplete = () => {
    return setTodoList((todoItem) => {
      return todoItem.filter((todo) => {
        return !todo.isComplete;
      });
    });
  };

  // number of remaining todo items that is not completed
  const uncompletedTodos = todo.filter(
    (todo) => todo?.isComplete === false,
  ).length;

  // setting width
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWidth = () => {
      return setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleWidth);
  }, []);

  return (
    <main
      className={`font-['Josefin Sans'] h-screen w-full ${isDark ? "bg-[#181824]" : "bg-white"}`}
    >
      <section className="relative flex h-72 w-full">
        <img
          src={
            isDark
              ? width >= 640
                ? DarkModeImg
                : MobileDarkModeImg
              : width >= 640
                ? LightModeImg
                : MobileLightModeImg
          }
          width="100%"
          alt="mountain"
        />
      </section>
      <section className="absolute top-[5rem] flex w-full flex-col items-center justify-center">
        <section className="mx-4 w-[351px] sm:w-[550px]">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-[15px] text-white sm:text-5xl sm:font-semibold">
              TODO
            </h1>
            <img
              className="w-5 select-none hover:cursor-pointer sm:w-8"
              src={isDark ? SunIcon : MoonIcon}
              alt="Modes"
              onClick={() => {
                setDark(!isDark);
                localStorage.setItem("isDark", JSON.stringify(!isDark));
              }}
            />
          </div>
          <div
            className={`my-10 flex w-full items-center justify-around rounded-md ${isDark ? "bg-[#26283d]" : "bg-white"}`}
          >
            <Input
              value={todoList.todo}
              onChange={handleChange}
              style={`${isDark ? "bg-[#26283d] text-white" : "bg-white text-black"} ml-3 w-full px-2 py-2 sm:py-3 text-[19px] sm:text-2xl outline-none`}
              type="text"
              placeholder="Create a new todo..."
              name="todo"
            />
            <div className="flex w-32 items-center justify-center">
              <button
                className="flex rounded-md border-2 border-[#7ab1f5] px-[4px] py-[4px] text-[#9f71eb] hover:border-[#9f71eb] hover:bg-[#9f71eb] hover:text-white sm:px-2 sm:py-2"
                onClick={handleSubmitTodo}
              >
                Add Todo
              </button>
            </div>
          </div>
        </section>

        {/* Todo lists */}
        <section
          className={`mx-4 w-[351px] rounded-md ${isDark ? "bg-[#26283d]" : "bg-white"} py-[5px] shadow-md sm:mx-0 sm:w-[550px] ${todo?.length <= 0 ? "hidden" : "block"}`}
        >
          {filteredTodos?.map((todoList) => {
            return (
              <TodoList
                key={todoList?.id}
                todo={todoList}
                setTodoList={setTodoList}
                isDark={isDark}
                width={width}
              />
            );
          })}
          <div className="flex flex-row items-center justify-between gap-x-5 px-3 py-3 text-gray-400 sm:w-full sm:gap-x-0">
            <p className="w-[62px] cursor-default text-[12px] sm:w-auto sm:text-[14px]">
              <span>{uncompletedTodos}</span> items left
            </p>
            {width >= 640 && (
              <p className="flex w-[140px] gap-x-4 font-semibold sm:w-auto">
                <a
                  className={`cursor-pointer text-[14px] ${isDark ? "hover:text-white" : "hover:text-gray-800"} ${filteredData === "All" && "text-blue-600"}`}
                  onClick={() => setFilterData("All")}
                >
                  All
                </a>{" "}
                <a
                  className={`cursor-pointer ${isDark ? "hover:text-white" : "hover:text-gray-800"} text-[14px] ${filteredData === "Active" && "text-blue-600"}`}
                  onClick={() => setFilterData("Active")}
                >
                  Active
                </a>{" "}
                <a
                  className={`cursor-pointer ${isDark ? "hover:text-white" : "hover:text-gray-800"} text-[14px] ${filteredData === "Completed" && "text-blue-600"}`}
                  onClick={() => setFilterData("Completed")}
                >
                  Completed
                </a>
              </p>
            )}
            <p>
              <a
                className={`w-[64px] cursor-pointer text-[13px] ${isDark ? "hover:text-white" : "hover:text-gray-800"} sm:w-auto sm:text-[14px]`}
                onClick={handleClearComplete}
              >
                Clear Completed
              </a>
            </p>
          </div>
        </section>
        {width <= 640 && (
          <div
            className={`bg-white-500 my-6 flex w-[351px] items-center justify-center rounded-md py-2 text-gray-400 shadow-md ${isDark ? "bg-[#26283d]" : "bg-white"}`}
          >
            <p className="flex gap-x-4 font-semibold sm:w-auto">
              <a
                className={`cursor-pointer text-[14px] ${isDark ? "hover:text-white" : "hover:text-gray-800"}`}
                onClick={() => setFilterData("All")}
              >
                All
              </a>{" "}
              <a
                className={`cursor-pointer text-[14px] ${isDark ? "hover:text-white" : "hover:text-gray-800"}`}
                onClick={() => setFilterData("Active")}
              >
                Active
              </a>{" "}
              <a
                className={`cursor-pointer ${isDark ? "hover:text-white" : "hover:text-gray-800"} text-[14px]`}
                onClick={() => setFilterData("Completed")}
              >
                Completed
              </a>
            </p>
          </div>
        )}
      </section>
    </main>
  );
};

export default Todo;
