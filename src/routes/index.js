const express = require("express")
const session = require("express-session")
const docusignEsign = require("./docusignEsign")

module.exports = app => {
    app.use(express.json(), express.urlencoded({ extended: true }))

    app.use(session({
        secret: "dfsf94835asda",
        resave: true,
        saveUninitialized: true,
     }));
     
    app.use(docusignEsign)
}