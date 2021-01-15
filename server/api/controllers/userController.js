const User = require('../models/User');
const jwt = require("jsonwebtoken");

exports.register = async(req,res)=>{
    try{
        const checkEmailExist = await User.findOne({email: req.body.email});
        if (checkEmailExist){
            return res.status(409).json({
                message : 'Email already use'
            })
        }
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });
        // const user = new User(req.body);
        const newUser = await user.save();
        const token = await user.generateAuthToken();
        res.status(201).json({newUser,token});
    }catch(err){
        res.status(400).json({err: err});
    }
}
exports.login = async(req,res)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;
        const user = await User.findByCredentials(email,password);
        if (!user){
            // res.status(401).json({
            //     error : 'Login failed'
            // })
            return res
            .status(401)
            .json({ error: "Login failed! Check authentication credentials" });
        }
        const token = await user.generateAuthToken();
        res.status(201).json({user,token});
    }
    catch(err){
        res.status(400).json({
            err: err
        })
    }
}

// exports.getUserDetails = async(req,res)=>{
//     await res.json(req.user);
// }



