import { Route, Navigate } from "react-router-dom";
import useAuth from "../../auth/useAuth";

const StartPage = ({ children, ...rest }) => {
  let auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          <Navigate
            to={{
              pathname: "/gidonu_web/admin",
              state: { from: location },
            }}
          />
        ) : (
          <Navigate
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
export default StartPage;
