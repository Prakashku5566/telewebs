const express = require('express');
const router = express.Router();
const controller = require("../controller/telecontroller")

// router.get("/test",()=>console.log("hello india"))

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/register",controller.CreateStudent)
router.post("/login",controller.login)
module.exports = router;