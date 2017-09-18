module.exports = app => {
  app.post('/api/findContractors', (req, res, next) => {
    res.status(200).send('works');
  });
}
