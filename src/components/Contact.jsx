import { useState } from "react";
import { useForm, ValidationError } from "@formspree/react";

const contactLinks = [
  {
    icon: "@",
    href: "mailto:workstuff.dua@gmail.com",
    label: "workstuff.dua@gmail.com",
  },
  {
    icon: "</>",
    href: "https://github.com/codeFather-x",
    label: "github.com/codeFather-x",
  },
  {
    icon: "in",
    href: "https://www.linkedin.com/in/aneesh-dua-b6160b151/",
    label: "linkedin.com/in/aneesh-dua",
  },
];

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handle = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const [state, handleSubmit] = useForm("xnjwqwer");
  if (state.succeeded) {
    return <p>Thanks for joining!</p>;
  }

  return (
    <>
      <style>{`
		.contact-link { display:flex; align-items:center; gap:1rem; font-family:var(--font-mono); font-size:0.85rem; color:var(--text-muted); text-decoration:none; padding:1rem 1.5rem; border:0.5px solid var(--border); background:var(--bg2); transition:all 0.2s; }
		.contact-link:hover { color:var(--cyan); border-color:var(--border-bright); background:var(--cyan-glow); }
		.form-input { background:var(--bg2); border:0.5px solid var(--border); color:var(--text); font-family:var(--font-body); font-size:0.9rem; padding:0.8rem 1rem; outline:none; transition:border-color 0.2s; width:100%; resize:none; }
		.form-input:focus { border-color:var(--border-bright); }
		.form-input::placeholder { color:var(--text-dim); }
		.btn-primary { font-family:var(--font-mono); font-size:0.78rem; letter-spacing:0.1em; text-transform:uppercase; padding:0.9rem 2rem; background:var(--cyan); color:var(--bg); border:none; cursor:pointer; clip-path:polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%); transition:background 0.2s; }
		.btn-primary:hover { background:#fff; }
	  `}</style>

      <section
        style={{
          padding: "5rem 3rem 7rem",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
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
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.5rem,5vw,4rem)",
            fontWeight: 800,
            color: "#fff",
            lineHeight: 1.1,
            marginBottom: "4rem",
          }}
        >
          Let's build something
          <br />
          that matters
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "5rem",
            alignItems: "start",
          }}
        >
          <div>
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
              Fastest response via email. Connect on GitHub to see what I'm
              building.
            </p>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              {contactLinks.map(({ icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="contact-link"
                  target={href.startsWith("http") ? "_blank" : undefined}
                >
                  <span
                    style={{
                      color: "var(--cyan)",
                      width: "20px",
                      textAlign: "center",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.85rem",
                    }}
                  >
                    {icon}
                  </span>
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* <div>
			{sent ? (
			  <div style={{ border: '0.5px solid var(--border-bright)', padding: '3rem', textAlign: 'center', background: 'var(--cyan-glow)' }}>
				<p style={{ fontFamily: 'var(--font-mono)', color: 'var(--cyan)', letterSpacing: '0.1em' }}>// Message received</p>
				<p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.8rem', fontWeight: 300 }}>I'll get back to you shortly.</p>
			  </div>
			) : (
			  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
				{[
				  { label: 'Name', key: 'name', type: 'text', placeholder: 'Your name' },
				  { label: 'Email', key: 'email', type: 'email', placeholder: 'your@email.com' },
				].map(({ label, key, type, placeholder }) => (
				  <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
					<label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>{label}</label>
					<input type={type} className="form-input" placeholder={placeholder} value={form[key]} onChange={handle(key)} />
				  </div>
				))}
				<div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
				  <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Message</label>
				  <textarea className="form-input" rows={5} placeholder="What are you working on?" value={form.message} onChange={handle('message')} />
				</div>
				<button className="btn-primary" onClick={() => setSent(true)}>Send Message</button>
			  </div>
			)}
		  </div> */}

          {/* FORM */}
          <form onSubmit={handleSubmit}>
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
