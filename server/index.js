require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
require("./db/conn")
const path = require('path');
const PORT = 3001;
const session = require("express-session");
const passport = require("passport");
const OAuth2Strategy = require("passport-google-oauth2").Strategy;
const userdb = require("./models/userSchema")

const axios = require('axios');

const clientid = process.env.CLIENT_ID;
const clientsecret = process.env.CLIENT_SECRET;


app.use(cors({
    origin:"http://localhost:5173",
    methods:"GET,POST,PUT,DELETE",
    credentials:true
}));
app.use(express.json());

//Define routes
app.use('/api/invoices', require('./routes/invoices'));

// setup session
app.use(session({
    secret:"YOUR SECRET KEY",
    resave:false,
    saveUninitialized:true
}))

// setuppassport
app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new OAuth2Strategy({
        clientID:clientid,
        clientSecret:clientsecret,
        callbackURL:"/auth/google/callback",
        scope:["profile","email"]
    },
    async(accessToken,refreshToken,profile,done)=>{
        try {
            let user = await userdb.findOne({googleId:profile.id});

            if(!user){
                user = new userdb({
                    googleId:profile.id,
                    displayName:profile.displayName,
                    email:profile.emails[0].value,
                    image:profile.photos[0].value
                });

                await user.save();
            }

            return done(null,user)
        } catch (error) {
            return done(error,null)
        }
    }
    )
)

passport.serializeUser((user,done)=>{
    done(null,user);
})

passport.deserializeUser((user,done)=>{
    done(null,user);
});

// initial google ouath login
app.get("/auth/google",passport.authenticate("google",{scope:["profile","email"]}));

app.get("/auth/google/callback",passport.authenticate("google",{
    successRedirect:"http://localhost:5173/dashboard",
    failureRedirect:"http://localhost:5173/login"
}))

app.get("/login/success",async(req,res)=>{

    if(req.user){
        res.status(200).json({message:"user Login",user:req.user})
    }else{
        res.status(400).json({message:"Not Authorized"})
    }
})

app.get("/logout",(req,res,next)=>{
    req.logout(function(err){
        if(err){return next(err)}
        res.redirect("http://localhost:5173");
    })
})


app.post('/api/trigger', async (req, res) => {
    try {
      const jsonDataArray = req.body.data;
  
      // Assuming the JSON data array is an array of objects with the required fields
      for (const jsonData of jsonDataArray) {
        const { clientEmail, paymentDue, id, total, status, clientName,createdAt } = jsonData;
    console.log(clientEmail, paymentDue, id, total, status, clientName,createdAt) ;
        // Use the provided data to trigger the Zapier automation
        triggerZapierAutomation(clientEmail, paymentDue, id, total, status, clientName,createdAt);
      }
  console.log("zapier Triggered successfully")
      res.json({ msg: 'Data received and processed successfully' });
    } catch (error) {
      console.error('Error processing data:', error);
      res.status(500).json({ msg: 'Server Error' });
    }
  });
  
const triggerZapierAutomation = async (clientEmail, paymentDue, id, total, status, clientName,createdAt) => {
    try {
      const zapierWebhookUrl = process.env.WEBHOOK_URL;
  
      // Use the provided data as the payload
      const payload = {
        data: {
        clientEmail: clientEmail,
        paymentDue: paymentDue,
        id: id,
        total:  total,
        status: status,
        clientName: clientName,
        createdAt: createdAt
        }
      };
  
      await axios.post(zapierWebhookUrl, payload);
  
      console.log('Automation trigger sent to Zapier successfully');
    } catch (error) {
      console.error('Error triggering automation:', error);
    }
  };
  app.listen(PORT,()=>{
    console.log(`server start at port no ${PORT}`)
})

  

 