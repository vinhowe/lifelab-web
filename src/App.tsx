import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import LabRoutes from "./pages/Lab/LabRoutes";

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/labs/:labId">
          <LabRoutes />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
