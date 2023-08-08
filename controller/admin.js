const useModel = require("../model/admin");
// const multer = require("multer");
const fs = require("fs");
const jwt = require("jsonwebtoken");
// const path =require('path')

const path = "D:/NODE/Noder3/lms2/Uploads/";

require("dotenv").config();

exports.createuser = async (req, res) => {
  try {
    const { name, gender, email, age, contact, address } = req.body;
    const userdata = await useModel.create({
      name: name,
      email: email,
      contact: contact,
      age: age,
      gender: gender,
      address: address,
    });
    return res.status(201).json({
      message: " Succesfully Added",
      status: 1,
      userdata,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.upldFile = async (req, res) => {
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
    return res.status(500).send("File Upload error");
  }
};




exports.deleteFile = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
  }
};

exports.AllUsers = async (req, res) => {
  try {
    const alluserdata = await useModel.find();
    return res.status(200).send(alluserdata);
  } catch (error) {
    return res.status(500).send(error);
  }
};

exports.login = async (req, res) => {
  try {
    // Finding User Entered Data from DB
    const user = await useModel.findOne({ name: req.body.name });
    jwt.sign(
      { user },
      process.env.JWT_SECRET,
      { expiresIn: "600s" },
      (error, token) => {
        res.json({
          message: "this is the token for your login again n again",
          token,
        });
      }
    );
  } catch (error) {
    return res.status(500).send(error + "Error is here");
  }
};

exports.profile = (req, res) => {
  jwt.verify(req.token, process.env.JWT_SECRET, (error, authdata) => {
    if (error) {
      res.status(400).send("Unauthorized Requests");
    } else {
      res.json({
        message: "User profile Accessed:",
        authdata,
      });
    }
  });
};