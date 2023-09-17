import * as auth from './auth'
import * as posts from './posts'
import * as users from './users'

export const schema = {
  ...users,
  ...auth,
  ...posts,
}
