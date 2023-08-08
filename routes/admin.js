const router = require("express").Router();

// requiring Middlewares
const { checkEmail, emailDuplly,checkcontact,verifyToken,upload } = require("../middleware/user_middleware");

//requiring CreateUser , upload , AllUsers function from the controller
const {
  createuser,
  upldFile,
  AllUsers,login
  ,profile
} = require("../controller/user-controller");

//Using checkEmail and Emailduplication by Middlewaree
//creating router for create user
router.post("/create", [checkEmail, emailDuplly,checkcontact], createuser);


// Authenticate User
router.post('/login', login)
router.post('/profile' ,verifyToken,profile)


//creating router for Uploading File
router.post("/upload", upldFile);

router.post("/uploadfile",upload,(req,res)=>{
  res.send("file Uploaded")
});

//getting Data of all Users
router.get("/allUsers", AllUsers);

module.exports = router;
