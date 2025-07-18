# Service Marketplace

A simple web application for connecting customers with service providers.

## Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Start MongoDB service
4. Run the application: `node server.js`
5. Open your browser and navigate to `http://localhost:3000`

## Features

- User registration and authentication (JWT + cookies)
- Service provider profiles
- Service listings with photo uploads
- Simple booking system (book, accept, reject)
- Clean and responsive UI

## Technologies Used

- Node.js & Express.js
- MongoDB & Mongoose
- EJS templating
- Bootstrap CSS
- JWT authentication
- Multer for file uploads

## Simple & Clean

This project follows simple coding principles:
- Minimal dependencies
- Clean code structure
- Easy to understand
- Local file storage
- No complex configurations

### User Types
1. **Customer** - Browse and book services
2. **Service Provider** - Offer services and manage bookings

### Core Functionality
- **User Authentication** - Registration and login with user type selection
- **Photo Uploads** - Profile photos for service providers
- **Phone Numbers** - Required contact numbers for service providers
- **Service Management** - Full CRUD operations for services (service providers only)
- **Booking System** - Customers can book services with time slot selection
- **Dashboard** - Simplified dashboard showing services (other features in navbar)
- **Service Discovery** - Browse all services with detailed information and provider photos
- **Booking Management** - View and manage bookings for all user types
- **Contact Information** - Direct contact with service providers via phone and email
- **Responsive Design** - Works on desktop and mobile devices

## Technology Stack

- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Frontend**: EJS templating engine
- **Styling**: Bootstrap 5 with custom CSS
- **Authentication**: JWT tokens with cookies (no express-session)
- **File Upload**: Multer for service photos only
- **Storage**: Local file system for uploaded images

## Architecture Changes

### Authentication
- **JWT + Cookies**: Replaced express-session with JWT tokens stored in httpOnly cookies
- **Middleware**: Centralized authentication in `middlewares/auth.js`
- **No Profile Updates**: Removed user profile editing functionality

### File Structure
- **Controllers**: All business logic moved to `controllers/` folder
- **Middlewares**: Authentication and file upload logic in `middlewares/` folder
- **Config**: Database connection in `config/database.js`
- **Clean Routes**: Routes only handle middleware and controller calls

### Photo Management
- **Service Photos Only**: Only service providers can add photos when creating services
- **No User Photos**: Removed profile photo functionality from users
- **Upload Directory**: All photos stored in `public/uploads/`

## Project Structure

```
Ghr-Ke-Kaam/
├── config/
│   └── database.js      # MongoDB connection
├── controllers/
│   ├── authController.js    # Authentication logic
│   └── serviceController.js # Service management logic
├── middlewares/
│   ├── auth.js          # JWT authentication middleware
│   └── upload.js        # Multer file upload configuration
├── models/
│   ├── User.js          # User model (no profile photo)
│   ├── Service.js       # Service model (with photo)
│   └── Booking.js       # Booking model
├── routes/
│   ├── auth.js          # Authentication routes (clean)
│   ├── dashboard.js     # Dashboard routes
│   ├── services.js      # Service routes
│   └── bookings.js      # Booking routes
├── views/
│   ├── auth/
│   │   ├── login.ejs
│   │   └── register.ejs
│   ├── dashboard/
│   │   ├── index.ejs
│   │   └── profile.ejs
│   ├── services/
│   │   ├── index.ejs
│   │   ├── create.ejs
│   │   ├── edit.ejs
│   │   └── view.ejs
│   ├── bookings/
│   │   ├── index.ejs
│   │   └── create.ejs
│   └── layout.ejs
├── public/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   └── uploads/         # Service photos
├── server.js
└── package.json
```

## Installation & Setup

1. **Clone or download the project**
2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start MongoDB** (make sure MongoDB is running on localhost:27017)

4. **Run the application**:
   ```bash
   node server.js
   ```

5. **Access the application**:
   Open your browser and go to `http://localhost:3000`

## Usage

### Registration
1. Go to the registration page
2. Fill in your name, email, and password
3. Select your user type:
   - Customer: Browse and book services
   - Service Provider: Offer services
4. For service providers: Phone number required, profile photo optional

### Login
- Use your email and password to log in
- You'll be redirected to your personalized dashboard

### Navigation Features
- **All Services** - Complete list of all services from all providers with "Book Now" buttons
- **My Bookings** - View and manage all bookings (customers and providers)
- **Dashboard** - Clean view of recent services
- **Add Service** - Available only for service providers

### Service Management
- **Create**: Add new services (service providers only)
- **Read**: View all services and detailed service information
- **Update**: Edit your own services
- **Delete**: Remove your own services
- **Book**: Customers can book any service with time slot selection

### Booking System
- **Time Slots**: 11 available time slots from 9 AM to 8 PM
- **Date Selection**: Book services for future dates
- **Slot Validation**: Prevents double-booking of time slots
- **Accept/Reject**: Service providers can accept or reject booking requests
- **Status Management**: Booking status (pending, confirmed, completed, cancelled)
- **Provider Notes**: Service providers can add notes when accepting/rejecting
- **Contact Integration**: Direct phone/email contact between customers and providers
- **Requirements**: Add special requirements or instructions for service providers

### Service Information
Each service includes:
- Title and description
- Category and pricing
- Location and availability
- Contact information
- Provider details
- Experience/additional information

## User Permissions

- **All users** can view all services
- **Customers** can book services and view their booking history
- **Service providers** can create, edit, and delete their own services, and manage booking requests
- **Booking Management** - Providers can accept/reject requests with optional notes

## Security Features

- Password hashing with bcrypt
- Session-based authentication
- User authorization for service operations
- Input validation and sanitization
- Error handling and user feedback

## Future Enhancements

- User profile editing
- Service ratings and reviews
- Advanced search and filtering
- Image uploads for services
- Email notifications
- Payment integration
- Service booking system

## Support

For any issues or questions, please check the error logs in the console or contact the development team.
‣桇⵲敋䬭慡੭