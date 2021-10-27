const User = require('../models/user.model.js');
const jwt = require('jsonwebtoken');

const secret = "FDn15Q6Zqs3vcpznfJwJkDFPKz4J1bIPmwHhDDIHpwivpYT1UL7323tlyznywBRupPvj8h28feSWHSCbuCq3inwKH0sRUUSOXZOTvGiWqX3MiOzeGGEneNXlAWUtPjooIg556kw3RkVYXPvMIHHSACLqQSI6E4NEdSxOh9aP7o7AShGrth9+KDA7iJYC/77vCbtKM+21vV7jxwFJmEisLpemV6sNlVkdTLBJBcc2aGT+SuJaHfNA8JHtvf0KiC/zn8UgW6prR79UA6cKl8DbAwsIJMOaNYJYnMIBRUc4YnsW7nyu8WiHd5U31OY2K+/Mlr4tDw0I4j0nB+Jx+rPyxA=="

//Handle Errors

const handleErrors = (err) => {
  let errors = {email: '', password: ''}
  // incorrect email
  if (err.message === 'Incorrect Email ID') {
    errors.email = 'Email is not registered';
  }

  // incorrect password
  if (err.message === 'Incorrect Password') {
    errors.password = 'Please enter correct password';
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = 'User already exists';
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
  return jwt.sign({ id }, secret, { expiresIn: maxTime })
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
    res.status(200).json({ email, token })
  }
  catch(err) {
    const errors = handleErrors(err)
    res.status(400).json({errors})
  }
}

module.exports.login_post = async (req, res) => {
  let { email, password } = req.body;
  try {
    const user = await User.login(email, password)
    const token = createToken(user._id);
    res.status(200).json({email, token})
  }
  catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({ errors })
  }
}