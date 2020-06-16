export interface Issue {
  state: IssueState;
  title: string;
  description: string;
  number: number;
}

export enum IssueState {
  OPEN = "OPEN",
  CLOSED = "CLOSED",
}
