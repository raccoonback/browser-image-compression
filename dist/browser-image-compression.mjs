/**
 * Browser Image Compression
 * v1.0.7
 * by Donald <donaldcwl@gmail.com>
 * https://github.com/Donaldcwl/browser-image-compression
 */

function _defineProperty(e,r,n){return r in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,e}function ownKeys(e,r){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);r&&(t=t.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),n.push.apply(n,t)}return n}function _objectSpread2(e){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(n),!0).forEach((function(r){_defineProperty(e,r,n[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ownKeys(Object(n)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))}))}return e}function _slicedToArray(e,r){return function _arrayWithHoles(e){if(Array.isArray(e))return e}(e)||function _iterableToArrayLimit(e,r){if(!(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)))return;var n=[],t=!0,o=!1,i=void 0;try{for(var a,s=e[Symbol.iterator]();!(t=(a=s.next()).done)&&(n.push(a.value),!r||n.length!==r);t=!0);}catch(e){o=!0,i=e}finally{try{t||null==s.return||s.return()}finally{if(o)throw i}}return n}(e,r)||function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var e="undefined"!=typeof window&&window.cordova&&window.cordova.require&&window.cordova.require("cordova/modulemapper"),CustomFile=e&&e.getOriginalSymbol(window,"File")||File,CustomFileReader=e&&e.getOriginalSymbol(window,"FileReader")||FileReader;function getDataUrlFromFile(e){return new Promise((function(r,n){var t=new CustomFileReader;t.onload=function(){return r(t.result)},t.onerror=function(e){return n(e)},t.readAsDataURL(e)}))}function getFilefromDataUrl(e,r){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:Date.now();return new Promise((function(t){for(var o=e.split(","),i=o[0].match(/:(.*?);/)[1],a=atob(o[1]),s=a.length,c=new Uint8Array(s);s--;)c[s]=a.charCodeAt(s);var l=new Blob([c],{type:i});l.name=r,l.lastModified=n,t(l)}))}function loadImage(e){return new Promise((function(r,n){var t=new Image;t.onload=function(){return r(t)},t.onerror=function(e){return n(e)},t.src=e}))}function drawImageInCanvas(e){var r=_slicedToArray(getNewCanvasAndCtx(e.width,e.height),2),n=r[0];return r[1].drawImage(e,0,0,n.width,n.height),n}function drawFileInCanvas(e){return new Promise((function(r,n){var t,o,i=function $Try_1_Post(){try{return o=drawImageInCanvas(t),r([t,o])}catch(e){return n(e)}},a=function $Try_1_Catch(r){try{return getDataUrlFromFile(e).then((function(e){try{return loadImage(e).then((function(e){try{return t=e,i()}catch(e){return n(e)}}),n)}catch(e){return n(e)}}),n)}catch(e){return n(e)}};try{return createImageBitmap(e).then((function(e){try{return t=e,i()}catch(e){return a()}}),a)}catch(e){a()}}))}function canvasToFile(e,r,n,t){var o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:1;return new Promise((function(i,a){var s;return"function"==typeof OffscreenCanvas&&e instanceof OffscreenCanvas?e.convertToBlob({type:r,quality:o}).then(function(e){try{return(s=e).name=n,s.lastModified=t,$If_4.call(this)}catch(e){return a(e)}}.bind(this),a):getFilefromDataUrl(e.toDataURL(r,o),n,t).then(function(e){try{return s=e,$If_4.call(this)}catch(e){return a(e)}}.bind(this),a);function $If_4(){return i(s)}}))}function getExifOrientation(e){return new Promise((function(r,n){var t=new CustomFileReader;t.onload=function(e){var n=new DataView(e.target.result);if(65496!=n.getUint16(0,!1))return r(-2);for(var t=n.byteLength,o=2;o<t;){if(n.getUint16(o+2,!1)<=8)return r(-1);var i=n.getUint16(o,!1);if(o+=2,65505==i){if(1165519206!=n.getUint32(o+=2,!1))return r(-1);var a=18761==n.getUint16(o+=6,!1);o+=n.getUint32(o+4,a);var s=n.getUint16(o,a);o+=2;for(var c=0;c<s;c++)if(274==n.getUint16(o+12*c,a))return r(n.getUint16(o+12*c+8,a))}else{if(65280!=(65280&i))break;o+=n.getUint16(o,!1)}}return r(-1)},t.onerror=function(e){return n(e)},t.readAsArrayBuffer(e)}))}function handleMaxWidthOrHeight(e,r){var n,t=e.width,o=e.height,i=r.maxWidthOrHeight,a=e;if(Number.isInteger(i)&&(t>i||o>i)){var s=_slicedToArray(getNewCanvasAndCtx(t,o),2);a=s[0],n=s[1],t>o?(a.width=i,a.height=o/t*i):(a.width=t/o*i,a.height=i),n.drawImage(e,0,0,a.width,a.height),cleanupCanvasMemory(e)}return a}function followExifOrientation(e,r){var n=e.width,t=e.height,o=_slicedToArray(getNewCanvasAndCtx(n,t),2),i=o[0],a=o[1];switch(4<r&&r<9?(i.width=t,i.height=n):(i.width=n,i.height=t),r){case 2:a.transform(-1,0,0,1,n,0);break;case 3:a.transform(-1,0,0,-1,n,t);break;case 4:a.transform(1,0,0,-1,0,t);break;case 5:a.transform(0,1,1,0,0,0);break;case 6:a.transform(0,1,-1,0,t,0);break;case 7:a.transform(0,-1,-1,0,t,n);break;case 8:a.transform(0,-1,1,0,0,n)}return a.drawImage(e,0,0,n,t),cleanupCanvasMemory(e),i}function getNewCanvasAndCtx(e,r){var n,t;try{if(null===(t=(n=new OffscreenCanvas(e,r)).getContext("2d")))throw new Error("getContext of OffscreenCanvas returns null")}catch(e){t=(n=document.createElement("canvas")).getContext("2d")}return n.width=e,n.height=r,[n,t]}function cleanupCanvasMemory(e){e.width=0,e.height=0}function compress(e,r){return new Promise((function(n,t){var o,i,a,s,c,l,u,m,f,g,p,d,h;function incProgress(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:5;o+=e,"function"==typeof r.onProgress&&r.onProgress(Math.min(o,100))}function setProgress(e){o=Math.min(Math.max(e,o),100),"function"==typeof r.onProgress&&r.onProgress(o)}return o=0,i=r.maxIteration||10,a=1024*r.maxSizeMB*1024,incProgress(),drawFileInCanvas(e).then(function(o){try{var v=_slicedToArray(o,2);return v[0],s=v[1],incProgress(),c=handleMaxWidthOrHeight(s,r),incProgress(),new Promise((function(n,t){var o;if(!(o=r.exifOrientation))return getExifOrientation(e).then(function(e){try{return o=e,$If_2.call(this)}catch(e){return t(e)}}.bind(this),t);function $If_2(){return n(o)}return $If_2.call(this)})).then(function(o){try{return r.exifOrientation=o,incProgress(),l=followExifOrientation(c,r.exifOrientation),incProgress(),u=1,canvasToFile(l,r.fileType||e.type,e.name,e.lastModified,u).then(function(o){try{{if(m=o,incProgress(),m.size<=a)return setProgress(100),n(m);var v;function $Loop_3(){if(i--&&g>a){var n,o,s=_slicedToArray(getNewCanvasAndCtx(n=.9*h.width,o=.9*h.height),2);return d=s[0],s[1].drawImage(h,0,0,n,o),"image/jpeg"===e.type&&(u*=.9),canvasToFile(d,r.fileType||e.type,e.name,e.lastModified,u).then((function(e){try{return p=e,cleanupCanvasMemory(h),h=d,g=p.size,setProgress(Math.min(99,Math.floor((f-g)/(f-a)*100))),$Loop_3}catch(e){return t(e)}}),t)}return[1]}return f=m.size,g=f,h=l,(v=function(e){for(;e;){if(e.then)return void e.then(v,t);try{if(e.pop){if(e.length)return e.pop()?$Loop_3_exit.call(this):e;e=$Loop_3}else e=e.call(this)}catch(e){return t(e)}}}.bind(this))($Loop_3);function $Loop_3_exit(){return cleanupCanvasMemory(h),cleanupCanvasMemory(d),cleanupCanvasMemory(c),cleanupCanvasMemory(l),cleanupCanvasMemory(s),setProgress(100),n(p)}}}catch(e){return t(e)}}.bind(this),t)}catch(e){return t(e)}}.bind(this),t)}catch(e){return t(e)}}.bind(this),t)}))}Number.isInteger=Number.isInteger||function(e){return"number"==typeof e&&isFinite(e)&&Math.floor(e)===e};var r,n,t=0;function generateLib(){return function createSourceObject(e){return URL.createObjectURL(new Blob([e],{type:"application/javascript"}))}("\n    function imageCompression (){return (".concat(imageCompression,").apply(null, arguments)}\n\n    imageCompression.getDataUrlFromFile = ").concat(imageCompression.getDataUrlFromFile,"\n    imageCompression.getFilefromDataUrl = ").concat(imageCompression.getFilefromDataUrl,"\n    imageCompression.loadImage = ").concat(imageCompression.loadImage,"\n    imageCompression.drawImageInCanvas = ").concat(imageCompression.drawImageInCanvas,"\n    imageCompression.drawFileInCanvas = ").concat(imageCompression.drawFileInCanvas,"\n    imageCompression.canvasToFile = ").concat(imageCompression.canvasToFile,"\n    imageCompression.getExifOrientation = ").concat(imageCompression.getExifOrientation,"\n    imageCompression.handleMaxWidthOrHeight = ").concat(imageCompression.handleMaxWidthOrHeight,"\n    imageCompression.followExifOrientation = ").concat(imageCompression.followExifOrientation,"\n    imageCompression.cleanupMemory = ").concat(imageCompression.cleanupMemory,"\n\n    getDataUrlFromFile = imageCompression.getDataUrlFromFile\n    getFilefromDataUrl = imageCompression.getFilefromDataUrl\n    loadImage = imageCompression.loadImage\n    drawImageInCanvas = imageCompression.drawImageInCanvas\n    drawFileInCanvas = imageCompression.drawFileInCanvas\n    canvasToFile = imageCompression.canvasToFile\n    getExifOrientation = imageCompression.getExifOrientation\n    handleMaxWidthOrHeight = imageCompression.handleMaxWidthOrHeight\n    followExifOrientation = imageCompression.followExifOrientation\n    cleanupMemory = imageCompression.cleanupMemory\n\n    getNewCanvasAndCtx = ").concat(getNewCanvasAndCtx,"\n    \n    CustomFileReader = FileReader\n    \n    CustomFile = File\n    \n    function _slicedToArray(arr, n) { return arr }\n    \n    function _typeof(a) { return typeof a }\n\n    function compress (){return (").concat(compress,").apply(null, arguments)}\n    "))}function generateWorkerScript(){return function createWorker(e){return"function"==typeof e&&(e="(".concat(f,")()")),new Worker(URL.createObjectURL(new Blob([e])))}("\n    let scriptImported = false\n    self.addEventListener('message', async (e) => {\n      const { file, id, imageCompressionLibUrl, options } = e.data\n      options.onProgress = (progress) => self.postMessage({ progress, id })\n      try {\n        if (!scriptImported) {\n          // console.log('[worker] importScripts', imageCompressionLibUrl)\n          self.importScripts(imageCompressionLibUrl)\n          scriptImported = true\n        }\n        // console.log('[worker] self', self)\n        const compressedFile = await imageCompression(file, options)\n        self.postMessage({ file: compressedFile, id })\n      } catch (e) {\n        // console.error('[worker] error', e)\n        self.postMessage({ error: e.message + '\\n' + e.stack, id })\n      }\n    })\n  ")}function imageCompression(e,o){return new Promise((function(i,a){var s,c,l;if(o.maxSizeMB=o.maxSizeMB||Number.POSITIVE_INFINITY,c="boolean"==typeof o.useWebWorker&&o.useWebWorker,delete o.useWebWorker,!(e instanceof Blob||e instanceof CustomFile))return a(new Error("The file given is not an instance of Blob or File"));if(!/^image/.test(e.type))return a(new Error("The file given is not an image"));if(l="undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope,!c||"function"!=typeof Worker||l)return compress(e,o).then(function(e){try{return s=e,$If_3.call(this)}catch(e){return a(e)}}.bind(this),a);var u=function(){try{return $If_3.call(this)}catch(e){return a(e)}}.bind(this),m=function $Try_1_Catch(r){try{return compress(e,o).then((function(e){try{return s=e,u()}catch(e){return a(e)}}),a)}catch(e){return a(e)}};try{return function compressOnWebWorker(e,o){return new Promise((function(i,a){return new Promise((function(s,c){var l=t++;return r||(r=generateLib()),n||(n=generateWorkerScript()),n.addEventListener("message",(function handler(e){if(e.data.id===l){if(void 0!==e.data.progress&&e.data.progress<100)return void o.onProgress(e.data.progress);n.removeEventListener("message",handler),e.data.error&&a(new Error(e.data.error)),i(e.data.file)}})),n.postMessage({file:e,id:l,imageCompressionLibUrl:r,options:_objectSpread2({},o,{onProgress:void 0})}),s()}))}))}(e,o).then((function(e){try{return s=e,u()}catch(e){return m()}}),m)}catch(e){m()}function $If_3(){try{s.name=e.name,s.lastModified=e.lastModified}catch(e){}return i(s)}}))}imageCompression.getDataUrlFromFile=getDataUrlFromFile,imageCompression.getFilefromDataUrl=getFilefromDataUrl,imageCompression.loadImage=loadImage,imageCompression.drawImageInCanvas=drawImageInCanvas,imageCompression.drawFileInCanvas=drawFileInCanvas,imageCompression.canvasToFile=canvasToFile,imageCompression.getExifOrientation=getExifOrientation,imageCompression.handleMaxWidthOrHeight=handleMaxWidthOrHeight,imageCompression.followExifOrientation=followExifOrientation,imageCompression.cleanupMemory=cleanupCanvasMemory,imageCompression.version="1.0.7";export default imageCompression;
//# sourceMappingURL=browser-image-compression.mjs.map
