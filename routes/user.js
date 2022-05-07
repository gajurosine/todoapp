const router = require('express').Router();
const {login} = require('../controllers/user.js')
router.post('/login', login)
module.exports = router;