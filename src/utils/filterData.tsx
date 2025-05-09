import { Domain } from "../types";

export default function filterData(
  filters: { isActive: string[]; status: string[] },
  data: Domain[]
) {
  return data?.filter((item: Domain) => {
    const matchesActive =
      filters.isActive?.length === 0 ||
      filters.isActive.includes(item.isActive.toString());

    const matchesStatus =
      filters.status?.length === 0 || filters.status.includes(item.status);

    return matchesActive && matchesStatus;
  });
}
