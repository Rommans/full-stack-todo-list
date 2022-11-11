import Card from "react-bootstrap/Card";
import useUserData from "../../hooks/useUserData";

import { useTranslation } from "react-i18next";

const Profile = () => {
  const { t } = useTranslation();

  const user = useUserData();

  return (
    <div>
      <h1>{t("profilepage")}</h1>
      <Card style={{ width: "15rem", margin: "20px auto" }}>
        <Card.Body className="d-flex flex-column">
          <Card.Title>
            {user.firstName} {user.lastName}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {user.dateOfBirth}
          </Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">
            {user.email}
          </Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">
            {t("role")}: {user.role}
          </Card.Subtitle>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Profile;
