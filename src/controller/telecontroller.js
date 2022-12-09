const studentmodel = require("../Model/studentmodel")
const Model = require("../Model/studentmodel")
const jwt =require("jsonwebtoken")


const CreateStudent = async (req,res)=>{
    
        try {
            let {  Name, subject,Mark, email, password } = req.body
    // console.log(req.body)
            if (Object.keys(req.body).length == 0) {
                return res.status(400).send({ status: false, msg: "for registration Student data is required" })
            }
            if (!Name) {
                return res.status(400).send({ status: false, msg: "Enter your  Name" });
            }
              
             if (!(/^[a-zA-Z]{2,}(?: [a-zA-Z]+){0,2}$/).test(Name)) {
                return res.status(400).send({ status: false, msg: "Please enter a valid Name" })
            }
            if(!subject){
               return res.status(400).send({status:false,msg:"enter the subject"})
            }
            
            if(!Mark){
                return res.status(400).send({status:false,msg:"enter the obtained Mark"})
            }
    
            if (!email) {
                return res.status(400).send({ status: false, msg: "Enter your email .Its mandatory for registration!!!" })
            }
                if (!(/^[a-z0-9_]{1,}@[a-z]{3,10}[.]{1}[a-z]{3}$/).test(email)) {
                return res.status(400).send({ status: false, msg: "Please Enter valid Email" })
            }
            
            let existEmail = await studentmodel.findOne({ email: email })
            if (existEmail) {
               return res.status(400).send({ status: false, msg: "User with this email is already registered" })
            }
            if (!password) {
                return res.status(400).send({ status: false, msg: "Please enter Password for registartion" })
            }
    
            if (!(/^[\s]*[0-9a-zA-Z@#$%^&*]{8,15}[\s]*$/).test(password)) {                                            
    
                return res.status(400).send({ status: false, msg: "please Enter valid Password and it's length should be 8-15" })
            }
    
            let savedData = await studentmodel.create(req.body);
            return res.status(201).send({ status: true, message: 'Success', data: savedData });
    
    
        } catch (err) {
            return res.status(500).send({ status: false, msg: err.message });
        }
    }

    const login = async (req, res) => {
        try {
    
        
            // let requestBody = req.body
    
            const { email, password } = req.body
            if (!email) {
                return res.status(400).send({ status: false, msg: "Email is mandatory for logging In" })
            }
    
            if (!password) {
                return res.status(400).send({ status: false, msg: "Please enter password. It is Mandatory" })
            }
            let data = await studentmodel.findOne({ email: email, password: password })
    
            if (!data) {
                return res.status(400).send({ status: false, msg: "Email or Password is incorrect.Please recheck it" })
            }
    
            let token = await jwt.sign({ id: data._id.toString() }, "tailwwebs", { expiresIn: '24hr' })
            res.header({ "x-api-key": token })
            return res.status(200).send({ status: true, message: "Login Successful", token: token })
        }
        catch (err) {
           return res.status(500).send({ error: err.message });
        }
    
    }

    


module.exports={CreateStudent,login}
