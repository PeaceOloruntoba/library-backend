export const adminAuthorization = async (req, res, next) => {
  if (req.user.role === "admin") next();
  else res.status(403).json({ error: "Protected only for admin" });
};
