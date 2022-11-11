import { Modal } from "react-bootstrap";

import useApi from "../../hooks/useApi";
import useNotifications from "../../hooks/useNotifications";

import { useTranslation } from "react-i18next";

import "./styles.css";

const ModalDeleteUser = (props) => {
  const {
    show,
    handleClose,
    id,
    firstName,
    lastName,
  } = props;

  const { t } = useTranslation();

  const api = useApi();
  const notifications = useNotifications();

  const handleSubmit = async (e, id) => {
    e.preventDefault();
    try {
      await api.deleteUserAdmin(id);
      handleClose();
      notifications.success({ message: `${t("usersuccessdel")}` });
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
          <Modal.Title>{t("deleteuser")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="edit-todo-form__input-wrapper">
            <div className="login-form__input-wrapper">
              <label className="login-form__input-label" htmlFor="text">
                {t("suretodeleteuser")} {firstName} {lastName}?
              </label>
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
              {t("delete")}
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalDeleteUser;
