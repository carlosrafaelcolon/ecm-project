const {
  google
} = require('googleapis')
const sgMail = require('@sendgrid/mail');

// const ObjectId = require('bson').ObjectID
const YouTubeVideosDAO = require('../dao/yt_videosDAO')
const YouTubeCommentsDAO = require('../dao/yt_commentsDAO')
const SubjectDAO = require('../dao/subjectsDAO')
const channelUpdateTemplate = require('../services/emailTemplates/channelUpdate')
const keys = require('../config/keys');
const youtube = google.youtube({
  version: 'v3',
  auth: keys.apiKey
})
const {
  User
} = require("./users.controller")

let continueCommentExtraction = true;
let globalMessage = '';
class ytController {
  // NEW STARTS HERE
  static async apiProcessChannelSelection(req, res, next) {
    // Grab channel id
    const channelId = req.body.channelId
    let userObj
    console.log(channelId)
    console.log('auth', req.get("Authorization"))
    
    try {
      const userJwt = req.get("Authorization").slice("Bearer ".length)
      userObj = await User.decoded(userJwt)
      console.log('obj', userObj)
      var { error } = userObj
      if (error) {
        res.status(401).json({ error })
        return
      }
      res.status(200).json({message: `Hi ${userObj.name}! We are currently processing your channel (${channelId}) request. We will send a notification to the following email once completed: ${userObj.email} `})
    } catch (e) {
      console.error(e)
    }
    
    // // First retrieve most recent channel data from YouTube
    // let channelResponse
    // // First retrieve most recent channel data from YouTube
    
    // try {
    //   channelResponse = await youtube.channels.list({
    //     part: 'contentDetails, snippet',
    //     id: channelId
    //   })
    // } catch (e) {
    //   console.error(`Error retrieving channel: ${e}`)
    // }
    // // Extract id from channel's upload's playlist to getAllVideos
    // const uploadId = channelResponse.data.items[0].contentDetails.relatedPlaylists.uploads
    // // Update subject collection with most recent channel data
    // // If subject does not exist, create a new one
    // try {
    //   const subjectDoc = {
    //     category: 'YouTube',
    //     _id: channelId,
    //     name: channelResponse.data.items[0].snippet.title,
    //     upload_id: uploadId,
    //     creation_date: new Date(channelResponse.data.items[0].snippet.publishedAt),
    //     image_path: channelResponse.data.items[0].snippet.thumbnails.medium.url,
    //     last_update: new Date()
    //   }

    //   await SubjectDAO.updateSubject(subjectDoc)
    // } catch (e) {
    //   console.error(e)
    // }
    // // Extract Videos
    // const videoResponse = await extractVideos(channelId, uploadId)
    // let cursor = await YouTubeVideosDAO.findVideoByChannelCursor(channelId)
    // do {
    //   const video = await cursor.next()
    //   await extractComments(video)
    // } while (await cursor.hasNext() && continueCommentExtraction)
    // // Update Subjects Stats
    // const updatedCommentCount = await YouTubeCommentsDAO.commentCount({
    //   channelId
    // })
    // await SubjectDAO.updateSubject({
    //   _id: channelId,
    //   commentCount: updatedCommentCount
    // })
    // let pageProcessInfo = {
    //   videoResponse,
    //   updatedCommentCount
    // }
    // if (!continueCommentExtraction) {
    //   pageProcessInfo = {
    //     ...pageProcessInfo,
    //     channelId,
    //     errorMessage: globalMessage
    //   }
    // }
    // console.log('page info:', pageProcessInfo)
    // // Grab sender info via Access Token and then sendout email
    // try {
    //   await sendEmail(userObj.email, pageProcessInfo)
    // } catch (e) {
    //   console.error(e)
    // }
  }
  static async apiGetComments(req, res, next) {
    // const channelId = req.query.channelId;
    let queryParams = {}
    queryParams.filters = req.body.filters || null;
    console.log('req.body.page', req.body.page)
    queryParams.page = req.body.page || 0;
    console.log('queryParams.page', queryParams.page)
    try {
      const response = await YouTubeCommentsDAO.findComments(queryParams)
      // console.log('comment-response', response[0])
      res.status(200).json(response)
    } catch (e) {
      res.status(401).json({
        message: `An error occurred when retrieving comments via channelId: ${e}`
      })
      console.error(
        `An error occurred when retrieving comments via channelId: ${e}`
      )
    }
  }
  static async apiGetActiveUsers(req, res, next) {
    try {
      const response = await YouTubeCommentsDAO.getMostActiveUsers(req.query.type)
      res.status(200).json(response)
    } catch (e) {
      res.status(401).json({
        message: `An error occurred when retrieving top users via authorId: ${e}`
      })
      console.error(
        `An error occurred when retrieving top users via authorId: ${e}`
      )
    }
  }
  static async apiGetVideos(req, res, next) {
    // const channelId = req.query.channelId;
    let queryParams = {}
    queryParams.filters = req.body.filters || null;
    queryParams.page = req.body.page || 0;
    try {
      const response = await YouTubeVideosDAO.findVideos(queryParams)
      res.status(200).json(response)
    } catch (e) {
      res.status(401).json({
        message: `An error occurred when retrieving videos: ${e}`
      })
      console.error(
        `An error occurred when retrieving videos: ${e}`
      )
    }
  }
  static async apiGetVideo(req, res, next) {
    const videoId = req.query.videoId;

    try {
      const response = await YouTubeVideosDAO.getVideo(videoId)
      res.status(200).json(response)
    } catch (e) {
      res.status(401).json({
        message: `An error occurred when retrieving video: ${e}`
      })
      console.error(
        `An error occurred when retrieving video: ${e}`
      )
    }
  }
  static async apiGetSubjects(req, res, next) {
    try {
      const response = await SubjectDAO.getSubjects()
      res.status(200).json(response)
    } catch (e) {
      console.error(
        `An error occurred when retrieving subjects: ${e}`
      )
    }
  }
  static async apiGetSubject(req, res, next) {
    const channelId = req.query.channelId;
    try {
      const response = await SubjectDAO.getSubjectById(channelId)
      res.status(200).json(response)
    } catch (e) {
      console.error(
        `An error occurred when retrieving subjects: ${e}`
      )
    }
  }
  static async apiGetUserData(req, res, next) {
    const authorChannelId = req.query.authorChannelId;
    try {
      const response = await YouTubeCommentsDAO.findUserByAuthorChannelId(authorChannelId)
      res.status(200).json(response[0])
    } catch (e) {
      res.status(401).json({
        message: `An error occurred when retrieving user data via authorId: ${e}`
      })
      console.error(
        `An error occurred when retrieving user data via authorId: ${e}`
      )
    }
  }
  // static async apiTestRoute(req, res, next) {
  //   // try {
  //   //   const userJwt = req.get("Authorization").slice("Bearer ".length)
  //   //   const userObj = await User.decoded(userJwt)
  //   //   console.log('userJWT', userJwt);
  //   //   console.log('userObj', userObj);
  //   //   console.log('user email', userObj.email);
  //   //   var {
  //   //     error
  //   //   } = userObj
  //   //   if (error) {
  //   //     res.status(401).json({
  //   //       error
  //   //     })
  //   //     return
  //   //   }
  //   //   let pageProcessInfo = {
  //   //     videoResponse: 45,
  //   //     updatedCommentCount: 2000,
  //   //     channelId: 'chanel123',
  //   //     message: 'Daily Limit Exceeded. The quota will be reset at midnight Pacific Time (PT).'
  //   //   }
  //   //   await sendEmail(userObj.email, pageProcessInfo)
  //   // } catch (e) {
  //   //   console.error('From route:', e)
  //   // }

  // }
}

const getPlaylistItems = async (uploadId, next = null) => {

  try {
    const {
      data
    } = await youtube.playlistItems.list({
      playlistId: uploadId,
      maxResults: '50',
      part: 'snippet, contentDetails',
      pageToken: next
    })
    return data
  } catch (e) {
    console.error(`Error retrieving videos from upload playlist: ${e}`)
    if (e.code === 403 && e.errors[0].reason === 'dailyLimitExceeded') {
      continueCommentExtraction = false;
      globalMessage = e.errors[0].message;
    }
    return e.data
  }
}

const extractVideos = async (channelId, uploadId) => {
  // Before Fetching videos check database for any existing data
  let videoCount = await YouTubeVideosDAO.videoCount(channelId)
  if (!videoCount) {
    console.log('inside no vid count', videoCount)
    let playlistResponse
    try {
      playlistResponse = await getPlaylistItems(uploadId)
      const modifiedResponse = playlistResponse.items.map((item) => {
        let obj = {
          ...item,
          _id: item.id,
          commentsExtracted: false
        }
        return obj
      })
      try {
        await YouTubeVideosDAO.insertMany(modifiedResponse)
      } catch (e) {
        console.error(e)
      }
    } catch (e) {
      console.error(e)
      if (e.code === 403 && e.errors[0].reason === 'dailyLimitExceeded') {
        continueCommentExtraction = false;
        globalMessage = e.errors[0].message;
      }
    }
    // START A WHILE LOOP IF A NEXTPAGETOKEN EXISTS
    let next = playlistResponse.nextPageToken ? playlistResponse.nextPageToken : null;
    while (next) {
      let nextResponse
      try {
        nextResponse = await getPlaylistItems(uploadId, next)
        const modifiedNextResponse = nextResponse.items.map((item) => {
          let obj = {
            ...item,
            _id: item.id,
            commentsExtracted: false
          }
          return obj
        })
        try {
          await YouTubeVideosDAO.insertMany(modifiedNextResponse)
        } catch (e) {
          console.error(e)
        }
      } catch (e) {
        console.error(e)
        if (e.code === 403 && e.errors[0].reason === 'dailyLimitExceeded') {
          continueCommentExtraction = false;
          globalMessage = e.errors[0].message;
        }
      }
      next = nextResponse.nextPageToken ? nextResponse.nextPageToken : null;
    }
  } else {
    console.log('inside vid count', videoCount)
    const caseStudy = await SubjectDAO.getSubjectById(channelId)
    let playlistResponse
    try {
      playlistResponse = await getPlaylistItems(uploadId)
      if (containsVideo(playlistResponse.items, caseStudy.recent_upload)) {

        const slicedArr = mergeSort(playlistResponse.items).slice(getIndex(mergeSort(playlistResponse.items), caseStudy.recent_upload) + 1)
        const modifiedResponse = slicedArr.map((item) => {
          let obj = {
            ...item,
            _id: item.id,
            commentsExtracted: false
          }
          return obj
        })

        if (modifiedResponse.length > 0) {
          try {
            for (let item of modifiedResponse) {
              await YouTubeVideosDAO.updateVideo(item)
            }
          } catch (e) {
            console.error(e)
          }
        }
        playlistResponse.nextPageToken = false;
      } else {

        const modifiedResponse = playlistResponse.items.map((item) => {
          let obj = {
            ...item,
            _id: item.id,
            commentsExtracted: false
          }
          return obj
        })
        try {
          for (let item of modifiedResponse) {
            await YouTubeVideosDAO.updateVideo(item)
          }
        } catch (e) {
          console.error(e)
        }
      }
    } catch (e) {
      console.error(e)
      if (e.code === 403 && e.errors[0].reason === 'dailyLimitExceeded') {
        continueCommentExtraction = false;
        globalMessage = e.errors[0].message;
      }
    }
    // START A WHILE LOOP IF A NEXTPAGETOKEN EXISTS
    let next = playlistResponse.nextPageToken ? playlistResponse.nextPageToken : null;
    while (next) {
      let nextResponse
      try {
        nextResponse = await getPlaylistItems(uploadId, next)
        const modifiedNextResponse = nextResponse.items.map((item) => {
          let obj = {
            ...item,
            _id: item.id,
            commentsExtracted: false
          }
          return obj
        })
        try {
          for (let item of modifiedNextResponse) {
            await YouTubeVideosDAO.updateVideo(item)
          }
        } catch (e) {
          console.error(e)
        }
      } catch (e) {
        console.error(e)
        if (e.code === 403 && e.errors[0].reason === 'dailyLimitExceeded') {
          continueCommentExtraction = false;
          globalMessage = e.errors[0].message;
        }
      }
      next = nextResponse.nextPageToken ? nextResponse.nextPageToken : null;
    }
  }
  // Update Subjects Stats
  const updatedVideoCount = await YouTubeVideosDAO.videoCount(channelId)
  const videosFromDB = await YouTubeVideosDAO.findVideos({
    filters: {
      channelId
    }
  })
  await SubjectDAO.updateSubject({
    _id: channelId,
    recent_upload: videosFromDB[0].contentDetails.videoId,
    recent_upload_date: new Date(videosFromDB[0].contentDetails.videoPublishedAt),
    last_update: new Date(),
    videoCount: updatedVideoCount

  })
  return updatedVideoCount
}

const extractComments = async (video) => {
  // Before Fetching videos check database for any existing data
  const commentCount = await YouTubeCommentsDAO.commentCount({
    videoId: video.contentDetails.videoId
  })
  if (!commentCount) {
    console.log('inside no comment count', commentCount)
    let parentCommentResponse
    let next = null
    do {
      try {
        let queryList = {
          part: 'snippet, id',
          videoId: video.contentDetails.videoId,
          maxResults: 100
        }
        if (next) {
          queryList = {
            ...queryList,
            pageToken: next
          }
        }
        parentCommentResponse = await youtube.commentThreads.list(queryList)
        const modifiedResponse = parentCommentResponse.data.items.map(obj => createCommentObj(obj, video.snippet.channelId))
        // Insert documents to database
        try {
          await YouTubeCommentsDAO.insertMany(modifiedResponse)
        } catch (e) {
          console.error(e)
        }
        next = parentCommentResponse.data.nextPageToken ? parentCommentResponse.data.nextPageToken : null;
      } catch (e) {
        console.error(e)
        if (e.code === 403 && e.errors[0].reason === 'dailyLimitExceeded') {
          continueCommentExtraction = false;
          globalMessage = e.errors[0].message;
        }
      }
    } while (next)
    // EXTRACT CHILDREN COMMENTS
    let parentCursor = await YouTubeCommentsDAO.findVideoParentCommentsCursor(video.contentDetails.videoId)
    do {
      const parentComment = await parentCursor.next()
      // await extractComments(video)
      let childCommentResponse
      let nextChild = null
      do {
        try {
          if (parentComment && parentComment.id) {
            let childQueryList = {
              parentId: parentComment.id,
              part: 'snippet',
              maxResults: 100
            }
            if (nextChild) {
              childQueryList = {
                ...childQueryList,
                pageToken: nextChild
              }
            }
            childCommentResponse = await youtube.comments.list(childQueryList)
            const modifiedChildResponse = childCommentResponse.data.items.map(obj => createCommentObj(obj, parentComment.channelId, parentComment.videoId))
            // Insert documents to database
            try {
              await YouTubeCommentsDAO.insertMany(modifiedChildResponse)
            } catch (e) {
              console.error(e)
            }
          }

          nextChild = childCommentResponse.data.nextPageToken ? childCommentResponse.data.nextPageToken : null;
        } catch (e) {
          console.error(e)
          if (e.code === 403 && e.errors[0].reason === 'dailyLimitExceeded') {
            continueCommentExtraction = false;
            globalMessage = e.errors[0].message;
          }
        }
      } while (nextChild)
    } while (await parentCursor.hasNext())
  } else {
    console.log('inside commentcount', commentCount)
    let parentCommentResponse
    let next = null
    do {
      try {
        let queryList = {
          part: 'snippet, id',
          videoId: video.contentDetails.videoId,
          maxResults: 100
        }
        if (next) {
          queryList = {
            ...queryList,
            pageToken: next
          }
        }
        parentCommentResponse = await youtube.commentThreads.list(queryList)
        const modifiedResponse = parentCommentResponse.data.items.map(obj => createCommentObj(obj, video.snippet.channelId))
        // Insert documents to database
        try {
          for (let item of modifiedResponse) {
            await YouTubeCommentsDAO.updateComment(item)
          }
        } catch (e) {
          console.error(e)
        }
        next = parentCommentResponse.data.nextPageToken ? parentCommentResponse.data.nextPageToken : null;
      } catch (e) {
        console.error(e)
        if (e.code === 403 && e.errors[0].reason === 'dailyLimitExceeded') {
          continueCommentExtraction = false;
          globalMessage = e.errors[0].message;
        }
      }
    } while (next)
    // EXTRACT CHILDREN COMMENTS
    let parentCursor = await YouTubeCommentsDAO.findVideoParentCommentsCursor(video.contentDetails.videoId)
    do {
      const parentComment = await parentCursor.next()
      let childCommentResponse
      let nextChild = null
      do {
        try {
          if (parentComment && parentComment.id) {
            let childQueryList = {
              parentId: parentComment.id,
              part: 'snippet',
              maxResults: 100
            }
            if (nextChild) {
              childQueryList = {
                ...childQueryList,
                pageToken: nextChild
              }
            }
            childCommentResponse = await youtube.comments.list(childQueryList)
            const modifiedChildResponse = childCommentResponse.data.items.map(obj => createCommentObj(obj, parentComment.channelId, parentComment.videoId))
            // Insert documents to database
            try {
              for (let item of modifiedChildResponse) {
                await YouTubeCommentsDAO.updateComment(item)
              }
            } catch (e) {
              console.error(e)
            }
          }
          nextChild = childCommentResponse.data.nextPageToken ? childCommentResponse.data.nextPageToken : null;
        } catch (e) {
          console.error(e)
          if (e.code === 403 && e.errors[0].reason === 'dailyLimitExceeded') {
            continueCommentExtraction = false;
            globalMessage = e.errors[0].message;
          }
        }
      } while (nextChild)
    } while (await parentCursor.hasNext())
  }
  try {
    await YouTubeVideosDAO.updateVideo({
      _id: video._id,
      commentsExtracted: true
    })
  } catch (e) {
    console.error(e)
  }
  console.log('end of comment function')
}
const sendEmail = async (email, info) => {
  console.log('email:', email)
  console.log('info:', info)
  try {
    sgMail.setApiKey(keys.sendGridKey);
    const msg = {
      to: email,
      from: 'ccolondeveloper@gmail.com',
      subject: `Channel Update: ${info.channelId}`,
      html: channelUpdateTemplate(info)
    };
    await sgMail.send(msg);
  } catch (e) {
    console.error(`Error sending email: ${e}`)
  }
}

function createCommentObj(obj, channelId, videoId = null) {
  let initObj = {}
  initObj.channelId = channelId
  // Check if it's commentThread
  // Else its a child comment
  if (obj.kind === "youtube#commentThread") {
    const {
      topLevelComment,
      totalReplyCount
    } = obj.snippet
    initObj.id = topLevelComment.id
    initObj.parentId = null
    initObj.totalReplyCount = totalReplyCount
    initObj = {
      ...initObj,
      ...topLevelComment.snippet
    }
  } else {
    initObj.videoId = videoId
    initObj.id = obj.id
    initObj.totalReplyCount = null
    initObj = {
      ...initObj,
      ...obj.snippet
    }
  }
  return initObj
}

function containsVideo(arr, val) {
  return arr.some(function (arrVal) {
    return val === arrVal.contentDetails.videoId;
  });
}

function getIndex(arr, value) {
  return arr.findIndex((element) => element.contentDetails.videoId === value)
}

function mergeSort(arr) {
  if (arr.length === 1) {
    return arr
  }
  const center = Math.floor(arr.length / 2);
  const left = arr.slice(0, center)
  const right = arr.slice(center)

  return merge(mergeSort(left), mergeSort(right))
}

function merge(left, right) {
  const results = []
  while (left.length && right.length) {
    if (left[0].contentDetails.videoPublishedAt < right[0].contentDetails.videoPublishedAt) {
      results.push(left.shift())
    } else {
      results.push(right.shift())
    }
  }
  return [...results, ...left, ...right];
}

module.exports = ytController