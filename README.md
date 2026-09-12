# VEEEDUB

Artist site for **VEEEDUB** — DJ / Producer / Promoter.

**Tagline:** Know Your Worth. Move Like It.

Live (GitHub Pages): https://mrolam.github.io/veeedub/

## Pages

| Path | Section |
|------|---------|
| `/` | Home |
| `/experience.html` | Venues, opened-for, why book, releases |
| `/store.html` | Merch — coming soon |
| `/contact.html` | Booking form (FormSubmit → mitch@rolams.com) + socials |

## Enable / re-check GitHub Pages

1. Repo **Settings → Pages**
2. Source: **Deploy from a branch**
3. Branch: `main` · folder: `/ (root)`
4. Save — site publishes at `https://mrolam.github.io/veeedub/`

Or via API (already attempted on first deploy):

```bash
gh api -X POST repos/mrolam/veeedub/pages \
  -f build_type=legacy \
  -f source[branch]=main \
  -f source[path]=/
```

## Local preview

Open `index.html` via any static server from this folder. Asset paths use `<base href="/veeedub/">` for project Pages — for local root serving, temporarily change base to `./` or serve under `/veeedub/`.

## Booking form

Contact form posts to [FormSubmit](https://formsubmit.co) at `mitch@rolams.com`. The first submission may require Mitch to confirm the email link from FormSubmit.

## Store

Coming soon placeholder only. When Shopify products exist, replace the Store panel with Buy Button / Storefront embeds (see HTML comment on `store.html`).
