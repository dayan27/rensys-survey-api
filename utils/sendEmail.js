const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
    // try {
        // let testAccount = await nodemailer.createTestAccount();
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            // service: 'gmail',
            port: 587,
            secure: false,
            auth: {
                user: process.env.USER, 
                pass: process.env.PASS,
            },
        });   

         transporter.sendMail({
            from: '<no-reply@accounts.googl.com>',
            to: email,
            subject: subject, 
            text: text, 
        },(err,data)=>{

            if(err){
                console.log("Faild to send email😉", err);   
                // throw err;  
            }else{ 
                console.log("email😉 sent sucessfully"); 
            }
        });
};

module.exports = sendEmail;