import React from "react";
import { Route, BrowserRouter, Switch, useRouteMatch } from "react-router-dom";
import LabPage from "./LabPage";
import IssuePage from "./Issue/IssuePage";

export default function LabRoutes(): JSX.Element {
  const { path } = useRouteMatch();
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={`${path}/:labId`}>
          <LabPage />
        </Route>
        <Route path={`${path}/:labId/issues/:issueNumber`}>
          <IssuePage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
