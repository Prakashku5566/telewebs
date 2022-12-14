const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId;

const studentSchema = new mongoose.Schema({
  StudentName: { type: String },
  Subject: { type: String },
  Marks: { type: Number },
  userid: {
    type: ObjectId,
    ref: "user"
  },
  isdeleted: {
    type: Boolean,
    default: false
  }
},

  { timestamp: true })

module.exports = mongoose.model("Student", studentSchema)