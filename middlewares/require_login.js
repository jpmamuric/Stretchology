module.exports = (req, res, next) => {
  if(!req.user) {
    return res.status(401).send({ error:'login error, must log in' });
  }

  next();
};
