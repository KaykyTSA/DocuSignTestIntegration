const docusign = require("docusign-esign");
const dotenv = require("dotenv");
const fs = require("fs")
const path = require("path");

dotenv.config();

class DocusignEsignMiddleware {
    static async checkToken(req) {
        if (req.session.access_token && Date.now() < req.session.expires_at) {
            console.log("re-using access_token ", req.session.access_token);
        } else {
            console.log("generating a new access token");
            let dsApiClient = new docusign.ApiClient();
            dsApiClient.setBasePath(process.env.BASE_PATH);

            privateKey = fs.readFileSync("C:/Users/kayky/Documents/alest/Alest-GitHub/DocuSignTestIntegration/src/middleware/private.key")

            console.log(privateKey)

            const results = await dsApiClient.requestJWTUserToken(
                process.env.INTEGRATION_KEY,
                process.env.USER_ID,
                "signature",
                fs.readFileSync(path.join(__dirname, "private.key")),
                3600
            );
            console.log(results.body);
            req.session.access_token = results.body.access_token;
            req.session.expires_at = Date.now() + (results.body.expires_in - 60) * 1000;

        }

    }
}

module.exports = DocusignEsignMiddleware