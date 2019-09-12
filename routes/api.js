const express = require('express');
const router = express.Router();

const listController = require('../controllers/list.controller');
const nodeController = require('../controllers/node.controller');

router.get('/lists', listController.getAllLists);

router.get('/list/:id', listController.getListContent);

router.post('/node', nodeController.createNode);

router.put('/node/:id', nodeController.editNode);

router.delete('/node/:id', nodeController.deleteNode);

module.exports = router;
