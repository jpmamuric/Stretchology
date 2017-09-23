const ContractorsController = require('../controllers/contractors_controller');

module.exports = app => {
  app.post('/api/contractors', ContractorsController.create);
  app.get('/api/contractors', ContractorsController.nearby);
  app.get('/api/contractors/all', ContractorsController.all);
}


//@34.1463238,-118.1475572
