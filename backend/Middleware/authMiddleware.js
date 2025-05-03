const { expressjwt: jwt } = require("express-jwt");

const JWT_SECRET = "mySuperSecretKey123!@#";

const authenticateToken = jwt({
  secret: JWT_SECRET,
  algorithms: ["HS256"], // Algorithm used to sign the JWT
  requestProperty: "user", // Attach decoded token to req.user
  getToken: (req) => {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      return req.headers.authorization.split(" ")[1];
    }
    return null;
  }
});

module.exports = authenticateToken;
/* 
const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

module.exports = authenticateToken;
 */
