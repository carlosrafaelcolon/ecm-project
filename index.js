// const {
//   google
// } = require('googleapis')
const {
  MongoClient
} = require('mongodb')
const express = require('express')
const app = express()
const keys = require('./config/keys')
const YouTubeVideosDAO = require('./dao/yt_videos')
const SubjectDAO = require('./dao/subjects')
const ytRoutes = require('./routes/yt.routes')

app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

// const youtube = google.youtube({
//   version: 'v3',
//   auth: 'AIzaSyDSXoCP0W-a3U5DMz4JgUhisIYGnTNlCgw'
// })
// app.get('/', async (req, res, next) => {
//   let channel
//   try {
//     channel = await youtube.channels.list({
//       part: 'contentDetails',
//       id: 'UC0rZoXAD5lxgBHMsjrGwWWQ'
//     })
//   } catch (e) {
//     console.error(`Error retrieving channels: ${e}`)
//   }

//   const uploadId = channel.data.items[0].contentDetails.relatedPlaylists.uploads
//   const results = await getAllVideos(uploadId)

//   res.json(results)
// })
// async function getPlaylistItems(uploadId, next = null) {
//   try {
//     if (next) {
//       return await youtube.playlistItems.list({
//         playlistId: uploadId,
//         maxResults: '50',
//         part: 'snippet, contentDetails',
//         pageToken: next
//       })
//     } else {
//       return await youtube.playlistItems.list({
//         playlistId: uploadId,
//         maxResults: '50',
//         part: 'snippet, contentDetails'
//       })
//     }
//   } catch (e) {
//     console.error(`Error retrieving videos from upload playlist: ${e}`)
//     return {
//       data: null
//     }
//   }
// }

// async function getAllVideos(id) {
//   let {
//     data
//   } = await getPlaylistItems(id)
//   const videos = []
//   if (data) {
//     for (let item of data.items) {
//       videos.push(item)
//     }
//   }
//   if (Object.prototype.hasOwnProperty.call(data, 'nextPageToken')) {
//     let hasNext = true
//     let newBatch = await getPlaylistItems(id, data.nextPageToken)
//     console.log('first b', newBatch)
//     do {
//       for (let item of newBatch.data.items) {
//         videos.push(item)
//       }
//       hasNext = Object.prototype.hasOwnProperty.call(newBatch.data, 'nextPageToken')
//       newBatch = hasNext ? await getPlaylistItems(id, newBatch.data.nextPageToken) : null
//       console.log('next b', newBatch)
//     } while (hasNext)
//   }

//   return {
//     videos,
//     total_count: videos.length
//   }
//   // return data
// }

app.use('/api/v1/youtube', ytRoutes)

// Create a new MongoClient
MongoClient.connect(keys.mongoURI, {
  useNewUrlParser: true
})
  .catch(err => {
    console.error(err.stack)
    process.exit(1)
  })
  .then(async client => {
    await YouTubeVideosDAO.injectDB(client)
    await SubjectDAO.injectDB(client)
    app.listen(3000, () => {
      console.log('app listening on port 3000')
    })
  })
