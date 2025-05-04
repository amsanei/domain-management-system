type Domain = {
  id: number;
  domain: string;
  isActive: boolean;
  status: "pending" | "verified" | "rejected";
  createdDate: number;
};

export type { Domain };
