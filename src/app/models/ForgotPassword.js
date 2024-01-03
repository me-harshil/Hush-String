const mongoose = require("mongoose");

const ForgotPasswordSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    token: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.ForgotPassword ||
  mongoose.model("ForgotPassword", ForgotPasswordSchema); // to prevent OverwriteModelError
