import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function BlogIndex() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTag, setActiveTag] = useState(null)

  useEffect(() => {
    fetch('/blog/index.json')
      .then(r => r.json())
      .then(data => { setPosts(data); setLoading(false) })
      .catch(() => { setPosts([]); setLoading(false) })
  }, [])

  const allTags = [...new Set(posts.flatMap(p => p.tags))]
  const filtered = activeTag ? posts.filter(p => p.tags.includes(activeTag)) : posts

  return (
    <main style={{ paddingTop: 'calc(var(--nav-h) + 5rem)', paddingBottom: '7rem', minHeight: '100vh' }}>
      <style>{`
        .post-card { display:block; border:0.5px solid var(--border); background:var(--bg2); padding:2rem 2.5rem; text-decoration:none; transition:border-color 0.3s; position:relative; overflow:hidden; }
        .post-card::after { content:''; position:absolute; bottom:0; left:0; right:0; height:1px; background:linear-gradient(90deg,var(--cyan),transparent); transform:scaleX(0); transform-origin:left; transition:transform 0.4s ease; }
        .post-card:hover { border-color:rgba(0,245,255,0.25); }
        .post-card:hover::after { transform:scaleX(1); }
        .tag-btn { font-family:var(--font-mono); font-size:0.65rem; letter-spacing:0.08em; text-transform:uppercase; padding:0.3rem 0.8rem; border:0.5px solid var(--border); background:transparent; color:var(--text-muted); cursor:pointer; transition:all 0.2s; }
        .tag-btn.active, .tag-btn:hover { border-color:var(--border-bright); color:var(--cyan); background:var(--cyan-glow); }
        .post-tag { font-family:var(--font-mono); font-size:0.62rem; color:var(--cyan-dim); border:0.5px solid rgba(0,184,196,0.2); padding:0.15rem 0.55rem; letter-spacing:0.05em; }
      `}</style>

      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 3rem' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--cyan)', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>// Blog</p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem,5vw,4rem)', fontWeight: 800, color: '#fff', lineHeight: 1.1, marginBottom: '0.8rem' }}>
          Thoughts on AI, engineering and life...
        </h1>
        <br></br>
        {allTags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2.5rem' }}>
            <button className={`tag-btn ${!activeTag ? 'active' : ''}`} onClick={() => setActiveTag(null)}>All</button>
            {allTags.map(tag => (
              <button key={tag} className={`tag-btn ${activeTag === tag ? 'active' : ''}`} onClick={() => setActiveTag(tag === activeTag ? null : tag)}>{tag}</button>
            ))}
          </div>
        )}

        {loading ? (
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-dim)' }}>Loading posts...</p>
        ) : filtered.length === 0 ? (
          <div style={{ border: '0.5px solid var(--border)', padding: '3rem', textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-dim)', letterSpacing: '0.1em' }}>// No posts yet</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.8rem', fontWeight: 300 }}>
              Add <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--cyan-dim)' }}>.md</code> files to <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--cyan-dim)' }}>public/blog/posts/</code> with frontmatter and run <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--cyan-dim)' }}>npm run build</code>.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {filtered.map(post => (
              <Link key={post.slug} to={`/blog/${post.slug}`} className="post-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.8rem' }}>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color: '#fff', lineHeight: 1.3 }}>{post.title}</h2>
                  <div style={{ display: 'flex', gap: '1rem', flexShrink: 0, marginLeft: '2rem', paddingTop: '0.2rem' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-dim)' }}>{post.readingTime}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-dim)' }}>{post.date}</span>
                  </div>
                </div>
                {post.excerpt && <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 300, marginBottom: '1rem' }}>{post.excerpt}</p>}
                {post.tags.length > 0 && (
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {post.tags.map(t => <span key={t} className="post-tag">{t}</span>)}
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
