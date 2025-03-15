# CSC-EzPremiumTutors-Spring25
Project comments and work.

# EzPremiumTutors

EzPremiumTutors is a web-based platform designed to connect students with tutors for seamless session scheduling, communication, and management. The platform provides a user-friendly interface that allows students to find tutors, book sessions, communicate directly, and provide feedback. Tutors, on the other hand, can manage their availability, view their bookings, and communicate with students.

## Key Features

- **Account Logins for Students and Tutors**: 
    - Secure authentication with email login or social media accounts.
    - Role-specific dashboards for both students and tutors.

- **Student Dashboard**:
    - Search for tutors by subject, availability, and rating.
    - View booked, past, and upcoming sessions.
    - Communicate directly with selected tutors.

- **Tutor Dashboard**:
    - View upcoming and past student sessions.
    - Communicate with students and respond to booking requests.
    - Set weekly availability and preferences for session duration.
    - View earnings based on tutoring hours.

- **Search and Booking System**:
    - Students can filter tutors based on subject, availability, and ratings.
    - Tutors can view student profiles, session history, and accept or reject booking requests.

- **Real-time Communication**:
    - Chat feature for students and tutors to communicate before, during, and after sessions.
    - Tutors can send assignments or other important documents directly.

- **Scheduling and Availability Management**:
    - Students can book sessions according to the tutor's availability.
    - Tutors can manage their weekly availability and set time slots for students.

- **Payment Integration**:
    - Secure payment processing for paid tutoring sessions.
    - In-app payment system using Stripe API.

- **Reviews & Ratings**:
    - After each session, students and tutors can rate each other, providing valuable feedback and building trust within the community.

## Technology Stack

- **Frontend**: React.js, HTML5, CSS3, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens), OAuth (for Social Media login)
- **Payment Gateway**: Stripe API
- **Real-time Communication**: WebSockets (for chat functionality)

How to Use

Sign Up/Login:
For students, create an account and log in to start searching for tutors.
For tutors, sign up, set your availability, and start accepting students.

Search for Tutors:
Use the search functionality to find tutors based on subjects, availability, and ratings.

Book a Session:
Select a tutor and book a session according to their available time slots.

Communication:
Chat with your tutor through the platform’s messaging system for updates, session details, or homework.

Future Enhancements
Advanced Payment System: Integrate a payment gateway for booking and paying tutors directly.
Video Session Support: Enable live video calls between students and tutors for real-time tutoring.
