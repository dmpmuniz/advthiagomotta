# Padrão gráfico: repetição modular do TM

- Arquivo: `padrao/modulo-tm-contorno.png` (contorno do TM, traço `#402B24`, fundo transparente).
- Aplicação no kit: **fundo `#160400`** com o contorno repetido em linhas e colunas alinhadas, espaçamento constante (amostra: 11 colunas × 3 linhas), contraste bem sutil.
- Usos: capas, pastas, embalagens, forros, materiais de apresentação. Na papelaria, concentrar a textura no verso ou em áreas livres de texto.
- Na landing: ótimo para fundo de hero/rodapé/seção de CTA. Manter opacidade baixa para não competir com o texto.
- **Regra:** ao inserir a assinatura sobre a trama, interromper a repetição na área de proteção (1x a altura do A).

```css
.pattern-bg {
  background-color: #160400;
  background-image: url("padrao/modulo-tm-contorno.png");
  background-size: 110px auto;   /* ajustar; módulo ~ 1,17:1 */
  background-repeat: space;      /* mantém espaçamento constante */
}
```
Para espaçamento maior entre módulos, usar `background-size` menor + `background-position` ou um SVG pattern com padding.
