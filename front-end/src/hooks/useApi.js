import axios from "axios";
import { useAuth } from "./useAuth";

export default function useApi() {
  const apiUrl = `${process.env.REACT_APP_SERVER_URL}/v1`; // TODO: you should have .env file in /front-end folder. Look at .env.example
  const auth = useAuth();

  const axiosRequest = async (method, uri, data, headers) => {
    const token = auth.accessToken;
    try {
      const params = method === "GET" ? data : null;
      const body = method !== "GET" ? data : null;
      return await axios(`${apiUrl}/${uri}`, {
        method,
        params,
        data: body,
        headers: { ...headers, Authorization: `Bearer ${token}` },
      });
    } catch (e) {
      if (e?.response?.status === 401 && token) {
        auth.singOut(); // If token expired
      }
      throw e;
    }
  };

  return {
    register: (data) => axiosRequest("POST", "/auth/register", data),
    login: (data) =>
      axiosRequest("POST", "/auth/login", data).then(({ data }) => data),
    me: () => axiosRequest("GET", "/auth/me").then(({ data }) => data),
    createTodo: (data) =>
      axiosRequest("POST", "/todos", data).then(({ data }) => data),
    getAllTodos: () => axiosRequest("GET", "/todos").then(({ data }) => data),
    deleteTodo: (id) =>
      axiosRequest("DELETE", `/todos/${id}`).then(({ data }) => data),
    updateTodo: (id, data) =>
      axiosRequest("PUT", `/todos/${id}`, data).then(({ data }) => data),
    getUserListAdmin: () =>
      axiosRequest("GET", "/admin/users").then(({ data }) => data),
    getTodosListAdmin: (id) =>
      axiosRequest("GET", `/admin/todos?userId=${id}`).then(({ data }) => data),
    updateUserAdmin: (id, data) =>
      axiosRequest("PUT", `/admin/users/${id}`, data).then(({ data }) => data),
    getAllTodosAdmin: () =>
      axiosRequest("GET", "admin/todos").then(({ data }) => data),
    deleteUserAdmin: (id) =>
      axiosRequest("DELETE", `/admin/users/${id}`).then(({ data }) => data),
    updateTodoAdmin: (id, data) =>
      axiosRequest("PUT", `/admin/todos/${id}`, data).then(({ data }) => data),
    deleteTodoByIdAdmin: (id) =>
      axiosRequest("DELETE", `/admin/todos/${id}`).then(({ data }) => data),
    shareTodo: (id, email) =>
      axiosRequest("POST", `/todos/share/${id}`, {email}).then(({ data }) => data),
    getByEmailAdmin: (email) =>
      axiosRequest("GET", `/admin/users?email=${email}`).then(({ data }) => data).catch((err) => err),
  };
}
