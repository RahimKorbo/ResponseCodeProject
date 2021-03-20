import React from "react";
import { Switch, Route } from "react-router-dom";
import Homepage from "./Components/Homepage";



export function Main() {
  return (
    <main>
      <Switch>
        <Route exact path="/" component={Homepage} />
      
      </Switch>
    </main>
  );
}