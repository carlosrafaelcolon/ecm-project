class Subject {
  constructor(id, name = null, stats = null, uploadId = null, creationDate = null, imgPath = null) {
    this.id = id
    this.name = name
    this.statistics = stats
    this.uploadId = uploadId
    this.related = []
    this.recent_upload = null
    this.recent_upload_date = null
    this.creation_date = creationDate
    this.image_path = imgPath
    this.last_update = new Date()
  }
}