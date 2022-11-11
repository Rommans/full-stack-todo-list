import { useState } from "react";

import { useTranslation } from "react-i18next";

import "./styles.css";

const CreateItem = ({ handleCreate }) => {
  const { t } = useTranslation();

  const [text, setText] = useState("");

  const onChangeText = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCreate(text);
    setText("");
  };

  return (
    <div className="create-todo-form">
      <div className="create-todo-form__title">{t("list_createtodo")}</div>
      <form onSubmit={handleSubmit}>
        <div className="create-todo-form__input-wrapper">
          <label className="create-todo-form__input-label" htmlFor="text">
            {t("title")}:
          </label>
          <input
            placeholder={t("entertodo_placeholder")}
            className="create-todo-form__input"
            id="text"
            type="text"
            value={text}
            onChange={onChangeText}
          />
        </div>
        <button
          disabled={text.length < 5}
          className="create-todo-form__submit-btn"
          type="submit">
          {t("submit")}
        </button>
      </form>
    </div>
  );
};

export default CreateItem;
