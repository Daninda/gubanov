const Router = require("express");
const router = new Router();
const controller = require("./controller");

router.get("/books", controller.getBooks);
router.get("/book/:id", controller.getBook);
router.put("/book/:id", controller.updateBook);
router.post("/book", controller.createBook);
router.delete("/book/:id", controller.deleteBook);

router.get("/book-themes", controller.getBookThemes);
router.post("/book-theme", controller.createBookTheme);
router.delete("/book-theme/:id", controller.deleteBookTheme);

router.get("/themes", controller.getThemes);
router.get("/theme/:id", controller.getTheme);
router.put("/theme/:id", controller.updateTheme);
router.post("/theme", controller.createTheme);
router.delete("/theme/:id", controller.deleteTheme);

router.get("/readers", controller.getReaders);
router.get("/reader/:id", controller.getReader);
router.put("/reader/:id", controller.updateReader);
router.post("/reader", controller.createReader);
router.delete("/reader/:id", controller.deleteReader);

router.get("/reader-copies", controller.getReaderCopies);
router.get("/reader-copy", controller.getReaderCopy);
router.put("/reader-copy", controller.updateReaderCopy);
router.post("/reader-copy", controller.createReaderCopy);
router.delete("/reader-copy", controller.deleteReaderCopy);

router.get("/copies", controller.getCopies);
router.post("/copy", controller.createCopy);
router.delete("/copy/:id", controller.deleteCopy);

module.exports = router;
