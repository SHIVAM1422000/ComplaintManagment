module.exports = (roles = []) => {
  if (typeof roles === 'string') roles = [roles];
  return (req,res,next) => {
    const userRole = req.user?.role;
    if (!userRole) return res.status(401).json({ message: 'Unauthorized' });
    if (roles.length && !roles.includes(userRole)) return res.status(403).json({ message: 'Forbidden' });
    next();
  };
};
