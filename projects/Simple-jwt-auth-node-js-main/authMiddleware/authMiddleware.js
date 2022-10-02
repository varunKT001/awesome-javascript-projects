const jwt = require("jsonwebtoken");
const User = require("../models/User");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, "SECRET_KEY", (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("/login");
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};

// check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "SECRET_KEY", async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        console.log(user);
        const email= user.email;
        let s="";
        for(let i=0;i<email.length;i++)
        {
               if(email[i]!=='@')
               {
                   s+=email[i];
               }
               else{
                   break;
               }
        }
        const str= {email:s};
        res.locals.user = str;
        next();
      }
    });
  } 
  else {
    res.locals.user = null;
    next();
  }
};

module.exports = { requireAuth, checkUser };
