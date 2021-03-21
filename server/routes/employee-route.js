/**
 * Title: employee-route.js
 * Author: Professor Krasso
 * Date: 21 March 2021
 * Modified By:  Anil Rayamajhi
 * Description: Employee route module
 */

const express = require("express");
const router = express.Router();
const BaseResponse = require("../service/base-response");
const Employee = require("../db-models/employee");

/**
 * API: findEmployeeById
 *
 * @param empId
 * @returns Employee document | null
 *
 * Description: Network call to MongoDB Atlas to get employee by ID
 * logic to handle network and query error
 */
router.get("/:empId", async (req, res) => {
  try {
    Employee.findOne({ empId: req.params.empId }, function (err, employee) {
      if (err) {
        const mongoDBErrorResponse = new BaseResponse(
          500,
          `MongoDB Native error ${err}`
        );
        res.status(500).send(mongoDBErrorResponse.toObject());
      }

      console.log(employee);
      const employeeResponse = new BaseResponse(
        200,
        "Successful query",
        employee
      );
      res.status(200).send(employeeResponse.toObject());
    });
  } catch (e) {
    console.log(e);
    const findEmployeeCatchError = new BaseResponse(
      500,
      "Internal server error"
    );
    res.status(500).send(findEmployeeCatchError.toObject());
  }
});

module.exports = router;
