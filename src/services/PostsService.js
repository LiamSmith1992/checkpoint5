import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { api } from "./AxiosService"



class PostsService {

  async getPosts() {
    const res = await api.get('api/posts')
    logger.log('Getting posts', res.data.posts)
    AppState.posts = res.data.posts
  }

  async searchForPost(query = '') {

    AppState.query = query
    const res = await api.get(`api/posts?query=${query}`)
    logger.log('this is query search', res.data)
    AppState.posts = res.data.posts

  }

  async createPost(body) {
    logger.log('this is before unshift', AppState.posts)
    const res = await api.post('api/posts', body)
    Pop.toast('Made a post', 'success')
    AppState.posts.unshift(res.data)


  }

  async getPostById(profileId) {
    const res = await api.get('api/profiles/' + profileId + '/posts')
    logger.log('this is posts by id', res.data)
    AppState.posts = res.data.posts
    logger.log('posts by id', AppState.posts)

  }

  async removePost(id) {

    const res = await api.delete('api/posts/' + id)
    logger.log('this is for deleting', res.data)
    AppState.posts = AppState.posts.filter(p => p.id != id)
  }

  async likePost(postId) {

    const checkLikes = AppState.posts.find(p => p.id == postId)
    AppState.likes = checkLikes.likes.length
    // logger.log('this is appstated.likes', AppState.likes)
    // logger.log('this is checking likes', checkLikes)
    const res = await api.post('api/posts/' + postId + '/like')
    AppState.posts.push(res.data)
    logger.log('liking', res.data)
    const likes = AppState.posts.find(p => p.id == postId)

    logger.log('this is just likes lenght', likes.likes.length)
    if (AppState.likes > res.data.likes.length) {
      likes.likes.length--
    } else {
      likes.likes.length++

    }



    logger.log('this is likes!!!', likes)

    logger.log('app state after likes', res.data)
    Pop.toast('like was processed.. trust me', 'success')
  }

  async changePage(page) {
    const res = await api.get('api/posts?page=' + page)
    logger.log('page changer', res.data)
    AppState.posts = res.data.posts
    AppState.page = page
  }

  async changeProfilePage(id, page) {
    const res = await api.get('api/posts?creatorId=' + id + '&page=' + page)
    logger.log('changing page on profile', res.data)
    AppState.posts = res.data.posts
    AppState.profilePage = page
  }
}







export const postsService = new PostsService()