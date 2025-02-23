// ==UserScript==
// @name         r/placeDE Template
// @namespace    http://tampermonkey.net/
// @version      8.6
// @description  try to take over the canvas!
// @author       placeDE Devs
// @match        https://garlic-bread.reddit.com/embed*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=reddit.com
// @updateURL    https://github.com/PlaceDE-Official/place-overlay/raw/main/src/scripts/placeDE-overlay.user.js
// @downloadURL  https://github.com/PlaceDE-Official/place-overlay/raw/main/src/scripts/placeDE-overlay.user.js
// ==/UserScript==

var overlayImage = null;
if (window.top !== window.self) {
    window.addEventListener('load', () => {
        const canvasContainer = document.querySelector("garlic-bread-embed").shadowRoot.querySelector("div.layout").querySelector("garlic-bread-canvas").shadowRoot.querySelector("div.container");
        const canvas = canvasContainer.querySelector("canvas");
        overlayImage = document.createElement("img");
        updateImage();
        overlayImage.style = `position: absolute;left: 0;top: 0;image-rendering: pixelated;pointerEvents: 'none';`;
        canvasContainer.appendChild(overlayImage);

        const canvasObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === "attributes") {
                    overlayImage.style.width = mutation.target.getAttribute("width") + "px";
                    overlayImage.style.height = mutation.target.getAttribute("height") + "px";
                }
            });
        });

        canvasObserver.observe(canvas, {
            attributes: true
        });
    }, false);
}

function updateImage() {
    overlayImage.src = "https://place.army/overlay_target.png?" + Date.now()
}

setInterval(function () {overlayImage.src = "https://place.army/overlay_target.png?" + Date.now()}, 30000);
