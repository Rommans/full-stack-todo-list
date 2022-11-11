import { useEffect, useState } from "react";
import { Modal, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import useApi from "../../hooks/useApi";
import useUserData from "../../hooks/useUserData";
import useNotifications from "../../hooks/useNotifications";

import "./styles.css";

const ShareTodo = ({ show, id, sharedWith, handleClose }) => {
  const { t } = useTranslation();

  const api = useApi();
  const userData = useUserData();
  const notifications = useNotifications();

  useEffect(() => {
    if (userData.role === "admin") {
      getUserListAdmin();
    }
  }, []);

  const [users, setUsers] = useState([]);
  const [selectShare, setSelectShare] = useState("");
  const [emailValue, setEmailValue] = useState("");

  const handleSubmit = async () => {
    try {
      userData.role === "admin"
        ? await api.shareTodo(id, selectShare)
        : await api.shareTodo(id, emailValue);
      handleClose();
      notifications.success({ message: `${t("todosuccesssha")}` });
    } catch (error) {
      console.error("error", error);
      notifications.error({ message: `${t("failed")}` });
    }
  };

  const getUserListAdmin = async () => {
    const users = await api.getUserListAdmin();
    setUsers(users.data);
  };

  let sharedWithUsers;
  if (sharedWith) {
    sharedWithUsers = sharedWith.map((user) => {
      return user.firstName + " " + user.lastName + "; ";
    });
  }

  const onChangeText = (e) => {
    setEmailValue(e.target.value);
  };

  return (
    <div className="edit-todo-form">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t("sharetodo")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="edit-todo-form__input-wrapper">
            <p className="edit-todo-form__share">
              {t("todoissharedwith")}:{" "}
              <span>
                {sharedWithUsers && sharedWithUsers.length === 0
                  ? `${t("none")}`
                  : sharedWithUsers}
              </span>
            </p>
          </div>
          {userData.role === "admin" ? (
            <div className="login-form__input-wrapper">
              <label className="login-form__input-label" htmlFor="sharedWith">
                {t("chooseemailtosharetodo")}
              </label>
              <Form.Select
                className="login-form__input"
                aria-label="Default select example"
                onChange={(e) => {
                  setSelectShare(e.target[e.target.selectedIndex].text);
                }}>
                {users.map((user, index) => (
                  <option key={user.id} value={index}>
                    {user.email}
                  </option>
                ))}
              </Form.Select>
            </div>
          ) : (
            <div className="login-form__input-wrapper">
              <label className="login-form__input-label" htmlFor="shareWith">
                Enter email to share:
              </label>
              <input
                placeholder="Email email"
                className="login-form__input"
                id="text"
                type="text"
                onChange={onChangeText}
              />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <div className="edit-todo-form__btns-wrapper">
            <button
              onClick={handleClose}
              className="edit-todo-form__submit-btn">
              {t("cancel")}
            </button>
            <button
              onClick={handleSubmit}
              className="edit-todo-form__submit-btn">
              {t("save")}
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ShareTodo;
