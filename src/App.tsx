import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import LabPage from "./views/Lab/LabPage";

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/lab/:labId">
          <LabPage />
        </Route>
        <Route path="/lab/:labId/issues/:issueId">
          <div>wow</div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
