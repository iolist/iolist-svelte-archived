const express = require('express');
const router = express.Router();

const listController = require('../controllers/list.controller');

router.get('/lists', listController.getAllLists);

module.exports = router;
