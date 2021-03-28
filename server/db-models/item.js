/**
 * Title: item.js
 * Author: Professor Krasso
 * Date: 22 March 2021
 * Modified By:  Anil Rayamajhi
 * Description: Item Schema
 */

/**
 * Require statements
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Schema Builder
 */
let itemSchema = new Schema(
  { text: { type: String } }
);

/**
 * export itemSchema
 */
module.exports = itemSchema;
