import { useState } from "react";
import { Card, Button } from "react-bootstrap";

import ModalEditTodo from "../ModalEditTodo";
import ModalDeleteTodo from "../ModalDeleteTodo";

import { useTranslation } from "react-i18next";

import "./styles.css";

const TodoItem = (props) => {
  const { text, isCompleted, owner, sharedWith } = props;

  const { t } = useTranslation();

  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  //modal
  const handleOpen = () => setShow(true);
  const handleClose = () => setShow(false);

  //modal
  const handleOpenDelete = () => setShowDelete(true);
  const handleCloseDelete = () => setShowDelete(false);

  const sharedWithUsers = sharedWith.map((user) => {
    return user.firstName + " " + user.lastName + " ";
  });
  return (
    <>
      <Card style={{ width: "15rem" }}>
        <Card.Body className="d-flex flex-column">
          <Card.Title>{text}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {t("completed")}: {isCompleted ? `${t("yes")}` : `${t("no")}`}
          </Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">
            {t("owner")}: {owner.firstName} {owner.lastName}
          </Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">
            {t("sharedwith")}:{" "}
            {sharedWithUsers.length > 0 ? sharedWithUsers : `${t("none")}`}
          </Card.Subtitle>
          <div className="button-group">
            <Button className="mt-auto" variant="info" onClick={handleOpen}>
              {t("updatetodo")}
            </Button>
            <Button
              className="mt-auto"
              variant="danger"
              onClick={handleOpenDelete}>
              {t("deletetodo")}
            </Button>
          </div>
        </Card.Body>
      </Card>
      <ModalEditTodo show={show} handleClose={handleClose} {...props} />
      <ModalDeleteTodo
        show={showDelete}
        handleClose={handleCloseDelete}
        {...props}
      />
    </>
  );
};

export default TodoItem;
