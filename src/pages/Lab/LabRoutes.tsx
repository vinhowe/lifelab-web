import React from "react";
import { Route, BrowserRouter, Switch, useRouteMatch } from "react-router-dom";
import LabPage from "./LabPage";
import IssueDetailPage from "./Issue/IssueDetailPage";
import NewIssuePage from "./Issue/NewIssuePage";
import IssueListPage from "./Issue/IssuesListPage";

export default function LabRoutes(): JSX.Element {
  const { path } = useRouteMatch();
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={`${path}/:labId`}>
          <LabPage />
        </Route>
        <Route exact path={`${path}/:labId/issues`}>
          <IssueListPage />
        </Route>
        <Route path={`${path}/:labId/issues/new`}>
          <NewIssuePage />
        </Route>
        <Route path={`${path}/:labId/issues/:issueNumber`}>
          <IssueDetailPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
