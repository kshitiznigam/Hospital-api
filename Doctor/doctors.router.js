// Importing the Express framework for building the router
import express from 'express';

// Importing the doctor controller module for handling routes
import doctorController from './doctors.controller.js';

// Creating an instance of the Express Router
const docRouter = express.Router();

// Creating an instance of the DoctorController class
const DoctorController = new doctorController();

// Route for registering a new doctor
docRouter.post('/register', DoctorController.registerNewUser);

// Route for doctor login
docRouter.post('/login', DoctorController.LogIn);

// Exporting the doctor router for use in other modules
export default docRouter;
