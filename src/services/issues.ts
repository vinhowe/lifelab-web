import axios from "axios";
import { Issue } from "../types/issue";

export async function getIssues(labId: number): Promise<Issue[]> {
  const issueUrls: string[] = (
    await axios.get(`http://localhost:8000/api/dev/labs/${labId}`)
  ).data.issues;
  return Promise.all(issueUrls.map(async (url) => (await axios.get(url)).data));
}
