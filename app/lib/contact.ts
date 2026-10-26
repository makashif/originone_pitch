/* ─────────────────────────────────────────────────────────────
   Contact channels for the "Start a Project" form.

   No third-party service, account, SMTP login or API key: the form
   builds the inquiry and opens it, pre-addressed and pre-written, in
   the visitor's own app — Mail, Messages or WhatsApp. They press Send,
   and it arrives from their own address/number, so we can reply
   straight back.

   Fill in the numbers below in international format (country code
   first, e.g. "+971501234567"). A channel with no number is hidden.
───────────────────────────────────────────────────────────── */
export const CONTACT = {
  email: "hello@originonelabs.com",
  /** Receives the inquiry as a text message (SMS). */
  smsNumber: "",
  /** Receives the inquiry on WhatsApp. */
  whatsappNumber: "",
};

export type Channel = "whatsapp" | "email" | "sms";

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

const digits = (n: string) => n.replace(/[^\d]/g, "");

export function isChannelAvailable(channel: Channel): boolean {
  if (channel === "email") return !!CONTACT.email;
  if (channel === "sms") return !!digits(CONTACT.smsNumber);
  return !!digits(CONTACT.whatsappNumber);
}

/** URL that opens the visitor's app with the inquiry ready to send. */
export function channelUrl(channel: Channel, q: Inquiry): string {
  const text = inquiryText(q);
  switch (channel) {
    case "whatsapp":
      return `https://wa.me/${digits(CONTACT.whatsappNumber)}?text=${encodeURIComponent(text)}`;
    case "email":
      return `mailto:${CONTACT.email}?subject=${encodeURIComponent(SUBJECT)}&body=${encodeURIComponent(text)}`;
    case "sms":
      // "?&body=" is understood by both iOS ("&body") and Android ("?body").
      return `sms:+${digits(CONTACT.smsNumber)}?&body=${encodeURIComponent(text)}`;
  }
}
