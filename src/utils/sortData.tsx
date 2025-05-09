import { Domain } from "../types";

export default function sortData(sortMethod: string, data: Domain[]) {
  let sortedData: Domain[] = [];
  if (sortMethod === "alphabet") {
    sortedData = data?.slice().sort((a, b) => {
      const titleA = a.domain.toLowerCase();
      const titleB = b.domain.toLowerCase();
      return titleA.localeCompare(titleB);
    });
  } else if (sortMethod === "reverseAlphabet") {
    sortedData = data
      ?.slice()
      .sort((a, b) => {
        const titleA = a.domain.toLowerCase();
        const titleB = b.domain.toLowerCase();
        return titleA.localeCompare(titleB);
      })
      .reverse();
  } else if (sortMethod === "latest") {
    sortedData = data?.slice().sort((a, b) => {
      return Number(b.createdDate) - Number(a.createdDate);
    });
  } else if (sortMethod === "oldest") {
    sortedData = data
      ?.slice()
      .sort((a, b) => {
        return Number(b.createdDate) - Number(a.createdDate);
      })
      .reverse();
  }
  return sortedData;
}
