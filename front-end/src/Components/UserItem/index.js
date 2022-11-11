import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

import ModalEditUser from "../ModalEditUser";
import ModalDeleteUser from "../ModalDeleteUser";

import useApi from "../../hooks/useApi";

import { useTranslation } from "react-i18next";

import "./styles.css";

const UserItem = (props) => {
  const { t } = useTranslation();

  const { id, firstName, lastName, dateOfBirth, email, role } = props;
  const api = useApi();
  const navigate = useNavigate();
  
  
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  
  const getTodosListAdmin = async () => {
    const todosById = await api.getTodosListAdmin(id);
    navigate(`todos?userId=${id}`, {
      state: { firstName, lastName, ...todosById },
    });
  };


  //modal
  const handleOpen = () => setShow(true);
  const handleClose = () => setShow(false);

  //modal
  const handleOpenDelete = () => setShowDelete(true);
  const handleCloseDelete = () => setShowDelete(false);

  return (
    <>
      <Card style={{ width: "15rem" }}>
        <Card.Body className="d-flex flex-column">
          <Card.Title>
            {firstName} {lastName}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {dateOfBirth}
          </Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">{email}</Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">
            {t("role")}: {role}
          </Card.Subtitle>
          <div className="button-group">
            <Button className="mt-auto" variant="info" onClick={handleOpen}>
              {t("updateuser")}
            </Button>
            <Button
              className="mt-auto"
              variant="danger"
              onClick={handleOpenDelete}>
              {t("deleteuser")}
            </Button>
            <Button
              className="mt-auto"
              variant="secondary"
              onClick={getTodosListAdmin}>
              {t("usertodos")}
            </Button>
          </div>
        </Card.Body>
      </Card>
      <ModalEditUser show={show} handleClose={handleClose} {...props} />
      <ModalDeleteUser
        show={showDelete}
        handleClose={handleCloseDelete}
        {...props}
      />
    </>
  );
};

export default UserItem;
