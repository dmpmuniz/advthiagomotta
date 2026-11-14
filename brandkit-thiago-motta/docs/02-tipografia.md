# Tipografia

## Nome da marca e "ADVOGADO"
**Não digitar com fonte.** O nome é desenho exclusivo (maiúsculas serifadas de traço leve, os dois "A" sem barra, tipo Λ). "ADVOGADO" é sem serifa, regular, arredondado, espaçamento amplo. Sempre usar a arte pronta:
- `logos/nome-thiago-motta-marrom.png`
- `logos/advogado-dourado.png`
- ou a assinatura completa.

## Fontes de apoio (para o site)

| Função | Fonte | Observação |
|---|---|---|
| Títulos editoriais (H1, H2, seções) | **Times New Roman Regular** (sugestão do kit: "serifada para títulos") | Alternativa web próxima se quiser mais refinamento: Cormorant Garamond / Playfair Display, mas o kit pede Times como sugestão. Manter Regular, sem negrito. |
| Textos e legendas | **Montserrat Regular** | Google Fonts |
| Subtítulos e chamadas | **Montserrat Medium (500)** | Google Fonts |
| Rótulos pequenos | Montserrat, maiúsculas, tracking amplo | Estilo visto no próprio kit (ex.: "PALETA DA MARCA") |

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500&display=swap" rel="stylesheet">
```

```css
:root {
  --font-title: "Times New Roman", Times, serif;
  --font-body: "Montserrat", system-ui, sans-serif;
}
h1, h2, h3 { font-family: var(--font-title); font-weight: 400; color: var(--brand-brown); }
body { font-family: var(--font-body); font-weight: 400; color: var(--brand-brown); background: var(--brand-ivory); }
.subtitle, .callout { font-weight: 500; }
```

Sobre marfim, textos corridos em marrom `#160400`.
