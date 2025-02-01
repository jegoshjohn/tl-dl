'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { useRouter } from 'next/navigation'

export default function ChatPage() {
  const router = useRouter()
  const [messages, setMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([])
  const [userInput, setUserInput] = useState('')
  const [isChatLoading, setIsChatLoading] = useState(false)

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!userInput.trim()) return

    const youtubeUrl = localStorage.getItem('youtubeUrl')
    if (!youtubeUrl) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'No YouTube URL found. Please go back and enter a valid YouTube URL first.' 
      }])
      return
    }

    const newMessage = { role: 'user' as const, content: userInput }
    setMessages(prev => [...prev, newMessage])
    setUserInput('')
    setIsChatLoading(true)

    try {
        const response = await fetch('http://127.0.0.1:8000/summarize', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              youtube_url: youtubeUrl,
              query: userInput
            }),
          })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()
      if (data && data.summary) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.summary }])
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: 'Received an invalid response format from the server.' }])
      }
    } catch (err) {
      console.error('Error fetching chat response:', err)
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }])
    } finally {
      setIsChatLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <Card>
          <CardHeader>
            <CardDescription>
              Ask questions about the podcast content.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <div className="h-[400px] overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        message.role === 'user'
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
                {isChatLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2 text-gray-500">
                      Thinking...
                    </div>
                  </div>
                )}
              </div>
              <form onSubmit={handleChatSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Ask a question about the podcast..."
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 
                            bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                            focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <Button 
                  type="submit" 
                  disabled={isChatLoading || !userInput.trim()}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                >
                  Send
                </Button>
              </form>
            </div>
            <div className="mt-6 text-center">
              <Button 
                onClick={() => router.push('/')}
                variant="outline"
                className="text-gray-600 dark:text-gray-300"
              >
                Back
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 