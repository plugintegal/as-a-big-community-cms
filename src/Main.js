import React, { useState, useEffect, Fragment } from "react";
import {
  BrowserRouter as Router,
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
import DetailSquadPage from "./Pages/Squad/DetailSquad";

import TheoryPage from "./Pages/Theory/";
import CreateNewDataTheory from "./Components/Theory/CreateNewData";
import DetailTheoryPages from './Pages/Theory/DetailTheory';
import UpdateDataTheoryPage from './Pages/Theory/UpdateDataTheoryPage';

import UserPage from "./Pages/Users/";
import CreateNewDataUserPage from "./Pages/Users/CreateNewDataUser";

import LoginPage from "./Pages/Auth/Login/";
import ForbiddenPages from './Pages/Forbidden/'

const Main = (props) => {
  console.log("Main Props ", props);
  const [toggleState, setToggleState] = useState(false);
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage());
    });
  }, [dispatch]);

  const AdminRoute = ({ component: Component, layout: Layout, ...rest }) => {
    return (
      <Route
        {...rest}
        render={(props) =>
          currentUser !== null && currentUser.roles === 'Admin'? (
            <Component {...props} />
          ) : currentUser !== null && currentUser.roles !== 'Admin'? (
            <Redirect
              to={{ pathname: "/forbidden"}}
            />
          ) : (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          )
        }
      />
    );
  };

  const PrivateRoute = ({component: Component, layout: Layout, ...rest}) => {
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
  }

  return (
    <Router history={history}>
      <div className="bg-gray-200">
        {currentUser && (
          <HeaderComponent
            toggle={toggleState}
            toggleChange={(value) => setToggleState(value)}
          />
        )}
        {currentUser && <SidebarComponent toggle={toggleState} />}
        <Switch>
          <Fragment>
            <Route exact path={"/login"} component={LoginPage} />
            <div
              className={
                (toggleState === false ? "ml-60" : "ml-20") +
                " overflow-hidden pt-16 pb-14 h-auto"
              }
            >
              <PrivateRoute exact path="/" component={DashboardPage} />
              <AdminRoute exact path="/squad" component={SquadPage} />
              <AdminRoute
                exact
                path="/squad/:name"
                component={DetailSquadPage}
              />
              <PrivateRoute exact path="/theory" component={TheoryPage} />
              <PrivateRoute
                exact
                path="/theory-create"
                component={CreateNewDataTheory}
              />
              <PrivateRoute path="/theory-detail/:name" component={DetailTheoryPages} />
              <PrivateRoute path="/edit/:name" component={UpdateDataTheoryPage} />

              <AdminRoute path="/user" component={UserPage} />
              <AdminRoute
                path="/user-create"
                component={CreateNewDataUserPage}
              />
              <Route path="/forbidden" component={ForbiddenPages}/>
            </div>
          </Fragment>
        </Switch>
      </div>
    </Router>
  );
};

export default Main;
