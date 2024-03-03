import mongoose from "mongoose";

const patientSchema = mongoose.Schema({
    mobileNo:{
        type:Number,
        required:true,
        min:[10, "Mobile no. should be of atleast 10 digits"],
        unique:true,
    },

    name:{
        type:String,
        required:true,
        minlength:3
    }
})

const patientModel = new mongoose.model('patient', patientSchema);
export default patientModel;


