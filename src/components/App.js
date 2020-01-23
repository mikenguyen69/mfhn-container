import React from "react";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import Login from "./Auth/Login";
import ForgotPassword from "./Auth/ForgotPassword";
import firebase, {FirebaseContext} from "../firebase";
import useAuth from "./Auth/useAuth";
import AppHeader from './AppHeader';
import MicroFrontend from './MicroFrontend';

const {
  REACT_APP_SEARCH_HOST: searchHost,
  REACT_APP_LINK_HOST: linkHost,
} = process.env;

const Search = ({ history }) => (
  <MicroFrontend history={history} host={searchHost} name="Browse" />
);
const Link = ({ history }) => (
  <MicroFrontend history={history} host={linkHost} name="Link" />
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
              <Route exact path="/create" component={Link} />
              <Route path="/login" component={Login} />
              <Route path="/forgot" component={ForgotPassword} />
              <Route exact path="/search" component={Search} />
              <Route exact path="/top" component={Search} />
              <Route exact path="/new/:page" component={Search} />
              <Route exact path="/link/:linkId" component={Link} />
            </Switch>     
          </div>
        </div>
      </FirebaseContext.Provider>
    </BrowserRouter>
  )
};

export default App;
