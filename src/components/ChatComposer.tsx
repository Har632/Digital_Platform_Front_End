import { ArrowUp, CircleStop, Paperclip } from 'lucide-react'
import { PAGE_CONTENT } from '../constants/page'

type ChatComposerProps = {
  input: string
  isStreaming: boolean
  onChange: (value: string) => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  onStop: () => void
}

export function ChatComposer({ input, isStreaming, onChange, onSubmit, onStop }: ChatComposerProps) {
  return <form className="composer-wrap" onSubmit={onSubmit}><div className="composer"><button className="icon-button" title="Attach a file" type="button"><Paperclip size={18} /></button><input value={input} onChange={(event) => onChange(event.target.value)} placeholder={PAGE_CONTENT.composerPlaceholder} aria-label={PAGE_CONTENT.composerPlaceholder} /><button className="send-button" title={isStreaming ? 'Stop generating' : 'Send message'} type={isStreaming ? 'button' : 'submit'} onClick={isStreaming ? onStop : undefined}>{isStreaming ? <CircleStop size={18} /> : <ArrowUp size={18} />}</button></div><p className="disclaimer">{PAGE_CONTENT.disclaimer}</p></form>
}