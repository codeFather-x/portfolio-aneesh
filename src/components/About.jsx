const stats = [
  { num: '5+', label: 'Years building' },
  { num: '12+', label: 'Projects shipped' },
  { num: '3', label: 'AI products in prod' },
  { num: '∞', label: 'Uptime target' },
]

export default function About() {
  return (
    <section style={{ padding: '5rem 3rem', maxWidth: '1100px', margin: '0 auto' }}>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--cyan)', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>
        01 / About
      </p>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem,5vw,4rem)', fontWeight: 800, lineHeight: 1.1, color: '#fff', marginBottom: '4rem' }}>
        Engineering at the intersection<br />of scale &amp; intelligence
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start' }}>
        <div>
          {[
            <>I'm a backend-focused software engineer with a deep interest in <strong style={{ color: 'var(--text)', fontWeight: 500 }}>AI systems, distributed architecture,</strong> and building infrastructure that's resilient and adaptive.</>,
            <>I specialize in designing <strong style={{ color: 'var(--text)', fontWeight: 500 }}>high-throughput data pipelines</strong>, deploying machine learning models at scale, and engineering APIs that power real-world products used by millions.</>,
            <>Currently exploring the frontier of <strong style={{ color: 'var(--text)', fontWeight: 500 }}>LLM-powered applications</strong>, retrieval-augmented generation, and agentic workflows — where software stops being a tool and starts becoming a collaborator.</>,
          ].map((text, i) => (
            <p key={i} style={{ color: 'var(--text-muted)', fontWeight: 300, fontSize: '1.05rem', marginBottom: '1.3rem' }}>{text}</p>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          {stats.map(({ num, label }) => (
            <div key={label} style={{ padding: '1.5rem', border: '0.5px solid var(--border)', background: 'var(--bg2)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '2px', height: '100%', background: 'var(--cyan)' }} />
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', fontWeight: 800, color: 'var(--cyan)', lineHeight: 1 }}>{num}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '0.4rem' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
