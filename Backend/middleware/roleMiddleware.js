export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    const userRole = req.user?.role;
    if (!roles.includes(userRole)) {
      console.warn(`🚫 Access denied: Role '${userRole}' is not in allowed roles: [${roles.join(', ')}]`);
      return res.status(403).json({
        success: false,
        message: `Role '${userRole}' is not allowed to access this resource`,
      });
    }
    next();
  };
};
