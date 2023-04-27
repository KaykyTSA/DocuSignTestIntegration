const docusign = require("docusign-esign");

class DocusignEsignController {
    static async main(req, res){
        let envelopesApi = this.getEnvelopesApi(req);
        let envelope = this.makeEnvelope(req.body.name, req.body.email, req.body.company);

        let results = await envelopesApi.createEnvelope(
            process.env.ACCOUNT_ID, {envelopeDefinition: envelope}
        );
        console.log("envelope results ", results);

        let viewRequest = this.makeRecipientViewRequest(req.body.name, req.body.email);
        results = await envelopesApi.createRecipientView(process.env.ACCOUNT_ID, results.envelopeId,
        {recipientViewRequest: viewRequest});

        res.redirect(results.url);
        
    }
    
    static getEnvelopesApi(req) {
        let dsApiClient = new docusign.ApiClient();
        dsApiClient.setBasePath(process.env.BASE_PATH);
        dsApiClient.addDefaultHeader('Authorization', 'Bearer ' + req.session.access_token);
        return new docusign.EnvelopesApi(dsApiClient);
    }

    static makeEnvelope(name, email, company) {
        let env = new docusign.EnvelopeDefinition();
        env.templateId = process.env.TEMPLATE_ID;
        let text = docusign.Text.constructFromObject({
           tabLabel: "company_name", value: company});
     
        let tabs = docusign.Tabs.constructFromObject({
           textTabs: [text],
        });
     
        let signer1 = docusign.TemplateRole.constructFromObject({
           email: email,
           name: name,
           tabs: tabs,
           clientUserId: process.env.CLIENT_USER_ID,
           roleName: 'Applicant'});
     
        env.templateRoles = [signer1];
        env.status = "sent";
     
        return env;
    }

    static 
    (name, email){
        let viewRequest = new docusign.RecipientViewRequest();

        viewRequest.returnUrl = "http://localhost:8080/success";
        viewRequest.authenticationMethod = 'none';
     
        viewRequest.email = email;
        viewRequest.userName = name;
        viewRequest.clientUserId = process.env.CLIENT_USER_ID;
     
        return viewRequest
    }
}

module.exports = DocusignEsignController