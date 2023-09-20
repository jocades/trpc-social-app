import { formatDistanceToNow } from 'date-fns'

import { Post } from '@/server/db/schema/post.schema'
import { User } from '@/server/db/schema/user.schema'

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { PostContent } from './post-content'

interface PostItemProps {
  post: Post & { author: User }
}

export function PostItem({ post }: PostItemProps) {
  return (
    <article className="flex p-4 border-b">
      <div>
        <Avatar>
          <AvatarImage src={post.author.image!} />
          <AvatarFallback>{post.author.name![0].toUpperCase()}</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-col ml-4">
        <div className="flex items-center mb-2">
          <p className="font-bold">{post.author.name}</p>
          <span className="text-sm text-gray-500 ml-2">
            &middot; {formatDistanceToNow(post.createdAt, { addSuffix: true })}
          </span>
        </div>
        <PostContent content={post.content} />
      </div>
    </article>
  )
}
