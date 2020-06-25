import axios from "axios";
import { Issue, IssueEdits, NewIssue } from "../types/issue";
import { API_ROOT } from "./commonApi";

export async function getIssues(labId: number): Promise<Issue[]> {
  // TODO: Abstract error handling here
  return (await axios.get(`${API_ROOT}/api/dev/labs/${labId}/issues/`)).data;
}

export async function getIssue(
  labId: number,
  issueNumber: number
): Promise<Issue> {
  // TODO: Abstract error handling here
  return (
    await axios.get(`${API_ROOT}/api/dev/labs/${labId}/issues/${issueNumber}/`)
  ).data;
}

export async function updateIssue(
  labId: number,
  issueNumber: number,
  edits?: IssueEdits
): Promise<Issue> {
  // TODO: Abstract error handling here
  return (
    await axios.patch(
      `${API_ROOT}/api/dev/labs/${labId}/issues/${issueNumber}/`,
      edits
    )
  ).data;
}

export async function createIssue(
  labId: number,
  issue: NewIssue
): Promise<Issue> {
  return (await axios.post(`${API_ROOT}/api/dev/labs/${labId}/issues/`, issue))
    .data;
}
