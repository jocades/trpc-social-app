import { NextResponse } from 'next/server'

import { db } from '@/server/db'
import { posts } from '@/server/db/schema/post.schema'
import { tests } from '@/server/db/schema/test.schema'

export async function GET() {
  // const insert = await db
  //   .insert(tests)
  //   .values({
  //     name: 'test',
  //     age: 1,
  //   })
  //   .returning()

  const data = await db.select().from(tests)
  console.log(typeof data[0].createdAt)
  return NextResponse.json({
    test: data,
    posts: await db.select().from(posts),
  })
}
