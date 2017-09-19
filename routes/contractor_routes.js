const ContractorsController = require('../controllers/contractors_controller');

module.exports = app => {
  app.post('/api/contractors', ContractorsController.create);
  app.get('/api/contractors', ContractorsController.nearby);
}


//@34.1463238,-118.1475572
