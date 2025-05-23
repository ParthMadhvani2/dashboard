"use client";

import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Users, AlertCircle, RefreshCw } from "lucide-react";
import { useCustomers } from "../hooks/useCustomers";
import { CustomerTable } from "../components/CustomerTable";
import { CustomerModal } from "../components/CustomerModal";
import { FilterBar } from "../components/FilterBar";
import { TableSkeleton } from "../components/LoadingSpinner";
import { Button } from "../components/ui/Button";
import { Customer, FilterConfig } from "../types/customer";
import { useDebounce } from "../hooks/useDebounce";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function CustomerDashboard() {
  const { data, isLoading, error, refetch, isRefetching } = useCustomers();
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState<FilterConfig>({
    search: "",
    status: "all",
  });

  const debouncedSearch = useDebounce(filters.search, 300);
  const debouncedFilters = { ...filters, search: debouncedSearch };
  const customers = data?.customers || [];

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      !filters.search ||
      customer.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      customer.email.toLowerCase().includes(filters.search.toLowerCase());

    const matchesStatus =
      filters.status === "all" || customer.status === filters.status;

    return matchesSearch && matchesStatus;
  });

  const handleRowClick = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedCustomer(null);
  };

  const handleRefresh = () => {
    refetch();
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Failed to load customers
          </h2>
          <p className="text-gray-600 mb-4">
            {error instanceof Error
              ? error.message
              : "An unexpected error occurred"}
          </p>
          <Button onClick={handleRefresh} className="w-full">
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Customer Dashboard
                </h1>
                <p className="text-gray-600">
                  Manage and view customer information
                </p>
              </div>
            </div>
            <Button
              onClick={handleRefresh}
              disabled={isRefetching}
              variant="secondary"
              className="flex items-center space-x-2"
            >
              <RefreshCw
                className={`h-4 w-4 ${isRefetching ? "animate-spin" : ""}`}
              />
              <span>Refresh</span>
            </Button>
          </div>
        </div>

        {/* Filters */}
        {!isLoading && (
          <FilterBar
            filters={filters}
            onFiltersChange={setFilters}
            totalCount={customers.length}
            filteredCount={filteredCustomers.length}
          />
        )}

        {/* Table */}
        {isLoading ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <TableSkeleton />
          </div>
        ) : (
          <CustomerTable
            customers={customers}
            filters={debouncedFilters}
            onRowClick={handleRowClick}
          />
        )}

        {/* Modal */}
        <CustomerModal
          customer={selectedCustomer}
          isOpen={isModalOpen}
          onClose={handleModalClose}
        />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <CustomerDashboard />
    </QueryClientProvider>
  );
}
