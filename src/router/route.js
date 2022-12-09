const express = require('express');
const router = express.Router();
const  {createUser,login}= require("../controller/usercontroller")
const {authentication} = require("../middleware/auth")
const {createstudent,updatestudent,geStudentByquery}= require("../controller/studentscontroller")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/register",createUser)
router.post("/login",login)
router.post("/user/registerstudent",authentication,createstudent);
router.put("/user/updatestudent/:studentid",authentication,updatestudent);
router.get("/user/students",authentication,geStudentByquery);


// router.post()
module.exports = router;