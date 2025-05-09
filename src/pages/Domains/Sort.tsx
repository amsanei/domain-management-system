import { Select } from "antd";
import React from "react";

export default function Sort({
  setSortMethod,
}: {
  setSortMethod: React.Dispatch<
    React.SetStateAction<string>
  >;
}) {
  const handleSorting = (e: string) => {
    setSortMethod(e);
  };
  return (
    <Select
      placeholder="Select sorting method"
      onChange={handleSorting}
      defaultValue="latest"
      style={{ minWidth: "180px" }}
      options={[
        { label: "Sort By (A-Z)", value: "alphabet" },
        { label: "Sort By (Z-A)", value: "reverseAlphabet" },
        { label: "Sort By (Latest)", value: "latest" },
        { label: "Sort By (Oldest)", value: "oldest" },
      ]}
    />
  );
}
