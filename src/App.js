import React from "react";
import "./App.css";
import "../node_modules/react-toastify/dist/ReactToastify.css";
import Game from "./containers/game";
import { Route, NavLink, Switch } from "react-router-dom";
const App = () => {
  return (
    <>
      <NavLink to="/Phase10_Clone/Game" activeClassName="Game">
        Game
      </NavLink>
      <Switch>
        <Route path="/">
          <Game />
        </Route>
        <Route path="/Home">
          <h2>Hello</h2>
        </Route>
      </Switch>
    </>
  );
};

export default App;
