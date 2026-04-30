import { Link } from 'react-router-dom'
// import Globe from '../components/Globe'
import { Globe } from "@/components/ui/globe"
import About from '../components/About'
import Contact from '../components/Contact'

const fadeUp = (delay = 0) => ({
  animation: `fadeUp 0.9s ease ${delay}s both`,
})

export default function Home() {
  return (
	<>
	  <style>{`
		@keyframes fadeUp { from { opacity:0; transform:translateY(20px) } to { opacity:1; transform:translateY(0) } }
		@keyframes scrollPulse { 0%,100%{opacity:0.3} 50%{opacity:1} }
		.btn-primary { font-family:var(--font-mono);font-size:0.78rem;letter-spacing:0.1em;text-transform:uppercase;padding:0.8rem 2rem;background:var(--cyan);color:var(--bg);border:none;cursor:pointer;text-decoration:none;display:inline-block;clip-path:polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%);transition:background 0.2s; }
		.btn-primary:hover { background:#fff }
		.btn-ghost { font-family:var(--font-mono);font-size:0.78rem;letter-spacing:0.1em;text-transform:uppercase;padding:0.8rem 2rem;background:transparent;color:var(--cyan);border:0.5px solid var(--border-bright);cursor:pointer;text-decoration:none;display:inline-block;clip-path:polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%);transition:all 0.2s; }
		.btn-ghost:hover { background:var(--cyan-glow) }
	  `}</style>

	  <section style={{ position:'relative', height:'100vh', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
		<div className="bg-background relative flex size-full max-w-lg items-center justify-center overflow-hidden rounded-lg border px-40 pt-8 pb-40 md:pb-60">
		  <span className="pointer-events-none bg-linear-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl leading-none font-semibold whitespace-pre-wrap text-transparent dark:from-white dark:to-slate-900/10">
			Globe
		  </span>
		  <Globe className="top-28" />
		  <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.2),rgba(255,255,255,0))]" />
		</div>

		
		<div style={{ position:'relative', zIndex:10, textAlign:'center', pointerEvents:'none' }}>
		  <p style={{ ...fadeUp(0.3), fontFamily:'var(--font-mono)', fontSize:'0.75rem', color:'var(--cyan)', letterSpacing:'0.25em', textTransform:'uppercase', marginBottom:'1.2rem' }}>
			// software engineer — mainly a problem solver
		  </p>
		  <h1 style={{ ...fadeUp(0.5), fontFamily:'var(--font-display)', fontSize:'clamp(3.5rem,8vw,7rem)', fontWeight:800, lineHeight:0.95, letterSpacing:'-0.02em', color:'#fff' }}>
			Aneesh<br /><span style={{ color:'var(--cyan)' }}>Dua</span>
		  </h1>
		  <p style={{ ...fadeUp(0.7), fontFamily:'var(--font-body)', fontSize:'1.05rem', fontWeight:300, color:'var(--text-muted)', marginTop:'1.2rem' }}>
			Building distributed systems &amp; intelligent infrastructure
		  </p>
		  <div style={{ ...fadeUp(0.9), display:'flex', gap:'1rem', justifyContent:'center', marginTop:'2.5rem', pointerEvents:'all' }}>
			<Link to="/projects" className="btn-primary">View Work</Link>
		  </div>
		</div>

		<div style={{ position:'absolute', bottom:'2rem', left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:'0.5rem', animation:'fadeUp 1s ease 1.5s both' }}>
		  <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.6rem', color:'var(--text-dim)', letterSpacing:'0.2em', textTransform:'uppercase' }}>Scroll</span>
		  <div style={{ width:'0.5px', height:'48px', background:'linear-gradient(to bottom, var(--cyan), transparent)', animation:'scrollPulse 2s ease-in-out infinite' }} />
		</div>
	  <About />
	  </section>
	  <Contact />
	</>
  )
}
