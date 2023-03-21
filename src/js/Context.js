import { createContext, useState } from "react";

export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState();

  const addUser = (user) => {
    setUser(user);
  };

  const removeUser = () => {
    setUser(null);
  };
  
  return (
    <UserContext.Provider
      value={{
        user,
        addUser: (usr) => {
          addUser(usr);
        },
        removeUser: removeUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
