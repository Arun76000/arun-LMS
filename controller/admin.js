const useModel = require("../model/usermodel");
const adminmodel=require('../model/admin')
// const multer = require("multer");
const fs = require("fs");
const jwt = require("jsonwebtoken");
// const path =require('path')

const path = "D:/NODE/Noder3/lms2/Uploads/";

require("dotenv").config();

exports.createAdmin = async (req, res) => {
  try {
    const { userName, gender, email} = req.body;
    const userdata = await useModel.create({
      userName: userName,
      email: email,
      gender: gender,
    });
    return res.status(201).json({
      message: " Succesfully Added",
      status: 1,
      userdata,
    });
  } catch (error) {
    console.log("error is In Admin Controller createAdmin")
    return res.status(500).send(error.message);
  }
};

exports.uploadFile = async (req, res) => {
  try {
    if (req.file) {
      const fileDataAsString = req.file.buffer.toString(); // Convert buffer to string
      console.log("File Data:", fileDataAsString);
    } else if(req.files){
      req.files.forEach((file, index) => {
        const filedataasString = file.buffer.toString(); //converting data to String
        console.log(
          `file Data  ${index + 1} Data =>>` + filedataasString.green
        ); //printing converted String data in console

      });
    }else{
        return res.status(400).send("Please select a file You want to Upload");
    }

    // Storing File that is being Uploaded from the user
    fs.writeFileSync(`${path}` + req.files[0].originalname,req.files[0].buffer);
    return res.status(200).send("files Uploaded Successfully");

  } catch (error) {
    console.log("error is In Admin Controller uploadfile")
    return res.status(500).send("File Upload error");
  }
};




// exports.deleteFile = async (req, res) => {
//   try {
//   } catch (error) {
//     console.log(error);
//   }
// };

// exports.AllUsers = async (req, res) => {
//   try {
//     const alluserdata = await useModel.find();
//     return res.status(200).send(alluserdata);
//   } catch (error) {
//     console.log("error is In Admin Controller AllUser")
//     return res.status(500).send(error);
//   }
// };

exports.login = async (req, res) => {
  try {
    // Finding User Entered Data from DB
    const {userName,email}=req.body;
    
    const admindata = await adminmodel.findOne({userName:userName,email:email});
    if(!admindata){
      res.status(400).send('Admin Not Found')
    }
    console.log(admindata);
    

    jwt.sign({admindata},process.env.JWT_SECRET_admin,{ expiresIn: "600s" },(error, token) => {
        if(error){
          return res.status(400).send("Error Occured here while sign")
        }
        res.json({
          message: "this is the token for your login again n again",
          token,
        });
      }
    );
  } catch (error) {
    console.log("error is In Admin Controller login")
    return res.status(500).send(error + "Error is here");
  }
};

exports.profile =async (req, res) => {
  try {
    const userdata = await useModel.find();
    const msg= "This is the List Of All Users";
    jwt.verify(req.token, process.env.JWT_SECRET_admin, (error, authdata) => {
      if (error) {
        res.status(400).send("Unauthorized Requests");
      } else {
        res.json({
          message: "This is Admin PRofile",
          authdata,
          msg,
          userdata
        });
      }
    });
  } catch (error) {
    console.log("error is In Admin Controller profile")
    return res.status(500).send(error + "Error is here");
  }
};
