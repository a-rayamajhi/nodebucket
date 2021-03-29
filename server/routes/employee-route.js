/**
 * Title: employee-route.js
 * Author: Professor Krasso
 * Date: 28 March 2021
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
          "500",
          `MongoDB Native error ${err}`
        );
        res.status(500).json(mongoDBErrorResponse.toObject());
      } else {
        console.log(employee);
        const employeeResponse = new BaseResponse(
          "200",
          "Successful query",
          employee
        );
        res.status(200).json(employeeResponse.toObject());
      }
    });
  } catch (e) {
    console.log(e);
    const findEmployeeCatchError = new BaseResponse(
      "500",
      "Internal server error"
    );
    res.status(500).send(findEmployeeCatchError.toObject());
  }
});

/**
 * API: createTask
 *
 * @param empId
 * @returns Employee document | null
 *
 * Description: Network call to MongoDB Atlas to post task to employee by employeeId
 */
router.post("/:empId/tasks", async (req, res) => {
  try {
    Employee.findOne({ empId: req.params.empId }, function (err, employee) {
      if (err) {
        console.log(err);
        const createTaskMongoDbError = new BaseResponse(
          "500",
          `MongoDB Exception: ${e.message}`
        );
        res.status(500).send(createTaskMongoDbError.toObject());
      } else {
        if (employee) {
          console.log("Employee", employee);
          const item = {
            text: req.body.text,
          };
          console.log(item, req.body);
          employee.todo.push(item);

          employee.save(function (err, updatedEmployee) {
            if (err) {
              console.log(err);
              const createTaskOnSaveMongoDbError = new BaseResponse(
                "500",
                `MongoDB onSave() Exception: ${err.message}`
              );
              res.status(500).send(createTaskOnSaveMongoDbError.toObject());
            } else {
              console.log(updatedEmployee);

              const createTaskOnSaveSuccessResponse = new BaseResponse(
                "200",
                "Successful query",
                updatedEmployee
              );
              res.status(200).send(createTaskOnSaveSuccessResponse.toObject());
            }
          });
        } else {
          console.log(
            `invalid employeeId! The passed-in value was ${req.params.empId}`
          );
          const invalidEmployeeIdResponse = new BaseResponse(
            "200",
            `Invalid EmployeeId`
          );
          res.status(200).send(invalidEmployeeIdResponse.toObject());
        }
      }
    });
  } catch (e) {
    console.log(e);
    const createTaskException = new BaseResponse(
      "500",
      `Internal Server Error: ${e.message}`
    );
    res.status(500).json(createTaskException.toObject());
  }
});

/**
 * API: findAllTasks
 *
 * @param empId
 * @returns Employee document | null
 *
 * Description: Network call to MongoDB Atlas to select all tasks associated to employeeId
 */
router.get("/:empId/tasks", async (req, res) => {
  try {
    Employee.findOne(
      { empId: req.params.empId },
      "empId todo done",
      function (err, employee) {
        if (err) {
          console.log(err);
          const findAllTaskMongoDbError = new BaseResponse(
            "500",
            `MongoDB Exception: ${e.message}`
          );
          res.status(500).send(findAllTaskMongoDbError.toObject());
        } else {
          console.log(employee);

          const findAllTaskOnSaveSuccessResponse = new BaseResponse(
            "200",
            "Successful query",
            employee
          );
          res.status(200).send(findAllTaskOnSaveSuccessResponse.toObject());
        }
      }
    );
  } catch (e) {
    console.log(e);
    const findAllTaskException = new BaseResponse(
      "500",
      `Internal Server Error: ${e.message}`
    );
    res.status(500).json(findAllTaskException.toObject());
  }
});

/**
 * API: updateTasks
 *
 * @param empId
 * @returns Employee document | null
 *
 * Description: Network call to MongoDB Atlas to update all tasks associated to employeeId
 */
router.put("/:empId/tasks", async (req, res) => {
  try {
    Employee.findOne({ empId: req.params.empId }, function (err, employee) {
      if (err) {
        console.log(err);
        const findAllTaskMongoDbError = new BaseResponse(
          "500",
          `MongoDB Exception: ${e.message}`
        );
        res.status(500).send(findAllTaskMongoDbError.toObject());
      } else {
        if (employee) {
          console.log(employee);
          employee.set({
            todo: req.body.todo,
            done: req.body.done,
          });
          employee.save(function (err, updatedEmployee) {
            if (err) {
              console.log(err);
              const updateTaskMongoDbError = new BaseResponse(
                "500",
                `Internal Server Error ${e.message}`
              );
              res.status(500).send(updateTaskMongoDbError.toObject());
            } else {
              console.log(updatedEmployee);
              const updatedTaskSuccessResponse = new BaseResponse(
                "200",
                "Query successful",
                updatedEmployee
              );
              res.status(200).send(updatedTaskSuccessResponse.toObject());
            }
          });
        } else {
          console.log(
            `invalid employeeId! The passed-in value was ${req.params.empId}`
          );
          const invalidEmployeeIdResponse = new BaseResponse(
            "200",
            `Invalid EmployeeId`
          );
          res.status(200).send(invalidEmployeeIdResponse.toObject());
        }
      }
    });
  } catch (e) {
    console.log(e);
    const updateTaskException = new BaseResponse(
      "500",
      `Internal Server Error: ${e.message}`
    );
    res.status(500).json(updateTaskException.toObject());
  }
});

/**
 * API: deleteTask
 *
 * @param empId
 * @param taskId
 * @returns Employee document | null
 *
 * Description: Network call to MongoDB Atlas to delete task that matched the request params taskId
 */
router.delete("/:empId/tasks/:taskId", async (req, res) => {
  try {
    Employee.findOne({ empId: req.params.empId }, function (err, employee) {
      if (err) {
        console.log(err);
        const deleteTaskMongoDbError = new BaseResponse(
          "500",
          `MongoDB Exception: ${e.message}`
        );
        res.status(500).send(deleteTaskMongoDbError.toObject());
      } else {
        if (employee) {
          const todoItem = employee.todo.find(
            (item) => item._id.toString() === req.params.taskId
          );
          const doneItem = employee.done.find(
            (item) => item._id.toString() === req.params.taskId
          );

          if (todoItem) {
            console.log(todoItem);
            employee.todo.id(todoItem._id).remove();
            employee.save(function (err, updatedTodoItemEmployee) {
              if (err) {
                console.log(err);
                const deleteTodoItemMongoDbError = new BaseResponse(
                  "500",
                  `MongoDB Exception deleting TodoItem: ${e.message}`
                );
                res.status(500).send(deleteTodoItemMongoDbError.toObject());
              } else {
                console.log(updatedTodoItemEmployee);
                const deleteTodoItemSuccessResponse = new BaseResponse(
                  "200",
                  "Query successful",
                  updatedTodoItemEmployee
                );
                res.status(200).send(deleteTodoItemSuccessResponse.toObject());
              }
            });
          } else if (doneItem) {
            console.log(doneItem);
            employee.todo.id(doneItem._id).remove();
            employee.save(function (err, updatedDoneItemEmployee) {
              if (err) {
                console.log(err);
                const deleteDoneItemMongoDbError = new BaseResponse(
                  "500",
                  `MongoDB Exception deleting DoneItem: ${e.message}`
                );
                res.status(500).send(deleteDoneItemMongoDbError.toObject());
              } else {
                console.log(updatedDoneItemEmployee);
                const deleteDoneItemSuccessResponse = new BaseResponse(
                  "200",
                  "Query successful",
                  updatedDoneItemEmployee
                );
                res.status(200).send(deleteDoneItemSuccessResponse.toObject());
              }
            });
          } else {
            console.log(
              `invalid taskId! The passed-in value was ${req.params.empId}`
            );
            const invalidTaskIdResponse = new BaseResponse(
              "200",
              `Invalid TaskId`
            );
            res.status(200).send(invalidTaskIdResponse.toObject());
          }
        } else {
          console.log(
            `invalid employeeId! The passed-in value was ${req.params.empId}`
          );
          const invalidEmployeeIdResponse = new BaseResponse(
            "200",
            `Invalid EmployeeId`
          );
          res.status(200).send(invalidEmployeeIdResponse.toObject());
        }
      }
    });
  } catch (error) {
    console.log(e);
    const deleteTaskException = new BaseResponse(
      "500",
      `Internal Server Error: ${e.message}`
    );
    res.status(500).json(deleteTaskException.toObject());
  }
});

module.exports = router;
