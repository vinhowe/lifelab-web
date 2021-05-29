import axios from "axios";
import { API_ROOT } from "./commonApi";
import { CheckIn, CheckInEdits, Issue, IssueEdits } from "../types/issue";

export async function getCheckInToday(labId: number): Promise<CheckIn> {
  // TODO: Abstract error handling here
  return (
    await axios.get(
      `${API_ROOT(window.location.hostname)}/dev/labs/${labId}/check-ins/today/`
    )
  ).data;
}

export async function updateCheckInToday(
  labId: number,
  edits?: CheckInEdits
): Promise<CheckIn> {
  // TODO: Abstract error handling here
  return (
    await axios.patch(
      `${API_ROOT(
        window.location.hostname
      )}/dev/labs/${labId}/check-ins/today/`,
      edits
    )
  ).data;
}
