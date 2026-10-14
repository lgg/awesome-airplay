# Awesome AirPlay [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

> A curated list of AirPlay receivers, senders, bridges, libraries, protocol notes, debugging tools, and security research.

AirPlay is Apple's wireless media protocol family for audio, video, screen mirroring, and device discovery. This list focuses on practical tools for Linux, Windows, Android, Raspberry Pi, home audio, development, and defensive research.

## Contents

- [Resource Labels](#resource-labels)
- [Audio Receivers](#audio-receivers)
- [Screen Mirroring Receivers](#screen-mirroring-receivers)
- [Senders and Desktop Clients](#senders-and-desktop-clients)
- [Android](#android)
- [Bridges and Multiroom](#bridges-and-multiroom)
- [Commercial Receivers](#commercial-receivers)
- [Hardware and DIY](#hardware-and-diy)
- [Linux Audio Stack](#linux-audio-stack)
- [Libraries and Protocol Implementations](#libraries-and-protocol-implementations)
- [Debugging and Discovery](#debugging-and-discovery)
- [Security Research](#security-research)
- [Protocol Notes](#protocol-notes)
- [Historical Projects](#historical-projects)
- [Related Awesome Lists](#related-awesome-lists)

## Resource Labels

These labels describe the resources listed below (reviewed October 2026):

`Open Source`: Software distributed under an open-source license; source availability and pricing are separate.

`Free`: The resource's listed core functionality or information is available without payment.

`Freemium`: A useful free tier or workflow is available, with paid enhancements, higher usage limits, or additional features.

`Paid`: Meaningful ongoing use generally requires payment; a limited trial or demo may be available.

Licensing, pricing, and availability may change. Self-hosting and hardware can entail additional costs. Publicly visible source code alone does **not** establish an open-source license; absence of `Open Source` does **not** prove a project is proprietary. The labels describe the linked resource rather than every third-party service it integrates with. Related Awesome Lists are indexes of other collections and are intentionally unlabelled.

## Audio Receivers

- [Shairport Sync](https://github.com/mikebrady/shairport-sync) - `Open Source` `Free` — AirPlay and AirPlay 2 audio player for Linux, FreeBSD, and OpenBSD with synchronization, metadata, MQTT, D-Bus, and MPRIS-style integrations.
- [OwnTone](https://owntone.github.io/owntone-server/) - `Open Source` `Free` — Open-source media server for GNU/Linux, FreeBSD, and macOS that can stream a local library to AirPlay, Chromecast, Roku, and local audio outputs.
- [openairplay/airplay2-receiver](https://github.com/openairplay/airplay2-receiver) - `Free` — Experimental Python AirPlay 2 receiver implementation for protocol study and functional audio receiving.
- [openairplay/goplay2](https://github.com/openairplay/goplay2) - `Open Source` `Free` — AirPlay 2 speaker implementation written in Go, useful for studying a smaller receiver codebase.
- [Airplay.App](https://github.com/natsurainko/Airplay.App) - `Open Source` `Free` — Windows-focused AirPlay receiver with audio streaming, screen mirroring, and multi-device support.

## Screen Mirroring Receivers

- [UxPlay](https://github.com/FDH2/UxPlay) - `Open Source` `Free` — Unix AirPlay mirroring server for Linux, macOS, BSD, and Windows, built around GStreamer.
- [RPiPlay](https://github.com/FD-/RPiPlay) - `Open Source` `Free` — AirPlay mirroring receiver originally optimized for Raspberry Pi hardware.
- [java-airplay-server](https://github.com/serezhka/java-airplay-server) - `Open Source` `Free` — Java AirPlay server that acts like an Apple TV for mirroring experiments.
- [airplayreceiver](https://github.com/SteeBono/airplayreceiver) - `Open Source` `Free` — C# implementation of AirPlay 2 mirroring and audio protocol for testing across Windows, macOS, and Linux.
- [AirPlay-Windows](https://github.com/moieric11/AirPlay-Windows) - `Free` — Native Windows AirPlay 2 receiver for mirroring and RAOP audio without Bonjour SDK or Apple runtime dependencies.
- [UxPlay-NoBonjour](https://github.com/Kylepossible/uxplay-nobonjour) - `Open Source` `Free` — Windows-focused UxPlay fork that replaces the Bonjour service dependency with an embedded mDNS responder.
- [AirGlass](https://github.com/jdkuk/AirGlass) - `Open Source` `Freemium` — GPL-3.0 AirPlay receiver for Windows 10/11 supporting screen mirroring and ALAC audio playback, with built-in mDNS discovery. Free full-screen mode; optional paid floating-window features.
- [PiP](https://github.com/amitv87/PiP) - `Open Source` `Free` — macOS picture-in-picture utility with AirPlay receiver support for multiple parallel sessions.

## Senders and Desktop Clients

- [TuneBlade](https://www.tuneblade.com/) - `Freemium` — Windows tray utility for streaming system-wide audio to AirPlay receivers, including Apple TV, AirPort Express, AirPlay speakers, and Shairport-based receivers.
- [AirSend](https://github.com/Pabldi08/AirSend) - `Open Source` `Free` — Open-source Windows to HomePod AirPlay 2 audio sender written with Rust and Tauri.
- [pyatv](https://pyatv.dev/) - `Open Source` `Free` — Python library and CLI for discovering, controlling, and streaming to Apple TV, HomePod, AirPort Express, and AirPlay receivers.
- [Airfoil](https://rogueamoeba.com/airfoil/mac/) - `Paid` — Commercial macOS and Windows app for routing audio to AirPlay, Bluetooth, Chromecast, Sonos, and local outputs.
- [AirParrot](https://www.airsquirrels.com/airparrot/) - `Paid` — Commercial desktop screen mirroring and media streaming app for sending to AirPlay, Google Cast, and Miracast receivers.

## Android

- [AirMusic](https://www.airmusic.app/portal/) - `Paid` — Android app for streaming audio from many apps to AirPlay, DLNA, Sonos, Google Cast, HEOS, Fire TV, Roku, and other receivers. A free trial is available; uninterrupted streaming requires a paid license.
- [AirScreen](https://www.airscreen.app/) - `Freemium` — Android receiver app for AirPlay, Google Cast, Miracast, and DLNA, commonly used on Android TV boxes and Fire TV devices.
- [AirPin PRO](https://play.google.com/store/apps/details?id=com.waxrain.airplaydmr3) - `Paid` — Android AirPlay and DLNA receiver for phones, tablets, TV boxes, and projectors.
- [AirReceiver](https://play.google.com/store/apps/details?id=com.softmedia.receiver) - `Paid` — Android TV and Android box receiver for AirPlay, Google Cast, wireless display, and DLNA.
- [AriaCast Receiver](https://www.music-assistant.io/plugins/ariacast-receiver/) - `Open Source` `Free` — Music Assistant plugin for receiving high-quality audio streamed from Android devices over an AirPlay-like local path.
- [ScreenDock](https://github.com/tarek369/screendock) - `Open Source` `Freemium` — Open-source (GPLv3) AirPlay receiver for Android and Android TV, supporting screen mirroring, audio, and video. The Google Play version offers limited free sessions and an optional one-time Pro unlock.

## Bridges and Multiroom

- [AirConnect](https://github.com/philippe44/AirConnect) - `Open Source` `Free` — Bridge that exposes UPnP, Sonos, and Chromecast players as virtual AirPlay devices.
- [BabelPod](https://github.com/afaden/BabelPod) - `Open Source` `Free` — Audio relay project for bridging AirPlay, Chromecast, Bluetooth, and local audio devices.
- [AirSonos](https://github.com/stephen/airsonos) - `Open Source` `Free` — Historical bridge that made Sonos speakers appear as AirPlay receivers.

## Commercial Receivers

- [AirServer](https://www.airserver.com/Overview) - `Paid` — Commercial receiver for AirPlay, Google Cast, and Miracast on Windows, macOS, Xbox, Surface Hub, and dedicated hardware.
- [Reflector](https://www.airsquirrels.com/reflector) - `Paid` — Commercial AirPlay, Google Cast, and Miracast receiver for macOS and Windows with recording and multi-device mirroring.
- [LonelyScreen](https://www.lonelyscreen.com/) - `Paid` — AirPlay receiver for Windows and macOS focused on iPhone and iPad screen mirroring.

## Hardware and DIY

- [rpi-audio-receiver](https://github.com/nicokaiser/rpi-audio-receiver) - `Open Source` `Free` — Raspberry Pi audio receiver setup with AirPlay 2, Bluetooth A2DP, and Spotify Connect.
- [airplay-esp32](https://github.com/rbouteiller/airplay-esp32) - `Free` — ESP32 and ESP32-S3 AirPlay 2 audio receiver for building low-cost wireless speakers; licensed for non-commercial use.
- [raspi-play](https://github.com/N8WM/raspi-play) - `Free` — Tutorial for building a compact Raspberry Pi Zero 2 W AirPlay 2 audio receiver.

## Linux Audio Stack

- [PipeWire RAOP Sink](https://man.archlinux.org/man/extra/pipewire-zeroconf/libpipewire-module-raop-sink.7.en) - `Open Source` `Free` — PipeWire module for streaming Linux audio to AirPlay devices.
- [PipeWire RAOP Discover](https://docs.pipewire.org/page_module_raop_discover.html) - `Open Source` `Free` — PipeWire discovery module for automatically finding AirPlay receivers on the local network.
- [PipeWire AirPlay Toggle](https://extensions.gnome.org/extension/7652/pipewire-airplay-toggle/) - `Open Source` `Free` — GNOME Shell extension for toggling PipeWire or PulseAudio AirPlay discovery from Quick Settings.
- [PulseAudio RAOP Modules](https://www.freedesktop.org/wiki/Software/PulseAudio/Documentation/User/Modules/#module-raop-discover) - `Open Source` `Free` — PulseAudio modules for discovering and sending audio to RAOP and AirPlay devices.

## Libraries and Protocol Implementations

- [java-airplay-lib](https://github.com/serezhka/java-airplay-lib) - `Open Source` `Free` — Java library for creating AirPlay 2 servers that behave like Apple TV.
- [node-appletv](https://github.com/evandcoleman/node-appletv) - `Open Source` `Free` — Node.js library for controlling Apple TV devices over local network protocols.
- [AirPlay SDK](https://github.com/xfirefly/Airplay-SDK) - `Paid` — Commercial Android and Windows AirPlay receiver SDK and sample binaries; source-code licensing is offered for sale.
- [apsdk-public](https://github.com/air-display/apsdk-public) - `Open Source` `Free` — C++ AirPlay server implementation for receiver development and protocol reference.

## Debugging and Discovery

- [Avahi](https://www.avahi.org/) - `Open Source` `Free` — Zeroconf and mDNS implementation used on Linux to discover AirPlay and RAOP services.
- [Bonjour Browser](https://www.tildesoft.com/) - `Free` — macOS utility for browsing Bonjour and mDNS services, useful when checking AirPlay advertisements.
- [Discovery](https://apps.apple.com/us/app/discovery-dns-sd-browser/id305441017) - `Free` — iOS and macOS DNS-SD browser for inspecting AirPlay, RAOP, and companion services.
- [Wireshark](https://www.wireshark.org/) - `Open Source` `Free` — Packet analyzer for inspecting mDNS, RTSP, RTP, HTTP, and TLS traffic around AirPlay sessions.
- [tcpdump](https://www.tcpdump.org/) - `Open Source` `Free` — Command-line packet capture tool for recording AirPlay discovery and streaming traffic before deeper analysis.
- [Auto Accept AirPlay Requests](https://github.com/duddu/auto-accept-airplay-requests) - `Open Source` `Free` — macOS helper that automatically accepts AirPlay receiver prompts for trusted local setups.

## Security Research

- [AirBorne by Oligo Security](https://www.oligo.security/blog/airborne) - `Free` — Research on vulnerabilities in AirPlay and the AirPlay SDK affecting Apple and third-party devices.
- [Apple Security Releases](https://support.apple.com/en-us/100100) - `Free` — Official Apple security update index for tracking fixes that may affect AirPlay, tvOS, HomePod, iOS, iPadOS, and macOS.
- [Apple Platform Security](https://support.apple.com/guide/security/welcome/web) - `Free` — Apple's security guide for understanding platform controls around local networking, pairing, and media services.
- [Protocol Prying](https://arxiv.org/abs/2606.26967) - `Free` — Academic work on reverse engineering and fuzzing proximity transfer protocols such as AirDrop and Quick Share, useful as a methodology reference for closed local-network protocols.

## Protocol Notes

- [Emanuele Cozzi's AirPlay 2 Notes](https://emanuelecozzi.net/docs/airplay2/) - `Free` — Reverse-engineering notes covering AirPlay 2 receiver behavior and protocol details.
- [Unofficial AirPlay Protocol Specification](https://nto.github.io/AirPlay.html) - `Free` — Unofficial documentation of AirPlay and AirTunes behavior.
- [pyatv AirPlay Stream Documentation](https://pyatv.dev/development/stream/) - `Free` — Developer notes on pyatv's AirPlay and RAOP streaming support.

## Historical Projects

- [ShairPort](https://github.com/abrasive/shairport) - `Open Source` `Free` — Original open-source AirPort Express emulator that influenced later AirPlay audio receivers.
- [ShairPlay](https://github.com/juhovh/shairplay) - `Open Source` `Free` — Early AirPlay audio server library with FairPlay-related work used by later receiver projects.
- [playfair](https://github.com/FD-/RPiPlay/tree/master/lib/playfair) - `Open Source` `Free` — FairPlay-related code bundled in RPiPlay and UxPlay lineage.

## Related Awesome Lists

- [Awesome Home Assistant](https://github.com/frenck/awesome-home-assistant) - Home automation tools and integrations that often overlap with AirPlay, Apple TV, and media routing.
- [Awesome Self Hosted](https://github.com/awesome-selfhosted/awesome-selfhosted) - Self-hosted services, including media servers and home-network tools.
- [Awesome Broadcasting](https://github.com/ebu/awesome-broadcasting) - Broadcasting, streaming, audio, and video tooling.
- [Awesome Audio Visualization](https://github.com/willianjusten/awesome-audio-visualization) - Audio analysis and visualization resources that pair well with media streaming experiments.
