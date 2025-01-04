const express = require('express');
const cors = require('cors');
// const session = require('express-session');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes'); 
const roleRoutes = require('./routes/roleRoutes')
const { dbConnection } = require('./config/dbConnect');
const connectCloudinary = require('./config/cloudinary');
const eventRoutes = require('./routes/eventRoutes')
const bookRoutes = require('./routes/bookingRoutes')
const eventVendorRoutes = require('./routes/eventVendorRoutes')
const vendorRoutes = require('./routes/vendorRoutes')
const venueRoutes = require('./routes/venueRoutes')
const feedbackRoutes = require('./routes/feedbackRoutes')
const paymentRoutes = require('./routes/paymentRoutes')
const orderRoutes = require('./routes/orderRoutes')
const path = require('path');

const app = express();
const port = 3000;

// Load environment variables
dotenv.config();

// Connect to the database
dbConnection();


// Serve the uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true })); // For parsing URL-encoded data


// Use authentication routes
app.use('/api/auth', authRoutes); // Add authRoutes
app.use('/api/roles', roleRoutes); // Add roleRoutes

app.use('/api',eventRoutes) //Add eventRoutes
app.use('/api',bookRoutes)  //Add bookingRoutes
app.use('/api',eventVendorRoutes)   //Add eventVendor
app.use('/api',vendorRoutes)    //Add vendorRoutes
app.use('/api',venueRoutes) //Add venueRoutes
app.use('/api',feedbackRoutes) //Add feedbackRoutes
app.use('/api/payments',paymentRoutes) //Add paymentRoutes

app.use("/api/orders", orderRoutes);


// Start the server
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
