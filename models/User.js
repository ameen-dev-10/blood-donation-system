const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a name"],
      trim: true,
      maxlength: [36, "Name must be at least 36 characters long"],
    },
    email: {
      type: String,
      required: [true, "Please enter a email address"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
    },
    dob: {
      type: Date,
      required: [true, "Please enter a date"],
    },
    age: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: [true, "Please enter your address"],
      trim: true,
    },
    isLogin: {
      type: Boolean,
      default: false,
      required: true,
    },
    role: {
      type: String,
      enum: ["USER", "DONOR"],
      default: "DONOR",
    },
    blood_group: {
      type: String,
      enum: ["A+", "B+", "AB+", "O+", "A-", "B-", "AB-", "O-"],
    },
    gender: {
      type: String,
      default: "Male",
      enum: ["Male", "Female", "Others"],
    },
    last_donated: {
      type: Date,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
      },
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.index({ location: "2dsphere" });

module.exports = mongoose.models["User"]
  ? mongoose.model("User")
  : mongoose.model("User", UserSchema);

// module.exports = mongoose.model("User", User);
