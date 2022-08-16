import "../database/connection.js";
import User from "../database/user.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'

function handleErrors(err) {
  let errors = { email: { message: "" }, password: { message: "" } };
  if (err.code && err.code === 11000) {
    errors["email"]["message"] = "Email is already registered";
    return errors;
  }
  errors.email.message = err.errors?.email?.message;
  errors.email.password = err.errors?.password?.message; // get email and password validation errors.
  return errors;
}

function generateJWT(id) {
  return jwt.sign(
    {id} /**payload */,
    "this is secret" /** this is secrete key ... store it in env */,
    {
      expiresIn: 3 * 24 * 60 * 60, //in seconds not ms -- 3 days
    }
  );
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
  console.log(req.body)
  res.render("login");
}

export async function postSignup(req, res) {
  const { email, password } = req.body; // destructure

  try {
    const userData = await User.create({ email, password }); // push data to collection

    const id = userData._id;
    res.cookie('authToken' , generateJWT(id) , {
      maxAge : 3 * 24*60*60*1000,
      httpOnlyy: true,
      secure : true
    })
    res.status(201).json(userData._id); // send created user details back
  } catch (error) {
    res.status(401).json(handleErrors(error)); // errors defined inside user schema will be catched here.
  }
}

export async function postLogin(req, res) {
  const {email, password} = req.body


  try {
    const userDetails =  await User.login(email, password)
    res.cookie( 'authToken' , generateJWT(userDetails._id))
    res.status(200).send({status : 'logged In'})
  } catch (error) {
    return {error : {errorMessage : error.message}}
  }


}
