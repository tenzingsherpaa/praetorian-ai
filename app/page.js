export default function Home() {
  return (
    <main>
      <div className="container">
        <nav className="nav">
          <div className="logo">
            <div className="logo-badge">P</div>
            Pome
          </div>
          <div className="nav-links">
            <a href="#how">How it works</a>
            <a href="#use">Use cases</a>
            <a href="#demo">Demo</a>
            <a href="#defense">Defense</a>
          </div>
          <button className="btn btn-ghost">Request access</button>
        </nav>

        <section className="hero">
          <div>
            <div className="tag">YC‑style defense hardening</div>
            <h1>Ship agents that survive hostile nation‑state pressure.</h1>
            <p>
              Governments and sophisticated adversaries are actively targeting AI systems. We red‑team your
              agents for prompt injection, data exfiltration, tool abuse, and covert persistence — then
              deliver hardened models with ship‑ready guardrails.
            </p>
            <div className="cta-row">
              <button className="btn btn-primary">Book a security briefing</button>
              <button className="btn btn-ghost">View a red‑team report</button>
            </div>
          </div>
          <div className="hero-card">
            <h3>Live audit snapshot</h3>
            <div className="metric">
              <span>99%</span>
              <div>Prompt injection coverage across mission tools</div>
            </div>
            <div className="metric">
              <span>42</span>
              <div>Novel nation‑state tradecraft patterns detected</div>
            </div>
            <div className="metric">
              <span>2.1x</span>
              <div>Reduction in classified data leak risk</div>
            </div>
          </div>
        </section>
      </div>

      <section id="how" className="section">
        <div className="container split">
          <div>
            <div className="kicker">How it works</div>
            <h2>We harden your agent like a foreign service would.</h2>
            <p className="lead">
              Our red‑team swarm simulates adversarial campaign playbooks and covert persistence. We train
              your agent on hostile sequences, then deploy guardrails tuned for real‑world operations.
            </p>
            <div className="timeline">
              <div className="step">
                <div className="step-num">1</div>
                <div>
                  <strong>Ingest</strong>
                  <p>Send your agent, tools, and policies. We mirror your environment in a private enclave.</p>
                </div>
              </div>
              <div className="step">
                <div className="step-num">2</div>
                <div>
                  <strong>Attack</strong>
                  <p>We run coordinated prompt injections, tool abuse, and data‑exfiltration paths.</p>
                </div>
              </div>
              <div className="step">
                <div className="step-num">3</div>
                <div>
                  <strong>Train</strong>
                  <p>Adversarially fine‑tune + add guardrails that hold under pressure.</p>
                </div>
              </div>
              <div className="step">
                <div className="step-num">4</div>
                <div>
                  <strong>Ship</strong>
                  <p>Deliver a hardened agent and a report aligned to military audit needs.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="quote">
            <p>
              “We thought our mission agent was secure. Pome surfaced escalation paths in 48 hours —
              and sealed them.”
            </p>
            <div>Security lead, federal integrator</div>
          </div>
        </div>
      </section>

      <section id="use" className="section">
        <div className="container">
          <div className="kicker">Use cases</div>
          <h2>Built for defense and critical‑infrastructure teams.</h2>
          <p className="lead">We focus on the adversaries that show up when the stakes are real.</p>
          <div className="grid-3">
            <div className="card">
              <h3>Prompt injection defense</h3>
              <p>Expose hidden instructions, role confusion, and covert instructions in tools.</p>
            </div>
            <div className="card">
              <h3>Supply‑chain sabotage detection</h3>
              <p>Detect malicious tool calls and poisoned retrievals before they propagate.</p>
            </div>
            <div className="card">
              <h3>Operational containment</h3>
              <p>Prevent data exfiltration, model drift, and unsafe tool execution.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="demo" className="section">
        <div className="container split">
          <div>
            <div className="kicker">Product demo</div>
            <h2>One dashboard. Every adversary path.</h2>
            <p className="lead">
              Watch live attack simulations against your agent. See every exploit path, every guardrail fix.
            </p>
            <button className="btn btn-primary">Watch the live demo</button>
            <div className="form-card">
              <div className="form-title">Get the demo link</div>
              <div className="form-row">
                <input type="email" placeholder="you@agency.mil" aria-label="Email address" />
                <button className="btn btn-primary">Notify me</button>
              </div>
              <div className="form-note">No spam. One link, one briefing.</div>
            </div>
          </div>
          <div className="video-card">
            <div className="video-header">Live red‑team replay</div>
            <video className="demo-video" controls muted playsInline poster="/demo-poster.jpg">
              <source src="/demo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="video-caption">Demo video source: `public/demo.mp4`.</div>
          </div>
        </div>
      </section>

      <section id="defense" className="section">
        <div className="container">
          <div className="kicker">Defense posture</div>
          <h2>Built for cleared environments and rapid deployment.</h2>
          <p className="lead">We run on your infra or ours, with encrypted datasets and strict access control.</p>
          <div className="grid-3">
            <div className="card">
              <h3>Private evals</h3>
              <p>We never train on mission data without explicit opt‑in.</p>
            </div>
            <div className="card">
              <h3>Audit‑ready outputs</h3>
              <p>Shareable reports, risk scoring, and mitigation playbooks.</p>
            </div>
            <div className="card">
              <h3>Fast turnaround</h3>
              <p>Initial hardening in 5 days. Recurring health checks.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="container footer">
        <div>© 2026 Pome. All rights reserved.</div>
        <div>hello@pome.ai · San Francisco</div>
      </footer>
    </main>
  );
}
