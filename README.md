# Customer Dashboard

A full-stack customer dashboard with filtering, sorting, and detailed customer views.

## Tech Stack

### Backend
- **Node.js** with **Express.js**
- RESTful API with mock customer data
- CORS enabled for frontend communication

### Frontend
- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS** for styling
- **TanStack Query (React Query)** for data fetching
- **Lucide React** for icons

### Testing
- **Jest** and **React Testing Library**
- Unit tests for core components
- Mock API responses for testing

## Features

- ✅ Customer list with sorting and filtering
- ✅ Client-side filtering by name and status
- ✅ Column sorting (name, email, status, joined date)
- ✅ Detailed customer modal with full information
- ✅ Responsive design
- ✅ Loading states and error handling
- ✅ Unit tests for core functionality

## Project Structure

```
customer-dashboard/
├── backend/
│   ├── server.js              # Express server with customer API
│   ├── package.json
│   └── data/
│       └── customers.js       # Mock customer data
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx     # Root layout
│   │   │   ├── page.tsx       # Main customer page
│   │   │   └── globals.css    
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   │   ├── Badge.tsx
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Input.tsx
│   │   │   │   ├── Modal.tsx
│   │   │   │   ├── Select.tsx
│   │   │   │   ├── StatusDropDown.tsx
│   │   │   ├── CustomerTable.tsx
│   │   │   ├── LoadingSpinner.tsx
│   │   │   ├── CustomerModal.tsx
│   │   │   └── FilterBar.tsx
│   │   ├── hooks/
│   │   │   └── useCustomers.ts
│   │   │   └── useDebounce.ts
│   │   ├── types/
│   │   │   └── customer.ts
│   │   └── utils/
│   │       └── api.ts
│   │       └── cn.ts
│   ├── __tests__/             # Unit tests
│   ├── package.json
│   ├── tailwind.config.js
│   └── next.config.js
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js 18+ and npm installed
- Git (optional, for cloning)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install express cors
```

3. Start the backend server:
```bash
npm start
```

The API will be available at `http://localhost:3001`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

### Running Tests

In the frontend directory:
```bash
npm test
```

## API Endpoints

### GET /api/customers
Returns a list of all customers.

**Response:**
```json
[
  {
    "id": "1",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "status": "active",
    "address": "123 Main St, New York, NY 10001",
    "joined_at": "2023-01-15T09:30:00Z",
    "notes": "VIP customer with premium support"
  }
]
```

## Design Decisions

### Backend Architecture
- **Express.js**: Lightweight and simple for this mock API
- **In-memory data**: Using a JavaScript file for mock data (easily replaceable with database)
- **CORS enabled**: Allows frontend to communicate with backend during development

### Frontend Architecture
- **Next.js App Router**: Modern routing and server components
- **TanStack Query**: Excellent caching, background updates, and error handling
- **Component separation**: Logical separation of concerns (table, modal, filters)
- **TypeScript**: Type safety and better developer experience

### State Management
- **TanStack Query**: Handles server state and caching
- **Local React state**: For UI state (modals, filters, sorting)
- **No global state management**: Not needed for this simple application

### Styling Approach
- **Tailwind CSS**: Utility-first approach for rapid development
- **Responsive design**: Mobile-first approach with responsive breakpoints
- **Consistent spacing**: Using Tailwind's spacing scale
- **Accessible colors**: Good contrast ratios and color palette

### Testing Strategy
- **Unit tests**: Focus on core business logic and component behavior
- **Mock API calls**: Isolated testing without backend dependency
- **User interaction testing**: Ensuring UI responds correctly to user actions

## Performance Considerations

- **TanStack Query caching**: Reduces API calls and improves responsiveness
- **Client-side filtering/sorting**: Fast interactions without server round-trips
- **Virtualization**: Could be added for very large datasets (not implemented for simplicity)
- **Lazy loading**: Modal content only renders when opened


### Port Configuration

If you need to change ports:
- Backend: Modify the port in `backend/server.js`
- Frontend: Update the API URL in `frontend/src/utils/api.ts`

## License

This project is for demonstration purposes.