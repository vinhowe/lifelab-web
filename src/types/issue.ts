export interface NewIssue {
  title: string;
  description?: string;
}

export interface Issue {
  state: IssueState;
  title: string;
  description: string;
  number: number;
  id: number;
  created: string;
  url: string;
}

export interface IssueEdits {
  state?: IssueState;
  title?: string;
  description?: string;
}

export enum IssueState {
  OPEN = "OPEN",
  CLOSED = "CLOSED",
}

export const initialNewIssue: NewIssue = {
  title: "",
};

export interface CheckIn {
  complete: boolean;
  experiments: string[];
  number: number;
  retrospective: string;
  created: string;
  url: string;
}

export interface CheckInEdits {
  complete?: boolean;
  retrospective?: string;
}
