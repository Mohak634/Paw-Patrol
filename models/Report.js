import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: false }, // Store image URL or base64
}, { timestamps: true });

const Report = mongoose.model("Report", reportSchema);
export default Report;
