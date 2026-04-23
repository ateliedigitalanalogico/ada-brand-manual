# Portfolio Schema

## Como buscar

URL raw do GitHub:
```
https://raw.githubusercontent.com/ateliedigitalanalogico/ada-brand-manual/main/assets/portfolio.json
```

Use `WebFetch` para ler o arquivo quando precisar de dados reais de projetos.

## Estrutura do JSON

Cada item tem os campos:
- `id` — slug único do projeto
- `title` — nome do projeto
- `client` — cliente(s)
- `year` — ano
- `category` — tipo (videomapping, instalação, etc.)
- `territory` — território temático
- `highlights` — booleano se é destaque
- `description` — texto curto
- `tags` — array de palavras-chave

## Uso típico

Ao escrever copy com projetos reais:
1. Faça WebFetch do URL acima
2. Filtre por cliente, ano ou categoria relevante
3. Use os dados — nunca invente projetos ou clientes
