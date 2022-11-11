import { useState } from "react";

import { Modal, Button } from "react-bootstrap";

import useApi from "../../hooks/useApi";
import useNotifications from "../../hooks/useNotifications";

import { useTranslation } from "react-i18next";

const ModalCreateUser = ({ show, handleClose }) => {

  const { t } = useTranslation();

  const [form, setForm] = useState({
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    password: undefined,
    confirmPassword: undefined,
    dateOfBirth: undefined,
  });

  const api = useApi();
  const notifications = useNotifications();

  const onChangeFormValue = (key, e) => {
    setForm({ ...form, [key]: e.target.value });
  };

  const validateForm = () => {
    return (
      Object.values(form).some((item) => !item) ||
      form.password !== form.confirmPassword
    );
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.register(form);
      handleClose();
      notifications.success({ message: `${t("usersuccesscre")}` });
    } catch (error) {
      console.error("error", error);
      notifications.error({ message: `${t("failed")}` });
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>{t("createuser")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="login-form">
            <form onSubmit={handleRegister}>
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
                <label className="login-form__input-label" htmlFor="password">
                  {t("pass")}:
                </label>
                <input
                  placeholder={t("enterpass")}
                  className="login-form__input"
                  id="password"
                  type="text"
                  value={form.password}
                  onChange={(e) => onChangeFormValue("password", e)}
                />
              </div>
              <div className="login-form__input-wrapper">
                <label
                  className="login-form__input-label"
                  htmlFor="confirmPassword">
                  {t("confirmpass")}:
                </label>
                <input
                  placeholder={t("enterconfirmpass")}
                  className="login-form__input"
                  id="confirmPassword"
                  type="text"
                  value={form.confirmPassword}
                  onChange={(e) => onChangeFormValue("confirmPassword", e)}
                />
              </div>
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
                <label
                  className="login-form__input-label"
                  htmlFor="dateOfBirth">
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
              <button
                disabled={validateForm()}
                className="login-form__submit-btn"
                type="submit">
                {t("register")}
              </button>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t("cancel")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalCreateUser;
