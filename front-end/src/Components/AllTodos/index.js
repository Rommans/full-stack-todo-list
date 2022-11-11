import { useState } from "react";
import { useLocation } from "react-router-dom";

import Pagination from "../Pagination";
import TodoItem from "../TodoItem";

import { useTranslation } from "react-i18next";

const AllTodos = () => {
  let location = useLocation();
  const todoList = location.state.data;

  const { t } = useTranslation();

  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage] = useState(2);

  //Get current users
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodo = todoList.slice(indexOfFirstTodo, indexOfLastTodo);

  //Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {currentTodo.length > 0 ? (
        <>
          <h1>
            {t("alltodosof")} {location.state.firstName}{" "}
            {location.state.lastName}
          </h1>
          <div className="todo-list">
            {currentTodo.map((todo) => (
              <TodoItem key={todo.id} {...todo} />
            ))}
          </div>
          {todoList && todoList.length > 0 && (
            <Pagination
              dataPerPage={todosPerPage}
              totalData={todoList.length}
              paginate={paginate}
            />
          )}
        </>
      ) : (
        <h1>{t("notodos")}</h1>
      )}
    </>
  );
};

export default AllTodos;
