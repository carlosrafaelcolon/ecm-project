const { Router } = require('express')
const usersCtrl = require("../controllers/users.controller").UserController
const { authCheck } = require('../middlewares/authentication')

const router = new Router()

// associate put, delete, and get(id)
router.route("/register").post(usersCtrl.register)
router.route("/login").post(usersCtrl.login)
router.route("/logout").post(usersCtrl.logout)
router.route("/delete").delete(usersCtrl.delete)
router.route("/update-preferences").put(usersCtrl.save)
router.route("/make-admin").post(usersCtrl.createAdminUser)

module.exports = router
