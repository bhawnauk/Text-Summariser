# Text Summariser

A full-stack AI text summariser that turns articles, reports, and transcripts into focused summaries — powered entirely by a **local LLM** (via [Ollama](https://ollama.com)), so no API key or external service is required.

Paste in text (or drop a `.txt` / `.pdf` / `.docx` file), pick a length, tone, and format, and get a clean summary back in seconds.

## Features

- **Length control** — short, medium, or long summaries
- **Tone control** — professional or casual
- **Format control** — flowing paragraphs or bullet points
- **Drag-and-drop upload** — `.txt`, `.pdf`, `.docx`
- **Handles long documents** — text is cleaned and split into chunks by the processor service; each chunk is summarised individually and then combined into one final summary, so input isn't limited to what fits in a single model call
- **Runs fully locally** — summarisation happens on your machine via Ollama, nothing is sent to a third-party API


## Architecture

The project has three independent services:

```
client/      React 19 + Vite + Tailwind CSS — the web UI
api/         Express + TypeScript — REST API that builds prompts and talks to Ollama
processor/   FastAPI (Python) — cleans and chunks every request's text before it's summarised
```

```
┌──────────┐      POST /api/summarise      ┌─────────┐      ollama.chat()      ┌────────┐
│  client  │ ─────────────────────────────▶ │   api   │ ───────────────────────▶ │ Ollama │
│ (5173)   │ ◀───────────────────────────── │ (5050)  │ ◀─────────────────────── │ (local)│
└──────────┘         summary JSON           └────┬────┘        summary          └────────┘
                                                  │
                                                  │ POST /process
                                                  ▼
                                             ┌───────────┐
                                             │ processor │
                                             │  (8000)   │
                                             └───────────┘
```

## Tech stack

| Layer     | Stack |
|-----------|-------|
| Client    | React 19, Vite, TypeScript, Tailwind CSS 4, React Router, React Hook Form, Framer Motion |
| API       | Node.js, Express 5, TypeScript, `ollama` client, Zod, Helmet, express-rate-limit |
| Processor | Python, FastAPI, spaCy, tiktoken, BeautifulSoup |
| LLM       | [Ollama](https://ollama.com) running `qwen2.5:1.5b` locally |

## Prerequisites

- [Node.js](https://nodejs.org) VERSION 18 and above
- [Python](https://www.python.org) VERSION 3.10 and above
- [Ollama](https://ollama.com) installed and running

Pull the model the API uses before starting it:

```bash
ollama pull qwen2.5:1.5b
```

## Getting started

Clone the repo and install dependencies for each service:

```bash
git clone https://github.com/bhawnauk/Text-Summariser.git
cd Text-Summariser
```

### 1. API

```bash
cd api
npm install
```

Create an `api/.env` file:

```
PORT=5050
PROCESSOR_URL=http://localhost:8000
```

Start it:

```bash
npm run dev
```

The API runs at `http://localhost:5050`.

### 2. Processor

```bash
cd processor
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python -m spacy download en_core_web_sm
uvicorn app.main:app --reload --port 8000
```

The processor runs at `http://localhost:8000`. **This service is required** — every summarise request routes through it for cleaning and chunking, so the API will return a 502 if it isn't running.

### 3. Client

```bash
cd client
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

With all three running, open `http://localhost:5173` in your browser, paste in some text, and generate a summary.

## Deployment

The client is deployed to Vercel: **https://textsummariser.vercel.app**

Ollama can't run on Vercel (or most serverless/free PaaS tiers) — it needs a persistent process with the model held in memory. So the actual setup is:

- **Client** → Vercel, built with `VITE_API_URL` pointing at the backend.
- **`api` + `processor` + Ollama** → run locally (or on whatever machine you keep on), exposed to the internet via a free [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps).

This means the deployed site only works while your machine, with all three local services running, is on and connected.

### Starting the tunnel

```bash
cloudflared tunnel --url http://localhost:5050
```

This prints a random `https://<words>.trycloudflare.com` URL. It stays stable as long as this command keeps running, but changes every time it's restarted (reboot, sleep, network drop, etc.). If you want a URL that never changes, set up a [named tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps) against a domain you own instead.

### After the tunnel URL changes

1. Update the API's CORS allowlist in `api/.env`:
   ```
   CLIENT_ORIGIN=http://localhost:5173,https://textsummariser.vercel.app,https://textsummariser-bhawna-yadavs-projects.vercel.app
   ```
   (this only needs to change if the *Vercel* URL changes, not the tunnel URL — restart the API process after editing, since `.env` isn't hot-reloaded)
2. Point the client at the new tunnel URL:
   ```bash
   cd client
   vercel env rm VITE_API_URL production
   echo "https://<new-tunnel-url>" | vercel env add VITE_API_URL production
   vercel --prod --yes
   ```

## API reference

### `POST /api/summarise`

**Request body**

```json
{
  "text": "The text to summarise...",
  "length": "short | medium | long",
  "tone": "professional | casual",
  "format": "paragraph | bullets"
}
```

`length`, `tone`, and `format` are optional and default to `medium`, `professional`, and `paragraph` respectively.

**Response**

```json
{
  "summary": "..."
}
```

## Notes

- Summaries are generated by a small (1.5B parameter) local model, chosen for speed on consumer hardware. It follows length and tone instructions reasonably well but isn't as precise as a larger model — if you have the hardware for it, swapping in a bigger Ollama model (e.g. `llama3.2:3b`) in [`api/src/services/openai.services.ts`](api/src/services/openai.services.ts) will noticeably improve adherence to your chosen length and tone.
- Input is capped at 2,000 words on the client.
- The processor splits text into ~1,500-token chunks. For a single chunk, the API summarises it directly; for multiple chunks, each is summarised on its own and then those partial summaries are combined into one final pass using your chosen length, tone, and format.
