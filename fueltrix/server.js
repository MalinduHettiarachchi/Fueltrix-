const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const cors = require('cors');

// Initialize Firestore with Firebase Admin SDK
const serviceAccount = require('D:/NIBM/HND/Final Project/Project/fueltrix-b50cf-firebase-adminsdk-ww4uh-ecacdc9c1b.json'); // Use forward slashes or properly escape

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



// New WebAdminLogin route
app.post('/WebAdminLogin', async (req, res) => {
  const { email, password } = req.body;

  // Simple validation
  if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  try {
      // Query Firestore to find the user
      const userRef = db.collection('Admin').where('Email', '==', email);
      const snapshot = await userRef.get();

      if (snapshot.empty) {
          return res.status(401).json({ success: false, message: 'Invalid email or password' });
      }

      let user = null;
      snapshot.forEach(doc => {
          user = { id: doc.id, ...doc.data() }; // Store the user data
      });

      // Check password (assuming you have stored passwords in plain text)
      if (user.Password === password) {
          res.status(200).json({ success: true, message: 'Login successful' });
      } else {
          res.status(401).json({ success: false, message: 'Invalid email or password' });
      }
  } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
  }
});


// Add this route to your existing Express server code

app.get('/shed-requests', async (req, res) => {
  try {
    const shedRequestsRef = db.collection('Shed');
    const snapshot = await shedRequestsRef.where('Approved_status', '==', false).get();
    
    if (snapshot.empty) {
      return res.status(404).json({ message: 'No shed registration requests found' });
    }

    const requests = [];
    snapshot.forEach(doc => {
      const data = doc.data();
      // Convert Firestore Timestamp to Date object
      const createdAtDate = data.createdAt ? data.createdAt.toDate() : null;
      requests.push({ id: doc.id, ...data, createdAt: createdAtDate });
    });

    res.status(200).json(requests);
  } catch (error) {
    console.error('Error retrieving shed requests:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Route to update the Approved_status to true
app.put('/shed-requests/:id/approve', async (req, res) => {
  const { id } = req.params;

  try {
    const shedRef = db.collection('Shed').doc(id);

    // Check if the shed request exists
    const doc = await shedRef.get();
    if (!doc.exists) {
      return res.status(404).json({ message: 'Shed request not found' });
    }

    // Update the Approved_status to true
    await shedRef.update({ Approved_status: true });

    res.status(200).json({ message: 'Shed request approved successfully' });
  } catch (error) {
    console.error('Error updating shed request:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
