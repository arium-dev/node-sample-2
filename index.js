import express from "express";
import passport from 'passport';
import session from "express-session";
import cors from "cors";
import routes from "./routes/index.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import "./database/connection.js";
import "./passport.js"

dotenv.config(); 

const app = express();
app.use(session({
  resave:false,
  saveUninitialized:true,
  secret:process.env.SECRET
}))
const port = process.env.PORT;
app.use(express.json()); 
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/public/uploads", express.static("public/uploads"));
app.use(passport.initialize());
app.use(passport.session());
app.get('/', (req, res) => {
  res.send('<a href="/auth/google">Login with Google</a>');
});
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/profile');
  }
);
app.get('/profile', (req, res) => {
  res.send(req.user);
});
app.use("/api", routes);







app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
