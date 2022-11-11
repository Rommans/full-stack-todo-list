import React, { useState, useContext, createContext } from "react";
import { Toast } from "react-bootstrap";

const useNotificationsContext = createContext({});

const initialState = { message: undefined, level: undefined };

export function UseNotificationsProvider({ children }) {
  const [notifications, setNotifications] = useState(initialState);

  return (
    <useNotificationsContext.Provider
      value={{
        success: (params) =>
          setNotifications({
            message: params.message,
            level: "Success",
          }),
        error: (params) =>
          setNotifications({
            message: params.message,
            level: "Error",
          }),
      }}
    >
      {children}
      <Toast
        onClose={() => setNotifications(initialState)}
        show={!!notifications.message}
        delay={2000}
        autohide
      >
        <Toast.Header>
          <strong className="me-auto">{notifications.level}</strong>
        </Toast.Header>
        <Toast.Body>{notifications.message}</Toast.Body>
      </Toast>
    </useNotificationsContext.Provider>
  );
}

export default function useNotifications() {
  return useContext(useNotificationsContext);
}