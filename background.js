chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "copySelectedLinks",
    title: "Copy Highlighted Links",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "copySelectedLinks") {
    chrome.tabs.sendMessage(tab.id, { action: "getSelectedLinks" });
  }
});

