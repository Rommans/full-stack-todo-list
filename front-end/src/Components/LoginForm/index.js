import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import useApi from "../../hooks/useApi";

import { useTranslation } from "react-i18next";

import "./styles.css";

const LoginForm = () => {

  const { t } = useTranslation();

  const auth = useAuth();
  const api = useApi();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { access_token } = await api.login({ email, password });
      auth.signIn(access_token);
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <div className="login-form">
      <div className="login-form__email">{t("login")}</div>
      <form onSubmit={handleLogin}>
        <div className="login-form__input-wrapper">
          <label className="login-form__input-label" htmlFor="email">
          {t("email")}:
          </label>
          <input
            placeholder={t("enteremail")}
            className="login-form__input"
            id="email"
            type="text"
            value={email}
            onChange={onChangeEmail}
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
            value={password}
            onChange={onChangePassword}
          />
        </div>
        <button
          disabled={!email.length || !password.length}
          className="login-form__submit-btn"
          type="submit"
        >
          {t("login")}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
