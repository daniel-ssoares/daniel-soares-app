-- Cases iniciais (os mesmos de web/src/content/cases/, que servem de fallback estático).
-- Para editar depois: Table Editor do Supabase ou um novo arquivo de migration.

insert into public.cases (lang, sort_order, title, client, context, problem, summary, result, metric_value, metric_label, tags) values
  ('pt', 1, 'Otimização de uma rotina crítica de importação', 'multinacional de tecnologia financeira', 'Investimentos e derivativos',
   'Uma rotina crítica de importação fazia dezenas de milhares de consultas ao banco a cada execução e sofria com problemas de memória.',
   'Substituição de buscas repetitivas por índices em memória, cache de parâmetros e validações paralelas com segurança de thread.',
   'Dezenas de milhares de consultas ao banco viraram poucas, os problemas de memória foram eliminados e cada execução ficou ~47 min mais rápida.',
   '−47 min', 'por execução',
   array['C#', '.NET', 'SQL Server', 'T-SQL', 'cache', 'paralelismo']),
  ('pt', 3, 'Planilhas e sistemas legados virando APIs modernas', 'banco de investimentos suíço', null, null,
   'APIs REST em .NET Core com arquitetura BFF substituindo sistemas legados e EUCs, integração com OMS, mensageria RabbitMQ e testes automatizados.',
   null, null, null,
   array['.NET Core', 'REST', 'BFF', 'RabbitMQ', 'SQL Server', 'testes']),
  ('pt', 4, 'Uma plataforma que lê currículos e entrevistas com IA', 'consultoria de tecnologia', null, null,
   'Analisa currículos e transcrições de entrevistas com OpenAI e confere se o candidato atende à vaga, com front em Angular e backend em containers.',
   null, null, null,
   array['Angular', 'NestJS', 'TypeScript', 'OpenAI', 'Prisma', 'MySQL', 'Docker']),

  ('en', 1, 'Optimizing a critical import routine', 'multinational financial technology company', 'Investments and derivatives',
   'A critical import routine ran tens of thousands of database queries on every run and suffered from memory issues.',
   'Replaced repetitive lookups with in-memory indexes, parameter caching and thread-safe parallel validations.',
   'Tens of thousands of database queries became a handful, the memory issues were eliminated and each run got ~47 min faster.',
   '−47 min', 'per run',
   array['C#', '.NET', 'SQL Server', 'T-SQL', 'caching', 'parallelism']),
  ('en', 3, 'Spreadsheets and legacy systems turned into modern APIs', 'Swiss investment bank', null, null,
   '.NET Core REST APIs with a BFF architecture replacing legacy systems and EUCs, OMS integration, RabbitMQ messaging and automated tests.',
   null, null, null,
   array['.NET Core', 'REST', 'BFF', 'RabbitMQ', 'SQL Server', 'testing']),
  ('en', 4, 'A platform that reads résumés and interviews with AI', 'technology consultancy', null, null,
   'Analyzes résumés and interview transcripts with OpenAI and checks whether the candidate fits the job, with an Angular front end and a containerized backend.',
   null, null, null,
   array['Angular', 'NestJS', 'TypeScript', 'OpenAI', 'Prisma', 'MySQL', 'Docker']);
