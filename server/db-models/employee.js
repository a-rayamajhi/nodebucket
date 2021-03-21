const mongoose = require("mongoose");

let EmployeeSchema = mongoose.Schema(
  {
    empId: {
      type: String,
      unique: true,
    },
  },
  { collection: "employees" }
);

module.exports = mongoose.model("Employee", EmployeeSchema);
