'use client'

import { useState, type FormEvent } from 'react'
import { site } from '@/data/site'
import { Button } from '@/components/ui/button'

const topics = [
  { value: 'review-keys', label: 'PR / review keys' },
  { value: 'collab', label: 'Samenwerkingen' },
  { value: 'algemeen', label: 'Algemene vragen' },
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
      setError('Vul alle velden in. Geen lege PR-mails.')
      setSent(false)
      return
    }
    if (!email.includes('@')) {
      setError('Dat e-mailadres klopt niet.')
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
        Naam
        <input name="name" className="h-11 border border-line bg-elevated px-3" autoComplete="name" />
      </label>
      <label className="grid gap-1 text-sm">
        E-mail
        <input name="email" type="email" className="h-11 border border-line bg-elevated px-3" autoComplete="email" />
      </label>
      <label className="grid gap-1 text-sm">
        Onderwerp
        <select name="topic" className="h-11 border border-line bg-elevated px-3" defaultValue="">
          <option value="" disabled>
            Kies een onderwerp
          </option>
          {topics.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </label>
      <label className="grid gap-1 text-sm">
        Bericht
        <textarea name="message" rows={6} className="border border-line bg-elevated px-3 py-2" />
      </label>
      {error ? <p className="text-sm text-danger">{error}</p> : null}
      {sent ? (
        <p className="text-sm text-accent">
          Ontvangen in deze demo — er gaat geen mail de deur uit. Voor échte keys: {site.creator.email}.
        </p>
      ) : null}
      <Button type="submit">Verstuur</Button>
    </form>
  )
}
