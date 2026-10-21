---
lang: en
order: 1
title: Optimizing a critical import routine
client: multinational fintech company
context: Investments and derivatives
problem: A critical import routine ran tens of thousands of database queries on every run and suffered from memory issues.
summary: Replaced repetitive lookups with in-memory indexes, parameter caching and thread-safe parallel validations.
result: Tens of thousands of database queries were reduced to a handful, memory issues were eliminated, and each run became ~47 min faster.
metric:
  value: −47 min
  label: per run
tags: [C#, .NET, SQL Server, T-SQL, caching, parallelism]
---
