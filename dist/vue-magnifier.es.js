var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
import { defineComponent, ref, computed, onMounted, onUnmounted, openBlock, createElementBlock, normalizeClass, normalizeStyle, unref, createElementVNode, mergeProps, withModifiers, createCommentVNode } from "vue";
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var FUNC_ERROR_TEXT$1 = "Expected a function";
var NAN$1 = 0 / 0;
var symbolTag$1 = "[object Symbol]";
var reTrim$1 = /^\s+|\s+$/g;
var reIsBadHex$1 = /^[-+]0x[0-9a-f]+$/i;
var reIsBinary$1 = /^0b[01]+$/i;
var reIsOctal$1 = /^0o[0-7]+$/i;
var freeParseInt$1 = parseInt;
var freeGlobal$1 = typeof commonjsGlobal == "object" && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
var freeSelf$1 = typeof self == "object" && self && self.Object === Object && self;
var root$1 = freeGlobal$1 || freeSelf$1 || Function("return this")();
var objectProto$1 = Object.prototype;
var objectToString$1 = objectProto$1.toString;
var nativeMax$1 = Math.max, nativeMin$1 = Math.min;
var now$1 = function() {
  return root$1.Date.now();
};
function debounce$1(func, wait, options) {
  var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
  if (typeof func != "function") {
    throw new TypeError(FUNC_ERROR_TEXT$1);
  }
  wait = toNumber$1(wait) || 0;
  if (isObject$1(options)) {
    leading = !!options.leading;
    maxing = "maxWait" in options;
    maxWait = maxing ? nativeMax$1(toNumber$1(options.maxWait) || 0, wait) : maxWait;
    trailing = "trailing" in options ? !!options.trailing : trailing;
  }
  function invokeFunc(time) {
    var args = lastArgs, thisArg = lastThis;
    lastArgs = lastThis = void 0;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }
  function leadingEdge(time) {
    lastInvokeTime = time;
    timerId = setTimeout(timerExpired, wait);
    return leading ? invokeFunc(time) : result;
  }
  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, result2 = wait - timeSinceLastCall;
    return maxing ? nativeMin$1(result2, maxWait - timeSinceLastInvoke) : result2;
  }
  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
    return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
  }
  function timerExpired() {
    var time = now$1();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    timerId = setTimeout(timerExpired, remainingWait(time));
  }
  function trailingEdge(time) {
    timerId = void 0;
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = void 0;
    return result;
  }
  function cancel() {
    if (timerId !== void 0) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = void 0;
  }
  function flush() {
    return timerId === void 0 ? result : trailingEdge(now$1());
  }
  function debounced() {
    var time = now$1(), isInvoking = shouldInvoke(time);
    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;
    if (isInvoking) {
      if (timerId === void 0) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === void 0) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}
function isObject$1(value) {
  var type = typeof value;
  return !!value && (type == "object" || type == "function");
}
function isObjectLike$1(value) {
  return !!value && typeof value == "object";
}
function isSymbol$1(value) {
  return typeof value == "symbol" || isObjectLike$1(value) && objectToString$1.call(value) == symbolTag$1;
}
function toNumber$1(value) {
  if (typeof value == "number") {
    return value;
  }
  if (isSymbol$1(value)) {
    return NAN$1;
  }
  if (isObject$1(value)) {
    var other = typeof value.valueOf == "function" ? value.valueOf() : value;
    value = isObject$1(other) ? other + "" : other;
  }
  if (typeof value != "string") {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim$1, "");
  var isBinary = reIsBinary$1.test(value);
  return isBinary || reIsOctal$1.test(value) ? freeParseInt$1(value.slice(2), isBinary ? 2 : 8) : reIsBadHex$1.test(value) ? NAN$1 : +value;
}
var lodash_debounce = debounce$1;
var FUNC_ERROR_TEXT = "Expected a function";
var NAN = 0 / 0;
var symbolTag = "[object Symbol]";
var reTrim = /^\s+|\s+$/g;
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
var reIsBinary = /^0b[01]+$/i;
var reIsOctal = /^0o[0-7]+$/i;
var freeParseInt = parseInt;
var freeGlobal = typeof commonjsGlobal == "object" && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
var freeSelf = typeof self == "object" && self && self.Object === Object && self;
var root = freeGlobal || freeSelf || Function("return this")();
var objectProto = Object.prototype;
var objectToString = objectProto.toString;
var nativeMax = Math.max, nativeMin = Math.min;
var now = function() {
  return root.Date.now();
};
function debounce(func, wait, options) {
  var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
  if (typeof func != "function") {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = "maxWait" in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = "trailing" in options ? !!options.trailing : trailing;
  }
  function invokeFunc(time) {
    var args = lastArgs, thisArg = lastThis;
    lastArgs = lastThis = void 0;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }
  function leadingEdge(time) {
    lastInvokeTime = time;
    timerId = setTimeout(timerExpired, wait);
    return leading ? invokeFunc(time) : result;
  }
  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, result2 = wait - timeSinceLastCall;
    return maxing ? nativeMin(result2, maxWait - timeSinceLastInvoke) : result2;
  }
  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
    return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
  }
  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    timerId = setTimeout(timerExpired, remainingWait(time));
  }
  function trailingEdge(time) {
    timerId = void 0;
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = void 0;
    return result;
  }
  function cancel() {
    if (timerId !== void 0) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = void 0;
  }
  function flush() {
    return timerId === void 0 ? result : trailingEdge(now());
  }
  function debounced() {
    var time = now(), isInvoking = shouldInvoke(time);
    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;
    if (isInvoking) {
      if (timerId === void 0) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === void 0) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}
function throttle(func, wait, options) {
  var leading = true, trailing = true;
  if (typeof func != "function") {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if (isObject(options)) {
    leading = "leading" in options ? !!options.leading : leading;
    trailing = "trailing" in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    "leading": leading,
    "maxWait": wait,
    "trailing": trailing
  });
}
function isObject(value) {
  var type = typeof value;
  return !!value && (type == "object" || type == "function");
}
function isObjectLike(value) {
  return !!value && typeof value == "object";
}
function isSymbol(value) {
  return typeof value == "symbol" || isObjectLike(value) && objectToString.call(value) == symbolTag;
}
function toNumber(value) {
  if (typeof value == "number") {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == "function" ? value.valueOf() : value;
    value = isObject(other) ? other + "" : other;
  }
  if (typeof value != "string") {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, "");
  var isBinary = reIsBinary.test(value);
  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}
var lodash_throttle = throttle;
const _hoisted_1 = ["src"];
const __default__ = {
  inheritAttrs: false
};
const _sfc_main = /* @__PURE__ */ defineComponent(__spreadProps(__spreadValues({}, __default__), {
  props: {
    src: { default: "" },
    width: { default: "100%" },
    height: { default: "auto" },
    className: { default: "" },
    zoomImgSrc: { default: "" },
    zoomFactor: { default: 1.5 },
    mgWidth: { default: 150 },
    mgHeight: { default: 150 },
    mgBorderWidth: { default: 2 },
    mgShape: { default: "circle" },
    mgShowOverflow: { type: Boolean, default: true },
    mgMouseOffsetX: { default: 0 },
    mgMouseOffsetY: { default: 0 },
    mgTouchOffsetX: { default: () => -50 },
    mgTouchOffsetY: { default: () => -50 },
    mgShow: { type: Boolean, default: true },
    mgCornerBgColor: { default: "#fff" }
  },
  emits: ["image:load"],
  setup(__props, { emit }) {
    const img = ref();
    let imgBounds = ref(new DOMRect());
    let showZoom = ref(false);
    let mgOffsetX = ref(0);
    let mgOffsetY = ref(0);
    let relX = ref(0);
    let relY = ref(0);
    const mgClasses = computed(() => {
      let classes = "vue-magnifier__magnifying-glass";
      if (showZoom.value)
        classes += " vue-magnifier__visible";
      if (__props.mgShape === "circle")
        classes += " vue-magnifier__circle";
      return classes;
    });
    const mgWrapperStyle = computed(() => ({
      width: __props.width,
      height: __props.height,
      overflow: __props.mgShowOverflow ? "visible" : "hidden"
    }));
    const mgImgStyle = computed(() => ({
      cursor: __props.mgShow ? "none" : ""
    }));
    const mgStyle = computed(() => ({
      width: `${__props.mgWidth}px`,
      height: `${__props.mgHeight}px`,
      left: `calc(${relX.value * 100}% - ${__props.mgWidth / 2}px + ${mgOffsetX.value}px - ${__props.mgBorderWidth}px)`,
      top: `calc(${relY.value * 100}% - ${__props.mgHeight / 2}px + ${mgOffsetY.value}px - ${__props.mgBorderWidth}px)`,
      backgroundImage: `url('${__props.zoomImgSrc || __props.src}')`,
      backgroundPosition: `calc(${relX.value * 100}% + ${__props.mgWidth / 2}px - ${relX.value * __props.mgWidth}px) calc(${relY.value * 100}% + ${__props.mgHeight / 2}px - ${relY.value * __props.mgWidth}px)`,
      backgroundSize: `${__props.zoomFactor * imgBounds.value.width}% ${__props.zoomFactor * imgBounds.value.height}%`,
      borderWidth: `${__props.mgBorderWidth}px`,
      backgroundColor: __props.mgCornerBgColor
    }));
    const calcImgBounds = () => {
      if (img.value) {
        imgBounds.value = img.value.getBoundingClientRect();
      }
    };
    const onImageLoad = (event) => {
      emit("image:load", event);
      calcImgBounds();
    };
    const onMouseEnter = () => {
      calcImgBounds();
    };
    let onMouseMove = (e) => {
      if (imgBounds.value) {
        const target = e.target;
        mgOffsetX.value = __props.mgMouseOffsetX;
        mgOffsetY.value = __props.mgMouseOffsetY;
        relX.value = (e.clientX - imgBounds.value.left) / target.clientWidth;
        relY.value = (e.clientY - imgBounds.value.top) / target.clientHeight;
        showZoom.value = true;
      }
    };
    const onMouseOut = () => {
      showZoom.value = false;
    };
    const onTouchStart = () => {
      calcImgBounds();
    };
    let onTouchMove = (e) => {
      if (imgBounds.value) {
        const target = e.target;
        const relXLocal = (e.targetTouches[0].clientX - imgBounds.value.left) / target.clientWidth;
        const relYLocal = (e.targetTouches[0].clientY - imgBounds.value.top) / target.clientHeight;
        if (relXLocal >= 0 && relYLocal >= 0 && relXLocal <= 1 && relYLocal <= 1) {
          mgOffsetX.value = __props.mgTouchOffsetX;
          mgOffsetY.value = __props.mgTouchOffsetY;
          relX.value = relXLocal;
          relY.value = relYLocal;
          showZoom.value = true;
        } else {
          showZoom.value = false;
        }
      }
    };
    const onTouchEnd = () => {
      showZoom.value = false;
    };
    const calcImgBoundsDebounced = lodash_debounce(calcImgBounds, 200);
    onMouseMove = lodash_throttle(onMouseMove, 20, { trailing: false });
    onTouchMove = lodash_throttle(onTouchMove, 20, { trailing: false });
    const registerEventListeners = () => {
      window.addEventListener("resize", calcImgBoundsDebounced);
      window.addEventListener("scroll", calcImgBoundsDebounced, true);
    };
    const unRegisterEventListeners = () => {
      window.removeEventListener("resize", calcImgBoundsDebounced);
      window.removeEventListener("scroll", calcImgBoundsDebounced, true);
    };
    onMounted(() => {
      registerEventListeners();
    });
    onUnmounted(() => {
      unRegisterEventListeners();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(`vue-magnifier__magnifier ${__props.className}`),
        style: normalizeStyle(unref(mgWrapperStyle))
      }, [
        createElementVNode("img", mergeProps({
          ref_key: "img",
          ref: img,
          src: __props.src
        }, _ctx.$attrs, {
          class: "vue-magnifier__magnifier-image",
          style: unref(mgImgStyle),
          onLoad: _cache[0] || (_cache[0] = ($event) => onImageLoad($event)),
          onMouseenter: _cache[1] || (_cache[1] = ($event) => onMouseEnter()),
          onMousemove: _cache[2] || (_cache[2] = ($event) => unref(onMouseMove)($event)),
          onMouseout: _cache[3] || (_cache[3] = ($event) => onMouseOut()),
          onTouchstart: _cache[4] || (_cache[4] = withModifiers(($event) => onTouchStart(), ["prevent"])),
          onTouchmove: _cache[5] || (_cache[5] = withModifiers(($event) => unref(onTouchMove)($event), ["prevent"])),
          onTouchend: _cache[6] || (_cache[6] = ($event) => onTouchEnd())
        }), null, 16, _hoisted_1),
        imgBounds.value && __props.mgShow ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(unref(mgClasses)),
          style: normalizeStyle(unref(mgStyle))
        }, null, 6)) : createCommentVNode("", true)
      ], 6);
    };
  }
}));
var style = "";
_sfc_main.install = (app) => {
  app.component("VueMagnifier", _sfc_main);
};
export { _sfc_main as default };
