/**
 * Title: employee.js
 * Author: Professor Krasso
 * Date: 22 March 2021
 * Modified By:  Anil Rayamajhi
 * Description: Employee Schema
 */

/**
 * Require statements
 */
const mongoose = require("mongoose");
const Item = require('./item')

/**
 * Schema Builder
 */
let EmployeeSchema = mongoose.Schema(
  {
    empId: {
      type: String,
      unique: true,
      required: true
    },
    todo: [Item],
    done: [Item],
  },
  { collection: "employees" }
);

/**
 * Build model and export
 */
module.exports = mongoose.model("Employee", EmployeeSchema);
