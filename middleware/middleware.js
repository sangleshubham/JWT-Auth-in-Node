import jwt from "jsonwebtoken";

export default async function autheticationChecker(req, res, next) {
  const authToken = req.cookies.authToken;
  console.log(authToken);

  if (authToken) {
    /**validate auth token */
    jwt.verify(authToken, "this is secret", (err, decodedJWT) => {
      // verify takes a callback function - if token is wrong error will get called else decodeJWT will have decoded data
      if (err) {
        res.redirect("/login"); // if we get error/ jwt is not valid redirect uesr to login page
      } else {
        console.log("valid token");
        next();
      }
    });
  } else {
    res.send({ status: "failed" });
  }
}
