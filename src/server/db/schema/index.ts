import * as posts from './posts'
import * as users from './users'

export const schema = {
  ...users,
  ...posts,
}
