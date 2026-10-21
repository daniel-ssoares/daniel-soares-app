---
lang: pt
order: 1
title: Otimização de uma rotina crítica de importação
client: multinacional de tecnologia financeira
context: Investimentos e derivativos
problem: Uma rotina crítica de importação fazia dezenas de milhares de consultas ao banco a cada execução e sofria com problemas de memória.
summary: Substituição de buscas repetitivas por índices em memória, cache de parâmetros e validações paralelas com segurança de thread.
result: Dezenas de milhares de consultas ao banco viraram poucas, os problemas de memória foram eliminados e cada execução ficou ~47 min mais rápida.
metric:
  value: −47 min
  label: por execução
tags: [C#, .NET, SQL Server, T-SQL, cache, paralelismo]
---
