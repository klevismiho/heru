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
/*!******************************************!*\
  !*** ./blocks/tabs-with-content/view.js ***!
  \******************************************/
__webpack_require__.r(__webpack_exports__);
/**
 * Tabs with Content Block - Frontend Interactivity
 */

document.addEventListener('DOMContentLoaded', function () {
  // Find all tab containers on the page
  const tabContainers = document.querySelectorAll('.wp-block-heru-tabs-with-content');
  tabContainers.forEach(container => {
    const tabs = container.querySelectorAll('.tab');
    const tabContents = container.querySelectorAll('.tab-content');

    // Add click event listener to each tab
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', function (e) {
        e.preventDefault();

        // Remove active class from all tabs
        tabs.forEach(t => t.classList.remove('is-active'));

        // Add active class to clicked tab
        tab.classList.add('is-active');

        // Hide all tab content
        tabContents.forEach(content => {
          content.style.display = 'none';
          content.classList.remove('is-active');
        });

        // Show corresponding tab content
        if (tabContents[index]) {
          tabContents[index].style.display = 'flex';
          tabContents[index].classList.add('is-active');
        }
      });
    });

    // Initialize: show first tab content by default
    if (tabContents.length > 0) {
      tabContents[0].style.display = 'flex';
      tabContents[0].classList.add('is-active');
    }
  });
});
/******/ })()
;
//# sourceMappingURL=view.js.map