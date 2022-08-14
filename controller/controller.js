import "../database/connection.js";
import User from "../database/user.js";


function handleErroes(err)
{
    let errors = {email :{message : ''}, password : {message : ''}}
    if(err.code && err.code === 11000)
    {
        errors['email']['message'] = 'Email is already registered'
        return errors
    }
    errors.email.message  =  err.errors?.email?.message
    errors.email.password = err.errors.password.message // get email and password validation errors.
return errors
}

export function getHomepage(req, res) {
  res.render("home");
}

export function getSmoothies(req, res) {
  res.render("smoothies");
}

export function getSignup(req, res) {
  res.render("signup");
}

export function getLogin(req, res) {
  res.render("login");
}

export async function postSignup(req, res) {
  const { email, password } = req.body; // destructure

  try {
    const userData = await User.create({ email, password }); // push data to collection
    res.status(201).json(userData);// send created user details back
  } catch (error) {
    res.status(401).json(handleErroes(error));// errors defined inside user schema will be catched here.
  }
}

export async function postLogin(req, res) {
    const { email, password } = req.body;
  try {
    const userData = await User.find();
    res.send(userData);
  } catch (error) {
    res.status(401).json(error.message);
  }
}
