# Quran APK download page

A responsive, standalone HTML/CSS/JavaScript page. No build step, dependencies, or backend.

The included APK is **Quran v1.0 for ARM64 Android devices**, Android 7.0 or later. It is copied from `Quran-App/AppReleases/Quran.apk` and downloads as `Quran.apk`.

## Open locally

Open `index.html` in your browser, or serve this folder:

```sh
python3 -m http.server 8080
```

Visit `http://localhost:8080`. The download button points directly to `downloads/Quran.apk`, without loading the whole APK into JavaScript memory. Browser download progress appears in the browser's download manager.

## Replace the APK

1. Put the new APK in `downloads/`.
2. Edit `config.js`: update `apkPath`, `filename`, `version`, `bytes`, `architecture`, `requirements`, and `sha256`.
3. Update the fallback download link and release text in `index.html` if the filename/version changes, so the page still works without JavaScript.
4. Use `stat -c '%s' downloads/your-file.apk` and `sha256sum downloads/your-file.apk` for the size and checksum.
5. Commit and push the updated files.

Paths are relative, so the page and APK work together on localhost, any static host, and a GitHub Pages project subdirectory. Keep the `assets/` and `downloads/` folders alongside `index.html`.

GitHub blocks individual Git files over 100 MiB. This ARM64 APK is 69,288,598 bytes and can be tracked normally. For a future APK over that limit, use a GitHub Release asset and put its HTTPS download URL in `config.js` and the HTML fallback link.

## Files

- `index.html`: page, accessible download link, installation instructions.
- `styles.css`: responsive layouts, including small phones and reduced-motion support.
- `config.js`: release information and APK path.
- `script.js`: download-link setup, status message, checksum copying.
- `assets/quran-icon.png`: original app icon.
- `downloads/Quran.apk`: downloadable Android package.

Current SHA-256: `b68c46c928e71589f900191c882a046f9b54e590f15af098c036ec9855516d1a`.
