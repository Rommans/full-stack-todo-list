import { Outlet, NavLink } from "react-router-dom";
import { Button, Dropdown } from "react-bootstrap";
import { GrLanguage } from "react-icons/gr";

import { useAuth } from "../../hooks/useAuth";

import { useTranslation } from "react-i18next";
import i18next from "i18next";

import "./styles.css";

const Layout = () => {
  const { t } = useTranslation();
  const auth = useAuth();

  const languages = [
    {
      code: "ukr",
      name: "Українська",
    },
    {
      code: "en",
      name: "English",
    },
  ];

  const handleLogout = () => {
    auth.singOut();
  };

  return (
    <div>
      <nav>
        <NavLink className="btn btn-danger" to="list">
          {t("navbar_list_layout")}
        </NavLink>
        <NavLink className="btn btn-danger" to="profile">
          {t("navbar_profile_layout")}
        </NavLink>
        <Button variant="danger" onClick={handleLogout}>
          {t("navbar_logout_layout")}
        </Button>
        <Dropdown>
          <Dropdown.Toggle variant="link" id="dropdown-basic">
            <GrLanguage />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {languages.map(({ code, name }) => (
              <Dropdown.Item
                key={code}
                onClick={() => i18next.changeLanguage(code)}>
                {name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </nav>
      <Outlet />
    </div>
  );
};

export default Layout;
