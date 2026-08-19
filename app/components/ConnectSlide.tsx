"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { PopupModal } from "react-calendly";

export default function ConnectSlide() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });
  const [showForm, setShowForm] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const [rootElement, setRootElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // Required for Calendly to attach securely to the DOM on the client side
    setRootElement(document.body);

    // Guard: Automatically close form and Calendly when PDF export or Print starts
    const observer = new MutationObserver(() => {
      if (document.body.classList.contains("pdf-export-active")) {
        setShowForm(false);
        setIsCalendlyOpen(false);
      }
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });

    const handlePrint = () => {
      setShowForm(false);
      setIsCalendlyOpen(false);
    };
    window.addEventListener("beforeprint", handlePrint);

    return () => {
      observer.disconnect();
      window.removeEventListener("beforeprint", handlePrint);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Add hidden honeypot and disable captcha for seamless UX
    formData.append("_captcha", "false");
    formData.append("_template", "box");

    try {
      const response = await fetch("https://formsubmit.co/ajax/makashifkpsph@gmail.com", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <section ref={ref} id="slide-connect" className="slide"
      style={{ alignItems: "center", justifyContent: "center", textAlign: "center" }}>

      {/* Background */}
      <div className="slide-bg"
        style={{ backgroundImage: "url('/Epic_minimalist_title_slide_background._202606181548.jpeg')" }} />
      <div className="slide-overlay"
        style={{ background: "linear-gradient(180deg, rgba(7,7,7,0.72) 0%, rgba(7,7,7,0.95) 100%)" }} />

      <div className="slide-content stack" style={{
        alignItems: "center",
        gap: "clamp(0.9rem, 1.8vh, 1.6rem)", maxWidth: "700px", margin: "0 auto", padding: "0 1rem"
      }}>

        {/* <motion.p className="t-label" style={{ letterSpacing: "0.26em" }}
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7 }}>
          14 / Start a Project
        </motion.p> */}

        <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.0, delay: 0.15, ease: [0.22, 1, 0.36, 1] as const }}>
          <span style={{ fontFamily: "var(--font-inter)", fontWeight: 600, fontSize: "1.2rem", letterSpacing: "0.3em", color: "#FFF" }}>
            ORIGIN ONE LABS
          </span>
        </motion.div>

        <motion.h2 className="t-hero" style={{ color: "#f2f2f2" }}
          initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.28, ease: [0.25, 0.46, 0.45, 0.94] as const }}>
          Let&apos;s Build<br />
          <span style={{ color: "rgba(242,242,242,0.3)" }}>What Matters</span>
        </motion.h2>

        <motion.span className="rule"
          initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.56 }}
          style={{ transformOrigin: "center", width: "48px" }} />

        <div style={{ position: "relative", width: "100%", display: "flex", justifyContent: "center", minHeight: "clamp(150px, 35vh, 300px)" }}>

          {/* FALLBACK FOR PDF: Instantly replaces the animated view during export to bypass exit animation delays */}
          <div className="pdf-only-cta stack" style={{ display: "none", alignItems: "center", width: "100%", textAlign: "center" }}>
            <p className="t-body" style={{ maxWidth: "480px" }}>
              Whether you&apos;re launching a new product, modernizing existing systems, or exploring AI opportunities, Origin One Labs is ready to help.
            </p>
            <div className="stack stack-xs" style={{ alignItems: "center", marginTop: "0.4rem" }}>
              <span className="t-body" style={{ color: "var(--tx-1)", borderBottom: "1px solid var(--border-bright)", paddingBottom: "2px" }}>
                hello@originonelabs.com
              </span>
              <span className="t-mono" style={{ marginTop: "0.15rem" }}>www.originonelabs.com</span>
            </div>
            <div style={{ display: "flex", gap: "0.9rem", flexWrap: "wrap", justifyContent: "center", marginTop: "0.8rem" }}>
              <div style={{ display: "inline-flex", alignItems: "center", padding: "clamp(0.75rem, 1.4vh, 0.95rem) clamp(1.4rem, 2.8vw, 2.2rem)", background: "var(--tx-1)", color: "#070707", fontFamily: "var(--f-body)", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" }}>
                Start a Project
              </div>
              <div style={{ display: "inline-flex", alignItems: "center", padding: "clamp(0.75rem, 1.4vh, 0.95rem) clamp(1.4rem, 2.8vw, 2.2rem)", background: "transparent", color: "var(--tx-1)", border: "1px solid var(--border-strong)", fontFamily: "var(--f-body)", fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase" }}>
                Schedule a Consultation
              </div>
            </div>
          </div>

          <div className="web-only-interactive" style={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <AnimatePresence mode="wait">
              {!showForm ? (
                <motion.div
                  key="default-view"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                  transition={{ duration: 0.4 }}
                  className="stack"
                  style={{ alignItems: "center", width: "100%" }}
                >
                  <motion.p className="t-body" style={{ maxWidth: "480px" }}
                    initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.68 }}>
                    Whether you&apos;re launching a new product, modernizing existing systems, or exploring AI opportunities, Origin One Labs is ready to help.
                  </motion.p>

                  {/* Contact links */}
                  <motion.div className="stack stack-xs" style={{ alignItems: "center", marginTop: "0.4rem" }}
                    initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.82 }}>
                    <a href="mailto:hello@originonelabs.com" className="t-body"
                      style={{
                        color: "var(--tx-1)", textDecoration: "none",
                        borderBottom: "1px solid var(--border-bright)", paddingBottom: "2px",
                        transition: "color 0.2s, border-color 0.2s"
                      }}
                      onMouseEnter={e => { e.currentTarget.style.color = "var(--accent)"; e.currentTarget.style.borderColor = "var(--accent)"; }}
                      onMouseLeave={e => { e.currentTarget.style.color = "var(--tx-1)"; e.currentTarget.style.borderColor = "var(--border-bright)"; }}>
                      hello@originonelabs.com
                    </a>
                    <span className="t-mono" style={{ marginTop: "0.15rem" }}>www.originonelabs.com</span>
                  </motion.div>

                  {/* CTA buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.96 }}
                    style={{ display: "flex", gap: "0.9rem", flexWrap: "wrap", justifyContent: "center", marginTop: "0.8rem" }}>

                    <button id="cta-start" onClick={() => setShowForm(true)}
                      style={{
                        display: "inline-flex", alignItems: "center",
                        padding: "clamp(0.75rem, 1.4vh, 0.95rem) clamp(1.4rem, 2.8vw, 2.2rem)",
                        background: "var(--tx-1)", color: "#070707", border: "none",
                        fontFamily: "var(--f-body)", fontSize: "0.72rem", fontWeight: 600,
                        letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer",
                        transition: "all 0.2s ease"
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = "#fff"}
                      onMouseLeave={e => e.currentTarget.style.background = "var(--tx-1)"}>
                      Start a Project
                    </button>

                    <button id="cta-consult" onClick={() => { /* setIsCalendlyOpen(true) */ }}
                      style={{
                        display: "inline-flex", alignItems: "center",
                        padding: "clamp(0.75rem, 1.4vh, 0.95rem) clamp(1.4rem, 2.8vw, 2.2rem)",
                        background: "transparent", color: "var(--tx-1)",
                        border: "1px solid var(--border-strong)",
                        fontFamily: "var(--f-body)", fontSize: "0.72rem", fontWeight: 500,
                        letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer",
                        transition: "all 0.2s ease"
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--border-bright)"; e.currentTarget.style.background = "var(--surface)"; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border-strong)"; e.currentTarget.style.background = "transparent"; }}>
                      Schedule a Consultation
                    </button>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key="form-view"
                  initial={{ opacity: 0, y: 15, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -15, filter: "blur(10px)" }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    width: "100%",
                    maxWidth: "580px",
                    background: "rgba(10, 10, 12, 0.6)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "12px",
                    padding: "clamp(1.5rem, 4vh, 2.5rem) clamp(1.5rem, 3vw, 2.5rem)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
                    zIndex: 10,
                    maxHeight: "clamp(400px, 80svh, 800px)",
                    overflowY: "auto"
                  }}
                >
                  {status === "success" ? (
                    <div className="stack" style={{ alignItems: "center", textAlign: "center", padding: "2rem 0" }}>
                      <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.2rem" }}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </div>
                      <h3 className="t-h3" style={{ marginBottom: "0.5rem", color: "#fff" }}>Request Received</h3>
                      <p className="t-body" style={{ color: "rgba(255,255,255,0.6)" }}>We&apos;ll be in touch shortly to discuss your project.</p>
                      <button onClick={() => { setShowForm(false); setStatus("idle"); }} style={{ marginTop: "2rem", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", padding: "0.6rem 2rem", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer", transition: "all 0.3s ease", borderRadius: "4px" }} onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; }} onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}>CLOSE</button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="stack" style={{ textAlign: "left", gap: "clamp(1rem, 2vh, 1.5rem)" }}>
                      <input type="hidden" name="_subject" value="New Project Inquiry" />

                      <div className="form-row">
                        <div className="stack" style={{ gap: "0.4rem" }}>
                          <label style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.15em", color: "rgba(255, 255, 255, 0.7)" }}>NAME *</label>
                          <input type="text" name="name" required className="form-input" placeholder="Enter your name" />
                        </div>
                        <div className="stack" style={{ gap: "0.4rem" }}>
                          <label style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.15em", color: "rgba(255, 255, 255, 0.7)" }}>EMAIL *</label>
                          <input type="email" name="email" required className="form-input" placeholder="you@company.com" />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="stack" style={{ gap: "0.4rem" }}>
                          <label style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.15em", color: "rgba(255, 255, 255, 0.7)" }}>COMPANY</label>
                          <input type="text" name="company" className="form-input" placeholder="Your company name" />
                        </div>
                        <div className="stack" style={{ gap: "0.4rem" }}>
                          <label style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.15em", color: "rgba(255, 255, 255, 0.7)" }}>PHONE</label>
                          <input type="tel" name="phone" className="form-input" placeholder="+1 (555) 000-0000" />
                        </div>
                      </div>

                      <div className="stack" style={{ gap: "0.4rem" }}>
                        <label style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.15em", color: "rgba(255, 255, 255, 0.7)" }}>PROJECT TYPE</label>
                        <div style={{ position: "relative" }}>
                          <select name="project_type" defaultValue="" className="form-input" style={{ appearance: "none", cursor: "pointer", width: "100%", color: "#fff" }}>
                            <option value="" disabled hidden>Select an option</option>
                            <option value="AI / ML" style={{ background: "#111", color: "#fff" }}>AI / ML</option>
                            <option value="Web & Mobile" style={{ background: "#111", color: "#fff" }}>Web & Mobile</option>
                            <option value="Fintech / Enterprise" style={{ background: "#111", color: "#fff" }}>Fintech / Enterprise</option>
                            <option value="Blockchain / Web3" style={{ background: "#111", color: "#fff" }}>Blockchain / Web3</option>
                            <option value="Other" style={{ background: "#111", color: "#fff" }}>Other</option>
                          </select>
                          <svg style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="6 9 12 15 18 9"></polyline>
                          </svg>
                        </div>
                      </div>

                      <div className="stack" style={{ gap: "0.4rem" }}>
                        <label style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.15em", color: "rgba(255, 255, 255, 0.7)" }}>MESSAGE *</label>
                        <textarea name="message" required className="form-textarea" placeholder="Tell us about your goals, timeline, and budget range."></textarea>
                      </div>

                      {status === "error" && (
                        <p className="t-sm" style={{ color: "#ef4444", marginTop: "0.5rem" }}>Something went wrong. Please try again or email us directly.</p>
                      )}

                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "clamp(1rem, 3vh, 2rem)" }}>
                        <button type="button" onClick={() => setShowForm(false)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer", padding: "0.5rem", transition: "color 0.2s ease", fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.1em" }} onMouseEnter={e => e.currentTarget.style.color = "#fff"} onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.4)"}>
                          ← CANCEL
                        </button>

                        <button type="submit" disabled={status === "submitting"} style={{
                          display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "0.6rem",
                          padding: "clamp(0.7rem, 1.4vh, 0.9rem) clamp(1.5rem, 3vw, 2.2rem)",
                          background: "#fff", color: "#000", border: "none", borderRadius: "4px",
                          fontFamily: "var(--font-inter)", fontSize: "0.75rem", fontWeight: 600,
                          letterSpacing: "0.1em", textTransform: "uppercase", cursor: status === "submitting" ? "wait" : "pointer",
                          opacity: status === "submitting" ? 0.7 : 1, transition: "all 0.3s ease",
                          boxShadow: "0 4px 14px rgba(255,255,255,0.15)"
                        }} onMouseEnter={e => { if (status !== "submitting") { e.currentTarget.style.background = "#e5e5e5"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(255,255,255,0.25)"; } }} onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.boxShadow = "0 4px 14px rgba(255,255,255,0.15)"; }}>
                          {status === "submitting" ? "SENDING..." : "SEND INQUIRY"}
                          {status !== "submitting" && (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                          )}
                        </button>
                      </div>
                    </form>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Footer */}
      <motion.p className="t-mono"
        initial={{ opacity: 0 }} animate={{ opacity: inView && !showForm ? 0.28 : 0 }}
        transition={{ duration: 0.6, delay: showForm ? 0 : 1.2 }}
        style={{ position: "absolute", bottom: "clamp(1.4rem, 2.8vh, 2.2rem)", zIndex: 2 }}>
        Origin One | AI-Native System Engineering Studio | Build what matters
      </motion.p>

      {/* Calendly Popup Modal */}
      {rootElement && (
        <PopupModal
          url="https://calendly.com/your-username-here" /* REPLACE THIS WITH YOUR CALENDLY URL */
          onModalClose={() => setIsCalendlyOpen(false)}
          open={isCalendlyOpen}
          rootElement={rootElement}
        />
      )}
    </section>
  );
}
