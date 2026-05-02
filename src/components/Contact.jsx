import { useForm } from "@formspree/react";
import { EmailIcon, GitHubIcon, LinkedInIcon, ResumeIcon } from "./icons";

const contactLinks = [
  {
    icon: EmailIcon,
    href: "mailto:workstuff.dua@gmail.com",
    label: "workstuff.dua@gmail.com",
  },
  {
    icon: GitHubIcon,
    href: "https://github.com/codeFather-x",
    label: "github.com/codeFather-x",
  },
  {
    icon: LinkedInIcon,
    href: "https://www.linkedin.com/in/aneesh-dua-b6160b151/",
    label: "linkedin.com/in/aneesh-dua",
  },
  {
	icon: ResumeIcon,
	href: "https://drive.google.com/file/d/1q2wcVv3-pGwIlBoFILeuVvCaZqQA2TR9/view?usp=sharing",
	label: "My Resume",
  }
];

export default function Contact() {
  const [state, handleSubmit] = useForm("xnjwqwer");
  if (state.succeeded) {
    return <p>Thanks for connecting! Looking forward to speak to you</p>;
  }

  return (
    <>
      <style>{`
		.contact-section { padding: clamp(3.5rem, 8vw, 5rem) clamp(1.25rem, 4vw, 3rem) clamp(4.5rem, 9vw, 7rem); max-width:1100px; margin:0 auto; }
		.contact-grid { display:grid; grid-template-columns:minmax(0, 1.1fr) minmax(0, 0.9fr); gap:clamp(2rem, 5vw, 5rem); align-items:start; }
		.contact-copy { min-width:0; }
		.contact-form { min-width:0; }
		.contact-links { display:flex; flex-direction:column; gap:1rem; }
		.contact-link { display:flex; align-items:center; gap:1rem; font-family:var(--font-mono); font-size:0.85rem; color:var(--text-muted); text-decoration:none; padding:1rem 1.5rem; border:0.5px solid var(--border); background:var(--bg2); transition:all 0.2s; min-width:0; line-height:1.4; overflow-wrap:anywhere; }
		.contact-link:hover { color:var(--cyan); border-color:var(--border-bright); background:var(--cyan-glow); }
		.contact-link span { flex:0 0 auto; }
		.contact-link .contact-link-label { min-width:0; flex:1 1 auto; }
		.contact-title { margin-bottom:clamp(2rem, 5vw, 4rem); }
		.form-input { background:var(--bg2); border:0.5px solid var(--border); color:var(--text); font-family:var(--font-body); font-size:0.9rem; padding:0.8rem 1rem; outline:none; transition:border-color 0.2s; width:100%; resize:none; box-sizing:border-box; min-width:0; }
		.form-input:focus { border-color:var(--border-bright); }
		.form-input::placeholder { color:var(--text-dim); }
		.btn-primary { font-family:var(--font-mono); font-size:0.78rem; letter-spacing:0.1em; text-transform:uppercase; padding:0.9rem 2rem; background:var(--cyan); color:var(--bg); border:none; cursor:pointer; clip-path:polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%); transition:background 0.2s; align-self:flex-start; }
		.btn-primary:hover { background:#fff; }
		@media (max-width: 900px) {
		  .contact-grid { grid-template-columns:1fr; gap:2.5rem; }
		  .contact-section { padding-left:1.25rem; padding-right:1.25rem; }
		  .btn-primary { width:100%; max-width:320px; }
		}
		@media (max-width: 640px) {
		  .contact-section { padding-top:3rem; padding-bottom:4rem; }
		  .contact-title { margin-bottom:2rem; }
		  .contact-link { padding:0.95rem 1rem; font-size:0.8rem; }
		  .contact-link span { width:18px; height:18px; }
		  .form-input { font-size:1rem; padding:0.95rem 1rem; }
		  .btn-primary { max-width:none; width:100%; }
		}
	  `}</style>

      <section
        className="contact-section"
      >
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.72rem",
            color: "var(--cyan)",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            marginBottom: "0.8rem",
          }}
        >
          04 / Contact
        </p>
        <h2
          className="contact-title"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.5rem,5vw,4rem)",
            fontWeight: 800,
            color: "#fff",
            lineHeight: 1.1,
          }}
        >
          Let's build something
          <br />
          that matters
        </h2>

        <div className="contact-grid">
          <div className="contact-copy">
            <p
              style={{
                color: "var(--text-muted)",
                fontWeight: 300,
                fontSize: "1.05rem",
                marginBottom: "1.3rem",
              }}
            >
              Whether you're looking to bring on a backend engineer, explore AI
              infrastructure challenges, or collaborate on a research project —
              I'm always open to interesting conversations.
            </p>
            <p
              style={{
                color: "var(--text-muted)",
                fontWeight: 300,
                fontSize: "1.05rem",
                marginBottom: "2rem",
              }}
            >
              Fastest response on LinkedIn.
            </p>
            <div className="contact-links">
              {contactLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="contact-link"
                  target={href.startsWith("http") ? "_blank" : undefined}
                >
                  <span
                    style={{
                      color: "var(--cyan)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "20px",
                      height: "20px",
                    }}
                  >
                    <Icon />
                  </span>
                  <span className="contact-link-label">{label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="contact-form">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {[
                { label: 'Name', key: 'name', type: 'text', placeholder: 'Your name' },
                { label: 'Email', key: 'email', type: 'email', placeholder: 'your@email.com' },
              ].map(({ label, key, type, placeholder }) => (
                <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>{label}</label>
                  <input type={type} className="form-input" placeholder={placeholder} name={key} />
                </div>
              ))}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Message</label>
                <textarea className="form-input" rows={5} placeholder="What are you working on?" name="message" />
              </div>
              <button type="submit" className="btn-primary" disabled={state.submitting}>
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
