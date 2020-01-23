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
              <Route path="/create" component={CreateLink} />
              <Route path="/login" component={Login} />
              <Route path="/forgot" component={ForgotPassword} />
              <Route path="/search" component={Search} />
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
