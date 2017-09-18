const config  = require('../config/keys');
const stripe  = require('stripe')(config.stripe.secretKey);
const requireLogin = require('../middlewares/require_login');
const endpointSecret = config.stripe.webhookSecretKey;

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

  app.post('/api/stripe/webhooks', (req, res) => {
    try {
      let signature = req.headers["stripe-signature"];
      let event = stripe.webhooks.constructEvent(req.body, signature, endpointSecret);
      console.log(event);
      res.status(200).send({ recieved: true });
    } catch (err) {
      console.log('Error', err.message)
      return res.status(422).send(`Webhook Error${err.message}`);
    }
  });
}
