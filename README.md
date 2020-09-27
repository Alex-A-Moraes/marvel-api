# API Marvel

API de catalogo dos personagens da marvel.

Endpoints implementados:

        * /v1/public/characters
        * /v1/public/characters/{characterId}
        * /v1/public/characters/{characterId}/comics
        * /v1/public/characters/{characterId}/events
        * /v1/public/characters/{characterId}/series
        * /v1/public/characters/{characterId}/stories

### Banco de dados

> Está aplicação tem como dependência o banco de dados mongodb.

    *** Caso já tenha o mongod instalado e configurado a variável de ambiente, executar passo abaixo:

Criar e popular o banco

```bash
mongorestore --host="localhost" --db=marvel --port=27017 "~/db/dump/marvel"
```

### Configuração

```bash
npm install
```

### Desenvolvimento com ts-node-dev

```bash
npm run dev
```

### Executar testes automatizados

```bash
npm t
```

## Swagger

Acessar `http://localhost:3001/swagger/` documentação em Swagger-UI
