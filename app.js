const express = require("express");
const multer = require("multer");
const morgan = require("morgan");
require("dotenv").config();
const cors = require("cors");
require("colors");


const bodyparser = require("body-parser");

const app = express();

//this should be put always ahead of any because the very first
// connection is done of DB connection
const dbconnect = require("./lib/userdb");

//here We arecreaing different page routes of user
const users = require("./routes/userRoute");

//here We arecreaing different page routes of Books
const BooksRoute = require("./routes/books");

//here We arecreaing different page routes of Books
const adminroute = require("./routes/admin");


app.use(morgan("combined"));
app.use(bodyparser.json());
app.use(multer().any());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send("Main PAge is Working Fine");
});

dbconnect.dbconnect();


// All Routes
app.use("/user", users);
app.use("/books", BooksRoute);
app.use('/admin', adminroute)


app.listen(+process.env.PORT, () => {
  console.log(
    `Server is Running Smoothly on Port http://localhost:${+process.env.PORT}`
      .bgGrey.yellow
  );
});
