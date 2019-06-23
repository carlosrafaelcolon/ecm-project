const async = require('async')
const keys = require('../config/keys')
let videoCollection
let emc
class YouTubeVideosDAO {
  static async injectDB (client) {
    if (videoCollection) {
      return
    }
    try {
      emc = await client.db(keys.dbName)
      videoCollection = await client.db(keys.dbName).collection('yt_vids')
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in YouTubeVideosDAO: ${e}`
      )
    }
  }
  static async insertMany (videos) {
    await async.eachSeries(videos, (video, callback) => {
      videoCollection.updateOne(
        { 'id': video.id },
        { $set: video },
        { upsert: true }
      )
      console.log(video)
      callback(new Error()) // Alternatively: callback(new Error());
    }, (err) => {
      if (err) {
        throw err
      }
      return true
    })
    // let cursor
    // try {
    //   cursor = await videos.insertMany(arr, { order: false })
    // } catch (e) {
    //   console.error(e)
    // }
    // return cursor
  }
}

module.exports = YouTubeVideosDAO
