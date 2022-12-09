const mongoose =require("mongoose")

const UserSchema = new mongoose.Schema({
     Name :{type:String},
     Subject:{type:String},
     Marks :{type:Number},
     email:{type:String},
     password:{type:String}
},

  {timestamp:true})

module.exports =mongoose.model("Student",UserSchema)