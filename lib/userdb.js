const mongoose = require("mongoose");

require("colors");

exports.dbconnect = async () => {
  await mongoose
    .connect(process.env.MONGO_URI, {useNewUrlParser: true,useUnifiedTopology: true,})
    .then((value) => {
      const str = "database connected Succesfully".toUpperCase();
      console.log(str.bgBlue.red);
    })
    .catch((error) => {
      console.log(error.message);
    });
};



// # port of the server
// PORT =9090 

// #url of mongoDb with name of (databse)
// MONGO_URI="mongodb://127.0.0.1:27017/new-data"
// # path="D:/Noder3/lms2/uploads";
