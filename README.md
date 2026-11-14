# Cartão Digital Profissional

Página pública de cartão de visita digital, mobile-first, para ser usada como
destino de um QR Code impresso. HTML, CSS e JavaScript puros, sem framework,
com build de produção pelo Vite.

## Executar

```bash
npm install
npm run dev      # servidor local
npm test         # testes de links e vCard
npm run build    # gera dist/
npm run preview  # confere o build
```

## Configurar o profissional

Todos os dados ficam em [`src/profile.js`](src/profile.js). Campos vazios são
omitidos da página e do vCard; nenhum contato fictício é gerado.

- **Foto:** coloque uma fotografia real em `public/images/` e informe o caminho,
  por exemplo `photo: "images/profile.jpg"`. Sem foto, o cartão usa as iniciais
  em um placeholder elegante.
- **Contatos:** WhatsApp em formato DDI + DDD + número; Instagram e Facebook
  aceitam `@usuario` ou URL; telefone aceita formatação; site aceita domínio sem
  `https://`; e-mail precisa ser válido. Contatos inválidos ou vazios não
  aparecem.
- **Organização e endereço:** opcionais, entram apenas no vCard.
- **`siteUrl`:** preencha com a URL pública final, sem barra no fim, depois do
  deploy. Isso gera `og:url`, `canonical` e a imagem Open Graph absoluta.

O nome, a profissão, o registro, o monograma, a foto e os contatos são os únicos
dados exibidos. Nada é inventado pela implementação.

## Links e vCard

Cada contato configurado vira um link independente:

| Contato   | Destino                         |
| --------- | ------------------------------- |
| WhatsApp  | `https://wa.me/NUMERO`          |
| Instagram | perfil configurado              |
| Facebook  | página configurada              |
| Telefone  | `tel:`                          |
| Site      | URL normalizada                 |
| E-mail    | `mailto:`                       |

Links externos abrem em nova aba com `rel="noopener noreferrer"`. Telefone e
e-mail usam o aplicativo do próprio dispositivo.

O botão **Adicionar aos meus contatos** gera, no navegador, um vCard 3.0 válido
com nome, profissão, organização, registro, telefone, e-mail, site e endereço
disponíveis. O arquivo é baixado como `nome-do-profissional.vcf`.

## URL pública e QR Code

O projeto não presume domínio, hospedagem ou DNS. O conteúdo de `dist/` é
estático e pode ser publicado em qualquer host de arquivos (Netlify, Vercel,
Cloudflare Pages, GitHub Pages ou servidor próprio).

1. Publique `dist/` em uma URL estável, sem login e sem instalação de app.
2. Preencha `siteUrl` em `src/profile.js` com essa URL e rode o build novamente.
3. Gere o QR Code físico apontando para a URL publicada.

A página não implementa leitor de QR Code: o QR impresso leva direto ao cartão.
O build usa caminhos relativos (`base: "./"`), então funciona tanto na raiz
quanto em subdiretórios.

## Publicar no GitHub Pages

O workflow [`.github/workflows/pages.yml`](.github/workflows/pages.yml) roda os
testes, gera o build e publica `dist/` a cada push na branch `main`.

1. Crie o repositório no GitHub e envie o projeto (`git init`, `git add .`,
   `git commit`, `git remote add origin ...`, `git push -u origin main`).
2. No repositório, abra **Settings → Pages** e escolha **Source: GitHub Actions**.
3. Aguarde o workflow. A URL será `https://USUARIO.github.io/REPO/` (ou
   `https://USUARIO.github.io` se o repositório se chamar `USUARIO.github.io`).
4. Preencha `siteUrl` em `src/profile.js` com essa URL **sem barra no fim** e
   faça commit. O workflow republica e passa a gerar `canonical`, `og:url` e
   `og:image` absolutos.
5. Gere o QR Code apontando para a URL publicada.

Se o repositório usar outra branch principal, ajuste `branches` no workflow.
Domínio próprio é configurável em **Settings → Pages → Custom domain**; nesse
caso use o domínio em `siteUrl`.

## SEO, acessibilidade e desempenho

- HTML semântico, `lang="pt-BR"`, título e descrição personalizados.
- Open Graph e Twitter Card. A imagem `public/og-image.png` é estática: se o
  nome, a profissão ou o registro mudarem, gere uma nova imagem 1200 × 630.
- Favicon em `public/favicon.svg` e ícone de toque em `public/apple-touch-icon.png`.
- Fontes self-hosted (Cormorant Garamond e Jost), com preload e fallback. As
  licenças SIL OFL estão em `public/fonts/`.
- Foco visível, alvos de toque confortáveis, ícones decorativos com
  `aria-hidden`, links externos identificados para leitores de tela e respeito a
  `prefers-reduced-motion`.
- Layout sem rolagem horizontal a partir de 320 px; a fotografia reserva espaço
  antes do carregamento para evitar layout shift.
