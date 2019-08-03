
const {
  MongoClient
} = require('mongodb')
const app = require('./server/app');
const keys = require('./server/config/keys')
const YouTubeVideosDAO = require('./server/dao/yt_videosDAO')
const YouTubeCommentsDAO = require('./server/dao/yt_commentsDAO')
const SubjectDAO = require('./server/dao/subjectsDAO')
const UsersDAO = require('./server/dao/usersDAO')
const PORT = process.env.PORT || keys.port;
// Create a new MongoClient
MongoClient.connect(keys.mongoURI, {
  useNewUrlParser: true
})
  .catch(err => {
    console.error(err.stack)
    process.exit(1)
  })
  .then(async client => {
    await UsersDAO.injectDB(client)
    await YouTubeCommentsDAO.injectDB(client)
    await YouTubeVideosDAO.injectDB(client)
    await SubjectDAO.injectDB(client)
    app.listen(PORT, () => {
      console.log(`app listening on port ${PORT}`)
    })
  })
