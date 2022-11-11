import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

import { useTranslation } from "react-i18next";

import "./styles.css";

const EditItem = ({ show, id, text, handleClose, handleSave }) => {
  const { t } = useTranslation();

  useEffect(() => {
    setNewText(text);
  }, [text]);

  const [newText, setNewText] = useState("");

  const onChangeText = (e) => {
    setNewText(e.target.value);
  };

  const handleSubmit = () => {
    handleSave({ text: newText, id });
  };

  return (
    <div className="edit-todo-form">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t("edittodo")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="edit-todo-form__input-wrapper">
            <label className="edit-todo-form__input-label" htmlFor="title">
              {t("title")}:
            </label>
            <input
              placeholder={t("entertodo_placeholder")}
              className="edit-todo-form__input"
              id="text"
              type="text"
              defaultValue={newText}
              onChange={onChangeText}
            />
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

export default EditItem;
