const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const cors = require('cors');
const session = require('express-session');


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
  const { shedRegisterNumber, shedName, email, location, Approved_status, Security_Key } = req.body;

  // Validation
  if (!shedRegisterNumber || !shedName || !email || !location || !Security_Key) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Fetch all sheds and get their emails
    const allShedsSnapshot = await db.collection('Shed').get();
    let emailExists = false;

    // Check if the submitted email already exists
    allShedsSnapshot.forEach((doc) => {
      if (doc.data().email === email) {
        emailExists = true;
      }
    });

    if (emailExists) {
      // If the email already exists, return an error
      return res.status(400).json({ message: 'Email already exists. Please use a different email.' });
    }

    // Add shed registration data to Firestore if the email is unique
    const newShedRef = db.collection('Shed').doc(); // Creates a new document reference
    await newShedRef.set({
      shedRegisterNumber,
      shedName,
      email,
      location,
      Approved_status,
      Security_Key,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // Successfully registered
    return res.status(200).json({ message: 'Shed registration saved successfully' });
  } catch (error) {
    console.error('Error saving shed registration:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
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
      const userRef = db.collection('Admin').where('email', '==', email);
      const snapshot = await userRef.get();

      if (snapshot.empty) {
          return res.status(401).json({ success: false, message: 'Invalid email or password' });
      }

      let user = null;
      snapshot.forEach(doc => {
          user = { id: doc.id, ...doc.data() }; // Store the user data
      });

      // Check password (assuming you have stored passwords in plain text)
      if (user.password === password) {
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



// Route to get approved sheds
app.get('/approved-sheds', async (req, res) => {
  try {
    const approvedShedsRef = db.collection('Shed');
    const snapshot = await approvedShedsRef.where('Approved_status', '==', true).get();

    if (snapshot.empty) {
      return res.status(404).json({ message: 'No approved sheds found' });
    }

    const approvedSheds = [];
    snapshot.forEach(doc => {
      const data = doc.data();
      const createdAtDate = data.createdAt ? data.createdAt.toDate() : null; // Convert Firestore Timestamp to Date object
      approvedSheds.push({ id: doc.id, ...data, createdAt: createdAtDate });
    });

    res.status(200).json(approvedSheds);
  } catch (error) {
    console.error('Error retrieving approved sheds:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Route to reject the shed request by setting Approved_status to false
app.put('/reject-shed/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const shedRef = db.collection('Shed').doc(id);

    // Check if the shed request exists
    const doc = await shedRef.get();
    if (!doc.exists) {
      return res.status(404).json({ message: 'Shed request not found' });
    }

    // Update the Approved_status to true
    await shedRef.update({ Approved_status: false });

    res.status(200).json({ message: 'Shed request approved successfully' });
  } catch (error) {
    console.error('Error updating shed request:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// API route to get pump assistants with shed names by matching Security_Key
app.get('/api/pump-assistants', async (req, res) => {
  try {
      const pumpAssistantRef = db.collection('PumpAssistant');
      const shedRef = db.collection('Shed');
      const pumpAssistantSnapshot = await pumpAssistantRef.get();

      const assistantsData = [];

      for (const doc of pumpAssistantSnapshot.docs) {
          const assistantData = doc.data();

          if (assistantData.securityCode) {
              // Find the matching shed based on Security_Key
              const shedQuerySnapshot = await shedRef
                  .where('Security_Key', '==', assistantData.securityCode)
                  .where('Approved_status', '==', true) // Only approved sheds
                  .get();

              if (!shedQuerySnapshot.empty) {
                  const shedDoc = shedQuerySnapshot.docs[0]; // Assuming one shed with this Security_Key
                  assistantData.shedName = shedDoc.data().shedName;
              } else {
                  assistantData.shedName = 'Unknown Shed';
              }
          } else {
              assistantData.shedName = 'Unknown Shed';
          }

          assistantsData.push({
              id: doc.id,
              ...assistantData,
          });
      }

      res.status(200).json(assistantsData);
  } catch (error) {
      console.error('Error fetching pump assistants:', error);
      res.status(500).json({ message: 'Failed to fetch pump assistant data.' });
  }
});


// reservation system manager part
app.post("/submit-reservation", async (req, res) => {
  const { company, email, packageType } = req.body;

  try {
    // Insert data into Firebase with default values for Approved_status and password
    await db.collection("Manager").add({
      company: company,
      email: email,
      package: packageType,
      password: "fueltrix1234",      // Default password
      Approved_status: false,        // Default Approved_status
      createdAt: new Date(),
    });

    res.status(200).send({ message: "Reservation added successfully" });
  } catch (error) {
    console.error("Error adding reservation: ", error);
    res.status(500).send({ message: "Failed to add reservation" });
  }
});


// Fetch company requests where 'Approved_status' is false
app.get('/api/company-requests', async (req, res) => {
  try {
      const snapshot = await admin.firestore().collection('Manager').where('Approved_status', '==', false).get();
      const requests = [];

      snapshot.forEach(doc => {
          const data = doc.data();
          // Convert Firestore Timestamp to Date object
          const createdAtDate = data.createdAt ? data.createdAt.toDate() : null;
          requests.push({ id: doc.id, ...data, createdAt: createdAtDate });
      });

      res.status(200).json(requests);
  } catch (error) {
      console.error('Error fetching company requests:', error);
      res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});



// API endpoint to approve a request by updating the Approved_status
app.post('/api/approve-request/:requestId', async (req, res) => {
  const { requestId } = req.params;

  try {
      const requestRef = db.collection('Manager').doc(requestId);

      // Check if the request exists
      const doc = await requestRef.get();
      if (!doc.exists) {
          return res.status(404).json({ message: 'Manager request not found' });
      }

      // Update the Approved_status to true
      await requestRef.update({ Approved_status: true });

      res.status(200).json({ message: 'Request approved successfully' });
  } catch (error) {
      console.error('Error approving request:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});



app.get('/api/registered-companies', async (req, res) => {
  try {
      const snapshot = await db.collection('Manager').where('Approved_status', '==', true).get();
      const companies = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt ? doc.data().createdAt.toDate() : null // Ensure createdAt is a Date
      }));

      res.status(200).json(companies);
  } catch (error) {
      console.error('Error fetching registered companies:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});


// API endpoint to update the Approved_status of a registered company
app.put('/api/registered-companies/:id', async (req, res) => {
  const companyId = req.params.id;
  const { Approved_status } = req.body;

  try {
      await db.collection('Manager').doc(companyId).update({ Approved_status });
      res.status(200).json({ message: 'Company status updated successfully.' });
  } catch (error) {
      console.error('Error updating company status:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});




// Set up session middleware
app.use(session({
  secret: '123@123', // Change this to a strong secret
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Admin login check
    const adminSnapshot = await admin.firestore().collection('Admin').where('email', '==', email).get();
    if (!adminSnapshot.empty) {
      const adminData = adminSnapshot.docs[0].data();
      if (adminData.password === password) {
        return res.status(200).json({ redirect: "/webAdmindashboard" });
      }
      return res.status(401).json({ message: "Invalid admin password" });
    }

    // Manager login check
    const managerSnapshot = await admin.firestore().collection('Manager').where('email', '==', email).get();
    if (!managerSnapshot.empty) {
      const managerData = managerSnapshot.docs[0].data();
      if (password === 'fueltrix1234') {
        return res.status(200).json({ redirect: `/reset?email=${email}`, userDetails: managerData });
    } else if (managerData.password === password) {
        req.session.manager = managerData;
        return res.status(200).json({ redirect: `/signin?email=${email}`, userDetails: managerData });
      }
    
      return res.status(401).json({ message: "Invalid manager password" });
    }

    return res.status(401).json({ message: "Invalid email or password" });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Login failed: " + error.message });
  }
});



// Route for resetting password
app.post('/api/reset-password', async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const managerSnapshot = await admin.firestore().collection('Manager').where('email', '==', email).get();

    if (!managerSnapshot.empty) {
      const managerRef = managerSnapshot.docs[0].ref;
      await managerRef.update({ password: newPassword });
      return res.status(200).json({ message: "Password updated successfully" });
    } else {
      return res.status(404).json({ message: "Manager not found" });
    }
  } catch (error) {
    console.error("Reset password error:", error); // Log error for debugging
    return res.status(500).json({ message: "Error updating password: " + error.message });
  }
});

// Route for getting manager details from the session
app.get('/api/manager-details', (req, res) => {
  if (req.session.manager) {
    console.log("Returning manager details:", req.session.manager); // Log the session data for debugging
    return res.status(200).json(req.session.manager); // Send the manager details
  } else {
    console.log("No manager session found.");
    return res.status(404).json({ message: "No manager logged in" });
  }
});





// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
