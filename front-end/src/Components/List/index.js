import { useState, useEffect } from "react";

import ListItem from "../ListItem";
import CreateItem from "../CreateItem";
import EditItem from "../EditItem";
import ShareTodo from "../ShareTodo";
import FiltersBar from "../Filters";
import Pages from "../Pagination1";

import useApi from "../../hooks/useApi";
import useNotifications from "../../hooks/useNotifications";
import useUserData from "../../hooks/useUserData";

import { FILTERS } from "../../utils";

import { useTranslation } from "react-i18next";

import "./styles.css";

const LIMIT = 10;

const List = () => {
  const api = useApi();
  const userData = useUserData();
  const notifications = useNotifications();

  const { t } = useTranslation();

  const [todos, setTodos] = useState({
    data: [],
    total: undefined,
    limit: undefined,
    page: undefined,
  });
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [selectedTodoShare, setSelectedTodoShare] = useState(null);
  const [filterType, setFilterType] = useState(FILTERS.ALL);

  useEffect(() => {
    getAllTodos();
  }, []);

  const getAllTodos = async (page = 1) => {
    const todos = await api.getAllTodos({ limit: LIMIT, page: page - 1 });
    setTodos(todos);
  };

  const handleCreate = async (todo) => {
    try {
      await api.createTodo({ text: todo });
      notifications.success({ message: `${t("todosuccesscre")}` });
      getAllTodos();
    } catch (error) {
      console.error(error);
      notifications.error({ message: `${t("failed")}` });
    }
  };

  const handleEdit = (id) => {
    setSelectedTodo(todos.data.find((todo) => todo.id === id));
  };

  const handleShare = (id) => {
    setSelectedTodoShare(todos.data.find((todo) => todo.id === id));
  };

  const handleSave = async ({ id, text }) => {
    try {
      await api.updateTodo(id, { text });
      getAllTodos();
      handleClose();
      notifications.success({ message: `${t("todosuccessupd")}` });
    } catch (error) {
      console.error(error);
      notifications.error({ message: `${t("failed")}` });
    }
  };

  const handleClose = () => {
    setSelectedTodo(null);
  };

  const handleCloseShare = () => {
    setSelectedTodoShare(null);
  };

  const handleRemove = async (id) => {
    try {
      await api.deleteTodo(id);
      getAllTodos();
      notifications.success({ message: `${t("todosuccessdel")}` });
    } catch (error) {
      console.error(error);
      notifications.error({ message: `${t("failed")}` });
    }
  };

  const handleCheck = async (id) => {
    try {
      const todo = todos.data.find((todo) => todo.id === id);
      await api.updateTodo(id, { isCompleted: !todo?.isCompleted });
      getAllTodos();
      handleClose();
      notifications.success({ message: `${t("todosuccessupd")}` });
    } catch (error) {
      console.error(error);
      notifications.error({ message: `${t("failed")}` });
    }
  };

  const filteredTodo = () => {
    switch (filterType) {
      case FILTERS.ALL:
        return todos.data;
      case FILTERS.DONE:
        return todos.data.filter((todo) => todo.isCompleted);
      case FILTERS.TODO:
        return todos.data.filter((todo) => !todo.isCompleted);
      default:
        return todos.data;
    }
  };

  const onChangePage = (page) => {
    if (page === todos.page) return;
    getAllTodos(page);
  };

  const getPagesCount = () => {
    return Math.ceil(todos.total / todos.limit);
  };

  return (
    <div className="list">
      {userData && (
        <div className="list__title">
          {t("welcome_list_page")} {userData.firstName} {userData.lastName}
        </div>
      )}

      <CreateItem handleCreate={handleCreate} />

      <div className="list__title">{t("todolist")}</div>
      <FiltersBar
        filterType={filterType}
        todos={todos}
        setFilterType={setFilterType}
      />
      <div className="list__items">
        {filteredTodo().map((todo) => (
          <ListItem
            key={todo.id}
            handleRemove={handleRemove}
            handleEdit={handleEdit}
            handleShare={handleShare}
            handleCheck={handleCheck}
            {...todo}
          />
        ))}
      </div>
      <Pages
        onChange={onChangePage}
        active={todos.page}
        pages={getPagesCount()}
        maxButtons={3}
      />
      <EditItem
        show={selectedTodo}
        handleClose={handleClose}
        handleSave={handleSave}
        {...selectedTodo}
      />
      <ShareTodo
        show={selectedTodoShare}
        handleClose={handleCloseShare}
        handleSave={handleSave}
        {...selectedTodoShare}
      />
    </div>
  );
};

export default List;
