
import FastMarquee from 'react-fast-marquee'

const Marquee = FastMarquee.default || FastMarquee

const skills = [
  { name: 'ReactJS', svg: '/react-logo.svg', color: '#61dafb' },
  { name: 'Python', svg: '/python-logo.svg', color: '#3776ab' },
  { name: 'LangGraph', svg: '/langgraph-dark.svg', color: '#1D3C3C' },
  { name: 'AWS', svg: '/aws-icon.svg', color: '#ff9900' },
  { name: 'Java', svg: '/java-logo.svg', color: '#E76F00' },
  { name: 'MCP', svg: '/mcp.svg', color: '#ffffff' },
  {name: 'OpenSearch', svg: '/opensearch.svg', color: '#3776ab'}
]

export default function SkillsMarquee() {
  return (
    <>
      <style>{`
        @media (max-width: 640px) {
          .skills-marquee-img {
            min-height: 60px !important;
            max-height: 80px !important;
          }
        }
      `}</style>

    <section style={{ padding: '3rem 0'}}>
      
      <Marquee gradient={false} speed={50} pauseOnHover={true}>
        <div style={{ display: 'flex', gap: '2rem', paddingRight: '2rem', height: '150px'}}>
          {skills.map((skill) => (
            <div
              key={skill.name}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem 1.5rem',
                // border: '0.5px solid var(--border)',
                // background: 'rgba(0, 212, 255, 0.05)',
                borderRadius: '0.5rem',
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                position: 'relative',
                height: '100%',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = skill.color
                // e.currentTarget.style.background = `rgba(${parseInt(skill.color.slice(1, 3), 16)}, ${parseInt(skill.color.slice(3, 5), 16)}, ${parseInt(skill.color.slice(5, 7), 16)}, 0.1)`
                e.currentTarget.style.boxShadow = `0 0 20px ${skill.color}40`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)'
                // e.currentTarget.style.background = 'rgba(0, 212, 255, 0.05)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <img className="skills-marquee-img" src={skill.svg} alt={skill.name} style={{ minHeight: '80px',maxHeight: '100px', maxWidth: '300px', width: 'auto', height: 'auto', objectFit: 'fill', filter: `drop-shadow(0 0 10px ${skill.color}00)` }} />
              {/* <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', fontWeight: 500, color: '#fff' }}>
                {skill.name}
              </span> */}
            </div>
          ))}
        </div>
      </Marquee>
    </section>
    </>
  )
}
