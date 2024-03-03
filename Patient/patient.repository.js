// Importing the patient report model and patient model from their respective modules
import patientReportModel from "./patientSchema/patientReport.model.js";
import patientModel from "./patientSchema/patient.model.js";

// Creating a patient repository class
export default class patientRepository {

    // Method to add a new patient
    addNewPatient = async (mobileNo, name) => {
        try {
            // Checking if the patient with the given mobile number already exists
            const alreadyAdded = await patientModel.findOne({ mobileNo });

            // If the patient already exists, return existing reports or a message if no reports are found
            if (alreadyAdded) {
                console.log("Data Already exist with this number");
                const reports = await patientReportModel({ mobileNo });

                if (!reports) {
                    return "Patient is already registered, but no reports were found!";
                }

                return reports;
            }

            // Creating a new patient instance and saving it to the database
            const newPatient = new patientModel({
                mobileNo: mobileNo,
                name: name
            });

            console.log(newPatient);
            await newPatient.save();
            return newPatient;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    // Method to add new patient data
    addNewPatientData = async (DoctorID, mobileNo, Covid_status) => {
        try {
            // Creating a new patient report instance and saving it to the database
            const newPatient = new patientReportModel({
                DoctorID: DoctorID,
                mobileNo: mobileNo,
                Covid_status: Covid_status
            });

            console.log(newPatient);
            await newPatient.save();
            return newPatient;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    // Method to get all reports by Covid status
    getAllReportsByStatus = async (Covid_status) => {
        const allReports = await patientReportModel.find({ Covid_status });

        // Returning a message if no reports are found
        if (allReports.length === 0) {
            return "No Reports Found";
        }

        return allReports;
    }

    // Method to get all reports of a patient by mobile number
    getAllReportsOfPatient = async (mobileNo) => {
        const allReports = await patientReportModel.find({ mobileNo });

        // Returning a message if no reports are found
        if (allReports.length === 0) {
            return "No Reports Found";
        }

        return allReports;
    }
}
