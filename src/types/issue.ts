export interface Issue {
  state: IssueState;
  title: string;
  description: string;
  number: number;
  created: string;
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
