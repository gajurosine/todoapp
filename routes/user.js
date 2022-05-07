const router = require('express').Router();
const {login, deleted, create, defaults, update} = require('../controllers/user.js');
const {deletes, todos} = require('../middelwares/deleteTo')
router.post('/login', login);
router.delete('/delete', deletes, todos, deleted);
router.post('/create', deletes, todos, create);
router.get('/:token', deletes, todos, defaults);
router.put('/update', deletes, todos, update);
module.exports = router;