/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	const __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
let __webpack_exports__ = {};
/*!******************************!*\
  !*** ./blocks/popup/view.js ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
document.addEventListener('DOMContentLoaded', () => {
  const popup = document.querySelector('.heru-popup');
  if (!popup) {
    return;
  }
  const closeButton = popup.querySelector('.heru-popup__close');
  const showOnce = popup.dataset.showOnce === 'true';
  const delay = Number(popup.dataset.delay) * 1000;
  const storageKey = 'heru_popup_seen';

  // Check if user already saw popup
  if (showOnce && localStorage.getItem(storageKey)) {
    return;
  }
  const showPopup = () => {
    popup.classList.add('is-visible');
    if (showOnce) {
      localStorage.setItem(storageKey, 'true');
    }
  };

  // Delay
  if (delay > 0) {
    setTimeout(showPopup, delay);
  } else {
    showPopup();
  }

  // Close
  closeButton?.addEventListener('click', () => {
    popup.classList.remove('is-visible');
  });
});
/******/ })()
;
//# sourceMappingURL=view.js.map