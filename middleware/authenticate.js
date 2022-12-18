const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({
        status: 'fail',
        message: 'invalid token',
      });
  }
  const token = authHeader.split(' ')[1];
  try {
    const user = jwt.verify(token, process.env.Access_TOKEN_SECURE);
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
        status: 'fail',
        message: 'Unauthorized!',
      });
  }
};