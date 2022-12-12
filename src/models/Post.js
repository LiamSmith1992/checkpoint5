export class Post {

  constructor(data) {
    this.body = data.body
    this.creatorId = data.creatorId
    this.creator = data.creator
    this.id = data.id
    this.imgUrl = data.imgUrl
    this.likes = data.likes
    this.createdAt = data.createdAt

  }
}