// background.js
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "copySelectedLinks",
    title: "Copy Highlighted Links",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "copySelectedLinks" && tab?.id) {
    try {
      // Check if we can access the tab
      if (tab.url.startsWith('chrome://') || tab.url.startsWith('chrome-extension://')) {
        chrome.notifications.create({
          type: 'basic',
          iconUrl: 'icon-128.png',
          title: 'Copy Highlighted Links',
          message: 'Cannot access links on Chrome system pages'
        });
        return;
      }

      const [result] = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: async () => {
          const selection = window.getSelection();
          if (!selection || selection.rangeCount === 0) return { 
            success: false, 
            message: 'No text selected'
          };
          
          const range = selection.getRangeAt(0);
          const container = range.commonAncestorContainer;
          const links = [];

          function isElementInSelection(element) {
            return range.intersectsNode(element);
          }

          const parentElement = container.nodeType === 1 ? container : container.parentElement;
          const allLinks = parentElement.getElementsByTagName('a');
          
          for (const link of allLinks) {
            if (isElementInSelection(link)) {
              links.push(link.href);
            }
          }

          if (links.length > 0) {
            const text = links.join('\n');
            try {
              await navigator.clipboard.writeText(text);
              return { 
                success: true, 
                message: `Copied ${links.length} link${links.length === 1 ? '' : 's'} to clipboard`
              };
            } catch (err) {
              return { 
                success: false, 
                message: `Clipboard access denied: ${err.message}` 
              };
            }
          }
          return { 
            success: false, 
            message: 'No links found in selection' 
          };
        }
      });

      // Show notification based on the result
      if (result.result) {
        chrome.notifications.create({
          type: 'basic',
          iconUrl: 'icon-128.png',
          title: 'Copy Highlighted Links',
          message: result.result.message
        });
      }

    } catch (err) {
      // Show specific error notification
      let errorMessage = 'Error executing copy operation';
      
      // Handle specific error cases
      if (err.message.includes('cannot be scripted')) {
        errorMessage = 'Cannot access links on this page due to browser restrictions';
      } else if (err.message.includes('Permission denied')) {
        errorMessage = 'Permission denied to access page content';
      } else if (err.message.includes('The extensions gallery cannot be scripted')) {
        errorMessage = 'Cannot access links in the Chrome Web Store';
      }

      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icon-128.png',
        title: 'Copy Highlighted Links',
        message: errorMessage
      });
    }
  }
});

