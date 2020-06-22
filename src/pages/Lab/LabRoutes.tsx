import React from "react";
import { Route, BrowserRouter, Switch, useRouteMatch, useParams } from "react-router-dom";
import LabPage from "./LabPage";
import IssueDetailPage from "./Issue/IssueDetailPage";
import NewIssuePage from "./Issue/NewIssuePage";
import IssueListPage from "./Issue/IssuesListPage";
import PageWidth from "../../components/PageWidth";
import { jsx } from "@emotion/core";

export default function LabRoutes(): JSX.Element {
  const { path } = useRouteMatch();
  const { labId } = useParams();
  return (
    <>
      <PageWidth>
        <h1>Lab #{labId}</h1>
      </PageWidth>
      <BrowserRouter>
        <Switch>
          <Route exact path={`${path}/`}>
            <LabPage />
          </Route>
          <Route exact path={`${path}/issues`}>
            <IssueListPage />
          </Route>
          <Route path={`${path}/issues/new`}>
            <NewIssuePage />
          </Route>
          <Route path={`${path}/issues/:issueNumber`}>
            <IssueDetailPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}
