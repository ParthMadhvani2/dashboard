import React from "react";
import { Search } from "lucide-react";
import { FilterConfig } from "../types/customer";
import { Input } from "./ui/Input";
import { StatusDropdown } from "./ui/StatusDropDown";

interface FilterBarProps {
  filters: FilterConfig;
  onFiltersChange: (filters: FilterConfig) => void;
  totalCount: number;
  filteredCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFiltersChange,
  totalCount,
  filteredCount,
}) => {

  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "pending", label: "Pending" },
  ];

  const handleClearFilters = () => {
    onFiltersChange({ search: "", status: "all" });
  };
  const hasActiveFilters = filters.search || filters.status !== "all";

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end justify-between">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="relative min-w-0 flex-1 sm:max-w-xs">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Search customers..."
              value={filters.search}
              onChange={(e) =>
                onFiltersChange({ ...filters, search: e.target.value })
              }
              className="pl-10"
            />
          </div>

          <StatusDropdown
            value={filters.status}
            onChange={(newStatus) => {
              onFiltersChange({ ...filters, status: newStatus as FilterConfig["status"] });
            }}
            options={statusOptions}
            className="w-40"
          />
        </div>

        <div className="text-sm text-gray-600 whitespace-nowrap flex items-center gap-4">
          {filteredCount === totalCount ? (
            <span>{totalCount} customers</span>
          ) : (
            <span>
              {filteredCount} of {totalCount} customers
            </span>
          )}

          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className="text-blue-600 hover:text-blue-800 text-sm underline"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
