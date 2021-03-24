import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { clearMessage } from "./Redux/actions/message";
import { history } from "./Redux/helpers/history";

import HeaderComponent from "./Components/Layouts/Partials/Header/";
import SidebarComponent from "./Components/Layouts/Partials/Sidebar/";

import DashboardPage from "./Pages/Dashboard/";
import SquadPage from "./Pages/Squad/";

import LoginPage from "./Pages/Auth/Login/";


const Main = () => {
  const [toggleState, setToggleState] = useState(false);
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage());
    });
  }, [dispatch]);

  // const signOut = () => {
  //   dispatch(signOut());
  // };

  console.log("USER ", currentUser);
  const PrivateRoute = ({ component: Component, layout: Layout, ...rest }) => {
    return (
      <Route
        {...rest}
        render={(props) =>
          currentUser !== null ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          )
        }
      />
    );
  };

  return (
    <BrowserRouter history={history}>
      <div className="bg-gray-200">
        {currentUser && (
          <HeaderComponent
            toggle={toggleState}
            toggleChange={(value) => setToggleState(value)}
          />
        )}
        {currentUser && <SidebarComponent toggle={toggleState} />}
        <Switch>
          <Route exact path={"/login"} component={LoginPage} />
          <div
            className={
              (toggleState === false ? "ml-60" : "ml-20") +
              " overflow-hidden pt-16 pb-14 h-auto"
            }
          >
            <PrivateRoute exact path="/" component={DashboardPage} />
            <PrivateRoute exact path="/squad" component={SquadPage} />
          </div>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default Main;