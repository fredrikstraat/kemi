# Kemi med Isak

En enkel övningsapp för kemiprovet om vardagshygien. Appen ställer korta frågor, tar emot elevsvar och använder OpenAI för att ge varm coaching och en tydlig bedömning på `E`, `C` eller `A`-nivå.

## Starta

1. Skapa en `.env`-fil:

```bash
cp .env.example .env
```

2. Lägg in din OpenAI-nyckel i `.env`.

3. Starta appen:

```bash
npm start
```

4. Öppna [http://localhost:3000](http://localhost:3000)

## Miljövariabler

- `OPENAI_API_KEY` krävs för coaching och bedömning
- `OPENAI_MODEL` är valfri och är satt till `gpt-5-mini` som standard
- `HOST` är valfri och är satt till `127.0.0.1` som standard
- `PORT` är valfri och är satt till `3000` som standard

## Vad appen tränar på

- Hur kroppen blir ren
- Hur molekyler kan lukta
- Hur man gör aktiva val för hälsa och miljö

## OpenAI-del

Appen använder `POST /v1/responses` och Structured Outputs för att få tillbaka förutsägbar JSON-feedback från modellen.

Officiella referenser:

- [Responses API](https://platform.openai.com/docs/api-reference/responses)
- [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs)
- [GPT-5 mini](https://platform.openai.com/docs/models/gpt-5-mini)
