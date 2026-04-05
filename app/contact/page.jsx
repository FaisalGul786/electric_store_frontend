'use client'

import { useState } from 'react'
import { Header } from '@/components/Header'
import { Container } from '@/components/EmptyState'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, this would send the message to a server
    setSubmitted(true)
    setFormData({ name: '', email: '', subject: '', message: '' })
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <>
      <Header />
      <Container className="py-12">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-muted-foreground mb-12">
            Have a question? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="border border-border rounded-lg p-6 bg-card">
              <p className="text-3xl mb-3">📧</p>
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-muted-foreground text-sm">support@techstore.com</p>
            </div>
            <div className="border border-border rounded-lg p-6 bg-card">
              <p className="text-3xl mb-3">📞</p>
              <h3 className="font-semibold mb-2">Phone</h3>
              <p className="text-muted-foreground text-sm">1-800-TECH-STORE</p>
            </div>
            <div className="border border-border rounded-lg p-6 bg-card">
              <p className="text-3xl mb-3">🕐</p>
              <h3 className="font-semibold mb-2">Hours</h3>
              <p className="text-muted-foreground text-sm">24/7 Support</p>
            </div>
          </div>

          <div className="border border-border rounded-lg p-8 bg-card">
            {submitted && (
              <div className="mb-6 p-4 rounded-lg bg-accent/20 border border-accent text-accent text-sm">
                Thank you for your message! We&apos;ll get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-secondary text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-secondary text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-secondary text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Subject of your message"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-secondary text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent min-h-32"
                  placeholder="Your message here..."
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-accent text-card rounded-lg font-semibold hover:bg-accent/90 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </Container>
    </>
  )
}
