import { profile } from "./profile.js";
import { buildContactLinks } from "./links.js";
import { buildVCard, vcardFileName } from "./vcard.js";

const $ = (id) => document.getElementById(id);

function getInitials() {
  const configured = String(profile.initials ?? "").replace(/\s+/g, "");
  if (configured) return configured.toUpperCase();
  return String(profile.name ?? "")
    .trim()
    .split(/\s+/)
    .map((word) => word[0] ?? "")
    .join("")
    .slice(0, 3)
    .toUpperCase();
}

function renderMonogram(initials) {
  const monogram = $("monogram");
  monogram.textContent = "";

  for (const letter of Array.from(initials)) {
    const span = document.createElement("span");
    span.className = "monogram__letter";
    span.textContent = letter;
    monogram.append(span);
  }
}

function renderIdentity(initials) {
  const name = $("name");
  const profession = $("profession");
  const registration = $("registration");

  name.textContent = profile.name ?? "";
  profession.textContent = profile.profession ?? "";
  registration.textContent = profile.registration ?? "";

  if (!profile.profession) profession.remove();
  if (!profile.registration) registration.remove();

  $("portrait-fallback").textContent = initials;
}

function renderPhoto() {
  if (!profile.photo) return;

  const image = $("portrait-img");
  image.alt = `Fotografia de ${profile.name ?? ""}`;
  image.addEventListener("error", () => image.remove(), { once: true });
  image.src = profile.photo;
  image.hidden = false;
}

function renderContacts() {
  const contacts = buildContactLinks(profile.contacts);
  const list = $("contacts");

  if (!contacts.length) {
    $("contact-section").remove();
    return;
  }

  const svgNS = "http://www.w3.org/2000/svg";

  function icon(name) {
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("class", "contact__icon");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");

    const use = document.createElementNS(svgNS, "use");
    use.setAttribute("href", `#i-${name}`);
    svg.append(use);
    return svg;
  }

  for (const contact of contacts) {
    const item = document.createElement("li");
    const link = document.createElement("a");
    link.className = "contact";
    link.href = contact.href;

    if (contact.external) {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }

    const circle = document.createElement("span");
    circle.className = "contact__circle";
    circle.append(icon(contact.icon));

    const label = document.createElement("span");
    label.className = "contact__label";
    label.textContent = contact.label;

    if (contact.external) {
      const hint = document.createElement("span");
      hint.className = "sr-only";
      hint.textContent = " (abre em nova aba)";
      label.append(hint);
    }

    link.append(circle, label);
    item.append(link);
    list.append(item);
  }
}

function downloadContact() {
  const vcard = buildVCard(profile);
  const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = vcardFileName(profile.name);
  document.body.append(link);
  link.click();
  link.remove();

  window.setTimeout(() => URL.revokeObjectURL(url), 4000);
  $("download-status").textContent = "Contato pronto para salvar.";
}

const initials = getInitials();
renderMonogram(initials);
renderIdentity(initials);
renderPhoto();
renderContacts();

$("save-contact").addEventListener("click", downloadContact);
