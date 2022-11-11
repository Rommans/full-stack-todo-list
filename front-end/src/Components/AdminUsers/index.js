import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

import UserItem from "../UserItem";
import Pagination from "../Pagination";
import ModalCreateUser from "../ModalCreateUser";

import useApi from "../../hooks/useApi";

import { useTranslation } from "react-i18next";

import "./styles.css";

const AdminUsers = () => {
  const { t } = useTranslation();

  const api = useApi();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [searchBar, setSearchBar] = useState("");
  const [results, setResults] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(2);
  const [error, setError] = useState('');
  
  useEffect(() => {
    getUserListAdmin();
  }, []);

  const getUserListAdmin = async () => {
    const users = await api.getUserListAdmin();
    setUsers(users.data);
  };

  //Submit search
  const getByEmail = async (e) => {
    e.preventDefault();
    const user = await api.getByEmailAdmin(searchBar);
    if (user.response?.data.message === "NotFound") {
      setError("User not found");
      return;
    }
    setResults(user);
    setError("");
    console.log(user)
    navigate(`?email=${searchBar}`, {
      state: results,
    });
  };

  //Get current users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUser = users.slice(indexOfFirstUser, indexOfLastUser);

  //Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // modal
  const handleOpen = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <h1>{t("userlist")}</h1>
      <Button variant="primary" onClick={handleOpen}>
        {t("createuser")}
      </Button>
      <Form className="d-flex search-bar" onSubmit={(e) => getByEmail(e)}>
        <Form.Control
          value={searchBar}
          onChange={(e) => setSearchBar(e.target.value)}
          type="search"
          placeholder={t("search")}
          className={error ? "me-2 error" : "me-2"}
          aria-label="Search"
        />
        <Button variant="outline-success" onClick={(e) => getByEmail(e)}>
          {t("search")}
        </Button>
      </Form>
      <div className="user-list">
        {currentUser.map((user) => (
          <UserItem key={user.id} {...user} />
        ))}
      </div>
      {users && users.length > 0 && (
        <Pagination
          dataPerPage={usersPerPage}
          totalData={users.length}
          paginate={paginate}
        />
      )}
      <ModalCreateUser show={show} handleClose={handleClose} />
    </>
  );
};

export default AdminUsers;
