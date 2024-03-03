import mongoose from "mongoose";

const patientReportSchema = mongoose.Schema(
  {
    DoctorID: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    },

    mobileNo:{
      type:Number,
      required:true,
      min:[10, "Mobile no. should be of atleast 10 digits"],
    },

    Covid_status: {
      type: String,
      required:true,
      enum: ['Negative', 'Travelled-Quarantine', 'Symptoms-Quarantine', 'Positive-Admit'],
      default: 'Negative',
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

const patientReportModel = mongoose.model('patientReport', patientReportSchema);
export default patientReportModel;
