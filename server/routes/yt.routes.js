const { Router } = require('express')
const ytController = require('../controllers/yt.controllers')
const { authCheck } = require('../middlewares/authentication')
const router = new Router()

router.route('/channel').post(ytController.apiProcessChannelSelection)
router.route('/comments').post(ytController.apiGetComments)
router.route('/top_users').get(ytController.apiGetActiveUsers)
router.route('/subjects').get(ytController.apiGetSubjects)
router.route('/subject').get(ytController.apiGetSubject)
router.route('/videos').post(ytController.apiGetVideos)
router.route('/video').get(ytController.apiGetVideo)
router.route('/user_data').get(ytController.apiGetUserData)

module.exports = router
