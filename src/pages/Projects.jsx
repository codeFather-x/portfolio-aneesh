const projects = [
  {
    num: '01', featured: true,
    title: 'NeuralRouter',
    desc: 'Intelligent LLM request routing system that dynamically distributes AI inference workloads across multiple model providers based on cost, latency, and capability requirements. Handles 2M+ requests/day with p99 latency under 200ms.',
    tech: ['Go', 'Kubernetes', 'Redis', 'gRPC', 'Prometheus'],
    link: '#',
  },
  {
    num: '02',
    title: 'DataSentinel',
    desc: 'Real-time anomaly detection pipeline for streaming financial data. Uses an ensemble of statistical models and a fine-tuned transformer to flag irregularities before they cascade.',
    tech: ['Python', 'Kafka', 'PyTorch', 'Flink'],
    link: '#',
  },
  {
    num: '03',
    title: 'ContextForge',
    desc: 'RAG infrastructure platform managing document ingestion, chunking strategies, embedding pipelines, and hybrid retrieval — turning any corpus into a queryable knowledge base for LLM apps.',
    tech: ['FastAPI', 'Pinecone', 'PostgreSQL', 'Rust'],
    link: '#',
  },
]

export default function Projects() {
  return (
    <main style={{ paddingTop: 'calc(var(--nav-h) + 5rem)', paddingBottom: '7rem', minHeight: '100vh' }}>
      <style>{`
        .project-card { border: 0.5px solid var(--border); background: var(--bg2); padding: 2.5rem; position: relative; overflow: hidden; transition: border-color 0.3s; }
        .project-card::after { content:''; position:absolute; bottom:0; left:0; right:0; height:1px; background:linear-gradient(90deg,var(--cyan),transparent); transform:scaleX(0); transform-origin:left; transition:transform 0.4s ease; }
        .project-card:hover { border-color: rgba(0,245,255,0.25); }
        .project-card:hover::after { transform: scaleX(1); }
        .tech-tag { font-family:var(--font-mono); font-size:0.65rem; color:var(--cyan-dim); border:0.5px solid rgba(0,184,196,0.25); padding:0.2rem 0.65rem; letter-spacing:0.05em; }
      `}</style>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 3rem' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--cyan)', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>03 / Projects</p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem,5vw,4rem)', fontWeight: 800, color: '#fff', lineHeight: 1.1, marginBottom: '4rem' }}>Selected work</h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {projects.map(p => (
            <div key={p.num} className="project-card">
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-dim)', letterSpacing: '0.2em', marginBottom: '1rem' }}>
                // {p.num}{p.featured ? ' — Featured' : ''}
              </p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 700, color: '#fff', marginBottom: '0.8rem' }}>{p.title}</h2>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', fontWeight: 300, marginBottom: '1.5rem', maxWidth: '680px' }}>{p.desc}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {p.tech.map(t => <span key={t} className="tech-tag">{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
