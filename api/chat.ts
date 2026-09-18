import { openai } from '@ai-sdk/openai'
import { convertToModelMessages, streamText } from 'ai'

const getEnvVar = (key: string) => {
  if (typeof process !== 'undefined' && process.env) {
    return process.env[key]
  }

  return undefined
}

type ChatRequestBody = {
  messages?: any[]
}

export async function handleChatRequest(request: Request) {
  const apiKey = getEnvVar('OPENAI_API_KEY')

  if (!apiKey) {
    return new Response(
      JSON.stringify({
        error: 'OPENAI_API_KEY is missing. Add it to your environment before running the app.',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }

  let body: ChatRequestBody = {}

  try {
    body = (await request.json()) as ChatRequestBody
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request body.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const messages = Array.isArray(body.messages) ? body.messages : []

  if (messages.length === 0) {
    return new Response(JSON.stringify({ error: 'No messages were provided.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const result = streamText({
    model: openai(getEnvVar('OPENAI_MODEL') ?? 'gpt-4o-mini'),
    system: 'You are Lumina, a thoughtful and concise personal assistant. Be useful, warm, and direct.',
    messages: await convertToModelMessages(messages as any[]),
  })

  return result.toUIMessageStreamResponse()
}

export async function POST(request: Request) {
  return handleChatRequest(request)
}