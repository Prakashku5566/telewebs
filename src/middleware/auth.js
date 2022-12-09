const jwt = require("jsonwebtoken");


const authentication = (req, res, next) => {
    try {
        let token = req.headers["x-api-key"]
        if (!token)
            return res.status(401).send({ status: false, msg: "token is required" });
         
        jwt.verify(token,"tailwwebs", (error, decoded) =>{
            if (error) {
               let message=(error.message=="jwt expired"?"token is expired,please login again":"token is invalid,not authenticated")
                 return res.status(401).send({ status: false, msg:message });
            } else {
              req.token = decoded;
                next(); }
        });
    } catch (error) {
      return  res.status(500).send({ status: false, err: error.message });
    }
};


module.exports={authentication}