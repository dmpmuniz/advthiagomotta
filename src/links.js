const clean = (value) => (typeof value === "string" ? value.trim() : "");

function httpUrl(value) {
  try {
    const url = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`);
    return url.protocol === "https:" || url.protocol === "http:" ? url.href : "";
  } catch {
    return "";
  }
}

export function normalizeWebsite(value) {
  const raw = clean(value);
  if (!raw) return "";
  const url = httpUrl(raw);
  return url && new URL(url).hostname.includes(".") ? url : "";
}

function socialUrl(value, host) {
  const raw = clean(value);
  if (!raw) return "";

  const looksLikeUrl =
    /^https?:\/\//i.test(raw) ||
    raw.includes("/") ||
    new RegExp(`^(?:www\\.)?${host.replace(/\./g, "\\.")}$`, "i").test(raw);

  if (looksLikeUrl) {
    const url = httpUrl(raw);
    if (!url) return "";
    const hostname = new URL(url).hostname.replace(/^www\./, "").toLowerCase();
    return hostname === host || hostname.endsWith(`.${host}`) ? url : "";
  }

  const handle = raw.replace(/^@/, "");
  return /^[a-z0-9._-]+$/i.test(handle) ? `https://www.${host}/${handle}/` : "";
}

const builders = {
  whatsapp(value) {
    const digits = clean(value).replace(/\D/g, "");
    return digits.length >= 10 && digits.length <= 15 ? `https://wa.me/${digits}` : "";
  },
  instagram(value) {
    return socialUrl(value, "instagram.com");
  },
  facebook(value) {
    return socialUrl(value, "facebook.com");
  },
  phone(value) {
    const raw = clean(value);
    const phone = raw.replace(/[^\d+]/g, "").replace(/(?!^)\+/g, "");
    return phone.replace(/\D/g, "").length >= 8 ? `tel:${phone}` : "";
  },
  website(value) {
    return normalizeWebsite(value);
  },
  email(value) {
    const email = clean(value);
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? `mailto:${encodeURI(email)}` : "";
  },
};

const labels = [
  ["whatsapp", "WhatsApp", "whatsapp"],
  ["instagram", "Instagram", "instagram"],
  ["facebook", "Facebook", "facebook"],
  ["phone", "Telefone", "phone"],
  ["website", "Site", "globe"],
  ["email", "E-mail", "mail"],
];

const external = new Set(["whatsapp", "instagram", "facebook", "website"]);

/**
 * Retorna apenas os contatos configurados e com destino válido, na ordem da grade.
 */
export function buildContactLinks(contacts = {}) {
  return labels.flatMap(([key, label, icon]) => {
    const href = builders[key](contacts[key]);
    return href ? [{ key, label, icon, href, external: external.has(key) }] : [];
  });
}
