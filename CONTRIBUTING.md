# Contributing

Thanks for helping improve Awesome AirPlay.

## Guidelines

- Make sure the item is directly related to AirPlay, RAOP, AirPlay 2, AirPlay-compatible receivers, senders, bridges, debugging, or defensive security research.
- Prefer projects that are maintained, documented, and useful to someone building or troubleshooting an AirPlay setup.
- Add one link per pull request when possible.
- Use this format:

```md
- [Name](https://example.com/) - `Open Source` `Free` — Short useful description.
```

- Keep descriptions concise, neutral, and ending with a period.
- Put verified resource labels at the beginning of each description, separated from the description by an em dash (—), and avoid duplicating information already conveyed by labels.
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
- `AirPlay 1` / `AirPlay 2`: the AirPlay protocol version(s) the project implements. Add only when documented by the project; omit rather than guess.
- `Audio` / `Video`: whether the project sends or receives AirPlay audio, and screen mirroring or video streaming. Note in the description when only mirroring or only URL/HLS video is supported.

Place protocol and media labels after the licensing and pricing labels, for example `Open Source` `Free` `AirPlay 2` `Audio` `Video`.

For applications and services, assign one pricing label (`Free`, `Freemium`, or `Paid`) when it can be verified, plus `Open Source` only when license evidence supports it. An open-source project with optional paid unlocks can have both `Open Source` and `Freemium`. Paid hosted offerings do not automatically make the self-hosted open-source software paid.

For documentation, research, specifications, or tutorials, `Free` may be appropriate if the linked content is publicly accessible; do not apply `Open Source` merely because a webpage is readable. Do not label entries under Related Awesome Lists.

Check the project's licensing and pricing pages, official app-store listing, and/or repository license before claiming a label. If the information cannot be verified, omit the uncertain label rather than guessing. Mention important restrictions (such as non-commercial-only licenses or time-limited trials) in the description where useful. Do not treat a limited free trial as `Freemium` if meaningful ongoing usage requires payment.

## Quality Bar

This is a curated list, not a complete directory. A good entry should answer at least one of these questions:

- Does it solve a real AirPlay setup problem?
- Does it help developers understand or implement the protocol?
- Does it help users debug discovery, pairing, latency, or streaming issues?
- Does it document security risks in a responsible, defensive way?

## Running Checks

Run the linter before submitting:

```sh
npx awesome-lint
```
