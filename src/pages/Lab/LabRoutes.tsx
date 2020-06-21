import React from "react";
import { Route, BrowserRouter, Switch, useRouteMatch } from "react-router-dom";
import LabPage from "./LabPage";
import LabIssuePage from "./Issue/LabIssuePage";

export default function LabRoutes(): JSX.Element {
  const { url, path } = useRouteMatch();
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={`${path}/:labId`}>
          <LabPage />
        </Route>
        <Route path={`${path}/:labId/issues/:issueNumber`}>
          <LabIssuePage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
