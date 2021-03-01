const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT || 3000;           
const jwt = require("jsonwebtoken");

const db = require("./connection");

const env = process.env.NODE_ENV || 'development';

if(env == 'development'){
  require('dotenv').config();
}
db.authenticate()
  .then(() => console.log("Connected successfully"))
  .catch((err) => console.log('Error in connecting: ',err));


console.log(env);

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const authenticateToken = (req, res, next) => {
  let token = req.headers.authorization;
    token = token.replace('Bearer ', '');
    jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, decodedToken) => {
      if(err){
        console.log(err.message);
        res.send(err.message);
      }else{
        req.userId = decodedToken._id;
        next();
      }
    })
}

app.use("/api/user", require("./routes/User"));
app.use("/api/cars", authenticateToken, require("./routes/Car"));


app.listen(PORT, console.log("Listening on port " + PORT));
