const List = require('../models').List;

module.exports.getAllLists = function(req, res) {
  List.findAll().then((result) => {
    console.log(result);
    res.json(result);
  }, error => {
    res.status(500).send(error);
  });
};
