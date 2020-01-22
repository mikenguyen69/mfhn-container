import React from "react";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import CreateLink from "./Link/CreateLink";
import SearchLinks from "./Link/SearchLinks";
import LinkList from "./Link/LinkList";
import LinkDetail from "./Link/LinkDetail";
import Login from "./Auth/Login";
import ForgotPassword from "./Auth/ForgotPassword";
import firebase, {FirebaseContext} from "../firebase";
import useAuth from "./Auth/useAuth";
import AppHeader from './AppHeader';
import MicroFrontend from './MicroFrontend';

const {
  REACT_APP_BROWSE_HOST: browseHost,
  REACT_APP_RESTAURANT_HOST: restaurantHost,
} = process.env;

const Browse = ({ history }) => (
  <MicroFrontend history={history} host={browseHost} name="Browse" />
);
const Restaurant = ({ history }) => (
  <MicroFrontend history={history} host={restaurantHost} name="Restaurant" />
);

function App() {
  const user = useAuth();

  return (
  <BrowserRouter>
      <FirebaseContext.Provider value={{user, firebase}}>
        <div className="app-container">
          <AppHeader />
          <div className="route-container">
            <Switch>
              <Route exact path="/" render={(() => <Redirect to="/new/1" /> )} /> 
              <Route path="/create" component={CreateLink} />
              <Route path="/login" component={Login} />
              <Route path="/forgot" component={ForgotPassword} />
              <Route path="/search" component={SearchLinks} />
              <Route path="/top" component={LinkList} />
              <Route path="/new/:page" component={LinkList} />
              <Route path="/link/:linkId" component={LinkDetail} />
            </Switch>     
          </div>
        </div>
      </FirebaseContext.Provider>
    </BrowserRouter>
  )
};

export default App;
