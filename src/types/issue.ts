import { ApiObject } from "./api";

export interface NewIssue {
  title: string;
  description?: string;
}

export interface Issue extends ApiObject {
  state: IssueState;
  title: string;
  description: string;
  number: number;
  id: number;
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

export const initialNewIssue: NewIssue = {
  title: "",
};

export interface CheckIn extends ApiObject {
  complete: boolean;
  experiments: string[];
  number: number;
  retrospective: string;
  created: string;
}

export interface CheckInEdits {
  complete?: boolean;
  retrospective?: string;
}
