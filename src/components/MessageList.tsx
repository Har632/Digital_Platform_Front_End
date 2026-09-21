import { Bot, Check, Copy, Paperclip, ThumbsDown, ThumbsUp } from 'lucide-react'
import type { UIMessage } from 'ai'
import { useState } from 'react'

type MessageListProps = {
  messages: UIMessage[]
  copiedMessageId: string | null
  onCopy: (id: string, text: string) => void
  isStreaming: boolean
}

export function MessageList({ messages, copiedMessageId, onCopy, isStreaming }: MessageListProps) {
  const [openAttachment, setOpenAttachment] = useState<{ messageId: string; filename: string } | null>(null)

  return <div className="messages">{messages.length === 0 ? null : messages.map((message) => {
    const text = message.parts.filter((part) => part.type === 'text').map((part) => part.text).join('')
    const files = message.parts.flatMap((part) => part.type === 'file' && part.filename ? [part] : [])
    return <div className={`message-row ${message.role === 'user' ? 'user-row' : ''}`} key={message.id}>{message.role !== 'user' && <div className="message-avatar"><Bot size={17} /></div>}<div className="message-content"><div className="message-bubble">{files.length > 0 && <div className="message-files">{files.map((file, index) => { const filename = file.filename ?? 'Attached file'; const isOpen = openAttachment?.messageId === message.id && openAttachment.filename === filename; return <div key={`${filename}-${index}`}><button className="message-file" type="button" title={`${isOpen ? 'Close' : 'Open'} ${filename}`} onClick={() => setOpenAttachment(isOpen ? null : { messageId: message.id, filename })}><Paperclip size={13} /><span>{filename}</span></button>{isOpen && (file.mediaType.startsWith('image/') ? <img className="inline-attachment" src={file.url} alt={filename} /> : <iframe className="inline-attachment" src={file.url} title={filename} />)}</div>})}</div>}{text}</div>{message.role === 'assistant' && text && <div className="message-actions"><button title="Copy" type="button" onClick={() => onCopy(message.id, text)}>{copiedMessageId === message.id ? <Check size={14} /> : <Copy size={14} />}</button><button title="Helpful" type="button"><ThumbsUp size={14} /></button><button title="Not helpful" type="button"><ThumbsDown size={14} /></button></div>}</div></div>
  })}{isStreaming && <div className="typing"><span /><span /><span /></div>}</div>
}