const axios = require("axios")
const dotenv = require("dotenv");
dotenv.config();

async function getAcessToken() {
    const tokenUri = "https://account-d.docusign.com/oauth/token"
    const key = `${process.env.INTEGRATION_KEY}:${process.env.SECRET_KEY}`
    const keyBase64 =  new Buffer(key).toString('base64')

    const body = {
        grant_type : "authorization_code",
        code : `${process.env.CODE_GRANT}`
    }
    const headers = {
        "Content-Type" : "application/json",
        "Authorization" : `Basic ${keyBase64}` 
    }

    const token =  axios.post(`${tokenUri}`, body, { headers }).then((response) => {
        console.log(response.data)
        return response.data
    })

    return token
}

module.exports = getAcessToken