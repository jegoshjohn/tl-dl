'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export default function Home() {
  const router = useRouter()
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [isActive, setIsActive] = useState(false)
  const [summary, setSummary] = useState('')
  const [takeaways, setTakeaways] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isTakeawaysLoading, setIsTakeawaysLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchTakeaways = async (url: string) => {
    setIsTakeawaysLoading(true)
    try {
      const response = await fetch('http://127.0.0.1:8000/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          youtube_url: url,
          query: "What are the key takeaways and main points discussed in this podcast? Please list them in a clear, organized manner."
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get takeaways')
      }

      const data = await response.json()
      setTakeaways(data.summary)
    } catch (err) {
      console.error('Error fetching takeaways:', err)
    } finally {
      setIsTakeawaysLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    
    try {
      // Store the URL in localStorage before making the API call
      localStorage.setItem('youtubeUrl', youtubeUrl)

      const response = await fetch('http://127.0.0.1:8000/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ youtube_url: youtubeUrl }),
      })

      if (!response.ok) {
        throw new Error('Failed to get summary')
      }

      const data = await response.json()
      setSummary(data.summary)
      setIsActive(true)
      
      // Start fetching takeaways in the background
      fetchTakeaways(youtubeUrl)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  const handleTabChange = (value: string) => {
    if (value === 'interactive-chat') {
      router.push('/chat')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="text-center">
          <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
            TL;DL
          </h1>
          
          <h2 className="text-4xl font-semibold text-gray-900 dark:text-gray-100 mb-8">
            Don&apos;t Pod Around
          </h2>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-12">
            Get instant summaries and chat with your favorite podcasts
          </p>

          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-16">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="url"
                placeholder="Paste your YouTube podcast link here..."
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                className="flex-1 px-6 py-4 rounded-full border border-gray-200 dark:border-gray-700 
                          bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                          shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent
                          transition-all duration-200 ease-in-out"
              />
              <button
                type="submit"
                className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600
                         text-white font-semibold shadow-lg hover:shadow-xl
                         transform hover:-translate-y-0.5 transition-all duration-200 ease-in-out"
              >
                Summarize
              </button>
            </div>
          </form>

          <Tabs defaultValue="quick-summary" className="w-full" onValueChange={handleTabChange}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger 
                value="quick-summary"
                disabled={!isActive}
              >
                Quick Summary
              </TabsTrigger>
              <TabsTrigger 
                value="key-takeaways"
                disabled={!isActive}
              >
                Key Takeaways
              </TabsTrigger>
              <TabsTrigger 
                value="interactive-chat"
                disabled={!isActive}
              >
                Chat
              </TabsTrigger>
            </TabsList>
            <TabsContent value="quick-summary">
              <Card>
                <CardHeader>
                  <CardDescription>
                    A concise overview of the main points discussed in the podcast.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="text-center text-gray-500">
                      Generating summary... This may take a few minutes.
                    </div>
                  ) : error ? (
                    <div className="text-center text-red-500">
                      {error}
                    </div>
                  ) : isActive ? (
                    <div className="text-left">
                      <p className="text-gray-600 dark:text-gray-300">
                        {summary || 'No summary available yet.'}
                      </p>
                    </div>
                  ) : (
                    <div className="text-center text-gray-500">
                      Please submit a podcast link to view the summary.
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="key-takeaways">
              <Card>
                <CardHeader>
                  <CardDescription>
                    Key points and insights from the podcast discussion.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isTakeawaysLoading ? (
                    <div className="text-center text-gray-500">
                      Loading key takeaways...
                    </div>
                  ) : isActive ? (
                    <div className="text-left">
                      <p className="text-gray-600 dark:text-gray-300">
                        {takeaways || 'No takeaways available yet.'}
                      </p>
                    </div>
                  ) : (
                    <div className="text-center text-gray-500">
                      Please submit a podcast link to view the takeaways.
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="interactive-chat">
              <Card>
                <CardHeader>
                  <CardDescription>
                    Ask questions about the podcast content.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isActive ? (
                    <div className="text-left">
                      {/* Chat interface will go here */}
                      <p className="text-gray-600 dark:text-gray-300">
                        Submit a YouTube podcast link to start chatting about it.
                      </p>
                    </div>
                  ) : (
                    <div className="text-center text-gray-500">
                      Please submit a podcast link to start chatting.
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
