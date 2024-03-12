/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/weather.js":
/*!************************!*\
  !*** ./src/weather.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   weather: () => (/* binding */ weather)
/* harmony export */ });
function weather(){
    const data = {}
    const getData = ()=> {return data}
    async function loadInfo(location){
        try{
            let response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=f8abbef2852443bc969152457240603&q=${location}&days=3`,{mode:'cors'})
            let weather = await response.json()
            data.location = `${weather.location.name} - ${weather.location.country}`
            data.tempC = `${weather.current.temp_c}° C`
            data.tempF = `${weather.current.temp_f}° F`
            data.status = `${weather.current.condition.text}`
            data.humidity = weather.current.humidity
            data.icon = weather.current.condition.icon
            data.max = `${weather.forecast.forecastday[0].day.maxtemp_c}° C`
            data.min = `${weather.forecast.forecastday[0].day.mintemp_c}° C`
            data.rain = weather.forecast.forecastday[0].day.daily_chance_of_rain
            data.date = new Date(weather.location.localtime)
            return true
        }catch(e){
            console.log(e);
            return false
        }
    }
    return {loadInfo, getData}
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***********************!*\
  !*** ./src/script.js ***!
  \***********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _weather_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./weather.js */ "./src/weather.js");

const locInput = document.getElementById("loc")
const btn = document.getElementById("btn")
const info = document.getElementById("info")
const zone = document.getElementById("zone")
const img = document.getElementById("icon")
const w = new _weather_js__WEBPACK_IMPORTED_MODULE_0__.weather()
let wInfo = {}
btn.addEventListener('click', async()=>{
    if(locInput.validity.valid && await w.loadInfo(locInput.value)){
        wInfo = w.getData()
        img.setAttribute("src", wInfo.icon)
        img.style.visibility = 'visible'
        info.style.visibility = 'visible'
        zone.style.visibility = 'visible'

        editElement("location",wInfo.location)
        editElement("temp",wInfo.tempC)
        editElement("current-minmax",`${wInfo.min} - ${wInfo.max}`)
        editElement("status",wInfo.status)
        editElement("rain", `Rain: ${wInfo.rain}%`)
        editElement("humidity",`Humidity: ${wInfo.humidity}%`)
        editElement("date", wInfo.date.toLocaleDateString('en-EN', {weekday: 'long', day: 'numeric', month: 'long',}))
        
    }else{
        console.error("Invalid Input")
    }
})
function getElement(id){
    return document.getElementById(id)
}
function editElement(id, text){
    return document.getElementById(id).textContent = text
}

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map