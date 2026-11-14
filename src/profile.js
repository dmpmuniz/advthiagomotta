/**
 * Dados do profissional.
 *
 * Campos vazios são omitidos da página e do vCard. Preencha apenas com dados
 * reais: nenhum número, perfil ou endereço é inventado pelo projeto.
 */
export const profile = {
  name: "Thiago Motta",
  profession: "Advogado",
  registration: "OAB/SP 522.201",

  // Caminho de uma fotografia real. Sem foto, o cartão exibe o monograma da marca.
  // Ex.: "images/profile.jpg" (arquivo dentro de public/images/).
  photo: "",

  contacts: {
    // DDI + DDD + número, apenas dígitos. Ex.: "5511999999999".
    whatsapp: "",

    // URL completa ou @usuario. Ex.: "https://www.instagram.com/usuario".
    instagram: "",

    // URL completa ou @pagina. Ex.: "https://www.facebook.com/pagina".
    facebook: "",

    // Telefone com DDD, de preferência com DDI. Ex.: "+55 11 99999-9999".
    phone: "",

    // Site sem "https://" também é aceito. Ex.: "thiagomotta.adv.br".
    website: "",

    // Ex.: "contato@thiagomotta.adv.br".
    email: "",
  },

  // Mostra os espaços sem contato com o ícone apagado, só para visualizar o
  // layout 3×2. Desative quando os contatos reais estiverem preenchidos.
  showContactPlaceholders: true,

  // Opcionais, usados no vCard.
  organization: "",
  address: "",

  // URL pública final, sem barra no fim. Ex.: "https://thiagomotta.adv.br".
  // Necessária para gerar Open Graph com imagem absoluta após o deploy.
  siteUrl: "https://dmpmuniz.github.io/advthiagomotta",
};
