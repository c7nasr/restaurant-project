const {  generate_user_token,hashing_password } = require("../libs/authentcation.lib");
const User = require("../models/user.model");

exports.user_login = async (req, res) => {
    try {
        const {login,password} = req.body


            // Check if provided login is already existed
            const user = await User.findOne({ login }).select("+password");

            if (!user) return res.status(401).json({success:false,error:"Credentials error"});
    
            //checking password
            if (!user.comparePassword(password)) return res.status(401).json({success:false,error:"Credentials error"});
        
            // Everything is Good? Generate user token
            const jwt_token = generate_user_token(user._id)
            return res.json({success:true,token: jwt_token});
    

     
        
    } catch (error) {
      res.sendStatus(500)
    }
  };
  
exports.user_signup = async (req,res) => {

    try {
        const {login,password} = req.body



        // We need to validate Email, username, Phone is unique
        const user = await User.findOne({ login });
        if (user) return res.status(401).json({success:false,error: 'Used Credentials is already existed.'});

        // Hashing password
        const hashed_password = await hashing_password(password)

        //Creating New User Doc
        const newUser = await User.create({login,password:hashed_password})

        // get token for the new user
        const jwt_token = generate_user_token(newUser._id)

        // return token for the user
        return res.json({success:true,token: jwt_token});

        
    } catch (error) {
        res.sendStatus(500)

    }
}