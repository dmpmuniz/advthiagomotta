import { profile } from "./profile.js";
import { buildContactLinks, contactSlots } from "./links.js";
import { buildVCard, vcardFileName } from "./vcard.js";

const $ = (id) => document.getElementById(id);

function renderIdentity() {
  $("name-img").alt = profile.name ?? "";
  $("profession-img").alt = profile.profession ?? "";

  const profession = $("profession");
  const registration = $("registration");
  registration.textContent = profile.registration ?? "";

  if (!profile.profession) profession.remove();
  if (!profile.registration) registration.remove();
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
  const links = new Map(buildContactLinks(profile.contacts).map((item) => [item.key, item]));
  const list = $("contacts");
  const showPlaceholders = profile.showContactPlaceholders !== false;

  if (!links.size && !showPlaceholders) {
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

  for (const slot of contactSlots) {
    const contact = links.get(slot.key);
    const item = document.createElement("li");
    const content = document.createElement(contact ? "a" : "span");
    content.className = contact ? "contact" : "contact contact--placeholder";

    if (!contact) {
      // Espaço vazio: só prévia visual do layout, não é um contato.
      item.setAttribute("aria-hidden", "true");
    }

    if (contact) {
      content.href = contact.href;

      if (contact.external) {
        content.target = "_blank";
        content.rel = "noopener noreferrer";
      }
    }

    const circle = document.createElement("span");
    circle.className = "contact__circle";
    circle.append(icon(slot.icon));

    const label = document.createElement("span");
    label.className = "contact__label";
    label.textContent = slot.label;

    if (contact?.external) {
      const hint = document.createElement("span");
      hint.className = "sr-only";
      hint.textContent = " (abre em nova aba)";
      label.append(hint);
    }

    content.append(circle, label);
    item.append(content);
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

renderIdentity();
renderPhoto();
renderContacts();

$("save-contact").addEventListener("click", downloadContact);
