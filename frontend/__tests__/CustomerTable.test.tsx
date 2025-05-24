import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CustomerTable } from '../src/components/CustomerTable';

const mockCustomers = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    status: 'active' as const,
    address: '123 Main St',
    joined_at: '2024-01-15T08:30:00Z',
    notes: 'Test notes for Alice'
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob@example.com',
    status: 'inactive' as const,
    address: '456 Oak Ave',
    joined_at: '2023-11-22T14:15:00Z',
    notes: 'Test notes for Bob'
  },
  {
    id: '3',
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    status: 'pending' as const,
    address: '789 Pine St',
    joined_at: '2024-02-10T10:45:00Z',
    notes: 'Test notes for Charlie'
  }
];

describe('CustomerTable', () => {
  const defaultProps = {
    customers: mockCustomers,
    filters: { search: '', status: 'all' as const },
    onRowClick: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders customer data correctly', () => {
      render(<CustomerTable {...defaultProps} />);
      
      expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
      expect(screen.getByText('alice@example.com')).toBeInTheDocument();
      expect(screen.getByText('Bob Smith')).toBeInTheDocument();
      expect(screen.getByText('bob@example.com')).toBeInTheDocument();
      expect(screen.getByText('Charlie Brown')).toBeInTheDocument();
      expect(screen.getByText('charlie@example.com')).toBeInTheDocument();
    });

    it('renders table headers correctly', () => {
      render(<CustomerTable {...defaultProps} />);
      
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(screen.getByText('Status')).toBeInTheDocument();
      expect(screen.getByText('Joined')).toBeInTheDocument();
    });

    it('renders status badges correctly', () => {
      render(<CustomerTable {...defaultProps} />);
      
      expect(screen.getByText('Active')).toBeInTheDocument();
      expect(screen.getByText('Inactive')).toBeInTheDocument();
      expect(screen.getByText('Pending')).toBeInTheDocument();
    });

    it('formats dates correctly', () => {
      render(<CustomerTable {...defaultProps} />);
      
      expect(screen.getByText('Jan 15, 2024')).toBeInTheDocument();
      expect(screen.getByText('Nov 22, 2023')).toBeInTheDocument();
      expect(screen.getByText('Feb 10, 2024')).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('handles row clicks', () => {
      const onRowClick = jest.fn();
      render(<CustomerTable {...defaultProps} onRowClick={onRowClick} />);
      
      const firstRow = screen.getByText('Alice Johnson').closest('tr');
      fireEvent.click(firstRow!);
      
      expect(onRowClick).toHaveBeenCalledWith(mockCustomers[0]);
      expect(onRowClick).toHaveBeenCalledTimes(1);
    });

    it('handles keyboard navigation', () => {
      const onRowClick = jest.fn();
      render(<CustomerTable {...defaultProps} onRowClick={onRowClick} />);
      
      const firstRow = screen.getByText('Alice Johnson').closest('tr');
      fireEvent.keyDown(firstRow!, { key: 'Enter' });
      
      expect(onRowClick).toHaveBeenCalledWith(mockCustomers[0]);
    });

    it('handles space key for row selection', () => {
      const onRowClick = jest.fn();
      render(<CustomerTable {...defaultProps} onRowClick={onRowClick} />);
      
      const firstRow = screen.getByText('Alice Johnson').closest('tr');
      fireEvent.keyDown(firstRow!, { key: ' ' });
      
      expect(onRowClick).toHaveBeenCalledWith(mockCustomers[0]);
    });
  });

  describe('Sorting', () => {
    it('sorts customers by name ascending by default', () => {
      render(<CustomerTable {...defaultProps} />);
      
      const rows = screen.getAllByRole('row');
      // Skip header row (index 0)
      expect(rows[1]).toHaveTextContent('Alice Johnson');
      expect(rows[2]).toHaveTextContent('Bob Smith');
      expect(rows[3]).toHaveTextContent('Charlie Brown');
    });

    it('sorts customers by name descending when clicked twice', () => {
      render(<CustomerTable {...defaultProps} />);
      
      const nameHeader = screen.getByText('Name').closest('button');
      fireEvent.click(nameHeader!); // First click for asc
      fireEvent.click(nameHeader!); // Second click for desc
      
      const rows = screen.getAllByRole('row');
      expect(rows[1]).toHaveTextContent('Charlie Brown');
      expect(rows[2]).toHaveTextContent('Bob Smith');
      expect(rows[3]).toHaveTextContent('Alice Johnson');
    });

    it('sorts customers by email', () => {
      render(<CustomerTable {...defaultProps} />);
      
      const emailHeader = screen.getByText('Email').closest('button');
      fireEvent.click(emailHeader!);
      
      const rows = screen.getAllByRole('row');
      expect(rows[1]).toHaveTextContent('alice@example.com');
      expect(rows[2]).toHaveTextContent('bob@example.com');
      expect(rows[3]).toHaveTextContent('charlie@example.com');
    });

    it('sorts customers by status', () => {
      render(<CustomerTable {...defaultProps} />);
      
      const statusHeader = screen.getByText('Status').closest('button');
      fireEvent.click(statusHeader!);
      
      const rows = screen.getAllByRole('row');
      expect(rows[1]).toHaveTextContent('Active');
      expect(rows[2]).toHaveTextContent('Inactive');
      expect(rows[3]).toHaveTextContent('Pending');
    });

    it('sorts customers by joined date', () => {
      render(<CustomerTable {...defaultProps} />);
      
      const joinedHeader = screen.getByText('Joined').closest('button');
      fireEvent.click(joinedHeader!);
      
      const rows = screen.getAllByRole('row');
      expect(rows[1]).toHaveTextContent('Nov 22, 2023');
      expect(rows[2]).toHaveTextContent('Jan 15, 2024');
      expect(rows[3]).toHaveTextContent('Feb 10, 2024');
    });
  });

  describe('Filtering', () => {
    it('filters customers by search term in name', () => {
      const props = {
        ...defaultProps,
        filters: { search: 'Alice', status: 'all' as const }
      };
      
      render(<CustomerTable {...props} />);
      
      expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
      expect(screen.queryByText('Bob Smith')).not.toBeInTheDocument();
      expect(screen.queryByText('Charlie Brown')).not.toBeInTheDocument();
    });

    it('filters customers by search term in email', () => {
      const props = {
        ...defaultProps,
        filters: { search: 'bob@example', status: 'all' as const }
      };
      
      render(<CustomerTable {...props} />);
      
      expect(screen.getByText('Bob Smith')).toBeInTheDocument();
      expect(screen.queryByText('Alice Johnson')).not.toBeInTheDocument();
      expect(screen.queryByText('Charlie Brown')).not.toBeInTheDocument();
    });

    it('filters customers by status', () => {
      const props = {
        ...defaultProps,
        filters: { search: '', status: 'active' as const }
      };
      
      render(<CustomerTable {...props} />);
      
      expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
      expect(screen.queryByText('Bob Smith')).not.toBeInTheDocument();
      expect(screen.queryByText('Charlie Brown')).not.toBeInTheDocument();
    });

    it('filters customers by inactive status', () => {
      const props = {
        ...defaultProps,
        filters: { search: '', status: 'inactive' as const }
      };
      
      render(<CustomerTable {...props} />);
      
      expect(screen.getByText('Bob Smith')).toBeInTheDocument();
      expect(screen.queryByText('Alice Johnson')).not.toBeInTheDocument();
      expect(screen.queryByText('Charlie Brown')).not.toBeInTheDocument();
    });

    it('filters customers by pending status', () => {
      const props = {
        ...defaultProps,
        filters: { search: '', status: 'pending' as const }
      };
      
      render(<CustomerTable {...props} />);
      
      expect(screen.getByText('Charlie Brown')).toBeInTheDocument();
      expect(screen.queryByText('Alice Johnson')).not.toBeInTheDocument();
      expect(screen.queryByText('Bob Smith')).not.toBeInTheDocument();
    });

    it('combines search and status filters', () => {
      const props = {
        ...defaultProps,
        filters: { search: 'example.com', status: 'active' as const }
      };
      
      render(<CustomerTable {...props} />);
      
      expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
      expect(screen.queryByText('Bob Smith')).not.toBeInTheDocument();
      expect(screen.queryByText('Charlie Brown')).not.toBeInTheDocument();
    });
  });

  describe('Empty State', () => {
    it('shows empty state when no customers match filters', () => {
      const props = {
        ...defaultProps,
        filters: { search: 'nonexistent', status: 'all' as const }
      };
      
      render(<CustomerTable {...props} />);
      
      expect(screen.getByText('No customers found')).toBeInTheDocument();
      expect(screen.getByText('Try adjusting your search or filter criteria.')).toBeInTheDocument();
    });

    it('shows empty state when no customers provided', () => {
      const props = {
        ...defaultProps,
        customers: []
      };
      
      render(<CustomerTable {...props} />);
      
      expect(screen.getByText('No customers found')).toBeInTheDocument();
      expect(screen.getByText('No customers available at the moment.')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA labels for rows', () => {
      render(<CustomerTable {...defaultProps} />);
      
      const firstRow = screen.getByLabelText('View details for Alice Johnson');
      expect(firstRow).toBeInTheDocument();
    });

    it('has proper tabIndex for keyboard navigation', () => {
      render(<CustomerTable {...defaultProps} />);
      
      const rows = screen.getAllByRole('button').filter(button => 
        button.getAttribute('aria-label')?.includes('View details for')
      );
      
      rows.forEach(row => {
        expect(row).toHaveAttribute('tabIndex', '0');
      });
    });

    it('has proper role attributes', () => {
      render(<CustomerTable {...defaultProps} />);
      
      const tableRows = screen.getAllByRole('button').filter(button => 
        button.getAttribute('aria-label')?.includes('View details for')
      );
      
      expect(tableRows).toHaveLength(3);
    });
  });
});