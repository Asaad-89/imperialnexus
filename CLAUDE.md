# Imperial Nexus website — notes for AI agents

Live site: https://imperialnexu.com (Hostinger shared hosting, PHP/HTML plan).
Deploys from this repo's `main` branch into `public_html`. Anything merged to `main` goes live.

## What the site is
Corporate site for a Saudi telecom & IT solutions company (Riyadh). Sections: Home, About,
Services, Network Designer (product configurator + AI compatibility analysis), Skills,
Partners, Clients, Careers, Contact, Account portal.

## How it is built
- Plain HTML/CSS/JS, no build step. `index.html` holds markup, styles and scripts.
- `imperial-theme.js` adds the theme layer.
- Client-side hash routing (`#/home`, `#/services`, ...).
- Designs and accounts are stored in the visitor's browser (`localStorage`).
- `api/analyze.php` proxies the Network Designer's AI analysis to the Anthropic API. It owns
  the system prompt, checks the request comes from this site, and rate-limits per visitor.

## Rules
- The repo is PUBLIC. Never commit API keys, passwords or tokens. Server secrets go in
  `config.php` on Hostinger, one level above `public_html` (outside the deploy), never in git.
- Every visible string must exist in both English and Arabic (use the existing `tx(en, ar)`
  helper). Check layouts in RTL (Arabic) as well as LTR.
- Never insert untrusted text (user input, AI output) with `innerHTML` without escaping.
- Work on a branch and open a pull request; do not push to `main` directly.
- Keep changes small and focused, one concern per PR, with before/after notes.
