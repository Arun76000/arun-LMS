const usermodel = require("../model/admin");
const multer=require('multer')

//Check Email Verification
exports.checkEmail = async (req, res, next) => {
  try {
    if (!req.body || !req.body.email.includes("@")) {
      return res.status(500).json({
        message: "Email is not valid!! plz Enter Again",
        enteredEmail: req.body.email,
      });
    }
    next();
  } catch (error) {
    return res.status(501).send(error);
  }
};

//Check Email duplicaton in database
exports.emailDuplly = async (req, res, next) => {
  try {
    const userdata = await usermodel.findOne({ email: req.body.email });
    if (userdata){
      return res.status(400).json({
        message: "User already Exists",
      });
    }
    next();
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.checkcontact=async(req,res,next)=>{
  try {
    const usercontact=await usermodel.findOne({contact:req.body.contact});
    if(usercontact){
      return res.status(400).json({
        message: "User already Exists",
      });
    }
  } catch (error) {
    console.log(error);
  }
}


//verifying token which is created before
exports.verifyToken =(req, res, next)=> {
  const bearerheader = req.headers["authorization"];
  if (typeof bearerheader !== "undefined") { 
    const bearer = bearerheader.split(" ");
    const token = bearer[1];
    req.token = token;
  } else {
    res.status(401).json({
      result: "TOKEN is Required To Get Access",
    });
  }
  next();
}


exports.upload=(req,res,next)=>{
  try {
    multer({
      storage:multer.diskStorage({
          destination:function(re, file, cb){
              cb(null,"uploadFile")
          },
          filename:function(req,file,cb){
              cb(null,file.filename+"-"+Date.now()+".png")
          }
      })
    }).single("user_file");
    next();
  } catch (error) {
    console.log(error.message)
    res.send("error HAi bro")
  }
}
