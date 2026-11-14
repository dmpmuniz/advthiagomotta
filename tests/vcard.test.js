import test from "node:test";
import assert from "node:assert/strict";
import { buildVCard, vcardFileName } from "../src/vcard.js";

const profile = {
  name: "Thiago Motta",
  profession: "Advogado",
  registration: "OAB/SP 522.201",
  organization: "Motta Advocacia",
  address: "Rua A, 10; Centro",
  contacts: {
    phone: "+55 11 99999-9999",
    email: "contato@exemplo.com",
    website: "thiagomotta.adv.br",
  },
};

test("gera vCard 3.0 com os campos disponíveis", () => {
  const card = buildVCard(profile);

  assert.ok(card.startsWith("BEGIN:VCARD\r\nVERSION:3.0\r\n"));
  assert.ok(card.endsWith("END:VCARD\r\n"));
  assert.match(card, /N:Motta;Thiago;;;\r\n/);
  assert.match(card, /FN:Thiago Motta\r\n/);
  assert.match(card, /TITLE:Advogado\r\n/);
  assert.match(card, /ORG:Motta Advocacia\r\n/);
  assert.match(card, /NOTE:OAB\/SP 522\.201\r\n/);
  assert.match(card, /TEL;TYPE=CELL:\+5511999999999\r\n/);
  assert.match(card, /EMAIL;TYPE=INTERNET:contato@exemplo\.com\r\n/);
  assert.match(card, /URL:https:\/\/thiagomotta\.adv\.br\/\r\n/);
  assert.match(card, /ADR;TYPE=WORK:;;Rua A\\, 10\\; Centro;;;;\r\n/);
});

test("omite campos vazios e escapa caracteres reservados", () => {
  const card = buildVCard({
    name: "Ana Silva",
    contacts: { email: "invalido" },
  });

  assert.match(card, /N:Silva;Ana;;;\r\n/);
  assert.doesNotMatch(card, /TITLE:|ORG:|NOTE:|TEL|EMAIL|URL:|ADR/);
  assert.equal(buildVCard({ name: "A\\B", contacts: {} }).includes("A\\\\B"), true);
});

test("nome do arquivo é seguro e legível", () => {
  assert.equal(vcardFileName("Thiago Motta"), "thiago-motta.vcf");
  assert.equal(vcardFileName("João D'Ávila"), "joao-d-avila.vcf");
  assert.equal(vcardFileName(""), "contato.vcf");
});

test("dobra linhas longas em 75 octetos", () => {
  const address = `Rua ${"A".repeat(90)}, 100`;
  const card = buildVCard({ name: "Ana Silva", address, contacts: {} });
  const lines = card.split("\r\n").filter(Boolean);

  assert.ok(lines.every((line) => new TextEncoder().encode(line).length <= 75));
  assert.ok(lines.some((line) => line.startsWith(" ")));
  assert.ok(card.replace(/\r\n /g, "").includes(address.replace(/,/g, "\\,")));
});
