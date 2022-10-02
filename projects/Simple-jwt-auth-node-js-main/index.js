const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const app = express();
const cookieParser = require("cookie-parser");
// middleware
const { requireAuth , checkUser} =require('./authMiddleware/authMiddleware');
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
// view engine
app.set("view engine", "ejs");

// database connection
const dbURI =
  "mongodb+srv://Name:<passowrd>@cluster0.6nqa4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('*', checkUser);
app.get("/", (req, res) => res.render("home"));
app.get("/smoothies",requireAuth, (req, res) => res.render("smoothies")); //protect auth using requires auth middleware
app.use(authRoutes);
