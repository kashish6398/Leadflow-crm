const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },

    contactPerson: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["New", "Contacted", "Interested", "Closed", "Lost"],
      default: "New",
    },

    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Lead", leadSchema);