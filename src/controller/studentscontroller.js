const usermodel = require("../Model/usermodel")
const studentmodel = require("../Model/studentmodel")
const mongoose =require("mongoose")


const createstudent = async function(req,res){
    try {
        let { StudentName,Subject,Marks ,userid } = req.body
            if (Object.keys(req.body).length == 0) {
                return res.status(400).send({ status: false, msg: "for registration student data is required" })
            }
            if (!StudentName) {
                return res.status(400).send({ status: false, msg: "Enter your  name" });
            }
              
             if (!(/^[a-zA-Z]{2,}(?: [a-zA-Z]+){0,2}$/).test(StudentName)) {
                return res.status(400).send({ status: false, msg: "Please enter a valid name" })
            }
           const existstudent = await studentmodel.findOne({StudentName:StudentName})
           if(existstudent){
            req.body.Marks = (existstudent.Marks+req.body.Marks)
            let data1 = await studentmodel.findOneAndUpdate({ _id: existstudent._id}, {
                $set: { Marks:req.body.Marks},}, { new: true })

            return res.status(201).send({ status: true, message: 'Success', data: data1 });
           }
            if (!Marks) {
                return res.status(400).send({ status: false, msg: "Enter your marks .Its mandatory for registration!!!" })
            }
                if (!(/^[0-9]/).test(Marks)) {
                return res.status(400).send({ status: false, msg: "Please Enter valid marks" })
            }
            
            if (!Subject) {
                return res.status(400).send({ status: false, msg: "Please enter Password for registartion" })
            }
    
            if (!(/^[a-zA-Z]{2,}(?: [a-zA-Z]+){0,2}$/).test(Subject)) {                                            
    
                return res.status(400).send({ status: false, msg: "please Enter valid subject" })
            }
            if (!userid) {
                return res.status(400).send({ status: false, msg: "Enter your userid" });
            }
            if (!mongoose.Types.ObjectId.isValid(userid)) {
                return res.status(400).send({ status: false, msg: `please enter a valid userID` })
            }
            const existuserid = await usermodel.findById(userid)
            if(!existuserid)return res.status(400).send({ status: false, msg: "Enter valid userid" });
            let savedData = await studentmodel.create(req.body);
            return res.status(201).send({ status: true, message: 'Success', data: savedData });
    
    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message });
    }
}


const updatestudent = async (req, res) => {
    try {
        let studentid = req.params.studentid
        const { StudentName,Subject,Marks ,userid  } = req.body

        if (Object.keys(req.body).length == 0)
            return res.status(400).send({ status: false, msg: "Please Enter student Details For Updating" })

        if (!studentid) {
            return res.status(400).send({ status: false, msg: "studentid must be present" })
        }

        if (!mongoose.Types.ObjectId.isValid(studentid)) {
            return res.status(400).send({ status: false, msg: `this  student Id is not a valid Id` })
        }
        let findstudentid = await studentmodel.findById(studentid)

        
        if (!findstudentid) {
            return res.status(404).send({ status: false, msg: "no student found with this studentid" })
        }
        if(StudentName){
            if(StudentName.trim().length==0) return res.status(400).send({ status: false, msg: "Please enter a valid studentname" })
            if (!(/^[a-zA-Z0-9.'\-_\s]*$/).test(StudentName)) {
                return res.status(400).send({ status: false, msg: "Please enter a valid studentname" })
            }
            let existtitle = await studentmodel.findOne({StudentName:StudentName})
        if (existtitle) {
            return res.status(400).send({ status: false, msg: "This name is  already exists" })
        }
        }
        if(Subject){
            if(Subject.trim().length==0) return res.status(400).send({ status: false, msg: "Please enter a valid subject" })
            if (!(/^[a-zA-Z0-9.'\-_\s]*$/).test(Subject)) 
            return res.status(400).send("subject must be in correct format");
        }

        if(Marks){
            if(typeof Marks !="number") return res.status(400).send({ status: false, msg: "Please enter a valid marks" })  
        }
       
       

        
       if(userid){
        if (!mongoose.Types.ObjectId.isValid(userid)) {
            return res.status(400).send({ status: false, msg: `please enter a valid userID` })
        }
        const existuserid = await usermodel.findById(userid)
        if(!existuserid)return res.status(400).send({ status: false, msg: "Enter valid userid" });
       }
    
        
        let updateStudents = await studentmodel.findOneAndUpdate({ _id: studentid }, {
            $set: {
               StudentName:StudentName,
               Marks:Marks,
               Subject:Subject,
               userid:userid
            },
        }, { new: true })


        return res.status(200).send({ status: true, message: "success", data: updateStudents })
    }
    catch (err) {
      return  res.status(500).send({ status: false, msg: err.message })
    }
};

const geStudentByquery = async (req, res) => {
    try {
        const filter = { isDeleted: false }

        const queryParams = req.query
        {
            const {  StudentName,Subject,Marks,userId } = queryParams
            if (userId) {
                if (!mongoose.Types.ObjectId.isValid(userId)) {
                    return res.status(400).send({ status: false, msg: `please enter a valid userID` })
                }
                filter["userId"] = userId
            }

            if (StudentName) {
                filter['StudentName'] = StudentName
            }

            if (Subject) {
                filter['Subject'] = Subject
            }
            if (Marks) {
                filter['Marks'] = Marks
            }
        }

        const student = await studentmodel.find(filter)

        if (Object.keys(student).length == 0)
            return res.status(404).send({ status: false, msg: "No Such book found" })

        return res.status(200).send({ status: true, message: 'student list', data: student })

    }
    catch (err) {
        console.log(err.message)
       return res.status(500).send({ status: false, Error: err.message })
    }
}

const DeletedStudent = async function (req, res) {
    try {

        let studentid = req.params.studentid
        if (!mongoose.Types.ObjectId.isValid(studentid))
            return res.status(400).send({ status: false, msg: "please enter valid studentid" })
        const savedata = await studentmodel.findById(studentid)
        if (savedata.isDeleted == true) {
            return res.status(404).send({ status: false, message: "studentid is already deleted" })
        }

        const deleteBook = await studentmodel.findByIdAndUpdate({ _id: studentid }, { $set: { isDeleted: true, deletedAt: Date.now() } });
        return res.status(200).send({ status: true, message: "studentid has been deleted successfully" })


    } catch (error) {
       return res.status(500).send({ status: false, msg: error.message });

    }
}


module.exports={createstudent,updatestudent,geStudentByquery,DeletedStudent}