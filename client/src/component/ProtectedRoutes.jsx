import { Navigate } from "react-router-dom";

export const ProtectedRoutes = (props) => {
  if (localStorage.getItem("user")) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
};
