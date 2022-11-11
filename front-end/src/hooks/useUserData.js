import React, { createContext, useState, useContext, useEffect } from "react";

import { useAuth } from "./useAuth";
import useApi from "./useApi";

const userDataContext = createContext({});

export const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState(undefined);

  const api = useApi();
  const auth = useAuth();

  useEffect(() => {
    if (auth.accessToken) {
      getUser();
    }
  }, [auth]);

  const getUser = async () => {
    const user = await api.me();
    setUserData(user);
  };

  if (auth.accessToken && !userData) {
    return <div>Loading...</div>;
  }

  return (
    <userDataContext.Provider value={userData}>
      {children}
    </userDataContext.Provider>
  );
};

export default function useUserData() {
  return useContext(userDataContext);
}