export interface NewExperiment {
  title: string;
  description?: string;
  terms?: string;
  endDate?: string;
}

export interface Experiment {
  state: ExperimentState;
  title: string;
  description: string;
  terms: string;
  number: number;
  created: string;
  endDate: string;
  url: string;
}

export interface ExperimentEdits {
  state?: ExperimentState;
  title?: string;
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
