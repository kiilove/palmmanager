import React, { createContext, useEffect, useState } from "react";

export const CurrentLoginContext = createContext();

const testLoginInfo = {
  userUid: "12345",
  userGroup: "admin",
  userLevel: "admin",
  compName: "제이앤코어",
  userName: "테스트맨",
};
export const CurrentLoginProvider = ({ children }) => {
  const [loginInfo, setLoginInfo] = useState({});

  return (
    <CurrentLoginContext.Provider value={{ loginInfo, setLoginInfo }}>
      {children}
    </CurrentLoginContext.Provider>
  );
};
