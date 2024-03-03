// Importing the doctor repository module
import doctorRepository from "./doctors.repository.js";

// Creating a doctor controller class
export default class doctorController {
    constructor() {
        // Creating an instance of the doctor repository class
        this.doctorRepository = new doctorRepository();
    }

    // Method for registering a new doctor user
    registerNewUser = async (req, res) => {
        try {
            // Extracting email, password, Name, and Age from the request body
            const { email, password, Name, Age } = req.body;

            // Registering a new doctor user and handling the response
            const response = await this.doctorRepository.registerUser(email, password, Name, Age);

            // Handling the response for success or failure
            if (response === false) {
                res.status(400).json({ status: "Failed", mes: "Some error occurred" });
            }

            res.status(201).json({ status: "Success", msg: response });
        } catch (err) {
            console.log(err);
            res.status(400).send("Some error occurred");
        }
    }

    // Method for doctor login
    LogIn = async (req, res) => {
        try {
            // Extracting email and password from the request body
            const { email, password } = req.body;

            // Logging in the doctor user and handling the response
            const token = await this.doctorRepository.login(email, password);

            // Handling the response for success or failure
            if (!token) {
                return res.status(400).json({ status: "Success", msg: "Something went wrong" });
            }

            res.status(200).json({ status: "Success", token: token });
        } catch (err) {
            console.log(err);
            res.status(400).send("Something went wrong");
        }
    }
}
