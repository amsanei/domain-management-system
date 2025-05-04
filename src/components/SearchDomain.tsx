import { Input } from "antd";
import { useEffect, useState } from "react";

const { Search } = Input;

export default function SearchDomain({ data, setTableData }: any) {
  const [term, setTerm] = useState("");
  useEffect(() => {
    setTableData(searchData());
  }, [term]);

  const searchData = () => {
    return data?.filter((item: any) => item["domin-url"].includes(term));
  };
  return <Search value={term} onChange={(e) => setTerm(e.target.value)} />;
}
