const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userModel = require("../models/UserModel");

exports.getAllUsers = async (req, res) => {

  const user = await userModel.findAll();
  
  res.send(user);
};

exports.registerUser = async (req, res) => {
    console.log(req.body);
  const userExist = await userModel.findOne({
    where: { email: req.body.email },
  });

  if (userExist) {
    res.send({
      msg: "User already existed",
      isUser: true,
    });
    return;
  }
  console.log(req.body);

  

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
  
    console.log(hashedPassword);
    const user = await userModel.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        created_at: new Date(),
      });
      res.status(200).send('User added');
  } catch (error) {
      console.log(error);
      res.send(error);
  }
};

exports.loginUser = async (req, res) => {
  console.log(process.env.JWT_EXPIRES_IN);
  console.log(req.body);
  const userExist = await userModel.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (!userExist) {
    res.send({
      msg: "User not found",
      isUser: false,
    });
    return;
  }

  const validPD = await bcrypt.compare(
    req.body.password,
    userExist.password
  );

  if (!validPD) {
    res.send({
      msg: "Password does not match",
      isPassword: false,
    });
    return;
  }

  let jwtExpires = 60 * 60 * process.env.JWT_EXPIRES_IN;
  const token = jwt.sign(
    {
      _id: userExist.id,
      rand: genString,
    },
    process.env.JWT_TOKEN_SECRET,
    {
      expiresIn: jwtExpires,
    }
  );
  console.log(token);

  res.header("auth-token", token).send({
    token,
    expiresIn: jwtExpires,
  });
};
