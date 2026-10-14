# Audit evidence manifest

Captured 13 October 2026 for `AUDIT_REPORT.md`.

## Screenshots

- `live-home-360x800.png`
- `live-home-390x844.png`
- `live-home-768x1024.png`
- `live-home-1280x720.png`
- `live-home-1366x768.png`
- `live-home-1440x900.png`
- `live-home-1920x1080.png`
- `live-contact-1440x900.png`
- `local-nojs-images-blocked-390x844.png` — stress evidence only; the effective CSS viewport reported by the browser was narrower than the requested outer viewport.
- `live-home-1440x900-browser-75pct.png` — retained as negative evidence. It is byte-identical to the nominal 100% capture because the in-app browser ignored zoom commands; it must not be treated as a 75% result.

## Public snapshots

- `live-home.html`, `live-styles.css`, `live-script.js`, `live-robots.txt` — audit-start production snapshots.
- `live-current-home.html`, `live-current-tnfa.html` — final verification snapshots after concurrent working-tree changes; these confirm that production still serves the earlier output.
- `tnfa-home.html` — public TNFA homepage used only to assess the cross-site relationship and metadata.

The snapshots contain only publicly retrievable site content. No form submission, private record, credential, or user data is included.
