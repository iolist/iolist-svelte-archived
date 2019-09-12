const models = require('../models');

const List = models.List;
const Node = models.Node;

module.exports.getAllLists = function(req, res) {
  List.findAll().then((result) => {
    res.json(result);
  }, error => {
    res.status(500).send(error);
  });
};

module.exports.getListContent = function(req, res) {
  Node.findAll({ where: {list_id: req.params.id} }).then((result) => {
    res.json(result);
  }, error => {
    res.status(500).send(error);
  });
};
