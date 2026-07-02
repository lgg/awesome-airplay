# Awesome AirPlay [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

> A curated list of AirPlay receivers, senders, bridges, libraries, protocol notes, debugging tools, and security research.

AirPlay is Apple's wireless media protocol family for audio, video, screen mirroring, and device discovery. This list focuses on practical tools for Linux, Windows, Android, Raspberry Pi, home audio, development, and defensive research.

## Contents

- [Audio Receivers](#audio-receivers)
- [Screen Mirroring Receivers](#screen-mirroring-receivers)
- [Senders and Desktop Clients](#senders-and-desktop-clients)
- [Android](#android)
- [Bridges and Multiroom](#bridges-and-multiroom)
- [Linux Audio Stack](#linux-audio-stack)
- [Libraries and Protocol Implementations](#libraries-and-protocol-implementations)
- [Debugging and Discovery](#debugging-and-discovery)
- [Security Research](#security-research)
- [Protocol Notes](#protocol-notes)
- [Historical Projects](#historical-projects)
- [Related Awesome Lists](#related-awesome-lists)

## Audio Receivers

- [Shairport Sync](https://github.com/mikebrady/shairport-sync) - AirPlay and AirPlay 2 audio player for Linux, FreeBSD, and OpenBSD with synchronization, metadata, MQTT, D-Bus, and MPRIS-style integrations.
- [OwnTone](https://owntone.github.io/owntone-server/) - Open-source media server for GNU/Linux, FreeBSD, and macOS that can stream a local library to AirPlay, Chromecast, Roku, and local audio outputs.
- [openairplay/airplay2-receiver](https://github.com/openairplay/airplay2-receiver) - Experimental Python AirPlay 2 receiver implementation for protocol study and functional audio receiving.
- [openairplay/goplay2](https://github.com/openairplay/goplay2) - AirPlay 2 speaker implementation written in Go, useful for studying a smaller receiver codebase.
- [Airplay.App](https://github.com/natsurainko/Airplay.App) - Windows-focused AirPlay receiver with audio streaming, screen mirroring, and multi-device support.

## Screen Mirroring Receivers

- [UxPlay](https://github.com/FDH2/UxPlay) - Unix AirPlay mirroring server for Linux, macOS, BSD, and Windows, built around GStreamer.
- [RPiPlay](https://github.com/FD-/RPiPlay) - AirPlay mirroring receiver originally optimized for Raspberry Pi hardware.
- [java-airplay-server](https://github.com/serezhka/java-airplay-server) - Java AirPlay server that acts like an Apple TV for mirroring experiments.
- [airplayreceiver](https://github.com/SteeBono/airplayreceiver) - C# implementation of AirPlay 2 mirroring and audio protocol for testing across Windows, macOS, and Linux.

## Senders and Desktop Clients

- [TuneBlade](https://www.tuneblade.com/) - Windows tray utility for streaming system-wide audio to AirPlay receivers, including Apple TV, AirPort Express, AirPlay speakers, and Shairport-based receivers.
- [AirSend](https://github.com/Pabldi08/AirSend) - Open-source Windows to HomePod AirPlay 2 audio sender written with Rust and Tauri.
- [pyatv](https://pyatv.dev/) - Python library and CLI for discovering, controlling, and streaming to Apple TV, HomePod, AirPort Express, and AirPlay receivers.
- [Airfoil](https://rogueamoeba.com/airfoil/mac/) - Commercial macOS and Windows app for routing audio to AirPlay, Bluetooth, Chromecast, Sonos, and local outputs.
- [AirParrot](https://www.airsquirrels.com/airparrot/) - Commercial desktop screen mirroring and media streaming app for sending to AirPlay, Google Cast, and Miracast receivers.

## Android

- [AirMusic](https://www.airmusic.app/portal/) - Android app for streaming audio from many apps to AirPlay, DLNA, Sonos, Google Cast, HEOS, Fire TV, Roku, and other receivers.
- [AirScreen](https://www.airscreen.app/) - Android receiver app for AirPlay, Google Cast, Miracast, and DLNA, commonly used on Android TV boxes and Fire TV devices.
- [AirPin PRO](https://play.google.com/store/apps/details?id=com.waxrain.airplaydmr3) - Android AirPlay and DLNA receiver for phones, tablets, TV boxes, and projectors.
- [AriaCast Receiver](https://www.music-assistant.io/plugins/ariacast-receiver/) - Music Assistant plugin for receiving high-quality audio streamed from Android devices over an AirPlay-like local path.

## Bridges and Multiroom

- [AirConnect](https://github.com/philippe44/AirConnect) - Bridge that exposes UPnP, Sonos, and Chromecast players as virtual AirPlay devices.
- [BabelPod](https://github.com/afaden/BabelPod) - Audio relay project for bridging AirPlay, Chromecast, Bluetooth, and local audio devices.
- [AirSonos](https://github.com/stephen/airsonos) - Historical bridge that made Sonos speakers appear as AirPlay receivers.

## Linux Audio Stack

- [PipeWire RAOP Sink](https://man.archlinux.org/man/extra/pipewire-zeroconf/libpipewire-module-raop-sink.7.en) - PipeWire module for streaming Linux audio to AirPlay devices.
- [PipeWire RAOP Discover](https://docs.pipewire.org/page_module_raop_discover.html) - PipeWire discovery module for automatically finding AirPlay receivers on the local network.
- [PipeWire AirPlay Toggle](https://extensions.gnome.org/extension/7652/pipewire-airplay-toggle/) - GNOME Shell extension for toggling PipeWire or PulseAudio AirPlay discovery from Quick Settings.
- [PulseAudio RAOP Modules](https://www.freedesktop.org/wiki/Software/PulseAudio/Documentation/User/Modules/#module-raop-discover) - PulseAudio modules for discovering and sending audio to RAOP and AirPlay devices.

## Libraries and Protocol Implementations

- [java-airplay-lib](https://github.com/serezhka/java-airplay-lib) - Java library for creating AirPlay 2 servers that behave like Apple TV.
- [node-appletv](https://github.com/evandcoleman/node-appletv) - Node.js library for controlling Apple TV devices over local network protocols.
- [AirPlay SDK](https://github.com/xfirefly/Airplay-SDK) - Android and Windows AirPlay receiver SDK with mirroring and casting support.
- [apsdk-public](https://github.com/air-display/apsdk-public) - C++ AirPlay server implementation for receiver development and protocol reference.

## Debugging and Discovery

- [Avahi](https://www.avahi.org/) - Zeroconf and mDNS implementation used on Linux to discover AirPlay and RAOP services.
- [Bonjour Browser](https://www.tildesoft.com/) - macOS utility for browsing Bonjour and mDNS services, useful when checking AirPlay advertisements.
- [Discovery](https://apps.apple.com/us/app/discovery-dns-sd-browser/id305441017) - iOS and macOS DNS-SD browser for inspecting AirPlay, RAOP, and companion services.
- [Wireshark](https://www.wireshark.org/) - Packet analyzer for inspecting mDNS, RTSP, RTP, HTTP, and TLS traffic around AirPlay sessions.
- [tcpdump](https://www.tcpdump.org/) - Command-line packet capture tool for recording AirPlay discovery and streaming traffic before deeper analysis.

## Security Research

- [AirBorne by Oligo Security](https://www.oligo.security/blog/airborne) - Research on vulnerabilities in AirPlay and the AirPlay SDK affecting Apple and third-party devices.
- [Apple Security Releases](https://support.apple.com/en-us/100100) - Official Apple security update index for tracking fixes that may affect AirPlay, tvOS, HomePod, iOS, iPadOS, and macOS.
- [Apple Platform Security](https://support.apple.com/guide/security/welcome/web) - Apple's security guide for understanding platform controls around local networking, pairing, and media services.
- [Protocol Prying](https://arxiv.org/abs/2606.26967) - Academic work on reverse engineering and fuzzing proximity transfer protocols such as AirDrop and Quick Share, useful as a methodology reference for closed local-network protocols.

## Protocol Notes

- [Emanuele Cozzi's AirPlay 2 Notes](https://emanuelecozzi.net/docs/airplay2/) - Reverse-engineering notes covering AirPlay 2 receiver behavior and protocol details.
- [Unofficial AirPlay Protocol Specification](https://nto.github.io/AirPlay.html) - Unofficial documentation of AirPlay and AirTunes behavior.
- [pyatv AirPlay Stream Documentation](https://pyatv.dev/development/stream/) - Developer notes on pyatv's AirPlay and RAOP streaming support.

## Historical Projects

- [ShairPort](https://github.com/abrasive/shairport) - Original open-source AirPort Express emulator that influenced later AirPlay audio receivers.
- [ShairPlay](https://github.com/juhovh/shairplay) - Early AirPlay audio server library with FairPlay-related work used by later receiver projects.
- [playfair](https://github.com/FD-/RPiPlay/tree/master/lib/playfair) - FairPlay-related code bundled in RPiPlay and UxPlay lineage.

## Related Awesome Lists

- [Awesome Home Assistant](https://github.com/frenck/awesome-home-assistant) - Home automation tools and integrations that often overlap with AirPlay, Apple TV, and media routing.
- [Awesome Self Hosted](https://github.com/awesome-selfhosted/awesome-selfhosted) - Self-hosted services, including media servers and home-network tools.
- [Awesome Broadcasting](https://github.com/ebu/awesome-broadcasting) - Broadcasting, streaming, audio, and video tooling.
- [Awesome Audio Visualization](https://github.com/willianjusten/awesome-audio-visualization) - Audio analysis and visualization resources that pair well with media streaming experiments.
