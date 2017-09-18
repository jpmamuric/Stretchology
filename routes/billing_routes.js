const config  = require('../config/keys');
const stripe  = require('stripe')(config.stripeSK);
const requireLogin = require('../middlewares/require_login');

module.exports = app => {
  app.post('/api/stripe', requireLogin, async (req, res) => {
    if(!req.user) {
      return res.status(401).send({ error:'Must be logged in' });
    }

    const charge = await stripe.charges.create({
      amount: 2500,
      currency: "usd",
      description: "Stretchology $25 for 30 min session",
      source: req.body.id
    });

    req.user.credits += 25
    const user = await req.user.save();
    res.send(user);

  });
}
