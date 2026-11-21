# flowstead.co.uk

Static site for Flowstead (AI receptionists, AI inbox assistants and n8n automations for holiday-let and property managers). Served by GitHub Pages from `main` with the custom domain in `CNAME`.

- `index.html`, `styles.css`, `main.js`: the whole site, no build step.
- `fonts/`: self-hosted Inter Tight.
- Checklist form posts JSON `{email, source}` to `https://flowstead.app.n8n.cloud/webhook/flowstead-checklist`; on any failure it shows an email fallback.
- Previous design is kept on branch `backup-pre-v3-2026-11-21`.
