const router = require("express").Router();

// requiring Middlewares
const {  checkEmail,  emailDuplly,  verifyToken,  upload,} = require("../middleware/admin_mdlware");
// checkcontact,

//requiring CreateUser , upload , AllUsers function from the controller
const {  createAdmin,  uploadFile,  login,  profile,} = require("../controller/admin");

//Using checkEmail and Emailduplication by Middlewaree
//creating router for create user
router.post("/create", [checkEmail, emailDuplly], createAdmin);

// Authenticate User
router.post("/login", login);
router.post("/profile", verifyToken, profile);

//creating router for Uploading File
router.post("/upload", uploadFile);

router.post("/uploadfile", upload, (req, res) => {
  res.send("file Uploaded");
});

//getting Data of all Users
// router.get("/allUsers", AllUsers);

module.exports = router;
