// create CRUD for books
const BookModel = require("../model/books");

//creating or Adding books in DB
exports.addBooks = async (req, res) => {
  try {
    if (!req.body || req.body.length < 0)
      return res.status(400).send("Request Body Required!");
    const add = await BookModel.create(req.body);
    if (!add)
      return res.status(400).send("Not Created! There must be some problem.");
    return res.status(201).send("Book Added Successfully");
  } catch (error) {
    return res.status(500).send(error);
  }
};

//deleting books from the database
exports.deleteBooks= async (req,res)=>{
  try {
    if(!req.body || req.body.length < 0){
      return res.status(400).send('There should be a Request Body')
    }
    const data=await BookModel.deleteOne({title:req.body.title})
    return res.status(200).send(data)
  } catch (error) {
    return res.status(500).send(error)
  }
}

//updating Book in the Databse
exports.updateBook =async (req,res)=>{
  try {
    if(!req.body || !req.body.length<0)
      return res.status(400).send("Enter Request Body....data.....,,,,,,,,......");
    
    const data=await BookModel.updateOne(
      {title:req.body.title.toLowerCase()},
      {
        price:req.body.price,
        edition:req.body.edition,
        publishedYear:req.body.publishedYear,
        publisher:req.body.publisher,
      }
    );
    if(data){
      return res.status(200).send("Book UPdated SuccessFully......")
    }
  } catch (error) {
    return res.status(500).send(error)
  }
}


exports.getAllBooks=async (req,res)=>{
  try {
    const bookData=await BookModel.find()
    res.status(200).send(bookData)
  } catch (error) {
    return res.status(500).send(error)
  }
}