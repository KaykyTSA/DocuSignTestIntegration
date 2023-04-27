const { Router } = require("express")
const DocusignEsignController = require("../controllers/DocusignEsignController")
const DocusignEsignMiddleware = require("../middleware/DocusignEsignMiddleware")

const router = Router()

router.get("/", async (req, res) => {
    DocusignEsignMiddleware.checkToken
    res.sendFile("../view/index.html");
 });

router.get("/success", (req, res) => {
    res.send("Success");
});

router.post("/form", DocusignEsignMiddleware.checkToken, DocusignEsignController.main)

module.exports = router