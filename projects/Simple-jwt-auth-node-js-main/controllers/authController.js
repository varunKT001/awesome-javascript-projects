const User = require("../models/User");
const jwt = require("jsonwebtoken");
const handleError = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };
   //incorrect email
   if(err.message==='incorrect email'){
     errors.email='This Email is incorrect'
   }

   if(err.message==='incorrect password'){
    errors.password='This password is incorrect'
  }
  // duplicate email error
  if (err.code === 11000) {
    errors.email = "that email is already registered";
    return errors;
  }

  // validation errors
  if (err.message.includes("user validation failed")) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};
//create a json web token

const createToken = (id) => {
  return jwt.sign({ id }, "SECRET_KEY", {
    expiresIn: 60 * 60 * 24 * 3,
  });
};

module.exports.sign_up_get = (req, res) => {
  res.render("signup");
};

module.exports.sign_up_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 3 * 1000,
    });
    res.status(201).json({ user: user._id });
  }
   catch (err) {
    const errors = handleError(err);
    res.status(400).json({ errors });
  }
};
module.exports.login_get = (req, res) => {
  res.render("login");
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
 try{
     const user= await User.login(email,password);
     console.log(user);
     const token = createToken(user._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 3 * 1000,
    });
     res.status(200).json({ user:user._id });
 }
 catch(err) {
   const errors=handleError(err);
   res.status(400).json({errors});


 }
};


module.exports.logout_get=(req,res)=>{
  res.cookie('jwt','',{maxAge:1});
  res.redirect('/');
}
