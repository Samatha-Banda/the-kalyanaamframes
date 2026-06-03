require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const Inquiry = require('./models/Inquiry');

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Middleware ───────────────────────────────────────────────
app.use(cors({ origin: '*', methods: ['GET', 'POST'], allowedHeaders: ['Content-Type'] }));
app.use(express.json());

// Auto-detect frontend folder (works regardless of nesting)
const possiblePaths = [
  path.join(__dirname, '..'),
  path.join(__dirname, '..', '..'),
];
const frontendPath = possiblePaths.find(p => fs.existsSync(path.join(p, 'index.html')));
if (frontendPath) {
  app.use(express.static(frontendPath));
  console.log('📁 Serving frontend from:', frontendPath);
} else {
  console.warn('⚠️  Could not find index.html');
}

// ─── MongoDB Connection ───────────────────────────────────────
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/thekalyanamframes';

mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 })
  .then(() => {
    console.log('✅ Connected to MongoDB successfully');
    console.log('🔍 View data in MongoDB Compass → mongodb://127.0.0.1:27017');
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    console.error('👉 Open MongoDB Compass and connect to: mongodb://127.0.0.1:27017');
  });

// ─── Routes ──────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
});

app.post('/api/inquiries', async (req, res) => {
  try {
    const { name, phone, email, eventDate, details } = req.body;
    if (!name || !phone || !email) {
      return res.status(400).json({ error: 'Name, Phone, and Email are required.' });
    }
    const newInquiry = new Inquiry({ name, phone, email, eventDate, details });
    await newInquiry.save();
    console.log(`📬 New inquiry — Name: ${name}, Email: ${email}`);
    res.status(201).json({ message: 'Inquiry submitted successfully!' });
  } catch (error) {
    console.error('❌ Error:', error.message);
    res.status(500).json({ error: 'Server error. Please try again.' });
  }
});

app.get('/api/inquiries', async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ submittedAt: -1 });
    res.json({ count: inquiries.length, inquiries });
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch inquiries.' });
  }
});

// ─── Start Server ─────────────────────────────────────────────
app.listen(PORT, () => {
  console.log('');
  console.log('🚀 Server started!');
  console.log(`🌐 Open website: http://localhost:${PORT}`);
  console.log(`🔗 API:          http://localhost:${PORT}/api/inquiries`);
  console.log('');
});
