const redis = require("redis");
const JWTR = require("jwt-redis").default;
const redisClient = redis.createClient();
// await redisClient.connect();
const jwtr = new JWTR(redisClient);
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
    decodedToken = jwtr.verify(token, secret);
  } catch (error) {
    err.statusCode = 500;
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
