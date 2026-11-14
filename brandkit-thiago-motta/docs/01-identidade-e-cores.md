# Thiago Motta | Advogado — Identidade Visual

Fonte: Brandkit_Thiago_Motta.pdf (8 páginas). Idioma do site: pt-BR.

## Conceito
Marca de advocacia com ar editorial e institucional: monograma **TM** (T grande em marrom/marfim, M dourado dentro das hastes do T), divisória vertical dourada e o nome em maiúsculas serifadas espaçadas. Tom: sóbrio, elegante, couro marrom + dourado fosco + marfim.

## Paleta oficial

| Token CSS            | Nome          | HEX       | RGB           | Uso |
|----------------------|---------------|-----------|---------------|-----|
| `--brand-brown`      | Marrom escuro | `#160400` | 22 · 4 · 0    | Fundo escuro, texto corrido sobre marfim, T do logo no fundo claro |
| `--brand-gold`       | Dourado fosco | `#CFA35A` | 207 · 163 · 90| M, divisória, "ADVOGADO", detalhes, linhas finas, destaques |
| `--brand-ivory`      | Marfim        | `#FDF8F0` | 253 · 248 · 240| Fundo claro, T e nome no fundo escuro |
| `--brand-pattern`    | Marrom trama  | `#402B24` | —             | Somente o traço do padrão TM sobre `#160400` |

```css
:root {
  --brand-brown: #160400;
  --brand-gold: #CFA35A;
  --brand-ivory: #FDF8F0;
  --brand-pattern: #402B24;
}
```

## Regras de cor
- **Fundo marfim ou branco:** assinatura marrom + dourada (`assinatura-horizontal-fundo-claro.png`).
- **Fundo marrom profundo:** T e nome em marfim; M, divisória e "ADVOGADO" em dourado (`assinatura-horizontal-fundo-escuro.png`).
- **Uma cor (impressão/gravação):** todos os elementos em marrom, preto ou na cor única prevista; ou todos em marfim sobre escuro. Mantém os espaços internos entre T e M.
- O dourado identifica o M, a divisória e detalhes de papelaria. **Não usar dourado em textos longos** (contraste baixo); textos longos em marrom sobre marfim ou marfim sobre marrom.
- Proibido: contornos, sombras, degradês, inclinações, distorção, trocar cores ou posição relativa das letras.
