const jwt = require("jsonwebtoken");
const secret = process.env.MY_SECRET_KEY;

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");

  // check if Authorization header is included in request top determine is user is authenticated
  if (!authHeader) {
    const error = new Error("Not auntheticated");
    error.statusCode = 401;
    throw error;
  }

  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, secret);
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }

  if (!decodedToken) {
    const error = new Error("Not auntheticated");
    error.statusCode = 401;
    throw error;
  }

  req.userId = decodedToken.userId;
  next();
};
