import { Input } from "antd";
import { useEffect, useState } from "react";
import { Domain } from "../types";

const { Search } = Input;

export default function SearchDomain({ data, formatData }: any) {
  const [term, setTerm] = useState("");
  useEffect(() => {
    formatData(searchData());
  }, [term]);

  const searchData = () => {
    
    return data?.filter((item: Domain) => item.domain.includes(term));
  };
  return (
    <Search
      placeholder="EX: amsanei.github.io"
      value={term}
      onChange={(e) => setTerm(e.target.value)}
    />
  );
}
