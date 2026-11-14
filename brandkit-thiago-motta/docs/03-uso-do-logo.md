# Uso do logo, proporções e margens

## Arquivos (pasta `logos/`)

| Arquivo | Quando usar |
|---|---|
| `assinatura-horizontal-fundo-claro.png` | Header/rodapé sobre marfim ou branco (versão principal) |
| `assinatura-horizontal-fundo-escuro.png` | Header/hero/rodapé sobre marrom `#160400` |
| `assinatura-1-cor-marrom.png` | Impressão a uma tinta, fundo claro |
| `assinatura-1-cor-marfim.png` | Reserva clara sobre fundo escuro/foto uniforme |
| `monograma-fundo-claro.png` | Avatar, favicon, selo, fundo claro |
| `monograma-fundo-escuro.png` | Avatar, favicon, fundo escuro |
| `nome-thiago-motta-marrom.png`, `advogado-dourado.png` | Elementos soltos do lettering (uso excepcional) |

Todos são PNG com transparência. **Limitação:** o PDF só contém versões raster (1688×311 px a assinatura; ~365×311 px o monograma). Não há SVG no PDF. O kit cita um "arquivo-mestre" SVG (monograma 362,152 × 309,524 unidades): **pedir ao cliente/designer os vetores** (SVG/AI/PDF) antes da entrega final, principalmente para retina, favicon e impressão.

## Proporção do monograma
- Largura = **1,17 × altura** (117 de largura para cada 100 de altura).
- Redimensionar T e M **juntos**, como um único objeto. Nunca esticar.

## Margem de proteção (área livre)
- Na assinatura: `x` = altura da letra **A** de "ADVOGADO". Reservar **no mínimo 1x nos quatro lados**.
- Monograma isolado: `x = 0,15 × H`.
- Ao colocar a assinatura sobre o padrão TM, **interromper a repetição** em toda a área de proteção.

## Tamanho mínimo (sem contar a margem)

| Versão | Impressão | Tela |
|---|---|---|
| Assinatura horizontal | 50 mm | **280 px** de largura |
| Monograma isolado | 10 mm | **40 px** de largura |

Abaixo de 280 px no mobile, usar só o monograma e conferir que "ADVOGADO" continua legível.

## Divisória
O filete dourado acompanha a **altura total** do monograma. Usar sempre a assinatura completa do arquivo, nunca remontar (preserva o espaçamento).

## Fundos
- Fundos lisos: seguir as regras de cor.
- Sobre fotos/texturas: escolher área uniforme, conferir legibilidade de hastes finas, divisória e "ADVOGADO". Se houver variação de luz, aplicar **base lisa** que inclua a margem de proteção.

## Avatares/perfis e favicon
- Apenas o monograma, sobre fundo liso, sem contorno, centralizado no quadrado.
- Preservar as pontas do T no recorte circular.
- Versões: clara (marfim) e escura (marrom `#160400`).

## Não fazer
Contornos, sombras, degradês, inclinação, distorção, trocar cores, recolocar letras, digitar o nome com fonte.
