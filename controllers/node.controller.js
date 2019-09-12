const models = require('../models');

const Node = models.Node;

module.exports.createNode = function(req, res) {
  Node.create(req.body)
    .then(node => {
      console.log(node);
      res.json(node.get({plain: true}));
    }, error => {
      res.status(500).send(error);
    });
};

module.exports.editNode = function(req, res) {
  Node.findByPk(req.params.id).then(node => {
    console.log(node);
    if (node) {
      node.update(req.body).then(() => {
        res.json({id: node.id, success: true});
      }, error => {
        res.status(500).send(error);
      });
    }
  }, error => {
    res.status(500).send(error);
  });
};
