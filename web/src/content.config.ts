// Content Collections: https://docs.astro.build/en/guides/content-collections/
// Os cases ficam em arquivos Markdown (um por case e por idioma) em src/content/cases/{pt,en}/.
// Eles são o conteúdo estático do site; se a API /api/cases responder, o front troca pelos dados do banco.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const cases = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/cases' }),
  schema: z.object({
    lang: z.enum(['pt', 'en']),
    // O case de menor `order` aparece em destaque (problema → solução → resultado)
    order: z.number().int(),
    title: z.string(),
    client: z.string(),
    context: z.string().optional(),
    problem: z.string().optional(),
    summary: z.string(),
    // Resultado mensurável (opcional: só preencher quando houver número/fato real)
    result: z.string().optional(),
    // Número grande exibido no case em destaque, ex.: { value: '−47 min', label: 'por execução' }
    metric: z.object({ value: z.string(), label: z.string() }).optional(),
    tags: z.array(z.string()),
  }),
});

export const collections = { cases };
