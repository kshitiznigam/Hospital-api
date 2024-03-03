// Importing the Express framework for building the router
import express from 'express';

// Importing the patient controller module for handling routes
import patientController from './patient.controller.js';

// Importing the JWT authentication middleware
import { authenticateToken } from '../Middleware/JWT.js';

// Creating an instance of the Express Router
const patientRouter = express.Router();

// Creating an instance of the PatientController class
const PatientController = new patientController();

// Route for adding a patient report by patient ID
patientRouter.post('/:id/create_report', authenticateToken, PatientController.AddPatientReport);

// Route for registering a new patient
patientRouter.post('/register', authenticateToken, PatientController.RegisterNewPatient);

// Route for fetching patient reports by report status
patientRouter.post('/report/:status', authenticateToken, PatientController.fetchReportsByStatus);

// Route for fetching all reports of a patient by patient ID
patientRouter.post('/:id/all_reports', authenticateToken, PatientController.fetchAllReportsOfPatient);

// Exporting the patient router for use in other modules
export default patientRouter;
