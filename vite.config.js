import { defineConfig } from "vite";
import { profile } from "./src/profile.js";

const escapeHtml = (value) =>
  String(value ?? "").replace(
    /[&<>"']/g,
    (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char],
  );

export default defineConfig({
  // Caminhos relativos funcionam na raiz do domínio e em subdiretórios
  // (GitHub Pages de projeto: usuario.github.io/repo/).
  base: "./",
  plugins: [
    {
      name: "profile-html",
      transformIndexHtml(html) {
        const siteUrl = String(profile.siteUrl ?? "").replace(/\/+$/, "");
        const ogTitle = `${profile.name} — ${profile.profession}`;
        const description = `${profile.name}, ${profile.profession}${
          profile.registration ? ` — ${profile.registration}` : ""
        }. Contatos e cartão de visita digital.`;

        const tokens = {
          name: profile.name,
          profession: profile.profession,
          registration: profile.registration,
          photo: profile.photo,
          description,
          ogTitle,
          ogImage: siteUrl ? `${siteUrl}/og-image.png` : "/og-image.png",
          siteUrl,
        };

        return html
          .replace(/\{\{#(\w+)\}\}([\s\S]*?)\{\{\/\1\}\}/g, (_, key, block) =>
            tokens[key] ? block : "",
          )
          .replace(/\{\{(\w+)\}\}/g, (match, key) =>
            key in tokens ? escapeHtml(tokens[key]) : match,
          );
      },
    },
  ],
});
