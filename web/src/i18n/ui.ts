// Todos os textos da interface, em português e inglês.
// Para adicionar um texto: crie a chave em `pt` e repita em `en` (o TypeScript avisa se faltar).
//
// Trabalhos para clientes são descritos sem nomes (confidencialidade); usar descrições.

import type { Lang } from '../config';

const pt = {
  'meta.title': 'Daniel Soares — Desenvolvedor full stack',
  'meta.description':
    'Sites, sistemas e apps que funcionam de verdade, da interface ao banco de dados. Desenvolvedor full stack com 5 anos em sistemas para o mercado financeiro.',

  'meta.contactTitle': 'Contato — Daniel Soares',
  'meta.contactDescription': 'Fale com Daniel Soares por formulário, e-mail, LinkedIn ou GitHub.',

  'nav.work': './trabalhos',
  'nav.services': './serviços',
  'nav.about': './sobre',
  'nav.contact': './contato',
  'nav.cta': 'vamos conversar',
  'nav.skip': 'Pular para o conteúdo',
  'nav.lang': 'Idioma',
  'nav.aria': 'Principal',

  'hero.cmd': '$ whoami',
  'hero.title': 'Sites, sistemas e apps que funcionam de verdade.',
  'hero.titleItalic': 'Da interface ao banco de dados.',
  'hero.summary':
    'Sou o Daniel, desenvolvedor full stack com 5 anos construindo sistemas para o mercado financeiro. Aberto a conversar sobre novos projetos.',
  'hero.ctaWork': 'Ver trabalhos',
  'hero.ctaProject': 'Iniciar um projeto',

  'video.label': 'Vídeo de apresentação de Daniel Soares',
  'video.unmute': 'Ativar som',
  'video.mute': 'Silenciar',
  'video.pause': 'Pausar',
  'video.play': 'Reproduzir',
  'video.captionsOn': 'Legendas: ligadas',
  'video.captionsOff': 'Legendas: desligadas',

  // Janela de terminal do hero (aparece enquanto o vídeo não existe)
  'terminal.label': 'Terminal com um resumo de Daniel Soares',
  'terminal.whoami': 'daniel-soares · desenvolvedor full stack',
  'terminal.runCmd': 'dotnet run --project importacao',
  'terminal.runOut': 'consultas ao banco: dezenas de milhares → poucas',
  'terminal.runOk': '−47 min por execução',

  'trust.lead': 'já entreguei sistemas para',
  'trust.aria': 'Clientes atendidos',
  'trust.1': 'um dos maiores bancos do Brasil',
  'trust.2': 'um banco de investimentos suíço',
  'trust.3': 'uma multinacional de tecnologia financeira',

  'work.cmd': '$ ls trabalhos/',
  'work.title': 'Trabalhos',
  'work.titleItalic': 'selecionados.',
  'work.featured': 'em destaque',
  'work.problem': 'Problema',
  'work.solution': 'Solução',
  'work.result': 'Resultado',
  'work.tags': 'Tecnologias',
  'work.clients': '$ ls clientes/',

  'projects.cmd': '$ ls ~/github/',
  'projects.building': 'em construção',
  'projects.published': 'publicado',
  'projects.live': 'Ver ao vivo',
  'projects.liveSoon': 'Deploy em breve',
  'projects.repo': 'Repositório',
  'projects.profile': 'Ver perfil no GitHub',

  'services.cmd': '$ ls servicos/',
  'services.title': 'O que posso',
  'services.titleItalic': 'construir para você.',
  'services.1.title': 'Sites e landing pages',
  'services.1.text': 'Sites institucionais e páginas de produto rápidos, responsivos e fáceis de atualizar.',
  'services.2.title': 'Sistemas web e apps sob medida',
  'services.2.text': 'Telas, regras de negócio e banco de dados pensados para o processo da sua equipe.',
  'services.3.title': 'APIs, integrações e automações',
  'services.3.text': 'Sistemas conversando entre si e menos planilhas e tarefas manuais no dia a dia.',
  'services.4.title': 'Performance e modernização',
  'services.4.text': 'Investigo o que está lento ou instável e modernizo sistemas legados sem parar a operação.',

  'about.cmd': '$ cat sobre.md',
  'about.title': 'Gosto de sistemas que funcionam —',
  'about.titleItalic': 'e de descobrir por que não funcionam.',
  'about.p1':
    'Passei os últimos 5 anos dentro de sistemas financeiros, onde um erro custa caro e lentidão não é aceitável. Isso me ensinou a investigar com calma, medir antes de otimizar e deixar o código melhor do que encontrei.',
  // Linha pessoal (o que faz fora do código). Vazio = não aparece no site.
  'about.personal': '',
  'about.photoAlt': 'Foto de Daniel Soares',
  'about.cv': 'Baixar currículo',
  'about.cvSoon': 'Currículo em breve',
  'about.linkedin': 'LinkedIn',

  'contact.cmd': '$ dotnet run --project contato',
  'contact.title': 'Vamos',
  'contact.titleItalic': 'conversar?',
  'contact.text': 'Conte um pouco sobre a sua ideia ou proposta.',
  'contact.name': 'Nome',
  'contact.email': 'E-mail',
  'contact.kind': 'Tipo',
  'contact.kind.project': 'Um projeto',
  'contact.kind.proposal': 'Uma proposta',
  'contact.kind.other': 'Outro assunto',
  'contact.message': 'Mensagem',
  'contact.send': 'Enviar mensagem',
  'contact.sending': 'Enviando…',
  'contact.success': 'Mensagem enviada. Obrigado! Respondo em breve.',
  'contact.error': 'Não foi possível enviar agora. Tente pelo e-mail ao lado.',
  'contact.rateLimited': 'Muitas mensagens em pouco tempo. Tente de novo em alguns minutos.',
  'contact.invalid': 'Confira os campos: nome, e-mail válido, tipo e uma mensagem de 10 a 2000 caracteres.',
  'contact.err.name': 'Informe seu nome (pelo menos 2 caracteres).',
  'contact.err.email': 'Informe um e-mail válido.',
  'contact.err.kind': 'Escolha o tipo de contato.',
  // {n} é trocado pelo número de caracteres que faltam / sobram
  'contact.err.messageShort': 'A mensagem está curta: faltam {n} caracteres (mínimo 10).',
  'contact.err.messageLong': 'A mensagem passou do limite em {n} caracteres (máximo 2000).',

  'footer.rights': '© 2026 Daniel Soares',
};

export type UiKey = keyof typeof pt;

const en: Record<UiKey, string> = {
  'meta.title': 'Daniel Soares — Full-stack developer',
  'meta.description':
    'Websites, systems and apps that actually work, from the front end to the database. Full-stack developer with 5 years of experience building systems for the financial sector.',

  'meta.contactTitle': 'Contact — Daniel Soares',
  'meta.contactDescription': 'Get in touch with Daniel Soares via the form, email, LinkedIn or GitHub.',

  'nav.work': './work',
  'nav.services': './services',
  'nav.about': './about',
  'nav.contact': './contact',
  'nav.cta': "let's talk",
  'nav.skip': 'Skip to content',
  'nav.lang': 'Language',
  'nav.aria': 'Main',

  'hero.cmd': '$ whoami',
  'hero.title': 'Websites, systems and apps that actually work.',
  'hero.titleItalic': 'From the front end to the database.',
  'hero.summary':
    "I'm Daniel, a full-stack developer with 5 years of experience building systems for the financial sector. Open to conversations about new projects.",
  'hero.ctaWork': 'See my work',
  'hero.ctaProject': 'Start a project',

  'video.label': 'Introduction video by Daniel Soares',
  'video.unmute': 'Unmute',
  'video.mute': 'Mute',
  'video.pause': 'Pause',
  'video.play': 'Play',
  'video.captionsOn': 'Captions: on',
  'video.captionsOff': 'Captions: off',

  'terminal.label': 'Terminal with a summary of Daniel Soares',
  'terminal.whoami': 'daniel-soares · full-stack developer',
  'terminal.runCmd': 'dotnet run --project import-routine',
  'terminal.runOut': 'database queries: tens of thousands → a handful',
  'terminal.runOk': '−47 min per run',

  'trust.lead': "I've delivered systems for",
  'trust.aria': 'Clients served',
  'trust.1': 'one of the largest banks in Brazil',
  'trust.2': 'a Swiss investment bank',
  'trust.3': 'a multinational fintech company',

  'work.cmd': '$ ls work/',
  'work.title': 'Selected',
  'work.titleItalic': 'work.',
  'work.featured': 'featured',
  'work.problem': 'Problem',
  'work.solution': 'Solution',
  'work.result': 'Result',
  'work.tags': 'Technologies',
  'work.clients': '$ ls clients/',

  'projects.cmd': '$ ls ~/github/',
  'projects.building': 'in progress',
  'projects.published': 'live',
  'projects.live': 'View live',
  'projects.liveSoon': 'Deploy coming soon',
  'projects.repo': 'Repository',
  'projects.profile': 'View GitHub profile',

  'services.cmd': '$ ls services/',
  'services.title': 'What I can',
  'services.titleItalic': 'build for you.',
  'services.1.title': 'Websites and landing pages',
  'services.1.text': 'Company websites and product pages that are fast, responsive and easy to update.',
  'services.2.title': 'Custom web apps and systems',
  'services.2.text': 'Screens, business rules and databases designed around how your team works.',
  'services.3.title': 'APIs, integrations and automation',
  'services.3.text': 'Systems that talk to each other, with fewer spreadsheets and manual tasks.',
  'services.4.title': 'Performance and modernization',
  'services.4.text': 'I find what is slow or unstable and modernize legacy systems without disrupting operations.',

  'about.cmd': '$ cat about.md',
  'about.title': 'I like systems that work —',
  'about.titleItalic': "and figuring out why they don't.",
  'about.p1':
    "I've spent the last 5 years working on financial systems, where mistakes are costly and slowness isn't an option. That taught me to investigate calmly, measure before optimizing, and leave the code better than I found it.",
  'about.personal': '',
  'about.photoAlt': 'Photo of Daniel Soares',
  'about.cv': 'Download résumé',
  'about.cvSoon': 'Résumé coming soon',
  'about.linkedin': 'LinkedIn',

  'contact.cmd': '$ dotnet run --project contact',
  'contact.title': "Let's",
  'contact.titleItalic': 'talk.',
  'contact.text': 'Tell me a little about your idea or proposal.',
  'contact.name': 'Name',
  'contact.email': 'Email',
  'contact.kind': 'Type',
  'contact.kind.project': 'A project',
  'contact.kind.proposal': 'A proposal',
  'contact.kind.other': 'Something else',
  'contact.message': 'Message',
  'contact.send': 'Send message',
  'contact.sending': 'Sending…',
  'contact.success': "Message sent. Thanks! I'll get back to you soon.",
  'contact.error': "Couldn't send your message right now. Please reach me by email instead.",
  'contact.rateLimited': 'Too many messages in a short time. Please try again in a few minutes.',
  'contact.invalid': 'Please check the fields: name, a valid email, type and a message of 10 to 2,000 characters.',
  'contact.err.name': 'Please enter your name (at least 2 characters).',
  'contact.err.email': 'Please enter a valid email address.',
  'contact.err.kind': 'Please choose a contact type.',
  'contact.err.messageShort': 'Your message is too short: add {n} more characters (minimum 10).',
  'contact.err.messageLong': 'Your message is {n} characters over the limit (maximum 2,000).',

  'footer.rights': '© 2026 Daniel Soares',
};

const ui: Record<Lang, Record<UiKey, string>> = { pt, en };

/** Retorna a função de tradução para um idioma: t('hero.title') */
export function useTranslations(lang: Lang) {
  return (key: UiKey) => ui[lang][key];
}

/** Rotas de cada página nos dois idiomas (usadas nos links e no seletor PT / EN) */
export const routes = {
  home: { pt: '/', en: '/en/' },
  contact: { pt: '/contato/', en: '/en/contact/' },
} satisfies Record<string, Record<Lang, string>>;

export type Page = keyof typeof routes;
