# TikTok-safe Smart App Link

A tiny static landing page that safely funnels users from TikTok and other in-app browsers to your App Store / Google Play page. In-app browsers (especially TikTok) often block direct App Store redirects; this page detects those environments and shows clear "Open in browser" instructions. If the link opens in a normal browser, it auto-redirects to the correct store.

## How to use

Deploy this folder to any static host (e.g., Netlify, Vercel, GitHub Pages). Then share a single link with query params that point to your store pages.

Base URL:

```
https://YOUR_DOMAIN/
```

Supported query params:

- `name` – Your app name (used in headings). Example: `Genesis`
- `ios` – Full App Store URL (or `itms-apps://` deep link)
- `android` – Full Google Play URL
- `icon` – Optional icon image URL (square works best)
- `fallback` – Optional fallback website if no platform match
- `autoredirect` – Set to `false` to disable auto-redirect in normal browsers

### Example links

- iOS + Android:

```
https://YOUR_DOMAIN/?name=Genesis&ios=https%3A%2F%2Fapps.apple.com%2Fapp%2Fid1234567890&android=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dcom.example.genesis&icon=https%3A%2F%2Fyourcdn.com%2Fgenesis-icon.png
```

- iOS only with auto-redirect:

```
https://YOUR_DOMAIN/?name=Genesis&ios=https%3A%2F%2Fapps.apple.com%2Fapp%2Fid1234567890
```

- Disable auto-redirect (always show the page):

```
https://YOUR_DOMAIN/?name=Genesis&ios=https%3A%2F%2Fapps.apple.com%2Fapp%2Fid1234567890&autoredirect=false
```

## How it works

- Detects TikTok/Instagram/Facebook/Twitter/Snapchat in-app browsers via `navigator.userAgent`.
- If inside an in-app browser, shows a card with exact instructions: tap `...` then "Open in browser". No redirect to avoid blocks.
- Outside in-app browsers, immediately redirects users to the appropriate store (iOS -> App Store, Android -> Google Play). If both are provided, platform decides; if neither is provided, the page simply shows the button and optional `fallback`.

## Tip for TikTok bio

Add this single link to your TikTok bio. The page will show the TikTok-specific instruction, then forward users to the store once they open in Safari/Chrome.

## Customization

- Edit `styles.css` for colors and typography.
- Replace the default auto-generated icon by passing `?icon=...` or by changing the SVG in `main.js`.

## Local testing

Open `index.html` in your desktop browser with query params to preview. To simulate in-app browser behavior, test on your phone from the TikTok app.

## License

MIT
