/**
 * Title: employee.js
 * Author: Professor Krasso
 * Date: 21 March 2021
 * Modified By:  Anil Rayamajhi
 * Description: Employee Schema
 */

/**
 * Require statements
 */
const mongoose = require("mongoose");

/**
 * Schema Builder
 */
let EmployeeSchema = mongoose.Schema(
  {
    empId: {
      type: String,
      unique: true,
    },
  },
  { collection: "employees" }
);

/**
 * Build model and export
 */
module.exports = mongoose.model("Employee", EmployeeSchema);
