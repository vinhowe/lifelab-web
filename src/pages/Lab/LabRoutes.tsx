import React from "react";
import {
  Route,
  Switch,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import LabPage from "./LabPage";
import IssueDetailPage from "./Issue/IssueDetailPage";
import NewIssuePage from "./Issue/NewIssuePage";
import IssueListPage from "./Issue/LabIssuesListPage";
import LabNav from "../../components/LabNav/LabNav";
import PageWidth from "../../components/PageWidth";
import ExperimentsListPage from "./Experiment/ExperimentsListPage";
import ExperimentDetailPage from "./Experiment/ExperimentDetailPage";
import NewExperimentPage from "./Experiment/NewExperimentPage";
import CheckInTodayPage from "./CheckIn/CheckInTodayPage";

export default function LabRoutes(): JSX.Element {
  const { path } = useRouteMatch();
  const { labId } = useParams();
  return (
    <>
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
        <Route path={`${path}/checkin`}>
          <CheckInTodayPage />
        </Route>
        <Route path={`${path}/issues/:issueNumber`}>
          <IssueDetailPage />
        </Route>
        <Route exact path={`${path}/experiments`}>
          <ExperimentsListPage />
        </Route>
        <Route path={`${path}/experiments/new`}>
          <NewExperimentPage />
        </Route>
        <Route path={`${path}/experiments/:experimentNumber`}>
          <ExperimentDetailPage />
        </Route>
      </Switch>
    </>
  );
}
