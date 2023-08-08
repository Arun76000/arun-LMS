const router = require("express").Router();

const BookController = require("../controller/books");
const BookIssueController = require("../controller/bookIssue");


//routes of books
router.post("/add", BookController.addBooks);
router.delete("/delet", BookController.deleteBooks);
router.put("/update", BookController.updateBook);
router.get("/allBook", BookController.getAllBooks);

//routes of bookIssue
router.post("/issue", BookIssueController.issueBook);
router.post("/getAllBoks", BookIssueController.getAllIssuedBooks);
router.post("/returnedBook", BookIssueController.returnBook);

module.exports = router;
