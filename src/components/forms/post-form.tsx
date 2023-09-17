'use client'

import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { Session } from 'next-auth'

import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'

interface PostFormProps {
  user: Session['user']
}

function updateHeight(el: HTMLTextAreaElement) {
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
    if (!textAreaRef.current) return
    updateHeight(textAreaRef.current)
  }, [input])

  return (
    <form className="flex flex-col gap-2 border-b p-4">
      <div className="flex gap-4">
        <img
          src={user.image!}
          alt={user.name!}
          className="w-16 h-16 rounded-full"
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
