'use client'

import { useState, type FormEvent } from 'react'
import { site } from '@/data/site'
import { Button } from '@/components/ui/button'

const topics = [
  { value: 'review-keys', label: 'PR / review keys' },
  { value: 'collab', label: 'Collabs' },
  { value: 'general', label: 'General questions' },
] as const

export function ContactForm() {
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const topic = String(data.get('topic') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()
    if (!name || !email || !topic || !message) {
      setError('Fill every field. No empty PR mail.')
      setSent(false)
      return
    }
    if (!email.includes('@')) {
      setError('That email address is not valid.')
      setSent(false)
      return
    }
    setError('')
    setSent(true)
    event.currentTarget.reset()
  }

  return (
    <form onSubmit={onSubmit} className="grid max-w-xl gap-4" noValidate>
      <label className="grid gap-1 text-sm">
        Name
        <input name="name" className="h-11 border border-line bg-elevated px-3" autoComplete="name" />
      </label>
      <label className="grid gap-1 text-sm">
        Email
        <input name="email" type="email" className="h-11 border border-line bg-elevated px-3" autoComplete="email" />
      </label>
      <label className="grid gap-1 text-sm">
        Topic
        <select name="topic" className="h-11 border border-line bg-elevated px-3" defaultValue="">
          <option value="" disabled>
            Pick a topic
          </option>
          {topics.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </label>
      <label className="grid gap-1 text-sm">
        Message
        <textarea name="message" rows={6} className="border border-line bg-elevated px-3 py-2" />
      </label>
      {error ? <p className="text-sm text-danger">{error}</p> : null}
      {sent ? (
        <p className="text-sm text-accent">
          Logged in this demo. No mail leaves the building. For real keys: {site.creator.email}.
        </p>
      ) : null}
      <Button type="submit">Send</Button>
    </form>
  )
}
