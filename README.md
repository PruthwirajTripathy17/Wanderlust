# Wanderlust
Wanderlust is a travel listing web application that allows users to explore destinations, add properties, and share reviews.


# 🏡 Wanderlust – Airbnb Inspired Travel Listing Platform

Wanderlust is a full-stack web application inspired by Airbnb that allows users to explore, create, and manage travel accommodation listings. Users can browse destinations, view property details, post reviews, and list their own properties for rent.

This project demonstrates the implementation of a modern web application using **Node.js, Express, MongoDB, and EJS**, following the **MVC architecture** and RESTful routing.

---

## ✨ Features

* 🔍 Browse travel listings from different locations
* 🏠 Create and manage property listings
* 📝 Add and delete reviews for listings
* ⭐ Rating system for user feedback
* 🗺️ Location display with maps
* 📸 Image upload for property listings
* 🔐 User authentication & authorization
* 📱 Responsive design

---

## 🛠️ Tech Stack

**Frontend**

* HTML5
* CSS3
* Bootstrap
* EJS (Embedded JavaScript Templates)

**Backend**

* Node.js
* Express.js

**Database**

* MongoDB
* Mongoose ODM

**Other Tools**

* Cloudinary (image storage)
* Mapbox (maps & location)
* Passport.js (authentication)
* Git & GitHub

---

## 📂 Project Structure

```
Wanderlust/
│
├── models/          # Mongoose schemas
├── routes/          # Express routes
├── controllers/     # Route logic
├── views/           # EJS templates
├── public/          # Static files (CSS, JS, images)
├── utils/           # Error handling utilities
├── app.js           # Main application file
└── package.json
```

---

## ⚙️ Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/wanderlust.git
cd wanderlust
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Create environment variables

Create a `.env` file in the root folder.

```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_key
CLOUDINARY_SECRET=your_secret
MAPBOX_TOKEN=your_mapbox_token
DB_URL=your_mongodb_url
SESSION_SECRET=your_secret
```

### 4️⃣ Run the project

```bash
node app.js
```

or

```bash
npm start
```

Open in browser:

```
http://localhost:8080
```

---

## 📸 Screenshots

(Add screenshots of homepage, listing page, and review section)

---

## 🎯 Future Improvements

* Payment integration
* Booking system
* User profile dashboard
* Wishlist feature
* Advanced search filters

---

## 👨‍💻 Author

**Pruthwiraj Tripathy**

---

## 📜 License

This project is created for learning purposes and is open-source.
