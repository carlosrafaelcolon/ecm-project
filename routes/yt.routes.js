const { Router } = require('express')
const ytController = require('../controllers/yt.controllers')
const router = new Router()

router.route('/').get(ytController.apiInsertChannelVideos)

module.exports = router
