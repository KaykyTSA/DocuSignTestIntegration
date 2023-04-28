const express = require("express")
const testeRoutes = require("./testeRoutes")

module.exports = app => {
    app.use(express.json())
    app.use(testeRoutes)
}