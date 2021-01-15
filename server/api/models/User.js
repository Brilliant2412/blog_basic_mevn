const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const userSchema = new Schema({
    username:{
        type: String,
        min: 6,
        max: 255,
        unique: true,
        trim: true,
        required: [true, "Please include your name"]
    },
    email:{
        type: String,
        required: [true, "Please include your email"],
        index: true,
        trim: true,
    },
    password:{
        type: String,
        required: [true, "Please include your password"],
        minlength: 6
    },
    tokens:[
        {
            token:{
                type: String,
                required: true
            }
        }
    ]
});

userSchema.pre("save",async function(next){
    const user = this;
    if (user.isModified("password")){
        user.password = await bcrypt.hash(user.password,10);
    }
    next();
});

userSchema.methods.generateAuthToken = async function(){
    const user = this;
    const token = jwt.sign({_id : user._id},process.env.JWT_KEY);
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email} )
    if (!user) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    return user
}

const User = mongoose.model('User', userSchema)

module.exports = User