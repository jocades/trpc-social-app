import { formatRelative } from 'date-fns'

import { Post } from '@/server/db/schema/post.schema'
import { User } from '@/server/db/schema/user.schema'

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

interface PostItemProps {
  post: Post & { author: User }
}
export function PostItem({ post }: PostItemProps) {
  return (
    <div className="flex p-4 border-b">
      <div className="flex-shrink-0 bg-red-200">
        <Avatar>
          <AvatarImage src={post.author.image!} />
          <AvatarFallback>{post.author.name![0].toUpperCase()}</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-col ml-4">
        <div className="flex items-center">
          <div className="font-bold">{post.author.name}</div>
          <span className="text-sm text-gray-500 ml-2">
            &middot; {formatRelative(post.createdAt, new Date())}
          </span>
        </div>
        <div>{post.content}</div>
      </div>

      {/* <pre>{JSON.stringify(post, null, 2)}</pre> */}
    </div>
  )
}
