const ObjectId = require('bson').ObjectID
const keys = require('../config/keys')
let subjectCollection
let ecm
class SubjectDAO {
  static async injectDB (client) {
    if (subjectCollection) {
      return
    }
    try {
      ecm = await client.db(keys.dbName)
      subjectCollection = await client.db(keys.dbName).collection('subjects')
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in SubjectDAO: ${e}`
      )
    }
  }
  static async getSubjectById (channelId) {
    try {
      return await subjectCollection.findOne({
        _id: channelId
      })
    } catch (e) {
      console.error(
        `An error occurred while retrieving subject, ${e}`,
      )
      return { dbError: e }
    }
  }
  static async updateSubject (obj) {
    try {
      const updateResponse = await subjectCollection.updateOne(
        { _id: obj._id},
        { $set: obj },
        { upsert: true }
      )
      return updateResponse
    } catch (e) {
      console.error(
        `An error occurred while updating/creating subject, ${e}`,
      )
      return { dbError: e }
    }
  }
  static async getSubjects () {
    try {
      return await subjectCollection.find().toArray()
    } catch (e) {
      console.error(
        `An error occurred while retrieving subjects, ${e}`,
      )
      return { dbError: e }
    }
  }
}

module.exports = SubjectDAO
