const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, default: "" },
    phone: { type: String, default: "" },
    pincode: { type: String, default: "" },
  },
  { timestamps: true }
);

// mongoose.models = {}; // to prevent OverwriteModelError
// export default mongoose.model("User", UserSchema);

export default mongoose.models.User || mongoose.model("User", UserSchema); // to prevent OverwriteModelError
