const IssudBooks = require("../model/issued");
const User = require("../model/usermodel");
const Bookmdl = require("../model/books");

exports.issueBook = async (req, res) => {
  try {
    const { user, issuedBy, book } = req.body;
    // const alreadyissued = await IssudBooks.findOne({user:user.name ,book:book});
    const alreadyissued = await IssudBooks.findOne({user:user ,book:book});

    const findUser = await User.findOne({ name: user.name });

    const findbook = await Bookmdl.findOne({ title: book });

    if(alreadyissued.isReturned===false){
      return res.status(400).send("This Book is already Issued To this User")
    }
    else if (!findUser) {
     return  res.staus(400).send("User not found.. plz Check Username.");
    }
    else if (!findbook) {
      return res.staus(400).send("Book not found.. plz Check BookName.");
    }

    const issueBook = await IssudBooks.create({
      // user: user,
      user: findUser.name,
      issuedAt: Date.now(),
      issuedBy: issuedBy,
      book: findbook.title,
      isReturned: false,
    });

    // new line

    Bookmdl.issued = true;
    await Bookmdl.updateOne(
      { title: book },
      {
        $set: {
          issued: true,
        },
      }
    );

    findUser.IssudBooks.push(issueBook._id);
    await findUser.save();

    if (!issueBook) {
      return res.status(400).send("Unable to issue book");
    } else {
      return res.status(200).send("Book Issued successfully!");
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};



exports.getAllIssuedBooks = async (req, res) => {
  try {
    //finding all books
    const allbook = await Book.findAll();

    if (allbook.length === 0) {
      return res.status(400).send(" No books Found ");
    }
    return res.status(200).json({
      message: "Data Fetched Successfully!",
      data: await IssudBooks.find({ isReturned: false }),
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};



exports.returnBook = async (req, res) => {
  try {
    const {user,book} = req.body;
    //finding issued book by title
    // const issuedBOOK = await IssudBooks.findOne({title:book});
    const issuedBOOK = await IssudBooks.find({user:user.name ,book:book});
    const alreadyReturned = await IssudBooks.find({user:user.name ,book:book,isReturned:false});

    //checking if book found or not
    if (!issuedBOOK) {
      return res.status(400).send("Book Not Found ");
    }

    //checking if book already returned or not
    else if (alreadyReturned) {
      return res.status(400).send("Book is Already Been Returned");
    }

    // Bookmdl.issued = true;
    await Bookmdl.updateOne(
      { title: book },
      {
        $set: {
          issued: false,
        },
      }
    );
    issuedBOOK.isReturned = true;
    await IssudBooks.updateOne(
      { book: book,user:user, isReturned:false},
      {
        $set: {
          isReturned: true,
        },
      }
    );
    issuedBOOK.returnedAt = Date.now();
    // await issuedBOOK.save();

    return res.status(200).send("Book returned SuccessFully");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
