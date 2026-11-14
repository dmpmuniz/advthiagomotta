import { normalizeWebsite } from "./links.js";

const NEWLINE = "\r\n";

const escape = (value) =>
  String(value ?? "")
    .replace(/\\/g, "\\\\")
    .replace(/\r?\n/g, "\\n")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,");

function splitName(name) {
  const parts = String(name ?? "").trim().split(/\s+/).filter(Boolean);
  if (parts.length < 2) return { given: parts.join(" "), family: "" };
  return { given: parts.slice(0, -1).join(" "), family: parts.at(-1) };
}

// vCard 3.0 dobra linhas em 75 octetos; a continuação começa com um espaço.
function fold(line) {
  const encoder = new TextEncoder();
  if (encoder.encode(line).length <= 75) return line;

  const characters = Array.from(line);
  const units = [];
  for (let index = 0; index < characters.length; index += 1) {
    if (characters[index] === "\\" && index + 1 < characters.length) {
      units.push(characters[index] + characters[index + 1]);
      index += 1;
    } else {
      units.push(characters[index]);
    }
  }

  const folded = [];
  let current = "";
  let bytes = 0;
  for (const unit of units) {
    const size = encoder.encode(unit).length;
    if (bytes + size > 75) {
      folded.push(current);
      current = ` ${unit}`;
      bytes = 1 + size;
    } else {
      current += unit;
      bytes += size;
    }
  }
  folded.push(current);
  return folded.join(NEWLINE);
}

/**
 * Gera um vCard 3.0 com apenas os campos preenchidos.
 */
export function buildVCard(profile) {
  const name = String(profile.name ?? "").trim();
  const { given, family } = splitName(name);
  const contacts = profile.contacts ?? {};
  const lines = ["BEGIN:VCARD", "VERSION:3.0"];

  lines.push(`N:${escape(family)};${escape(given)};;;`);
  lines.push(`FN:${escape(name)}`);
  if (profile.profession) lines.push(`TITLE:${escape(profile.profession)}`);
  if (profile.organization) lines.push(`ORG:${escape(profile.organization)}`);
  if (profile.registration) lines.push(`NOTE:${escape(profile.registration)}`);

  const phone = String(contacts.phone ?? "")
    .replace(/[^\d+]/g, "")
    .replace(/(?!^)\+/g, "");
  if (phone.replace(/\D/g, "").length >= 8) lines.push(`TEL;TYPE=CELL:${phone}`);

  const email = String(contacts.email ?? "").trim();
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) lines.push(`EMAIL;TYPE=INTERNET:${escape(email)}`);

  const website = normalizeWebsite(contacts.website);
  if (website) lines.push(`URL:${escape(website)}`);
  if (profile.address) lines.push(`ADR;TYPE=WORK:;;${escape(profile.address)};;;;`);

  lines.push("END:VCARD");
  return lines.map(fold).join(NEWLINE) + NEWLINE;
}

export function vcardFileName(name) {
  const slug = String(name ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `${slug || "contato"}.vcf`;
}
