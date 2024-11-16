const nodemailer = require("nodemailer");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

const transporter = nodemailer.createTransport({
    service: "gmail", // or your email provider
    auth: {
      user: process.env.USER,
      pass: process.env.USERPASS
    },
  });

app.post("/send",(req,res)=>{

    const {message,name,email} = req.body;

    const mailOptions = {
        from: process.env.USER,
        to: process.env.USER,
        subject: "A2 Website Visiter",
        text: "name:"+name+"\n\nemail:"+email+"\n\nmessage:"+message
      };

      if(!(message && name && email))
        return res.json({status:"Not Ok",message:"Message not sent",error:"Name, Email, Message is required"})

      
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("Error:", error);
        } else {
          console.log("Email sent:", info.response);
        }
      });  

      return res.json({status:"Ok",message:"Message sent successfully"})

})

app.listen(process.env.PORT,()=>console.log(`Server is running at port ${process.env.PORT}`))