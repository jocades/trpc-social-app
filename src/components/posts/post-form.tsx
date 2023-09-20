'use client'

import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { Session } from 'next-auth'

import { api } from '@/app/_trpc/client'

import { Button } from '../ui/button'

interface PostFormProps {
  user: Session['user']
}

function updateHeight(el?: HTMLTextAreaElement) {
  if (!el) return
  el.style.height = '0'
  el.style.height = `${el.scrollHeight}px`
}

export function PostForm({ user }: PostFormProps) {
  const [input, setInput] = useState('')

  const textAreaRef = useRef<HTMLTextAreaElement>()

  const inputRef = useCallback((el: HTMLTextAreaElement) => {
    updateHeight(el)
    textAreaRef.current = el
  }, [])

  useLayoutEffect(() => {
    updateHeight(textAreaRef.current)
  }, [input])

  const { mutateAsync: addPost } = api.posts.create.useMutation({
    onSuccess(newPost) {
      console.log(newPost)
      setInput('')
    },
  })

  return (
    <form
      className="flex flex-col gap-2 border-b p-4"
      onSubmit={async (e) => {
        e.preventDefault()
        await addPost({ content: input })
      }}
    >
      <div className="flex gap-4">
        <img
          src={user.image!}
          alt={user.name!}
          className="w-14 h-14 rounded-full border border-gray-200"
        />
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What's going on?"
          style={{ height: 0 }}
          className="flex-grow resize-none overflow-hidden p-4 text-lg outline-none bg-transparent"
        />
      </div>
      <Button type="submit" className="self-end">
        Post
      </Button>
    </form>
  )
}
