import * as auth from './auth.schema'
import * as posts from './post.schema'
import * as users from './user.schema'

export const schema = {
  ...users,
  ...auth,
  ...posts,
}
