import test from "node:test";
import assert from "node:assert/strict";
import { buildContactLinks, normalizeWebsite } from "../src/links.js";

test("sem contatos configurados, não gera links", () => {
  assert.deepEqual(buildContactLinks({}), []);
  assert.deepEqual(buildContactLinks({ whatsapp: "  ", email: "invalido" }), []);
});

test("WhatsApp usa apenas dígitos e exige DDI/DDD", () => {
  assert.equal(
    buildContactLinks({ whatsapp: "+55 (11) 99999-9999" })[0].href,
    "https://wa.me/5511999999999",
  );
  assert.deepEqual(buildContactLinks({ whatsapp: "1234" }), []);
});

test("Instagram e Facebook aceitam @usuario, usuario e URL", () => {
  const instagram = (value) => buildContactLinks({ instagram: value })[0]?.href;
  assert.equal(instagram("@thiagomotta"), "https://www.instagram.com/thiagomotta/");
  assert.equal(instagram("thiagomotta"), "https://www.instagram.com/thiagomotta/");
  assert.equal(
    instagram("https://www.instagram.com/thiagomotta"),
    "https://www.instagram.com/thiagomotta",
  );
  assert.equal(instagram("instagram.com/thiagomotta"), "https://instagram.com/thiagomotta");

  const facebook = (value) => buildContactLinks({ facebook: value })[0]?.href;
  assert.equal(facebook("@thiagomotta"), "https://www.facebook.com/thiagomotta/");
  assert.equal(
    facebook("https://www.facebook.com/thiagomotta"),
    "https://www.facebook.com/thiagomotta",
  );
  assert.deepEqual(buildContactLinks({ instagram: "https://exemplo.com/perfil" }), []);
  assert.deepEqual(buildContactLinks({ instagram: "javascript:alert(1)" }), []);
});

test("telefone e e-mail usam tel: e mailto:", () => {
  assert.equal(
    buildContactLinks({ phone: "+55 (11) 99999-9999" })[0].href,
    "tel:+5511999999999",
  );
  assert.equal(
    buildContactLinks({ email: "contato@exemplo.com.br" })[0].href,
    "mailto:contato@exemplo.com.br",
  );
  assert.deepEqual(buildContactLinks({ email: "sem-arroba" }), []);
});

test("site é normalizado e só aceita http(s)", () => {
  assert.equal(normalizeWebsite("thiagomotta.adv.br"), "https://thiagomotta.adv.br/");
  assert.equal(normalizeWebsite("https://thiagomotta.adv.br"), "https://thiagomotta.adv.br/");
  assert.equal(normalizeWebsite("javascript:alert(1)"), "");
  assert.equal(normalizeWebsite("ftp://thiagomotta.adv.br"), "");
  assert.equal(normalizeWebsite(""), "");
});

test("mantém a ordem da grade e marca links externos", () => {
  const links = buildContactLinks({
    email: "contato@exemplo.com",
    phone: "11999999999",
    website: "exemplo.com.br",
    whatsapp: "5511999999999",
  });

  assert.deepEqual(
    links.map((link) => link.key),
    ["whatsapp", "phone", "website", "email"],
  );
  assert.deepEqual(
    links.filter((link) => link.external).map((link) => link.key),
    ["whatsapp", "website"],
  );
});
