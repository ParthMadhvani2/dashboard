import React, { useMemo, useState } from "react";
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";
import { Badge } from "./ui/Badge";
import {
  Customer,
  SortConfig,
  SortField,
  FilterConfig,
} from "../types/customer";

interface CustomerTableProps {
  customers: Customer[];
  filters: FilterConfig;
  onRowClick: (customer: Customer) => void;
}

export const CustomerTable: React.FC<CustomerTableProps> = ({
  customers,
  filters,
  onRowClick,
}) => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: "name",
    direction: "asc",
  });

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
    const matchesSearch = !filters.search || [
      customer.name,
      customer.email,
      customer.status,
      new Date(customer.joined_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    ]
      .join(" ")
      .toLowerCase()
      .includes(filters.search.toLowerCase());

      const matchesStatus =
        filters.status === "all" || customer.status === filters.status;

      return matchesSearch && matchesStatus;
    });
  }, [customers, filters]);

  const sortedCustomers = useMemo(() => {
    const sorted = [...filteredCustomers].sort((a, b) => {
      const aValue = a[sortConfig.field];
      const bValue = b[sortConfig.field];

      if (sortConfig.field === "joined_at") {
        const aDate = new Date(aValue).getTime();
        const bDate = new Date(bValue).getTime();
        return sortConfig.direction === "asc" ? aDate - bDate : bDate - aDate;
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        const comparison = aValue.localeCompare(bValue);
        return sortConfig.direction === "asc" ? comparison : -comparison;
      }

      return 0;
    });

    return sorted;
  }, [filteredCustomers, sortConfig]);

  const handleSort = (field: SortField) => {
    setSortConfig((prev) => ({
      field,
      direction:
        prev.field === field && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const getSortIcon = (field: SortField) => {
    if (sortConfig.field !== field) {
      return <ChevronsUpDown className="h-4 w-4" />;
    }
    return sortConfig.direction === "asc" ? (
      <ChevronUp className="h-4 w-4" />
    ) : (
      <ChevronDown className="h-4 w-4" />
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (sortedCustomers.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 text-gray-400">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
              />
            </svg>
          </div>
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No customers found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {filters.search || filters.status !== "all"
              ? "Try adjusting your search or filter criteria."
              : "No customers available at the moment."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort("name")}
                  className="flex items-center space-x-1 hover:text-gray-700 focus:outline-none focus:text-gray-700"
                >
                  <span>Name</span>
                  {getSortIcon("name")}
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort("email")}
                  className="flex items-center space-x-1 hover:text-gray-700 focus:outline-none focus:text-gray-700"
                >
                  <span>Email</span>
                  {getSortIcon("email")}
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort("status")}
                  className="flex items-center space-x-1 hover:text-gray-700 focus:outline-none focus:text-gray-700"
                >
                  <span>Status</span>
                  {getSortIcon("status")}
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort("joined_at")}
                  className="flex items-center space-x-1 hover:text-gray-700 focus:outline-none focus:text-gray-700"
                >
                  <span>Joined</span>
                  {getSortIcon("joined_at")}
                </button>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedCustomers.map((customer) => (
              <tr
                key={customer.id}
                onClick={() => onRowClick(customer)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onRowClick(customer);
                  }
                }}
                className="hover:bg-gray-50 cursor-pointer transition-colors focus:outline-none focus:bg-blue-50 focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                tabIndex={0}
                role="button"
                aria-label={`View details for ${customer.name}`}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {customer.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{customer.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge variant={customer.status}>
                    {customer.status.charAt(0).toUpperCase() +
                      customer.status.slice(1)}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatDate(customer.joined_at)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
