const stats = [
  { num: '5+', label: 'Years building' },
  { num: '19+', label: 'Research citations' },
  { num: '3', label: 'AI products in prod' },
  { num: '∞', label: 'Uptime target' },
]

export default function About() {
  return (
    <>
      <style>{`
        .about-section { padding: clamp(3.5rem, 8vw, 5rem) clamp(1.25rem, 4vw, 3rem); max-width: 1100px; margin: 0 auto; }
        .about-title { margin-bottom: clamp(2rem, 5vw, 4rem); }
        .about-grid { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: clamp(2rem, 5vw, 5rem); align-items: start; }
        .about-copy { min-width: 0; }
        .about-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; min-width: 0; }
        .about-stat { padding: 1.5rem; border: 0.5px solid var(--border); background: var(--bg2); position: relative; overflow: hidden; min-width: 0; }
        .about-stat-bar { position: absolute; top: 0; left: 0; width: 2px; height: 100%; background: var(--cyan); }
        .about-stat-num { font-family: var(--font-display); font-size: 2.4rem; font-weight: 800; color: var(--cyan); line-height: 1; }
        .about-stat-label { font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-muted); letter-spacing: 0.1em; text-transform: uppercase; margin-top: 0.4rem; }
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr; gap: 2.5rem; }
          .about-stats { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 640px) {
          .about-section { padding-top: 3rem; padding-bottom: 3.5rem; }
          .about-stats { grid-template-columns: 1fr; gap: 1rem; }
          .about-stat { padding: 1.25rem; }
          .about-stat-num { font-size: 2rem; }
        }
      `}</style>

    <section className="about-section">
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--cyan)', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>
        01 / About
      </p>
      <h2 className="about-title" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem,5vw,4rem)', fontWeight: 800, lineHeight: 1.1, color: '#fff' }}>
        {/* Backend systems that don't flinch. AI pipelines that don't hallucinate. */}
        Software Engineer - but mostly a problem solver
      </h2>

      <div className="about-grid">
        <div className="about-copy">
          {[
            <>I'm a security focused software engineer and have an expertise in <strong style={{ color: 'var(--text)', fontWeight: 500 }}>AI systems, web apps with distributed services </strong> and building infrastructure that's resilient and adaptive.</>,
            <>I specialize in solving problems with technology and I love to power real-world products used by millions.</>,
            // <>Currently exploring the frontier of <strong style={{ color: 'var(--text)', fontWeight: 500 }}>LLM-powered applications</strong>, retrieval-augmented generation, and agentic workflows — where software stops being a tool and starts becoming a collaborator.</>,
          ].map((text, i) => (
            <p key={i} style={{ color: 'var(--text-muted)', fontWeight: 300, fontSize: '1.05rem', marginBottom: '1.3rem' }}>{text}</p>
          ))}
        </div>

        <div className="about-stats">
          {stats.map(({ num, label }) => (
            <div key={label} className="about-stat">
              <div className="about-stat-bar" />
              <div className="about-stat-num">{num}</div>
              <div className="about-stat-label">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  )
}
