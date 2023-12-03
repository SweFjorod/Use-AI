// content.js

// Function to handle generating trades on the page
function generateTradesOnPage() {
    chrome.runtime.sendMessage({ action: 'getCurrentUrl' }, function(response) {
        console.log('Response:', response);

        if (response && response.url !== null) {
            const isOnYoutube = response.url.includes("youtube.com");
            console.log(`Is on YouTube: ${isOnYoutube}`);
            // Add your logic here to generate and execute trades
        } else {
            console.error("Error getting current URL:", response);
        }
    });
}

// Signal to the background script that the content script is ready
chrome.runtime.sendMessage({ action: 'contentScriptReady' }, function(response) {
    if (response === 'backgroundReady') {
        // Content script is ready; now try to generate trades
        generateTradesOnPage();
    }
});


document.addEventListener('DOMContentLoaded', function () {
    const totalProfitSlider = document.getElementById('totalProfitSlider');
    const totalProfitValue = document.getElementById('totalProfitValue');
    const numTradesSlider = document.getElementById('numTradesSlider');
    const numTradesValue = document.getElementById('numTradesValue');
    const generateTradesBtn = document.getElementById('generateTradesBtn');

    // Initialize values on page load
    updateValue('totalProfit');
    updateValue('numTrades');

    totalProfitSlider.addEventListener('input', function () {
        updateValue('totalProfit');
    });

    numTradesSlider.addEventListener('input', function () {
        updateValue('numTrades');
    });

    generateTradesBtn.addEventListener('click', function () {
        // Call the injected function to check the current webpage URL
        generateTradesOnPage();
    });

    function updateValue(sliderType) {
        const slider = document.getElementById(`${sliderType}Slider`);
        const valueSpan = document.getElementById(`${sliderType}Value`);

        // Parse the slider value as a float to ensure correct treatment
        const sliderValue = parseFloat(slider.value);

        // Display the value with one decimal place
        valueSpan.textContent = sliderValue.toFixed(1);

        // Log the slider value for debugging
        console.log(`Slider value: ${slider.value}`);
    }
});
