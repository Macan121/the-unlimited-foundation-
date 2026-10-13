# TUF website launch dependencies

This file is private project documentation and is not copied into `dist`.

## Required before the related public feature can be enabled

- **TNFA website URL:** set `TUF_TNFA_URL` to the verified HTTPS destination when building. The external action is omitted while this value is empty. The TNFA codebase is not present in this workspace, so the reciprocal TNFA-to-TUF link remains a separate task.
- **Contact destination:** set `TUF_CONTACT_EMAIL` to the approved TUF recipient when building, or replace the draft-only workflow with an approved server endpoint and credentials. The current form only opens a local email draft and does not transmit or store data.
- **Server form facts:** if a backend is introduced, document its recipient, storage location, retention period, privacy notice, server-side validation, spam protection, and rate limiting before describing those behaviors publicly.
- **Official contact information:** approved email, phone number(s), location, and social profile URLs are not present in the repository or supplied materials, so they are omitted from the footer.
- **Smiling Children Project:** detailed activities are not confirmed; its public page shows only the confirmed project identity and a coming-soon message.
- **Stories and people:** no approved stories, names, roles, biographies, or photographs were supplied. Both sections and their navigation links are omitted.
- **Mission and vision:** no approved statements were supplied. The site does not invent them.
- **Objectives and organisational background:** no approved objectives, history, registration status, or leadership information were supplied. The About page therefore publishes only the confirmed foundation/project relationship.
- **Tech Academy programme detail:** learning areas, delivery method, eligibility, availability, dates, fees, outcomes, and participation steps are not supplied for Students in Tech, Women in Tech, or Older Adults in Tech.
- **Production site URL:** set `TUF_SITE_URL` during the build to emit absolute canonical links and `sitemap.xml`. These are omitted rather than guessed while the production origin is unknown.
- **Photography:** current people imagery is retained from the existing concept assets and labelled as illustrative. Replace it with approved TUF documentary photography when available.
- **Fonts:** the CSS specifies Manrope and Inter with system fallbacks, but no licensed local font files were supplied. Add subsetted WOFF2 files only when the font source and usage rights are confirmed.

## Preserved unpublished assets

The original montage and earlier concept reference remain in the source workspace for editorial reference. The build copies only assets used by the public site.
