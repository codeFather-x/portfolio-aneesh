import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { remarkImages } from '../lib/remarkImages'

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)/)
  if (!match) return { meta: {}, content: raw }
  const meta = {}
  match[1].split('\n').forEach(line => {
    const [k, ...v] = line.split(':')
    if (k) meta[k.trim()] = v.join(':').trim().replace(/^["']|["']$/g, '')
  })
  // parse tags array
  if (meta.tags) {
    meta.tags = meta.tags.replace(/[\[\]]/g, '').split(',').map(t => t.trim()).filter(Boolean)
  }
  return { meta, content: match[2] }
}

export default function BlogPost() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch(`/blog/posts/${slug}.md`)
      .then(r => { if (!r.ok) throw new Error(); return r.text() })
      .then(raw => {
        const { meta, content } = parseFrontmatter(raw)
        setPost({ meta, content })
        setLoading(false)
      })
      .catch(() => { setError(true); setLoading(false) })
  }, [slug])

  if (loading) return (
    <main style={{ paddingTop: 'calc(var(--nav-h) + 5rem)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', letterSpacing: '0.1em' }}>Loading...</p>
    </main>
  )

  if (error) return (
    <main style={{ paddingTop: 'calc(var(--nav-h) + 5rem)', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem' }}>
      <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', letterSpacing: '0.1em' }}>// 404 — post not found</p>
      <Link to="/blog" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--cyan)', letterSpacing: '0.08em' }}>← Back to blog</Link>
    </main>
  )

  const { meta, content } = post

  return (
    <main style={{ paddingTop: 'calc(var(--nav-h) + 4rem)', paddingBottom: '7rem', minHeight: '100vh' }}>
      <style>{`
        .prose { max-width: 720px; margin: 0 auto; padding: 0 3rem; }
        .prose h1 { font-family:var(--font-display); font-size:2.4rem; font-weight:800; color:#fff; line-height:1.15; margin-bottom:0.5rem; }
        .prose h2 { font-family:var(--font-display); font-size:1.7rem; font-weight:700; color:#fff; margin:3rem 0 1rem; }
        .prose h3 { font-family:var(--font-display); font-size:1.3rem; font-weight:700; color:var(--text); margin:2rem 0 0.8rem; }
        .prose p { color:var(--text-muted); font-weight:300; font-size:1.05rem; margin-bottom:1.4rem; line-height:1.85; }
        .prose a { color:var(--cyan); text-decoration:underline; text-underline-offset:3px; }
        .prose code { font-family:var(--font-mono); font-size:0.85rem; color:var(--cyan-dim); background:var(--bg3); padding:0.15rem 0.45rem; border:0.5px solid var(--border); }
        .prose pre { background:var(--bg2); border:0.5px solid var(--border); padding:1.5rem; overflow-x:auto; margin:2rem 0; }
        .prose pre code { background:none; border:none; padding:0; font-size:0.85rem; color:var(--text); }
        .prose blockquote { border-left:2px solid var(--cyan); padding-left:1.5rem; margin:2rem 0; }
        .prose blockquote p { color:var(--text-dim); font-style:italic; }
        .prose ul, .prose ol { color:var(--text-muted); font-weight:300; font-size:1.05rem; padding-left:1.5rem; margin-bottom:1.4rem; }
        .prose li { margin-bottom:0.4rem; }
        .prose hr { border:none; border-top:0.5px solid var(--border); margin:3rem 0; }
        .prose img { max-width:100%; border:0.5px solid var(--border); }
        .prose table { width:100%; border-collapse:collapse; margin:2rem 0; font-size:0.9rem; }
        .prose th { font-family:var(--font-mono); font-size:0.72rem; text-transform:uppercase; letter-spacing:0.1em; color:var(--cyan); border-bottom:0.5px solid var(--border-bright); padding:0.8rem 1rem; text-align:left; }
        .prose td { color:var(--text-muted); border-bottom:0.5px solid var(--border); padding:0.8rem 1rem; }
      `}</style>

      <div className="prose">
        <Link to="/blog" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-dim)', letterSpacing: '0.1em', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '3rem', transition: 'color 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--cyan)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-dim)'}
        >
          ← Blog
        </Link>

        <div style={{ marginBottom: '3rem' }}>
          <h1 className="prose" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 800, color: '#fff', lineHeight: 1.15, marginBottom: '1rem' }}>
            {meta.title || slug}
          </h1>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
            {meta.date && <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-dim)', letterSpacing: '0.08em' }}>{meta.date}</span>}
            {meta.readingTime && <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-dim)' }}>{meta.readingTime}</span>}
            {meta.tags && meta.tags.map(t => (
              <span key={t} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--cyan-dim)', border: '0.5px solid rgba(0,184,196,0.25)', padding: '0.15rem 0.55rem' }}>{t}</span>
            ))}
          </div>
        </div>

        <ReactMarkdown remarkPlugins={[remarkGfm, remarkImages]}>{content}</ReactMarkdown>
      </div>
    </main>
  )
}
