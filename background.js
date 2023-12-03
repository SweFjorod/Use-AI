// background.js

let lastFocusedTabId = null;

// Use the appropriate API based on the browser
const browserAPI = typeof chrome !== 'undefined' ? chrome : browser;

browserAPI.tabs.onActivated.addListener(function (activeInfo) {
    lastFocusedTabId = activeInfo.tabId;
});

browserAPI.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'getCurrentUrl') {
        browserAPI.tabs.get(lastFocusedTabId, function(tab) {
            const url = tab?.url;
            console.log('Getting current URL:', url);

            if (url) {
                sendResponse({ url: url });
            } else {
                console.error('Error getting current URL: undefined');
                sendResponse({ url: null }); // Send a response with a null URL
            }
        });

        // Return true to indicate that sendResponse will be called asynchronously
        return true;
    } else if (request.action === 'contentScriptReady') {
        sendResponse('backgroundReady');
        return true;
    }
});
