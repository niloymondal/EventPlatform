import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
  let token;

  // 1. Check Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }
  // 2. Check cookie
  else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id }; // attach user ID, can add more info if needed
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default protect;
