import { Select } from "antd";
import { Domain } from "../types";

export default function Sort({
  data,
  formatData,
}: {
  data: Domain[];
  formatData: (data: Domain[]) => void;
}) {
  const handleSorting = (e: string) => {
    console.log(e);

    let sortedData: Domain[] = [];
    if (e === "alphabet") {
      sortedData = data.slice().sort((a, b) => {
        const titleA = a.domain.toLowerCase();
        const titleB = b.domain.toLowerCase();
        return titleA.localeCompare(titleB);
      });
    } else if (e === "reverseAlphabet") {
      sortedData = data
        .slice()
        .sort((a, b) => {
          const titleA = a.domain.toLowerCase();
          const titleB = b.domain.toLowerCase();
          return titleA.localeCompare(titleB);
        })
        .reverse();
    } else if (e === "latest") {
      sortedData = data.slice().sort((a, b) => {
        return (
          new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
        );
      });
    } else if (e === "oldest") {
      sortedData = data
        .slice()
        .sort((a, b) => {
          return (
            new Date(b.createdDate).getTime() -
            new Date(a.createdDate).getTime()
          );
        })
        .reverse();
    }

    formatData(sortedData);
  };
  return (
    <Select
      placeholder="Select sorting method"
      onChange={handleSorting}
      defaultValue="latest"
      options={[
        { label: "Sort By (A-Z)", value: "alphabet" },
        { label: "Sort By (Z-A)", value: "reverseAlphabet" },
        { label: "Sort Bay (Latest)", value: "latest" },
        { label: "Sort Bay (Oldest)", value: "oldest" },
      ]}
    />
  );
}
