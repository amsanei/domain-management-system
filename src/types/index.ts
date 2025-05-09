import { ReactNode } from "react";

type Domain = {
  id: number;
  domain: string;
  isActive: boolean;
  status: "pending" | "verified" | "rejected";
  createdDate: number;
};

type DomainFormFieldType = {
  domain?: string;
  isActive?: boolean;
  status?: string;
};

type TableData = {
  key: number;
  id: number;
  domainUrl: string;
  domain: ReactNode;
  createdDate: ReactNode;
  isActive: ReactNode;
  status: ReactNode;
  isVerified: boolean;
};

export type { Domain, TableData, DomainFormFieldType };
