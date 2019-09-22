const models = require('../models');

const List = models.List;
const Node = models.Node;

module.exports.createList = function(req, res) {
  List.create(req.body)
    .then(node => {
      console.log(node);
      res.json(node);
    }, error => {
      res.status(500).send(error);
    });
};

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

module.exports.deleteList = function(req, res) {
  List.findByPk(req.params.id).then(node => {
    console.log(node);
    if (node) {
      node.destroy().then(() => {
        res.json({deleted_id: req.params.id, success: true});
      }, error => {
        res.status(500).send(error);
      });
    }
  }, error => {
    res.status(500).send(error);
  });
};
