const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const bearer = req.header('Authorization');
  const cookieToken = req.cookies && req.cookies.token;
  const raw = cookieToken || (bearer ? bearer.replace('Bearer ', '') : null);
  if (!raw) return res.status(401).json({ message: 'Access denied' });

  try {
    const verified = jwt.verify(raw, process.env.JWT_SECRET || 'supersecretkey');
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
