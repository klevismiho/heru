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
  !*** ./blocks/video/view.js ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
document.querySelectorAll('.video-wrapper').forEach(wrapper => {
  const video = wrapper.querySelector('.hero-video');
  const button = wrapper.querySelector('.video-play-button');
  if (!video || !button) {
    return;
  }
  button.addEventListener('click', () => {
    video.controls = true;
    video.play();
    button.style.display = 'none';
  });
});
/******/ })()
;
//# sourceMappingURL=view.js.map