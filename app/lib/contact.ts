/* ─────────────────────────────────────────────────────────────
   "Start a Project" form delivery.

   1. Formspree emails the inquiry to us in the background.
   2. If that fails (offline, blocked, service down, rate-limited), the
      form falls back to the visitor's own email app: a mailto: link with
      the inquiry pre-addressed and pre-written, so they just press Send.
───────────────────────────────────────────────────────────── */
export const CONTACT_EMAIL = "hello@originonelabs.com";

/** Override per deployment with NEXT_PUBLIC_FORMSPREE_FORM_ID. */
const FORMSPREE_FORM_ID = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID || "xojoonad";

export interface Inquiry {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  projectType?: string;
  message: string;
}

export const SUBJECT = "New Project Inquiry — Origin One Labs";

export function inquiryText(q: Inquiry): string {
  const optional = (label: string, value?: string) => (value ? [`${label}: ${value}`] : []);
  return [
    SUBJECT,
    "",
    `Name: ${q.name}`,
    `Email: ${q.email}`,
    ...optional("Company", q.company),
    ...optional("Phone", q.phone),
    ...optional("Project type", q.projectType),
    "",
    "Message:",
    q.message,
  ].join("\n");
}

/** Opens the visitor's email app with the inquiry ready to send. */
export function mailtoUrl(q: Inquiry): string {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(SUBJECT)}&body=${encodeURIComponent(inquiryText(q))}`;
}

export async function submitToFormspree(q: Inquiry): Promise<boolean> {
  try {
    const res = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        _subject: SUBJECT,
        _replyto: q.email,
        name: q.name,
        email: q.email,
        company: q.company || undefined,
        phone: q.phone || undefined,
        project_type: q.projectType || undefined,
        message: q.message,
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/* "Schedule a Consultation" — Calendly booking page. Override per
   deployment with NEXT_PUBLIC_CALENDLY_URL; same default as the main site. */
export const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/hello-originonelabs/30min";
