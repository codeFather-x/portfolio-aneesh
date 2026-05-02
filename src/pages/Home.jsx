import { useEffect, useRef } from 'react'

import About from '../components/About'
import Contact from '../components/Contact'
import SkillsMarquee from '../components/SkillsMarquee'
import '@dotlottie/player-component'

import useHashScroll from '../hooks/useHashScroll'
import MyGlobe from '@/components/Globe2'

const fadeUp = (delay = 0) => ({
  animation: `fadeUp 0.9s ease ${delay}s both`,
})

export default function Home() {
	const scrollAnimationRef = useRef(null)
	const scrollToHash = useHashScroll()

  useEffect(() => {
    const player = scrollAnimationRef.current
    if (!player) return

    const playScrollCue = () => {
      player.setLooping?.(true)
      player.seek?.('35%')
      player.play?.()
    }

    const restartScrollCue = () => {
      player.seek?.(0)
      player.play?.()
    }

    player.addEventListener('ready', playScrollCue)
    player.addEventListener('data_ready', playScrollCue)
    player.addEventListener('complete', restartScrollCue)
    playScrollCue()

    return () => {
      player.removeEventListener('ready', playScrollCue)
      player.removeEventListener('data_ready', playScrollCue)
      player.removeEventListener('complete', restartScrollCue)
    }
  }, [])

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

	  <section
        id="home"
       style={{ position:'relative', height:'100vh', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
		{/* <Globe /> */}
		<MyGlobe />
		
		<div style={{ position:'absolute', top:'40%', left:'30%', transform:'translate(-50%, -50%)', zIndex:10, textAlign:'left', pointerEvents:'none', overflow:'hidden' }}>
			<p style={{ ...fadeUp(0.7), textAlign:'left',fontFamily:'var(--font-body)', fontSize:'1.05rem', fontWeight:500, color:'var(--text-muted)', marginTop:'1.2rem' }}>
				Hey there! I am
		  	</p>
		  <h1 style={{ ...fadeUp(0.5), fontFamily:'var(--font-display)', fontSize:'clamp(3.5rem,8vw,7rem)', fontWeight:800, lineHeight:0.95, letterSpacing:'-0.02em', color:'#fff' }}>
			Aneesh<br /><span style={{ color:'var(--cyan)' }}>Dua</span>
		  </h1>
		  <p style={{ ...fadeUp(0.7), fontFamily:'var(--font-body)', fontSize:'1.05rem', fontWeight:300, color:'var(--text-muted)', marginTop:'1.2rem' }}>
			I build things for the web.
		  </p>
		  
		  {/* <p style={{ ...fadeUp(0.3), fontFamily:'var(--font-mono)', fontSize:'0.75rem', color:'var(--cyan)', letterSpacing:'0.25em', textTransform:'uppercase', marginBottom:'1.2rem' }}>
			// software engineer — solve problems and deliver products
		  </p> */}
		  {/* <div style={{ ...fadeUp(0.9), display:'flex', gap:'1rem', justifyContent:'center', marginTop:'2.5rem', pointerEvents:'all' }}>
			<Link to="/projects" className="btn-primary">View Work</Link>
		  </div> */}
		</div>

	    <button
			type="button"
			onClick={() => scrollToHash('about')}
		 	style={{
				position: 'absolute',
				zIndex: 20,
				bottom: 'max(1.25rem, env(safe-area-inset-bottom))',
				left: 0,
				right: 0,
				margin: '0 auto',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				gap: '0.5rem',
				background: 'transparent',
				border: 'none',
				padding: 0,
				cursor: 'pointer',
			}}
			aria-label="Scroll to about section"
		>
		  <dotlottie-player
			ref={scrollAnimationRef}
			src="/scroll-animated.json"
			autoplay
			loop="true"
			renderer="svg"
			background="transparent"
			aria-hidden="true"
			style={{ width:'3rem', height:'3rem', display:'block', opacity:1, filter:'drop-shadow(0 0 12px rgba(0,245,255,0.75))', pointerEvents:'none' }}
		  />
		  {/* <div style={{ width:'0.5px', height:'48px', background:'linear-gradient(to bottom, var(--cyan), transparent)', animation:'scrollPulse 2s ease-in-out infinite' }} /> */}
		</button>
	  </section>
	  <section id="about" style={{ scrollMarginTop: 'calc(var(--nav-h) + 1rem)' }}>
		<About />
	  </section>
	  <section id="skills" style={{ scrollMarginTop: 'calc(var(--nav-h) + 1rem)' }}>
		<SkillsMarquee />
	  </section>
		<section id="contact" style={{ scrollMarginTop: 'calc(var(--nav-h) + 1rem)' }}>
	  		<Contact />
	    </section>
	</>
  )
}
