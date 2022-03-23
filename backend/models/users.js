const mongoose = require('mongoose')

const collectionName = 'users'
const schemaName = 'users'
const SchemaTypes = mongoose.Schema

const schema = new mongoose.Schema(
  {
    _id: { type: SchemaTypes.ObjectId, auto: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    dateStarted: { type: Date, required: true, trim: true },
    salary: { type: Number, required: true },
    role: { type: SchemaTypes.ObjectId, required: false},
    manager: {type: SchemaTypes.ObjectId, required:false}
  },
  { strict: false, autoCreate: true, timestamps: true }
)

const model = mongoose.model(schemaName, schema, collectionName)
// model.create({
//   firstName:"test",
//   lastName: "test",
//   email: "test@test.com",
//   dateStarted:"2022-03-23",
//   salary:10000,
// });
module.exports = model
module.exports.schema = schema
