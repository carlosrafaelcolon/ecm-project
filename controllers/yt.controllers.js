const {
  google
} = require('googleapis')
const YouTubeVideosDAO = require('../dao/yt_videos')
const SubjectDAO = require('../dao/subjects')

const youtube = google.youtube({
  version: 'v3',
  auth: 'AIzaSyDSXoCP0W-a3U5DMz4JgUhisIYGnTNlCgw'
})
class ytController {
  static async apiInsertChannelVideos(req, res, next) {
    const channelId = req.query.id

    console.log('channelId', channelId)
    let channel
    // First check if channel already exists via subjects
    try {
      channel = await SubjectDAO.findById(channelId)
    } catch (e) {
      console.error(
        `An error occurred when retrieving document via id: ${e}`
      )
    }
    if (!channel) {
      try {
        channel = await youtube.channels.list({
          part: 'contentDetails',
          id: channelId
        })
      } catch (e) {
        console.error(`Error retrieving channel: ${e}`)
      }
      const uploadId = channel.data.items[0].contentDetails.relatedPlaylists.uploads
      try {
        const subject = 
      } catch (e) {

      }
      const results = await getAllVideos(uploadId)
      try {
        await YouTubeVideosDAO.insertMany(results.videos)
      } catch (e) {
        console.log(`An error ocurred while inserting videos to db: ${e}`)
      }
    }
  }
}
async function getPlaylistItems(uploadId, next = null) {
  try {
    if (next) {
      return await youtube.playlistItems.list({
        playlistId: uploadId,
        maxResults: '50',
        part: 'snippet, contentDetails',
        pageToken: next
      })
    } else {
      return await youtube.playlistItems.list({
        playlistId: uploadId,
        maxResults: '50',
        part: 'snippet, contentDetails'
      })
    }
  } catch (e) {
    console.error(`Error retrieving videos from upload playlist: ${e}`)
    return {
      data: null
    }
  }
}

async function getAllVideos(id) {
  let {
    data
  } = await getPlaylistItems(id)
  const videos = []
  if (data) {
    for (let item of data.items) {
      videos.push(item)
    }
  }
  if (Object.prototype.hasOwnProperty.call(data, 'nextPageToken')) {
    let hasNext = true
    let newBatch = await getPlaylistItems(id, data.nextPageToken)
    console.log('first b', newBatch)
    do {
      for (let item of newBatch.data.items) {
        videos.push(item)
      }
      hasNext = Object.prototype.hasOwnProperty.call(newBatch.data, 'nextPageToken')
      newBatch = hasNext ? await getPlaylistItems(id, newBatch.data.nextPageToken) : null
      console.log('next b', newBatch)
    } while (hasNext)
  }

  return {
    videos,
    total_count: videos.length
  }
  // return data
}

module.exports = ytController