"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { PopupModal } from "react-calendly";
import { CALENDLY_URL, CONTACT_EMAIL, inquiryText, mailtoUrl, submitToFormspree, type Inquiry } from "../lib/contact";

export default function ConnectSlide() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });
  const [showForm, setShowForm] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "received" | "fallback">("idle");
  const [fallback, setFallback] = useState<{ url: string; text: string } | null>(null);
  const [copied, setCopied] = useState(false);
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

  /* Formspree first (lib/contact.ts). If it fails, fall back to the
     visitor's own email app with the inquiry pre-written to us. */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const field = (name: string) => String(data.get(name) ?? "").trim();
    const inquiry: Inquiry = {
      name: field("name"),
      email: field("email"),
      company: field("company"),
      phone: field("phone"),
      projectType: field("project_type"),
      message: field("message"),
    };

    setStatus("sending");
    if (await submitToFormspree(inquiry)) {
      form.reset();
      setStatus("received");
      return;
    }

    const url = mailtoUrl(inquiry);
    setFallback({ url, text: inquiryText(inquiry) });
    setCopied(false);
    setStatus("fallback");
    window.location.assign(url);
  };

  const copyMessage = async () => {
    if (!fallback) return;
    try {
      await navigator.clipboard.writeText(fallback.text);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  const closeForm = () => {
    setShowForm(false);
    setStatus("idle");
    setFallback(null);
  };

  return (
    <section ref={ref} id="slide-connect" className="slide"
      style={{ alignItems: "center", justifyContent: "center", textAlign: "center" }}>

      {/* Background */}
      <div className="slide-bg"
        style={{ backgroundImage: "url('/light/Epic_minimalist_title_slide_background._202606181548.jpg')" }} />
      <div className="slide-overlay"
        style={{ background: "linear-gradient(180deg, rgba(246,245,240,0.76) 0%, rgba(246,245,240,0.95) 100%)" }} />

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
          <span style={{ fontFamily: "var(--font-inter)", fontWeight: 600, fontSize: "1.2rem", letterSpacing: "0.3em", color: "var(--ink)" }}>
            ORIGIN ONE LABS
          </span>
        </motion.div>

        <motion.h2 className="t-hero" style={{ color: "var(--ink)" }}
          initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.28, ease: [0.25, 0.46, 0.45, 0.94] as const }}>
          Let&apos;s Build<br />
          <span className="t-dim">What Matters</span>
        </motion.h2>

        <motion.span className="rule rule-stem"
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
              <span className="t-body" style={{ color: "var(--tx-1)", borderBottom: "1px solid var(--stem)", paddingBottom: "2px" }}>
                hello@originonelabs.com
              </span>
              <span className="t-mono" style={{ marginTop: "0.15rem" }}>www.originonelabs.com</span>
            </div>
            <div style={{ display: "flex", gap: "0.9rem", flexWrap: "wrap", justifyContent: "center", marginTop: "0.8rem" }}>
              <div className="btn btn-filled">
                Start a Project
              </div>
              <div className="btn btn-outline">
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
                        borderBottom: "1px solid var(--stem)", paddingBottom: "2px",
                        transition: "color 0.2s, border-color 0.2s"
                      }}
                      onMouseEnter={e => { e.currentTarget.style.color = "var(--stem)"; }}
                      onMouseLeave={e => { e.currentTarget.style.color = "var(--tx-1)"; }}>
                      hello@originonelabs.com
                    </a>
                    <span className="t-mono" style={{ marginTop: "0.15rem" }}>www.originonelabs.com</span>
                  </motion.div>

                  {/* CTA buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.96 }}
                    style={{ display: "flex", gap: "0.9rem", flexWrap: "wrap", justifyContent: "center", marginTop: "0.8rem" }}>

                    <button id="cta-start" className="btn btn-filled" onClick={() => setShowForm(true)}>
                      Start a Project
                    </button>

                    <button id="cta-consult" className="btn btn-outline" onClick={() => setIsCalendlyOpen(true)}>
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
                    background: "rgba(251, 250, 246, 0.82)",
                    border: "1px solid var(--border-strong)",
                    borderRadius: "16px",
                    padding: "clamp(1.5rem, 4vh, 2.5rem) clamp(1.5rem, 3vw, 2.5rem)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    boxShadow: "0 30px 60px -30px rgba(11,12,16,0.35), inset 0 1px 0 rgb(var(--stem-bright-rgb) / 0.6)",
                    zIndex: 10,
                    maxHeight: "clamp(400px, 80svh, 800px)",
                    overflowY: "auto"
                  }}
                >
                  {status === "received" || (status === "fallback" && fallback) ? (
                    <div className="stack" style={{ alignItems: "center", textAlign: "center", padding: "1.5rem 0" }}>
                      <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "var(--accent-dim)", border: "1px solid var(--accent-line)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.2rem" }}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--stem)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </div>
                      {status === "received" ? (
                        <>
                          <h3 className="t-h3" style={{ marginBottom: "0.5rem" }}>Inquiry received</h3>
                          <p className="t-body" style={{ maxWidth: "400px" }}>Thank you — we&apos;ll be in touch shortly to discuss your project.</p>
                          <button type="button" className="btn btn-outline" onClick={closeForm} style={{ marginTop: "1.75rem" }}>CLOSE</button>
                        </>
                      ) : fallback && (
                        <>
                          <h3 className="t-h3" style={{ marginBottom: "0.5rem" }}>One last step</h3>
                          <p className="t-body" style={{ maxWidth: "400px" }}>
                            We couldn&apos;t send your inquiry directly, so it&apos;s ready in your email app instead. Press <strong>Send</strong> there and it reaches us.
                          </p>
                          <p className="t-sm" style={{ marginTop: "0.6rem", maxWidth: "400px" }}>
                            Nothing opened? Use the buttons below, or email us at{" "}
                            <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "var(--stem)" }}>{CONTACT_EMAIL}</a>.
                          </p>
                          <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", justifyContent: "center", marginTop: "1.5rem" }}>
                            <a className="btn btn-filled" href={fallback.url} style={{ textDecoration: "none" }}>OPEN EMAIL APP</a>
                            <button type="button" className="btn btn-outline" onClick={copyMessage}>{copied ? "COPIED" : "COPY MESSAGE"}</button>
                            <button type="button" className="btn-ghost" onClick={closeForm} style={{ fontSize: "0.65rem", letterSpacing: "0.1em" }}>CLOSE</button>
                          </div>
                        </>
                      )}
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="stack" style={{ textAlign: "left", gap: "clamp(1rem, 2vh, 1.5rem)" }}>
                      <div className="form-row">
                        <div className="stack" style={{ gap: "0.4rem" }}>
                          <label style={{ fontFamily: "var(--f-mono)", fontSize: "0.65rem", letterSpacing: "0.15em", color: "var(--tx-2)" }}>NAME *</label>
                          <input type="text" name="name" required className="form-input" placeholder="Enter your name" />
                        </div>
                        <div className="stack" style={{ gap: "0.4rem" }}>
                          <label style={{ fontFamily: "var(--f-mono)", fontSize: "0.65rem", letterSpacing: "0.15em", color: "var(--tx-2)" }}>EMAIL *</label>
                          <input type="email" name="email" required className="form-input" placeholder="you@company.com" />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="stack" style={{ gap: "0.4rem" }}>
                          <label style={{ fontFamily: "var(--f-mono)", fontSize: "0.65rem", letterSpacing: "0.15em", color: "var(--tx-2)" }}>COMPANY</label>
                          <input type="text" name="company" className="form-input" placeholder="Your company name" />
                        </div>
                        <div className="stack" style={{ gap: "0.4rem" }}>
                          <label style={{ fontFamily: "var(--f-mono)", fontSize: "0.65rem", letterSpacing: "0.15em", color: "var(--tx-2)" }}>PHONE</label>
                          <input type="tel" name="phone" className="form-input" placeholder="+1 (555) 000-0000" />
                        </div>
                      </div>

                      <div className="stack" style={{ gap: "0.4rem" }}>
                        <label style={{ fontFamily: "var(--f-mono)", fontSize: "0.65rem", letterSpacing: "0.15em", color: "var(--tx-2)" }}>PROJECT TYPE</label>
                        <div style={{ position: "relative" }}>
                          <select name="project_type" defaultValue="" className="form-input" style={{ appearance: "none", cursor: "pointer", width: "100%" }}>
                            <option value="" disabled hidden>Select an option</option>
                            <option value="AI / ML">AI / ML</option>
                            <option value="Web & Mobile">Web & Mobile</option>
                            <option value="Fintech / Enterprise">Fintech / Enterprise</option>
                            <option value="Blockchain / Web3">Blockchain / Web3</option>
                            <option value="Other">Other</option>
                          </select>
                          <svg style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(11,12,16,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="6 9 12 15 18 9"></polyline>
                          </svg>
                        </div>
                      </div>

                      <div className="stack" style={{ gap: "0.4rem" }}>
                        <label style={{ fontFamily: "var(--f-mono)", fontSize: "0.65rem", letterSpacing: "0.15em", color: "var(--tx-2)" }}>MESSAGE *</label>
                        <textarea name="message" required className="form-textarea" placeholder="Tell us about your goals, timeline, and budget range."></textarea>
                      </div>

                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem", marginTop: "clamp(0.75rem, 2.5vh, 1.75rem)" }}>
                        <button type="button" className="btn-ghost" onClick={() => setShowForm(false)} style={{ cursor: "pointer", fontSize: "0.65rem", letterSpacing: "0.1em", transition: "color 0.2s ease" }}>
                          ← CANCEL
                        </button>

                        <button type="submit" className="btn btn-filled" disabled={status === "sending"}>
                          {status === "sending" ? "SENDING..." : "SEND INQUIRY"}
                          {status !== "sending" && (
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
        initial={{ opacity: 0 }} animate={{ opacity: inView && !showForm ? 0.9 : 0 }}
        transition={{ duration: 0.6, delay: showForm ? 0 : 1.2 }}
        style={{ position: "absolute", bottom: "clamp(1.4rem, 2.8vh, 2.2rem)", zIndex: 2 }}>
        Origin One | AI-Native System Engineering Studio | Build what matters
      </motion.p>

      {/* Calendly Popup Modal */}
      {rootElement && (
        <PopupModal
          url={CALENDLY_URL}
          onModalClose={() => setIsCalendlyOpen(false)}
          open={isCalendlyOpen}
          rootElement={rootElement}
        />
      )}
    </section>
  );
}
