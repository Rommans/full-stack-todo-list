import { useState, useEffect } from "react";
import useApi from "../../hooks/useApi";

import Pagination from "../Pagination";
import TodoItem from "../TodoItem";

import { useTranslation } from "react-i18next";

import "./styles.css";

const AdminAllTodos = () => {
  const { t } = useTranslation();

  const api = useApi();

  const [todos, setTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage] = useState(3);

  useEffect(() => {
    getAllTodosAdmin();
  }, [todos]);

  const getAllTodosAdmin = async () => {
    const todos = await api.getAllTodosAdmin();
    setTodos(todos.data);
  };

  //Get current todos
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodo = todos.slice(indexOfFirstTodo, indexOfLastTodo);

  //Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <h1>{t("alluserstodo")}</h1>
      <div className="user-list">
        {currentTodo.map((todo) => (
          <TodoItem key={todo.id} {...todo} />
        ))}
      </div>
      {todos && todos.length > 0 && (
        <Pagination
          dataPerPage={todosPerPage}
          totalData={todos.length}
          paginate={paginate}
        />
      )}
    </>
  );
};

export default AdminAllTodos;
