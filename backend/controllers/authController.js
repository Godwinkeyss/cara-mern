import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/getToken.js';
import expressAsyncHandler from 'express-async-handler'
export const signin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.status(200).send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin:user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(400).send({ message: 'Invalid Credentials' });
  } catch (error) {
    res.status(500).send({ message: 'Something went wrong' });
  }
};

export const signUp = expressAsyncHandler(async(req,res)=>{
  const {name,email,password} = req.body
  if(!name || !email || !password){
    res.status(500).send({ message: 'Please Provide all field' });
  }
  const existUser = await User.findOne({email})
  if(existUser){
    res.status(401).send({ message: 'User already exist' });
  }
  const newUser = new User({
    name:req.body.name,
    email:req.body.email,
    password:bcrypt.hashSync(req.body.password,10),
  })
  const savedUser = await newUser.save()
  res.status(201).send({
    _id:savedUser._id,
    name:savedUser.name,
    email:savedUser.email,
    isAdmin:savedUser.isAdmin,
    token:generateToken(savedUser)
  })
})