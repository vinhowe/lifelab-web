export interface Issue {
  state: IssueState;
  title: string;
  description: string;
  number: number;
  created: string;
}

export enum IssueState {
  OPEN = "OPEN",
  CLOSED = "CLOSED",
}
