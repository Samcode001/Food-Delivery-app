const jwt = require("jsonwebtoken");
const SECRET = "Helloimsamnicetomeetyou";

const authenticateJwt = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      console.log(token);
      jwt.verify(token, SECRET, (err, payload) => {
        if (err)
          return res.status(401).json({ message: "UnAuthorised", error: err });
        console.log(payload)
        console.log("first");
        // req.headers["userId"] = payload.id;
        next();
      });
    }
  } catch (error) {
    res.status(500).send("Error in Authentication");
  }
};

module.exports = authenticateJwt;
