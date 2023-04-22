const express = require('express');
const {getProject,postProject} = require('../controllers/projectController');
const router = express.Router();
const validationToken = require('../middleware/validateTokenHandler')

router.get('/:id', validationToken, getProject);
router.post('/:id', validationToken, postProject);

module.exports = router;