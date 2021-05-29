import axios from "axios";
import { API_ROOT } from "./commonApi";
import { Lab, LabEdits } from "../types/lab";

export async function getLab(labId: number): Promise<Lab> {
  // TODO: Abstract error handling here
  return (
    await axios.get(`${API_ROOT(window.location.hostname)}/dev/labs/${labId}/`)
  ).data;
}

export async function updateLab(labId: number, edits?: LabEdits): Promise<Lab> {
  // TODO: Abstract error handling here
  return (
    await axios.patch(
      `${API_ROOT(window.location.hostname)}/dev/labs/${labId}/`,
      edits
    )
  ).data;
}
