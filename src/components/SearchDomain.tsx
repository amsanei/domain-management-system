import { Input } from "antd";
import { useEffect, useState } from "react";
import { Domain } from "../types";
import { useGetDomainsQuery } from "../state/domains/domainsApiSlice";

const { Search } = Input;

export default function SearchDomain({
  callBack,
}: {
  callBack: (data: Domain[]) => void;
}) {
  const { data } = useGetDomainsQuery();
  const [term, setTerm] = useState("");
  useEffect(() => {
    const results = searchData()
    if(results)
      callBack(results);
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
