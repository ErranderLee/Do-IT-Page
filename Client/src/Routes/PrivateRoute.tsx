import { Redirect, Route } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { checkLoginSelector } from "@src/Recoil/CheckLogin";
import { ReactElement } from "react";

interface Props {
  element: ReactElement;
  path: string;
  exact?: boolean;
}

const PrivateRoute = ({
  element: Component,
  path,
  exact = false,
}: Props): JSX.Element => {
  // const user = useRecoilValue(checkLoginSelector);
  const user = true;

  return (
    <Route
      exact={exact}
      path={path}
      render={() => (user ? Component : <Redirect to="/login" />)}
    />
  );
};

export default PrivateRoute;
