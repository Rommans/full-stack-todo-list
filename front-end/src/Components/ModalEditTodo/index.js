import { useState } from "react";

import { Modal } from "react-bootstrap";

import useApi from "../../hooks/useApi";
import useNotifications from "../../hooks/useNotifications";

import { useTranslation } from "react-i18next";

import "./styles.css";

const ModalEditTodo = (props) => {
  const {
    show,
    handleClose,
    id,
    text,
    isCompleted,
  } = props;

  const { t } = useTranslation();

  const [form, setForm] = useState({
    text: text,
    isCompleted: isCompleted,
  });

  const api = useApi();
  const notifications = useNotifications();

  const onChangeFormValue = (key, e) => {
    if (key === "isCompleted") {
      setForm({ ...form, [key]: e.target.checked });
    } else {
      setForm({ ...form, [key]: e.target.value });
    }
  };

  const handleSubmit = async (e, id) => {
    e.preventDefault();
    try {
      await api.updateTodoAdmin(id, form);
      handleClose();
      notifications.success({ message: `${t("todosuccessupd")}` });
    } catch (error) {
      console.error("error", error);
      notifications.error({ message: `${t("failed")}` });
    }
  };

  return (
    <div className="edit-todo-form">
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>{t("edittodo")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="edit-todo-form__input-wrapper">
              <div className="login-form__input-wrapper">
                <label className="login-form__input-label" htmlFor="text">
                  {t("title")}:
                </label>
                <input
                  placeholder={t("edittodo")}
                  className="login-form__input"
                  id="text"
                  type="text"
                  value={form.text}
                  onChange={(e) => onChangeFormValue("text", e)}
                />
              </div>
              <div className="login-form__input-wrapper checkbox">
                <label
                  className="login-form__input-label"
                  htmlFor="isCompleted">
                  {t("completed")}:
                </label>
                <input
                  id="isCompleted"
                  type="checkbox"
                  checked={form.isCompleted}
                  onChange={(e) => onChangeFormValue("isCompleted", e)}
                />
              </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="edit-todo-form__btns-wrapper">
            <button
              onClick={handleClose}
              className="edit-todo-form__submit-btn">
              {t("cancel")}
            </button>
            <button
              onClick={(e) => handleSubmit(e, id)}
              className="edit-todo-form__submit-btn">
              {t("save")}
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalEditTodo;
