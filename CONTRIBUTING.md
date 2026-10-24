# Contributing

Thanks for helping improve Awesome AirPlay.

## Guidelines

- Make sure the item is directly related to AirPlay, RAOP, AirPlay 2, AirPlay-compatible receivers, senders, bridges, debugging, or defensive security research.
- Prefer projects that are maintained, documented, and useful to someone building or troubleshooting an AirPlay setup.
- Add one link per pull request when possible.
- **Update [COMPATIBILITY.md](COMPATIBILITY.md) in the same PR** whenever a README entry is added, removed, renamed, or its URL/capabilities change.
- Use this format:

```md
- [Name](https://example.com/) - `Open Source` `Free` · `AirPlay 2` — Short useful description.
```

- Keep descriptions concise, neutral, and ending with a period.
- Put verified labels before the em dash (—) introducing the description. Separate an optional protocol label with ` · `, and avoid repeating obvious label content.
- Put commercial tools in the most relevant section and avoid affiliate links.
- Put abandoned or mainly historical projects in the Historical Projects section.
- Do not add piracy, cracked apps, exploit code, or instructions for attacking devices.
- Check that every link works before opening a pull request.

## Resource Labels

Use the same inline-code labels and definitions as the [README](README.md#resource-labels):

- `Open Source`: publicly available source code **with an explicit open-source license**. A GitHub repository or source-available, non-commercial-only license is not sufficient.
- `Free`: core functionality or the linked informational resource is freely available without payment.
- `Freemium`: a meaningful free workflow is available, with optional paid features or usage limits.
- `Paid`: meaningful ongoing use requires payment, even when a trial or preview is available.
For applications and services, assign one pricing label and include `Open Source` only if its license supports that claim. Optionally add **one** verified protocol label after a middle dot (` · `): `AirPlay 1`, `AirPlay 2`, `AirPlay 2 (Legacy)`, `RAOP`, or `Custom Protocol`. Use **at most three** inline-code labels (license, price, protocol). Functional labels like `Audio`, `Video`, `Multiroom`, `Screen Mirroring` and `Control` belong in prose and the matrix, not the compact README tag row.

Distinguish AirPlay 2 streaming from legacy-mode support and AirPlay 2 pairing/control. Note limited HLS, DRM restrictions, audio-only, mirroring-only, and build/platform constraints in [COMPATIBILITY.md](COMPATIBILITY.md). When evidence is insufficient, use `?` in the matrix and omit the protocol badge in the README; unverified is not unsupported.

For documentation, research, specifications, or tutorials, `Free` may be appropriate if the linked content is publicly accessible; do not apply `Open Source` merely because a webpage is readable. Do not label entries under Related Awesome Lists.

Check the project's licensing and pricing pages, official app-store listing, and/or repository license before claiming a label. If the information cannot be verified, omit the uncertain label rather than guessing. Mention important restrictions (such as non-commercial-only licenses or time-limited trials) in the description where useful. Do not treat a limited free trial as `Freemium` if meaningful ongoing usage requires payment.

## Quality Bar

This is a curated list, not a complete directory. A good entry should answer at least one of these questions:

- Does it solve a real AirPlay setup problem?
- Does it help developers understand or implement the protocol?
- Does it help users debug discovery, pairing, latency, or streaming issues?
- Does it document security risks in a responsible, defensive way?

## Running Checks

Run both checks before submitting:

```sh
node scripts/check-compatibility.mjs
npx awesome-lint
```

The compatibility check ensures every README resource appears in the matrix with the same name/URL, without too many tags. It cannot prove the correctness of upstream claims.
