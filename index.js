const express = require("express")
const routes  = require("./src/routes")
const dotenv = require("dotenv");
dotenv.config();

const app = express()

routes(app)

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.info(`Server up and running in url: http://localhost:${port}`)
})