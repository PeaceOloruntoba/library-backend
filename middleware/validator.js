export const newUserValidator = (req, res, next) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const { email } = req.body;
  if (!emailRegex.test(email)) {
    return res.status(422).json({ error: "Please provide a valid email" });
  }
  next();
};
