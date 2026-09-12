# VEEEDUB

Artist site for **VEEEDUB** — DJ / Producer / Promoter.

**Tagline:** Know Your Worth. Move Like It.

Live: https://mrolam.github.io/veeedub/

## Nav (EPK-aligned)

| Tab | Page |
|-----|------|
| About | `index.html` — About VEEEDUB, Genres & Room Energy, Listen & Connect |
| Why Book | `why-book.html` — Why Book VEEEDUB, Track Releases |
| Venues Played | `venues.html` — venues + Opened For / Shared Decks |
| Store | `store.html` — Coming Soon |
| Contact | `contact.html` — Booking Contact + FormSubmit → mitch@rolams.com |

## GitHub Pages

Source: branch `main`, folder `/ (root)`.

```bash
gh api -X POST repos/mrolam/veeedub/pages \
  -f build_type=legacy \
  -f source[branch]=main \
  -f source[path]=/
```

## Booking form

FormSubmit posts to `mitch@rolams.com` (cc artist). First submission may require Mitch to confirm FormSubmit.
