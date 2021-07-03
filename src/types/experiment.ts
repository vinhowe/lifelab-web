import { ApiObject } from "./api";

export interface NewExperiment {
  title: string;
  description?: string;
  terms?: string;
  endDate?: string;
}

export interface Experiment extends ApiObject {
  state: ExperimentState;
  title: string;
  description: string;
  terms: string;
  number: number;
  created: string;
  endDate: string;
}

export interface ExperimentEdits {
  state?: ExperimentState;
  title?: string;
  endDate?: string;
  description?: string;
  terms?: string;
}

export enum ExperimentState {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  COMMITTED = "COMMITTED",
}

export const initialNewExperiment: NewExperiment = {
  title: "",
  terms: "",
};
