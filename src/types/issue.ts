export interface NewIssue {
  title: string;
  description: string;
}

export interface Issue {
  state: IssueState;
  title: string;
  description: string;
  number: number;
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
  description: "",
};
