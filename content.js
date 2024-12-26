function getSelectedLinks() {
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  const container = range.commonAncestorContainer;
  const links = [];

  // Function to check if an element is within the selection
  function isElementInSelection(element) {
    const range = selection.getRangeAt(0);
    return range.intersectsNode(element);
  }

  // Find all links within the container
  const allLinks = container.parentElement.getElementsByTagName('a');
  for (const link of allLinks) {
    if (isElementInSelection(link)) {
      links.push({
        text: link.textContent.trim(),
        url: link.href
      });
    }
  }

  return links;
}

// Handle messages from the background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getSelectedLinks") {
    const links = getSelectedLinks();
    if (links.length > 0) {
      const text = links.map(link => `${link.url}`).join('\n');
      navigator.clipboard.writeText(text).then(() => {
        // Optional: Show a notification that links were copied
        chrome.runtime.sendMessage({ 
          action: "showNotification",
          message: `Copied ${links.length} link(s) to clipboard`
        });
      });
    }
  }
});

