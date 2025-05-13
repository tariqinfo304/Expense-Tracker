# Personal Expense Tracker

A web application to track personal expenses with user authentication, CRUD operations, filtering, and monthly reports.

## Tech Stack
- **Backend**: Express.js, Sequelize ORM, MySQL, JWT
- **Frontend**: React, Axios, Chart.js
- **Deployment**: (Optional) Render/Vercel

## Features
- Register and login with JWT authentication
- Add, edit, delete expenses (amount, category, date, description)
- View monthly expense reports (bar chart)
- Filter expenses by category and date range
- Dashboard-style interface

## Setup Instructions

### Backend
1. Navigate to `backend/`
2. Run `npm install`
3. Set up MySQL and update `.env` with credentials
4. Run `npm start` to start the server

### Frontend
1. Navigate to `frontend/`
2. Run `npm install`
3. Update `.env` with API URL
4. Run `npm start` to start the React app

## API Endpoints
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `POST /api/expenses` - Create expense
- `GET /api/expenses` - Get expenses (with filters)
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense
- `GET /api/expenses/report` - Get monthly report

## Database Schema
- **User**: id, username, password
- **Expense**: id, amount, category, date, description, UserId
- Index: `idx_category_date` for optimized filtering

## Deployment
- Deploy backend on Render/Railway
- Deploy frontend on Vercel/Netlify
- Ensure environment variables are set on the platform

## Hours spent 
- 4 hours