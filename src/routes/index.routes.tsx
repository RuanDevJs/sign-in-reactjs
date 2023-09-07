import { useContext } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { AuthContext } from "../context/Auth";

import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";
import { Finish } from "../pages/Finish";
import { Home } from "../pages/Home";
import Loading from "../components/Lodaing";

export function Router() {
  const { authUser, loadingAuthUser } = useContext(AuthContext);

  if (loadingAuthUser) {
    return <Loading />;
  }

  function PrivateRoutes() {
    return !loadingAuthUser && authUser && authUser._id ? (
      <Outlet />
    ) : (
      <Navigate to="/sign-in" />
    );
  }

  return (
    <Routes>
      <Route element={<SignIn />} path="/sign-in" />
      <Route element={<SignUp />} path="/sign-up" />
      <Route element={<PrivateRoutes />}>
        <Route element={<Home />} path="/" />
        <Route element={<Finish />} path="/finish" />
      </Route>
      <Route element={<Navigate to="/" />} path="*" />
    </Routes>
  );
}
