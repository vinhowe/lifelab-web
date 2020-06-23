import React from "react";
import {
  Route,
  BrowserRouter,
  Switch,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import LabPage from "./LabPage";
import IssueDetailPage from "./Issue/IssueDetailPage";
import NewIssuePage from "./Issue/NewIssuePage";
import IssueListPage from "./Issue/IssuesListPage";
import LabNav from "../../components/LabNav/LabNav";
import PageWidth from "../../components/PageWidth";

export default function LabRoutes(): JSX.Element {
  const { path } = useRouteMatch();
  const { labId } = useParams();
  return (
    <>
      <BrowserRouter>
        <PageWidth>
          <LabNav labId={labId} />
        </PageWidth>
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
