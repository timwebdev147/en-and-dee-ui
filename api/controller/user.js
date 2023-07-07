const { StatusCodes } = require("http-status-codes");
const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const shortid = require("shortid");
const fs = require('fs');



const signUp = async (req, res) => {
   let filePath = fs.readFileSync("ui/public/upload/" + req.file.filename)


  const { firstName, lastName, email, password, role, age, weight, height, username, medical_condition, religion, occupation, tribe } = req.body;
  if (!firstName || !lastName || !email || !password || !age || !weight || !height) {
     return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Please Provide Required Information",
     });
  }

  const hash_password = await bcrypt.hash(password, 10);
 
  const userData = {
     firstName,
     lastName,
     email,
     hash_password,
     role,
     age,
     weight,
     height,
     username,
     tribe,
     religion,
     occupation,
     medical_condition,
     profilePicture: {
         contentType: "image/jepg",
         data: filePath
     }
  };

  const user = await User.findOne({ email });
  if (user) {
     return res.status(StatusCodes.BAD_REQUEST).json({
        message: "User already registered",
     });
  } else {
     User.create(userData).then((data, err) => {
     if (err) res.status(StatusCodes.BAD_REQUEST).json({ err });
     else
       res
        .status(StatusCodes.CREATED)
        .json({ message: "User created Successfully" });
     });
    }
};
const signIn = async (req, res) => {
  try {
     if (!req.body.email || !req.body.password) {
        res.status(StatusCodes.BAD_REQUEST).json({
           message: "Please enter email and password",
        });
     }
 
     const user = await User.findOne({ email: req.body.email });
    
     if (user) {
     if (user.authenticate(req.body.password)) {
           const token = jwt.sign(
              { _id: user._id, role: user.role },
              process.env.JWT_SECRET,{ expiresIn: "30d"});
  const { _id, firstName, lastName, email, role, fullName, username, gender, age, weight, height, occupation, tribe, religion, medical_condition } = user;
  
  req.token = token;
  res.status(StatusCodes.OK).json({
       token,
       user: { _id, firstName, lastName, email, role, fullName, username, gender, age, weight, height, occupation, tribe, religion, medical_condition },
  });
 } else {
  res.status(StatusCodes.UNAUTHORIZED).json({
     message: "Something went wrong!",
  });
 }
} else {
  res.status(StatusCodes.BAD_REQUEST).json({
      message: "User does not exist..!",
  });
}
} catch (error) {
   res.status(StatusCodes.BAD_REQUEST).json({ error });
  }
};
const onGetAllUsers = async (req, res) => {
   try {
      const users = await User.find();
      res.status(200).json(users);

  } catch (error) {
      res.status(500).json(error);
  }
 };
const onGetUserById = async (req, res) => {

    try{
      const {id} = req.params;
      const user = await User.findById(id);
      if (!user) {
          return res.status(404).json({msg: `user with ID: ${id} was not found`})
      };
      res.status(200).json(user);
  } catch(error) {
      res.status(500).json(error)
  }
 };
const onDeleteUserById = async (req, res) => {
   try {
      const {id} = req.params;
      const user = await User.findByIdAndDelete(id)
      if(!user){
         return res.status(404).json({msg: `user with ID: ${id} was not found`})
      }
      res.status(200).json({msg: `user with ID: ${id} has been successfully deleted`});
      
   } catch (error) {
      res.status(500).json(error)
   }
 };
const updateUserById = async (req, res) => {
   try {

      const {id} = req.params;
      const user = await User.findByIdAndUpdate(
          {_id: id}, req.body, {
              new: true,
              runValidators: true,
          }
      )
      if(!user){
          return res.status(404).json({msg: `user with ID: ${id} was not found`})
      }

      res.status(200).json({msg: `user with ID: ${id} has been updated successfully`})

  } catch (error) {
      res.status(500).json(error)
  }
}
module.exports = { signUp, signIn, onGetAllUsers, onGetUserById, onDeleteUserById, updateUserById};