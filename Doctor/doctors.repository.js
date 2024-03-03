import doctorsModel from "./doctorsSchema/doctors.model.js";
import bcrypt from "bcryptjs";
import { loginUser } from "../Middleware/JWT.js";

export default class doctorRepository{
    
    // For registering new Doctor
    registerUser = async (email, password, Name, Age)=>{
        try{
            if(!email || !password || !Name || !Age){
                console.log("Some error occured");
                console.log("email: ", email, "password: ", password, "Role: ", Role, "Name: ", Name, "Age: ", Age);
                return "Some error occured"
            }

            const newUserDetails = new doctorsModel({
                email:email,
                password:password,
                Name:Name,
                Age:Age
            })

            console.log(newUserDetails);
            await newUserDetails.save();            
            return newUserDetails;
        }catch(err){
            console.log(err);
            return false
        }
    }



    authenticateUser = async (email, password)=>{
        const doctorsDetails = await doctorsModel.findOne({email});
        
        if (!doctorsDetails) {
            return { isMatch: false, user: null };
        }

        console.log(doctorsDetails);
        const user = {
            email: doctorsDetails.email,
            name: doctorsDetails.Name,
          };

        // Use bcrypt.compare to compare the passwords
        console.log(password, doctorsDetails.password);
        const isMatch = await bcrypt.compare(password, doctorsDetails.password);
        // console.log('Stored Hashed Password:', doctorsDetails.password);
        // console.log('Generated Hashed Password:', await bcrypt.hash(password,10));
        console.log(isMatch);
        return {isMatch, user};
    }


    // Login functionality:
    login = async (email, password) => {
        try {
          const authResult = await this.authenticateUser(email, password);
      
          console.log("Was password a match:", authResult.isMatch, "Received user details", authResult.user);
      
          if (!authResult.isMatch) {
            console.log("Authentication Failed!!");
            return "Authentication Failed!!";
          }
      
          const token = loginUser(authResult.user);
          return {token, authResult};
        } catch (err) {
          console.log(err);
          return false;
        }
    };
    
}