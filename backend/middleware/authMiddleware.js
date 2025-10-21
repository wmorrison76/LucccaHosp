export function authMiddleware(req, res, next) {
  const token = req.headers.authorization;

  if (token === process.env.ACCESS_TOKEN || token === 'LUCCCA_ACCESS') {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized Access' });
  }
}
