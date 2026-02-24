# Ruhen Rai - Graphic Design Portfolio

A professional, fully responsive portfolio web application built to showcase graphic design work, visual storytelling, and digital experiences. The site is designed for easy navigation by recruiters and clients, featuring a dynamic gallery and a custom, secure backend for content management.

Check out the live site here: [Ruhen Rai Portfolio](https://ruhenrai-portfolio.web.app)

## ✨ Key Features

* **Dynamic Gallery & Filtering:** A masonry-style gallery layout with extensive filtering options (by tags like Poster, Magazine, Japanese, Typography, etc.) and sorting capabilities (Newest first).
* **Secure Admin Dashboard:** A protected `/admin` route that utilizes Firebase Authentication. Authorized users (the portfolio owner) can log in to directly upload new images or videos.
* **Cloud Media Management:** Seamless integration with Cloudinary for fast, optimized, and reliable media storage and delivery.
* **Real-time Database:** Uses Firebase Firestore to store and query media metadata (titles, tags, timestamps) instantly.
* **Responsive Multi-page Layout:** Built with React Router for smooth, client-side navigation across the Home, Gallery, About, and Admin pages, fully optimized for both desktop and mobile viewing.

## 🛠️ Technologies Used

**Frontend:**
* **React.js:** Core framework utilizing modern functional components and hooks (`useState`, `useEffect`, `useMemo`, `useLocation`, `useNavigate`).
* **React Router DOM:** For seamless multi-page routing.
* **JavaScript (ES6+)**
* **HTML5 & CSS3:** Custom styling for a bold, brand-specific aesthetic.

**Backend & Services:**
* **Firebase Authentication:** Google Provider login and state management (`signInWithPopup`, `onAuthStateChanged`).
* **Firebase Firestore:** NoSQL database for managing portfolio items.
* **Cloudinary:** Cloud-based image and video management/storage.
* **Firebase Hosting:** Deployed and hosted via Firebase.

## 📸 Screenshots

*(Note: Add screenshots of your app to an `assets` folder and update the links below!)*

* **Home/Gallery:** `![Gallery View](./assets/gallery.jpg)`
* **About Page:** `![About View](./assets/about.jpg)`
* **Admin Panel:** `![Admin View](./assets/admin.jpg)`

## 🚀 Getting Started (Local Development)

If you'd like to clone this repository and run it locally, follow these steps:

### Prerequisites
* Node.js and npm installed.
* A Firebase project set up with Authentication and Firestore enabled.
* A Cloudinary account.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/syed-raiyan-ali/ruhenrai-portfolio.git
   npm install
   
Add your Firebase environment variables in a .env file.
Start the development server: npm start
