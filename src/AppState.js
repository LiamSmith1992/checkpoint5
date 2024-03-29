import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},
  /** @type {import('./models/post.js').Post[]} */
  posts: [],

  /** @type {import('./models/Account.js').Account} */
  activeProfile: {},

  query: '',


  adds: [],

  page: 1,

  profilePage: 1,

  likes: 0


})
