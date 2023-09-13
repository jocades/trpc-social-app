'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { Session } from 'next-auth/types'
import { Socket, io } from 'socket.io-client'

import { Icons } from '@/components/icons'

const SocketContext = createContext({} as Socket)
export const useSocket = () => useContext(SocketContext)

interface SocketProviderProps {
  user: Session['user']
  children: React.ReactNode
}

const SocketProvider = ({ user, children }: SocketProviderProps) => {
  const [socket, setSocket] = useState({} as Socket)
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
      auth: {
        token: user?.access,
      },
    })
    setSocket(newSocket)

    newSocket.on('connect', () => setConnected(true))
    newSocket.on('disconnect', () => setConnected(false))

    return () => {
      newSocket.close()
    }
  }, [user])

  return (
    <SocketContext.Provider value={socket}>
      {connected ? children : <Connecting />}
    </SocketContext.Provider>
  )
}

export default SocketProvider

const Connecting = () => {
  return (
    <div className="flex flex-1 space-x-2 items-center justify-center">
      <Icons.spinner className="w-8 h-8 text-gray-500 animate-spin" />
      <p className="text-sm text-muted-foreground">Connecting...</p>
    </div>
  )
}
