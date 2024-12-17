const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const cors = require('cors');
const session = require('express-session');
const router = express.Router();
const nodemailer = require("nodemailer");

// Initialize Firestore with Firebase Admin SDK
const serviceAccount = require("./fueltrix-b50cf-firebase-adminsdk-ww4uh-ecacdc9c1b.json");
//Mage path eka --D:/NIBM/HND/Final Project/Project/fueltrix-b50cf-firebase-adminsdk-ww4uh-ecacdc9c1b.json


// Configure the Nodemailer transporter with your email service credentials
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "fueltrixteam@gmail.com", // Your email address
    pass: "eqnd bkeo iwqk egmh"   // Your email password or app-specific password if using Gmail
  },
});

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());


// shed registration requet old one
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


// shed registration requet new one
app.post('/submit-form', async (req, res) => {
  const { shedName, shedRegisterNumber, email, Security_Key, location, shedType } = req.body;

  try {
    // Check if the email already exists in the database
    const existingShed = await db.collection('Shed').where('email', '==', email).get();
    if (!existingShed.empty) {
      return res.status(400).json({ message: 'Email already exists. Please use a different email.' });
    }

    // Save form data to Firebase with Approved_status set to false by default
    const newShed = await db.collection('Shed').add({
      shedName,
      shedRegisterNumber,
      email,
      Security_Key,
      location,
      shedType,
      Approved_status: false, // Default status
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // Construct the personalized email content
    const messageContent = `
    <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border: 1px solid #e0e0e0;">
      <h2 style="color: #1a73e8; text-align: center;">Fuel Station Registration Request Submitted!</h2>
      <p>Dear ${shedName} Team,</p>
      <p>Your registration request for the fuel station <strong>${shedName}</strong> has been received successfully.</p>
      
      <p>We are currently reviewing your request. Once approved, you will be notified via email with further details.</p>
  
      <p>If you have any questions, feel free to contact us at <a href="mailto:fueltrixteam@gmail.com" style="color: #1a73e8;">fueltrixteam@gmail.com</a>.</p>
      
      <p>Best Regards,<br>
      <strong>Fueltrix Team</strong></p>
      
      <hr style="border: none; border-top: 1px solid #e0e0e0; margin-top: 20px;">
      <p style="font-size: 12px; color: #555; text-align: center;">
        Fueltrix Fuel Tracking System | All rights reserved.<br>
        <a href="https://fueltrix.com" style="color: #1a73e8;">Visit our website</a> | <a href="https://fueltrix.com/unsubscribe" style="color: #1a73e8;">Unsubscribe</a>
      </p>
    </div>
  `;
    // Send email using Nodemailer
    const mailOptions = {
      from: "fueltrixteam@gmail.com", // Sender's email address
      to: email,                      // User's entered email address
      subject: "Shed Registration Request Received!",
      html: messageContent            // Use HTML format for the email
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");

    res.status(200).send({ message: "Shed registration request sent and email sent successfully!" });
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).send({ message: 'Failed to process the registration request. Please try again later.' });
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



// Route to update the Approved_status to true and send an email notification
app.put('/shed-requests/:id/approve', async (req, res) => {
  const { id } = req.params;

  try {
    const shedRef = db.collection('Shed').doc(id);

    // Check if the shed request exists
    const doc = await shedRef.get();
    if (!doc.exists) {
      return res.status(404).json({ message: 'Shed request not found' });
    }

    // Get the shed request details from the document
    const { email, shedName, Security_Key, shedRegisterNumber, location } = doc.data();

    // Update the Approved_status to true
    await shedRef.update({ Approved_status: true });

    // Construct the email content
    const messageContent = `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border: 1px solid #e0e0e0;">
        <h2 style="color: #1a73e8; text-align: center;">Your Shed Request Has Been Approved</h2>
        <p>Dear ${shedName} Team,</p>
        <p>We are pleased to inform you that your shed request has been approved! You can now access the Fueltrix Fuel Tracking System using the credentials provided below.</p>

        <p>Here are the details of your shed:</p>
        <ul>
          <li><strong>Shed Name:</strong> ${shedName}</li>
          <li><strong>Shed Register Number:</strong> ${shedRegisterNumber}</li>
          <li><strong>Location:</strong> ${location}</li>
        </ul>

        <p>Here are your login credentials:</p>
        <ul>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Security Key (Fuel Station Pin):</strong> ${Security_Key}</li>
        </ul>

        <p>Thank you for choosing Fueltrix!</p>

        <p>Best Regards,<br>
        Fueltrix Team</p>
      </div>
    `;

    // Email options (sender, recipient, subject, and content)
    const mailOptions = {
      from: 'fueltrixteam@gmail.com', // Sender's email address
      to: email,                    // Recipient's email address from the database
      subject: 'Fuel Station Request Approved - Access to Fueltrix System', // Email subject
      html: messageContent,         // HTML formatted message content
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    console.log('Approval email sent successfully to fuel station');

    // Send a response back to the client
    res.status(200).json({ message: 'Shed request approved successfully and email sent' });

  } catch (error) {
    console.error('Error approving shed request or sending email:', error);
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

// reques system company manager
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

    // Construct the personalized email content with a modern, professional look and company branding
    const messageContent = `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border: 1px solid #e0e0e0;">
        <h2 style="color: #1a73e8; text-align: center;">Thank You for Choosing Fueltrix!</h2>
        <p>Dear ${company} Team,</p>
        <p>Thank you for selecting <strong>Fueltrix Fuel Tracking System</strong>. We're excited to have <strong>${company}</strong> on board!</p>
        
        <p>You have chosen our <strong style="color: #1a73e8;">${packageType}</strong> package. Our team is currently reviewing your details, and you will receive further information with login credentials shortly.</p>

        <p>In the meantime, if you have any questions, feel free to contact us at <a href="mailto:fueltrixteam@gmail.com" style="color: #1a73e8;">fueltrixteam@gmail.com</a>.</p>
        
        <p>Best Regards,<br>
        <strong>Fueltrix Team</strong></p>
        
        <hr style="border: none; border-top: 1px solid #e0e0e0; margin-top: 20px;">
        <p style="font-size: 12px; color: #555; text-align: center;">
          Fueltrix Fuel Tracking System | All rights reserved.<br>
          <a href="https://fueltrix.com" style="color: #1a73e8;">Visit our website</a> | <a href="https://fueltrix.com/unsubscribe" style="color: #1a73e8;">Unsubscribe</a>
        </p>
      </div>
    `;

    // Send email using Nodemailer
    const mailOptions = {
      from: "fueltrixteam@gmail.com", // Sender's email address
      to: email,                      // User's entered email address
      subject: "Thank You for Choosing Fueltrix!",
      html: messageContent            // Use HTML format for the email
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
    res.status(200).send({ message: "Reservation added and email sent successfully" });

  } catch (error) {
    console.error("Failed to send email:", error);
    res.status(500).send({ message: "Reservation added, but email failed to send" });
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




// API endpoint to approve a request and send an email notification
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

    // Get the company name and email from the document
    const { company, email } = doc.data();

    // Construct the email content
    const messageContent = `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border: 1px solid #e0e0e0;">
        <h2 style="color: #1a73e8; text-align: center;">Request Approved - Welcome to Fueltrix!</h2>
        <p>Dear ${company} Team,</p>
        <p>Your request has been approved! You now have access to the <strong>Fueltrix Fuel Tracking System</strong>.</p>

        <p>Here are your login credentials:</p>
        <ul>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Temporary Password:</strong> fueltrix1234</li>
        </ul>

        <p>Please use these credentials to log in for the first time. You will be prompted to change your password upon initial login.</p>

        <p>Thank you for joining us!</p>

        <p>Best Regards,<br>
        <strong>Fueltrix Team</strong></p>

        <hr style="border: none; border-top: 1px solid #e0e0e0; margin-top: 20px;">
        <p style="font-size: 12px; color: #555; text-align: center;">
          Fueltrix Fuel Tracking System | All rights reserved.<br>
          <a href="https://fueltrix.com" style="color: #1a73e8;">Visit our website</a> | <a href="https://fueltrix.com/unsubscribe" style="color: #1a73e8;">Unsubscribe</a>
        </p>
      </div>
    `;

    const mailOptions = {
      from: 'fueltrixteam@gmail.com', // Sender's email address
      to: email,                           // Recipient's email address
      subject: 'Request Approved - Access to Fueltrix System',
      html: messageContent,                // HTML format for the email
    };


    await requestRef.update({ Approved_status: true });
    res.status(200).json({ message: 'Request approved successfully' });
        // Send the email
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
  } catch (error) {
    console.error('Error approving request or sending email:', error);
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
        return res.status(200).json({ redirect: "/webAdmindashboard", userDetails: adminData });
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




// Route to register a driver
app.post('/api/driver/register', async (req, res) => {
  const { name, email, contact, password, company } = req.body;

  try {
    // Validate contact number (must be 10 digits)
    if (!/^\d{10}$/.test(contact)) {
      return res.status(400).json({ message: 'Invalid contact number. It must be exactly 10 digits.' });
    }

    // Check if the email already exists
    const existingUserSnapshot = await db.collection('Driver')
      .where('email', '==', email)
      .get();

    if (!existingUserSnapshot.empty) {
      return res.status(400).json({ message: 'Email already exists. Please use a different email.' });
    }

    // If email does not exist, proceed to register the user
    const docRef = await db.collection('Driver').add({
      name,
      email,
      contact,
      password, // Note: Storing passwords in plain text is not recommended for production
      company,
    });

    res.status(201).json({ id: docRef.id, message: 'Registration successful!' });
  } catch (error) {
    console.error("Error adding document: ", error);
    res.status(500).json({ message: 'Registration failed. Please try again.' });
  }
});





app.post("/api/register-vehicle", async (req, res) => {
  const { registrationNumber, vehicleType, fuelType, fuelVolume, vehicleCode, company } = req.body;

  try {
    // Check if a vehicle with the same registration number already exists
    const existingVehicle = await db.collection("Vehicle")
      .where("registrationNumber", "==", registrationNumber)
      .get();

    if (!existingVehicle.empty) {
      return res.status(400).json({ message: "Vehicle with this registration number already exists." });
    }

    // Validate fuelVolume to ensure it's a number
    const fuelVolumeNumber = Number(fuelVolume); // Convert fuelVolume to a number

    // Check if fuelVolume is a valid number
    if (isNaN(fuelVolumeNumber) || fuelVolumeNumber <= 0) {
      return res.status(400).json({ message: "Fuel volume must be a positive number." });
    }

    // If validation passes, save the new vehicle details with additional fields
    const vehicleRef = db.collection("Vehicle").doc(); // Auto-generated ID
    await vehicleRef.set({
      registrationNumber,
      vehicleType,
      fuelType,
      fuelVolume: fuelVolumeNumber, // Save as a number
      vehicleCode,
      company,
      pumpedVolume: 0, // Default integer value
      requestedVolume: 0, // Default integer value
    });

    res.status(201).json({ message: "Vehicle registered successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering vehicle." });
  }
});




// Endpoint to get vehicles grouped by company
app.get('/api/vehicles', async (req, res) => {
  try {
      const vehiclesSnapshot = await db.collection('Vehicle').get(); // Adjust based on your DB
      const vehicles = [];
      vehiclesSnapshot.forEach(doc => {
          vehicles.push({ id: doc.id, ...doc.data() });
      });

      const grouped = vehicles.reduce((acc, vehicle) => {
          const company = vehicle.company; // Change 'company' to your actual field name
          if (!acc[company]) {
              acc[company] = { count: 0, vehicles: [] };
          }
          acc[company].count += 1;
          acc[company].vehicles.push(vehicle);
          return acc;
      }, {});

      res.status(200).json(grouped);
  } catch (error) {
      console.error('Error fetching vehicle data:', error);
      res.status(500).json({ error: 'Failed to fetch vehicle data' });
  }
});


// API endpoint to get drivers
app.get('/api/drivers', async (req, res) => {
  try {
      const driversSnapshot = await admin.firestore().collection('Driver').get();
      const drivers = driversSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.status(200).json(drivers);
  } catch (error) {
      console.error('Error fetching drivers:', error);
      res.status(500).json({ error: 'Failed to fetch drivers' });
  }
});




// Route to get stats
app.get('/api/stats', async (req, res) => {
  try {
      const [
          shedRequests,
          companies,
          sheds,
          vehicles,
          drivers,
          pumpAssistants,
          pendingCompanies
      ] = await Promise.all([
          db.collection('Shed').where('Approved_status', '==', false).get(),
          db.collection('Manager').where('Approved_status', '==', true).get(),
          db.collection('Shed').where('Approved_status', '==', true).get(),
          db.collection('Vehicle').get(),
          db.collection('Driver').get(),
          db.collection('PumpAssistant').get(),
          db.collection('Manager').where('Approved_status', '==', false).get() // Fetch pending companies
      ]);

      // Constructing the response object
      res.status(200).json({
          pendingShedRequests: shedRequests.size,
          totalRegisteredCompanies: companies.size,
          totalPendingCompanies: pendingCompanies.size, // Add this for total pending companies
          totalRegisteredSheds: sheds.size,
          totalCompanyVehicles: vehicles.size,
          totalDrivers: drivers.size,
          totalPumpAssistants: pumpAssistants.size,
      });
  } catch (error) {
      console.error('Error fetching stats:', error);
      res.status(500).json({ error: 'Failed to fetch stats' });
  }
});



// API endpoint to get pending fuel requests
app.get('/api/fuel-requests', async (req, res) => {
  try {
      const { company } = req.query; // Retrieve the company name from query parameters

      // Query the Firestore collection for fuel requests related to the specified company
      let query = db.collection('FuelRequests');
      if (company) {
          query = query.where('company', '==', company); // Filter by company if provided
      }

      const snapshot = await query.get();
      const requests = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      res.status(200).json(requests); // Send the fetched requests as a response
  } catch (error) {
      console.error('Error fetching fuel requests:', error);
      res.status(500).json({ error: 'Failed to fetch fuel requests' });
  }
});




// Express.js API route to handle fetching fuel prices
app.get('/api/fuel-prices', async (req, res) => {
  try {
    const snapshot = await db.collection('fuelPrices').get();
    const fuelPrices = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).json(fuelPrices);
  } catch (error) {
    console.error('Error fetching fuel prices:', error);
    res.status(500).send({ message: 'Failed to fetch fuel prices' });
  }
});


// Add fuel price
app.post('/api/fuel-price', async (req, res) => {
  const { shedType, fuelType, price } = req.body;

  if (!shedType || !fuelType || !price) {
    return res.status(400).send({ message: 'Missing required fields' });
  }

  try {
    // Store fuel price data in Firestore
    const newPriceRef = db.collection('fuelPrices').doc();
    await newPriceRef.set({
      shedType,
      fuelType,
      price,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(200).send({ message: 'Fuel price updated successfully!' });
  } catch (error) {
    console.error('Error saving fuel price:', error);
    res.status(500).send({ message: 'Failed to update fuel price' });
  }
});

// Update fuel price
app.put('/api/fuel-price/:id', async (req, res) => {
  const { id } = req.params;
  const { shedType, fuelType, price } = req.body;

  try {
    const priceRef = db.collection('fuelPrices').doc(id);
    await priceRef.update({
      shedType,
      fuelType,
      price,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });
    res.status(200).send({ message: 'Fuel price updated successfully!' });
  } catch (error) {
    console.error('Error updating fuel price:', error);
    res.status(500).send({ message: 'Failed to update fuel price' });
  }
});







app.post('/api/contact', (req, res) => {
  const { name, email, mobile, subject, message } = req.body;

  // Validate mobile number (must be 10 digits)
  if (!/^\d{10}$/.test(mobile)) {
    return res.status(400).json({ error: 'Invalid mobile number. It must be exactly 10 digits.' });
  }

  // Save the message to Firestore
  admin.firestore().collection('messages').add({
    name,
    email,
    mobile,
    subject,
    message,
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
  })
  .then(() => {
    // Construct the email content for the user
    const userEmailContent = `
      <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; background-color: #f9f9f9; border: 1px solid #e0e0e0;">
        <h2 style="color: #1a73e8;">Thank you for reaching out, ${name}!</h2>
        <p>We have received your message regarding "<strong>${subject}</strong>". Our team will review your message and get back to you shortly via email or phone.</p>
        <p>If you have any urgent questions, feel free to reach us at <strong>support@fueltrix.com</strong>.</p>
        <p>Thank you for your patience!</p>
        <p>Best Regards,<br>
        <strong>Fueltrix Team</strong></p>
      </div>
    `;

    // Set up email options to send to the user
    const userMailOptions = {
      from: 'fueltrixteam@gmail.com', // Sender's email address
      to: email,                    // Recipient's email address (the user's email)
      subject: 'Thank You for Reaching Out!',
      html: userEmailContent,       // HTML content for the email
    };

    // Send the email to the user
    transporter.sendMail(userMailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email to user:', error);
        return res.status(500).json({ error: 'Error sending email to user' });
      }

      console.log('Email sent to user: ' + info.response);
      res.status(200).json({ message: 'Message saved successfully!' });
    });
  })
  .catch((error) => {
    console.error('Error saving message: ', error);
    res.status(500).json({ error: 'Error saving message' });
  });
});



app.get('/api/contact', async (req, res) => {
  try {
    const submissionsSnapshot = await admin.firestore().collection('messages').get();
    const submissions = submissionsSnapshot.docs.map(doc => ({
      id: doc.id,
      name: doc.data().name,
      email: doc.data().email,
      mobile: doc.data().mobile,
      message: doc.data().message,
    }));
    console.log(submissions); // Add logging to check the data
    res.status(200).json(submissions);
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({ error: 'Error fetching submissions' });
  }
});


app.post('/api/fuel-requests/update-status', async (req, res) => {
  try {
    const { id, status, company } = req.body;

    if (!id || !status || !company) {
      return res.status(400).json({ error: 'Request ID, status, and company are required' });
    }

    // Update the request's approvedStatus
    const requestRef = db.collection('FuelRequests').doc(id);
    await requestRef.update({ approvedStatus: status });

    // Fetch the updated list of requests for the company
    const snapshot = await db.collection('FuelRequests').where('company', '==', company).get();
    const updatedRequests = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    res.status(200).json(updatedRequests); // Return the updated list of requests
  } catch (error) {
    console.error('Error updating request status:', error);
    res.status(500).json({ error: 'Failed to update request status' });
  }
});

app.post("/api/update-vehicle-requested-volume", async (req, res) => {
  const { registrationNumber, requestedVolume, company } = req.body;

  try {
    // Fetch the vehicle document by registration number and company
    const vehicleSnapshot = await db
      .collection("Vehicle")
      .where("registrationNumber", "==", registrationNumber)
      .where("company", "==", company)
      .get();

    if (vehicleSnapshot.empty) {
      return res.status(404).json({ message: "Vehicle not found." });
    }

    const vehicleDoc = vehicleSnapshot.docs[0];
    const currentVolume = vehicleDoc.data().requestedVolume || 0; // Default to 0 if not set

    // Update the requested volume by adding the new value
    const updatedVolume = currentVolume + requestedVolume;

    await vehicleDoc.ref.update({ requestedVolume: updatedVolume });

    res.status(200).json({ message: "Requested volume updated successfully!" });
  } catch (error) {
    console.error("Error updating requested volume:", error);
    res.status(500).json({ message: "Error updating requested volume." });
  }
});


app.get('/api/pump-collection', async (req, res) => {
  try {
      // Ensure company query parameter is provided
      const { company } = req.query;
      if (!company) {
          return res.status(400).json({ error: 'Company name is required' });
      }

      // Query the 'PumpCollection' collection where the company matches
      const pumpsSnapshot = await admin.firestore()
          .collection('Pump')
          .where('company', '==', company)
          .get();

      // Check if documents exist
      if (pumpsSnapshot.empty) {
          return res.status(404).json({ error: 'No pumps found for the given company' });
      }

      // Map the results to an array
      const pumpData = pumpsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
      }));

      // Return the data
      res.status(200).json(pumpData);
  } catch (error) {
      console.error('Error fetching pump data:', error);
      res.status(500).json({ error: 'Failed to fetch pump collection data' });
  }
});


app.post("/send-email", (req, res) => {
  const { companyName, totalPrice, userEmail } = req.body;

  // Setup email data
  const mailOptions = {
    from: "fueltrixteam@gmail.com",
    to: userEmail, // Recipient email
    subject: `Payment Details from ${companyName}`,
    text: `Hello,

Your payment details are as follows:

Total Price: LKR ${totalPrice}.00

Thank you for using our service.`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ message: "Failed to send email.", error });
    }
    res.status(200).json({ message: "Email sent successfully!", info });
  });
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

