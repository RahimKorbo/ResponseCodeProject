import React from "react";
import { Switch, Route } from "react-router-dom";
import Homepage from "./Components/Homepage";
import Messagebreaker from "./Components/Messagebreaker";



export function Main() {
  return (
    <main>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/messageBreaker" component={Messagebreaker} />
      
      </Switch>
    </main>
  );
}