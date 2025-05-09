import { Domain } from "../types";

export default function searchData(term: string, data: Domain[]) {
  return data?.filter((item: Domain) => item.domain.includes(term));
}
