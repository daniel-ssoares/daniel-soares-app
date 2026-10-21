-- Revisão dos textos em inglês dos cases.

update public.cases
set client = 'multinational fintech company',
    result = 'Tens of thousands of database queries were reduced to a handful, memory issues were eliminated, and each run became ~47 min faster.'
where lang = 'en' and sort_order = 1;

update public.cases
set summary = '.NET Core REST APIs with a BFF architecture replacing legacy systems and EUCs, plus OMS integration, RabbitMQ messaging and automated tests.'
where lang = 'en' and sort_order = 3;

update public.cases
set summary = 'Analyzes résumés and interview transcripts with OpenAI and checks whether candidates meet the job requirements, with an Angular front end and a containerized backend.'
where lang = 'en' and sort_order = 4;
