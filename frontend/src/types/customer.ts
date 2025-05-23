export interface Customer {
  id: string;
  name: string;
  email: string;
  status: "active" | "inactive" | "pending";
  address: string;
  joined_at: string;
  notes: string;
}

export interface CustomersResponse {
  customers: Customer[];
}

export type SortField = "name" | "email" | "status" | "joined_at";
export type SortDirection = "asc" | "desc";

export interface SortConfig {
  field: SortField;
  direction: SortDirection;
}

export interface FilterConfig {
  search: string;
  status: "all" | Customer["status"];
}
