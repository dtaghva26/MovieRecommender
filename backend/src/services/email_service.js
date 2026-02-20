import sendEmail from "../config/email_config.js"
const EmailService = {
    send_welcome_email : async function(email){
        console.log("we are here")
        await sendEmail({
                to: email,
                subject: "Welcome to our app!",
                text: "Welcome to our movie rating app",
              });
    }
}
export default EmailService;