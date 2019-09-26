const router = require('koa-router')();
const controller = require('../controller/user')

router.post('api/user/create', controller.createUser)
router.post('api/user/update', controller.updateUser)

module.exports = router