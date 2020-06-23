/** @jsx jsx */
import { jsx } from "@emotion/core";
import React, { PropsWithChildren } from "react";
import { matchPath, useHistory, useParams, useRouteMatch } from "react-router";
import { tabStyle } from "../../theme/styles";

export interface LabNavTabProps {
  route: string;
  labId: string;
}

export default function LabNavTab({
  route,
  children,
  labId,
}: PropsWithChildren<LabNavTabProps>): JSX.Element {
  const history = useHistory();
  const match = useRouteMatch(history.location.pathname);
  const doesUrlMatch =
    !!match?.path &&
    !!matchPath(match?.path, {
      path: route,
      exact: false,
      strict: false,
    });
  const resolvedRoute = route.replace(":labId", labId.toString());
  return (
    <button
      css={tabStyle(doesUrlMatch)}
      onClick={() => history.push(resolvedRoute)}
    >
      {children}
    </button>
  );
}
