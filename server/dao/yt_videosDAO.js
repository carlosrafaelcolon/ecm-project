const keys = require('../config/keys')
let videoCollection
let emc
class YouTubeVideosDAO {
  static async injectDB(client) {
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
  static async insertMany(videos) {
    try {
      return await videoCollection.insertMany(videos, {
        order: false
      })
    } catch (e) {
      console.error(e)
      return {
        dbError: e
      }
    }
  }
  static async updateVideo(obj) {
    try {
      return await videoCollection.updateOne({
        _id: obj._id
      }, {
        $set: obj
      }, {
        upsert: true
      })
    } catch (e) {
      console.error(e)
      return {
        dbError: e
      }
    }
  }
  static async videoCount(channelId) {
    try {
      return await videoCollection.countDocuments({
        'snippet.channelId': channelId
      })
    } catch (e) {
      console.error(
        `Unable to count documents in videoCollection: ${e}`
      )
      return {
        dbError: e
      }
    }
  }
  static async findVideos({
    filters = null,
    page = 0,
    videosPerPage = 30,
  } = {}) {
    let queryParams = {}
    if (filters) {
      if ("channelId" in filters) {
        queryParams = {
          query: {
            'snippet.channelId': filters["channelId"]
          }
        }
      } else if ("videoId" in filters) {
        queryParams = {
          query: {
            'contentDetails.videoId': filters["videoId"]
          }
        }
      }
    }
    let {
      query = {}, project = {}, sort = [
        ["contentDetails.videoPublishedAt", -1]
      ]
    } = queryParams
    try {
      return await videoCollection.find(query)
        .project(project)
        .sort(sort)
        .skip((videosPerPage * page))
        .limit(videosPerPage)
        .toArray()
    } catch (e) {
      console.error(
        `Unable to retrieve videos: ${e}`
      )
      return {
        dbError: e
      }
    }
  }
  static async getVideo(videoId) {
    try {
      return await videoCollection.findOne({'contentDetails.videoId': videoId})
    } catch (e) {
      console.error(
        `Unable to retrieve video: ${e}`
      )
      return {
        dbError: e
      }
    }
  }
  static async findVideoByChannelCursor(channelId) {
    try {
      return await videoCollection.find({
        'snippet.channelId': channelId
      }).project({
        contentDetails: 1,
        'snippet.channelId': 1
      }).sort({
        'commentsExtracted': 1,
        'contentDetails.videoPublishedAt': -1
      })
    } catch (e) {
      console.error(
        `Unable to retrieve document by id: ${e}`
      )
      return {
        dbError: e
      }
    }
  }
}

module.exports = YouTubeVideosDAO