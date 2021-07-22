const User = require('../models/user.model.js');
const jwt = require('jsonwebtoken');

//Handle Errors

const handleErrors = (err) => {
  let errors = {email: '', password: ''}

  if(err.code === 11000) {
    errors.email = 'Email already exists'
    return errors;
  }

  if(err.message.includes('User validation failed')){
    Object.values(err.errors).forEach(({properties}) => {
      errors[properties.path] = properties.message; 
    })
  }
  return errors;
}

const maxTime = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'some secret', { expiresIn: maxTime })
}

module.exports.signup_get = (req, res) => {
  res.send({success: true, message: 'Signup'});
}

module.exports.login_get = (req, res) => {
  res.send({success: true, message: 'Login'});
}

module.exports.signup_post = async (req, res) => {
  let { email, password } = req.body;
  
  try{
    const user = await User.create({ email, password })
    const token = createToken(user._id)
    res.cookie('jwt', token, {httpOnly: true, maxAge: maxTime * 1000});
    console.log(req.cookies)
    res.status(201).json({ email, password, token })
  }
  catch(err) {
    const errors = handleErrors(err)
    res.status(400).json({errors})
  }
}

module.exports.login_post = async (req, res) => {
  let { email, password } = req.body;
  console.log(email, password);
  res.send('user login');
}