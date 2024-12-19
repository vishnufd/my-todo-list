import React, { useState } from "react";
import CheckIcon from "../assets/icon-check.svg";
import crossIcon from "../assets/icon-cross.svg";
import Input from "../components/Input";

const TodoList = ({ todo, setTodoList, isDark, width }) => {
  const [hoverClose, setHoverClose] = useState("invisible");

  // check todo when it's completed
  const handleTodoList = () => {
    setTodoList((prevTodos) => {
      return prevTodos.map((todoItem) =>
        todoItem.id === todo.id ? { ...todoItem, isComplete: true } : todoItem,
      );
    });
  };

  // delete single todo
  const handleDeleteTodo = () => {
    return setTodoList((prevState) =>
      prevState.filter((todos) => todos.id !== todo.id),
    );
  };
  return (
    <>
      <div
        className={`${isDark ? "bg-[#26283d]" : "bg-white"} flex w-full items-center justify-around`}
        onClick={handleTodoList}
        onMouseEnter={() => setHoverClose("visible")}
        onMouseLeave={() => setHoverClose("invisible")}
      >
        <div className="flex w-12 items-center justify-center">
          <div
            className={`flex h-4 w-4 items-center justify-center rounded-full border ${isDark ? "border-[#545556]" : "border-[#ced5e0]"} hover:cursor-pointer hover:border-2 hover:border-[#7ab1f5] sm:h-6 sm:w-6`}
          >
            {todo.isComplete ? (
              <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-[#7ab1f5] to-[#9f71eb]">
                <img
                  className={`h-3 w-3 select-none ${width <= 640 && "h-2 w-2"}`}
                  src={CheckIcon}
                  alt="check icon"
                />
              </div>
            ) : null}
          </div>
        </div>
        <Input
          style={`mr-3 w-full px-2 py-3 hover:cursor-pointer text-[16px] ${isDark ? "bg-[#26283d] text-white" : "bg-white"} sm:text-2xl outline-none cursor-default ${todo.isComplete ? "line-through text-gray-300" : ""}`}
          type="text"
          readonly="readonly"
          value={todo.todo}
        />
        <div className={`m-3 ${hoverClose}`}>
          <img
            className="cursor-pointer"
            src={crossIcon}
            alt="delete"
            onClick={handleDeleteTodo}
          />
        </div>
      </div>
      {isDark ? <hr style={{ border: "1px solid #414141" }} /> : <hr />}
    </>
  );
};

export default TodoList;
