export function loggerMiddleware(req, res, next) {
  const timestamp = new Date().toISOString();
  console.log(`[LUCCCA API] ${timestamp} ${req.method} ${req.url}`);
  next();
}
