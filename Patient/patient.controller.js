// Importing the patient repository module
import patientRepository from "./patient.repository.js";

// Creating a patient controller class
export default class patientController {
    constructor() {
        // Creating an instance of the patient repository class
        this.patientRepository = new patientRepository();
    }

    // Method for registering a new patient
    RegisterNewPatient = async (req, res) => {
        // Extracting mobileNo and Patient_Name from the request body
        const { mobileNo, Patient_Name } = req.body;

        // Adding a new patient and handling the response
        const newPatient = await this.patientRepository.addNewPatient(mobileNo, Patient_Name);
        if (!newPatient) {
            return res.status(400).json({ status: "Failed", msg: "Something went wrong" });
        }

        res.status(201).json({ status: "Success", res: newPatient });
    }

    // Method for adding a patient report
    AddPatientReport = async (req, res) => {
        // Extracting DoctorID from user in the request, mobileNo from params, and Covid_status from the body
        const DoctorID = req.user.email;
        const mobileNo = req.params.id;
        const { Covid_status } = req.body;

        // Adding new patient data and handling the response
        const patientDetails = await this.patientRepository.addNewPatientData(DoctorID, mobileNo, Covid_status);
        if (!patientDetails) {
            return res.status(400).send("Something went wrong");
        }

        res.status(201).json({ status: "Success", PatientDetails: patientDetails });
    }

    // Method for fetching reports by status
    fetchReportsByStatus = async (req, res) => {
        // Extracting Covid_status from params
        const Covid_status = req.params.status;
        console.log(Covid_status);

        // Fetching reports by status and handling the response
        const reports = await this.patientRepository.getAllReportsByStatus(Covid_status);
        res.status(200).json({ status: "Success", ReportByStatus: reports });
    }

    // Method for fetching all reports of a patient by mobile number
    fetchAllReportsOfPatient = async (req, res) => {
        // Extracting mobileNo from params
        const mobileNo = req.params.id;
        console.log(mobileNo);

        // Fetching all reports of a patient and handling the response
        const reports = await this.patientRepository.getAllReportsOfPatient(mobileNo);
        res.status(200).json({ status: "Success", Report: reports });
    }
}
