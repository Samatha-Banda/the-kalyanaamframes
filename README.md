# TheKalyaanamFrames Website

Photography studio website with Node.js + Express backend connected to MongoDB Compass.

---

## ✅ FIXED ISSUES
- Added `.env` file with MongoDB connection string
- Added `start` script to `package.json`
- Fixed CORS configuration for frontend-backend communication
- Backend now serves the frontend files automatically
- Full mobile responsive CSS added

---

## 🚀 HOW TO RUN (Step-by-Step)

### STEP 1: Make sure MongoDB is running
1. Open **MongoDB Compass**
2. Connect to: `mongodb://localhost:27017`
3. Leave it open (it must be running)

### STEP 2: Install dependencies
Open PowerShell and run:
```
cd "C:\Users\banda\Downloads\thekalyanamframes_fixed\server"
npm install
```

### STEP 3: Start the server
```
node server.js
```

You should see:
```
✅ Connected to MongoDB successfully
🚀 TheKalyanamFrames Server started!
📡 Server running at: http://localhost:3000
🌐 Open website at:   http://localhost:3000/index.html
```

### STEP 4: Open the website
Open your browser and go to:
👉 **http://localhost:3000/index.html**

---

## 📦 MongoDB Compass — View Submitted Inquiries

1. Open MongoDB Compass
2. Connect to: `mongodb://127.0.0.1:27017`
3. In the left panel, click **thekalyaanamframes** database
4. Click the **inquiries** collection
5. All contact form submissions will appear here ✅

---

## 📁 Project Structure
```
thekalyanamframes_fixed/
├── index.html          ← Homepage
├── about.html          ← About page
├── portfolio.html      ← Portfolio page
├── contact.html        ← Contact page
├── css/
│   └── style.css       ← Styles (desktop + mobile)
├── js/
│   └── script.js       ← Frontend JavaScript
├── images/             ← All website images
└── server/
    ├── server.js        ← Express backend ✅ FIXED
    ├── package.json     ← Added "start" script ✅ FIXED
    ├── .env             ← MongoDB URI ✅ ADDED
    └── models/
        └── Inquiry.js   ← MongoDB schema
```

---

## 🌐 API Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| GET | http://localhost:3000/api/health | Check server + DB status |
| POST | http://localhost:3000/api/inquiries | Submit contact form |
| GET | http://localhost:3000/api/inquiries | View all inquiries |

## Website
The site is live at: https://the-kalyaanamframes.vercel.app/

