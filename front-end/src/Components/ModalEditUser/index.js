import { useState, useEffect } from "react";

import { Modal, Form } from "react-bootstrap";

import useApi from "../../hooks/useApi";
import useNotifications from "../../hooks/useNotifications";

import { useTranslation } from "react-i18next";

const ModalEditUser = (props) => {
  const {
    id,
    firstName,
    lastName,
    dateOfBirth,
    email,
    role,
    show,
    handleClose,
  } = props;

  const { t } = useTranslation();

  const [selectRole, setSelectRole] = useState(role);

  const [form, setForm] = useState({
    firstName: firstName,
    lastName: lastName,
    email: email,
    dateOfBirth: dateOfBirth,
    role: selectRole,
  });

  const api = useApi();
  const notifications = useNotifications();

  useEffect(() => {
    setForm({ ...form, role: selectRole });
  }, [selectRole]);

  const onChangeFormValue = (key, e) => {
    setForm({ ...form, [key]: e.target.value });
  };

  const handleSubmit = async (e, id) => {
    e.preventDefault();
    try {
      await api.updateUserAdmin(id, form);
      handleClose();
      notifications.success({ message: `${t("usersuccessupd")}` });
    } catch (error) {
      console.error("error", error);
      notifications.error({ message: `${t("failed")}` });
    }
  };

  const handleRole = () => {
    if (form.role === "admin") {
      return <option value="1">user</option>;
    } else {
      return <option value="1">admin</option>;
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
          <Modal.Title>{t("updateuser")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="edit-todo-form__input-wrapper">
            <div className="login-form__input-wrapper">
              <label className="login-form__input-label" htmlFor="firstName">
                {t("firstname")}:
              </label>
              <input
                placeholder={t("enterfirstname")}
                className="login-form__input"
                id="firstName"
                type="text"
                value={form.firstName}
                onChange={(e) => onChangeFormValue("firstName", e)}
              />
            </div>
            <div className="login-form__input-wrapper">
              <label className="login-form__input-label" htmlFor="lastName">
                {t("lastname")}:
              </label>
              <input
                placeholder={t("enterlastname")}
                className="login-form__input"
                id="lastName"
                type="text"
                value={form.lastName}
                onChange={(e) => onChangeFormValue("lastName", e)}
              />
            </div>
            <div className="login-form__input-wrapper">
              <label className="login-form__input-label" htmlFor="email">
                {t("email")}:
              </label>
              <input
                placeholder={t("enteremail")}
                className="login-form__input"
                id="email"
                type="text"
                value={form.email}
                onChange={(e) => onChangeFormValue("email", e)}
              />
            </div>
            <div className="login-form__input-wrapper">
              <label className="login-form__input-label" htmlFor="dateOfBirth">
                {t("dateofbirth")}:
              </label>
              <input
                placeholder={t("enterdateofbirthname")}
                className="login-form__input"
                id="dateOfBirth"
                type="text"
                value={form.dateOfBirth}
                onChange={(e) => onChangeFormValue("dateOfBirth", e)}
              />
            </div>
            <div className="login-form__input-wrapper">
              <label className="login-form__input-label" htmlFor="dateOfBirth">
                {t("role")}:
              </label>
              <Form.Select
                className="login-form__input"
                aria-label="Default select example"
                onChange={(e) => {
                  setSelectRole(e.target[e.target.selectedIndex].text);
                }}>
                <option>{form.role}</option>
                {handleRole()}
              </Form.Select>
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

export default ModalEditUser;
