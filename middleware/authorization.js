const authorization = async (req, res, next) => {
  const authorizationToken = req.headers.authorization;
  const token = authorizationToken?.split("Bearer ")[1];
  if (!token) return res.status(403).json({ error: "unauthorized access!" });
  const payload = jwt.verify(token, "secret");
  const user = await UserModel.findById(payload.id);
  if (!user) return res.status(403).json({ error: "unauthorized access!" });
  req.user = user;
  next();
};
