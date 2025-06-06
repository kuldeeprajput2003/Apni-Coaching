const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
    host:process.env.SMTP_HOST,
    port:process.env.SMTP_PORT,
    secure:false,
    requireTLS:true,
    auth:{
        user:process.env.SMTP_MAIL,
        pass:process.env.SMTP_PASSWORD
    }
});

const sendMail = async(email, subject, content)=>{
    try {
        const mailOptions = {
            from:process.env.SMTP_MAIL,
            to:email,
            subject:subject,
            html:content
        }

        transporter.sendMail(mailOptions,(err,info)=>{
            if (err) {
                console.log("Mail Sending Error: "+err);                
            } else {
                console.log("Mail Info: "+info.messageId);
                                
            }
        });
    } catch (error) {
        console.log("Error: "+error);       
    }
}

module.exports = sendMail;