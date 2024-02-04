import React, { createContext, useEffect, useState } from "react";

export const CurrentLoginContext = createContext();

const testLoginInfo = {
  userUid: "12345",
  userGroup: "admin",
  userLevel: "admin",
};
export const CurrentLoginProvider = ({ children }) => {
  const [loginInfo, setLoginInfo] = useState({ ...testLoginInfo });

  return (
    <CurrentLoginContext.Provider value={{ loginInfo, setLoginInfo }}>
      {children}
    </CurrentLoginContext.Provider>
  );
};
