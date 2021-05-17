const jwt = require("jsonwebtoken");
const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const authenticate = require('../middleware/Authenticate');

require('../db/connenction');
const User = require('../model/userSchema');

router.get('/', (req, res) =>{
    res.send('helo world from the server router js');
});

// Promise method use
/*router.post('/register', (req, res) => {
    const { name, email, phone, work, password, cpassword } = req.body;
    //res.send('mera register page');
    if(!name || !email || !phone || !work || !password || !cpassword){
        return res.status(422).json({error: "Plz fill the all Field"});
    }

    User.findOne({email : email}).then((userExist) => {
        if(userExist){
            return res.status(422).json({error: "This email Id is already Exist"});
        }

        const user = new User({name, email, phone, work, password, cpassword});

        user.save().then(() => {
            res.status(201).json({ message: "user register successfuly" });
        }).catch((err) => {
            res.status(500).json({error: "Failed to registered"});
        })

    }).catch((error) => {
        console.log(error);
    });

});*/

// Async await method use
router.post('/register', async (req, res) => {
    const { name, email, phone, work, password, cpassword } = req.body;
    if(!name || !email || !phone || !work || !password || !cpassword){
        return res.status(422).json({error: "Plz fill the all Field"});
    }

    try{
        const userExist = await User.findOne({email : email});
        if(userExist){
            return res.status(422).json({error: "This email Id is already Exist"});
        } else if(password != cpassword){
            return res.status(422).json({error:"password and confirm password not match"});
        } else{
            const user = new User({name, email, phone, work, password, cpassword});
            await user.save();
            res.status(201).json({ message: "user register successfuly" });
        }
        

    } catch(error){
        console.log('error hai');
    }
});


//login route

router.post('/signin', async (req, res) => {
    try{
        let token;
        const {email, password} = req.body;
        
        if(!email || !password){
            return res.status(400).json({error: "Please fill all fields"});
        }

        const userLogin = await User.findOne({ email:email });

        if(userLogin){
            const isMatch = await bcrypt.compare(password, userLogin.password);

            if(!isMatch){
                res.status(400).json({error:"user error"});
            } else{
                // need to genereate the token and stored cookies after the password match 
                token = await userLogin.generateAuthToken();
                console.log(token);

                res.cookie('jwtoken', token, {
                    expires: new Date(Date.now() + 25892000000),
                    httpOnly: true
                });

                res.json({msg:"user sign in succefully"});
            }

        } else {
            res.status(400).json({msg:"user error"});
        }

        

    } catch(err){
        console.log(err);
    }
}); 



//get user data for contact page and home page
router.get('/getdata', authenticate, (req, res) => {
    console.log('helo About world from the server');
    res.send(req.rootUser);
});


// contact us page
router.post('/contact', authenticate, async (req, res) => {
    try{

        const {name, email, phone, message} = req.body;

        if(!name || !email || !phone || !message  ){
            console.log('error in contact form')
            return res.json({ error: "Plz filled the all column" })    
        }

        const userContact = await User.findOne({ _id: req.userID })

        if(userContact){
            const userMessage = await userContact.addMessage( name, email, phone, message );
            await userContact.save();
            res.status(201).json({message:"user contact succesfuly"})
        }

    }catch(err){
        console.log(err)
    }
});

// About us ka page
router.get('/about', authenticate, (req, res) => {
    console.log('helo About world from the server');
    res.send(req.rootUser);
});

// Logout ka page
router.get('/logout', (req, res) => {
    console.log('helo Logout Page');
    res.clearCookie('jwtoken', {path:'/'});
    res.status(200).send('user logout');
});


module.exports = router;