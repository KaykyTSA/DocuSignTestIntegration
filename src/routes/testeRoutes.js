const { Router } = require("express")
const getAcessToken = require("../authentication/index")

const router = Router()

router.get("/", async (req, res) => {
    res.status(200).json({message: "loki"})
})

module.exports = router