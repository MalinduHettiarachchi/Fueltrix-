const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const cors = require('cors');

// Initialize Firestore with Firebase Admin SDK
const serviceAccount = require('./fueltrix-b50cf-firebase-adminsdk-ww4uh-ecacdc9c1b.json'); // Replace with your Firebase service account key JSON

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.post('/register-shed', async (req, res) => {
    const { shedRegisterNumber, shedName, email, location, Approved_status, Security_Key } = req.body; // Include Security_Key here

    // Simple validation
    if (!shedRegisterNumber || !shedName || !email || !location || !Security_Key) { // Validate Security_Key
      return res.status(400).json({ message: 'All fields are required' });
    }

    try {
      // Add shed registration data to Firestore
      const newShedRef = db.collection('Shed').doc();
      await newShedRef.set({
        shedRegisterNumber,
        shedName,
        email,
        location,
        Approved_status,
        Security_Key, // Include Security_Key in the Firestore document
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      res.status(200).json({ message: 'Shed registration saved successfully' });
    } catch (error) {
      console.error('Error saving shed registration:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
