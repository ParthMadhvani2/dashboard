import React from "react";
import { Customer } from "../types/customer";
import { Calendar, Mail, MapPin, FileText } from "lucide-react";
import { Modal } from "./ui/Modal";
import { Badge } from "./ui/Badge";

interface CustomerModalProps {
  customer: Customer | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CustomerModal: React.FC<CustomerModalProps> = ({
  customer,
  isOpen,
  onClose,
}) => {
  if (!customer) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Customer Details">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {customer.name}
            </h2>
            <p className="text-gray-600 mt-1">ID: {customer.id}</p>
          </div>
          <Badge variant={customer.status}>
            {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
          </Badge>
        </div>

        {/* Contact Information */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Mail className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-700">Email</p>
              <a
                href={`mailto:${customer.email}`}
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                {customer.email}
              </a>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-700">Address</p>
              <p className="text-gray-900">{customer.address}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Calendar className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-700">Joined</p>
              <p className="text-gray-900">{formatDate(customer.joined_at)}</p>
            </div>
          </div>
        </div>

        {/* Notes */}
        {customer.notes && (
          <div className="border-t pt-4">
            <div className="flex items-start space-x-3">
              <FileText className="h-5 w-5 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-700 mb-2">Notes</p>
                <p className="text-gray-900 text-sm leading-relaxed">
                  {customer.notes}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="border-t pt-4 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            Close
          </button>
          <button
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            disabled
            title="Edit functionality coming soon"
          >
            Edit Customer
          </button>
        </div>
      </div>
    </Modal>
  );
};
