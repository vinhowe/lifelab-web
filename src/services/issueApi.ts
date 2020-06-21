import axios from "axios";
import { Issue, IssueEdits } from "../types/issue";

const API_ROOT = "http://localhost:8000";

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
