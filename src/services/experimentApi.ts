import axios from "axios";
import { API_ROOT } from "./commonApi";
import {
  Experiment,
  ExperimentEdits,
  NewExperiment,
} from "../types/experiment";

export async function getExperiments(labId: number): Promise<Experiment[]> {
  // TODO: Abstract error handling here
  return (
    await axios.get(
      `${API_ROOT(window.location.hostname)}/dev/labs/${labId}/experiments/`
    )
  ).data;
}

export async function getExperiment(
  labId: number,
  experimentNumber: number
): Promise<Experiment> {
  // TODO: Abstract error handling here
  return (
    await axios.get(
      `${API_ROOT(
        window.location.hostname
      )}/dev/labs/${labId}/experiments/${experimentNumber}/`
    )
  ).data;
}

export async function updateExperiment(
  labId: number,
  experimentNumber: number,
  edits?: ExperimentEdits
): Promise<Experiment> {
  // TODO: Abstract error handling here
  return (
    await axios.patch(
      `${API_ROOT(
        window.location.hostname
      )}/dev/labs/${labId}/experiments/${experimentNumber}/`,
      edits,
      {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      }
    )
  ).data;
}

export async function createExperiment(
  labId: number,
  experiment: NewExperiment
): Promise<Experiment> {
  return (
    await axios.post(
      `${API_ROOT(
        window.location.hostname
      )}/dev/labs/${labId}/experiments/`,
      experiment
    )
  ).data;
}
