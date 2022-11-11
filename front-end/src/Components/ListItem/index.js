import { useTranslation } from "react-i18next";

import "./styles.css";

const ListItem = (props) => {
  const { t } = useTranslation();

  const {
    text,
    id,
    isCompleted,
    sharedWith,
    handleEdit,
    handleRemove,
    handleCheck,
    handleShare,
  } = props;
  
  let sharedWithUsers;
  if (sharedWith) {
    sharedWithUsers = sharedWith.map((user) => {
      return (user.firstName + " " + user.lastName + "; ")
    })
  }

  return (
    <div className="list-item">
      <div>
        <p
          className={`list-item__title list-item__title--${
            isCompleted ? "checked" : null
          }`}>
          {text}
        </p>
        <p>{t("sharedwith")}: <span className="sharedWithUsers">{sharedWithUsers && sharedWithUsers.length === 0 ? `${t("none")}` : sharedWithUsers}</span></p>
      </div>
      <div className="list-item__btns-wrapper">
        <input
          onClick={() => handleCheck(id)}
          className="list-item__checkbox"
          type="checkbox"
          checked={isCompleted}
          onChange={(e) => {}}
        />
        <i className="fa fa-pencil" onClick={() => handleEdit(id)} />
        <i className="fa fa-trash" onClick={() => handleRemove(id)} />
        <i
          className="fa fa-share-alt-square"
          onClick={() => handleShare(id)}></i>
      </div>
    </div>
  );
};

export default ListItem;
