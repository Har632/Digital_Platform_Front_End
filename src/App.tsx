import { useChat } from '@ai-sdk/react'
import { useState } from 'react'
import { ChatComposer } from './components/ChatComposer'
import { ChatHeader } from './components/ChatHeader'
import { ChatSidebar } from './components/ChatSidebar'
import { MessageList } from './components/MessageList'
import { WelcomeState } from './components/WelcomeState'
import { aiChatTransport } from './services/aiService'
import './App.css'

function App() {
  const [input, setInput] = useState('')
  const [copied, setCopied] = useState<string | null>(null)
  const { messages, sendMessage, status, stop } = useChat({ transport: aiChatTransport })
  const isStreaming = status === 'streaming' || status === 'submitted'

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const text = input.trim()
    if (!text || isStreaming) return
    setInput('')
    await sendMessage({ text })
  }

  const copyMessage = async (id: string, text: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(id)
    window.setTimeout(() => setCopied(null), 1600)
  }

  return (
    <main className="app-shell">
      <ChatSidebar onNewChat={() => window.location.reload()} />

      <section className="chat-panel">
        <ChatHeader />
        {messages.length === 0 && <WelcomeState onSuggestion={setInput} />}
        <MessageList messages={messages} copiedMessageId={copied} onCopy={copyMessage} isStreaming={isStreaming} />
        <ChatComposer input={input} isStreaming={isStreaming} onChange={setInput} onSubmit={handleSubmit} onStop={stop} />
      </section>
    </main>
  )
}

export default App
