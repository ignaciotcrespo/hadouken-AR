(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("THREE"));
	else if(typeof define === 'function' && define.amd)
		define(["THREE"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("THREE")) : factory(root["THREE"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function(__WEBPACK_EXTERNAL_MODULE__0__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var THREE = __webpack_require__(0);
function vector3DToScreenCoords(cam, w, h, v) {
    var dpr = window.devicePixelRatio;
    var pv = new THREE.Vector3().copy(v).project(cam);
    var coords = [
        ((pv.x + 1) / 2) * w * dpr,
        -(((pv.y - 1) / 2) * h) * dpr,
    ];
    return coords;
}
exports.vector3DToScreenCoords = vector3DToScreenCoords;
function vector3FromPackedArray(a, pointIndex) {
    var offset = pointIndex * 3;
    return new THREE.Vector3(a[offset], a[offset + 1], a[offset + 2]);
}
exports.vector3FromPackedArray = vector3FromPackedArray;
function getNearFarPoints(worldSpacePoints, cameraPos, cameraTarget) {
    var shortestDist = Infinity;
    var furthestDist = 0;
    var camToTarget = new THREE.Vector3().copy(cameraTarget).sub(cameraPos);
    var camPlaneNormal = new THREE.Vector3().copy(camToTarget).normalize();
    var n = worldSpacePoints.length / 3;
    var src = 0;
    var p = new THREE.Vector3();
    var camToPoint = new THREE.Vector3();
    for (var i = 0; i < n; i++) {
        p.x = worldSpacePoints[src];
        p.y = worldSpacePoints[src + 1];
        p.z = worldSpacePoints[src + 2];
        src += 3;
        camToPoint.copy(p).sub(cameraPos);
        var dist = camPlaneNormal.dot(camToPoint);
        if (dist < 0) {
            continue;
        }
        furthestDist = dist > furthestDist ? dist : furthestDist;
        shortestDist = dist < shortestDist ? dist : shortestDist;
    }
    return [shortestDist, furthestDist];
}
exports.getNearFarPoints = getNearFarPoints;
function prepareTexture(texture, needsUpdate) {
    if (needsUpdate === void 0) { needsUpdate = true; }
    texture.needsUpdate = needsUpdate;
    texture.minFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;
    texture.flipY = false;
    return texture;
}
function createTextureFromCanvas(image) {
    var texture = new THREE.Texture(image);
    return prepareTexture(texture);
}
exports.createTextureFromCanvas = createTextureFromCanvas;
function createTextureFromImage(image, onImageLoad) {
    var texture = new THREE.Texture(image);
    image.onload = function () {
        texture.needsUpdate = true;
        onImageLoad();
    };
    return prepareTexture(texture, false);
}
exports.createTextureFromImage = createTextureFromImage;
function hasWebGLSupport() {
    try {
        var c = document.createElement('canvas');
        var gl = c.getContext('webgl') || c.getContext('experimental-webgl');
        return gl != null;
    }
    catch (e) {
        return false;
    }
}
exports.hasWebGLSupport = hasWebGLSupport;
function extent(data) {
    var minimum = Infinity;
    var maximum = -Infinity;
    for (var i = 0; i < data.length; i++) {
        var item = data[i];
        if (item < minimum)
            minimum = item;
        if (item > maximum)
            maximum = item;
    }
    return [minimum, maximum];
}
exports.extent = extent;
function scaleLinear(value, domain, range) {
    var domainDifference = domain[1] - domain[0];
    var rangeDifference = range[1] - range[0];
    var percentDomain = (value - domain[0]) / domainDifference;
    return percentDomain * rangeDifference + range[0];
}
exports.scaleLinear = scaleLinear;
function scaleExponential(value, domain, range) {
    var domainDifference = Math.pow(domain[1], Math.E) - Math.pow(domain[0], Math.E);
    var rangeDifference = range[1] - range[0];
    var percentDomain = (Math.pow(value, Math.E) - domain[0]) / domainDifference;
    return percentDomain * rangeDifference + range[0];
}
exports.scaleExponential = scaleExponential;
function packRgbIntoUint8Array(rgbArray, labelIndex, r, g, b) {
    rgbArray[labelIndex * 3] = r;
    rgbArray[labelIndex * 3 + 1] = g;
    rgbArray[labelIndex * 3 + 2] = b;
}
exports.packRgbIntoUint8Array = packRgbIntoUint8Array;
function styleRgbFromHexColor(hex) {
    var c = new THREE.Color(hex);
    return [(c.r * 255) | 0, (c.g * 255) | 0, (c.b * 255) | 0];
}
exports.styleRgbFromHexColor = styleRgbFromHexColor;
var toPercent = function (percent) { return 100 * percent + "%"; };
function getDefaultPointInPolylineColor(index, totalPoints, startHue, endHue, saturation, lightness) {
    var hue = startHue + ((endHue - startHue) * index) / totalPoints;
    var hsl = "hsl(" + hue + ", " + toPercent(saturation) + ", " + toPercent(lightness) + ")";
    return new THREE.Color(hsl);
}
exports.getDefaultPointInPolylineColor = getDefaultPointInPolylineColor;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var LabelRenderParams = (function () {
    function LabelRenderParams(pointIndices, labelStrings, scaleFactors, useSceneOpacityFlags, defaultFontSize, fillColors, strokeColors) {
        this.pointIndices = pointIndices;
        this.labelStrings = labelStrings;
        this.scaleFactors = scaleFactors;
        this.useSceneOpacityFlags = useSceneOpacityFlags;
        this.defaultFontSize = defaultFontSize;
        this.fillColors = fillColors;
        this.strokeColors = strokeColors;
    }
    return LabelRenderParams;
}());
exports.LabelRenderParams = LabelRenderParams;
var CameraType;
(function (CameraType) {
    CameraType[CameraType["Perspective"] = 0] = "Perspective";
    CameraType[CameraType["Orthographic"] = 1] = "Orthographic";
})(CameraType = exports.CameraType || (exports.CameraType = {}));
var RenderContext = (function () {
    function RenderContext(camera, cameraType, cameraTarget, screenWidth, screenHeight, nearestCameraSpacePointZ, farthestCameraSpacePointZ, backgroundColor, pointColors, pointScaleFactors, labels, polylineColors, polylineOpacities, polylineWidths) {
        this.camera = camera;
        this.cameraType = cameraType;
        this.cameraTarget = cameraTarget;
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
        this.nearestCameraSpacePointZ = nearestCameraSpacePointZ;
        this.farthestCameraSpacePointZ = farthestCameraSpacePointZ;
        this.backgroundColor = backgroundColor;
        this.pointColors = pointColors;
        this.pointScaleFactors = pointScaleFactors;
        this.labels = labels;
        this.polylineColors = polylineColors;
        this.polylineOpacities = polylineOpacities;
        this.polylineWidths = polylineWidths;
    }
    return RenderContext;
}());
exports.RenderContext = RenderContext;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.RGB_NUM_ELEMENTS = 3;
exports.XYZ_NUM_ELEMENTS = 3;
exports.UV_NUM_ELEMENTS = 2;
exports.INDEX_NUM_ELEMENTS = 1;
exports.SCATTER_PLOT_CUBE_LENGTH = 2;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var scatter_gl_1 = __webpack_require__(5);
exports.ScatterGL = scatter_gl_1.ScatterGL;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var THREE = __webpack_require__(0);
var scatter_plot_1 = __webpack_require__(6);
var data_1 = __webpack_require__(10);
var render_1 = __webpack_require__(2);
var styles_1 = __webpack_require__(11);
var util = __webpack_require__(1);
var constants_1 = __webpack_require__(3);
var scatter_plot_visualizer_3d_labels_1 = __webpack_require__(12);
var scatter_plot_visualizer_sprites_1 = __webpack_require__(13);
var scatter_plot_visualizer_canvas_labels_1 = __webpack_require__(14);
var scatter_plot_visualizer_polylines_1 = __webpack_require__(16);
var ScatterGL = (function () {
    function ScatterGL(containerElement, params) {
        var _this = this;
        if (params === void 0) { params = {}; }
        this.pointColorer = null;
        this.sequences = [];
        this.renderMode = "POINT";
        this.rotateOnStart = true;
        this.selectEnabled = true;
        this.showLabelsOnHover = true;
        this.hoverPointIndex = null;
        this.selectedPointIndices = [];
        this.clickCallback = function () { };
        this.hoverCallback = function () { };
        this.selectCallback = function () { };
        this.onHover = function (pointIndex) {
            _this.hoverCallback(pointIndex);
            _this.hoverPointIndex = pointIndex;
            _this.updateScatterPlotAttributes();
            _this.renderScatterPlot();
        };
        this.onClick = function (pointIndex) {
            _this.clickCallback(pointIndex);
        };
        this.onSelect = function (pointIndices) {
            if (!_this.selectEnabled)
                return;
            _this.selectCallback(pointIndices);
            _this.selectedPointIndices = pointIndices;
            _this.updateScatterPlotAttributes();
            _this.renderScatterPlot();
        };
        this.containerElement = containerElement;
        this.styles = styles_1.makeStyles(params.styles);
        this.setParameters(params);
        this.scatterPlot = new scatter_plot_1.ScatterPlot(containerElement, {
            camera: params.camera,
            onClick: this.onClick,
            onHover: this.onHover,
            onSelect: this.onSelect,
            styles: this.styles,
        });
    }
    ScatterGL.prototype.setParameters = function (p) {
        if (p.onClick !== undefined)
            this.clickCallback = p.onClick;
        if (p.onHover !== undefined)
            this.hoverCallback = p.onHover;
        if (p.onSelect !== undefined)
            this.selectCallback = p.onSelect;
        if (p.pointColorer !== undefined)
            this.pointColorer = p.pointColorer;
        if (p.renderMode !== undefined)
            this.renderMode = p.renderMode;
        if (p.rotateOnStart !== undefined)
            this.rotateOnStart = p.rotateOnStart;
        if (p.selectEnabled !== undefined)
            this.selectEnabled = p.selectEnabled;
        if (p.showLabelsOnHover !== undefined)
            this.showLabelsOnHover = p.showLabelsOnHover;
    };
    ScatterGL.prototype.render = function (dataset) {
        this.updateDataset(dataset);
        this.setVisualizers();
        if (this.rotateOnStart) {
            this.scatterPlot.startOrbitAnimation();
        }
    };
    ScatterGL.prototype.renderScatterPlot = function () {
        if (this.dataset)
            this.scatterPlot.render();
    };
    ScatterGL.prototype.setRenderMode = function (renderMode) {
        this.renderMode = renderMode;
        this.setVisualizers();
        this.updateScatterPlotAttributes();
        this.updateScatterPlotPositions();
    };
    ScatterGL.prototype.setTextRenderMode = function () {
        this.setRenderMode("TEXT");
        this.renderScatterPlot();
    };
    ScatterGL.prototype.setPointRenderMode = function () {
        this.setRenderMode("POINT");
        this.renderScatterPlot();
    };
    ScatterGL.prototype.setSpriteRenderMode = function () {
        if (this.dataset && this.dataset.spriteMetadata) {
            this.setRenderMode("SPRITE");
            this.renderScatterPlot();
        }
    };
    ScatterGL.prototype.setSequences = function (sequences) {
        this.sequences = sequences;
        this.updatePolylineAttributes();
        this.setVisualizers();
        this.renderScatterPlot();
    };
    ScatterGL.prototype.setPanMode = function () {
        this.scatterPlot.setInteractionMode("PAN");
    };
    ScatterGL.prototype.setSelectMode = function () {
        this.scatterPlot.setInteractionMode("SELECT");
    };
    ScatterGL.prototype.setDimensions = function (nDimensions) {
        var outsideRange = nDimensions < 2 || nDimensions > 3;
        var moreThanDataset = this.dataset && nDimensions > this.dataset.dimensions;
        if (outsideRange || moreThanDataset) {
            throw new RangeError('Setting invalid dimensionality');
        }
        else {
            this.scatterPlot.setDimensions(nDimensions);
            this.renderScatterPlot();
        }
    };
    ScatterGL.prototype.setPointColorer = function (pointColorer) {
        this.pointColorer = pointColorer;
        this.updateScatterPlotAttributes();
        this.renderScatterPlot();
    };
    ScatterGL.prototype.resize = function () {
        this.scatterPlot.resize();
    };
    ScatterGL.prototype.updateDataset = function (dataset) {
        this.setDataset(dataset);
        this.scatterPlot.setDimensions(dataset.dimensions);
        this.updateScatterPlotAttributes();
        this.updateScatterPlotPositions();
        this.renderScatterPlot();
    };
    ScatterGL.prototype.startOrbitAnimation = function () {
        this.scatterPlot.startOrbitAnimation();
    };
    ScatterGL.prototype.setDataset = function (dataset) {
        this.dataset = dataset;
        if (this.labels3DVisualizer) {
            this.labels3DVisualizer.setLabelStrings(this.generate3DLabelsArray());
        }
    };
    ScatterGL.prototype.updateScatterPlotPositions = function () {
        var dataset = this.dataset;
        if (!dataset)
            return;
        var newPositions = this.generatePointPositionArray(dataset);
        this.scatterPlot.setPointPositions(newPositions);
    };
    ScatterGL.prototype.updateScatterPlotAttributes = function () {
        var dataset = this.dataset;
        if (!dataset)
            return;
        var pointColors = this.generatePointColorArray(dataset);
        var pointScaleFactors = this.generatePointScaleFactorArray(dataset);
        var labels = this.generateVisibleLabelRenderParams(dataset);
        this.scatterPlot.setPointColors(pointColors);
        this.scatterPlot.setPointScaleFactors(pointScaleFactors);
        this.scatterPlot.setLabels(labels);
    };
    ScatterGL.prototype.updatePolylineAttributes = function () {
        var dataset = this.dataset;
        if (!dataset)
            return;
        var polylineColors = this.generateLineSegmentColorMap(dataset);
        var polylineOpacities = this.generateLineSegmentOpacityArray(dataset);
        var polylineWidths = this.generateLineSegmentWidthArray(dataset);
        this.scatterPlot.setPolylineColors(polylineColors);
        this.scatterPlot.setPolylineOpacities(polylineOpacities);
        this.scatterPlot.setPolylineWidths(polylineWidths);
    };
    ScatterGL.prototype.generatePointPositionArray = function (dataset) {
        var xExtent = [0, 0];
        var yExtent = [0, 0];
        var zExtent = [0, 0];
        xExtent = util.extent(dataset.points.map(function (p) { return p[0]; }));
        yExtent = util.extent(dataset.points.map(function (p) { return p[1]; }));
        if (dataset.dimensions === 3) {
            zExtent = util.extent(dataset.points.map(function (p) { return p[2]; }));
        }
        var getRange = function (extent) { return Math.abs(extent[1] - extent[0]); };
        var xRange = getRange(xExtent);
        var yRange = getRange(yExtent);
        var zRange = getRange(zExtent);
        var maxRange = Math.max(xRange, yRange, zRange);
        var halfCube = constants_1.SCATTER_PLOT_CUBE_LENGTH / 2;
        var makeScaleRange = function (range, base) { return [
            -base * (range / maxRange),
            base * (range / maxRange),
        ]; };
        var xScale = makeScaleRange(xRange, halfCube);
        var yScale = makeScaleRange(yRange, halfCube);
        var zScale = makeScaleRange(zRange, halfCube);
        var positions = new Float32Array(dataset.points.length * 3);
        var dst = 0;
        dataset.points.forEach(function (d, i) {
            var vector = dataset.points[i];
            positions[dst++] = util.scaleLinear(vector[0], xExtent, xScale);
            positions[dst++] = util.scaleLinear(vector[1], yExtent, yScale);
            if (dataset.dimensions === 3) {
                positions[dst++] = util.scaleLinear(vector[2], zExtent, zScale);
            }
            else {
                positions[dst++] = 0.0;
            }
        });
        return positions;
    };
    ScatterGL.prototype.generateVisibleLabelRenderParams = function (dataset) {
        var _a = this, hoverPointIndex = _a.hoverPointIndex, selectedPointIndices = _a.selectedPointIndices, styles = _a.styles;
        var selectedPointCount = selectedPointIndices.length;
        var n = selectedPointCount + (hoverPointIndex !== null ? 1 : 0);
        var visibleLabels = new Uint32Array(n);
        var scale = new Float32Array(n);
        var opacityFlags = new Int8Array(n);
        var fillColors = new Uint8Array(n * 3);
        var strokeColors = new Uint8Array(n * 3);
        var labelStrings = [];
        scale.fill(styles.label.scaleDefault);
        opacityFlags.fill(1);
        var dst = 0;
        if (hoverPointIndex !== null) {
            labelStrings.push(this.getLabelText(hoverPointIndex));
            visibleLabels[dst] = hoverPointIndex;
            scale[dst] = styles.label.scaleLarge;
            opacityFlags[dst] = 0;
            var fillRgb = util.styleRgbFromHexColor(styles.label.fillColorHover);
            util.packRgbIntoUint8Array(fillColors, dst, fillRgb[0], fillRgb[1], fillRgb[2]);
            var strokeRgb = util.styleRgbFromHexColor(styles.label.strokeColorHover);
            util.packRgbIntoUint8Array(strokeColors, dst, strokeRgb[0], strokeRgb[1], strokeRgb[1]);
            ++dst;
        }
        {
            var n_1 = selectedPointCount;
            var fillRgb = util.styleRgbFromHexColor(styles.label.fillColorSelected);
            var strokeRgb = util.styleRgbFromHexColor(styles.label.strokeColorSelected);
            for (var i = 0; i < n_1; ++i) {
                var labelIndex = selectedPointIndices[i];
                labelStrings.push(this.getLabelText(labelIndex));
                visibleLabels[dst] = labelIndex;
                scale[dst] = styles.label.scaleLarge;
                opacityFlags[dst] = n_1 === 1 ? 0 : 1;
                util.packRgbIntoUint8Array(fillColors, dst, fillRgb[0], fillRgb[1], fillRgb[2]);
                util.packRgbIntoUint8Array(strokeColors, dst, strokeRgb[0], strokeRgb[1], strokeRgb[2]);
                ++dst;
            }
        }
        return new render_1.LabelRenderParams(new Float32Array(visibleLabels), labelStrings, scale, opacityFlags, styles.label.fontSize, fillColors, strokeColors);
    };
    ScatterGL.prototype.generatePointScaleFactorArray = function (dataset) {
        var _a = this, hoverPointIndex = _a.hoverPointIndex, selectedPointIndices = _a.selectedPointIndices, styles = _a.styles;
        var _b = styles.point, scaleDefault = _b.scaleDefault, scaleSelected = _b.scaleSelected, scaleHover = _b.scaleHover;
        var scale = new Float32Array(dataset.points.length);
        scale.fill(scaleDefault);
        var selectedPointCount = selectedPointIndices.length;
        {
            var n = selectedPointCount;
            for (var i = 0; i < n; ++i) {
                var p = selectedPointIndices[i];
                scale[p] = scaleSelected;
            }
        }
        if (hoverPointIndex != null) {
            scale[hoverPointIndex] = scaleHover;
        }
        return scale;
    };
    ScatterGL.prototype.generatePointColorArray = function (dataset) {
        var _a = this, hoverPointIndex = _a.hoverPointIndex, pointColorer = _a.pointColorer, selectedPointIndices = _a.selectedPointIndices, styles = _a.styles;
        var _b = styles.point, colorHover = _b.colorHover, colorNoSelection = _b.colorNoSelection, colorSelected = _b.colorSelected, colorUnselected = _b.colorUnselected;
        var selectedPointCount = selectedPointIndices.length;
        var colors = new Float32Array(dataset.points.length * 3);
        var unselectedColor = colorUnselected;
        var noSelectionColor = colorNoSelection;
        if (this.renderMode === "TEXT") {
            unselectedColor = this.styles.label3D.colorUnselected;
            noSelectionColor = this.styles.label3D.colorNoSelection;
        }
        if (this.renderMode === "SPRITE") {
            unselectedColor = this.styles.sprites.colorUnselected;
            noSelectionColor = this.styles.sprites.colorNoSelection;
        }
        {
            var n = dataset.points.length;
            var dst = 0;
            if (selectedPointCount > 0) {
                var c = new THREE.Color(unselectedColor);
                for (var i = 0; i < n; ++i) {
                    colors[dst++] = c.r;
                    colors[dst++] = c.g;
                    colors[dst++] = c.b;
                }
            }
            else {
                if (pointColorer) {
                    for (var i = 0; i < n; ++i) {
                        var c = new THREE.Color(pointColorer(i) || noSelectionColor);
                        colors[dst++] = c.r;
                        colors[dst++] = c.g;
                        colors[dst++] = c.b;
                    }
                }
                else {
                    var c = new THREE.Color(noSelectionColor);
                    for (var i = 0; i < n; ++i) {
                        colors[dst++] = c.r;
                        colors[dst++] = c.g;
                        colors[dst++] = c.b;
                    }
                }
            }
        }
        {
            var n = selectedPointCount;
            var c = new THREE.Color(colorSelected);
            for (var i = 0; i < n; ++i) {
                var dst = selectedPointIndices[i] * 3;
                colors[dst++] = c.r;
                colors[dst++] = c.g;
                colors[dst++] = c.b;
            }
        }
        if (hoverPointIndex != null) {
            var c = new THREE.Color(colorHover);
            var dst = hoverPointIndex * 3;
            colors[dst++] = c.r;
            colors[dst++] = c.g;
            colors[dst++] = c.b;
        }
        return colors;
    };
    ScatterGL.prototype.generate3DLabelsArray = function () {
        var dataset = this.dataset;
        if (!dataset)
            return [];
        var labels = [];
        var n = dataset.points.length;
        for (var i = 0; i < n; ++i) {
            labels.push(this.getLabelText(i));
        }
        return labels;
    };
    ScatterGL.prototype.generateLineSegmentColorMap = function (dataset) {
        var _a = this, pointColorer = _a.pointColorer, styles = _a.styles;
        var polylineColorArrayMap = {};
        for (var i = 0; i < this.sequences.length; i++) {
            var sequence = this.sequences[i];
            var colors = new Float32Array(2 * (sequence.indices.length - 1) * 3);
            var colorIndex = 0;
            if (pointColorer) {
                for (var j = 0; j < sequence.indices.length - 1; j++) {
                    var c1 = new THREE.Color(pointColorer(sequence.indices[j]));
                    var c2 = new THREE.Color(pointColorer(sequence.indices[j + 1]));
                    colors[colorIndex++] = c1.r;
                    colors[colorIndex++] = c1.g;
                    colors[colorIndex++] = c1.b;
                    colors[colorIndex++] = c2.r;
                    colors[colorIndex++] = c2.g;
                    colors[colorIndex++] = c2.b;
                }
            }
            else {
                for (var j = 0; j < sequence.indices.length - 1; j++) {
                    var c1 = util.getDefaultPointInPolylineColor(j, sequence.indices.length, styles.polyline.startHue, styles.polyline.endHue, styles.polyline.saturation, styles.polyline.lightness);
                    var c2 = util.getDefaultPointInPolylineColor(j + 1, sequence.indices.length, styles.polyline.startHue, styles.polyline.endHue, styles.polyline.saturation, styles.polyline.lightness);
                    colors[colorIndex++] = c1.r;
                    colors[colorIndex++] = c1.g;
                    colors[colorIndex++] = c1.b;
                    colors[colorIndex++] = c2.r;
                    colors[colorIndex++] = c2.g;
                    colors[colorIndex++] = c2.b;
                }
            }
            polylineColorArrayMap[i] = colors;
        }
        return polylineColorArrayMap;
    };
    ScatterGL.prototype.generateLineSegmentOpacityArray = function (dataset) {
        var _a = this, selectedPointIndices = _a.selectedPointIndices, styles = _a.styles;
        var opacities = new Float32Array(this.sequences.length);
        var selectedPointCount = selectedPointIndices.length;
        if (selectedPointCount > 0) {
            opacities.fill(styles.polyline.deselectedOpacity);
            var i = this.polylineVisualizer.getPointSequenceIndex(selectedPointIndices[0]);
            if (i !== undefined)
                opacities[i] = styles.polyline.selectedOpacity;
        }
        else {
            opacities.fill(styles.polyline.defaultOpacity);
        }
        return opacities;
    };
    ScatterGL.prototype.generateLineSegmentWidthArray = function (dataset) {
        var _a = this, selectedPointIndices = _a.selectedPointIndices, styles = _a.styles;
        var widths = new Float32Array(this.sequences.length);
        widths.fill(styles.polyline.defaultLineWidth);
        var selectedPointCount = selectedPointIndices.length;
        if (selectedPointCount > 0) {
            var i = this.polylineVisualizer.getPointSequenceIndex(selectedPointIndices[0]);
            if (i !== undefined)
                widths[i] = styles.polyline.selectedLineWidth;
        }
        return widths;
    };
    ScatterGL.prototype.getLabelText = function (i) {
        var dataset = this.dataset;
        if (!dataset)
            return '';
        var metadata = dataset.metadata[i];
        return metadata && metadata.label != null ? "" + metadata.label : '';
    };
    ScatterGL.prototype.initializeCanvasLabelsVisualizer = function () {
        if (!this.canvasLabelsVisualizer) {
            this.canvasLabelsVisualizer = new scatter_plot_visualizer_canvas_labels_1.ScatterPlotVisualizerCanvasLabels(this.containerElement, this.styles);
        }
        return this.canvasLabelsVisualizer;
    };
    ScatterGL.prototype.initialize3DLabelsVisualizer = function () {
        if (!this.labels3DVisualizer) {
            this.labels3DVisualizer = new scatter_plot_visualizer_3d_labels_1.ScatterPlotVisualizer3DLabels(this.styles);
        }
        this.labels3DVisualizer.setLabelStrings(this.generate3DLabelsArray());
        return this.labels3DVisualizer;
    };
    ScatterGL.prototype.initializePointVisualizer = function () {
        if (!this.pointVisualizer) {
            this.pointVisualizer = new scatter_plot_visualizer_sprites_1.ScatterPlotVisualizerSprites(this.styles);
        }
        return this.pointVisualizer;
    };
    ScatterGL.prototype.initializeSpritesheetVisualizer = function () {
        var _this = this;
        var styles = this.styles;
        var dataset = this.dataset;
        var spriteMetadata = dataset.spriteMetadata;
        if (!this.spritesheetVisualizer && spriteMetadata) {
            if (!spriteMetadata.spriteImage || !spriteMetadata.singleSpriteSize) {
                return;
            }
            var n = dataset.points.length;
            var spriteIndices = new Float32Array(n);
            for (var i = 0; i < n; ++i) {
                spriteIndices[i] = i;
            }
            var onImageLoad = function () { return _this.renderScatterPlot(); };
            var spritesheetVisualizer = new scatter_plot_visualizer_sprites_1.ScatterPlotVisualizerSprites(styles, {
                spritesheetImage: spriteMetadata.spriteImage,
                spriteDimensions: spriteMetadata.singleSpriteSize,
                spriteIndices: spriteIndices,
                onImageLoad: onImageLoad,
            });
            spritesheetVisualizer.id = 'SPRITE_SHEET_VISUALIZER';
            this.spritesheetVisualizer = spritesheetVisualizer;
        }
        return this.spritesheetVisualizer;
    };
    ScatterGL.prototype.initializePolylineVisualizer = function () {
        if (!this.polylineVisualizer) {
            this.polylineVisualizer = new scatter_plot_visualizer_polylines_1.ScatterPlotVisualizerPolylines();
        }
        this.polylineVisualizer.setSequences(this.sequences);
        return this.polylineVisualizer;
    };
    ScatterGL.prototype.setVisualizers = function () {
        var _a = this, dataset = _a.dataset, renderMode = _a.renderMode;
        var activeVisualizers = [];
        if (renderMode === "TEXT") {
            var visualizer = this.initialize3DLabelsVisualizer();
            activeVisualizers.push(visualizer);
        }
        else if (renderMode === "POINT") {
            var visualizer = this.initializePointVisualizer();
            activeVisualizers.push(visualizer);
        }
        else if (renderMode === "SPRITE" && dataset.spriteMetadata) {
            var visualizer = this.initializeSpritesheetVisualizer();
            if (visualizer)
                activeVisualizers.push(visualizer);
        }
        if (this.sequences.length > 0) {
            var visualizer = this.initializePolylineVisualizer();
            activeVisualizers.push(visualizer);
        }
        var textLabelsRenderMode = renderMode === "POINT" || renderMode === "SPRITE";
        if (textLabelsRenderMode && this.showLabelsOnHover) {
            var visualizer = this.initializeCanvasLabelsVisualizer();
            activeVisualizers.push(visualizer);
        }
        this.scatterPlot.setActiveVisualizers(activeVisualizers);
    };
    ScatterGL.Dataset = data_1.Dataset;
    return ScatterGL;
}());
exports.ScatterGL = ScatterGL;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var THREE = __webpack_require__(0);
var orbit_controls_1 = __webpack_require__(7);
var render_1 = __webpack_require__(2);
var util = __webpack_require__(1);
var scatter_plot_rectangle_selector_1 = __webpack_require__(9);
var CUBE_LENGTH = 2;
var MAX_ZOOM = 5 * CUBE_LENGTH;
var MIN_ZOOM = 0.025 * CUBE_LENGTH;
var PERSP_CAMERA_FOV_VERTICAL = 70;
var PERSP_CAMERA_NEAR_CLIP_PLANE = 0.01;
var PERSP_CAMERA_FAR_CLIP_PLANE = 100;
var ORTHO_CAMERA_FRUSTUM_HALF_EXTENT = 1.2;
var SHIFT_KEY = 16;
var CTRL_KEY = 17;
var START_CAMERA_POS_3D = new THREE.Vector3(0.45, 0.9, 1.6);
var START_CAMERA_TARGET_3D = new THREE.Vector3(0, 0, 0);
var START_CAMERA_POS_2D = new THREE.Vector3(0, 0, 4);
var START_CAMERA_TARGET_2D = new THREE.Vector3(0, 0, 0);
var ORBIT_MOUSE_ROTATION_SPEED = 1;
var ORBIT_ANIMATION_ROTATION_CYCLE_IN_SECONDS = 7;
var ORBIT_ZOOM_SPEED = 0.125;
var ScatterPlot = (function () {
    function ScatterPlot(containerElement, params) {
        var _this = this;
        this.clickCallback = function () { };
        this.hoverCallback = function () { };
        this.selectCallback = function () { };
        this.visualizers = new Map();
        this.onCameraMoveListeners = [];
        this.height = 0;
        this.width = 0;
        this.dimensions = 3;
        this.interactionMode = "PAN";
        this.pickingTexture = new THREE.WebGLRenderTarget(0, 0);
        this.orbitAnimationOnNextCameraCreation = false;
        this.orbitAnimationId = null;
        this.worldSpacePointPositions = new Float32Array();
        this.pointColors = new Float32Array();
        this.pointScaleFactors = new Float32Array();
        this.polylineColors = {};
        this.polylineOpacities = new Float32Array();
        this.polylineWidths = new Float32Array();
        this.selecting = false;
        this.nearestPoint = null;
        this.mouseIsDown = false;
        this.isDragSequence = false;
        this.lastHovered = null;
        this.container = containerElement;
        this.clickCallback = params.onClick || this.clickCallback;
        this.hoverCallback = params.onHover || this.hoverCallback;
        this.selectCallback = params.onSelect || this.selectCallback;
        this.styles = params.styles;
        this.computeLayoutValues();
        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer({
            alpha: true,
            premultipliedAlpha: false,
            antialias: false,
        });
        this.renderer.setClearColor(this.styles.backgroundColor, 1);
        this.container.appendChild(this.renderer.domElement);
        this.light = new THREE.PointLight(0xffecbf, 1, 0);
        this.scene.add(this.light);
        this.rectangleSelector = new scatter_plot_rectangle_selector_1.ScatterPlotRectangleSelector(this.container, function (boundingBox) { return _this.selectBoundingBox(boundingBox); }, this.styles);
        this.addInteractionListeners();
        this.setDimensions(3);
        this.makeCamera(params.camera);
        this.resize();
    }
    ScatterPlot.prototype.addInteractionListeners = function () {
        this.container.addEventListener('mousemove', this.onMouseMove.bind(this));
        this.container.addEventListener('mousedown', this.onMouseDown.bind(this));
        this.container.addEventListener('mouseup', this.onMouseUp.bind(this));
        this.container.addEventListener('click', this.onClick.bind(this));
        window.addEventListener('keydown', this.onKeyDown.bind(this), false);
        window.addEventListener('keyup', this.onKeyUp.bind(this), false);
    };
    ScatterPlot.prototype.addCameraControlsEventListeners = function (cameraControls) {
        var _this = this;
        cameraControls.addEventListener('start', function () {
            _this.stopOrbitAnimation();
            _this.onCameraMoveListeners.forEach(function (l) {
                return l(_this.camera.position, cameraControls.target);
            });
        });
        cameraControls.addEventListener('change', function () {
            _this.render();
        });
        cameraControls.addEventListener('end', function () { });
    };
    ScatterPlot.prototype.makeOrbitControls = function (camera, cameraDef, cameraIs3D) {
        if (this.orbitCameraControls != null) {
            this.orbitCameraControls.dispose();
        }
        var occ = new orbit_controls_1.OrbitControls(camera, this.renderer.domElement);
        occ.target0 = new THREE.Vector3(cameraDef.target[0], cameraDef.target[1], cameraDef.target[2]);
        occ.position0 = new THREE.Vector3().copy(camera.position);
        occ.zoom0 = cameraDef.zoom;
        occ.zoomSpeed = ORBIT_ZOOM_SPEED;
        occ.enableRotate = cameraIs3D;
        occ.autoRotate = false;
        occ.rotateSpeed = ORBIT_MOUSE_ROTATION_SPEED;
        if (cameraIs3D) {
            occ.mouseButtons.LEFT = THREE.MOUSE.LEFT;
            occ.mouseButtons.RIGHT = THREE.MOUSE.RIGHT;
        }
        else {
            occ.mouseButtons.LEFT = null;
            occ.mouseButtons.RIGHT = THREE.MOUSE.LEFT;
        }
        occ.reset();
        this.camera = camera;
        this.orbitCameraControls = occ;
        this.addCameraControlsEventListeners(this.orbitCameraControls);
    };
    ScatterPlot.prototype.makeCamera = function (cameraParams) {
        if (cameraParams === void 0) { cameraParams = {}; }
        var def = this.makeDefaultCameraDef(this.dimensions, cameraParams);
        this.recreateCamera(def);
        if (this.dimensions === 3 && this.styles.axesVisible) {
            this.add3dAxes();
        }
        else {
            this.remove3dAxesFromScene();
        }
    };
    ScatterPlot.prototype.makeCamera3D = function (cameraDef, w, h) {
        var camera;
        {
            var aspectRatio = w / h;
            camera = new THREE.PerspectiveCamera(PERSP_CAMERA_FOV_VERTICAL, aspectRatio, PERSP_CAMERA_NEAR_CLIP_PLANE, PERSP_CAMERA_FAR_CLIP_PLANE);
            camera.position.set(cameraDef.position[0], cameraDef.position[1], cameraDef.position[2]);
            var at = new THREE.Vector3(cameraDef.target[0], cameraDef.target[1], cameraDef.target[2]);
            camera.lookAt(at);
            camera.zoom = cameraDef.zoom;
            camera.updateProjectionMatrix();
        }
        this.camera = camera;
        this.makeOrbitControls(camera, cameraDef, true);
    };
    ScatterPlot.prototype.makeCamera2D = function (cameraDef, w, h) {
        var camera;
        var target = new THREE.Vector3(cameraDef.target[0], cameraDef.target[1], cameraDef.target[2]);
        {
            var aspectRatio = w / h;
            var left = -ORTHO_CAMERA_FRUSTUM_HALF_EXTENT;
            var right = ORTHO_CAMERA_FRUSTUM_HALF_EXTENT;
            var bottom = -ORTHO_CAMERA_FRUSTUM_HALF_EXTENT;
            var top_1 = ORTHO_CAMERA_FRUSTUM_HALF_EXTENT;
            if (aspectRatio > 1) {
                left *= aspectRatio;
                right *= aspectRatio;
            }
            else {
                top_1 /= aspectRatio;
                bottom /= aspectRatio;
            }
            camera = new THREE.OrthographicCamera(left, right, top_1, bottom, -1000, 1000);
            camera.position.set(cameraDef.position[0], cameraDef.position[1], cameraDef.position[2]);
            camera.up = new THREE.Vector3(0, 0, 1);
            camera.lookAt(target);
            camera.zoom = cameraDef.zoom;
            camera.updateProjectionMatrix();
        }
        this.camera = camera;
        this.makeOrbitControls(camera, cameraDef, false);
    };
    ScatterPlot.prototype.makeDefaultCameraDef = function (dimensions, cameraParams) {
        if (cameraParams === void 0) { cameraParams = {}; }
        var orthographic = dimensions === 2;
        var position = orthographic ? START_CAMERA_POS_2D : START_CAMERA_POS_3D;
        var target = orthographic
            ? START_CAMERA_TARGET_2D
            : START_CAMERA_TARGET_3D;
        var def = {
            orthographic: orthographic,
            zoom: 1.0,
            position: [position.x, position.y, position.z],
            target: [target.x, target.y, target.z],
        };
        if (cameraParams.zoom)
            def.zoom = cameraParams.zoom;
        if (cameraParams.position)
            def.position = cameraParams.position;
        if (cameraParams.target)
            def.target = cameraParams.target;
        return def;
    };
    ScatterPlot.prototype.recreateCamera = function (cameraDef) {
        if (cameraDef.orthographic) {
            this.makeCamera2D(cameraDef, this.width, this.height);
        }
        else {
            this.makeCamera3D(cameraDef, this.width, this.height);
        }
        this.orbitCameraControls.minDistance = MIN_ZOOM;
        this.orbitCameraControls.maxDistance = MAX_ZOOM;
        this.orbitCameraControls.update();
        if (this.orbitAnimationOnNextCameraCreation) {
            this.startOrbitAnimation();
        }
    };
    ScatterPlot.prototype.setInteractionMode = function (interactionMode) {
        this.interactionMode = interactionMode;
        if (interactionMode === "SELECT") {
            this.selecting = true;
            this.container.style.cursor = 'crosshair';
        }
        else {
            this.selecting = false;
            this.container.style.cursor = 'default';
        }
    };
    ScatterPlot.prototype.onClick = function (e, notify) {
        if (notify === void 0) { notify = true; }
        if (e && this.selecting) {
            return;
        }
        if (!this.isDragSequence && notify) {
            var selection = this.nearestPoint != null ? [this.nearestPoint] : [];
            this.selectCallback(selection);
            this.clickCallback(this.nearestPoint);
        }
        this.isDragSequence = false;
        this.render();
    };
    ScatterPlot.prototype.onMouseDown = function (e) {
        this.isDragSequence = false;
        this.mouseIsDown = true;
        if (this.selecting) {
            this.orbitCameraControls.enabled = false;
            this.rectangleSelector.onMouseDown(e.offsetX, e.offsetY);
            this.setNearestPointToMouse(e);
        }
        else if (!e.ctrlKey &&
            this.sceneIs3D() &&
            this.orbitCameraControls.mouseButtons.ORBIT === THREE.MOUSE.RIGHT) {
            this.orbitCameraControls.mouseButtons.ORBIT = THREE.MOUSE.LEFT;
            this.orbitCameraControls.mouseButtons.PAN = THREE.MOUSE.RIGHT;
        }
        else if (e.ctrlKey &&
            this.sceneIs3D() &&
            this.orbitCameraControls.mouseButtons.ORBIT === THREE.MOUSE.LEFT) {
            this.orbitCameraControls.mouseButtons.ORBIT = THREE.MOUSE.RIGHT;
            this.orbitCameraControls.mouseButtons.PAN = THREE.MOUSE.LEFT;
        }
    };
    ScatterPlot.prototype.onMouseUp = function (e) {
        if (this.selecting) {
            this.orbitCameraControls.enabled = true;
            this.rectangleSelector.onMouseUp();
            this.render();
        }
        this.mouseIsDown = false;
    };
    ScatterPlot.prototype.onMouseMove = function (e) {
        this.isDragSequence = this.mouseIsDown;
        if (this.selecting && this.mouseIsDown) {
            this.rectangleSelector.onMouseMove(e.offsetX, e.offsetY);
            this.render();
        }
        else if (!this.mouseIsDown) {
            this.setNearestPointToMouse(e);
            if (this.nearestPoint != this.lastHovered) {
                this.lastHovered = this.nearestPoint;
                this.hoverCallback(this.nearestPoint);
            }
        }
    };
    ScatterPlot.prototype.onKeyDown = function (e) {
        if (e.keyCode === CTRL_KEY && this.sceneIs3D()) {
            this.orbitCameraControls.mouseButtons.ORBIT = THREE.MOUSE.RIGHT;
            this.orbitCameraControls.mouseButtons.PAN = THREE.MOUSE.LEFT;
        }
        if (e.keyCode === SHIFT_KEY) {
            this.selecting = true;
            this.container.style.cursor = 'crosshair';
        }
    };
    ScatterPlot.prototype.onKeyUp = function (e) {
        if (e.keyCode === CTRL_KEY && this.sceneIs3D()) {
            this.orbitCameraControls.mouseButtons.ORBIT = THREE.MOUSE.LEFT;
            this.orbitCameraControls.mouseButtons.PAN = THREE.MOUSE.RIGHT;
        }
        if (e.keyCode === SHIFT_KEY) {
            this.selecting = this.interactionMode === "PAN";
            if (!this.selecting) {
                this.container.style.cursor = 'default';
            }
            this.render();
        }
    };
    ScatterPlot.prototype.getPointIndicesFromPickingTexture = function (boundingBox) {
        if (this.worldSpacePointPositions == null) {
            return [];
        }
        var pointCount = this.worldSpacePointPositions.length / 3;
        var dpr = window.devicePixelRatio || 1;
        var x = Math.floor(boundingBox.x * dpr);
        var y = Math.floor(boundingBox.y * dpr);
        var width = Math.max(Math.floor(boundingBox.width * dpr), 1);
        var height = Math.max(Math.floor(boundingBox.height * dpr), 1);
        var pixelBuffer = new Uint8Array(width * height * 4);
        this.renderer.readRenderTargetPixels(this.pickingTexture, x, this.pickingTexture.height - y, width, height, pixelBuffer);
        var pointIndicesSelection = new Uint8Array(this.worldSpacePointPositions.length);
        for (var i = 0; i < width * height; i++) {
            var id = (pixelBuffer[i * 4] << 16) |
                (pixelBuffer[i * 4 + 1] << 8) |
                pixelBuffer[i * 4 + 2];
            if (id !== 0xffffff && id < pointCount) {
                pointIndicesSelection[id] = 1;
            }
        }
        var pointIndices = [];
        for (var i = 0; i < pointIndicesSelection.length; i++) {
            if (pointIndicesSelection[i] === 1) {
                pointIndices.push(i);
            }
        }
        return pointIndices;
    };
    ScatterPlot.prototype.selectBoundingBox = function (boundingBox) {
        var pointIndices = this.getPointIndicesFromPickingTexture(boundingBox);
        this.selectCallback(pointIndices);
    };
    ScatterPlot.prototype.setNearestPointToMouse = function (e) {
        if (this.pickingTexture == null) {
            this.nearestPoint = null;
            return;
        }
        var boundingBox = {
            x: e.offsetX,
            y: e.offsetY,
            width: 1,
            height: 1,
        };
        var pointIndices = this.getPointIndicesFromPickingTexture(boundingBox);
        this.nearestPoint = pointIndices.length ? pointIndices[0] : null;
    };
    ScatterPlot.prototype.computeLayoutValues = function () {
        this.width = this.container.offsetWidth;
        this.height = Math.max(1, this.container.offsetHeight);
        return [this.width, this.height];
    };
    ScatterPlot.prototype.sceneIs3D = function () {
        return this.dimensions === 3;
    };
    ScatterPlot.prototype.remove3dAxesFromScene = function () {
        var axes = this.scene.getObjectByName('axes');
        if (axes != null) {
            this.scene.remove(axes);
        }
        return axes;
    };
    ScatterPlot.prototype.add3dAxes = function () {
        var axes = new THREE.AxesHelper();
        axes.name = 'axes';
        this.scene.add(axes);
    };
    ScatterPlot.prototype.setDimensions = function (dimensions) {
        if (dimensions !== 2 && dimensions !== 3) {
            throw new RangeError('dimensions must be 2 or 3');
        }
        if (this.dimensions !== dimensions) {
            this.dimensions = dimensions;
            this.makeCamera();
        }
    };
    ScatterPlot.prototype.getCameraPosition = function () {
        var currPos = this.camera.position;
        return [currPos.x, currPos.y, currPos.z];
    };
    ScatterPlot.prototype.getCameraTarget = function () {
        var currTarget = this.orbitCameraControls.target;
        return [currTarget.x, currTarget.y, currTarget.z];
    };
    ScatterPlot.prototype.setCameraPositionAndTarget = function (position, target) {
        this.stopOrbitAnimation();
        this.camera.position.set(position[0], position[1], position[2]);
        this.orbitCameraControls.target.set(target[0], target[1], target[2]);
        this.orbitCameraControls.update();
        this.render();
    };
    ScatterPlot.prototype.startOrbitAnimation = function () {
        if (!this.sceneIs3D()) {
            return;
        }
        if (this.orbitAnimationId != null) {
            this.stopOrbitAnimation();
        }
        this.orbitCameraControls.autoRotate = true;
        this.orbitCameraControls.rotateSpeed = ORBIT_ANIMATION_ROTATION_CYCLE_IN_SECONDS;
        this.updateOrbitAnimation();
    };
    ScatterPlot.prototype.updateOrbitAnimation = function () {
        var _this = this;
        this.orbitCameraControls.update();
        this.orbitAnimationId = requestAnimationFrame(function () {
            return _this.updateOrbitAnimation();
        });
    };
    ScatterPlot.prototype.stopOrbitAnimation = function () {
        this.orbitCameraControls.autoRotate = false;
        this.orbitCameraControls.rotateSpeed = ORBIT_MOUSE_ROTATION_SPEED;
        if (this.orbitAnimationId != null) {
            cancelAnimationFrame(this.orbitAnimationId);
            this.orbitAnimationId = null;
        }
    };
    ScatterPlot.prototype.setActiveVisualizers = function (visualizers) {
        var e_1, _a, e_2, _b;
        var nextVisualizerIds = new Set(visualizers.map(function (v) { return v.id; }));
        try {
            for (var _c = __values(this.visualizers.values()), _d = _c.next(); !_d.done; _d = _c.next()) {
                var visualizer = _d.value;
                if (!nextVisualizerIds.has(visualizer.id)) {
                    visualizer.dispose();
                    this.visualizers.delete(visualizer.id);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
        try {
            for (var visualizers_1 = __values(visualizers), visualizers_1_1 = visualizers_1.next(); !visualizers_1_1.done; visualizers_1_1 = visualizers_1.next()) {
                var visualizer = visualizers_1_1.value;
                this.visualizers.set(visualizer.id, visualizer);
                visualizer.setScene(this.scene);
                visualizer.onResize(this.width, this.height);
                if (this.worldSpacePointPositions) {
                    visualizer.onPointPositionsChanged(this.worldSpacePointPositions);
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (visualizers_1_1 && !visualizers_1_1.done && (_b = visualizers_1.return)) _b.call(visualizers_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    ScatterPlot.prototype.disposeAllVisualizers = function () {
        this.visualizers.forEach(function (v) { return v.dispose(); });
        this.visualizers.clear();
    };
    ScatterPlot.prototype.setPointPositions = function (worldSpacePointPositions) {
        this.worldSpacePointPositions = worldSpacePointPositions;
        this.visualizers.forEach(function (v) {
            return v.onPointPositionsChanged(worldSpacePointPositions);
        });
    };
    ScatterPlot.prototype.render = function () {
        {
            var lightPos = this.camera.position.clone();
            lightPos.x += 1;
            lightPos.y += 1;
            this.light.position.set(lightPos.x, lightPos.y, lightPos.z);
        }
        var cameraType = this.camera instanceof THREE.PerspectiveCamera
            ? render_1.CameraType.Perspective
            : render_1.CameraType.Orthographic;
        var cameraSpacePointExtents = [0, 0];
        if (this.worldSpacePointPositions != null) {
            cameraSpacePointExtents = util.getNearFarPoints(this.worldSpacePointPositions, this.camera.position, this.orbitCameraControls.target);
        }
        var rc = new render_1.RenderContext(this.camera, cameraType, this.orbitCameraControls.target, this.width, this.height, cameraSpacePointExtents[0], cameraSpacePointExtents[1], this.styles.backgroundColor, this.pointColors, this.pointScaleFactors, this.labels, this.polylineColors, this.polylineOpacities, this.polylineWidths);
        this.visualizers.forEach(function (v) { return v.onPickingRender(rc); });
        {
            var axes = this.remove3dAxesFromScene();
            this.renderer.setRenderTarget(this.pickingTexture);
            this.renderer.render(this.scene, this.camera);
            if (axes != null) {
                this.scene.add(axes);
            }
        }
        this.visualizers.forEach(function (v) { return v.onRender(rc); });
        this.renderer.setRenderTarget(null);
        this.renderer.render(this.scene, this.camera);
    };
    ScatterPlot.prototype.setPointColors = function (colors) {
        this.pointColors = colors;
    };
    ScatterPlot.prototype.setPointScaleFactors = function (scaleFactors) {
        this.pointScaleFactors = scaleFactors;
    };
    ScatterPlot.prototype.setLabels = function (labels) {
        this.labels = labels;
    };
    ScatterPlot.prototype.setPolylineColors = function (colors) {
        this.polylineColors = colors;
    };
    ScatterPlot.prototype.setPolylineOpacities = function (opacities) {
        this.polylineOpacities = opacities;
    };
    ScatterPlot.prototype.setPolylineWidths = function (widths) {
        this.polylineWidths = widths;
    };
    ScatterPlot.prototype.resetZoom = function () {
        this.recreateCamera(this.makeDefaultCameraDef(this.dimensions));
        this.render();
    };
    ScatterPlot.prototype.setDayNightMode = function (isNight) {
        var canvases = this.container.querySelectorAll('canvas');
        var filterValue = isNight ? 'invert(100%)' : '';
        for (var i = 0; i < canvases.length; i++) {
            canvases[i].style.filter = filterValue;
        }
    };
    ScatterPlot.prototype.resize = function (render) {
        if (render === void 0) { render = true; }
        var _a = __read([this.width, this.height], 2), oldW = _a[0], oldH = _a[1];
        var _b = __read(this.computeLayoutValues(), 2), newW = _b[0], newH = _b[1];
        if (this.dimensions === 3) {
            var camera = this.camera;
            camera.aspect = newW / newH;
            camera.updateProjectionMatrix();
        }
        else {
            var camera = this.camera;
            var scaleW = newW / oldW;
            var scaleH = newH / oldH;
            var newCamHalfWidth = ((camera.right - camera.left) * scaleW) / 2;
            var newCamHalfHeight = ((camera.top - camera.bottom) * scaleH) / 2;
            camera.top = newCamHalfHeight;
            camera.bottom = -newCamHalfHeight;
            camera.left = -newCamHalfWidth;
            camera.right = newCamHalfWidth;
            camera.updateProjectionMatrix();
        }
        var dpr = window.devicePixelRatio || 1;
        this.renderer.setPixelRatio(dpr);
        this.renderer.setSize(newW, newH);
        {
            var renderCanvasSize = new THREE.Vector2();
            this.renderer.getSize(renderCanvasSize);
            var pixelRatio = this.renderer.getPixelRatio();
            this.pickingTexture = new THREE.WebGLRenderTarget(renderCanvasSize.width * pixelRatio, renderCanvasSize.height * pixelRatio);
            this.pickingTexture.texture.minFilter = THREE.LinearFilter;
        }
        this.visualizers.forEach(function (v) { return v.onResize(newW, newH); });
        if (render) {
            this.render();
        }
    };
    ScatterPlot.prototype.onCameraMove = function (listener) {
        this.onCameraMoveListeners.push(listener);
    };
    ScatterPlot.prototype.clickOnPoint = function (pointIndex) {
        this.nearestPoint = pointIndex;
        this.onClick(null, false);
    };
    return ScatterPlot;
}());
exports.ScatterPlot = ScatterPlot;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var OC = __webpack_require__(8);
exports.OrbitControls = OC;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

/* three-orbitcontrols addendum */ var THREE = __webpack_require__(0);
/**
 * @author qiao / https://github.com/qiao
 * @author mrdoob / http://mrdoob.com
 * @author alteredq / http://alteredqualia.com/
 * @author WestLangley / http://github.com/WestLangley
 * @author erich666 / http://erichaines.com
 */

// This set of controls performs orbiting, dollying (zooming), and panning.
// Unlike TrackballControls, it maintains the "up" direction object.up (+Y by default).
//
//    Orbit - left mouse / touch: one-finger move
//    Zoom - middle mouse, or mousewheel / touch: two-finger spread or squish
//    Pan - right mouse, or left mouse + ctrl/meta/shiftKey, or arrow keys / touch: two-finger move

THREE.OrbitControls = function ( object, domElement ) {

	this.object = object;

	this.domElement = ( domElement !== undefined ) ? domElement : document;

	// Set to false to disable this control
	this.enabled = true;

	// "target" sets the location of focus, where the object orbits around
	this.target = new THREE.Vector3();

	// How far you can dolly in and out ( PerspectiveCamera only )
	this.minDistance = 0;
	this.maxDistance = Infinity;

	// How far you can zoom in and out ( OrthographicCamera only )
	this.minZoom = 0;
	this.maxZoom = Infinity;

	// How far you can orbit vertically, upper and lower limits.
	// Range is 0 to Math.PI radians.
	this.minPolarAngle = 0; // radians
	this.maxPolarAngle = Math.PI; // radians

	// How far you can orbit horizontally, upper and lower limits.
	// If set, must be a sub-interval of the interval [ - Math.PI, Math.PI ].
	this.minAzimuthAngle = - Infinity; // radians
	this.maxAzimuthAngle = Infinity; // radians

	// Set to true to enable damping (inertia)
	// If damping is enabled, you must call controls.update() in your animation loop
	this.enableDamping = false;
	this.dampingFactor = 0.25;

	// This option actually enables dollying in and out; left as "zoom" for backwards compatibility.
	// Set to false to disable zooming
	this.enableZoom = true;
	this.zoomSpeed = 1.0;

	// Set to false to disable rotating
	this.enableRotate = true;
	this.rotateSpeed = 1.0;

	// Set to false to disable panning
	this.enablePan = true;
	this.panSpeed = 1.0;
	this.screenSpacePanning = false; // if true, pan in screen-space
	this.keyPanSpeed = 7.0;	// pixels moved per arrow key push

	// Set to true to automatically rotate around the target
	// If auto-rotate is enabled, you must call controls.update() in your animation loop
	this.autoRotate = false;
	this.autoRotateSpeed = 2.0; // 30 seconds per round when fps is 60

	// Set to false to disable use of the keys
	this.enableKeys = true;

	// The four arrow keys
	this.keys = { LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40 };

	// Mouse buttons
	this.mouseButtons = { LEFT: THREE.MOUSE.LEFT, MIDDLE: THREE.MOUSE.MIDDLE, RIGHT: THREE.MOUSE.RIGHT };

	// for reset
	this.target0 = this.target.clone();
	this.position0 = this.object.position.clone();
	this.zoom0 = this.object.zoom;

	//
	// public methods
	//

	this.getPolarAngle = function () {

		return spherical.phi;

	};

	this.getAzimuthalAngle = function () {

		return spherical.theta;

	};

	this.saveState = function () {

		scope.target0.copy( scope.target );
		scope.position0.copy( scope.object.position );
		scope.zoom0 = scope.object.zoom;

	};

	this.reset = function () {

		scope.target.copy( scope.target0 );
		scope.object.position.copy( scope.position0 );
		scope.object.zoom = scope.zoom0;

		scope.object.updateProjectionMatrix();
		scope.dispatchEvent( changeEvent );

		scope.update();

		state = STATE.NONE;

	};

	// this method is exposed, but perhaps it would be better if we can make it private...
	this.update = function () {

		var offset = new THREE.Vector3();

		// so camera.up is the orbit axis
		var quat = new THREE.Quaternion().setFromUnitVectors( object.up, new THREE.Vector3( 0, 1, 0 ) );
		var quatInverse = quat.clone().inverse();

		var lastPosition = new THREE.Vector3();
		var lastQuaternion = new THREE.Quaternion();

		return function update() {

			var position = scope.object.position;

			offset.copy( position ).sub( scope.target );

			// rotate offset to "y-axis-is-up" space
			offset.applyQuaternion( quat );

			// angle from z-axis around y-axis
			spherical.setFromVector3( offset );

			if ( scope.autoRotate && state === STATE.NONE ) {

				rotateLeft( getAutoRotationAngle() );

			}

			spherical.theta += sphericalDelta.theta;
			spherical.phi += sphericalDelta.phi;

			// restrict theta to be between desired limits
			spherical.theta = Math.max( scope.minAzimuthAngle, Math.min( scope.maxAzimuthAngle, spherical.theta ) );

			// restrict phi to be between desired limits
			spherical.phi = Math.max( scope.minPolarAngle, Math.min( scope.maxPolarAngle, spherical.phi ) );

			spherical.makeSafe();


			spherical.radius *= scale;

			// restrict radius to be between desired limits
			spherical.radius = Math.max( scope.minDistance, Math.min( scope.maxDistance, spherical.radius ) );

			// move target to panned location
			scope.target.add( panOffset );

			offset.setFromSpherical( spherical );

			// rotate offset back to "camera-up-vector-is-up" space
			offset.applyQuaternion( quatInverse );

			position.copy( scope.target ).add( offset );

			scope.object.lookAt( scope.target );

			if ( scope.enableDamping === true ) {

				sphericalDelta.theta *= ( 1 - scope.dampingFactor );
				sphericalDelta.phi *= ( 1 - scope.dampingFactor );

				panOffset.multiplyScalar( 1 - scope.dampingFactor );

			} else {

				sphericalDelta.set( 0, 0, 0 );

				panOffset.set( 0, 0, 0 );

			}

			scale = 1;

			// update condition is:
			// min(camera displacement, camera rotation in radians)^2 > EPS
			// using small-angle approximation cos(x/2) = 1 - x^2 / 8

			if ( zoomChanged ||
				lastPosition.distanceToSquared( scope.object.position ) > EPS ||
				8 * ( 1 - lastQuaternion.dot( scope.object.quaternion ) ) > EPS ) {

				scope.dispatchEvent( changeEvent );

				lastPosition.copy( scope.object.position );
				lastQuaternion.copy( scope.object.quaternion );
				zoomChanged = false;

				return true;

			}

			return false;

		};

	}();

	this.dispose = function () {

		scope.domElement.removeEventListener( 'contextmenu', onContextMenu, false );
		scope.domElement.removeEventListener( 'mousedown', onMouseDown, false );
		scope.domElement.removeEventListener( 'wheel', onMouseWheel, false );

		scope.domElement.removeEventListener( 'touchstart', onTouchStart, false );
		scope.domElement.removeEventListener( 'touchend', onTouchEnd, false );
		scope.domElement.removeEventListener( 'touchmove', onTouchMove, false );

		document.removeEventListener( 'mousemove', onMouseMove, false );
		document.removeEventListener( 'mouseup', onMouseUp, false );

		window.removeEventListener( 'keydown', onKeyDown, false );

		//scope.dispatchEvent( { type: 'dispose' } ); // should this be added here?

	};

	//
	// internals
	//

	var scope = this;

	var changeEvent = { type: 'change' };
	var startEvent = { type: 'start' };
	var endEvent = { type: 'end' };

	var STATE = { NONE: - 1, ROTATE: 0, DOLLY: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_DOLLY_PAN: 4 };

	var state = STATE.NONE;

	var EPS = 0.000001;

	// current position in spherical coordinates
	var spherical = new THREE.Spherical();
	var sphericalDelta = new THREE.Spherical();

	var scale = 1;
	var panOffset = new THREE.Vector3();
	var zoomChanged = false;

	var rotateStart = new THREE.Vector2();
	var rotateEnd = new THREE.Vector2();
	var rotateDelta = new THREE.Vector2();

	var panStart = new THREE.Vector2();
	var panEnd = new THREE.Vector2();
	var panDelta = new THREE.Vector2();

	var dollyStart = new THREE.Vector2();
	var dollyEnd = new THREE.Vector2();
	var dollyDelta = new THREE.Vector2();

	function getAutoRotationAngle() {

		return 2 * Math.PI / 60 / 60 * scope.autoRotateSpeed;

	}

	function getZoomScale() {

		return Math.pow( 0.95, scope.zoomSpeed );

	}

	function rotateLeft( angle ) {

		sphericalDelta.theta -= angle;

	}

	function rotateUp( angle ) {

		sphericalDelta.phi -= angle;

	}

	var panLeft = function () {

		var v = new THREE.Vector3();

		return function panLeft( distance, objectMatrix ) {

			v.setFromMatrixColumn( objectMatrix, 0 ); // get X column of objectMatrix
			v.multiplyScalar( - distance );

			panOffset.add( v );

		};

	}();

	var panUp = function () {

		var v = new THREE.Vector3();

		return function panUp( distance, objectMatrix ) {

			if ( scope.screenSpacePanning === true ) {

				v.setFromMatrixColumn( objectMatrix, 1 );

			} else {

				v.setFromMatrixColumn( objectMatrix, 0 );
				v.crossVectors( scope.object.up, v );

			}

			v.multiplyScalar( distance );

			panOffset.add( v );

		};

	}();

	// deltaX and deltaY are in pixels; right and down are positive
	var pan = function () {

		var offset = new THREE.Vector3();

		return function pan( deltaX, deltaY ) {

			var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

			if ( scope.object.isPerspectiveCamera ) {

				// perspective
				var position = scope.object.position;
				offset.copy( position ).sub( scope.target );
				var targetDistance = offset.length();

				// half of the fov is center to top of screen
				targetDistance *= Math.tan( ( scope.object.fov / 2 ) * Math.PI / 180.0 );

				// we use only clientHeight here so aspect ratio does not distort speed
				panLeft( 2 * deltaX * targetDistance / element.clientHeight, scope.object.matrix );
				panUp( 2 * deltaY * targetDistance / element.clientHeight, scope.object.matrix );

			} else if ( scope.object.isOrthographicCamera ) {

				// orthographic
				panLeft( deltaX * ( scope.object.right - scope.object.left ) / scope.object.zoom / element.clientWidth, scope.object.matrix );
				panUp( deltaY * ( scope.object.top - scope.object.bottom ) / scope.object.zoom / element.clientHeight, scope.object.matrix );

			} else {

				// camera neither orthographic nor perspective
				console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.' );
				scope.enablePan = false;

			}

		};

	}();

	function dollyIn( dollyScale ) {

		if ( scope.object.isPerspectiveCamera ) {

			scale /= dollyScale;

		} else if ( scope.object.isOrthographicCamera ) {

			scope.object.zoom = Math.max( scope.minZoom, Math.min( scope.maxZoom, scope.object.zoom * dollyScale ) );
			scope.object.updateProjectionMatrix();
			zoomChanged = true;

		} else {

			console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.' );
			scope.enableZoom = false;

		}

	}

	function dollyOut( dollyScale ) {

		if ( scope.object.isPerspectiveCamera ) {

			scale *= dollyScale;

		} else if ( scope.object.isOrthographicCamera ) {

			scope.object.zoom = Math.max( scope.minZoom, Math.min( scope.maxZoom, scope.object.zoom / dollyScale ) );
			scope.object.updateProjectionMatrix();
			zoomChanged = true;

		} else {

			console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.' );
			scope.enableZoom = false;

		}

	}

	//
	// event callbacks - update the object state
	//

	function handleMouseDownRotate( event ) {

		//console.log( 'handleMouseDownRotate' );

		rotateStart.set( event.clientX, event.clientY );

	}

	function handleMouseDownDolly( event ) {

		//console.log( 'handleMouseDownDolly' );

		dollyStart.set( event.clientX, event.clientY );

	}

	function handleMouseDownPan( event ) {

		//console.log( 'handleMouseDownPan' );

		panStart.set( event.clientX, event.clientY );

	}

	function handleMouseMoveRotate( event ) {

		//console.log( 'handleMouseMoveRotate' );

		rotateEnd.set( event.clientX, event.clientY );

		rotateDelta.subVectors( rotateEnd, rotateStart ).multiplyScalar( scope.rotateSpeed );

		var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

		rotateLeft( 2 * Math.PI * rotateDelta.x / element.clientHeight ); // yes, height

		rotateUp( 2 * Math.PI * rotateDelta.y / element.clientHeight );

		rotateStart.copy( rotateEnd );

		scope.update();

	}

	function handleMouseMoveDolly( event ) {

		//console.log( 'handleMouseMoveDolly' );

		dollyEnd.set( event.clientX, event.clientY );

		dollyDelta.subVectors( dollyEnd, dollyStart );

		if ( dollyDelta.y > 0 ) {

			dollyIn( getZoomScale() );

		} else if ( dollyDelta.y < 0 ) {

			dollyOut( getZoomScale() );

		}

		dollyStart.copy( dollyEnd );

		scope.update();

	}

	function handleMouseMovePan( event ) {

		//console.log( 'handleMouseMovePan' );

		panEnd.set( event.clientX, event.clientY );

		panDelta.subVectors( panEnd, panStart ).multiplyScalar( scope.panSpeed );

		pan( panDelta.x, panDelta.y );

		panStart.copy( panEnd );

		scope.update();

	}

	function handleMouseUp( event ) {

		// console.log( 'handleMouseUp' );

	}

	function handleMouseWheel( event ) {

		// console.log( 'handleMouseWheel' );

		if ( event.deltaY < 0 ) {

			dollyOut( getZoomScale() );

		} else if ( event.deltaY > 0 ) {

			dollyIn( getZoomScale() );

		}

		scope.update();

	}

	function handleKeyDown( event ) {

		// console.log( 'handleKeyDown' );

		var needsUpdate = false;

		switch ( event.keyCode ) {

			case scope.keys.UP:
				pan( 0, scope.keyPanSpeed );
				needsUpdate = true;
				break;

			case scope.keys.BOTTOM:
				pan( 0, - scope.keyPanSpeed );
				needsUpdate = true;
				break;

			case scope.keys.LEFT:
				pan( scope.keyPanSpeed, 0 );
				needsUpdate = true;
				break;

			case scope.keys.RIGHT:
				pan( - scope.keyPanSpeed, 0 );
				needsUpdate = true;
				break;

		}

		if ( needsUpdate ) {

			// prevent the browser from scrolling on cursor keys
			event.preventDefault();

			scope.update();

		}


	}

	function handleTouchStartRotate( event ) {

		//console.log( 'handleTouchStartRotate' );

		rotateStart.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );

	}

	function handleTouchStartDollyPan( event ) {

		//console.log( 'handleTouchStartDollyPan' );

		if ( scope.enableZoom ) {

			var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
			var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;

			var distance = Math.sqrt( dx * dx + dy * dy );

			dollyStart.set( 0, distance );

		}

		if ( scope.enablePan ) {

			var x = 0.5 * ( event.touches[ 0 ].pageX + event.touches[ 1 ].pageX );
			var y = 0.5 * ( event.touches[ 0 ].pageY + event.touches[ 1 ].pageY );

			panStart.set( x, y );

		}

	}

	function handleTouchMoveRotate( event ) {

		//console.log( 'handleTouchMoveRotate' );

		rotateEnd.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );

		rotateDelta.subVectors( rotateEnd, rotateStart ).multiplyScalar( scope.rotateSpeed );

		var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

		rotateLeft( 2 * Math.PI * rotateDelta.x / element.clientHeight ); // yes, height

		rotateUp( 2 * Math.PI * rotateDelta.y / element.clientHeight );

		rotateStart.copy( rotateEnd );

		scope.update();

	}

	function handleTouchMoveDollyPan( event ) {

		//console.log( 'handleTouchMoveDollyPan' );

		if ( scope.enableZoom ) {

			var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
			var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;

			var distance = Math.sqrt( dx * dx + dy * dy );

			dollyEnd.set( 0, distance );

			dollyDelta.set( 0, Math.pow( dollyEnd.y / dollyStart.y, scope.zoomSpeed ) );

			dollyIn( dollyDelta.y );

			dollyStart.copy( dollyEnd );

		}

		if ( scope.enablePan ) {

			var x = 0.5 * ( event.touches[ 0 ].pageX + event.touches[ 1 ].pageX );
			var y = 0.5 * ( event.touches[ 0 ].pageY + event.touches[ 1 ].pageY );

			panEnd.set( x, y );

			panDelta.subVectors( panEnd, panStart ).multiplyScalar( scope.panSpeed );

			pan( panDelta.x, panDelta.y );

			panStart.copy( panEnd );

		}

		scope.update();

	}

	function handleTouchEnd( event ) {

		//console.log( 'handleTouchEnd' );

	}

	//
	// event handlers - FSM: listen for events and reset state
	//

	function onMouseDown( event ) {

		if ( scope.enabled === false ) return;

		// Prevent the browser from scrolling.

		event.preventDefault();

		// Manually set the focus since calling preventDefault above
		// prevents the browser from setting it automatically.

		scope.domElement.focus ? scope.domElement.focus() : window.focus();

		switch ( event.button ) {

			case scope.mouseButtons.LEFT:

				if ( event.ctrlKey || event.metaKey || event.shiftKey ) {

					if ( scope.enablePan === false ) return;

					handleMouseDownPan( event );

					state = STATE.PAN;

				} else {

					if ( scope.enableRotate === false ) return;

					handleMouseDownRotate( event );

					state = STATE.ROTATE;

				}

				break;

			case scope.mouseButtons.MIDDLE:

				if ( scope.enableZoom === false ) return;

				handleMouseDownDolly( event );

				state = STATE.DOLLY;

				break;

			case scope.mouseButtons.RIGHT:

				if ( scope.enablePan === false ) return;

				handleMouseDownPan( event );

				state = STATE.PAN;

				break;

		}

		if ( state !== STATE.NONE ) {

			document.addEventListener( 'mousemove', onMouseMove, false );
			document.addEventListener( 'mouseup', onMouseUp, false );

			scope.dispatchEvent( startEvent );

		}

	}

	function onMouseMove( event ) {

		if ( scope.enabled === false ) return;

		event.preventDefault();

		switch ( state ) {

			case STATE.ROTATE:

				if ( scope.enableRotate === false ) return;

				handleMouseMoveRotate( event );

				break;

			case STATE.DOLLY:

				if ( scope.enableZoom === false ) return;

				handleMouseMoveDolly( event );

				break;

			case STATE.PAN:

				if ( scope.enablePan === false ) return;

				handleMouseMovePan( event );

				break;

		}

	}

	function onMouseUp( event ) {

		if ( scope.enabled === false ) return;

		handleMouseUp( event );

		document.removeEventListener( 'mousemove', onMouseMove, false );
		document.removeEventListener( 'mouseup', onMouseUp, false );

		scope.dispatchEvent( endEvent );

		state = STATE.NONE;

	}

	function onMouseWheel( event ) {

		if ( scope.enabled === false || scope.enableZoom === false || ( state !== STATE.NONE && state !== STATE.ROTATE ) ) return;

		event.preventDefault();
		event.stopPropagation();

		scope.dispatchEvent( startEvent );

		handleMouseWheel( event );

		scope.dispatchEvent( endEvent );

	}

	function onKeyDown( event ) {

		if ( scope.enabled === false || scope.enableKeys === false || scope.enablePan === false ) return;

		handleKeyDown( event );

	}

	function onTouchStart( event ) {

		if ( scope.enabled === false ) return;

		event.preventDefault();

		switch ( event.touches.length ) {

			case 1:	// one-fingered touch: rotate

				if ( scope.enableRotate === false ) return;

				handleTouchStartRotate( event );

				state = STATE.TOUCH_ROTATE;

				break;

			case 2:	// two-fingered touch: dolly-pan

				if ( scope.enableZoom === false && scope.enablePan === false ) return;

				handleTouchStartDollyPan( event );

				state = STATE.TOUCH_DOLLY_PAN;

				break;

			default:

				state = STATE.NONE;

		}

		if ( state !== STATE.NONE ) {

			scope.dispatchEvent( startEvent );

		}

	}

	function onTouchMove( event ) {

		if ( scope.enabled === false ) return;

		event.preventDefault();
		event.stopPropagation();

		switch ( event.touches.length ) {

			case 1: // one-fingered touch: rotate

				if ( scope.enableRotate === false ) return;
				if ( state !== STATE.TOUCH_ROTATE ) return; // is this needed?

				handleTouchMoveRotate( event );

				break;

			case 2: // two-fingered touch: dolly-pan

				if ( scope.enableZoom === false && scope.enablePan === false ) return;
				if ( state !== STATE.TOUCH_DOLLY_PAN ) return; // is this needed?

				handleTouchMoveDollyPan( event );

				break;

			default:

				state = STATE.NONE;

		}

	}

	function onTouchEnd( event ) {

		if ( scope.enabled === false ) return;

		handleTouchEnd( event );

		scope.dispatchEvent( endEvent );

		state = STATE.NONE;

	}

	function onContextMenu( event ) {

		if ( scope.enabled === false ) return;

		event.preventDefault();

	}

	//

	scope.domElement.addEventListener( 'contextmenu', onContextMenu, false );

	scope.domElement.addEventListener( 'mousedown', onMouseDown, false );
	scope.domElement.addEventListener( 'wheel', onMouseWheel, false );

	scope.domElement.addEventListener( 'touchstart', onTouchStart, false );
	scope.domElement.addEventListener( 'touchend', onTouchEnd, false );
	scope.domElement.addEventListener( 'touchmove', onTouchMove, false );

	window.addEventListener( 'keydown', onKeyDown, false );

	// force an update at start

	this.update();

};

THREE.OrbitControls.prototype = Object.create( THREE.EventDispatcher.prototype );
THREE.OrbitControls.prototype.constructor = THREE.OrbitControls;

Object.defineProperties( THREE.OrbitControls.prototype, {

	center: {

		get: function () {

			console.warn( 'THREE.OrbitControls: .center has been renamed to .target' );
			return this.target;

		}

	},

	// backward compatibility

	noZoom: {

		get: function () {

			console.warn( 'THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead.' );
			return ! this.enableZoom;

		},

		set: function ( value ) {

			console.warn( 'THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead.' );
			this.enableZoom = ! value;

		}

	},

	noRotate: {

		get: function () {

			console.warn( 'THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead.' );
			return ! this.enableRotate;

		},

		set: function ( value ) {

			console.warn( 'THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead.' );
			this.enableRotate = ! value;

		}

	},

	noPan: {

		get: function () {

			console.warn( 'THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead.' );
			return ! this.enablePan;

		},

		set: function ( value ) {

			console.warn( 'THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead.' );
			this.enablePan = ! value;

		}

	},

	noKeys: {

		get: function () {

			console.warn( 'THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead.' );
			return ! this.enableKeys;

		},

		set: function ( value ) {

			console.warn( 'THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead.' );
			this.enableKeys = ! value;

		}

	},

	staticMoving: {

		get: function () {

			console.warn( 'THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead.' );
			return ! this.enableDamping;

		},

		set: function ( value ) {

			console.warn( 'THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead.' );
			this.enableDamping = ! value;

		}

	},

	dynamicDampingFactor: {

		get: function () {

			console.warn( 'THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead.' );
			return this.dampingFactor;

		},

		set: function ( value ) {

			console.warn( 'THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead.' );
			this.dampingFactor = value;

		}

	}

} );
/* three-orbitcontrols addendum */ module.exports = exports.default = THREE.OrbitControls;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ScatterPlotRectangleSelector = (function () {
    function ScatterPlotRectangleSelector(container, selectionCallback, styles) {
        this.startCoordinates = [0, 0];
        this.svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.svgElement.style.display = 'none';
        this.svgElement.style.height = '100%';
        this.svgElement.style.width = '100%';
        this.svgElement.style.position = 'absolute';
        container.insertAdjacentElement('afterbegin', this.svgElement);
        this.rectElement = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        this.rectElement.style.stroke = styles.select.stroke;
        this.rectElement.style.strokeDasharray = styles.select.strokeDashArray;
        this.rectElement.style.strokeWidth = "" + styles.select.strokeWidth;
        this.rectElement.style.fill = styles.select.fill;
        this.rectElement.style.fillOpacity = "" + styles.select.fillOpacity;
        this.svgElement.appendChild(this.rectElement);
        this.selectionCallback = selectionCallback;
        this.isMouseDown = false;
    }
    ScatterPlotRectangleSelector.prototype.onMouseDown = function (offsetX, offsetY) {
        this.isMouseDown = true;
        this.rectElement.style.display = 'block';
        this.svgElement.style.display = 'block';
        this.startCoordinates = [offsetX, offsetY];
        this.lastBoundingBox = {
            x: this.startCoordinates[0],
            y: this.startCoordinates[1],
            width: 1,
            height: 1,
        };
    };
    ScatterPlotRectangleSelector.prototype.onMouseMove = function (offsetX, offsetY) {
        if (!this.isMouseDown) {
            return;
        }
        this.lastBoundingBox.x = Math.min(offsetX, this.startCoordinates[0]);
        this.lastBoundingBox.y = Math.max(offsetY, this.startCoordinates[1]);
        this.lastBoundingBox.width =
            Math.max(offsetX, this.startCoordinates[0]) - this.lastBoundingBox.x;
        this.lastBoundingBox.height =
            this.lastBoundingBox.y - Math.min(offsetY, this.startCoordinates[1]);
        this.rectElement.setAttribute('x', '' + this.lastBoundingBox.x);
        this.rectElement.setAttribute('y', '' + (this.lastBoundingBox.y - this.lastBoundingBox.height));
        this.rectElement.setAttribute('width', '' + this.lastBoundingBox.width);
        this.rectElement.setAttribute('height', '' + this.lastBoundingBox.height);
    };
    ScatterPlotRectangleSelector.prototype.onMouseUp = function () {
        this.isMouseDown = false;
        this.svgElement.style.display = 'none';
        this.rectElement.style.display = 'none';
        this.rectElement.setAttribute('width', '0');
        this.rectElement.setAttribute('height', '0');
        this.selectionCallback(this.lastBoundingBox);
    };
    return ScatterPlotRectangleSelector;
}());
exports.ScatterPlotRectangleSelector = ScatterPlotRectangleSelector;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var DIMENSIONALITY_ERROR_MESSAGE = 'Points must be an array of either 2 or 3 dimensional number arrays';
var Dataset = (function () {
    function Dataset(points, metadata) {
        var e_1, _a;
        if (metadata === void 0) { metadata = []; }
        this.points = points;
        this.metadata = metadata;
        var dimensions = points[0].length;
        if (!(dimensions === 2 || dimensions === 3)) {
            throw new Error(DIMENSIONALITY_ERROR_MESSAGE);
        }
        try {
            for (var points_1 = __values(points), points_1_1 = points_1.next(); !points_1_1.done; points_1_1 = points_1.next()) {
                var point = points_1_1.value;
                if (dimensions !== point.length) {
                    throw new Error(DIMENSIONALITY_ERROR_MESSAGE);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (points_1_1 && !points_1_1.done && (_a = points_1.return)) _a.call(points_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this.dimensions = dimensions;
    }
    Dataset.prototype.setSpriteMetadata = function (spriteMetadata) {
        this.spriteMetadata = spriteMetadata;
    };
    return Dataset;
}());
exports.Dataset = Dataset;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var defaultStyles = {
    backgroundColor: '#ffffff',
    axesVisible: true,
    fog: {
        color: '#ffffff',
        enabled: true,
        threshold: 5000,
    },
    label: {
        fontSize: 10,
        scaleDefault: 1,
        scaleLarge: 2,
        fillColorSelected: '#000000',
        fillColorHover: '#000000',
        strokeColorSelected: '#ffffff',
        strokeColorHover: '#ffffff',
        strokeWidth: 3,
        fillWidth: 6,
    },
    label3D: {
        fontSize: 80,
        scale: 2.2,
        color: 'black',
        backgroundColor: '#ffffff',
        colorUnselected: '#ffffff',
        colorNoSelection: '#ffffff',
    },
    point: {
        colorUnselected: '#e3e3e3',
        colorNoSelection: '#7575d9',
        colorSelected: '#fa6666',
        colorHover: '#760b4f',
        scaleDefault: 1.0,
        scaleSelected: 1.2,
        scaleHover: 1.2,
    },
    polyline: {
        startHue: 60,
        endHue: 360,
        saturation: 1,
        lightness: 0.3,
        defaultOpacity: 0.2,
        defaultLineWidth: 5,
        selectedOpacity: 0.9,
        selectedLineWidth: 3,
        deselectedOpacity: 0.05,
    },
    select: {
        fill: '#dddddd',
        fillOpacity: 0.2,
        stroke: '#aaaaaa',
        strokeWidth: 2,
        strokeDashArray: '10 5',
    },
    sprites: {
        minPointSize: 5.0,
        imageSize: 30,
        colorUnselected: '#ffffff',
        colorNoSelection: '#ffffff',
    },
};
function makeStyles(userStyles) {
    if (userStyles === undefined) {
        return defaultStyles;
    }
    for (var key in defaultStyles) {
        var _key = key;
        if (typeof defaultStyles[_key] === 'object' &&
            typeof userStyles[_key] === 'object') {
            defaultStyles[_key] = Object.assign(defaultStyles[_key], userStyles[_key]);
        }
        else if (userStyles[_key] !== undefined) {
            defaultStyles[_key] = userStyles[_key];
        }
    }
    return defaultStyles;
}
exports.makeStyles = makeStyles;
var DEFAULT_COLOR = '#FFFFFF';
function parseColor(color) {
    if (typeof color === 'number') {
        return;
    }
    else if (typeof color === 'string') {
    }
    return DEFAULT_COLOR;
}
exports.parseColor = parseColor;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var THREE = __webpack_require__(0);
var util = __webpack_require__(1);
var constants_1 = __webpack_require__(3);
var MAX_CANVAS_DIMENSION = 8192;
var NUM_GLYPHS = 256;
var VERTICES_PER_GLYPH = 2 * 3;
var makeVertexShader = function (fontSize, scale) { return "\n      attribute vec2 posObj;\n      attribute vec3 color;\n      varying vec2 vUv;\n      varying vec3 vColor;\n\n      void main() {\n        vUv = uv;\n        vColor = color;\n\n        // Rotate label to face camera.\n\n        vec4 vRight = vec4(\n          modelViewMatrix[0][0], modelViewMatrix[1][0], modelViewMatrix[2][0], 0);\n\n        vec4 vUp = vec4(\n          modelViewMatrix[0][1], modelViewMatrix[1][1], modelViewMatrix[2][1], 0);\n\n        vec4 vAt = -vec4(\n          modelViewMatrix[0][2], modelViewMatrix[1][2], modelViewMatrix[2][2], 0);\n\n        mat4 pointToCamera = mat4(vRight, vUp, vAt, vec4(0, 0, 0, 1));\n\n        vec2 scaledPos = posObj * " + 1 / fontSize + " * " + scale + ";\n\n        vec4 posRotated = pointToCamera * vec4(scaledPos, 0, 1);\n        vec4 mvPosition = modelViewMatrix * (vec4(position, 0) + posRotated);\n        gl_Position = projectionMatrix * mvPosition;\n      }"; };
var FRAGMENT_SHADER = "\n      uniform sampler2D texture;\n      uniform bool picking;\n      varying vec2 vUv;\n      varying vec3 vColor;\n\n      void main() {\n        if (picking) {\n          gl_FragColor = vec4(vColor, 1.0);\n        } else {\n          vec4 fromTexture = texture2D(texture, vUv);\n          gl_FragColor = vec4(vColor, 1.0) * fromTexture;\n        }\n      }";
var ScatterPlotVisualizer3DLabels = (function () {
    function ScatterPlotVisualizer3DLabels(styles) {
        this.styles = styles;
        this.id = '3D_LABELS';
        this.labelStrings = [];
        this.worldSpacePointPositions = new Float32Array();
        this.pickingColors = new Float32Array();
        this.renderColors = new Float32Array();
        this.uniforms = {};
        this.totalVertexCount = 0;
        this.labelVertexMap = [];
    }
    ScatterPlotVisualizer3DLabels.prototype.createGlyphTexture = function () {
        var _a = this.styles.label3D, fontSize = _a.fontSize, backgroundColor = _a.backgroundColor, color = _a.color;
        var canvas = document.createElement('canvas');
        canvas.width = MAX_CANVAS_DIMENSION;
        canvas.height = fontSize;
        var ctx = canvas.getContext('2d');
        ctx.font = 'bold ' + fontSize + 'px roboto';
        ctx.textBaseline = 'top';
        ctx.fillStyle = backgroundColor;
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.fill();
        ctx.fillStyle = color;
        var spaceOffset = ctx.measureText(' ').width;
        var glyphLengths = new Float32Array(NUM_GLYPHS);
        var glyphOffset = new Float32Array(NUM_GLYPHS);
        var leftCoord = 0;
        for (var i = 0; i < NUM_GLYPHS; i++) {
            var text = ' ' + String.fromCharCode(i);
            var textLength = ctx.measureText(text).width;
            glyphLengths[i] = textLength - spaceOffset;
            glyphOffset[i] = leftCoord;
            ctx.fillText(text, leftCoord - spaceOffset, 0);
            leftCoord += textLength;
        }
        var tex = util.createTextureFromCanvas(canvas);
        return { texture: tex, lengths: glyphLengths, offsets: glyphOffset };
    };
    ScatterPlotVisualizer3DLabels.prototype.processLabelVerts = function (pointCount) {
        var numTotalLetters = 0;
        this.labelVertexMap = [];
        for (var i = 0; i < pointCount; i++) {
            var label = this.labelStrings[i];
            var vertsArray = [];
            for (var j = 0; j < label.length; j++) {
                for (var k = 0; k < VERTICES_PER_GLYPH; k++) {
                    vertsArray.push(numTotalLetters * VERTICES_PER_GLYPH + k);
                }
                numTotalLetters++;
            }
            this.labelVertexMap.push(vertsArray);
        }
        this.totalVertexCount = numTotalLetters * VERTICES_PER_GLYPH;
    };
    ScatterPlotVisualizer3DLabels.prototype.createColorBuffers = function (pointCount) {
        var _this = this;
        this.pickingColors = new Float32Array(this.totalVertexCount * constants_1.RGB_NUM_ELEMENTS);
        this.renderColors = new Float32Array(this.totalVertexCount * constants_1.RGB_NUM_ELEMENTS);
        var _loop_1 = function (i) {
            var pickingColor = new THREE.Color(i);
            this_1.labelVertexMap[i].forEach(function (j) {
                _this.pickingColors[constants_1.RGB_NUM_ELEMENTS * j] = pickingColor.r;
                _this.pickingColors[constants_1.RGB_NUM_ELEMENTS * j + 1] = pickingColor.g;
                _this.pickingColors[constants_1.RGB_NUM_ELEMENTS * j + 2] = pickingColor.b;
                _this.renderColors[constants_1.RGB_NUM_ELEMENTS * j] = 1.0;
                _this.renderColors[constants_1.RGB_NUM_ELEMENTS * j + 1] = 1.0;
                _this.renderColors[constants_1.RGB_NUM_ELEMENTS * j + 2] = 1.0;
            });
        };
        var this_1 = this;
        for (var i = 0; i < pointCount; i++) {
            _loop_1(i);
        }
    };
    ScatterPlotVisualizer3DLabels.prototype.createLabels = function () {
        var _this = this;
        var _a = this.styles.label3D, fontSize = _a.fontSize, scale = _a.scale;
        if (this.labelStrings == null || this.worldSpacePointPositions == null) {
            return;
        }
        var pointCount = this.worldSpacePointPositions.length / constants_1.XYZ_NUM_ELEMENTS;
        if (pointCount !== this.labelStrings.length) {
            return;
        }
        this.glyphTexture = this.createGlyphTexture();
        this.uniforms = {
            texture: { type: 't' },
            picking: { type: 'bool' },
        };
        this.material = new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            transparent: true,
            vertexShader: makeVertexShader(fontSize, scale),
            fragmentShader: FRAGMENT_SHADER,
        });
        this.processLabelVerts(pointCount);
        this.createColorBuffers(pointCount);
        var positionArray = new Float32Array(this.totalVertexCount * constants_1.XYZ_NUM_ELEMENTS);
        this.positions = new THREE.BufferAttribute(positionArray, constants_1.XYZ_NUM_ELEMENTS);
        var posArray = new Float32Array(this.totalVertexCount * constants_1.XYZ_NUM_ELEMENTS);
        var uvArray = new Float32Array(this.totalVertexCount * constants_1.UV_NUM_ELEMENTS);
        var colorsArray = new Float32Array(this.totalVertexCount * constants_1.RGB_NUM_ELEMENTS);
        var positionObject = new THREE.BufferAttribute(posArray, 2);
        var uv = new THREE.BufferAttribute(uvArray, constants_1.UV_NUM_ELEMENTS);
        var colors = new THREE.BufferAttribute(colorsArray, constants_1.RGB_NUM_ELEMENTS);
        this.geometry = new THREE.BufferGeometry();
        this.geometry.addAttribute('posObj', positionObject);
        this.geometry.addAttribute('position', this.positions);
        this.geometry.addAttribute('uv', uv);
        this.geometry.addAttribute('color', colors);
        var lettersSoFar = 0;
        for (var i = 0; i < pointCount; i++) {
            var label = this.labelStrings[i];
            var leftOffset = 0;
            for (var j = 0; j < label.length; j++) {
                var letterCode = label.charCodeAt(j);
                leftOffset += this.glyphTexture.lengths[letterCode];
            }
            leftOffset /= -2;
            for (var j = 0; j < label.length; j++) {
                var letterCode = label.charCodeAt(j);
                var letterWidth = this.glyphTexture.lengths[letterCode];
                var scale_1 = fontSize;
                var right = (leftOffset + letterWidth) / scale_1;
                var left = leftOffset / scale_1;
                var top_1 = fontSize / scale_1;
                positionObject.setXY(lettersSoFar * VERTICES_PER_GLYPH + 0, left, 0);
                positionObject.setXY(lettersSoFar * VERTICES_PER_GLYPH + 1, right, 0);
                positionObject.setXY(lettersSoFar * VERTICES_PER_GLYPH + 2, left, top_1);
                positionObject.setXY(lettersSoFar * VERTICES_PER_GLYPH + 3, left, top_1);
                positionObject.setXY(lettersSoFar * VERTICES_PER_GLYPH + 4, right, 0);
                positionObject.setXY(lettersSoFar * VERTICES_PER_GLYPH + 5, right, top_1);
                var uLeft = this.glyphTexture.offsets[letterCode];
                var uRight = this.glyphTexture.offsets[letterCode] + letterWidth;
                uLeft /= MAX_CANVAS_DIMENSION;
                uRight /= MAX_CANVAS_DIMENSION;
                var vTop = 1;
                var vBottom = 0;
                uv.setXY(lettersSoFar * VERTICES_PER_GLYPH + 0, uLeft, vTop);
                uv.setXY(lettersSoFar * VERTICES_PER_GLYPH + 1, uRight, vTop);
                uv.setXY(lettersSoFar * VERTICES_PER_GLYPH + 2, uLeft, vBottom);
                uv.setXY(lettersSoFar * VERTICES_PER_GLYPH + 3, uLeft, vBottom);
                uv.setXY(lettersSoFar * VERTICES_PER_GLYPH + 4, uRight, vTop);
                uv.setXY(lettersSoFar * VERTICES_PER_GLYPH + 5, uRight, vBottom);
                lettersSoFar++;
                leftOffset += letterWidth;
            }
        }
        var _loop_2 = function (i) {
            var p = util.vector3FromPackedArray(this_2.worldSpacePointPositions, i);
            this_2.labelVertexMap[i].forEach(function (j) {
                _this.positions.setXYZ(j, p.x, p.y, p.z);
            });
        };
        var this_2 = this;
        for (var i = 0; i < pointCount; i++) {
            _loop_2(i);
        }
        this.labelsMesh = new THREE.Mesh(this.geometry, this.material);
        this.labelsMesh.frustumCulled = false;
        this.scene.add(this.labelsMesh);
    };
    ScatterPlotVisualizer3DLabels.prototype.colorLabels = function (pointColors) {
        if (this.labelStrings == null ||
            this.geometry == null ||
            pointColors == null) {
            return;
        }
        var colors = this.geometry.getAttribute('color');
        colors.array = this.renderColors;
        var n = pointColors.length / constants_1.XYZ_NUM_ELEMENTS;
        var src = 0;
        for (var i = 0; i < n; ++i) {
            var c = new THREE.Color(pointColors[src], pointColors[src + 1], pointColors[src + 2]);
            var m = this.labelVertexMap[i].length;
            for (var j = 0; j < m; ++j) {
                colors.setXYZ(this.labelVertexMap[i][j], c.r, c.g, c.b);
            }
            src += constants_1.RGB_NUM_ELEMENTS;
        }
        colors.needsUpdate = true;
    };
    ScatterPlotVisualizer3DLabels.prototype.setScene = function (scene) {
        this.scene = scene;
    };
    ScatterPlotVisualizer3DLabels.prototype.dispose = function () {
        if (this.labelsMesh) {
            if (this.scene) {
                this.scene.remove(this.labelsMesh);
            }
            this.labelsMesh = null;
        }
        if (this.geometry) {
            this.geometry.dispose();
            this.geometry = null;
        }
        if (this.glyphTexture != null && this.glyphTexture.texture != null) {
            this.glyphTexture.texture.dispose();
            this.glyphTexture.texture = null;
        }
    };
    ScatterPlotVisualizer3DLabels.prototype.onPickingRender = function (rc) {
        if (this.geometry == null) {
            this.createLabels();
            return;
        }
        this.material.uniforms.texture.value = this.glyphTexture.texture;
        this.material.uniforms.picking.value = true;
        var colors = this.geometry.getAttribute('color');
        colors.array = this.pickingColors;
        colors.needsUpdate = true;
    };
    ScatterPlotVisualizer3DLabels.prototype.onRender = function (rc) {
        if (this.geometry == null) {
            this.createLabels();
            return;
        }
        this.colorLabels(rc.pointColors);
        this.material.uniforms.texture.value = this.glyphTexture.texture;
        this.material.uniforms.picking.value = false;
        var colors = this.geometry.getAttribute('color');
        colors.array = this.renderColors;
        colors.needsUpdate = true;
    };
    ScatterPlotVisualizer3DLabels.prototype.onPointPositionsChanged = function (newPositions) {
        this.worldSpacePointPositions = newPositions;
        this.dispose();
    };
    ScatterPlotVisualizer3DLabels.prototype.setLabelStrings = function (labelStrings) {
        this.labelStrings = labelStrings;
        this.dispose();
    };
    ScatterPlotVisualizer3DLabels.prototype.onResize = function (newWidth, newHeight) { };
    return ScatterPlotVisualizer3DLabels;
}());
exports.ScatterPlotVisualizer3DLabels = ScatterPlotVisualizer3DLabels;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var THREE = __webpack_require__(0);
var render_1 = __webpack_require__(2);
var util = __webpack_require__(1);
var constants_1 = __webpack_require__(3);
var makeVertexShader = function (minPointSize) { return "\n    // Index of the specific vertex (passed in as bufferAttribute), and the\n    // variable that will be used to pass it to the fragment shader.\n    attribute float spriteIndex;\n    attribute vec3 color;\n    attribute float scaleFactor;\n\n    varying vec2 xyIndex;\n    varying vec3 vColor;\n\n    uniform bool sizeAttenuation;\n    uniform float pointSize;\n    uniform float spritesPerRow;\n    uniform float spritesPerColumn;\n\n    varying float fogDepth;\n\n    void main() {\n      // Pass index and color values to fragment shader.\n      vColor = color;\n      xyIndex = vec2(mod(spriteIndex, spritesPerRow),\n                floor(spriteIndex / spritesPerColumn));\n\n      // Transform current vertex by modelViewMatrix (model world position and\n      // camera world position matrix).\n      vec4 cameraSpacePos = modelViewMatrix * vec4(position, 1.0);\n\n      // Project vertex in camera-space to screen coordinates using the camera's\n      // projection matrix.\n      gl_Position = projectionMatrix * cameraSpacePos;\n\n      // Create size attenuation (if we're in 3D mode) by making the size of\n      // each point inversly proportional to its distance to the camera.\n      float outputPointSize = pointSize;\n      if (sizeAttenuation) {\n        outputPointSize = -pointSize / cameraSpacePos.z;\n        fogDepth = pointSize / outputPointSize * 1.2;\n      } else {  // Create size attenuation (if we're in 2D mode)\n        const float PI = 3.1415926535897932384626433832795;\n        const float minScale = 0.1;  // minimum scaling factor\n        const float outSpeed = 2.0;  // shrink speed when zooming out\n        const float outNorm = (1. - minScale) / atan(outSpeed);\n        const float maxScale = 15.0;  // maximum scaling factor\n        const float inSpeed = 0.02;  // enlarge speed when zooming in\n        const float zoomOffset = 0.3;  // offset zoom pivot\n        float zoom = projectionMatrix[0][0] + zoomOffset;  // zoom pivot\n        float scale = zoom < 1. ? 1. + outNorm * atan(outSpeed * (zoom - 1.)) :\n                      1. + 2. / PI * (maxScale - 1.) * atan(inSpeed * (zoom - 1.));\n        outputPointSize = pointSize * scale;\n      }\n\n      gl_PointSize =\n        max(outputPointSize * scaleFactor, " + minPointSize.toFixed(1) + ");\n    }"; };
var FRAGMENT_SHADER_POINT_TEST_CHUNK = "\n    bool point_in_unit_circle(vec2 spriteCoord) {\n      vec2 centerToP = spriteCoord - vec2(0.5, 0.5);\n      return dot(centerToP, centerToP) < (0.5 * 0.5);\n    }\n\n    bool point_in_unit_equilateral_triangle(vec2 spriteCoord) {\n      vec3 v0 = vec3(0, 1, 0);\n      vec3 v1 = vec3(0.5, 0, 0);\n      vec3 v2 = vec3(1, 1, 0);\n      vec3 p = vec3(spriteCoord, 0);\n      float p_in_v0_v1 = cross(v1 - v0, p - v0).z;\n      float p_in_v1_v2 = cross(v2 - v1, p - v1).z;\n      return (p_in_v0_v1 > 0.0) && (p_in_v1_v2 > 0.0);\n    }\n\n    bool point_in_unit_square(vec2 spriteCoord) {\n      return true;\n    }\n  ";
var FRAGMENT_SHADER = "\n    varying vec2 xyIndex;\n    varying vec3 vColor;\n\n    uniform sampler2D texture;\n    uniform float spritesPerRow;\n    uniform float spritesPerColumn;\n    uniform bool isImage;\n\n    " + THREE.ShaderChunk['common'] + "\n    " + FRAGMENT_SHADER_POINT_TEST_CHUNK + "\n    uniform vec3 fogColor;\n    varying float fogDepth;\n\t\tuniform float fogNear;\n    uniform float fogFar;\n\n    void main() {\n      if (isImage) {\n        // Coordinates of the vertex within the entire sprite image.\n        vec2 coords =\n          (gl_PointCoord + xyIndex) / vec2(spritesPerRow, spritesPerColumn);\n        gl_FragColor = vec4(vColor, 1.0) * texture2D(texture, coords);\n      } else {\n        bool inside = point_in_unit_circle(gl_PointCoord);\n        if (!inside) {\n          discard;\n        }\n        gl_FragColor = vec4(vColor, 1);\n      }\n      float fogFactor = smoothstep( fogNear, fogFar, fogDepth );\n      gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );\n    }";
var FRAGMENT_SHADER_PICKING = "\n    varying vec2 xyIndex;\n    varying vec3 vColor;\n    uniform bool isImage;\n\n    " + FRAGMENT_SHADER_POINT_TEST_CHUNK + "\n\n    varying float fogDepth;\n\n    void main() {\n      xyIndex; // Silence 'unused variable' warning.\n      fogDepth; // Silence 'unused variable' warning.\n      if (isImage) {\n        gl_FragColor = vec4(vColor, 1);\n      } else {\n        bool inside = point_in_unit_circle(gl_PointCoord);\n        if (!inside) {\n          discard;\n        }\n        gl_FragColor = vec4(vColor, 1);\n      }\n    }";
var ScatterPlotVisualizerSprites = (function () {
    function ScatterPlotVisualizerSprites(styles, spriteSheetParams) {
        this.styles = styles;
        this.id = 'SPRITES';
        this.isSpriteSheetMode = false;
        this.spritesPerRow = 0;
        this.spritesPerColumn = 0;
        this.spriteDimensions = [0, 0];
        this.worldSpacePointPositions = new Float32Array();
        this.pickingColors = new Float32Array();
        this.renderColors = new Float32Array();
        this.standinTextureForPoints = util.createTextureFromCanvas(document.createElement('canvas'));
        if (spriteSheetParams) {
            this.spriteSheetParams = spriteSheetParams;
            this.setSpriteSheet(spriteSheetParams);
            this.isSpriteSheetMode = true;
        }
        this.renderMaterial = this.createRenderMaterial();
        this.pickingMaterial = this.createPickingMaterial();
    }
    ScatterPlotVisualizerSprites.prototype.createUniforms = function () {
        return {
            texture: { type: 't' },
            spritesPerRow: { type: 'f' },
            spritesPerColumn: { type: 'f' },
            fogColor: { type: 'c' },
            fogNear: { type: 'f' },
            fogFar: { type: 'f' },
            isImage: { type: 'bool' },
            sizeAttenuation: { type: 'bool' },
            pointSize: { type: 'f' },
        };
    };
    ScatterPlotVisualizerSprites.prototype.createRenderMaterial = function () {
        var isSpriteSheetMode = this.isSpriteSheetMode;
        var uniforms = this.createUniforms();
        return new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: makeVertexShader(this.styles.sprites.minPointSize),
            fragmentShader: FRAGMENT_SHADER,
            transparent: !isSpriteSheetMode,
            depthTest: isSpriteSheetMode,
            depthWrite: isSpriteSheetMode,
            fog: this.styles.fog.enabled,
            blending: THREE.MultiplyBlending,
        });
    };
    ScatterPlotVisualizerSprites.prototype.createPickingMaterial = function () {
        var uniforms = this.createUniforms();
        return new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: makeVertexShader(this.styles.sprites.minPointSize),
            fragmentShader: FRAGMENT_SHADER_PICKING,
            transparent: true,
            depthTest: true,
            depthWrite: true,
            fog: false,
            blending: THREE.NormalBlending,
        });
    };
    ScatterPlotVisualizerSprites.prototype.createPointSprites = function (scene, positions) {
        var pointCount = positions != null ? positions.length / constants_1.XYZ_NUM_ELEMENTS : 0;
        var geometry = this.createGeometry(pointCount);
        this.fog = new THREE.Fog(0xffffff);
        this.points = new THREE.Points(geometry, this.renderMaterial);
        this.points.frustumCulled = false;
        if (this.spriteIndexBufferAttribute != null) {
            this.points.geometry.addAttribute('spriteIndex', this.spriteIndexBufferAttribute);
        }
        scene.add(this.points);
    };
    ScatterPlotVisualizerSprites.prototype.calculatePointSize = function (sceneIs3D) {
        var imageSize = this.styles.sprites.imageSize;
        if (this.texture) {
            return sceneIs3D ? imageSize : this.spriteDimensions[0];
        }
        var n = this.worldSpacePointPositions != null
            ? this.worldSpacePointPositions.length / constants_1.XYZ_NUM_ELEMENTS
            : 1;
        var SCALE = 200;
        var LOG_BASE = 8;
        var DIVISOR = 1.5;
        var pointSize = SCALE / Math.log(n) / Math.log(LOG_BASE);
        return sceneIs3D ? pointSize : pointSize / DIVISOR;
    };
    ScatterPlotVisualizerSprites.prototype.createGeometry = function (pointCount) {
        var n = pointCount;
        this.pickingColors = new Float32Array(n * constants_1.RGB_NUM_ELEMENTS);
        {
            var dst = 0;
            for (var i = 0; i < n; i++) {
                var c = new THREE.Color(i);
                this.pickingColors[dst++] = c.r;
                this.pickingColors[dst++] = c.g;
                this.pickingColors[dst++] = c.b;
            }
        }
        var geometry = new THREE.BufferGeometry();
        geometry.addAttribute('position', new THREE.BufferAttribute(new Float32Array([]), constants_1.XYZ_NUM_ELEMENTS));
        geometry.addAttribute('color', new THREE.BufferAttribute(new Float32Array([]), constants_1.RGB_NUM_ELEMENTS));
        geometry.addAttribute('scaleFactor', new THREE.BufferAttribute(new Float32Array([]), constants_1.INDEX_NUM_ELEMENTS));
        geometry.computeVertexNormals();
        return geometry;
    };
    ScatterPlotVisualizerSprites.prototype.setFogDistances = function (sceneIs3D, nearestPointZ, farthestPointZ) {
        var _a = this.styles.fog, threshold = _a.threshold, enabled = _a.enabled;
        if (sceneIs3D && enabled) {
            var n = this.worldSpacePointPositions.length / constants_1.XYZ_NUM_ELEMENTS;
            this.fog.near = nearestPointZ;
            var multiplier = 2 - Math.min(n, threshold) / threshold;
            this.fog.far = farthestPointZ * multiplier;
        }
        else {
            this.fog.near = Infinity;
            this.fog.far = Infinity;
        }
    };
    ScatterPlotVisualizerSprites.prototype.dispose = function () {
        this.disposeGeometry();
        this.disposeSpriteSheet();
    };
    ScatterPlotVisualizerSprites.prototype.disposeGeometry = function () {
        if (this.points != null) {
            this.scene.remove(this.points);
            this.points.geometry.dispose();
            this.points = null;
            this.worldSpacePointPositions = null;
        }
    };
    ScatterPlotVisualizerSprites.prototype.disposeSpriteSheet = function () {
        if (this.texture) {
            this.texture.dispose();
        }
        this.texture = null;
        this.renderMaterial = null;
        this.pickingMaterial = null;
        this.spriteSheetImage = null;
    };
    ScatterPlotVisualizerSprites.prototype.setScene = function (scene) {
        this.scene = scene;
    };
    ScatterPlotVisualizerSprites.prototype.setSpriteSheet = function (spriteSheetParams) {
        var _this = this;
        var spriteDimensions = spriteSheetParams.spriteDimensions, spriteIndices = spriteSheetParams.spriteIndices, onImageLoad = spriteSheetParams.onImageLoad;
        var spriteSheet = spriteSheetParams.spritesheetImage;
        if (typeof spriteSheet === 'string') {
            var spriteSheetUrl = spriteSheet;
            spriteSheet = new Image();
            spriteSheet.src = spriteSheetUrl;
        }
        this.spriteSheetImage = spriteSheet;
        this.texture = util.createTextureFromImage(this.spriteSheetImage, function () {
            _this.spritesPerRow = _this.spriteSheetImage.width / spriteDimensions[0];
            _this.spritesPerColumn =
                _this.spriteSheetImage.height / spriteDimensions[1];
            onImageLoad();
        });
        this.spriteDimensions = spriteDimensions;
        this.spriteIndexBufferAttribute = new THREE.BufferAttribute(spriteIndices, constants_1.INDEX_NUM_ELEMENTS);
        if (this.points != null) {
            this.points.geometry.addAttribute('spriteIndex', this.spriteIndexBufferAttribute);
        }
    };
    ScatterPlotVisualizerSprites.prototype.onPointPositionsChanged = function (newPositions) {
        if (this.points != null) {
            if (this.worldSpacePointPositions.length !== newPositions.length) {
                this.disposeGeometry();
            }
        }
        this.worldSpacePointPositions = newPositions;
        if (this.points == null) {
            this.createPointSprites(this.scene, newPositions);
        }
        if (this.spriteSheetParams) {
            this.setSpriteSheet(this.spriteSheetParams);
        }
        this.renderMaterial = this.createRenderMaterial();
        this.pickingMaterial = this.createPickingMaterial();
        var positions = this.points
            .geometry.getAttribute('position');
        positions.array = newPositions;
        positions.count = newPositions.length / constants_1.XYZ_NUM_ELEMENTS;
        positions.needsUpdate = true;
    };
    ScatterPlotVisualizerSprites.prototype.onPickingRender = function (rc) {
        var sceneIs3D = rc.cameraType === render_1.CameraType.Perspective;
        this.pickingMaterial.uniforms.spritesPerRow.value = this.spritesPerRow;
        this.pickingMaterial.uniforms.spritesPerRow.value = this.spritesPerColumn;
        this.pickingMaterial.uniforms.sizeAttenuation.value = sceneIs3D;
        this.pickingMaterial.uniforms.pointSize.value = this.calculatePointSize(sceneIs3D);
        this.points.material = this.pickingMaterial;
        var colors = this.points.geometry.getAttribute('color');
        colors.array = this.pickingColors;
        colors.count = this.pickingColors.length / constants_1.RGB_NUM_ELEMENTS;
        colors.needsUpdate = true;
        var scaleFactors = this.points
            .geometry.getAttribute('scaleFactor');
        scaleFactors.array = rc.pointScaleFactors;
        scaleFactors.count = rc.pointScaleFactors.length;
        scaleFactors.count = rc.pointScaleFactors.length / constants_1.INDEX_NUM_ELEMENTS;
        scaleFactors.needsUpdate = true;
    };
    ScatterPlotVisualizerSprites.prototype.onRender = function (rc) {
        var sceneIs3D = rc.camera instanceof THREE.PerspectiveCamera;
        this.setFogDistances(sceneIs3D, rc.nearestCameraSpacePointZ, rc.farthestCameraSpacePointZ);
        this.scene.fog = this.fog;
        this.scene.fog.color = new THREE.Color(rc.backgroundColor);
        this.renderMaterial.uniforms.fogColor.value = this.scene.fog.color;
        this.renderMaterial.uniforms.fogNear.value = this.fog.near;
        this.renderMaterial.uniforms.fogFar.value = this.fog.far;
        this.renderMaterial.uniforms.spritesPerRow.value = this.spritesPerRow;
        this.renderMaterial.uniforms.spritesPerColumn.value = this.spritesPerColumn;
        this.renderMaterial.uniforms.isImage.value = this.texture != null;
        this.renderMaterial.uniforms.texture.value =
            this.texture != null ? this.texture : this.standinTextureForPoints;
        this.renderMaterial.uniforms.sizeAttenuation.value = sceneIs3D;
        this.renderMaterial.uniforms.pointSize.value = this.calculatePointSize(sceneIs3D);
        this.points.material = this.renderMaterial;
        var colors = this.points.geometry.getAttribute('color');
        this.renderColors = rc.pointColors;
        colors.array = this.renderColors;
        colors.count = this.renderColors.length / constants_1.RGB_NUM_ELEMENTS;
        colors.needsUpdate = true;
        var scaleFactors = this.points
            .geometry.getAttribute('scaleFactor');
        scaleFactors.array = rc.pointScaleFactors;
        scaleFactors.count = rc.pointScaleFactors.length / constants_1.INDEX_NUM_ELEMENTS;
        scaleFactors.needsUpdate = true;
    };
    ScatterPlotVisualizerSprites.prototype.onResize = function (newWidth, newHeight) { };
    return ScatterPlotVisualizerSprites;
}());
exports.ScatterPlotVisualizerSprites = ScatterPlotVisualizerSprites;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var THREE = __webpack_require__(0);
var render_1 = __webpack_require__(2);
var label_1 = __webpack_require__(15);
var util = __webpack_require__(1);
var MAX_LABELS_ON_SCREEN = 10000;
var ScatterPlotVisualizerCanvasLabels = (function () {
    function ScatterPlotVisualizerCanvasLabels(container, styles) {
        this.styles = styles;
        this.id = 'CANVAS_LABELS';
        this.worldSpacePointPositions = new Float32Array();
        this.labelsActive = true;
        this.canvas = document.createElement('canvas');
        container.appendChild(this.canvas);
        this.gc = this.canvas.getContext('2d');
        this.canvas.style.position = 'absolute';
        this.canvas.style.left = '0';
        this.canvas.style.top = '0';
        this.canvas.style.pointerEvents = 'none';
    }
    ScatterPlotVisualizerCanvasLabels.prototype.removeAllLabels = function () {
        var pixelWidth = this.canvas.width * window.devicePixelRatio;
        var pixelHeight = this.canvas.height * window.devicePixelRatio;
        this.gc.clearRect(0, 0, pixelWidth, pixelHeight);
    };
    ScatterPlotVisualizerCanvasLabels.prototype.makeLabels = function (rc) {
        if (rc.labels == null || rc.labels.pointIndices.length === 0) {
            return;
        }
        if (this.worldSpacePointPositions == null) {
            return;
        }
        var lrc = rc.labels;
        var sceneIs3D = rc.cameraType === render_1.CameraType.Perspective;
        var labelHeight = parseInt(this.gc.font, 10);
        var dpr = window.devicePixelRatio;
        var grid;
        {
            var pixw = this.canvas.width * dpr;
            var pixh = this.canvas.height * dpr;
            var bb = { loX: 0, hiX: pixw, loY: 0, hiY: pixh };
            grid = new label_1.CollisionGrid(bb, pixw / 25, pixh / 50);
        }
        var cameraDomain = [
            rc.farthestCameraSpacePointZ,
            rc.nearestCameraSpacePointZ,
        ];
        var opacityMap = function (x) {
            return util.scaleExponential(x, cameraDomain, [0.1, 1]);
        };
        var camPos = rc.camera.position;
        var camToTarget = camPos.clone().sub(rc.cameraTarget);
        var camToPoint = new THREE.Vector3();
        this.gc.textBaseline = 'middle';
        this.gc.miterLimit = 2;
        var labelMargin = 2;
        var xShift = 4;
        var n = Math.min(MAX_LABELS_ON_SCREEN, lrc.pointIndices.length);
        for (var i = 0; i < n; ++i) {
            var point = void 0;
            {
                var pi = lrc.pointIndices[i];
                point = util.vector3FromPackedArray(this.worldSpacePointPositions, pi);
            }
            camToPoint.copy(camPos).sub(point);
            if (camToTarget.dot(camToPoint) < 0) {
                continue;
            }
            var _a = __read(util.vector3DToScreenCoords(rc.camera, rc.screenWidth, rc.screenHeight, point), 2), x = _a[0], y = _a[1];
            x += xShift;
            var textBoundingBox = {
                loX: x - labelMargin,
                hiX: x + 1 + labelMargin,
                loY: y - labelHeight / 2 - labelMargin,
                hiY: y + labelHeight / 2 + labelMargin,
            };
            if (grid.insert(textBoundingBox, true)) {
                var text = lrc.labelStrings[i];
                var fontSize = lrc.defaultFontSize * lrc.scaleFactors[i] * dpr;
                this.gc.font = fontSize + 'px roboto';
                textBoundingBox.hiX += this.gc.measureText(text).width - 1;
                if (grid.insert(textBoundingBox)) {
                    var opacity = 1;
                    if (sceneIs3D && lrc.useSceneOpacityFlags[i] === 1) {
                        opacity = opacityMap(camToPoint.length());
                    }
                    this.gc.fillStyle = this.styleStringFromPackedRgba(lrc.fillColors, i, opacity);
                    this.gc.strokeStyle = this.styleStringFromPackedRgba(lrc.strokeColors, i, opacity);
                    this.gc.lineWidth = this.styles.label.strokeWidth;
                    this.gc.strokeText(text, x, y);
                    this.gc.lineWidth = this.styles.label.fillWidth;
                    this.gc.fillText(text, x, y);
                }
            }
        }
    };
    ScatterPlotVisualizerCanvasLabels.prototype.styleStringFromPackedRgba = function (packedRgbaArray, colorIndex, opacity) {
        var offset = colorIndex * 3;
        var r = packedRgbaArray[offset];
        var g = packedRgbaArray[offset + 1];
        var b = packedRgbaArray[offset + 2];
        return 'rgba(' + r + ',' + g + ',' + b + ',' + opacity + ')';
    };
    ScatterPlotVisualizerCanvasLabels.prototype.onResize = function (newWidth, newHeight) {
        var dpr = window.devicePixelRatio;
        this.canvas.width = newWidth * dpr;
        this.canvas.height = newHeight * dpr;
        this.canvas.style.width = newWidth + 'px';
        this.canvas.style.height = newHeight + 'px';
    };
    ScatterPlotVisualizerCanvasLabels.prototype.dispose = function () {
        this.removeAllLabels();
    };
    ScatterPlotVisualizerCanvasLabels.prototype.onPointPositionsChanged = function (newPositions) {
        this.worldSpacePointPositions = newPositions;
        this.removeAllLabels();
    };
    ScatterPlotVisualizerCanvasLabels.prototype.onRender = function (rc) {
        if (!this.labelsActive) {
            return;
        }
        this.removeAllLabels();
        this.makeLabels(rc);
    };
    ScatterPlotVisualizerCanvasLabels.prototype.setScene = function (scene) { };
    ScatterPlotVisualizerCanvasLabels.prototype.onPickingRender = function (renderContext) { };
    return ScatterPlotVisualizerCanvasLabels;
}());
exports.ScatterPlotVisualizerCanvasLabels = ScatterPlotVisualizerCanvasLabels;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CollisionGrid = (function () {
    function CollisionGrid(bound, cellWidth, cellHeight) {
        this.bound = bound;
        this.cellWidth = cellWidth;
        this.cellHeight = cellHeight;
        this.numHorizCells = Math.ceil(this.boundWidth(bound) / cellWidth);
        this.numVertCells = Math.ceil(this.boundHeight(bound) / cellHeight);
        this.grid = new Array(this.numHorizCells * this.numVertCells);
    }
    CollisionGrid.prototype.boundWidth = function (bound) {
        return bound.hiX - bound.loX;
    };
    CollisionGrid.prototype.boundHeight = function (bound) {
        return bound.hiY - bound.loY;
    };
    CollisionGrid.prototype.boundsIntersect = function (a, b) {
        return !(a.loX > b.hiX || a.loY > b.hiY || a.hiX < b.loX || a.hiY < b.loY);
    };
    CollisionGrid.prototype.insert = function (bound, justTest) {
        if (justTest === void 0) { justTest = false; }
        if (bound.hiX < this.bound.loX ||
            bound.loX > this.bound.hiX ||
            bound.hiY < this.bound.loY ||
            bound.loY > this.bound.hiY) {
            return false;
        }
        var minCellX = this.getCellX(bound.loX);
        var maxCellX = this.getCellX(bound.hiX);
        var minCellY = this.getCellY(bound.loY);
        var maxCellY = this.getCellY(bound.hiY);
        var baseIdx = minCellY * this.numHorizCells + minCellX;
        var idx = baseIdx;
        for (var j = minCellY; j <= maxCellY; j++) {
            for (var i = minCellX; i <= maxCellX; i++) {
                var cell = this.grid[idx++];
                if (cell) {
                    for (var k = 0; k < cell.length; k++) {
                        if (this.boundsIntersect(bound, cell[k])) {
                            return false;
                        }
                    }
                }
            }
            idx += this.numHorizCells - (maxCellX - minCellX + 1);
        }
        if (justTest) {
            return true;
        }
        idx = baseIdx;
        for (var j = minCellY; j <= maxCellY; j++) {
            for (var i = minCellX; i <= maxCellX; i++) {
                if (!this.grid[idx]) {
                    this.grid[idx] = [bound];
                }
                else {
                    this.grid[idx].push(bound);
                }
                idx++;
            }
            idx += this.numHorizCells - (maxCellX - minCellX + 1);
        }
        return true;
    };
    CollisionGrid.prototype.getCellX = function (x) {
        return Math.floor((x - this.bound.loX) / this.cellWidth);
    };
    CollisionGrid.prototype.getCellY = function (y) {
        return Math.floor((y - this.bound.loY) / this.cellHeight);
    };
    return CollisionGrid;
}());
exports.CollisionGrid = CollisionGrid;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var THREE = __webpack_require__(0);
var util = __webpack_require__(1);
var constants_1 = __webpack_require__(3);
var ScatterPlotVisualizerPolylines = (function () {
    function ScatterPlotVisualizerPolylines() {
        this.id = 'POLYLINES';
        this.sequences = [];
        this.polylines = [];
        this.polylinePositionBuffer = {};
        this.polylineColorBuffer = {};
        this.pointSequenceIndices = new Map();
    }
    ScatterPlotVisualizerPolylines.prototype.getPointSequenceIndex = function (pointIndex) {
        return this.pointSequenceIndices.get(pointIndex);
    };
    ScatterPlotVisualizerPolylines.prototype.updateSequenceIndices = function () {
        for (var i = 0; i < this.sequences.length; i++) {
            var sequence = this.sequences[i];
            for (var j = 0; j < sequence.indices.length - 1; j++) {
                var pointIndex = sequence.indices[j];
                this.pointSequenceIndices.set(pointIndex, i);
                this.pointSequenceIndices.set(pointIndex + 1, i);
            }
        }
    };
    ScatterPlotVisualizerPolylines.prototype.createPolylines = function () {
        this.updateSequenceIndices();

        for (const polyline of this.polylines) {
          this.scene.remove(polyline);
          polyline.geometry.dispose();
        }
        this.polylines = [];

        for (var i = 0; i < this.sequences.length; i++) {
            var geometry = new THREE.BufferGeometry();
            geometry.addAttribute('position', this.polylinePositionBuffer[i]);
            geometry.addAttribute('color', this.polylineColorBuffer[i]);
            var material = new THREE.LineBasicMaterial({
                linewidth: 2,
                opacity: 1.0,
                transparent: true,
                vertexColors: THREE.VertexColors,
            });
            var polyline = new THREE.LineSegments(geometry, material);
            polyline.frustumCulled = false;
            this.polylines.push(polyline);
            this.scene.add(polyline);
        }
    };
    ScatterPlotVisualizerPolylines.prototype.dispose = function () {
        var e_1, _a;
        try {
            for (var _b = __values(this.polylines), _c = _b.next(); !_c.done; _c = _b.next()) {
                var polyline = _c.value;
                this.scene.remove(polyline);
                polyline.geometry.dispose();
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this.polylines = [];
        this.polylinePositionBuffer = {};
        this.polylineColorBuffer = {};
    };
    ScatterPlotVisualizerPolylines.prototype.setScene = function (scene) {
        this.scene = scene;
    };
    ScatterPlotVisualizerPolylines.prototype.setSequences = function (sequences) {
        this.sequences = sequences;
    };
    ScatterPlotVisualizerPolylines.prototype.onPointPositionsChanged = function (newPositions) {
        if (newPositions == null)
            this.dispose();
        if (newPositions == null || this.sequences.length === 0) {
            return;
        }
        for (var i = 0; i < this.sequences.length; i++) {
            var sequence = this.sequences[i];
            var vertexCount = 2 * (sequence.indices.length - 1);
            var polylines = new Float32Array(vertexCount * constants_1.XYZ_NUM_ELEMENTS);
            this.polylinePositionBuffer[i] = new THREE.BufferAttribute(polylines, constants_1.XYZ_NUM_ELEMENTS);
            var colors = new Float32Array(vertexCount * constants_1.RGB_NUM_ELEMENTS);
            this.polylineColorBuffer[i] = new THREE.BufferAttribute(colors, constants_1.RGB_NUM_ELEMENTS);
        }
        for (var i = 0; i < this.sequences.length; i++) {
            var sequence = this.sequences[i];
            var src = 0;
            for (var j = 0; j < sequence.indices.length - 1; j++) {
                var p1Index = sequence.indices[j];
                var p2Index = sequence.indices[j + 1];
                var p1 = util.vector3FromPackedArray(newPositions, p1Index);
                var p2 = util.vector3FromPackedArray(newPositions, p2Index);
                this.polylinePositionBuffer[i].setXYZ(src, p1.x, p1.y, p1.z);
                this.polylinePositionBuffer[i].setXYZ(src + 1, p2.x, p2.y, p2.z);
                src += 2;
            }
            this.polylinePositionBuffer[i].needsUpdate = true;
        }
        this.createPolylines();
    };
    ScatterPlotVisualizerPolylines.prototype.onRender = function (renderContext) {
        for (var i = 0; i < this.polylines.length; i++) {
            var material = this.polylines[i].material;
            material.opacity = renderContext.polylineOpacities[i];
            material.linewidth = renderContext.polylineWidths[i];
            this.polylineColorBuffer[i].array = renderContext.polylineColors[i];
            this.polylineColorBuffer[i].needsUpdate = true;
        }
    };
    ScatterPlotVisualizerPolylines.prototype.onPickingRender = function (renderContext) { };
    ScatterPlotVisualizerPolylines.prototype.onResize = function (newWidth, newHeight) { };
    return ScatterPlotVisualizerPolylines;
}());
exports.ScatterPlotVisualizerPolylines = ScatterPlotVisualizerPolylines;


/***/ })
/******/ ]);
});
