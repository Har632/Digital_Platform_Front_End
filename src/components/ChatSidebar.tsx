import { Menu, Plus, ShieldCheck } from 'lucide-react'
import { PAGE_CONTENT, RECENT_CHATS } from '../constants/page'

type ChatSidebarProps = {
  onNewChat: () => void
}

export function ChatSidebar({ onNewChat }: ChatSidebarProps) {
  return (
    <aside className="sidebar">
      <div className="brand"><span className="brand-mark"><ShieldCheck size={17} /></span><span>{PAGE_CONTENT.brand}</span></div>
      <button className="new-chat" type="button" onClick={onNewChat}><Plus size={17} /> New chat</button>
      <div className="history-label">Recent</div>
      {RECENT_CHATS.map((chat, index) => <button className={`history-item ${index === 0 ? 'active' : ''}`} key={chat} type="button">{chat}</button>)}
      <div className="sidebar-footer"><div><span>{PAGE_CONTENT.plan}</span></div><Menu size={17} /></div>
    </aside>
  )
}