import { useState } from "react";
const useProvideAuth = () => {
  const [user, setUser] = useState(() => {
    const locData = JSON.parse(localStorage.getItem("authData"));
    const authData = { ...locData };
    return authData || {};
  });

  const signin = (cb) => {
    console.log(cb);
    setUser(cb);
  };

  const signout = (cb) => {
    setUser(null);
  };

  return {
    user,
    signin,
    signout,
  };
};
export default useProvideAuth;
