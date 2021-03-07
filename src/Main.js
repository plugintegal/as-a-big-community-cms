import React, { useContext } from "react";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import AuthState from "./Context/Auth/AuthState/";
import AuthContext from "./Context/Auth/AuthContext/";

import LayoutAdminComponent from "./Components/Layouts/";
import DashboardPage from "./Pages/Dashboard/";
import LoginPage from "./Pages/Auth/Login/";

const Main = () => {
  const PrivateRoute = ({ component: Component, layout: Layout, ...rest }) => {
    const authContext = useContext(AuthContext);
    const { isAuthenticated } = authContext;
    return (
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated ? (
            <Layout {...props}>
              <Component {...props} />
            </Layout>
          ) : (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          )
        }
      />
    );
  };

  return (
    <AuthState>
      <HashRouter>
        <Switch>
          <PrivateRoute
            path="/dashboard"
            component={DashboardPage}
            layout={LayoutAdminComponent}
          />
          <Route exact path="/" component={LoginPage} />
        </Switch>
      </HashRouter>
    </AuthState>
  );
};

export default Main;
