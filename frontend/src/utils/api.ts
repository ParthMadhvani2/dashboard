import { CustomersResponse } from "../types/customer";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

class ApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = "ApiError";
  }
}

export const api = {
  async getCustomers(): Promise<CustomersResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/customers`);

      if (!response.ok) {
        throw new ApiError(
          `Failed to fetch customers: ${response.statusText}`,
          response.status
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError("Network error occurred while fetching customers");
    }
  },
};
