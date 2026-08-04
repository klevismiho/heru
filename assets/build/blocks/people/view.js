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
/*!*******************************!*\
  !*** ./blocks/people/view.js ***!
  \*******************************/
__webpack_require__.r(__webpack_exports__);
document.querySelectorAll('.js-person-toggle').forEach(summary => {
  summary.addEventListener('click', () => {
    const person = summary.closest('.person');
    const bio = person.querySelector('.person-bio');
    if (person.classList.contains('is-open')) {
      bio.style.maxHeight = null;
    } else {
      bio.style.maxHeight = bio.scrollHeight + 'px';
    }
    person.classList.toggle('is-open');
  });
});
/******/ })()
;
//# sourceMappingURL=view.js.map