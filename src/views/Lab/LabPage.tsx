import React from "react";
import IssuesList from "./IssuesList";
import Page from "../../components/Page";

export default function LabPage(): JSX.Element {
  return (
    <Page>
      <IssuesList />
    </Page>
  );
}
