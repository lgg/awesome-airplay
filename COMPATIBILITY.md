# AirPlay Compatibility Matrix

[Back to Awesome AirPlay](README.md) · [Contribution rules](CONTRIBUTING.md)

This companion catalog covers **every resource listed in the README**. Capabilities below are based on linked upstream descriptions and are **not independently tested interoperability guarantees**. Editorial review: October 2026.

## How to read the matrix

- **✓** — capability documented or advertised upstream, not necessarily tested by this catalog.
- **◐** — partial, experimental, or limited functionality; see Notes.
- **?** — not documented or not verified; **not equivalent to unsupported**.
- **—** — not offered in the documented role or not applicable; not an exhaustive negative test.
- **Audio** is media-stream audio; **Mirroring** is real-time screen sharing; **Video** is standalone/HLS media playback, not mirroring. **Multiroom** requires coordinated playback across devices, not merely several independent streams.
- **AirPlay 2** can mean audio, mirroring, pairing, or remote control. RAOP audio and AirPlay 2 pairing alone do *not* establish AirPlay 2 synchronized audio. Compatibility varies with OS, hardware, receiver, firmware and build options.

## Streaming software, hardware and implementations

### Audio receivers

| Project | Platform | Protocol / mode | Audio | Mirroring | Video | Multiroom | Notes |
| --- | --- | --- | :---: | :---: | :---: | :---: | --- |
| [Shairport Sync](https://github.com/mikebrady/shairport-sync) | Linux / FreeBSD / macOS / OpenBSD | AirPlay 1 or 2 (build-dependent) | ✓ | — | — | ✓ | Audio receiver; AirPlay 2 mode and multiroom require the appropriate build and timing support. |
| [openairplay/airplay2-receiver](https://github.com/openairplay/airplay2-receiver) | Python | AirPlay 2 (experimental) | ◐ | — | — | ? | Protocol study, not a production-ready speaker. |
| [openairplay/goplay2](https://github.com/openairplay/goplay2) | Go | AirPlay 2 (experimental) | ◐ | — | — | ? | Experimental speaker implementation. |
| [Airplay.App](https://github.com/natsurainko/Airplay.App) | Windows | AirPlay (version unverified) | ✓ | ✓ | ? | ? | Version-specific behavior has not been independently verified. |

### Screen mirroring receivers

| Project | Platform | Protocol / mode | Audio | Mirroring | Video | Multiroom | Notes |
| --- | --- | --- | :---: | :---: | :---: | :---: | --- |
| [UxPlay](https://github.com/FDH2/UxPlay) | Linux / macOS / BSD / Windows | AirPlay 2 (legacy) | ✓ | ✓ | ◐ | — | YouTube HLS only; no AirPlay 2 multiroom audio. |
| [RPiPlay](https://github.com/FD-/RPiPlay) | Raspberry Pi / other | AirPlay (version unverified) | ✓ | ✓ | — | — | Receives AAC audio with mirrored H.264 screen; standalone video-by-URL playback not implemented. |
| [java-airplay-server](https://github.com/serezhka/java-airplay-server) | Java / cross-platform | AirPlay 2 (project claim) | ✓ | ✓ | ? | — | Emulates an Apple TV for development and mirroring. |
| [airplayreceiver](https://github.com/SteeBono/airplayreceiver) | C# / cross-platform | AirPlay 2 (project claim) | ✓ | ✓ | ? | — | Experimental AirPlay 2 mirroring and audio. |
| [AirPlay-Windows](https://github.com/moieric11/AirPlay-Windows) | Windows 10/11 x64 | AirPlay 2 mirroring, RAOP audio | ✓ | ✓ | ◐ | — | Standalone HLS is experimental and opt-in with `--hls-proxy-playback`; protected/DRM media unsupported. Audio uses RAOP AAC/ALAC. |
| [AirGlass](https://github.com/jdkuk/AirGlass) | Windows | AirPlay (version unverified) | ✓ | ✓ | ? | — | Free full-screen viewing; paid floating window. |
| [PiP](https://github.com/amitv87/PiP) | macOS | AirPlay (version unverified) | ? | ◐ | ? | — | Picture-in-picture AirPlay receiver; up to ten separate sessions does not equal synchronized multiroom. |

### Senders and desktop clients

| Project | Platform | Protocol / mode | Audio | Mirroring | Video | Multiroom | Notes |
| --- | --- | --- | :---: | :---: | :---: | :---: | --- |
| [TuneBlade](https://www.tuneblade.com/) | Windows | AirPlay (version unverified) | ✓ | — | — | ? | System-wide audio sender; trial/free version may have restrictions. |
| [AirSend](https://github.com/Pabldi08/AirSend) | Windows | AirPlay 2 (project claim) | ✓ | — | — | ? | HomePod-oriented sender. |
| [OwnTone](https://owntone.github.io/owntone-server/) | Linux / FreeBSD / macOS | AirPlay 1 / 2 | ✓ | — | — | ✓ | Media server **sending** to AirPlay 1/2 speakers; supports synchronized multiroom playback. |
| [WinPlay](https://github.com/dineshdhotrad/WinPlay) | Windows 10/11 | AirPlay 2 (project claim) | ✓ | ✓ | — | ✓ | Upstream claims ALAC system audio, stereo groups and H.264 mirroring to Apple TV. |
| [pyatv](https://pyatv.dev/) | Python / CLI | RAOP for audio; AirPlay 2 control | ✓ | — | ✓ | — | Video by URL, not mirroring. Pairing/control is not AirPlay 2 audio transport. |
| [Airfoil](https://rogueamoeba.com/airfoil/mac/) | macOS (current); Windows (retired) | AirPlay 1 / 2 | ✓ | — | — | ? | Windows sender [retired in 2019](https://rogueamoeba.com/airfoil/windows/); macOS version is maintained. Satellite for Windows is a receiver, not the sender. |
| [AirParrot](https://www.airsquirrels.com/airparrot/) | Windows / macOS | AirPlay and AirPlay 2 destinations | ✓ | ✓ | ? | ? | Mirroring/media sending; receiver compatibility does not prove AirPlay 2 multiroom. |

### Android apps

| Project | Platform | Protocol / mode | Audio | Mirroring | Video | Multiroom | Notes |
| --- | --- | --- | :---: | :---: | :---: | :---: | --- |
| [AirMusic](https://www.airmusic.app/) | Android 10+ | AirPlay 1 / 2 | ✓ | — | — | ✓ | Vendor documents synchronized AirPlay 2 multiroom and HomePod stereo pairs. Trial inserts a test signal after 10 minutes; app capture and mixed-protocol sync have limitations. |
| [AirScreen](https://www.airscreen.app/) | Android / Android TV | AirPlay (version unverified) | ✓ | ✓ | ? | — | Also supports Cast, Miracast, DLNA; free limits may apply. |
| [AirPin PRO](https://play.google.com/store/apps/details?id=com.waxrain.airplaydmr3) | Android / Android TV | AirPlay (version unverified) | ✓ | ✓ | ? | — | Commercial receiver also supporting DLNA. |
| [AirReceiver](https://play.google.com/store/apps/details?id=com.softmedia.receiver) | Android TV / boxes | AirPlay (version unverified) | ✓ | ✓ | ? | — | Also supports other wireless-display technologies. |
| [ScreenDock](https://github.com/tarek369/screendock) | Android / Android TV | AirPlay (version unverified) | ✓ | ✓ | ✓ | — | Upstream documents web/YouTube AirPlay video; free music, limited Play Store mirroring/video; DRM and AirPlay 2 multiroom unavailable. |
| [AirPlay Receiver for Android](https://github.com/jqssun/android-airplay-server) | Android 7+ / Android TV | AirPlay 2 (UxPlay legacy) | ✓ | ✓ | ◐ | — | HLS available; no DRM; UxPlay legacy restrictions apply. |

| [centuryplay](https://github.com/g8row/centuryplay) | Android 11+ | AirPlay 1 (RAOP); AirPlay 2 realtime (upstream claim) | ✓ | — | — | ✓ | ALAC audio; multiroom verified upstream with Shairport Sync, while HomePod/Sonos AirPlay 2 playback is mostly expected rather than device-verified. App capture restrictions and FairPlay-only receiver limitations apply. |

### Related, non-AirPlay streaming

| Project | Platform | Protocol / mode | Audio | Mirroring | Video | Multiroom | Notes |
| --- | --- | --- | :---: | :---: | :---: | :---: | --- |
| [AriaCast Receiver](https://www.music-assistant.io/plugins/ariacast-receiver/) | Android to Music Assistant | AriaCast (not AirPlay) | ✓ | — | — | ? | Separate transport; not directly AirPlay-compatible. |

### Bridges and relays

| Project | Platform | Protocol / mode | Audio | Mirroring | Video | Multiroom | Notes |
| --- | --- | --- | :---: | :---: | :---: | :---: | --- |
| [AirConnect](https://github.com/philippe44/AirConnect) | Cross-platform bridge | AirPlay 1 / RAOP | ✓ | — | — | ◐ | Can target existing Sonos/Chromecast groups, but is not an AirPlay 2 synchronized-audio implementation. |
| [BabelPod](https://github.com/afaden/BabelPod) | Raspberry Pi | AirTunes / RAOP; AP2 not verified | ✓ | — | — | ? | Audio relay. Pinned dependencies do not prove complete AirPlay 2 support. |

### Commercial receivers

| Project | Platform | Protocol / mode | Audio | Mirroring | Video | Multiroom | Notes |
| --- | --- | --- | :---: | :---: | :---: | :---: | --- |
| [AirServer](https://www.airserver.com/Overview) | Windows / macOS / Xbox / hardware | AirPlay (version unverified) | ✓ | ✓ | ? | ? | Commercial receiver; features depend on platform. |
| [Reflector](https://www.airsquirrels.com/reflector) | Windows / macOS | AirPlay (version unverified) | ✓ | ✓ | ? | — | Emphasis on mirroring, recording and several simultaneous displays. |
| [LonelyScreen](https://www.lonelyscreen.com/) | Windows / macOS | AirPlay (version unverified) | ? | ✓ | — | — | iPhone and iPad mirroring. |

### Hardware and DIY

| Project | Platform | Protocol / mode | Audio | Mirroring | Video | Multiroom | Notes |
| --- | --- | --- | :---: | :---: | :---: | :---: | --- |
| [rpi-audio-receiver](https://github.com/nicokaiser/rpi-audio-receiver) | Raspberry Pi / Linux | AirPlay 2 (Shairport Sync) | ✓ | — | — | ? | DIY installer for AirPlay 2, Bluetooth and Spotify Connect. Upstream explicitly says in-place upgrades are unsupported; use a clean Raspberry Pi OS installation. |
| [airplay-esp32](https://github.com/rbouteiller/airplay-esp32) | ESP32 / ESP32-S2 / ESP32-S3 / ESP32-C5 | AirPlay 2 (upstream claim) | ✓ | — | — | ✓ | Upstream documents ALAC/AAC and PTP-synchronized multiroom; these are advertised capabilities, not independently tested here. Non-commercial-use license; Bluetooth A2DP is ESP32-board-specific. |
| [raspi-play](https://github.com/N8WM/raspi-play) | Raspberry Pi Zero 2 W | AirPlay 2 via Shairport Sync (tutorial) | ✓ | — | — | ? | Incomplete upstream build guide (ends with 'to be continued'); Shairport Sync and NQPTP must be installed separately. Not a ready-to-install image or tested installer. |

### Linux audio integration

| Project | Platform | Protocol / mode | Audio | Mirroring | Video | Multiroom | Notes |
| --- | --- | --- | :---: | :---: | :---: | :---: | --- |
| [PipeWire RAOP Sink](https://man.archlinux.org/man/extra/pipewire-zeroconf/libpipewire-module-raop-sink.7.en) | Linux / PipeWire | AirPlay 1 / RAOP | ✓ | — | — | — | Linux module that sends RAOP audio. |
| [PipeWire RAOP Discover](https://docs.pipewire.org/page_module_raop_discover.html) | Linux / PipeWire | RAOP discovery | — | — | — | — | Discovery component only, no audio by itself. |
| [PipeWire AirPlay Toggle](https://extensions.gnome.org/extension/7652/pipewire-airplay-toggle/) | Linux / GNOME | RAOP discovery controls | — | — | — | — | Toggles another component, not a standalone sender. |
| [PulseAudio RAOP Modules](https://www.freedesktop.org/wiki/Software/PulseAudio/Documentation/User/Modules/#module-raop-discover) | Linux / PulseAudio | AirPlay 1 / RAOP | ✓ | — | — | — | RAOP sink and discovery modules. |

### Libraries and protocol implementations

| Project | Platform | Protocol / mode | Audio | Mirroring | Video | Multiroom | Notes |
| --- | --- | --- | :---: | :---: | :---: | :---: | --- |
| [java-airplay-lib](https://github.com/serezhka/java-airplay-lib) | Java / cross-platform | AirPlay 2 (project claim) | ✓ | ✓ | ? | — | Library for building receivers; not a ready-to-run app. |
| [node-appletv](https://github.com/evandcoleman/node-appletv) | Node.js | Apple TV control (not streaming) | — | — | — | — | Media Remote Protocol and control operations. |
| [AirPlay SDK](https://github.com/xfirefly/Airplay-SDK) | Android / Windows SDK | AirPlay (version unverified) | ✓ | ✓ | ? | ? | Commercial SDK; licensing determines source availability. |
| [apsdk-public](https://github.com/air-display/apsdk-public) | C++ / cross-platform | AirPlay (version unverified) | — | ✓ | ? | — | Video-oriented implementation; verify exact media modes upstream. |

### Historical implementations

| Project | Platform | Protocol / mode | Audio | Mirroring | Video | Multiroom | Notes |
| --- | --- | --- | :---: | :---: | :---: | :---: | --- |
| [Android2Apple4Music](https://github.com/MarcPelberg/android2apple4music) | Android (archived project) | AirPlay audio sender (version not specified) | ✓ | — | — | ? | Android playback capture only from apps that permit it; no screen mirroring or DRM bypass. Upstream tested a HomePod 2nd gen; project repository is archived. |
| [AirSonos](https://github.com/stephen/airsonos) | Node.js / Sonos | AirPlay 1 / RAOP | ✓ | — | — | — | Maintainer-archived legacy Sonos-to-AirPlay bridge, not for new installations. |
| [ShairPort](https://github.com/abrasive/shairport) | Legacy cross-platform | AirPlay 1 / RAOP | ✓ | — | — | — | Historical AirPort Express emulator. |
| [ShairPlay](https://github.com/juhovh/shairplay) | Legacy library | AirPlay 1 | ✓ | ? | ? | — | Early protocol implementation, not actively developed. |
| [playfair](https://github.com/FD-/RPiPlay/tree/master/lib/playfair) | C library | FairPlay component, not streaming | — | — | — | — | Cryptographic building block, not an audio/video endpoint. |

## Discovery, research, and other references

These README entries are not themselves general-purpose streaming senders/receivers. Including them here ensures the main list and this reference stay synchronized without giving troubleshooting or documentation resources misleading media capability ticks.

| Resource | README section | Why it is here |
| --- | --- | --- |
| [Avahi](https://www.avahi.org/) | Debugging and Discovery | mDNS/Zeroconf service discovery, not a media endpoint. |
| [Discovery for macOS](https://apps.apple.com/us/app/discovery-dns-sd-browser/id1381004916) | Debugging and Discovery | macOS Bonjour/DNS-SD browser, formerly Bonjour Browser. |
| [Discovery for iOS](https://apps.apple.com/us/app/discovery-dns-sd-browser/id305441017) | Debugging and Discovery | iOS/iPadOS DNS-SD browser for identifying advertised services. |
| [Wireshark](https://www.wireshark.org/) | Debugging and Discovery | Packet analyzer for discovering AirPlay protocol issues. |
| [tcpdump](https://www.tcpdump.org/) | Debugging and Discovery | Command-line packet capture for debugging. |
| [Auto Accept AirPlay Requests](https://github.com/duddu/auto-accept-airplay-requests) | Debugging and Discovery | Trusted-local-network helper for receiver permission dialogs. |
| [AirBorne by Oligo Security](https://www.oligo.security/blog/airborne) | Security Research | AirPlay vulnerability research and defensive analysis. |
| [Apple Security Releases](https://support.apple.com/en-us/100100) | Security Research | Official vulnerability and patch tracking. |
| [Apple Platform Security](https://support.apple.com/guide/security/welcome/web) | Security Research | Apple platform security documentation. |
| [Emanuele Cozzi's AirPlay 2 Notes](https://emanuelecozzi.net/docs/airplay2/) | Protocol Notes | Unpublished-protocol reverse-engineering notes. |
| [Unofficial AirPlay Protocol Specification](https://nto.github.io/AirPlay.html) | Protocol Notes | AirPlay and AirTunes specification reference. |
| [pyatv AirPlay Stream Documentation](https://pyatv.dev/development/stream/) | Protocol Notes | Development documentation for streaming in pyatv. |
| [Awesome Home Assistant](https://github.com/frenck/awesome-home-assistant) | Related Awesome Lists | Related resource collection, not a single receiver. |
| [Awesome Self Hosted](https://github.com/awesome-selfhosted/awesome-selfhosted) | Related Awesome Lists | Related resource collection, not a single receiver. |
| [Awesome Broadcasting](https://github.com/ebu/awesome-broadcasting) | Related Awesome Lists | Related resource collection, not a single receiver. |
| [Awesome Audio Visualization](https://github.com/willianjusten/awesome-audio-visualization) | Related Awesome Lists | Related resource collection, not a single receiver. |

## Maintenance

**In every PR that adds, removes, renames, or changes a resource in the README, update this file in the same PR.** Add streaming software/hardware to the corresponding table with its documented protocol, platform, feature columns and known limitations. Non-streaming documentation, tools, security research, and related lists belong in the reference table.

Consult primary documentation, license and releases where possible. Record limitations such as legacy modes, HLS-only video, DRM restrictions, build flags, and no multiroom. If unsure, use **?**; never infer the full AirPlay 2 feature set from a logo, product name, pairing support, or a claim of compatibility with an AirPlay 2 device.

Run `node scripts/check-compatibility.mjs` and `node --test tests/check-compatibility.test.mjs` after editing. They verify index coverage, section alignment, table shape, feature-flag syntax, and tag limits, **not** actual upstream feature claims or live link reachability.
