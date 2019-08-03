const keys = require('../config/keys')
let commentCollection
let emc
class YouTubeCommentsDAO {
  static async injectDB(client) {
    if (commentCollection) {
      return
    }
    try {
      emc = await client.db(keys.dbName)
      commentCollection = await client.db(keys.dbName).collection('yt_comments')
    } catch (e) {
      console.error(`Unable to establish a collection handle in YouTubeCommentsDAO:${e}`)
    }
  }
  static async insertMany(comments) {
    try {
      return await commentCollection.insertMany(comments, {
        order: false
      })
    } catch (e) {
      console.error(e)
      return {
        dbError: e
      }
    }
  }
  static async updateComment(comment) {
    try {
      const updateResponse = await commentCollection.updateOne({
        id: comment.id
      }, {
        $set: comment
      }, {
        upsert: true
      })
      return updateResponse
    } catch (e) {
      console.error(`Unable to update comment: ${e}`)
      return {
        dbError: e
      }
    }
  }
  static async commentCount(filters = null) {
    let queryParams = {}
    if (filters) {
      if ("videoId" in filters) {
        queryParams = {
          videoId: filters["videoId"]
        }
      } else if ("channelId" in filters) {
        queryParams = {
          channelId: filters["channelId"]
        }
      }
    }
    try {
      return await commentCollection.countDocuments(queryParams)
    } catch (e) {
      console.error(
        `Unable to count documents in videoCollection: ${e}`
      )
      return {
        dbError: e
      }
    }
  }
  static async findVideoParentCommentsCursor(videoId) {

    try {
      return await commentCollection.find({
        videoId,
        totalReplyCount: {
          $gt: 0
        },
        $and: [{
            parentId: null
          },
          {
            parentId: {
              $exists: true
            }
          }
        ]
      }, {
        _id: 1
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
  static textSearchQuery(text) {
    const query = {
      $text: {
        $search: text
      }
    }
    const meta_score = {
      $meta: "textScore"
    }
    const sort = [
      ["score", meta_score]
    ]
    const project = {
      score: meta_score
    }

    return {
      query,
      project,
      sort
    }
  }
  static async findComments({
    filters = null,
    page = 0,
    commentsPerPage = 40,
  } = {}) {
    let queryParams = {}
    if (filters) {
      if ("text" in filters) {
        queryParams = this.textSearchQuery(filters["text"])
      }
      if ("videoId" in filters) {
        if ("query" in queryParams) {
          queryParams.query = {
            ...queryParams.query,
            videoId: filters["videoId"]
          }
        } else {
          queryParams = {
            query: {
              videoId: filters["videoId"]
            }
          }

        }
      } 
      if ("channelId" in filters) {
        if ("query" in queryParams) {
          queryParams.query = {
            ...queryParams.query,
            channelId: filters["channelId"]
          }
        } else {
          queryParams = {
            query: {
              channelId: filters["channelId"]
            }
          }
        }
      }
    }
    let {
      query = {}, project = {}, sort = [
        ["publishedAt", -1]
      ]
    } = queryParams
    try {
      return await commentCollection.find(query)
        .project(project)
        .sort(sort)
        .skip((commentsPerPage * page))
        .limit(commentsPerPage)
        .toArray()

    } catch (e) {
      console.error(e)
      return {
        dbError: e
      }
    }
  }
  static async findUserByAuthorChannelId(authorChannelId) {
    try {
      return await commentCollection.aggregate(
        [
          {
            '$match': {
              'authorChannelId.value': authorChannelId
            }
          }, {
            '$facet': {
              'entries': [
                {
                  '$sort': {
                    'publishedAt': -1
                  }
                }, {
                  '$limit': 5
                }
              ], 
              'summary': [
                {
                  '$group': {
                    '_id': '$authorChannelId.value', 
                    'channels': {
                      '$addToSet': '$channelId'
                    }, 
                    'displayNames': {
                      '$addToSet': '$authorDisplayName'
                    }, 
                    'profileImages': {
                      '$addToSet': '$authorProfileImageUrl'
                    }, 
                    'videos': {
                      '$addToSet': '$videoId'
                    }, 
                    'site': {
                      '$first': '$authorChannelUrl'
                    }, 
                    'numOfComments': {
                      '$sum': 1
                    }
                  }
                }, {
                  '$lookup': {
                    'from': 'subjects', 
                    'localField': 'channels', 
                    'foreignField': '_id', 
                    'as': 'channels'
                  }
                }, {
                  '$lookup': {
                    'from': 'yt_vids', 
                    'localField': 'videos', 
                    'foreignField': 'contentDetails.videoId', 
                    'as': 'videos'
                  }
                }, {
                  '$project': {
                    'channels': 1, 
                    'displayNames': 1, 
                    'profileImages': 1, 
                    'numOfComments': 1, 
                    'site': 1, 
                    'videoCount': {
                      '$size': '$videos'
                    }, 
                    'videos': {
                      '$slice': [
                        '$videos', 5
                      ]
                    }
                  }
                }
              ]
            }
          }
        ]
      ).toArray()
    } catch (e) {
      console.error(e)
      return {
        dbError: e
      }
    }
  }

  static async getMostActiveUsers(type) {
    const groupStage = {
      $group: {
        _id: '$authorChannelId.value',
        comments: {
          $sum: 1
        },
        channels: {
          $addToSet: '$channelId'
        },
        videos: {
          $addToSet: '$videoId'
        },
        displayName: {
          $first: '$authorDisplayName'
        },
        profileImage: {
          $first: '$authorProfileImageUrl'
        }
      }
    }
    const projectStage = {
      $project: {
        authorChannelId: '$_id',
        _id: 0,
        displayName: 1,
        profileImage: 1,
        comments: 1,
        channels: {
          $size: '$channels'
        },
        videos: {
          $size: '$videos'
        }
      }
    }
    const matchStage = {
      $match: {
        channels: {
          $gte: 2
        }
      }
    }
    const topCommenterSort = {
      $sort: {
        comments: -1
      }
    }
    const topChannelSort = {
      $sort: {
        channels: -1,
        comments: -1
      }
    }
    const limit = {
      $limit: 10
    }
    let pipeline = []
    if (type === 'channels') {
      pipeline = [...pipeline, ...[groupStage, projectStage, matchStage, topChannelSort, limit]]
    } else {
      pipeline = [...pipeline, ...[groupStage, topCommenterSort, limit, projectStage]]
    }
    try {
      const aggregateResult = await commentCollection.aggregate(pipeline)
      return await aggregateResult.toArray()
    } catch (e) {
      console.error(e)
      return {
        dbError: e
      }
    }
  }
}
module.exports = YouTubeCommentsDAO


