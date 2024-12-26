# Copy Highlighted Links

A simple Chrome extension that lets you copy URLs from highlighted text. Just select any text containing links, right-click, and choose "Copy Selected Links" to copy all URLs to your clipboard.

## Features

- Copy URLs from any links within highlighted text
- Works on any webpage
- Simple right-click menu integration
- Clean, minimal interface
- No extra permissions required

## Installation

Since this extension isn't in the Chrome Web Store, you'll need to install it as an unpacked extension:

1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked"
5. Select the directory containing the extension files

## Usage

1. Select (highlight) any text containing links on a webpage
2. Right-click the selection
3. Choose "Copy Selected Links" from the context menu
4. The URLs are now in your clipboard, ready to paste

## Files

- `manifest.json` - Extension configuration
- `background.js` - Background service worker
- `content.js` - Content script for link detection
- `icon-16.png`, `icon-48.png`, `icon-128.png` - Extension icons

## Permissions

- `activeTab` - Access the current tab
- `clipboardWrite` - Copy links to clipboard
- `contextMenus` - Add right-click menu option

## Credit

This extension was inspired by the now-defunct "Copy Selected Links" Firefox/Chrome extension, which was a victim of manifest V2 deprecation. This is a simplified, modern remake using manifest V3, and a modernized and simplified code approach.

## License

This project is open source and available under the MIT License.

## Contributing

Feel free to open issues or submit pull requests if you have suggestions for improvements or bug fixes.

