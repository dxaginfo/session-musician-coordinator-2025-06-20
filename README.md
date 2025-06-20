# Session Musician Coordinator

A web application to match musicians with recording needs and manage scheduling and payments.

## Project Overview

The Session Musician Coordinator is a marketplace platform that connects session musicians with music producers, artists, and studios who need specialized instrumental or vocal performances for their recording projects. The platform streamlines the process of finding, booking, and paying skilled musicians for recording sessions.

### Key Features

- **User Profiles**: Detailed profiles for musicians and clients with portfolios and ratings
- **Matching System**: Smart search and recommendation algorithms to connect clients with the right musicians
- **Project Management**: Tools to create, manage, and track recording projects
- **Scheduling**: Integrated calendar system for booking and managing session times
- **Secure Payments**: Escrow-based payment system with support for multi-party splits
- **File Sharing**: Secure audio file exchange with version control
- **Messaging**: Real-time communication between clients and musicians
- **Reviews & Ratings**: Build reputation through verified reviews

## Technology Stack

### Frontend
- React.js with Next.js
- Redux for state management
- Material-UI component library
- Socket.io for real-time features

### Backend
- Node.js with Express
- MongoDB for database
- JWT authentication with Auth0
- AWS S3 for file storage
- Elasticsearch for search
- Stripe Connect for payments

### DevOps
- AWS Elastic Beanstalk
- GitHub Actions for CI/CD
- Docker for containerization

## Installation

### Prerequisites
- Node.js (v16+)
- npm or yarn
- MongoDB
- AWS account
- Stripe account

### Development Setup

1. Clone the repository
   ```bash
   git clone https://github.com/dxaginfo/session-musician-coordinator-2025-06-20.git
   cd session-musician-coordinator-2025-06-20
   ```

2. Install dependencies
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. Set up environment variables
   ```bash
   # In the backend directory
   cp .env.example .env
   # Edit .env with your configuration

   # In the frontend directory
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. Start the development servers
   ```bash
   # Start backend server (from backend directory)
   npm run dev

   # Start frontend server (from frontend directory)
   npm run dev
   ```

5. Access the application
   - Backend API: http://localhost:5000
   - Frontend: http://localhost:3000

## Project Structure

```
├── backend/                # Node.js Express backend
│   ├── config/             # Configuration files
│   ├── controllers/        # Request handlers
│   ├── middleware/         # Express middleware
│   ├── models/             # MongoDB data models
│   ├── routes/             # API routes
│   ├── services/           # Business logic
│   ├── utils/              # Utility functions
│   └── server.js           # Entry point
│
├── frontend/               # React.js frontend
│   ├── public/             # Static files
│   ├── src/                # Source code
│   │   ├── assets/         # Images, fonts, etc.
│   │   ├── components/     # Reusable components
│   │   ├── context/        # React context
│   │   ├── hooks/          # Custom hooks
│   │   ├── pages/          # Page components
│   │   ├── redux/          # Redux store, actions, reducers
│   │   ├── services/       # API service calls
│   │   ├── utils/          # Utility functions
│   │   ├── App.js          # Main component
│   │   └── index.js        # Entry point
│   └── package.json        # Dependencies
│
├── docs/                   # Documentation
├── .github/                # GitHub Actions workflows
└── docker-compose.yml      # Docker configuration
```

## API Documentation

The API documentation is available at `/api/docs` when running the server locally. It provides detailed information about all endpoints, request/response formats, and authentication requirements.

## Deployment

### Docker Deployment

1. Build the Docker images
   ```bash
   docker-compose build
   ```

2. Run the application stack
   ```bash
   docker-compose up -d
   ```

### AWS Deployment

1. Configure AWS CLI with your credentials
   ```bash
   aws configure
   ```

2. Deploy using the provided script
   ```bash
   ./scripts/deploy.sh
   ```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Project Link: [https://github.com/dxaginfo/session-musician-coordinator-2025-06-20](https://github.com/dxaginfo/session-musician-coordinator-2025-06-20)