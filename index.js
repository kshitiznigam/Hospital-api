// Importing the Express framework and dotenv configuration
import express from 'express';
import 'dotenv/config';

// Importing doctor and patient routers
import docRouter from './Doctor/doctors.router.js';
import patientRouter from './Patient/patient.router.js';

// Creating an instance of the Express application
const app = express();
app.use(express.json());

// Default route for the home page
app.get('/', (req, res) => {
    res.send("Welcome to Hospital-API");
});

// Routes for doctor and patient functionalities
app.use('/doctor', docRouter);
app.use('/patients', patientRouter);

// Exporting the Express application for use in other modules
export default app;
