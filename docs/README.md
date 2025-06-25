# Organic Wellness Hub

A modern health consultancy website with user authentication features.

## Features

- **Responsive Design**: Modern, mobile-friendly interface
- **User Authentication**: Login and signup functionality
- **Health Services**: Nutrition planning, detox programs, lifestyle coaching
- **Product Recommendations**: Organic products and supplements
- **Testimonials**: Customer success stories
- **Contact Form**: Health consultation booking

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone or download the project**

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Start the backend server**
   ```bash
   npm start
   ```
   The server will run on `http://localhost:3000`

4. **Open the frontend**
   - Open `index.html` in your web browser
   - Or serve it using a local server (recommended)

### Using a Local Server (Recommended)

You can use any of these methods to serve the frontend:

**Using Python:**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Using Node.js:**
```bash
npx http-server
```

**Using Live Server (VS Code extension):**
- Install the "Live Server" extension
- Right-click on `index.html` and select "Open with Live Server"

## Authentication Features

### Sign Up
- Navigate to the signup page
- Fill in your personal information
- Select your primary health goal
- Create a password
- Submit the form

### Login
- Navigate to the login page
- Enter your email and password
- Click "Sign In"

### Logout
- Click the "Logout" button in the navbar
- You'll be redirected to the home page

## File Structure

```
healthtemplate-1/
├── index.html          # Main homepage
├── login.html          # Login page
├── signup.html         # Signup page
├── style.css           # Main stylesheet
├── script.js           # Frontend JavaScript
├── bg1.jpg            # Background image
├── bgFooter.jpg       # Footer background
└── backend/
    ├── server.js       # Express server
    ├── routes/
    │   └── auth.js     # Authentication routes
    ├── users.json      # User data storage
    └── package.json    # Backend dependencies
```

## API Endpoints

- `POST /api/signup` - Create a new user account
- `POST /api/login` - Authenticate user
- `GET /api/users` - Get all users (for admin purposes)

## Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js, Express.js
- **Styling**: Custom CSS with CSS Grid and Flexbox
- **Icons**: Font Awesome
- **Fonts**: Inter (Google Fonts)

## Notes

- This is a demo project with basic authentication
- Passwords are stored in plain text (not recommended for production)
- User data is stored in a JSON file (use a proper database for production)
- The backend server must be running for authentication to work

## Customization

You can customize the website by:
- Modifying colors in the CSS variables
- Adding new sections to the homepage
- Updating the health services and products
- Changing the background images
- Adding more authentication features

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## License

This project is for educational purposes. 