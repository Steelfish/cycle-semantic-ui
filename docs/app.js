/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 215);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var symbol_observable_1 = __webpack_require__(171);
var NO = {};
exports.NO = NO;
function noop() { }
function cp(a) {
    var l = a.length;
    var b = Array(l);
    for (var i = 0; i < l; ++i)
        b[i] = a[i];
    return b;
}
function and(f1, f2) {
    return function andFn(t) {
        return f1(t) && f2(t);
    };
}
function _try(c, t, u) {
    try {
        return c.f(t);
    }
    catch (e) {
        u._e(e);
        return NO;
    }
}
var NO_IL = {
    _n: noop,
    _e: noop,
    _c: noop,
};
exports.NO_IL = NO_IL;
// mutates the input
function internalizeProducer(producer) {
    producer._start = function _start(il) {
        il.next = il._n;
        il.error = il._e;
        il.complete = il._c;
        this.start(il);
    };
    producer._stop = producer.stop;
}
var StreamSub = (function () {
    function StreamSub(_stream, _listener) {
        this._stream = _stream;
        this._listener = _listener;
    }
    StreamSub.prototype.unsubscribe = function () {
        this._stream.removeListener(this._listener);
    };
    return StreamSub;
}());
var Observer = (function () {
    function Observer(_listener) {
        this._listener = _listener;
    }
    Observer.prototype.next = function (value) {
        this._listener._n(value);
    };
    Observer.prototype.error = function (err) {
        this._listener._e(err);
    };
    Observer.prototype.complete = function () {
        this._listener._c();
    };
    return Observer;
}());
var FromObservable = (function () {
    function FromObservable(observable) {
        this.type = 'fromObservable';
        this.ins = observable;
        this.active = false;
    }
    FromObservable.prototype._start = function (out) {
        this.out = out;
        this.active = true;
        this._sub = this.ins.subscribe(new Observer(out));
        if (!this.active)
            this._sub.unsubscribe();
    };
    FromObservable.prototype._stop = function () {
        if (this._sub)
            this._sub.unsubscribe();
        this.active = false;
    };
    return FromObservable;
}());
var Merge = (function () {
    function Merge(insArr) {
        this.type = 'merge';
        this.insArr = insArr;
        this.out = NO;
        this.ac = 0;
    }
    Merge.prototype._start = function (out) {
        this.out = out;
        var s = this.insArr;
        var L = s.length;
        this.ac = L;
        for (var i = 0; i < L; i++)
            s[i]._add(this);
    };
    Merge.prototype._stop = function () {
        var s = this.insArr;
        var L = s.length;
        for (var i = 0; i < L; i++)
            s[i]._remove(this);
        this.out = NO;
    };
    Merge.prototype._n = function (t) {
        var u = this.out;
        if (u === NO)
            return;
        u._n(t);
    };
    Merge.prototype._e = function (err) {
        var u = this.out;
        if (u === NO)
            return;
        u._e(err);
    };
    Merge.prototype._c = function () {
        if (--this.ac <= 0) {
            var u = this.out;
            if (u === NO)
                return;
            u._c();
        }
    };
    return Merge;
}());
var CombineListener = (function () {
    function CombineListener(i, out, p) {
        this.i = i;
        this.out = out;
        this.p = p;
        p.ils.push(this);
    }
    CombineListener.prototype._n = function (t) {
        var p = this.p, out = this.out;
        if (out === NO)
            return;
        if (p.up(t, this.i))
            out._n(p.vals);
    };
    CombineListener.prototype._e = function (err) {
        var out = this.out;
        if (out === NO)
            return;
        out._e(err);
    };
    CombineListener.prototype._c = function () {
        var p = this.p;
        if (p.out === NO)
            return;
        if (--p.Nc === 0)
            p.out._c();
    };
    return CombineListener;
}());
var Combine = (function () {
    function Combine(insArr) {
        this.type = 'combine';
        this.insArr = insArr;
        this.out = NO;
        this.ils = [];
        this.Nc = this.Nn = 0;
        this.vals = [];
    }
    Combine.prototype.up = function (t, i) {
        var v = this.vals[i];
        var Nn = !this.Nn ? 0 : v === NO ? --this.Nn : this.Nn;
        this.vals[i] = t;
        return Nn === 0;
    };
    Combine.prototype._start = function (out) {
        this.out = out;
        var s = this.insArr;
        var n = this.Nc = this.Nn = s.length;
        var vals = this.vals = new Array(n);
        if (n === 0) {
            out._n([]);
            out._c();
        }
        else {
            for (var i = 0; i < n; i++) {
                vals[i] = NO;
                s[i]._add(new CombineListener(i, out, this));
            }
        }
    };
    Combine.prototype._stop = function () {
        var s = this.insArr;
        var n = s.length;
        var ils = this.ils;
        for (var i = 0; i < n; i++)
            s[i]._remove(ils[i]);
        this.out = NO;
        this.ils = [];
        this.vals = [];
    };
    return Combine;
}());
var FromArray = (function () {
    function FromArray(a) {
        this.type = 'fromArray';
        this.a = a;
    }
    FromArray.prototype._start = function (out) {
        var a = this.a;
        for (var i = 0, n = a.length; i < n; i++)
            out._n(a[i]);
        out._c();
    };
    FromArray.prototype._stop = function () {
    };
    return FromArray;
}());
var FromPromise = (function () {
    function FromPromise(p) {
        this.type = 'fromPromise';
        this.on = false;
        this.p = p;
    }
    FromPromise.prototype._start = function (out) {
        var prod = this;
        this.on = true;
        this.p.then(function (v) {
            if (prod.on) {
                out._n(v);
                out._c();
            }
        }, function (e) {
            out._e(e);
        }).then(noop, function (err) {
            setTimeout(function () { throw err; });
        });
    };
    FromPromise.prototype._stop = function () {
        this.on = false;
    };
    return FromPromise;
}());
var Periodic = (function () {
    function Periodic(period) {
        this.type = 'periodic';
        this.period = period;
        this.intervalID = -1;
        this.i = 0;
    }
    Periodic.prototype._start = function (out) {
        var self = this;
        function intervalHandler() { out._n(self.i++); }
        this.intervalID = setInterval(intervalHandler, this.period);
    };
    Periodic.prototype._stop = function () {
        if (this.intervalID !== -1)
            clearInterval(this.intervalID);
        this.intervalID = -1;
        this.i = 0;
    };
    return Periodic;
}());
var Debug = (function () {
    function Debug(ins, arg) {
        this.type = 'debug';
        this.ins = ins;
        this.out = NO;
        this.s = noop;
        this.l = '';
        if (typeof arg === 'string')
            this.l = arg;
        else if (typeof arg === 'function')
            this.s = arg;
    }
    Debug.prototype._start = function (out) {
        this.out = out;
        this.ins._add(this);
    };
    Debug.prototype._stop = function () {
        this.ins._remove(this);
        this.out = NO;
    };
    Debug.prototype._n = function (t) {
        var u = this.out;
        if (u === NO)
            return;
        var s = this.s, l = this.l;
        if (s !== noop) {
            try {
                s(t);
            }
            catch (e) {
                u._e(e);
            }
        }
        else if (l)
            console.log(l + ':', t);
        else
            console.log(t);
        u._n(t);
    };
    Debug.prototype._e = function (err) {
        var u = this.out;
        if (u === NO)
            return;
        u._e(err);
    };
    Debug.prototype._c = function () {
        var u = this.out;
        if (u === NO)
            return;
        u._c();
    };
    return Debug;
}());
var Drop = (function () {
    function Drop(max, ins) {
        this.type = 'drop';
        this.ins = ins;
        this.out = NO;
        this.max = max;
        this.dropped = 0;
    }
    Drop.prototype._start = function (out) {
        this.out = out;
        this.dropped = 0;
        this.ins._add(this);
    };
    Drop.prototype._stop = function () {
        this.ins._remove(this);
        this.out = NO;
    };
    Drop.prototype._n = function (t) {
        var u = this.out;
        if (u === NO)
            return;
        if (this.dropped++ >= this.max)
            u._n(t);
    };
    Drop.prototype._e = function (err) {
        var u = this.out;
        if (u === NO)
            return;
        u._e(err);
    };
    Drop.prototype._c = function () {
        var u = this.out;
        if (u === NO)
            return;
        u._c();
    };
    return Drop;
}());
var EndWhenListener = (function () {
    function EndWhenListener(out, op) {
        this.out = out;
        this.op = op;
    }
    EndWhenListener.prototype._n = function () {
        this.op.end();
    };
    EndWhenListener.prototype._e = function (err) {
        this.out._e(err);
    };
    EndWhenListener.prototype._c = function () {
        this.op.end();
    };
    return EndWhenListener;
}());
var EndWhen = (function () {
    function EndWhen(o, ins) {
        this.type = 'endWhen';
        this.ins = ins;
        this.out = NO;
        this.o = o;
        this.oil = NO_IL;
    }
    EndWhen.prototype._start = function (out) {
        this.out = out;
        this.o._add(this.oil = new EndWhenListener(out, this));
        this.ins._add(this);
    };
    EndWhen.prototype._stop = function () {
        this.ins._remove(this);
        this.o._remove(this.oil);
        this.out = NO;
        this.oil = NO_IL;
    };
    EndWhen.prototype.end = function () {
        var u = this.out;
        if (u === NO)
            return;
        u._c();
    };
    EndWhen.prototype._n = function (t) {
        var u = this.out;
        if (u === NO)
            return;
        u._n(t);
    };
    EndWhen.prototype._e = function (err) {
        var u = this.out;
        if (u === NO)
            return;
        u._e(err);
    };
    EndWhen.prototype._c = function () {
        this.end();
    };
    return EndWhen;
}());
var Filter = (function () {
    function Filter(passes, ins) {
        this.type = 'filter';
        this.ins = ins;
        this.out = NO;
        this.f = passes;
    }
    Filter.prototype._start = function (out) {
        this.out = out;
        this.ins._add(this);
    };
    Filter.prototype._stop = function () {
        this.ins._remove(this);
        this.out = NO;
    };
    Filter.prototype._n = function (t) {
        var u = this.out;
        if (u === NO)
            return;
        var r = _try(this, t, u);
        if (r === NO || !r)
            return;
        u._n(t);
    };
    Filter.prototype._e = function (err) {
        var u = this.out;
        if (u === NO)
            return;
        u._e(err);
    };
    Filter.prototype._c = function () {
        var u = this.out;
        if (u === NO)
            return;
        u._c();
    };
    return Filter;
}());
var FlattenListener = (function () {
    function FlattenListener(out, op) {
        this.out = out;
        this.op = op;
    }
    FlattenListener.prototype._n = function (t) {
        this.out._n(t);
    };
    FlattenListener.prototype._e = function (err) {
        this.out._e(err);
    };
    FlattenListener.prototype._c = function () {
        this.op.inner = NO;
        this.op.less();
    };
    return FlattenListener;
}());
var Flatten = (function () {
    function Flatten(ins) {
        this.type = 'flatten';
        this.ins = ins;
        this.out = NO;
        this.open = true;
        this.inner = NO;
        this.il = NO_IL;
    }
    Flatten.prototype._start = function (out) {
        this.out = out;
        this.open = true;
        this.inner = NO;
        this.il = NO_IL;
        this.ins._add(this);
    };
    Flatten.prototype._stop = function () {
        this.ins._remove(this);
        if (this.inner !== NO)
            this.inner._remove(this.il);
        this.out = NO;
        this.open = true;
        this.inner = NO;
        this.il = NO_IL;
    };
    Flatten.prototype.less = function () {
        var u = this.out;
        if (u === NO)
            return;
        if (!this.open && this.inner === NO)
            u._c();
    };
    Flatten.prototype._n = function (s) {
        var u = this.out;
        if (u === NO)
            return;
        var _a = this, inner = _a.inner, il = _a.il;
        if (inner !== NO && il !== NO_IL)
            inner._remove(il);
        (this.inner = s)._add(this.il = new FlattenListener(u, this));
    };
    Flatten.prototype._e = function (err) {
        var u = this.out;
        if (u === NO)
            return;
        u._e(err);
    };
    Flatten.prototype._c = function () {
        this.open = false;
        this.less();
    };
    return Flatten;
}());
var Fold = (function () {
    function Fold(f, seed, ins) {
        var _this = this;
        this.type = 'fold';
        this.ins = ins;
        this.out = NO;
        this.f = function (t) { return f(_this.acc, t); };
        this.acc = this.seed = seed;
    }
    Fold.prototype._start = function (out) {
        this.out = out;
        this.acc = this.seed;
        out._n(this.acc);
        this.ins._add(this);
    };
    Fold.prototype._stop = function () {
        this.ins._remove(this);
        this.out = NO;
        this.acc = this.seed;
    };
    Fold.prototype._n = function (t) {
        var u = this.out;
        if (u === NO)
            return;
        var r = _try(this, t, u);
        if (r === NO)
            return;
        u._n(this.acc = r);
    };
    Fold.prototype._e = function (err) {
        var u = this.out;
        if (u === NO)
            return;
        u._e(err);
    };
    Fold.prototype._c = function () {
        var u = this.out;
        if (u === NO)
            return;
        u._c();
    };
    return Fold;
}());
var Last = (function () {
    function Last(ins) {
        this.type = 'last';
        this.ins = ins;
        this.out = NO;
        this.has = false;
        this.val = NO;
    }
    Last.prototype._start = function (out) {
        this.out = out;
        this.has = false;
        this.ins._add(this);
    };
    Last.prototype._stop = function () {
        this.ins._remove(this);
        this.out = NO;
        this.val = NO;
    };
    Last.prototype._n = function (t) {
        this.has = true;
        this.val = t;
    };
    Last.prototype._e = function (err) {
        var u = this.out;
        if (u === NO)
            return;
        u._e(err);
    };
    Last.prototype._c = function () {
        var u = this.out;
        if (u === NO)
            return;
        if (this.has) {
            u._n(this.val);
            u._c();
        }
        else
            u._e(new Error('last() failed because input stream completed'));
    };
    return Last;
}());
var MapFlattenListener = (function () {
    function MapFlattenListener(out, op) {
        this.out = out;
        this.op = op;
    }
    MapFlattenListener.prototype._n = function (r) {
        this.out._n(r);
    };
    MapFlattenListener.prototype._e = function (err) {
        this.out._e(err);
    };
    MapFlattenListener.prototype._c = function () {
        this.op.inner = NO;
        this.op.less();
    };
    return MapFlattenListener;
}());
var MapFlatten = (function () {
    function MapFlatten(mapOp) {
        this.type = mapOp.type + "+flatten";
        this.ins = mapOp.ins;
        this.out = NO;
        this.mapOp = mapOp;
        this.inner = NO;
        this.il = NO_IL;
        this.open = true;
    }
    MapFlatten.prototype._start = function (out) {
        this.out = out;
        this.inner = NO;
        this.il = NO_IL;
        this.open = true;
        this.mapOp.ins._add(this);
    };
    MapFlatten.prototype._stop = function () {
        this.mapOp.ins._remove(this);
        if (this.inner !== NO)
            this.inner._remove(this.il);
        this.out = NO;
        this.inner = NO;
        this.il = NO_IL;
    };
    MapFlatten.prototype.less = function () {
        if (!this.open && this.inner === NO) {
            var u = this.out;
            if (u === NO)
                return;
            u._c();
        }
    };
    MapFlatten.prototype._n = function (v) {
        var u = this.out;
        if (u === NO)
            return;
        var _a = this, inner = _a.inner, il = _a.il;
        var s = _try(this.mapOp, v, u);
        if (s === NO)
            return;
        if (inner !== NO && il !== NO_IL)
            inner._remove(il);
        (this.inner = s)._add(this.il = new MapFlattenListener(u, this));
    };
    MapFlatten.prototype._e = function (err) {
        var u = this.out;
        if (u === NO)
            return;
        u._e(err);
    };
    MapFlatten.prototype._c = function () {
        this.open = false;
        this.less();
    };
    return MapFlatten;
}());
var MapOp = (function () {
    function MapOp(project, ins) {
        this.type = 'map';
        this.ins = ins;
        this.out = NO;
        this.f = project;
    }
    MapOp.prototype._start = function (out) {
        this.out = out;
        this.ins._add(this);
    };
    MapOp.prototype._stop = function () {
        this.ins._remove(this);
        this.out = NO;
    };
    MapOp.prototype._n = function (t) {
        var u = this.out;
        if (u === NO)
            return;
        var r = _try(this, t, u);
        if (r === NO)
            return;
        u._n(r);
    };
    MapOp.prototype._e = function (err) {
        var u = this.out;
        if (u === NO)
            return;
        u._e(err);
    };
    MapOp.prototype._c = function () {
        var u = this.out;
        if (u === NO)
            return;
        u._c();
    };
    return MapOp;
}());
var FilterMapFusion = (function (_super) {
    __extends(FilterMapFusion, _super);
    function FilterMapFusion(passes, project, ins) {
        var _this = _super.call(this, project, ins) || this;
        _this.type = 'filter+map';
        _this.passes = passes;
        return _this;
    }
    FilterMapFusion.prototype._n = function (t) {
        if (!this.passes(t))
            return;
        var u = this.out;
        if (u === NO)
            return;
        var r = _try(this, t, u);
        if (r === NO)
            return;
        u._n(r);
    };
    return FilterMapFusion;
}(MapOp));
var Remember = (function () {
    function Remember(ins) {
        this.type = 'remember';
        this.ins = ins;
        this.out = NO;
    }
    Remember.prototype._start = function (out) {
        this.out = out;
        this.ins._add(out);
    };
    Remember.prototype._stop = function () {
        this.ins._remove(this.out);
        this.out = NO;
    };
    return Remember;
}());
var ReplaceError = (function () {
    function ReplaceError(replacer, ins) {
        this.type = 'replaceError';
        this.ins = ins;
        this.out = NO;
        this.f = replacer;
    }
    ReplaceError.prototype._start = function (out) {
        this.out = out;
        this.ins._add(this);
    };
    ReplaceError.prototype._stop = function () {
        this.ins._remove(this);
        this.out = NO;
    };
    ReplaceError.prototype._n = function (t) {
        var u = this.out;
        if (u === NO)
            return;
        u._n(t);
    };
    ReplaceError.prototype._e = function (err) {
        var u = this.out;
        if (u === NO)
            return;
        try {
            this.ins._remove(this);
            (this.ins = this.f(err))._add(this);
        }
        catch (e) {
            u._e(e);
        }
    };
    ReplaceError.prototype._c = function () {
        var u = this.out;
        if (u === NO)
            return;
        u._c();
    };
    return ReplaceError;
}());
var StartWith = (function () {
    function StartWith(ins, val) {
        this.type = 'startWith';
        this.ins = ins;
        this.out = NO;
        this.val = val;
    }
    StartWith.prototype._start = function (out) {
        this.out = out;
        this.out._n(this.val);
        this.ins._add(out);
    };
    StartWith.prototype._stop = function () {
        this.ins._remove(this.out);
        this.out = NO;
    };
    return StartWith;
}());
var Take = (function () {
    function Take(max, ins) {
        this.type = 'take';
        this.ins = ins;
        this.out = NO;
        this.max = max;
        this.taken = 0;
    }
    Take.prototype._start = function (out) {
        this.out = out;
        this.taken = 0;
        if (this.max <= 0)
            out._c();
        else
            this.ins._add(this);
    };
    Take.prototype._stop = function () {
        this.ins._remove(this);
        this.out = NO;
    };
    Take.prototype._n = function (t) {
        var u = this.out;
        if (u === NO)
            return;
        var m = ++this.taken;
        if (m < this.max)
            u._n(t);
        else if (m === this.max) {
            u._n(t);
            u._c();
        }
    };
    Take.prototype._e = function (err) {
        var u = this.out;
        if (u === NO)
            return;
        u._e(err);
    };
    Take.prototype._c = function () {
        var u = this.out;
        if (u === NO)
            return;
        u._c();
    };
    return Take;
}());
var Stream = (function () {
    function Stream(producer) {
        this._prod = producer || NO;
        this._ils = [];
        this._stopID = NO;
        this._dl = NO;
        this._d = false;
        this._target = NO;
        this._err = NO;
    }
    Stream.prototype._n = function (t) {
        var a = this._ils;
        var L = a.length;
        if (this._d)
            this._dl._n(t);
        if (L == 1)
            a[0]._n(t);
        else if (L == 0)
            return;
        else {
            var b = cp(a);
            for (var i = 0; i < L; i++)
                b[i]._n(t);
        }
    };
    Stream.prototype._e = function (err) {
        if (this._err !== NO)
            return;
        this._err = err;
        var a = this._ils;
        var L = a.length;
        this._x();
        if (this._d)
            this._dl._e(err);
        if (L == 1)
            a[0]._e(err);
        else if (L == 0)
            return;
        else {
            var b = cp(a);
            for (var i = 0; i < L; i++)
                b[i]._e(err);
        }
        if (!this._d && L == 0)
            throw this._err;
    };
    Stream.prototype._c = function () {
        var a = this._ils;
        var L = a.length;
        this._x();
        if (this._d)
            this._dl._c();
        if (L == 1)
            a[0]._c();
        else if (L == 0)
            return;
        else {
            var b = cp(a);
            for (var i = 0; i < L; i++)
                b[i]._c();
        }
    };
    Stream.prototype._x = function () {
        if (this._ils.length === 0)
            return;
        if (this._prod !== NO)
            this._prod._stop();
        this._err = NO;
        this._ils = [];
    };
    Stream.prototype._stopNow = function () {
        // WARNING: code that calls this method should
        // first check if this._prod is valid (not `NO`)
        this._prod._stop();
        this._err = NO;
        this._stopID = NO;
    };
    Stream.prototype._add = function (il) {
        var ta = this._target;
        if (ta !== NO)
            return ta._add(il);
        var a = this._ils;
        a.push(il);
        if (a.length > 1)
            return;
        if (this._stopID !== NO) {
            clearTimeout(this._stopID);
            this._stopID = NO;
        }
        else {
            var p = this._prod;
            if (p !== NO)
                p._start(this);
        }
    };
    Stream.prototype._remove = function (il) {
        var _this = this;
        var ta = this._target;
        if (ta !== NO)
            return ta._remove(il);
        var a = this._ils;
        var i = a.indexOf(il);
        if (i > -1) {
            a.splice(i, 1);
            if (this._prod !== NO && a.length <= 0) {
                this._err = NO;
                this._stopID = setTimeout(function () { return _this._stopNow(); });
            }
            else if (a.length === 1) {
                this._pruneCycles();
            }
        }
    };
    // If all paths stemming from `this` stream eventually end at `this`
    // stream, then we remove the single listener of `this` stream, to
    // force it to end its execution and dispose resources. This method
    // assumes as a precondition that this._ils has just one listener.
    Stream.prototype._pruneCycles = function () {
        if (this._hasNoSinks(this, []))
            this._remove(this._ils[0]);
    };
    // Checks whether *there is no* path starting from `x` that leads to an end
    // listener (sink) in the stream graph, following edges A->B where B is a
    // listener of A. This means these paths constitute a cycle somehow. Is given
    // a trace of all visited nodes so far.
    Stream.prototype._hasNoSinks = function (x, trace) {
        if (trace.indexOf(x) !== -1)
            return true;
        else if (x.out === this)
            return true;
        else if (x.out && x.out !== NO)
            return this._hasNoSinks(x.out, trace.concat(x));
        else if (x._ils) {
            for (var i = 0, N = x._ils.length; i < N; i++)
                if (!this._hasNoSinks(x._ils[i], trace.concat(x)))
                    return false;
            return true;
        }
        else
            return false;
    };
    Stream.prototype.ctor = function () {
        return this instanceof MemoryStream ? MemoryStream : Stream;
    };
    /**
     * Adds a Listener to the Stream.
     *
     * @param {Listener} listener
     */
    Stream.prototype.addListener = function (listener) {
        listener._n = listener.next || noop;
        listener._e = listener.error || noop;
        listener._c = listener.complete || noop;
        this._add(listener);
    };
    /**
     * Removes a Listener from the Stream, assuming the Listener was added to it.
     *
     * @param {Listener<T>} listener
     */
    Stream.prototype.removeListener = function (listener) {
        this._remove(listener);
    };
    /**
     * Adds a Listener to the Stream returning a Subscription to remove that
     * listener.
     *
     * @param {Listener} listener
     * @returns {Subscription}
     */
    Stream.prototype.subscribe = function (listener) {
        this.addListener(listener);
        return new StreamSub(this, listener);
    };
    /**
     * Add interop between most.js and RxJS 5
     *
     * @returns {Stream}
     */
    Stream.prototype[symbol_observable_1.default] = function () {
        return this;
    };
    /**
     * Creates a new Stream given a Producer.
     *
     * @factory true
     * @param {Producer} producer An optional Producer that dictates how to
     * start, generate events, and stop the Stream.
     * @return {Stream}
     */
    Stream.create = function (producer) {
        if (producer) {
            if (typeof producer.start !== 'function'
                || typeof producer.stop !== 'function')
                throw new Error('producer requires both start and stop functions');
            internalizeProducer(producer); // mutates the input
        }
        return new Stream(producer);
    };
    /**
     * Creates a new MemoryStream given a Producer.
     *
     * @factory true
     * @param {Producer} producer An optional Producer that dictates how to
     * start, generate events, and stop the Stream.
     * @return {MemoryStream}
     */
    Stream.createWithMemory = function (producer) {
        if (producer)
            internalizeProducer(producer); // mutates the input
        return new MemoryStream(producer);
    };
    /**
     * Creates a Stream that does nothing when started. It never emits any event.
     *
     * Marble diagram:
     *
     * ```text
     *          never
     * -----------------------
     * ```
     *
     * @factory true
     * @return {Stream}
     */
    Stream.never = function () {
        return new Stream({ _start: noop, _stop: noop });
    };
    /**
     * Creates a Stream that immediately emits the "complete" notification when
     * started, and that's it.
     *
     * Marble diagram:
     *
     * ```text
     * empty
     * -|
     * ```
     *
     * @factory true
     * @return {Stream}
     */
    Stream.empty = function () {
        return new Stream({
            _start: function (il) { il._c(); },
            _stop: noop,
        });
    };
    /**
     * Creates a Stream that immediately emits an "error" notification with the
     * value you passed as the `error` argument when the stream starts, and that's
     * it.
     *
     * Marble diagram:
     *
     * ```text
     * throw(X)
     * -X
     * ```
     *
     * @factory true
     * @param error The error event to emit on the created stream.
     * @return {Stream}
     */
    Stream.throw = function (error) {
        return new Stream({
            _start: function (il) { il._e(error); },
            _stop: noop,
        });
    };
    /**
     * Creates a stream from an Array, Promise, or an Observable.
     *
     * @factory true
     * @param {Array|Promise|Observable} input The input to make a stream from.
     * @return {Stream}
     */
    Stream.from = function (input) {
        if (typeof input[symbol_observable_1.default] === 'function')
            return Stream.fromObservable(input);
        else if (typeof input.then === 'function')
            return Stream.fromPromise(input);
        else if (Array.isArray(input))
            return Stream.fromArray(input);
        throw new TypeError("Type of input to from() must be an Array, Promise, or Observable");
    };
    /**
     * Creates a Stream that immediately emits the arguments that you give to
     * *of*, then completes.
     *
     * Marble diagram:
     *
     * ```text
     * of(1,2,3)
     * 123|
     * ```
     *
     * @factory true
     * @param a The first value you want to emit as an event on the stream.
     * @param b The second value you want to emit as an event on the stream. One
     * or more of these values may be given as arguments.
     * @return {Stream}
     */
    Stream.of = function () {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        return Stream.fromArray(items);
    };
    /**
     * Converts an array to a stream. The returned stream will emit synchronously
     * all the items in the array, and then complete.
     *
     * Marble diagram:
     *
     * ```text
     * fromArray([1,2,3])
     * 123|
     * ```
     *
     * @factory true
     * @param {Array} array The array to be converted as a stream.
     * @return {Stream}
     */
    Stream.fromArray = function (array) {
        return new Stream(new FromArray(array));
    };
    /**
     * Converts a promise to a stream. The returned stream will emit the resolved
     * value of the promise, and then complete. However, if the promise is
     * rejected, the stream will emit the corresponding error.
     *
     * Marble diagram:
     *
     * ```text
     * fromPromise( ----42 )
     * -----------------42|
     * ```
     *
     * @factory true
     * @param {Promise} promise The promise to be converted as a stream.
     * @return {Stream}
     */
    Stream.fromPromise = function (promise) {
        return new Stream(new FromPromise(promise));
    };
    /**
     * Converts an Observable into a Stream.
     *
     * @factory true
     * @param {any} observable The observable to be converted as a stream.
     * @return {Stream}
     */
    Stream.fromObservable = function (obs) {
        if (obs.endWhen)
            return obs;
        return new Stream(new FromObservable(obs));
    };
    /**
     * Creates a stream that periodically emits incremental numbers, every
     * `period` milliseconds.
     *
     * Marble diagram:
     *
     * ```text
     *     periodic(1000)
     * ---0---1---2---3---4---...
     * ```
     *
     * @factory true
     * @param {number} period The interval in milliseconds to use as a rate of
     * emission.
     * @return {Stream}
     */
    Stream.periodic = function (period) {
        return new Stream(new Periodic(period));
    };
    Stream.prototype._map = function (project) {
        var p = this._prod;
        var ctor = this.ctor();
        if (p instanceof Filter)
            return new ctor(new FilterMapFusion(p.f, project, p.ins));
        return new ctor(new MapOp(project, this));
    };
    /**
     * Transforms each event from the input Stream through a `project` function,
     * to get a Stream that emits those transformed events.
     *
     * Marble diagram:
     *
     * ```text
     * --1---3--5-----7------
     *    map(i => i * 10)
     * --10--30-50----70-----
     * ```
     *
     * @param {Function} project A function of type `(t: T) => U` that takes event
     * `t` of type `T` from the input Stream and produces an event of type `U`, to
     * be emitted on the output Stream.
     * @return {Stream}
     */
    Stream.prototype.map = function (project) {
        return this._map(project);
    };
    /**
     * It's like `map`, but transforms each input event to always the same
     * constant value on the output Stream.
     *
     * Marble diagram:
     *
     * ```text
     * --1---3--5-----7-----
     *       mapTo(10)
     * --10--10-10----10----
     * ```
     *
     * @param projectedValue A value to emit on the output Stream whenever the
     * input Stream emits any value.
     * @return {Stream}
     */
    Stream.prototype.mapTo = function (projectedValue) {
        var s = this.map(function () { return projectedValue; });
        var op = s._prod;
        op.type = op.type.replace('map', 'mapTo');
        return s;
    };
    /**
     * Only allows events that pass the test given by the `passes` argument.
     *
     * Each event from the input stream is given to the `passes` function. If the
     * function returns `true`, the event is forwarded to the output stream,
     * otherwise it is ignored and not forwarded.
     *
     * Marble diagram:
     *
     * ```text
     * --1---2--3-----4-----5---6--7-8--
     *     filter(i => i % 2 === 0)
     * ------2--------4---------6----8--
     * ```
     *
     * @param {Function} passes A function of type `(t: T) +> boolean` that takes
     * an event from the input stream and checks if it passes, by returning a
     * boolean.
     * @return {Stream}
     */
    Stream.prototype.filter = function (passes) {
        var p = this._prod;
        if (p instanceof Filter)
            return new Stream(new Filter(and(p.f, passes), p.ins));
        return new Stream(new Filter(passes, this));
    };
    /**
     * Lets the first `amount` many events from the input stream pass to the
     * output stream, then makes the output stream complete.
     *
     * Marble diagram:
     *
     * ```text
     * --a---b--c----d---e--
     *    take(3)
     * --a---b--c|
     * ```
     *
     * @param {number} amount How many events to allow from the input stream
     * before completing the output stream.
     * @return {Stream}
     */
    Stream.prototype.take = function (amount) {
        return new (this.ctor())(new Take(amount, this));
    };
    /**
     * Ignores the first `amount` many events from the input stream, and then
     * after that starts forwarding events from the input stream to the output
     * stream.
     *
     * Marble diagram:
     *
     * ```text
     * --a---b--c----d---e--
     *       drop(3)
     * --------------d---e--
     * ```
     *
     * @param {number} amount How many events to ignore from the input stream
     * before forwarding all events from the input stream to the output stream.
     * @return {Stream}
     */
    Stream.prototype.drop = function (amount) {
        return new Stream(new Drop(amount, this));
    };
    /**
     * When the input stream completes, the output stream will emit the last event
     * emitted by the input stream, and then will also complete.
     *
     * Marble diagram:
     *
     * ```text
     * --a---b--c--d----|
     *       last()
     * -----------------d|
     * ```
     *
     * @return {Stream}
     */
    Stream.prototype.last = function () {
        return new Stream(new Last(this));
    };
    /**
     * Prepends the given `initial` value to the sequence of events emitted by the
     * input stream. The returned stream is a MemoryStream, which means it is
     * already `remember()`'d.
     *
     * Marble diagram:
     *
     * ```text
     * ---1---2-----3---
     *   startWith(0)
     * 0--1---2-----3---
     * ```
     *
     * @param initial The value or event to prepend.
     * @return {MemoryStream}
     */
    Stream.prototype.startWith = function (initial) {
        return new MemoryStream(new StartWith(this, initial));
    };
    /**
     * Uses another stream to determine when to complete the current stream.
     *
     * When the given `other` stream emits an event or completes, the output
     * stream will complete. Before that happens, the output stream will behaves
     * like the input stream.
     *
     * Marble diagram:
     *
     * ```text
     * ---1---2-----3--4----5----6---
     *   endWhen( --------a--b--| )
     * ---1---2-----3--4--|
     * ```
     *
     * @param other Some other stream that is used to know when should the output
     * stream of this operator complete.
     * @return {Stream}
     */
    Stream.prototype.endWhen = function (other) {
        return new (this.ctor())(new EndWhen(other, this));
    };
    /**
     * "Folds" the stream onto itself.
     *
     * Combines events from the past throughout
     * the entire execution of the input stream, allowing you to accumulate them
     * together. It's essentially like `Array.prototype.reduce`. The returned
     * stream is a MemoryStream, which means it is already `remember()`'d.
     *
     * The output stream starts by emitting the `seed` which you give as argument.
     * Then, when an event happens on the input stream, it is combined with that
     * seed value through the `accumulate` function, and the output value is
     * emitted on the output stream. `fold` remembers that output value as `acc`
     * ("accumulator"), and then when a new input event `t` happens, `acc` will be
     * combined with that to produce the new `acc` and so forth.
     *
     * Marble diagram:
     *
     * ```text
     * ------1-----1--2----1----1------
     *   fold((acc, x) => acc + x, 3)
     * 3-----4-----5--7----8----9------
     * ```
     *
     * @param {Function} accumulate A function of type `(acc: R, t: T) => R` that
     * takes the previous accumulated value `acc` and the incoming event from the
     * input stream and produces the new accumulated value.
     * @param seed The initial accumulated value, of type `R`.
     * @return {MemoryStream}
     */
    Stream.prototype.fold = function (accumulate, seed) {
        return new MemoryStream(new Fold(accumulate, seed, this));
    };
    /**
     * Replaces an error with another stream.
     *
     * When (and if) an error happens on the input stream, instead of forwarding
     * that error to the output stream, *replaceError* will call the `replace`
     * function which returns the stream that the output stream will replicate.
     * And, in case that new stream also emits an error, `replace` will be called
     * again to get another stream to start replicating.
     *
     * Marble diagram:
     *
     * ```text
     * --1---2-----3--4-----X
     *   replaceError( () => --10--| )
     * --1---2-----3--4--------10--|
     * ```
     *
     * @param {Function} replace A function of type `(err) => Stream` that takes
     * the error that occurred on the input stream or on the previous replacement
     * stream and returns a new stream. The output stream will behave like the
     * stream that this function returns.
     * @return {Stream}
     */
    Stream.prototype.replaceError = function (replace) {
        return new (this.ctor())(new ReplaceError(replace, this));
    };
    /**
     * Flattens a "stream of streams", handling only one nested stream at a time
     * (no concurrency).
     *
     * If the input stream is a stream that emits streams, then this operator will
     * return an output stream which is a flat stream: emits regular events. The
     * flattening happens without concurrency. It works like this: when the input
     * stream emits a nested stream, *flatten* will start imitating that nested
     * one. However, as soon as the next nested stream is emitted on the input
     * stream, *flatten* will forget the previous nested one it was imitating, and
     * will start imitating the new nested one.
     *
     * Marble diagram:
     *
     * ```text
     * --+--------+---------------
     *   \        \
     *    \       ----1----2---3--
     *    --a--b----c----d--------
     *           flatten
     * -----a--b------1----2---3--
     * ```
     *
     * @return {Stream}
     */
    Stream.prototype.flatten = function () {
        var p = this._prod;
        return new Stream(p instanceof MapOp && !(p instanceof FilterMapFusion) ?
            new MapFlatten(p) :
            new Flatten(this));
    };
    /**
     * Passes the input stream to a custom operator, to produce an output stream.
     *
     * *compose* is a handy way of using an existing function in a chained style.
     * Instead of writing `outStream = f(inStream)` you can write
     * `outStream = inStream.compose(f)`.
     *
     * @param {function} operator A function that takes a stream as input and
     * returns a stream as well.
     * @return {Stream}
     */
    Stream.prototype.compose = function (operator) {
        return operator(this);
    };
    /**
     * Returns an output stream that behaves like the input stream, but also
     * remembers the most recent event that happens on the input stream, so that a
     * newly added listener will immediately receive that memorised event.
     *
     * @return {MemoryStream}
     */
    Stream.prototype.remember = function () {
        return new MemoryStream(new Remember(this));
    };
    /**
     * Returns an output stream that identically behaves like the input stream,
     * but also runs a `spy` function fo each event, to help you debug your app.
     *
     * *debug* takes a `spy` function as argument, and runs that for each event
     * happening on the input stream. If you don't provide the `spy` argument,
     * then *debug* will just `console.log` each event. This helps you to
     * understand the flow of events through some operator chain.
     *
     * Please note that if the output stream has no listeners, then it will not
     * start, which means `spy` will never run because no actual event happens in
     * that case.
     *
     * Marble diagram:
     *
     * ```text
     * --1----2-----3-----4--
     *         debug
     * --1----2-----3-----4--
     * ```
     *
     * @param {function} labelOrSpy A string to use as the label when printing
     * debug information on the console, or a 'spy' function that takes an event
     * as argument, and does not need to return anything.
     * @return {Stream}
     */
    Stream.prototype.debug = function (labelOrSpy) {
        return new (this.ctor())(new Debug(this, labelOrSpy));
    };
    /**
     * *imitate* changes this current Stream to emit the same events that the
     * `other` given Stream does. This method returns nothing.
     *
     * This method exists to allow one thing: **circular dependency of streams**.
     * For instance, let's imagine that for some reason you need to create a
     * circular dependency where stream `first$` depends on stream `second$`
     * which in turn depends on `first$`:
     *
     * <!-- skip-example -->
     * ```js
     * import delay from 'xstream/extra/delay'
     *
     * var first$ = second$.map(x => x * 10).take(3);
     * var second$ = first$.map(x => x + 1).startWith(1).compose(delay(100));
     * ```
     *
     * However, that is invalid JavaScript, because `second$` is undefined
     * on the first line. This is how *imitate* can help solve it:
     *
     * ```js
     * import delay from 'xstream/extra/delay'
     *
     * var secondProxy$ = xs.create();
     * var first$ = secondProxy$.map(x => x * 10).take(3);
     * var second$ = first$.map(x => x + 1).startWith(1).compose(delay(100));
     * secondProxy$.imitate(second$);
     * ```
     *
     * We create `secondProxy$` before the others, so it can be used in the
     * declaration of `first$`. Then, after both `first$` and `second$` are
     * defined, we hook `secondProxy$` with `second$` with `imitate()` to tell
     * that they are "the same". `imitate` will not trigger the start of any
     * stream, it just binds `secondProxy$` and `second$` together.
     *
     * The following is an example where `imitate()` is important in Cycle.js
     * applications. A parent component contains some child components. A child
     * has an action stream which is given to the parent to define its state:
     *
     * <!-- skip-example -->
     * ```js
     * const childActionProxy$ = xs.create();
     * const parent = Parent({...sources, childAction$: childActionProxy$});
     * const childAction$ = parent.state$.map(s => s.child.action$).flatten();
     * childActionProxy$.imitate(childAction$);
     * ```
     *
     * Note, though, that **`imitate()` does not support MemoryStreams**. If we
     * would attempt to imitate a MemoryStream in a circular dependency, we would
     * either get a race condition (where the symptom would be "nothing happens")
     * or an infinite cyclic emission of values. It's useful to think about
     * MemoryStreams as cells in a spreadsheet. It doesn't make any sense to
     * define a spreadsheet cell `A1` with a formula that depends on `B1` and
     * cell `B1` defined with a formula that depends on `A1`.
     *
     * If you find yourself wanting to use `imitate()` with a
     * MemoryStream, you should rework your code around `imitate()` to use a
     * Stream instead. Look for the stream in the circular dependency that
     * represents an event stream, and that would be a candidate for creating a
     * proxy Stream which then imitates the target Stream.
     *
     * @param {Stream} target The other stream to imitate on the current one. Must
     * not be a MemoryStream.
     */
    Stream.prototype.imitate = function (target) {
        if (target instanceof MemoryStream)
            throw new Error('A MemoryStream was given to imitate(), but it only ' +
                'supports a Stream. Read more about this restriction here: ' +
                'https://github.com/staltz/xstream#faq');
        this._target = target;
        for (var ils = this._ils, N = ils.length, i = 0; i < N; i++)
            target._add(ils[i]);
        this._ils = [];
    };
    /**
     * Forces the Stream to emit the given value to its listeners.
     *
     * As the name indicates, if you use this, you are most likely doing something
     * The Wrong Way. Please try to understand the reactive way before using this
     * method. Use it only when you know what you are doing.
     *
     * @param value The "next" value you want to broadcast to all listeners of
     * this Stream.
     */
    Stream.prototype.shamefullySendNext = function (value) {
        this._n(value);
    };
    /**
     * Forces the Stream to emit the given error to its listeners.
     *
     * As the name indicates, if you use this, you are most likely doing something
     * The Wrong Way. Please try to understand the reactive way before using this
     * method. Use it only when you know what you are doing.
     *
     * @param {any} error The error you want to broadcast to all the listeners of
     * this Stream.
     */
    Stream.prototype.shamefullySendError = function (error) {
        this._e(error);
    };
    /**
     * Forces the Stream to emit the "completed" event to its listeners.
     *
     * As the name indicates, if you use this, you are most likely doing something
     * The Wrong Way. Please try to understand the reactive way before using this
     * method. Use it only when you know what you are doing.
     */
    Stream.prototype.shamefullySendComplete = function () {
        this._c();
    };
    /**
     * Adds a "debug" listener to the stream. There can only be one debug
     * listener, that's why this is 'setDebugListener'. To remove the debug
     * listener, just call setDebugListener(null).
     *
     * A debug listener is like any other listener. The only difference is that a
     * debug listener is "stealthy": its presence/absence does not trigger the
     * start/stop of the stream (or the producer inside the stream). This is
     * useful so you can inspect what is going on without changing the behavior
     * of the program. If you have an idle stream and you add a normal listener to
     * it, the stream will start executing. But if you set a debug listener on an
     * idle stream, it won't start executing (not until the first normal listener
     * is added).
     *
     * As the name indicates, we don't recommend using this method to build app
     * logic. In fact, in most cases the debug operator works just fine. Only use
     * this one if you know what you're doing.
     *
     * @param {Listener<T>} listener
     */
    Stream.prototype.setDebugListener = function (listener) {
        if (!listener) {
            this._d = false;
            this._dl = NO;
        }
        else {
            this._d = true;
            listener._n = listener.next || noop;
            listener._e = listener.error || noop;
            listener._c = listener.complete || noop;
            this._dl = listener;
        }
    };
    return Stream;
}());
/**
 * Blends multiple streams together, emitting events from all of them
 * concurrently.
 *
 * *merge* takes multiple streams as arguments, and creates a stream that
 * behaves like each of the argument streams, in parallel.
 *
 * Marble diagram:
 *
 * ```text
 * --1----2-----3--------4---
 * ----a-----b----c---d------
 *            merge
 * --1-a--2--b--3-c---d--4---
 * ```
 *
 * @factory true
 * @param {Stream} stream1 A stream to merge together with other streams.
 * @param {Stream} stream2 A stream to merge together with other streams. Two
 * or more streams may be given as arguments.
 * @return {Stream}
 */
Stream.merge = function merge() {
    var streams = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        streams[_i] = arguments[_i];
    }
    return new Stream(new Merge(streams));
};
/**
 * Combines multiple input streams together to return a stream whose events
 * are arrays that collect the latest events from each input stream.
 *
 * *combine* internally remembers the most recent event from each of the input
 * streams. When any of the input streams emits an event, that event together
 * with all the other saved events are combined into an array. That array will
 * be emitted on the output stream. It's essentially a way of joining together
 * the events from multiple streams.
 *
 * Marble diagram:
 *
 * ```text
 * --1----2-----3--------4---
 * ----a-----b-----c--d------
 *          combine
 * ----1a-2a-2b-3b-3c-3d-4d--
 * ```
 *
 * Note: to minimize garbage collection, *combine* uses the same array
 * instance for each emission.  If you need to compare emissions over time,
 * cache the values with `map` first:
 *
 * ```js
 * import pairwise from 'xstream/extra/pairwise'
 *
 * const stream1 = xs.of(1);
 * const stream2 = xs.of(2);
 *
 * xs.combine(stream1, stream2).map(
 *   combinedEmissions => ([ ...combinedEmissions ])
 * ).compose(pairwise)
 * ```
 *
 * @factory true
 * @param {Stream} stream1 A stream to combine together with other streams.
 * @param {Stream} stream2 A stream to combine together with other streams.
 * Multiple streams, not just two, may be given as arguments.
 * @return {Stream}
 */
Stream.combine = function combine() {
    var streams = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        streams[_i] = arguments[_i];
    }
    return new Stream(new Combine(streams));
};
exports.Stream = Stream;
var MemoryStream = (function (_super) {
    __extends(MemoryStream, _super);
    function MemoryStream(producer) {
        var _this = _super.call(this, producer) || this;
        _this._has = false;
        return _this;
    }
    MemoryStream.prototype._n = function (x) {
        this._v = x;
        this._has = true;
        _super.prototype._n.call(this, x);
    };
    MemoryStream.prototype._add = function (il) {
        var ta = this._target;
        if (ta !== NO)
            return ta._add(il);
        var a = this._ils;
        a.push(il);
        if (a.length > 1) {
            if (this._has)
                il._n(this._v);
            return;
        }
        if (this._stopID !== NO) {
            if (this._has)
                il._n(this._v);
            clearTimeout(this._stopID);
            this._stopID = NO;
        }
        else if (this._has)
            il._n(this._v);
        else {
            var p = this._prod;
            if (p !== NO)
                p._start(this);
        }
    };
    MemoryStream.prototype._stopNow = function () {
        this._has = false;
        _super.prototype._stopNow.call(this);
    };
    MemoryStream.prototype._x = function () {
        this._has = false;
        _super.prototype._x.call(this);
    };
    MemoryStream.prototype.map = function (project) {
        return this._map(project);
    };
    MemoryStream.prototype.mapTo = function (projectedValue) {
        return _super.prototype.mapTo.call(this, projectedValue);
    };
    MemoryStream.prototype.take = function (amount) {
        return _super.prototype.take.call(this, amount);
    };
    MemoryStream.prototype.endWhen = function (other) {
        return _super.prototype.endWhen.call(this, other);
    };
    MemoryStream.prototype.replaceError = function (replace) {
        return _super.prototype.replaceError.call(this, replace);
    };
    MemoryStream.prototype.remember = function () {
        return this;
    };
    MemoryStream.prototype.debug = function (labelOrSpy) {
        return _super.prototype.debug.call(this, labelOrSpy);
    };
    return MemoryStream;
}(Stream));
exports.MemoryStream = MemoryStream;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Stream;
//# sourceMappingURL=index.js.map

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var thunk = __webpack_require__(167);
exports.thunk = thunk;
/**
 * A factory for the DOM driver function.
 *
 * Takes a `container` to define the target on the existing DOM which this
 * driver will operate on, and an `options` object as the second argument. The
 * input to this driver is a stream of virtual DOM objects, or in other words,
 * Snabbdom "VNode" objects. The output of this driver is a "DOMSource": a
 * collection of Observables queried with the methods `select()` and `events()`.
 *
 * `DOMSource.select(selector)` returns a new DOMSource with scope restricted to
 * the element(s) that matches the CSS `selector` given.
 *
 * `DOMSource.events(eventType, options)` returns a stream of events of
 * `eventType` happening on the elements that match the current DOMSource. The
 * event object contains the `ownerTarget` property that behaves exactly like
 * `currentTarget`. The reason for this is that some browsers doesn't allow
 * `currentTarget` property to be mutated, hence a new property is created. The
 * returned stream is an *xstream* Stream if you use `@cycle/xstream-run` to run
 * your app with this driver, or it is an RxJS Observable if you use
 * `@cycle/rxjs-run`, and so forth. The `options` parameter can have the
 * property `useCapture`, which is by default `false`, except it is `true` for
 * event types that do not bubble. Read more here
 * https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
 * about the `useCapture` and its purpose.
 *
 * `DOMSource.elements()` returns a stream of the DOM element(s) matched by the
 * selectors in the DOMSource. Also, `DOMSource.select(':root').elements()`
 * returns a stream of DOM element corresponding to the root (or container) of
 * the app on the DOM.
 *
 * @param {(String|HTMLElement)} container the DOM selector for the element
 * (or the element itself) to contain the rendering of the VTrees.
 * @param {DOMDriverOptions} options an object with two optional properties:
 *
 *   - `modules: array` overrides `@cycle/dom`'s default Snabbdom modules as
 *     as defined in [`src/modules.ts`](./src/modules.ts).
 *   - `transposition: boolean` enables/disables transposition of inner streams
 *     in the virtual DOM tree.
 * @return {Function} the DOM driver function. The function expects a stream of
 * VNode as input, and outputs the DOMSource object.
 * @function makeDOMDriver
 */
var makeDOMDriver_1 = __webpack_require__(76);
exports.makeDOMDriver = makeDOMDriver_1.makeDOMDriver;
/**
 * A factory for the HTML driver function.
 *
 * Takes an `effect` callback function and an `options` object as arguments. The
 * input to this driver is a stream of virtual DOM objects, or in other words,
 * Snabbdom "VNode" objects. The output of this driver is a "DOMSource": a
 * collection of Observables queried with the methods `select()` and `events()`.
 *
 * The HTML Driver is supplementary to the DOM Driver. Instead of producing
 * elements on the DOM, it generates HTML as strings and does a side effect on
 * those HTML strings. That side effect is described by the `effect` callback
 * function. So, if you want to use the HTML Driver on the server-side to render
 * your application as HTML and send as a response (which is the typical use
 * case for the HTML Driver), you need to pass something like the
 * `html => response.send(html)` function as the `effect` argument. This way,
 * the driver knows what side effect to cause based on the HTML string it just
 * rendered.
 *
 * The HTML driver is useful only for that side effect in the `effect` callback.
 * It can be considered a sink-only driver. However, in order to serve as a
 * transparent replacement to the DOM Driver when rendering from the server, the
 * HTML driver returns a source object that behaves just like the DOMSource.
 * This helps reuse the same application that is written for the DOM Driver.
 * This fake DOMSource returns empty streams when you query it, because there
 * are no user events on the server.
 *
 * `DOMSource.select(selector)` returns a new DOMSource with scope restricted to
 * the element(s) that matches the CSS `selector` given.
 *
 * `DOMSource.events(eventType, options)` returns an empty stream. The returned
 * stream is an *xstream* Stream if you use `@cycle/xstream-run` to run your app
 * with this driver, or it is an RxJS Observable if you use `@cycle/rxjs-run`,
 * and so forth.
 *
 * `DOMSource.elements()` returns the stream of HTML string rendered from your
 * sink virtual DOM stream.
 *
 * @param {Function} effect a callback function that takes a string of rendered
 * HTML as input and should run a side effect, returning nothing.
 * @param {HTMLDriverOptions} options an object with one optional property:
 * `transposition: boolean` enables/disables transposition of inner streams in
 * the virtual DOM tree.
 * @return {Function} the HTML driver function. The function expects a stream of
 * VNode as input, and outputs the DOMSource object.
 * @function makeHTMLDriver
 */
var makeHTMLDriver_1 = __webpack_require__(77);
exports.makeHTMLDriver = makeHTMLDriver_1.makeHTMLDriver;
/**
 * A factory function to create mocked DOMSource objects, for testing purposes.
 *
 * Takes a `streamAdapter` and a `mockConfig` object as arguments, and returns
 * a DOMSource that can be given to any Cycle.js app that expects a DOMSource in
 * the sources, for testing.
 *
 * The `streamAdapter` parameter is a package such as `@cycle/xstream-adapter`,
 * `@cycle/rxjs-adapter`, etc. Import it as `import a from '@cycle/rx-adapter`,
 * then provide it to `mockDOMSource. This is important so the DOMSource created
 * knows which stream library should it use to export its streams when you call
 * `DOMSource.events()` for instance.
 *
 * The `mockConfig` parameter is an object specifying selectors, eventTypes and
 * their streams. Example:
 *
 * ```js
 * const domSource = mockDOMSource(RxAdapter, {
 *   '.foo': {
 *     'click': Rx.Observable.of({target: {}}),
 *     'mouseover': Rx.Observable.of({target: {}}),
 *   },
 *   '.bar': {
 *     'scroll': Rx.Observable.of({target: {}}),
 *     elements: Rx.Observable.of({tagName: 'div'}),
 *   }
 * });
 *
 * // Usage
 * const click$ = domSource.select('.foo').events('click');
 * const element$ = domSource.select('.bar').elements();
 * ```
 *
 * The mocked DOM Source supports isolation. It has the functions `isolateSink`
 * and `isolateSource` attached to it, and performs simple isolation using
 * classNames. *isolateSink* with scope `foo` will append the class `___foo` to
 * the stream of virtual DOM nodes, and *isolateSource* with scope `foo` will
 * perform a conventional `mockedDOMSource.select('.__foo')` call.
 *
 * @param {Object} mockConfig an object where keys are selector strings
 * and values are objects. Those nested objects have `eventType` strings as keys
 * and values are streams you created.
 * @return {Object} fake DOM source object, with an API containing `select()`
 * and `events()` and `elements()` which can be used just like the DOM Driver's
 * DOMSource.
 *
 * @function mockDOMSource
 */
var mockDOMSource_1 = __webpack_require__(78);
exports.mockDOMSource = mockDOMSource_1.mockDOMSource;
/**
 * The hyperscript function `h()` is a function to create virtual DOM objects,
 * also known as VNodes. Call
 *
 * ```js
 * h('div.myClass', {style: {color: 'red'}}, [])
 * ```
 *
 * to create a VNode that represents a `DIV` element with className `myClass`,
 * styled with red color, and no children because the `[]` array was passed. The
 * API is `h(tagOrSelector, optionalData, optionalChildrenOrText)`.
 *
 * However, usually you should use "hyperscript helpers", which are shortcut
 * functions based on hyperscript. There is one hyperscript helper function for
 * each DOM tagName, such as `h1()`, `h2()`, `div()`, `span()`, `label()`,
 * `input()`. For instance, the previous example could have been written
 * as:
 *
 * ```js
 * div('.myClass', {style: {color: 'red'}}, [])
 * ```
 *
 * There are also SVG helper functions, which apply the appropriate SVG
 * namespace to the resulting elements. `svg()` function creates the top-most
 * SVG element, and `svg.g`, `svg.polygon`, `svg.circle`, `svg.path` are for
 * SVG-specific child elements. Example:
 *
 * ```js
 * svg({width: 150, height: 150}, [
 *   svg.polygon({
 *     attrs: {
 *       class: 'triangle',
 *       points: '20 0 20 150 150 20'
 *     }
 *   })
 * ])
 * ```
 *
 * @function h
 */
var hyperscript_1 = __webpack_require__(24);
exports.h = hyperscript_1.h;
var hyperscript_helpers_1 = __webpack_require__(73);
exports.svg = hyperscript_helpers_1.default.svg;
exports.a = hyperscript_helpers_1.default.a;
exports.abbr = hyperscript_helpers_1.default.abbr;
exports.address = hyperscript_helpers_1.default.address;
exports.area = hyperscript_helpers_1.default.area;
exports.article = hyperscript_helpers_1.default.article;
exports.aside = hyperscript_helpers_1.default.aside;
exports.audio = hyperscript_helpers_1.default.audio;
exports.b = hyperscript_helpers_1.default.b;
exports.base = hyperscript_helpers_1.default.base;
exports.bdi = hyperscript_helpers_1.default.bdi;
exports.bdo = hyperscript_helpers_1.default.bdo;
exports.blockquote = hyperscript_helpers_1.default.blockquote;
exports.body = hyperscript_helpers_1.default.body;
exports.br = hyperscript_helpers_1.default.br;
exports.button = hyperscript_helpers_1.default.button;
exports.canvas = hyperscript_helpers_1.default.canvas;
exports.caption = hyperscript_helpers_1.default.caption;
exports.cite = hyperscript_helpers_1.default.cite;
exports.code = hyperscript_helpers_1.default.code;
exports.col = hyperscript_helpers_1.default.col;
exports.colgroup = hyperscript_helpers_1.default.colgroup;
exports.dd = hyperscript_helpers_1.default.dd;
exports.del = hyperscript_helpers_1.default.del;
exports.dfn = hyperscript_helpers_1.default.dfn;
exports.dir = hyperscript_helpers_1.default.dir;
exports.div = hyperscript_helpers_1.default.div;
exports.dl = hyperscript_helpers_1.default.dl;
exports.dt = hyperscript_helpers_1.default.dt;
exports.em = hyperscript_helpers_1.default.em;
exports.embed = hyperscript_helpers_1.default.embed;
exports.fieldset = hyperscript_helpers_1.default.fieldset;
exports.figcaption = hyperscript_helpers_1.default.figcaption;
exports.figure = hyperscript_helpers_1.default.figure;
exports.footer = hyperscript_helpers_1.default.footer;
exports.form = hyperscript_helpers_1.default.form;
exports.h1 = hyperscript_helpers_1.default.h1;
exports.h2 = hyperscript_helpers_1.default.h2;
exports.h3 = hyperscript_helpers_1.default.h3;
exports.h4 = hyperscript_helpers_1.default.h4;
exports.h5 = hyperscript_helpers_1.default.h5;
exports.h6 = hyperscript_helpers_1.default.h6;
exports.head = hyperscript_helpers_1.default.head;
exports.header = hyperscript_helpers_1.default.header;
exports.hgroup = hyperscript_helpers_1.default.hgroup;
exports.hr = hyperscript_helpers_1.default.hr;
exports.html = hyperscript_helpers_1.default.html;
exports.i = hyperscript_helpers_1.default.i;
exports.iframe = hyperscript_helpers_1.default.iframe;
exports.img = hyperscript_helpers_1.default.img;
exports.input = hyperscript_helpers_1.default.input;
exports.ins = hyperscript_helpers_1.default.ins;
exports.kbd = hyperscript_helpers_1.default.kbd;
exports.keygen = hyperscript_helpers_1.default.keygen;
exports.label = hyperscript_helpers_1.default.label;
exports.legend = hyperscript_helpers_1.default.legend;
exports.li = hyperscript_helpers_1.default.li;
exports.link = hyperscript_helpers_1.default.link;
exports.main = hyperscript_helpers_1.default.main;
exports.map = hyperscript_helpers_1.default.map;
exports.mark = hyperscript_helpers_1.default.mark;
exports.menu = hyperscript_helpers_1.default.menu;
exports.meta = hyperscript_helpers_1.default.meta;
exports.nav = hyperscript_helpers_1.default.nav;
exports.noscript = hyperscript_helpers_1.default.noscript;
exports.object = hyperscript_helpers_1.default.object;
exports.ol = hyperscript_helpers_1.default.ol;
exports.optgroup = hyperscript_helpers_1.default.optgroup;
exports.option = hyperscript_helpers_1.default.option;
exports.p = hyperscript_helpers_1.default.p;
exports.param = hyperscript_helpers_1.default.param;
exports.pre = hyperscript_helpers_1.default.pre;
exports.progress = hyperscript_helpers_1.default.progress;
exports.q = hyperscript_helpers_1.default.q;
exports.rp = hyperscript_helpers_1.default.rp;
exports.rt = hyperscript_helpers_1.default.rt;
exports.ruby = hyperscript_helpers_1.default.ruby;
exports.s = hyperscript_helpers_1.default.s;
exports.samp = hyperscript_helpers_1.default.samp;
exports.script = hyperscript_helpers_1.default.script;
exports.section = hyperscript_helpers_1.default.section;
exports.select = hyperscript_helpers_1.default.select;
exports.small = hyperscript_helpers_1.default.small;
exports.source = hyperscript_helpers_1.default.source;
exports.span = hyperscript_helpers_1.default.span;
exports.strong = hyperscript_helpers_1.default.strong;
exports.style = hyperscript_helpers_1.default.style;
exports.sub = hyperscript_helpers_1.default.sub;
exports.sup = hyperscript_helpers_1.default.sup;
exports.table = hyperscript_helpers_1.default.table;
exports.tbody = hyperscript_helpers_1.default.tbody;
exports.td = hyperscript_helpers_1.default.td;
exports.textarea = hyperscript_helpers_1.default.textarea;
exports.tfoot = hyperscript_helpers_1.default.tfoot;
exports.th = hyperscript_helpers_1.default.th;
exports.thead = hyperscript_helpers_1.default.thead;
exports.title = hyperscript_helpers_1.default.title;
exports.tr = hyperscript_helpers_1.default.tr;
exports.u = hyperscript_helpers_1.default.u;
exports.ul = hyperscript_helpers_1.default.ul;
exports.video = hyperscript_helpers_1.default.video;
//# sourceMappingURL=index.js.map

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var counter = 0;
function newScope() {
    return "cycle" + ++counter;
}
function checkIsolateArgs(dataflowComponent, scope) {
    if (typeof dataflowComponent !== "function") {
        throw new Error("First argument given to isolate() must be a " +
            "'dataflowComponent' function");
    }
    if (scope === null) {
        throw new Error("Second argument given to isolate() must not be null");
    }
}
function isolateAllSources(sources, scope) {
    var scopedSources = {};
    for (var key in sources) {
        if (sources.hasOwnProperty(key) && sources[key]
            && typeof sources[key].isolateSource === "function") {
            scopedSources[key] = sources[key].isolateSource(sources[key], scope);
        }
        else if (sources.hasOwnProperty(key)) {
            scopedSources[key] = sources[key];
        }
    }
    return scopedSources;
}
function isolateAllSinks(sources, sinks, scope) {
    var scopedSinks = {};
    for (var key in sinks) {
        if (sinks.hasOwnProperty(key)
            && sources[key]
            && typeof sources[key].isolateSink === "function") {
            scopedSinks[key] = sources[key].isolateSink(sinks[key], scope);
        }
        else if (sinks.hasOwnProperty(key)) {
            scopedSinks[key] = sinks[key];
        }
    }
    return scopedSinks;
}
/**
 * Takes a `dataflowComponent` function and an optional `scope` string, and
 * returns a scoped version of the `dataflowComponent` function.
 *
 * When the scoped dataflow component is invoked, each source provided to the
 * scoped dataflowComponent is isolated to the scope using
 * `source.isolateSource(source, scope)`, if possible. Likewise, the sinks
 * returned from the scoped dataflow component are isolate to the scope using
 * `source.isolateSink(sink, scope)`.
 *
 * If the `scope` is not provided, a new scope will be automatically created.
 * This means that while **`isolate(dataflowComponent, scope)` is pure**
 * (referentially transparent), **`isolate(dataflowComponent)` is impure**
 * (not referentially transparent). Two calls to `isolate(Foo, bar)` will
 * generate two indistinct dataflow components. But, two calls to `isolate(Foo)`
 * will generate two distinct dataflow components.
 *
 * Note that both `isolateSource()` and `isolateSink()` are static members of
 * `source`. The reason for this is that drivers produce `source` while the
 * application produces `sink`, and it's the driver's responsibility to
 * implement `isolateSource()` and `isolateSink()`.
 *
 * @param {Function} dataflowComponent a function that takes `sources` as input
 * and outputs a collection of `sinks`.
 * @param {String} scope an optional string that is used to isolate each
 * `sources` and `sinks` when the returned scoped dataflow component is invoked.
 * @return {Function} the scoped dataflow component function that, as the
 * original `dataflowComponent` function, takes `sources` and returns `sinks`.
 * @function isolate
 */
function isolate(component, scope) {
    if (scope === void 0) { scope = newScope(); }
    checkIsolateArgs(component, scope);
    var convertedScope = typeof scope === 'string' ? scope : scope.toString();
    return function scopedComponent(sources) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        var scopedSources = isolateAllSources(sources, convertedScope);
        var sinks = component.apply(void 0, [scopedSources].concat(rest));
        var scopedSinks = isolateAllSinks(sources, sinks, convertedScope);
        return scopedSinks;
    };
}
isolate.reset = function () { return counter = 0; };
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = isolate;
//# sourceMappingURL=index.js.map

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__(203));
var Size;
(function (Size) {
    Size[Size["Mini"] = 0] = "Mini";
    Size[Size["Tiny"] = 1] = "Tiny";
    Size[Size["Small"] = 2] = "Small";
    Size[Size["Medium"] = 3] = "Medium";
    Size[Size["Large"] = 4] = "Large";
    Size[Size["Big"] = 5] = "Big";
    Size[Size["Huge"] = 6] = "Huge";
    Size[Size["Massive"] = 7] = "Massive";
    Size[Size["Fluid"] = 8] = "Fluid";
})(Size = exports.Size || (exports.Size = {}));
(function (Size) {
    function ToClassname(size) {
        switch (size) {
            case Size.Mini: return " mini";
            case Size.Tiny: return " tiny";
            case Size.Small: return " small";
            case Size.Medium: return " medium";
            case Size.Large: return " large";
            case Size.Big: return " big";
            case Size.Huge: return " huge";
            case Size.Massive: return " massive";
            case Size.Fluid: return " fluid";
            default: return "";
        }
    }
    Size.ToClassname = ToClassname;
})(Size = exports.Size || (exports.Size = {}));
var VerticalAlignment;
(function (VerticalAlignment) {
    VerticalAlignment[VerticalAlignment["Top"] = 0] = "Top";
    VerticalAlignment[VerticalAlignment["Middle"] = 1] = "Middle";
    VerticalAlignment[VerticalAlignment["Bottom"] = 2] = "Bottom";
})(VerticalAlignment = exports.VerticalAlignment || (exports.VerticalAlignment = {}));
(function (VerticalAlignment) {
    function ToClassname(alignment) {
        switch (alignment) {
            case VerticalAlignment.Top: return " top aligned";
            case VerticalAlignment.Middle: return " middle aligned";
            case VerticalAlignment.Bottom: return " bottom aligned";
            default: return "";
        }
    }
    VerticalAlignment.ToClassname = ToClassname;
})(VerticalAlignment = exports.VerticalAlignment || (exports.VerticalAlignment = {}));
var TextAlignment;
(function (TextAlignment) {
    TextAlignment[TextAlignment["Left"] = 0] = "Left";
    TextAlignment[TextAlignment["Right"] = 1] = "Right";
    TextAlignment[TextAlignment["Center"] = 2] = "Center";
    TextAlignment[TextAlignment["Justified"] = 3] = "Justified";
})(TextAlignment = exports.TextAlignment || (exports.TextAlignment = {}));
(function (TextAlignment) {
    function ToClassname(alignment) {
        switch (alignment) {
            case TextAlignment.Left: return " left aligned.";
            case TextAlignment.Right: return " right aligned.";
            case TextAlignment.Center: return " center aligned";
            case TextAlignment.Justified: return " justified";
            default: return "";
        }
    }
    TextAlignment.ToClassname = ToClassname;
})(TextAlignment = exports.TextAlignment || (exports.TextAlignment = {}));
var Float;
(function (Float) {
    Float[Float["None"] = 0] = "None";
    Float[Float["Right"] = 1] = "Right";
    Float[Float["Left"] = 2] = "Left";
})(Float = exports.Float || (exports.Float = {}));
(function (Float) {
    function ToClassname(float) {
        switch (float) {
            case Float.Left: return " left floated";
            case Float.Right: return " right floated";
            default: return "";
        }
    }
    Float.ToClassname = ToClassname;
})(Float = exports.Float || (exports.Float = {}));
var Attachment;
(function (Attachment) {
    Attachment[Attachment["None"] = 0] = "None";
    Attachment[Attachment["Top"] = 1] = "Top";
    Attachment[Attachment["TopRight"] = 2] = "TopRight";
    Attachment[Attachment["TopLeft"] = 3] = "TopLeft";
    Attachment[Attachment["Bottom"] = 4] = "Bottom";
    Attachment[Attachment["BottomLeft"] = 5] = "BottomLeft";
    Attachment[Attachment["BottomRight"] = 6] = "BottomRight";
    Attachment[Attachment["Right"] = 7] = "Right";
    Attachment[Attachment["Left"] = 8] = "Left";
})(Attachment = exports.Attachment || (exports.Attachment = {}));
(function (Attachment) {
    function ToClassname(attachment) {
        switch (attachment) {
            case Attachment.None: return " attached";
            case Attachment.Top: return " top attached";
            case Attachment.Bottom: return " bottom attached";
            case Attachment.Left: return " left attached";
            case Attachment.Right: return " right attached";
            case Attachment.TopRight: return " top right attached";
            case Attachment.TopLeft: return " top left attached";
            case Attachment.BottomLeft: return " bottom left attached";
            case Attachment.BottomRight: return " bottom right attached";
            default: return "";
        }
    }
    Attachment.ToClassname = ToClassname;
})(Attachment = exports.Attachment || (exports.Attachment = {}));
var Color;
(function (Color) {
    Color[Color["None"] = 0] = "None";
    Color[Color["Primary"] = 1] = "Primary";
    Color[Color["Secondary"] = 2] = "Secondary";
    Color[Color["Success"] = 3] = "Success";
    Color[Color["Info"] = 4] = "Info";
    Color[Color["Warning"] = 5] = "Warning";
    Color[Color["Error"] = 6] = "Error";
})(Color = exports.Color || (exports.Color = {}));
(function (Color) {
    function ToClassname(color) {
        switch (color) {
            case Color.Primary: return " primaryColored";
            case Color.Secondary: return " secondaryColored";
            case Color.Success: return " successColored";
            case Color.Info: return " infoColored";
            case Color.Warning: return " warningColored";
            case Color.Error: return " errorColored ";
            default: return "";
        }
    }
    Color.ToClassname = ToClassname;
})(Color = exports.Color || (exports.Color = {}));
var Animation;
(function (Animation) {
    Animation[Animation["Browse"] = 0] = "Browse";
    Animation[Animation["Drop"] = 1] = "Drop";
    Animation[Animation["Fade"] = 2] = "Fade";
    Animation[Animation["Flip"] = 3] = "Flip";
    Animation[Animation["Scale"] = 4] = "Scale";
    Animation[Animation["Fly"] = 5] = "Fly";
    Animation[Animation["Slide"] = 6] = "Slide";
    Animation[Animation["Swing"] = 7] = "Swing";
    Animation[Animation["Flash"] = 8] = "Flash";
    Animation[Animation["Shake"] = 9] = "Shake";
    Animation[Animation["Bounce"] = 10] = "Bounce";
    Animation[Animation["Tada"] = 11] = "Tada";
    Animation[Animation["Pulse"] = 12] = "Pulse";
    Animation[Animation["Jiggle"] = 13] = "Jiggle";
    Animation[Animation["None"] = 14] = "None";
})(Animation = exports.Animation || (exports.Animation = {}));
(function (Animation) {
    function ToClassname(anim) {
        switch (anim) {
            case Animation.Browse: return " browse";
            case Animation.Drop: return " drop";
            case Animation.Fade: return " fade";
            case Animation.Flip: return " flip";
            case Animation.Scale: return " scale";
            case Animation.Fly: return " fly";
            case Animation.Slide: return " slide";
            case Animation.Swing: return " swing";
            case Animation.Flash: return " flash";
            case Animation.Shake: return " shake";
            case Animation.Bounce: return " bounce";
            case Animation.Tada: return " tada";
            case Animation.Pulse: return " pulse";
            case Animation.Jiggle: return " jiggle";
        }
    }
    Animation.ToClassname = ToClassname;
    function isStatic(anim) {
        var staticAnimations = [Animation.Flash, Animation.Shake,
            Animation.Bounce, Animation.Tada, Animation.Pulse, Animation.Jiggle];
        return staticAnimations.indexOf(anim) !== -1;
    }
    Animation.isStatic = isStatic;
    function isDirectional(anim) {
        var directionAnimations = [Animation.Browse, Animation.Fade,
            Animation.Fly, Animation.Slide, Animation.Swing];
        return directionAnimations.indexOf(anim) !== -1;
    }
    Animation.isDirectional = isDirectional;
})(Animation = exports.Animation || (exports.Animation = {}));
var Direction;
(function (Direction) {
    Direction[Direction["In"] = 0] = "In";
    Direction[Direction["Out"] = 1] = "Out";
    Direction[Direction["None"] = 2] = "None";
})(Direction = exports.Direction || (exports.Direction = {}));
(function (Direction) {
    function ToClassname(direction) {
        return direction === Direction.In ? " in" : " out";
    }
    Direction.ToClassname = ToClassname;
})(Direction = exports.Direction || (exports.Direction = {}));
var AnimationDirection;
(function (AnimationDirection) {
    AnimationDirection[AnimationDirection["Up"] = 0] = "Up";
    AnimationDirection[AnimationDirection["Down"] = 1] = "Down";
    AnimationDirection[AnimationDirection["Left"] = 2] = "Left";
    AnimationDirection[AnimationDirection["Right"] = 3] = "Right";
})(AnimationDirection = exports.AnimationDirection || (exports.AnimationDirection = {}));
(function (AnimationDirection) {
    function ToClassname(dir) {
        switch (dir) {
            case AnimationDirection.Up: return " up";
            case AnimationDirection.Down: return " down";
            case AnimationDirection.Left: return " left";
            case AnimationDirection.Right: return " right";
            default: return "";
        }
    }
    AnimationDirection.ToClassname = ToClassname;
})(AnimationDirection = exports.AnimationDirection || (exports.AnimationDirection = {}));


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function isDOMContent(content) {
    if (!content) {
        return false;
    }
    if (typeof (content) === "string") {
        return true;
    }
    if (content instanceof (Array)) {
        if (content.length === 0) {
            return true;
        }
        else {
            return content[0].sel !== undefined;
        }
        ;
    }
    return false;
}
exports.isDOMContent = isDOMContent;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var xstream_1 = __webpack_require__(0);
var XStreamAdapter = {
    adapt: function (originStream, originStreamSubscribe) {
        if (XStreamAdapter.isValidStream(originStream)) {
            return originStream;
        }
        ;
        var dispose = null;
        return xstream_1.default.create({
            start: function (out) {
                var observer = out;
                dispose = originStreamSubscribe(originStream, observer);
            },
            stop: function () {
                if (typeof dispose === 'function') {
                    dispose();
                }
            },
        });
    },
    makeSubject: function () {
        var stream = xstream_1.default.create();
        var observer = {
            next: function (x) { stream.shamefullySendNext(x); },
            error: function (err) { stream.shamefullySendError(err); },
            complete: function () { stream.shamefullySendComplete(); },
        };
        return { observer: observer, stream: stream };
    },
    remember: function (stream) {
        return stream.remember();
    },
    isValidStream: function (stream) {
        return (typeof stream.addListener === 'function' &&
            typeof stream.shamefullySendNext === 'function');
    },
    streamSubscribe: function (stream, observer) {
        stream.addListener(observer);
        return function () { return stream.removeListener(observer); };
    },
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = XStreamAdapter;
//# sourceMappingURL=index.js.map

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (value) {
	if (value == null) throw new TypeError("Cannot use null or undefined");
	return value;
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPath = exports.parsePath = exports.getQueryStringValueFromPath = exports.stripQueryStringValueFromPath = exports.addQueryStringValueToPath = exports.isAbsolutePath = undefined;

var _warning = __webpack_require__(14);

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isAbsolutePath = exports.isAbsolutePath = function isAbsolutePath(path) {
  return typeof path === 'string' && path.charAt(0) === '/';
};

var addQueryStringValueToPath = exports.addQueryStringValueToPath = function addQueryStringValueToPath(path, key, value) {
  var _parsePath = parsePath(path);

  var pathname = _parsePath.pathname;
  var search = _parsePath.search;
  var hash = _parsePath.hash;


  return createPath({
    pathname: pathname,
    search: search + (search.indexOf('?') === -1 ? '?' : '&') + key + '=' + value,
    hash: hash
  });
};

var stripQueryStringValueFromPath = exports.stripQueryStringValueFromPath = function stripQueryStringValueFromPath(path, key) {
  var _parsePath2 = parsePath(path);

  var pathname = _parsePath2.pathname;
  var search = _parsePath2.search;
  var hash = _parsePath2.hash;


  return createPath({
    pathname: pathname,
    search: search.replace(new RegExp('([?&])' + key + '=[a-zA-Z0-9]+(&?)'), function (match, prefix, suffix) {
      return prefix === '?' ? prefix : suffix;
    }),
    hash: hash
  });
};

var getQueryStringValueFromPath = exports.getQueryStringValueFromPath = function getQueryStringValueFromPath(path, key) {
  var _parsePath3 = parsePath(path);

  var search = _parsePath3.search;

  var match = search.match(new RegExp('[?&]' + key + '=([a-zA-Z0-9]+)'));
  return match && match[1];
};

var extractPath = function extractPath(string) {
  var match = string.match(/^(https?:)?\/\/[^\/]*/);
  return match == null ? string : string.substring(match[0].length);
};

var parsePath = exports.parsePath = function parsePath(path) {
  var pathname = extractPath(path);
  var search = '';
  var hash = '';

  process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(path === pathname, 'A path must be pathname + search + hash only, not a full URL like "%s"', path) : void 0;

  var hashIndex = pathname.indexOf('#');
  if (hashIndex !== -1) {
    hash = pathname.substring(hashIndex);
    pathname = pathname.substring(0, hashIndex);
  }

  var searchIndex = pathname.indexOf('?');
  if (searchIndex !== -1) {
    search = pathname.substring(searchIndex);
    pathname = pathname.substring(0, searchIndex);
  }

  if (pathname === '') pathname = '/';

  return {
    pathname: pathname,
    search: search,
    hash: hash
  };
};

var createPath = exports.createPath = function createPath(location) {
  if (location == null || typeof location === 'string') return location;

  var basename = location.basename;
  var pathname = location.pathname;
  var search = location.search;
  var hash = location.hash;

  var path = (basename || '') + pathname;

  if (search && search !== '?') path += search;

  if (hash) path += hash;

  return path;
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var xstream_1 = __webpack_require__(0);
var flattenConcurrently_1 = __webpack_require__(214);
function patchClassList(target, classes, classesToAdd) {
    var className = "";
    if (target.data) {
        var props = target.data.props ? target.data.props : { className: target.sel.split(".").join(" ") };
        var classList = props.className.split(" ");
        classList.forEach(function (item) {
            if (classes.indexOf(item) === -1) {
                className += item + " ";
            }
        });
    }
    className += classesToAdd;
    return Object.assign({}, target.data, {
        "props": {
            className: className
        }
    });
}
exports.patchClassList = patchClassList;
/**
 * Adds one VNode to another and handles updates for stream by replacing based on the identifier class.
 * @param  {VNode}  element    The element to be added.
 * @param  {VNode}  target     The target for the element
 * @param  {string} identifier The identifying class for the element to be added.
 * @return {Array} The target element's children with the element added.
 */
function addElement(element, target, identifier) {
    var c = [];
    if (target.children) {
        c = target.children;
    }
    if (target.text) {
        c.push(target.text);
    }
    for (var i = 0; i < c.length; i++) {
        var child = c[i];
        var cProps = child.data ? child.data.props ? child.data.props : {} : {};
        if (typeof (child) !== "undefined" && typeof (cProps.className) !== "undefined") {
            var classList = child.data.props.className.split(" ");
            for (var _i = 0, classList_1 = classList; _i < classList_1.length; _i++) {
                var s = classList_1[_i];
                if (s === identifier) {
                    c.splice(i, 1);
                }
            }
        }
    }
    c.push(element);
    return c;
}
exports.addElement = addElement;
/**
 * Converts anything to a stream
 * @param  {any} obj - The object.
 * @return {Stream<any>} The object as a stream.
 */
function asStream(obj) {
    if (typeof (obj) !== "undefined") {
        if (typeof (obj.addListener) === "function") {
            return obj;
        }
        if (Object.prototype.toString.call(obj) === "[object Array]") {
            var isStreams = true;
            for (var _i = 0, obj_1 = obj; _i < obj_1.length; _i++) {
                var subobj = obj_1[_i];
                if (typeof (subobj.addListener) !== "function") {
                    isStreams = false;
                }
            }
            if (isStreams) {
                return xstream_1.default.combine.apply(this, obj);
            }
        }
        return xstream_1.default.of(obj);
    }
    return xstream_1.default.of("");
}
exports.asStream = asStream;
/**
 * Converts a number of objects to a stream of an Array.
 * @param  {any} ...objs   The objects to include in the stream
 * @return {Stream<any[]>} The objects as a stream of an array.
 */
function asArrayStream() {
    var objs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        objs[_i] = arguments[_i];
    }
    var streams = Array.from(arguments);
    streams = streams.map(function (obj) { return asStream(obj); });
    return xstream_1.default.combine.apply(this, streams);
}
exports.asArrayStream = asArrayStream;
/**
 * Flattens a stream of an array of streams into a stream of an array.
 * @param  {Stream<Stream<any>[]>} stream The stream to flatten
 * @return {Stream<any[]>}                The flattened stream.
 */
function flattenStreamArray(stream) {
    var _this = this;
    return flattenConcurrently_1.default(stream.map(function (children) { return xstream_1.default.combine.apply(_this, children); }));
}
exports.flattenStreamArray = flattenStreamArray;
/**
 * Converts a natural number between 1-16 to text.
 * @param  {number} num The number to convert.
 * @return {string}     That number as text.
 */
function numToText(num) {
    switch (num) {
        case 1: return " one";
        case 2: return " two";
        case 3: return " three";
        case 4: return " four";
        case 5: return " five";
        case 6: return " six";
        case 7: return " seven";
        case 8: return " eight";
        case 9: return " nine";
        case 10: return " ten";
        case 11: return " eleven";
        case 12: return " twelve";
        case 13: return " thirteen";
        case 14: return " fourteen";
        case 15: return " fifteen";
        case 16: return " sixteen";
    }
}
exports.numToText = numToText;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assign        = __webpack_require__(26)
  , normalizeOpts = __webpack_require__(108)
  , isCallable    = __webpack_require__(102)
  , contains      = __webpack_require__(46)

  , d;

d = module.exports = function (dscr, value/*, options*/) {
	var c, e, w, options, desc;
	if ((arguments.length < 2) || (typeof dscr !== 'string')) {
		options = value;
		value = dscr;
		dscr = null;
	} else {
		options = arguments[2];
	}
	if (dscr == null) {
		c = w = true;
		e = false;
	} else {
		c = contains.call(dscr, 'c');
		e = contains.call(dscr, 'e');
		w = contains.call(dscr, 'w');
	}

	desc = { value: value, configurable: c, enumerable: e, writable: w };
	return !options ? desc : assign(normalizeOpts(options), desc);
};

d.gs = function (dscr, get, set/*, options*/) {
	var c, e, options, desc;
	if (typeof dscr !== 'string') {
		options = set;
		set = get;
		get = dscr;
		dscr = null;
	} else {
		options = arguments[3];
	}
	if (get == null) {
		get = undefined;
	} else if (!isCallable(get)) {
		options = get;
		get = set = undefined;
	} else if (set == null) {
		set = undefined;
	} else if (!isCallable(set)) {
		options = set;
		set = undefined;
	}
	if (dscr == null) {
		c = true;
		e = false;
	} else {
		c = contains.call(dscr, 'c');
		e = contains.call(dscr, 'e');
	}

	desc = { get: get, set: set, configurable: c, enumerable: e };
	return !options ? desc : assign(normalizeOpts(options), desc);
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (fn) {
	if (typeof fn !== 'function') throw new TypeError(fn + " is not a function");
	return fn;
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.locationsAreEqual = exports.statesAreEqual = exports.createLocation = exports.createQuery = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _invariant = __webpack_require__(18);

var _invariant2 = _interopRequireDefault(_invariant);

var _PathUtils = __webpack_require__(8);

var _Actions = __webpack_require__(20);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createQuery = exports.createQuery = function createQuery(props) {
  return _extends(Object.create(null), props);
};

var createLocation = exports.createLocation = function createLocation() {
  var input = arguments.length <= 0 || arguments[0] === undefined ? '/' : arguments[0];
  var action = arguments.length <= 1 || arguments[1] === undefined ? _Actions.POP : arguments[1];
  var key = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

  var object = typeof input === 'string' ? (0, _PathUtils.parsePath)(input) : input;

  var pathname = object.pathname || '/';
  var search = object.search || '';
  var hash = object.hash || '';
  var state = object.state;

  return {
    pathname: pathname,
    search: search,
    hash: hash,
    state: state,
    action: action,
    key: key
  };
};

var isDate = function isDate(object) {
  return Object.prototype.toString.call(object) === '[object Date]';
};

var statesAreEqual = exports.statesAreEqual = function statesAreEqual(a, b) {
  if (a === b) return true;

  var typeofA = typeof a === 'undefined' ? 'undefined' : _typeof(a);
  var typeofB = typeof b === 'undefined' ? 'undefined' : _typeof(b);

  if (typeofA !== typeofB) return false;

  !(typeofA !== 'function') ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, 'You must not store functions in location state') : (0, _invariant2.default)(false) : void 0;

  // Not the same object, but same type.
  if (typeofA === 'object') {
    !!(isDate(a) && isDate(b)) ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, 'You must not store Date objects in location state') : (0, _invariant2.default)(false) : void 0;

    if (!Array.isArray(a)) return Object.keys(a).every(function (key) {
      return statesAreEqual(a[key], b[key]);
    });

    return Array.isArray(b) && a.length === b.length && a.every(function (item, index) {
      return statesAreEqual(item, b[index]);
    });
  }

  // All other serializable types (string, number, boolean)
  // should be strict equal.
  return false;
};

var locationsAreEqual = exports.locationsAreEqual = function locationsAreEqual(a, b) {
  return a.key === b.key &&
  // a.action === b.action && // Different action !== location change.
  a.pathname === b.pathname && a.search === b.search && a.hash === b.hash && statesAreEqual(a.state, b.state);
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var enums_1 = __webpack_require__(3);
var xstream_1 = __webpack_require__(0);
var dom_1 = __webpack_require__(1);
var isolate_1 = __webpack_require__(2);
var Transition;
(function (Transition) {
    /**
     * A transition wrapper for animating dom content.
     * Accepts the following targets: VNode
     * Expects the following arguments: {} of
     *   animation: Animation - The animation to use.
     *   direction?: Direction - Wether to animate to visible or invisible.
     *   animationDirection?: AnimationDirection - The direction for the animation.
     * Disregards any content.
     */
    function run(sources) {
        function main(sources) {
            var evt = function (type) { return sources.DOM.select(".transition").events(type); };
            sources.args$ = sources.args$ ? sources.args$ : xstream_1.default.of({ animation: enums_1.Animation.None, direction: enums_1.Direction.Out });
            var animationEnd$ = evt("animationend").map(function (evt) { return ({
                animation: enums_1.Animation.None,
                direction: evt.currentTarget.classList.contains("out") ? enums_1.Direction.Out : enums_1.Direction.In
            }); });
            var animation$ = xstream_1.default.merge(sources.args$, animationEnd$);
            var vTree$ = xstream_1.default.combine(animation$, sources.target$).map(function (_a) {
                var transition = _a[0], target = _a[1];
                return render(target, transition);
            });
            return {
                DOM: vTree$,
                Events: function (type) { return sources.DOM.select(".transition").events(type); }
            };
        }
        var isolatedMain = isolate_1.default(main);
        return isolatedMain(sources);
    }
    Transition.run = run;
    /**
     * A transition wrapper for animating dom content.
     * Accepts the following targets: VNode
     * Expects the following arguments: {} of
     *   animation: Animation - The animation to use.
     *   direction?: Direction - Wether to animate to visible or invisible.
     *   animationDirection?: AnimationDirection - The direction for the animation.
     * Disregards any content.
     */
    function render(target, args) {
        if (args === void 0) { args = { animation: enums_1.Animation.None }; }
        var className = "", c;
        if (target.data) {
            var classList = target.data.props.className.split(" ");
            classList.forEach(function (item) {
                if (["hidden", "visible", "animating", "transition"].indexOf(item) === -1) {
                    className += item + " ";
                }
            });
        }
        className += getClassName(args);
        var data = Object.assign({}, target.data, {
            "props": {
                className: className
            }
        });
        if (target.children) {
            c = target.children;
        }
        if (target.text) {
            c = target.text;
        }
        return dom_1.h(target.sel, data, c);
    }
    Transition.render = render;
    function getClassName(transition) {
        if (transition.animation === enums_1.Animation.None) {
            return transition.direction === enums_1.Direction.Out ? "transition hidden" : "transition visible";
        }
        var animation = enums_1.Animation.ToClassname(transition.animation);
        if (enums_1.Animation.isStatic(transition.animation)) {
            return "visible animating transition " + animation;
        }
        var direction = enums_1.Direction.ToClassname(transition.direction);
        if (enums_1.Animation.isDirectional(transition.animation)) {
            animation += enums_1.AnimationDirection.ToClassname(transition.animationDirection);
        }
        return "visible transition animating " + direction + animation;
    }
})(Transition = exports.Transition || (exports.Transition = {}));


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = function() {};

if (process.env.NODE_ENV !== 'production') {
  warning = function(condition, format, args) {
    var len = arguments.length;
    args = new Array(len > 2 ? len - 2 : 0);
    for (var key = 2; key < len; key++) {
      args[key - 2] = arguments[key];
    }
    if (format === undefined) {
      throw new Error(
        '`warning(condition, format, ...args)` requires a warning ' +
        'message argument'
      );
    }

    if (format.length < 10 || (/^[s\W]*$/).test(format)) {
      throw new Error(
        'The warning format should be able to uniquely identify this ' +
        'warning. Please, use a more descriptive format than: ' + format
      );
    }

    if (!condition) {
      var argIndex = 0;
      var message = 'Warning: ' +
        format.replace(/%s/g, function() {
          return args[argIndex++];
        });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch(x) {}
    }
  };
}

module.exports = warning;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function isElement(obj) {
    return typeof HTMLElement === "object" ?
        obj instanceof HTMLElement || obj instanceof DocumentFragment :
        obj && typeof obj === "object" && obj !== null &&
            (obj.nodeType === 1 || obj.nodeType === 11) &&
            typeof obj.nodeName === "string";
}
exports.SCOPE_PREFIX = "$$CYCLEDOM$$-";
function getElement(selectors) {
    var domElement = typeof selectors === 'string' ?
        document.querySelector(selectors) :
        selectors;
    if (typeof selectors === 'string' && domElement === null) {
        throw new Error("Cannot render into unknown element `" + selectors + "`");
    }
    else if (!isElement(domElement)) {
        throw new Error("Given container is not a DOM element neither a " +
            "selector string.");
    }
    return domElement;
}
exports.getElement = getElement;
function getScope(namespace) {
    return namespace
        .filter(function (c) { return c.indexOf(exports.SCOPE_PREFIX) > -1; })
        .map(function (c) { return c.replace(exports.SCOPE_PREFIX, ''); })
        .join("-");
}
exports.getScope = getScope;
function getSelectors(namespace) {
    return namespace.filter(function (c) { return c.indexOf(exports.SCOPE_PREFIX) === -1; }).join(" ");
}
exports.getSelectors = getSelectors;
//# sourceMappingURL=utils.js.map

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(122)() ? Symbol : __webpack_require__(124);


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var addEventListener = exports.addEventListener = function addEventListener(node, event, listener) {
  return node.addEventListener ? node.addEventListener(event, listener, false) : node.attachEvent('on' + event, listener);
};

var removeEventListener = exports.removeEventListener = function removeEventListener(node, event, listener) {
  return node.removeEventListener ? node.removeEventListener(event, listener, false) : node.detachEvent('on' + event, listener);
};

/**
 * Returns true if the HTML5 history API is supported. Taken from Modernizr.
 *
 * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
 * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
 * changed to avoid false negatives for Windows Phones: https://github.com/reactjs/react-router/issues/586
 */
var supportsHistory = exports.supportsHistory = function supportsHistory() {
  var ua = window.navigator.userAgent;

  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) return false;

  return window.history && 'pushState' in window.history;
};

/**
 * Returns false if using go(n) with hash history causes a full page reload.
 */
var supportsGoWithoutReloadUsingHash = exports.supportsGoWithoutReloadUsingHash = function supportsGoWithoutReloadUsingHash() {
  return window.navigator.userAgent.indexOf('Firefox') === -1;
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (process.env.NODE_ENV !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(44)()
	? Object.setPrototypeOf
	: __webpack_require__(45);


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Indicates that navigation was caused by a call to history.push.
 */
var PUSH = exports.PUSH = 'PUSH';

/**
 * Indicates that navigation was caused by a call to history.replace.
 */
var REPLACE = exports.REPLACE = 'REPLACE';

/**
 * Indicates that navigation was caused by some other action such
 * as using a browser's back/forward buttons and/or manually manipulating
 * the URL in a browser's location bar. This is the default.
 *
 * See https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onpopstate
 * for more information.
 */
var POP = exports.POP = 'POP';

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = {
  array: Array.isArray,
  primitive: function(s) { return typeof s === 'string' || typeof s === 'number'; },
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var enums_1 = __webpack_require__(3);
var xstream_1 = __webpack_require__(0);
var isolate_1 = __webpack_require__(2);
var dom_1 = __webpack_require__(1);
var Icon;
(function (Icon) {
    /**
     * An icon component for displaying icons.
     * Accepts the following properties in props$:
     *  button?: boolean - Styles the icon to display well on buttons
     * 	bordered?: boolean - Adds a border around the icon.
     * 	circular?: boolean - Styles the icon to appear circular.
     * 	disabled?: boolean - Styles the icon to appear disabled.
     * 	loading?: boolean - Rotates the icon to allow it to be used for loaders.
     * 	fitted?: boolean - Styles the icon for tight fits.
     * 	link?: boolean - Styles the icon to appear clickable.
     * 	flipped?: boolean - Flips the icon.
     * 	rotated?: boolean - Rotates the icon.
     * 	inverted?: boolean - Styles the icon to appear on dark background.
     * 	color?: Color - The color of the icon.
     * 	size?: Size - The size of the icon.
     * Accepts the following type of content in content$: IconType
     * @param  {ComponentSources} sources - The component's sources.
     * @return {ComponentSinks} The Icon component.
     */
    function run(sources) {
        function main(sources) {
            sources.props$ = sources.props$ ? sources.props$ : xstream_1.default.of({ type: "" });
            sources.content$ = sources.content$ ? sources.content$ : xstream_1.default.of(0);
            return {
                DOM: xstream_1.default.combine(sources.props$, sources.content$)
                    .map(function (_a) {
                    var props = _a[0], content = _a[1];
                    return render(props, content);
                }),
                Events: function (type) { return sources.DOM.select(".icon").events(type); }
            };
        }
        var isolatedMain = isolate_1.default(main);
        return isolatedMain(sources);
    }
    Icon.run = run;
    /**
     * An icon component for displaying icons.
     * Accepts the following properties:
     *  button?: boolean - Styles the icon to display well on buttons
     * 	bordered?: boolean - Adds a border around the icon.
     * 	circular?: boolean - Styles the icon to appear circular.
     * 	disabled?: boolean - Styles the icon to appear disabled.
     * 	loading?: boolean - Rotates the icon to allow it to be used for loaders.
     * 	fitted?: boolean - Styles the icon for tight fits.
     * 	link?: boolean - Styles the icon to appear clickable.
     * 	flipped?: boolean - Flips the icon.
     * 	rotated?: boolean - Rotates the icon.
     * 	inverted?: boolean - Styles the icon to appear on dark background.
     * 	color?: Color - The color of the icon.
     * 	size?: Size - The size of the icon.
     * Accepts the following type of content: IconType
     * @param  {ComponentSources} sources - The component's sources.
     * @return {ComponentSinks} The Icon component.
     */
    function render(pOrC, c) {
        if (pOrC === void 0) { pOrC = {}; }
        if (c === void 0) { c = -1; }
        var props = isProps(pOrC) ? pOrC : {};
        var content = isProps(pOrC) ? c : pOrC;
        var className = getClassname(props, content);
        return className !== "ui icon" ? dom_1.i({ props: { className: className } }) : "";
    }
    Icon.render = render;
    function getClassname(props, content) {
        var className = "ui";
        if (props.button) {
            className += " button";
        }
        if (props.bordered) {
            className += " bordered";
        }
        if (props.circular) {
            className += " circular";
        }
        if (props.disabled) {
            className += " disabled";
        }
        if (props.loading) {
            className += " loading";
        }
        if (props.fitted) {
            className += " fitted";
        }
        if (props.link) {
            className += " link";
        }
        if (props.flipped) {
            className += " flipped";
        }
        if (props.rotated) {
            className += " rotated";
        }
        if (props.inverted) {
            className += " inverted";
        }
        if (typeof (props.size) !== "undefined") {
            className += enums_1.Size.ToClassname(props.size);
        }
        if (typeof (props.color) !== "undefined") {
            className += enums_1.Color.ToClassname(props.color);
        }
        className += enums_1.IconType.ToClassname(content);
        return className + " icon";
    }
    function isProps(props) {
        return typeof (props) === "object";
    }
})(Icon = exports.Icon || (exports.Icon = {}));


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var xstream_1 = __webpack_require__(0);
function fromEvent(element, eventName, useCapture) {
    if (useCapture === void 0) { useCapture = false; }
    return xstream_1.Stream.create({
        element: element,
        next: null,
        start: function start(listener) {
            this.next = function next(event) { listener.next(event); };
            this.element.addEventListener(eventName, this.next, useCapture);
        },
        stop: function stop() {
            this.element.removeEventListener(eventName, this.next, useCapture);
        },
    });
}
exports.fromEvent = fromEvent;
//# sourceMappingURL=fromEvent.js.map

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var is = __webpack_require__(21);
var vnode = __webpack_require__(35);
function isGenericStream(x) {
    return !Array.isArray(x) && typeof x.map === "function";
}
function mutateStreamWithNS(vNode) {
    addNS(vNode.data, vNode.children, vNode.sel);
    return vNode;
}
function addNS(data, children, selector) {
    data.ns = "http://www.w3.org/2000/svg";
    if (selector !== "text" && selector !== "foreignObject" &&
        typeof children !== 'undefined' && is.array(children)) {
        for (var i = 0; i < children.length; ++i) {
            if (isGenericStream(children[i])) {
                children[i] = children[i].map(mutateStreamWithNS);
            }
            else {
                addNS(children[i].data, children[i].children, children[i].sel);
            }
        }
    }
}
function h(sel, b, c) {
    var data = {};
    var children;
    var text;
    if (arguments.length === 3) {
        data = b;
        if (is.array(c)) {
            children = c;
        }
        else if (is.primitive(c)) {
            text = c;
        }
    }
    else if (arguments.length === 2) {
        if (is.array(b)) {
            children = b;
        }
        else if (is.primitive(b)) {
            text = b;
        }
        else {
            data = b;
        }
    }
    if (is.array(children)) {
        children = children.filter(function (x) { return x; });
        for (var i = 0; i < children.length; ++i) {
            if (is.primitive(children[i])) {
                children[i] = vnode(undefined, undefined, undefined, children[i]);
            }
        }
    }
    if (sel[0] === 's' && sel[1] === 'v' && sel[2] === 'g') {
        addNS(data, children, sel);
    }
    return vnode(sel, data, children, text, undefined);
}
exports.h = h;
;
//# sourceMappingURL=hyperscript.js.map

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toString = Object.prototype.toString

  , id = toString.call((function () { return arguments; }()));

module.exports = function (x) { return (toString.call(x) === id); };


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(97)()
	? Object.assign
	: __webpack_require__(98);


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toString = Object.prototype.toString

  , id = toString.call('');

module.exports = function (x) {
	return (typeof x === 'string') || (x && (typeof x === 'object') &&
		((x instanceof String) || (toString.call(x) === id))) || false;
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var clear    = __webpack_require__(43)
  , assign   = __webpack_require__(26)
  , callable = __webpack_require__(11)
  , value    = __webpack_require__(7)
  , d        = __webpack_require__(10)
  , autoBind = __webpack_require__(89)
  , Symbol   = __webpack_require__(16)

  , defineProperty = Object.defineProperty
  , defineProperties = Object.defineProperties
  , Iterator;

module.exports = Iterator = function (list, context) {
	if (!(this instanceof Iterator)) return new Iterator(list, context);
	defineProperties(this, {
		__list__: d('w', value(list)),
		__context__: d('w', context),
		__nextIndex__: d('w', 0)
	});
	if (!context) return;
	callable(context.on);
	context.on('_add', this._onAdd);
	context.on('_delete', this._onDelete);
	context.on('_clear', this._onClear);
};

defineProperties(Iterator.prototype, assign({
	constructor: d(Iterator),
	_next: d(function () {
		var i;
		if (!this.__list__) return;
		if (this.__redo__) {
			i = this.__redo__.shift();
			if (i !== undefined) return i;
		}
		if (this.__nextIndex__ < this.__list__.length) return this.__nextIndex__++;
		this._unBind();
	}),
	next: d(function () { return this._createResult(this._next()); }),
	_createResult: d(function (i) {
		if (i === undefined) return { done: true, value: undefined };
		return { done: false, value: this._resolve(i) };
	}),
	_resolve: d(function (i) { return this.__list__[i]; }),
	_unBind: d(function () {
		this.__list__ = null;
		delete this.__redo__;
		if (!this.__context__) return;
		this.__context__.off('_add', this._onAdd);
		this.__context__.off('_delete', this._onDelete);
		this.__context__.off('_clear', this._onClear);
		this.__context__ = null;
	}),
	toString: d(function () { return '[object Iterator]'; })
}, autoBind({
	_onAdd: d(function (index) {
		if (index >= this.__nextIndex__) return;
		++this.__nextIndex__;
		if (!this.__redo__) {
			defineProperty(this, '__redo__', d('c', [index]));
			return;
		}
		this.__redo__.forEach(function (redo, i) {
			if (redo >= index) this.__redo__[i] = ++redo;
		}, this);
		this.__redo__.push(index);
	}),
	_onDelete: d(function (index) {
		var i;
		if (index >= this.__nextIndex__) return;
		--this.__nextIndex__;
		if (!this.__redo__) return;
		i = this.__redo__.indexOf(index);
		if (i !== -1) this.__redo__.splice(i, 1);
		this.__redo__.forEach(function (redo, i) {
			if (redo > index) this.__redo__[i] = --redo;
		}, this);
	}),
	_onClear: d(function () {
		if (this.__redo__) clear.call(this.__redo__);
		this.__nextIndex__ = 0;
	})
})));

defineProperty(Iterator.prototype, Symbol.iterator, d(function () {
	return this;
}));
defineProperty(Iterator.prototype, Symbol.toStringTag, d('', 'Iterator'));


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.go = exports.replaceLocation = exports.pushLocation = exports.startListener = exports.getUserConfirmation = exports.getCurrentLocation = undefined;

var _LocationUtils = __webpack_require__(12);

var _DOMUtils = __webpack_require__(17);

var _DOMStateStorage = __webpack_require__(49);

var _PathUtils = __webpack_require__(8);

/* eslint-disable no-alert */


var PopStateEvent = 'popstate';

var _createLocation = function _createLocation(historyState) {
  var key = historyState && historyState.key;

  return (0, _LocationUtils.createLocation)({
    pathname: window.location.pathname,
    search: window.location.search,
    hash: window.location.hash,
    state: key ? (0, _DOMStateStorage.readState)(key) : undefined
  }, undefined, key);
};

var getCurrentLocation = exports.getCurrentLocation = function getCurrentLocation() {
  var historyState = void 0;
  try {
    historyState = window.history.state || {};
  } catch (error) {
    // IE 11 sometimes throws when accessing window.history.state
    // See https://github.com/mjackson/history/pull/289
    historyState = {};
  }

  return _createLocation(historyState);
};

var getUserConfirmation = exports.getUserConfirmation = function getUserConfirmation(message, callback) {
  return callback(window.confirm(message));
};

var startListener = exports.startListener = function startListener(listener) {
  var handlePopState = function handlePopState(event) {
    if (event.state !== undefined) // Ignore extraneous popstate events in WebKit
      listener(_createLocation(event.state));
  };

  (0, _DOMUtils.addEventListener)(window, PopStateEvent, handlePopState);

  return function () {
    return (0, _DOMUtils.removeEventListener)(window, PopStateEvent, handlePopState);
  };
};

var updateLocation = function updateLocation(location, updateState) {
  var state = location.state;
  var key = location.key;


  if (state !== undefined) (0, _DOMStateStorage.saveState)(key, state);

  updateState({ key: key }, (0, _PathUtils.createPath)(location));
};

var pushLocation = exports.pushLocation = function pushLocation(location) {
  return updateLocation(location, function (state, path) {
    return window.history.pushState(state, null, path);
  });
};

var replaceLocation = exports.replaceLocation = function replaceLocation(location) {
  return updateLocation(location, function (state, path) {
    return window.history.replaceState(state, null, path);
  });
};

var go = exports.go = function go(n) {
  if (n) window.history.go(n);
};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var canUseDOM = exports.canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AsyncUtils = __webpack_require__(127);

var _PathUtils = __webpack_require__(8);

var _runTransitionHook = __webpack_require__(32);

var _runTransitionHook2 = _interopRequireDefault(_runTransitionHook);

var _Actions = __webpack_require__(20);

var _LocationUtils = __webpack_require__(12);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var createHistory = function createHistory() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var getCurrentLocation = options.getCurrentLocation;
  var getUserConfirmation = options.getUserConfirmation;
  var pushLocation = options.pushLocation;
  var replaceLocation = options.replaceLocation;
  var go = options.go;
  var keyLength = options.keyLength;


  var currentLocation = void 0;
  var pendingLocation = void 0;
  var beforeListeners = [];
  var listeners = [];
  var allKeys = [];

  var getCurrentIndex = function getCurrentIndex() {
    if (pendingLocation && pendingLocation.action === _Actions.POP) return allKeys.indexOf(pendingLocation.key);

    if (currentLocation) return allKeys.indexOf(currentLocation.key);

    return -1;
  };

  var updateLocation = function updateLocation(nextLocation) {
    currentLocation = nextLocation;

    var currentIndex = getCurrentIndex();

    if (currentLocation.action === _Actions.PUSH) {
      allKeys = [].concat(_toConsumableArray(allKeys.slice(0, currentIndex + 1)), [currentLocation.key]);
    } else if (currentLocation.action === _Actions.REPLACE) {
      allKeys[currentIndex] = currentLocation.key;
    }

    listeners.forEach(function (listener) {
      return listener(currentLocation);
    });
  };

  var listenBefore = function listenBefore(listener) {
    beforeListeners.push(listener);

    return function () {
      return beforeListeners = beforeListeners.filter(function (item) {
        return item !== listener;
      });
    };
  };

  var listen = function listen(listener) {
    listeners.push(listener);

    return function () {
      return listeners = listeners.filter(function (item) {
        return item !== listener;
      });
    };
  };

  var confirmTransitionTo = function confirmTransitionTo(location, callback) {
    (0, _AsyncUtils.loopAsync)(beforeListeners.length, function (index, next, done) {
      (0, _runTransitionHook2.default)(beforeListeners[index], location, function (result) {
        return result != null ? done(result) : next();
      });
    }, function (message) {
      if (getUserConfirmation && typeof message === 'string') {
        getUserConfirmation(message, function (ok) {
          return callback(ok !== false);
        });
      } else {
        callback(message !== false);
      }
    });
  };

  var transitionTo = function transitionTo(nextLocation) {
    if (currentLocation && (0, _LocationUtils.locationsAreEqual)(currentLocation, nextLocation) || pendingLocation && (0, _LocationUtils.locationsAreEqual)(pendingLocation, nextLocation)) return; // Nothing to do

    pendingLocation = nextLocation;

    confirmTransitionTo(nextLocation, function (ok) {
      if (pendingLocation !== nextLocation) return; // Transition was interrupted during confirmation

      pendingLocation = null;

      if (ok) {
        // Treat PUSH to same path like REPLACE to be consistent with browsers
        if (nextLocation.action === _Actions.PUSH) {
          var prevPath = (0, _PathUtils.createPath)(currentLocation);
          var nextPath = (0, _PathUtils.createPath)(nextLocation);

          if (nextPath === prevPath && (0, _LocationUtils.statesAreEqual)(currentLocation.state, nextLocation.state)) nextLocation.action = _Actions.REPLACE;
        }

        if (nextLocation.action === _Actions.POP) {
          updateLocation(nextLocation);
        } else if (nextLocation.action === _Actions.PUSH) {
          if (pushLocation(nextLocation) !== false) updateLocation(nextLocation);
        } else if (nextLocation.action === _Actions.REPLACE) {
          if (replaceLocation(nextLocation) !== false) updateLocation(nextLocation);
        }
      } else if (currentLocation && nextLocation.action === _Actions.POP) {
        var prevIndex = allKeys.indexOf(currentLocation.key);
        var nextIndex = allKeys.indexOf(nextLocation.key);

        if (prevIndex !== -1 && nextIndex !== -1) go(prevIndex - nextIndex); // Restore the URL
      }
    });
  };

  var push = function push(input) {
    return transitionTo(createLocation(input, _Actions.PUSH));
  };

  var replace = function replace(input) {
    return transitionTo(createLocation(input, _Actions.REPLACE));
  };

  var goBack = function goBack() {
    return go(-1);
  };

  var goForward = function goForward() {
    return go(1);
  };

  var createKey = function createKey() {
    return Math.random().toString(36).substr(2, keyLength || 6);
  };

  var createHref = function createHref(location) {
    return (0, _PathUtils.createPath)(location);
  };

  var createLocation = function createLocation(location, action) {
    var key = arguments.length <= 2 || arguments[2] === undefined ? createKey() : arguments[2];
    return (0, _LocationUtils.createLocation)(location, action, key);
  };

  return {
    getCurrentLocation: getCurrentLocation,
    listenBefore: listenBefore,
    listen: listen,
    transitionTo: transitionTo,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    createKey: createKey,
    createPath: _PathUtils.createPath,
    createHref: createHref,
    createLocation: createLocation
  };
};

exports.default = createHistory;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _warning = __webpack_require__(14);

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var runTransitionHook = function runTransitionHook(hook, location, callback) {
  var result = hook(location, callback);

  if (hook.length < 2) {
    // Assume the hook runs synchronously and automatically
    // call the callback with the return value.
    callback(result);
  } else {
    process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(result === undefined, 'You should not "return" in a transition hook with a callback argument; ' + 'call the callback instead') : void 0;
  }
};

exports.default = runTransitionHook;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module, global) {/**
 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** Used to determine if values are of the language type `Object`. */
var objectTypes = {
  'function': true,
  'object': true
};

/** Detect free variable `exports`. */
var freeExports = (objectTypes[typeof exports] && exports && !exports.nodeType)
  ? exports
  : undefined;

/** Detect free variable `module`. */
var freeModule = (objectTypes[typeof module] && module && !module.nodeType)
  ? module
  : undefined;

/** Detect free variable `global` from Node.js. */
var freeGlobal = checkGlobal(freeExports && freeModule && typeof global == 'object' && global);

/** Detect free variable `self`. */
var freeSelf = checkGlobal(objectTypes[typeof self] && self);

/** Detect free variable `window`. */
var freeWindow = checkGlobal(objectTypes[typeof window] && window);

/** Detect `this` as the global object. */
var thisGlobal = checkGlobal(objectTypes[typeof this] && this);

/**
 * Used as a reference to the global object.
 *
 * The `this` value is used if it's the global object to avoid Greasemonkey's
 * restricted `window` object, otherwise the `window` object is used.
 */
var root = freeGlobal ||
  ((freeWindow !== (thisGlobal && thisGlobal.window)) && freeWindow) ||
    freeSelf || thisGlobal || Function('return this')();

/**
 * Checks if `value` is a global object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {null|Object} Returns `value` if it's a global object, else `null`.
 */
function checkGlobal(value) {
  return (value && value.Object === Object) ? value : null;
}

module.exports = root;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(60)(module), __webpack_require__(37)))

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var proto = Element.prototype;
var vendor = proto.matches
  || proto.matchesSelector
  || proto.webkitMatchesSelector
  || proto.mozMatchesSelector
  || proto.msMatchesSelector
  || proto.oMatchesSelector;

module.exports = match;

/**
 * Match `el` to `selector`.
 *
 * @param {Element} el
 * @param {String} selector
 * @return {Boolean}
 * @api public
 */

function match(el, selector) {
  if (vendor) return vendor.call(el, selector);
  var nodes = el.parentNode.querySelectorAll(selector);
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i] == el) return true;
  }
  return false;
}

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = function(sel, data, children, text, elm) {
  var key = data === undefined ? undefined : data.key;
  return {sel: sel, data: data, children: children,
          text: text, elm: elm, key: key};
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isolate_1 = __webpack_require__(2);
var xstream_1 = __webpack_require__(0);
var enums_1 = __webpack_require__(3);
var dom_1 = __webpack_require__(1);
var transition_1 = __webpack_require__(13);
var utils_1 = __webpack_require__(9);
;
var Dimmer;
(function (Dimmer) {
    /**
     * A dimmer wrapper to show extra hidden content on an element.
     * Accepts the following type of target:
     *   VNode - The element to attach the dimmer to.
     *   "Page" - Creates a dimmer for the entire page.
     * Expects the following type of args: Boolean
     * Expects the following type of content: DOMContent
     * @param  {ComponentSources} sources The Component's sources.
     * @return {ComponentSinks} The Dimmer Component.
     */
    function run(sources, invert$) {
        if (invert$ === void 0) { invert$ = xstream_1.default.of(false); }
        function main(sources) {
            var evt = function (type) { return sources.DOM.select(".dimmable").events(type); };
            sources.content$ = sources.content$ ? sources.content$ : xstream_1.default.of("");
            sources.args$ = sources.args$ ? sources.args$ : onHover(evt);
            var target$ = sources.target$.remember();
            var active$ = sources.args$.remember();
            var transition$ = active$
                .fold(function (prevAnim, active) { return prevAnim.direction === enums_1.Direction.None
                ? ({ animation: enums_1.Animation.None, direction: active ? enums_1.Direction.In : enums_1.Direction.Out })
                : { animation: enums_1.Animation.Fade, direction: active ? enums_1.Direction.In : enums_1.Direction.Out
                }; }, ({ animation: enums_1.Animation.None, direction: enums_1.Direction.None }));
            var content$ = xstream_1.default.combine(sources.content$, target$, invert$)
                .map(function (_a) {
                var content = _a[0], target = _a[1], inverted = _a[2];
                return render(content, target, inverted);
            });
            var animatedContent = transition_1.Transition.run({ DOM: sources.DOM, args$: transition$, target$: content$ });
            var vTree$ = xstream_1.default.combine(target$, animatedContent.DOM, active$)
                .map(function (_a) {
                var target = _a[0], content = _a[1], active = _a[2];
                return dimElement(target, content, active);
            });
            return {
                DOM: vTree$,
                Events: animatedContent.Events,
            };
        }
        var isolatedMain = isolate_1.default(main);
        return isolatedMain(sources);
    }
    Dimmer.run = run;
    function render(content, target, inverted) {
        if (content === void 0) { content = ""; }
        if (target === void 0) { target = "page"; }
        if (inverted === void 0) { inverted = false; }
        return target === "page"
            ? dom_1.div({ props: { className: "ui " + (inverted ? "inverted " : "") + "dimmer modals page dimmer" } }, content)
            : dom_1.div({ props: { className: "ui " + (inverted ? "inverted " : "") + "targetted dimmer" } }, [
                dom_1.div({ props: { className: "content" } }, [
                    dom_1.div({ props: { className: "center" } }, content)
                ])
            ]);
    }
    Dimmer.render = render;
    function onHover(events) {
        return xstream_1.default.merge(events("mouseenter"), events("mouseleave"))
            .map(function (evt) { return evt.type === "mouseenter"; }).startWith(false);
    }
    function dimElement(targetOrString, content, active) {
        var isPage = typeof (targetOrString) === "string";
        var target = isPage ? content : targetOrString;
        var className = isPage ? "" : "dimmable", c;
        if (active) {
            className += isPage ? "active" : " dimmed";
        }
        var data = utils_1.patchClassList(target, ["dimmable", "dimmed", "inverted", "active"], className);
        if (isPage) {
            if (target.children) {
                c = target.children;
            }
            else if (target.text) {
                c = target.text;
            }
        }
        else {
            c = utils_1.addElement(content, target, "targetted");
        }
        return dom_1.h(target.sel, data, c);
    }
})(Dimmer = exports.Dimmer || (exports.Dimmer = {}));


/***/ }),
/* 37 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ScopeChecker = (function () {
    function ScopeChecker(scope, isolateModule) {
        this.scope = scope;
        this.isolateModule = isolateModule;
    }
    ScopeChecker.prototype.isStrictlyInRootScope = function (leaf) {
        for (var el = leaf; el; el = el.parentElement) {
            var scope = this.isolateModule.isIsolatedElement(el);
            if (scope && scope !== this.scope) {
                return false;
            }
            if (scope) {
                return true;
            }
        }
        return true;
    };
    return ScopeChecker;
}());
exports.ScopeChecker = ScopeChecker;
//# sourceMappingURL=ScopeChecker.js.map

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var xstream_adapter_1 = __webpack_require__(6);
var xstream_1 = __webpack_require__(0);
function createVTree(vnode, children) {
    return {
        sel: vnode.sel,
        data: vnode.data,
        text: vnode.text,
        elm: vnode.elm,
        key: vnode.key,
        children: children,
    };
}
function makeTransposeVNode(runStreamAdapter) {
    function internalTransposeVNode(vnode) {
        if (!vnode) {
            return null;
        }
        else if (vnode && vnode.data && vnode.data.static) {
            return xstream_1.default.of(vnode);
        }
        else if (runStreamAdapter.isValidStream(vnode)) {
            var xsStream = xstream_adapter_1.default.adapt(vnode, runStreamAdapter.streamSubscribe);
            return xsStream.map(internalTransposeVNode).flatten();
        }
        else if (typeof vnode === "object") {
            if (!vnode.children || vnode.children.length === 0) {
                return xstream_1.default.of(vnode);
            }
            var vnodeChildren = vnode.children
                .map(internalTransposeVNode)
                .filter(function (x) { return x !== null; });
            if (vnodeChildren.length === 0) {
                return xstream_1.default.of(createVTree(vnode, []));
            }
            else {
                return xstream_1.default.combine.apply(xstream_1.default, vnodeChildren)
                    .map(function (children) { return createVTree(vnode, children.slice()); });
            }
        }
        else {
            throw new Error("Unhandled vTree Value");
        }
    }
    ;
    return function transposeVNode(vnode) {
        return internalTransposeVNode(vnode);
    };
}
exports.makeTransposeVNode = makeTransposeVNode;
//# sourceMappingURL=transposition.js.map

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * History driver factory
 *
 * This is a function which, when called, returns a History Driver for Cycle.js
 * apps. The driver is also a function, and it takes a stream of new locations
 * (strings representing pathnames or location objects) as input, and outputs
 * another stream of locations that were applied.
 *
 * @param {History} history the History object created by the history library.
 * This object is usually created through `createBrowserHistory()` or
 * `createHashHistory()` or `createMemoryHistory()` from the `history` library.
 * Alternatively, you may use `createServerHistory` from this library.
 * @param {object} options an object with some options specific to this driver.
 * Options may be: `capture`, a boolean to indicate whether the driver should
 * intercept and handle any click event that leads to a link, like on an `<a>`
 * element; `onError`, a callback function that takes an error as argument and
 * handles it, use this to configure what to do with driver errors.
 * @return {Function} the History Driver function
 * @function makeHistoryDriver
 */
var makeHistoryDriver_1 = __webpack_require__(81);
exports.makeHistoryDriver = makeHistoryDriver_1.makeHistoryDriver;
/**
 * Creates a "ServerHistory" object similar to the History objects that the
 * `history` library can create. Use this when you want to support server-side
 * rendering.
 *
 * @param {string|object} location this may be either a string representing the
 * pathname, or a location object with fields like `pathname`, `search`,
 * `query`, `state`, `action`, `key`, `hash`, etc.
 * @return {object} a History object.
 * @function createServerHistory
 */
var serverHistory_1 = __webpack_require__(82);
exports.createServerHistory = serverHistory_1.createServerHistory;
var util_1 = __webpack_require__(41);
exports.supportsHistory = util_1.supportsHistory;
exports.createLocation = util_1.createLocation;
//# sourceMappingURL=index.js.map

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var objectAssign = __webpack_require__(55);
function supportsHistory() {
    if (typeof navigator === 'undefined') {
        return false;
    }
    var ua = navigator.userAgent;
    if ((ua.indexOf('Android 2.') !== -1 ||
        ua.indexOf('Android 4.0') !== -1) &&
        ua.indexOf('Mobile Safari') !== -1 &&
        ua.indexOf('Chrome') === -1 &&
        ua.indexOf('Windows Phone') === -1) {
        return false;
    }
    if (typeof window !== 'undefined') {
        return window.history && 'pushState' in window.history;
    }
    else {
        return false;
    }
}
exports.supportsHistory = supportsHistory;
var locationDefaults = {
    pathname: '/',
    action: 'POP',
    hash: '',
    search: '',
    state: undefined,
    key: null,
    query: null,
};
function createLocation(location) {
    if (typeof location === 'string') {
        return objectAssign({}, locationDefaults, { pathname: location });
    }
    return objectAssign({}, locationDefaults, location);
}
exports.createLocation = createLocation;
//# sourceMappingURL=util.js.map

/***/ }),
/* 42 */
/***/ (function(module, exports) {

/*!
 * Cross-Browser Split 1.1.1
 * Copyright 2007-2012 Steven Levithan <stevenlevithan.com>
 * Available under the MIT License
 * ECMAScript compliant, uniform cross-browser split method
 */

/**
 * Splits a string into an array of strings using a regex or string separator. Matches of the
 * separator are not included in the result array. However, if `separator` is a regex that contains
 * capturing groups, backreferences are spliced into the result each time `separator` is matched.
 * Fixes browser bugs compared to the native `String.prototype.split` and can be used reliably
 * cross-browser.
 * @param {String} str String to split.
 * @param {RegExp|String} separator Regex or string to use for separating the string.
 * @param {Number} [limit] Maximum number of items to include in the result array.
 * @returns {Array} Array of substrings.
 * @example
 *
 * // Basic use
 * split('a b c d', ' ');
 * // -> ['a', 'b', 'c', 'd']
 *
 * // With limit
 * split('a b c d', ' ', 2);
 * // -> ['a', 'b']
 *
 * // Backreferences in result array
 * split('..word1 word2..', /([a-z]+)(\d+)/i);
 * // -> ['..', 'word', '1', ' ', 'word', '2', '..']
 */
module.exports = (function split(undef) {

  var nativeSplit = String.prototype.split,
    compliantExecNpcg = /()??/.exec("")[1] === undef,
    // NPCG: nonparticipating capturing group
    self;

  self = function(str, separator, limit) {
    // If `separator` is not a regex, use `nativeSplit`
    if (Object.prototype.toString.call(separator) !== "[object RegExp]") {
      return nativeSplit.call(str, separator, limit);
    }
    var output = [],
      flags = (separator.ignoreCase ? "i" : "") + (separator.multiline ? "m" : "") + (separator.extended ? "x" : "") + // Proposed for ES6
      (separator.sticky ? "y" : ""),
      // Firefox 3+
      lastLastIndex = 0,
      // Make `global` and avoid `lastIndex` issues by working with a copy
      separator = new RegExp(separator.source, flags + "g"),
      separator2, match, lastIndex, lastLength;
    str += ""; // Type-convert
    if (!compliantExecNpcg) {
      // Doesn't need flags gy, but they don't hurt
      separator2 = new RegExp("^" + separator.source + "$(?!\\s)", flags);
    }
    /* Values for `limit`, per the spec:
     * If undefined: 4294967295 // Math.pow(2, 32) - 1
     * If 0, Infinity, or NaN: 0
     * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;
     * If negative number: 4294967296 - Math.floor(Math.abs(limit))
     * If other: Type-convert, then use the above rules
     */
    limit = limit === undef ? -1 >>> 0 : // Math.pow(2, 32) - 1
    limit >>> 0; // ToUint32(limit)
    while (match = separator.exec(str)) {
      // `separator.lastIndex` is not reliable cross-browser
      lastIndex = match.index + match[0].length;
      if (lastIndex > lastLastIndex) {
        output.push(str.slice(lastLastIndex, match.index));
        // Fix browsers whose `exec` methods don't consistently return `undefined` for
        // nonparticipating capturing groups
        if (!compliantExecNpcg && match.length > 1) {
          match[0].replace(separator2, function() {
            for (var i = 1; i < arguments.length - 2; i++) {
              if (arguments[i] === undef) {
                match[i] = undef;
              }
            }
          });
        }
        if (match.length > 1 && match.index < str.length) {
          Array.prototype.push.apply(output, match.slice(1));
        }
        lastLength = match[0].length;
        lastLastIndex = lastIndex;
        if (output.length >= limit) {
          break;
        }
      }
      if (separator.lastIndex === match.index) {
        separator.lastIndex++; // Avoid an infinite loop
      }
    }
    if (lastLastIndex === str.length) {
      if (lastLength || !separator.test("")) {
        output.push("");
      }
    } else {
      output.push(str.slice(lastLastIndex));
    }
    return output.length > limit ? output.slice(0, limit) : output;
  };

  return self;
})();


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Inspired by Google Closure:
// http://closure-library.googlecode.com/svn/docs/
// closure_goog_array_array.js.html#goog.array.clear



var value = __webpack_require__(7);

module.exports = function () {
	value(this).length = 0;
	return this;
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var create = Object.create, getPrototypeOf = Object.getPrototypeOf
  , x = {};

module.exports = function (/*customCreate*/) {
	var setPrototypeOf = Object.setPrototypeOf
	  , customCreate = arguments[0] || create;
	if (typeof setPrototypeOf !== 'function') return false;
	return getPrototypeOf(setPrototypeOf(customCreate(null), x)) === x;
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Big thanks to @WebReflection for sorting this out
// https://gist.github.com/WebReflection/5593554



var isObject      = __webpack_require__(103)
  , value         = __webpack_require__(7)

  , isPrototypeOf = Object.prototype.isPrototypeOf
  , defineProperty = Object.defineProperty
  , nullDesc = { configurable: true, enumerable: false, writable: true,
		value: undefined }
  , validate;

validate = function (obj, prototype) {
	value(obj);
	if ((prototype === null) || isObject(prototype)) return obj;
	throw new TypeError('Prototype must be null or an object');
};

module.exports = (function (status) {
	var fn, set;
	if (!status) return null;
	if (status.level === 2) {
		if (status.set) {
			set = status.set;
			fn = function (obj, prototype) {
				set.call(validate(obj, prototype), prototype);
				return obj;
			};
		} else {
			fn = function (obj, prototype) {
				validate(obj, prototype).__proto__ = prototype;
				return obj;
			};
		}
	} else {
		fn = function self(obj, prototype) {
			var isNullBase;
			validate(obj, prototype);
			isNullBase = isPrototypeOf.call(self.nullPolyfill, obj);
			if (isNullBase) delete self.nullPolyfill.__proto__;
			if (prototype === null) prototype = self.nullPolyfill;
			obj.__proto__ = prototype;
			if (isNullBase) defineProperty(self.nullPolyfill, '__proto__', nullDesc);
			return obj;
		};
	}
	return Object.defineProperty(fn, 'level', { configurable: false,
		enumerable: false, writable: false, value: status.level });
}((function () {
	var x = Object.create(null), y = {}, set
	  , desc = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__');

	if (desc) {
		try {
			set = desc.set; // Opera crashes at this point
			set.call(x, y);
		} catch (ignore) { }
		if (Object.getPrototypeOf(x) === y) return { set: set, level: 2 };
	}

	x.__proto__ = y;
	if (Object.getPrototypeOf(x) === y) return { level: 2 };

	x = {};
	x.__proto__ = y;
	if (Object.getPrototypeOf(x) === y) return { level: 1 };

	return false;
}())));

__webpack_require__(100);


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(110)()
	? String.prototype.contains
	: __webpack_require__(111);


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isIterable = __webpack_require__(115);

module.exports = function (value) {
	if (!isIterable(value)) throw new TypeError(value + " is not iterable");
	return value;
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(117)() ? Map : __webpack_require__(121);


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readState = exports.saveState = undefined;

var _warning = __webpack_require__(14);

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var QuotaExceededErrors = ['QuotaExceededError', 'QUOTA_EXCEEDED_ERR']; /* eslint-disable no-empty */


var SecurityError = 'SecurityError';
var KeyPrefix = '@@History/';

var createKey = function createKey(key) {
  return KeyPrefix + key;
};

var saveState = exports.saveState = function saveState(key, state) {
  if (!window.sessionStorage) {
    // Session storage is not available or hidden.
    // sessionStorage is undefined in Internet Explorer when served via file protocol.
    process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(false, '[history] Unable to save state; sessionStorage is not available') : void 0;
    return;
  }

  try {
    if (state == null) {
      window.sessionStorage.removeItem(createKey(key));
    } else {
      window.sessionStorage.setItem(createKey(key), JSON.stringify(state));
    }
  } catch (error) {
    if (error.name === SecurityError) {
      // Blocking cookies in Chrome/Firefox/Safari throws SecurityError on any
      // attempt to access window.sessionStorage.
      process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(false, '[history] Unable to save state; sessionStorage is not available due to security settings') : void 0;

      return;
    }

    if (QuotaExceededErrors.indexOf(error.name) >= 0 && window.sessionStorage.length === 0) {
      // Safari "private mode" throws QuotaExceededError.
      process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(false, '[history] Unable to save state; sessionStorage is not available in Safari private mode') : void 0;

      return;
    }

    throw error;
  }
};

var readState = exports.readState = function readState(key) {
  var json = void 0;
  try {
    json = window.sessionStorage.getItem(createKey(key));
  } catch (error) {
    if (error.name === SecurityError) {
      // Blocking cookies in Chrome/Firefox/Safari throws SecurityError on any
      // attempt to access window.sessionStorage.
      process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(false, '[history] Unable to read state; sessionStorage is not available due to security settings') : void 0;

      return undefined;
    }
  }

  if (json) {
    try {
      return JSON.parse(json);
    } catch (error) {
      // Ignore invalid JSON.
    }
  }

  return undefined;
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ }),
/* 50 */
/***/ (function(module, exports) {

/**
 * lodash 3.9.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** `Object#toString` result references. */
var funcTag = '[object Function]';

/** Used to detect host constructors (Safari > 5). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var fnToString = Function.prototype.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = object == null ? undefined : object[key];
  return isNative(value) ? value : undefined;
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in older versions of Chrome and Safari which return 'function' for regexes
  // and Safari 8 equivalents which return 'object' for typed array constructors.
  return isObject(value) && objToString.call(value) == funcTag;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is a native function.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
 * @example
 *
 * _.isNative(Array.prototype.push);
 * // => true
 *
 * _.isNative(_);
 * // => false
 */
function isNative(value) {
  if (value == null) {
    return false;
  }
  if (isFunction(value)) {
    return reIsNative.test(fnToString.call(value));
  }
  return isObjectLike(value) && reIsHostCtor.test(value);
}

module.exports = getNative;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * lodash 3.2.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var root = __webpack_require__(33);

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match HTML entities and HTML characters. */
var reUnescapedHtml = /[&<>"'`]/g,
    reHasUnescapedHtml = RegExp(reUnescapedHtml.source);

/** Used to map characters to HTML entities. */
var htmlEscapes = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '`': '&#96;'
};

/**
 * Used by `_.escape` to convert characters to HTML entities.
 *
 * @private
 * @param {string} chr The matched character to escape.
 * @returns {string} Returns the escaped character.
 */
function escapeHtmlChar(chr) {
  return htmlEscapes[chr];
}

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var Symbol = root.Symbol;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = Symbol ? symbolProto.toString : undefined;

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a string if it's not one. An empty string is returned
 * for `null` and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (value == null) {
    return '';
  }
  if (isSymbol(value)) {
    return Symbol ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Converts the characters "&", "<", ">", '"', "'", and "\`" in `string` to
 * their corresponding HTML entities.
 *
 * **Note:** No other characters are escaped. To escape additional
 * characters use a third-party library like [_he_](https://mths.be/he).
 *
 * Though the ">" character is escaped for symmetry, characters like
 * ">" and "/" don't need escaping in HTML and have no special meaning
 * unless they're part of a tag or unquoted attribute value.
 * See [Mathias Bynens's article](https://mathiasbynens.be/notes/ambiguous-ampersands)
 * (under "semi-related fun fact") for more details.
 *
 * Backticks are escaped because in IE < 9, they can break out of
 * attribute values or HTML comments. See [#59](https://html5sec.org/#59),
 * [#102](https://html5sec.org/#102), [#108](https://html5sec.org/#108), and
 * [#133](https://html5sec.org/#133) of the [HTML5 Security Cheatsheet](https://html5sec.org/)
 * for more details.
 *
 * When working with HTML you should always [quote attribute values](http://wonko.com/post/html-escaping)
 * to reduce XSS vectors.
 *
 * @static
 * @memberOf _
 * @category String
 * @param {string} [string=''] The string to escape.
 * @returns {string} Returns the escaped string.
 * @example
 *
 * _.escape('fred, barney, & pebbles');
 * // => 'fred, barney, &amp; pebbles'
 */
function escape(string) {
  string = toString(string);
  return (string && reHasUnescapedHtml.test(string))
    ? string.replace(reUnescapedHtml, escapeHtmlChar)
    : string;
}

module.exports = escape;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * lodash 3.0.2 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseFor = __webpack_require__(138),
    bindCallback = __webpack_require__(141),
    keys = __webpack_require__(146);

/**
 * The base implementation of `_.forOwn` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwn(object, iteratee) {
  return baseFor(object, iteratee, keys);
}

/**
 * Creates a function for `_.forOwn` or `_.forOwnRight`.
 *
 * @private
 * @param {Function} objectFunc The function to iterate over an object.
 * @returns {Function} Returns the new each function.
 */
function createForOwn(objectFunc) {
  return function(object, iteratee, thisArg) {
    if (typeof iteratee != 'function' || thisArg !== undefined) {
      iteratee = bindCallback(iteratee, thisArg, 3);
    }
    return objectFunc(object, iteratee);
  };
}

/**
 * Iterates over own enumerable properties of an object invoking `iteratee`
 * for each property. The `iteratee` is bound to `thisArg` and invoked with
 * three arguments: (value, key, object). Iteratee functions may exit iteration
 * early by explicitly returning `false`.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @param {*} [thisArg] The `this` binding of `iteratee`.
 * @returns {Object} Returns `object`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.forOwn(new Foo, function(value, key) {
 *   console.log(key);
 * });
 * // => logs 'a' and 'b' (iteration order is not guaranteed)
 */
var forOwn = createForOwn(baseForOwn);

module.exports = forOwn;


/***/ }),
/* 53 */
/***/ (function(module, exports) {

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

module.exports = isArguments;


/***/ }),
/* 54 */
/***/ (function(module, exports) {

/**
 * lodash 3.0.4 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** `Object#toString` result references. */
var arrayTag = '[object Array]',
    funcTag = '[object Function]';

/** Used to detect host constructors (Safari > 5). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var fnToString = Function.prototype.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/* Native method references for those with the same name as other `lodash` methods. */
var nativeIsArray = getNative(Array, 'isArray');

/**
 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = object == null ? undefined : object[key];
  return isNative(value) ? value : undefined;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(function() { return arguments; }());
 * // => false
 */
var isArray = nativeIsArray || function(value) {
  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
};

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in older versions of Chrome and Safari which return 'function' for regexes
  // and Safari 8 equivalents which return 'object' for typed array constructors.
  return isObject(value) && objToString.call(value) == funcTag;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is a native function.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
 * @example
 *
 * _.isNative(Array.prototype.push);
 * // => true
 *
 * _.isNative(_);
 * // => false
 */
function isNative(value) {
  if (value == null) {
    return false;
  }
  if (isFunction(value)) {
    return reIsNative.test(fnToString.call(value));
  }
  return isObjectLike(value) && reIsHostCtor.test(value);
}

module.exports = isArray;


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = selectorParser;

var _browserSplit = __webpack_require__(42);

var _browserSplit2 = _interopRequireDefault(_browserSplit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var classIdSplit = /([\.#]?[a-zA-Z0-9\u007F-\uFFFF_:-]+)/;
var notClassId = /^\.|#/;

function selectorParser() {
  var selector = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

  var tagName = void 0;
  var id = '';
  var classes = [];

  var tagParts = (0, _browserSplit2.default)(selector, classIdSplit);

  if (notClassId.test(tagParts[1]) || selector === '') {
    tagName = 'div';
  }

  var part = void 0;
  var type = void 0;
  var i = void 0;

  for (i = 0; i < tagParts.length; i++) {
    part = tagParts[i];

    if (!part) {
      continue;
    }

    type = part.charAt(0);

    if (!tagName) {
      tagName = part;
    } else if (type === '.') {
      classes.push(part.substring(1, part.length));
    } else if (type === '#') {
      id = part.substring(1, part.length);
    }
  }

  return {
    tagName: tagName,
    id: id,
    className: classes.join(' ')
  };
}

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {


// https://github.com/Matt-Esch/virtual-dom/blob/master/virtual-hyperscript/parse-tag.js

var split = __webpack_require__(42);

var classIdSplit = /([\.#]?[a-zA-Z0-9\u007F-\uFFFF_:-]+)/;
var notClassId = /^\.|#/;

module.exports = function parseSelector(selector, upper) {
  selector = selector || '';
  var tagName;
  var id = '';
  var classes = [];

  var tagParts = split(selector, classIdSplit);

  if (notClassId.test(tagParts[1]) || selector === '') {
    tagName = 'div';
  }

  var part, type, i;

  for (i = 0; i < tagParts.length; i++) {
    part = tagParts[i];

    if (!part) {
      continue;
    }

    type = part.charAt(0);

    if (!tagName) {
      tagName = part;
    } else if (type === '.') {
      classes.push(part.substring(1, part.length));
    } else if (type === '#') {
      id = part.substring(1, part.length);
    }
  }

  return {
    tagName: upper === true ? tagName.toUpperCase() : tagName,
    id: id,
    className: classes.join(' ')
  };
};

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__(204));


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var enums_1 = __webpack_require__(3);
var utils_1 = __webpack_require__(9);
var isolate_1 = __webpack_require__(2);
var dom_1 = __webpack_require__(1);
var xstream_1 = __webpack_require__(0);
var Menu;
(function (Menu) {
    /**
     * A menu component for displaying an assortment of items.
     * Accepts the following properties:
     * 	secondary?: boolean - Styles the menu to de-emphasize its content.
     * 	pointing?: boolean - Styles the menu to be pointing to nearby content.
     * 	tabular?: boolean - Styles the menu to be suited for tabs.
     * 	text?: boolean - Styles the menu for text content.
     * 	vertical?: boolean - Styles the menu to display its content vertically.
     * 	pagination?: boolean - Formats the menu content to present links to pages of content.
     * 	fixed?: boolean - Styles the menu to appear fixed to its context.
     * 	stackable?: boolean - Ensures the menu content stacks on mobile resolutions.
     * 	inverted?: boolean - Styles the menu to have its colors inverted.
     * 	icon?: boolean - Styles the menu for icon content.
     * 	labelled?: boolean - Styles the menu for labelled icon content.
     * 	compact?: boolean - Styles the menu so that it takes only the amount of space neccesary.
     * 	evenlyDivided?: boolean - Styles the menu so that its content is evenly divided.
     * 	borderless?: boolean - Styles the menu so that there are no borders between its content.
     * 	color?: Color - The color of the menu.
     * 	attachment?: Attachment - The attachment of the menu.
     * 	size?: Size - The size of the menu.
     * Expects the following type of content: Array of {}
     * 	link?: boolean - Styles the item to appear clickable.
     * 	down?: boolean - Styles the item to appear pressed.
     * 	active?: boolean - Styles the item to be more pronounced.
     * 	disabled?: boolean - Styles the item to appear disabled.
     * 	header?: boolean - Styles the item text to be more pronounced.
     * 	fitted?: boolean - Removes the padding of the item.
     *         icon?: boolean - Styles the item for icon content.
     * 	color?: Color - The color of the item.
     * 	float? Float - The alignment of the item.
     * 	href?: string - The link for the item.
     * 	body: DOMContent - The content of the item.
     */
    function run(sources) {
        function main(sources) {
            sources.content$ = sources.content$ ? sources.content$ : xstream_1.default.of([]);
            sources.props$ = sources.props$ ? sources.props$ : xstream_1.default.of({});
            var click$ = sources.DOM.select(".ui.menu > .item").events("click");
            var items$ = sources.content$.remember();
            var clickedId$ = click$.map(function (ev) { return parseInt(ev.currentTarget.id); })
                .filter(function (n) { return !isNaN(n) && typeof (n) !== "undefined"; });
            var clickedItem$ = items$.map(function (items) { return clickedId$.map(function (id) { return items[id]; }); }).flatten()
                .filter(function (item) { return !item.disabled; });
            var vtree$ = xstream_1.default.combine(sources.props$, items$).map(function (_a) {
                var props = _a[0], content = _a[1];
                return render(props, content);
            });
            return {
                DOM: vtree$,
                Events: function (type) { return sources.DOM.select(".menu").events(type); },
                value$: clickedItem$
            };
        }
        var isolatedMain = isolate_1.default(main);
        return isolatedMain(sources);
    }
    Menu.run = run;
    /**
     * A menu component for displaying an assortment of items.
     * Accepts the following properties:
     * 	secondary?: boolean - Styles the menu to de-emphasize its content.
     * 	pointing?: boolean - Styles the menu to be pointing to nearby content.
     * 	tabular?: boolean - Styles the menu to be suited for tabs.
     * 	text?: boolean - Styles the menu for text content.
     * 	vertical?: boolean - Styles the menu to display its content vertically.
     * 	pagination?: boolean - Formats the menu content to present links to pages of content.
     * 	fixed?: boolean - Styles the menu to appear fixed to its context.
     * 	stackable?: boolean - Ensures the menu content stacks on mobile resolutions.
     * 	inverted?: boolean - Styles the menu to have its colors inverted.
     * 	icon?: boolean - Styles the menu for icon content.
     * 	labelled?: boolean - Styles the menu for labelled icon content.
     * 	compact?: boolean - Styles the menu so that it takes only the amount of space neccesary.
     * 	evenlyDivided?: boolean - Styles the menu so that its content is evenly divided.
     * 	borderless?: boolean - Styles the menu so that there are no borders between its content.
     * 	color?: Color - The color of the menu.
     * 	attachment?: Attachment - The attachment of the menu.
     * 	size?: Size - The size of the menu.
     * Expects the following type of content: Array of {}
     * 	link?: boolean - Styles the item to appear clickable.
     * 	down?: boolean - Styles the item to appear pressed.
     * 	active?: boolean - Styles the item to be more pronounced.
     * 	disabled?: boolean - Styles the item to appear disabled.
     * 	header?: boolean - Styles the item text to be more pronounced.
     * 	fitted?: boolean - Removes the padding of the item.
     *  icon?: boolean - Styles the item for icon content.
     * 	color?: Color - The color of the item.
     * 	float? Float - The alignment of the item.
     * 	href?: string - The link for the item.
     * 	body: DOMContent - The content of the item.
     */
    function render(pOrC, c) {
        if (pOrC === void 0) { pOrC = {}; }
        if (c === void 0) { c = []; }
        var props = (pOrC instanceof Array) ? {} : pOrC;
        var content = (pOrC instanceof Array) ? pOrC : c;
        var items = content.map(function (item) { return item.href
            ? dom_1.a({ props: { className: getItemClassname(item), id: content.indexOf(item), href: item.href } }, item.body)
            : dom_1.div({ props: { className: getItemClassname(item), id: content.indexOf(item) } }, item.body); });
        return dom_1.div({ props: { className: getClassname(props, content.length) } }, items);
    }
    Menu.render = render;
    function getClassname(props, length) {
        var className;
        if (!props.submenu) {
            className = "ui";
        }
        if (props.secondary) {
            className += " secondary";
        }
        if (props.pointing) {
            className += " pointing";
        }
        if (props.tabular) {
            className += " tabular";
        }
        if (props.text) {
            className += " text";
        }
        if (props.vertical) {
            className += " vertical";
        }
        if (props.pagination) {
            className += " pagination";
        }
        if (props.fixed) {
            className += " fixed";
        }
        if (props.stackable) {
            className += " stackable";
        }
        if (props.inverted) {
            className += " inverted";
        }
        if (props.icon) {
            className += " icon";
        }
        if (props.labelled) {
            className += " labelled icon";
        }
        if (props.compact) {
            className += " compact";
        }
        if (props.borderless) {
            className += " borderless";
        }
        if (props.evenlyDivided) {
            className += utils_1.numToText(length) + " item";
        }
        if (typeof (props.color) !== "undefined") {
            className += enums_1.Color.ToClassname(props.color);
        }
        if (typeof (props.attachment) !== "undefined") {
            className += enums_1.Attachment.ToClassname(props.attachment);
        }
        if (typeof (props.size) !== "undefined") {
            className += enums_1.Size.ToClassname(props.size);
        }
        className += " menu";
        return className;
    }
    function getItemClassname(item) {
        var className = "";
        if (item.down) {
            className += " down";
        }
        if (item.active) {
            className += " active";
        }
        if (item.header) {
            className += " header";
        }
        if (item.fitted) {
            className += " vertically fitted";
        }
        if (item.link) {
            className += " link";
        }
        if (item.icon) {
            className += " icon";
        }
        if (item.disabled) {
            className += " disabled";
        }
        if (typeof (item.float) !== "undefined") {
            className += enums_1.Float.ToClassname(item.float);
        }
        if (typeof (item.color) !== "undefined") {
            className += enums_1.Color.ToClassname(item.color);
        }
        className += " item";
        return className;
    }
})(Menu = exports.Menu || (exports.Menu = {}));


/***/ }),
/* 60 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var index_1 = __webpack_require__(0);
var DebounceOperator = (function () {
    function DebounceOperator(dt, ins) {
        this.dt = dt;
        this.ins = ins;
        this.type = 'debounce';
        this.out = null;
        this.id = null;
    }
    DebounceOperator.prototype._start = function (out) {
        this.out = out;
        this.ins._add(this);
    };
    DebounceOperator.prototype._stop = function () {
        this.ins._remove(this);
        this.out = null;
        this.id = null;
    };
    DebounceOperator.prototype.clearInterval = function () {
        var id = this.id;
        if (id !== null) {
            clearInterval(id);
        }
        this.id = null;
    };
    DebounceOperator.prototype._n = function (t) {
        var _this = this;
        var u = this.out;
        if (!u)
            return;
        this.clearInterval();
        this.id = setInterval(function () {
            _this.clearInterval();
            u._n(t);
        }, this.dt);
    };
    DebounceOperator.prototype._e = function (err) {
        var u = this.out;
        if (!u)
            return;
        this.clearInterval();
        u._e(err);
    };
    DebounceOperator.prototype._c = function () {
        var u = this.out;
        if (!u)
            return;
        this.clearInterval();
        u._c();
    };
    return DebounceOperator;
}());
/**
 * Delays events until a certain amount of silence has passed. If that timespan
 * of silence is not met the event is dropped.
 *
 * Marble diagram:
 *
 * ```text
 * --1----2--3--4----5|
 *     debounce(60)
 * -----1----------4--|
 * ```
 *
 * Example:
 *
 * ```js
 * import fromDiagram from 'xstream/extra/fromDiagram'
 * import debounce from 'xstream/extra/debounce'
 *
 * const stream = fromDiagram('--1----2--3--4----5|')
 *  .compose(debounce(60))
 *
 * stream.addListener({
 *   next: i => console.log(i),
 *   error: err => console.error(err),
 *   complete: () => console.log('completed')
 * })
 * ```
 *
 * ```text
 * > 1
 * > 4
 * > completed
 * ```
 *
 * @param {number} period The amount of silence required in milliseconds.
 * @return {Stream}
 */
function debounce(period) {
    return function debounceOperator(ins) {
        return new index_1.Stream(new DebounceOperator(period, ins));
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = debounce;
//# sourceMappingURL=debounce.js.map

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var index_1 = __webpack_require__(0);
var DelayOperator = (function () {
    function DelayOperator(dt, ins) {
        this.dt = dt;
        this.ins = ins;
        this.type = 'delay';
        this.out = null;
    }
    DelayOperator.prototype._start = function (out) {
        this.out = out;
        this.ins._add(this);
    };
    DelayOperator.prototype._stop = function () {
        this.ins._remove(this);
        this.out = null;
    };
    DelayOperator.prototype._n = function (t) {
        var u = this.out;
        if (!u)
            return;
        var id = setInterval(function () {
            u._n(t);
            clearInterval(id);
        }, this.dt);
    };
    DelayOperator.prototype._e = function (err) {
        var u = this.out;
        if (!u)
            return;
        var id = setInterval(function () {
            u._e(err);
            clearInterval(id);
        }, this.dt);
    };
    DelayOperator.prototype._c = function () {
        var u = this.out;
        if (!u)
            return;
        var id = setInterval(function () {
            u._c();
            clearInterval(id);
        }, this.dt);
    };
    return DelayOperator;
}());
/**
 * Delays periodic events by a given time period.
 *
 * Marble diagram:
 *
 * ```text
 * 1----2--3--4----5|
 *     delay(60)
 * ---1----2--3--4----5|
 * ```
 *
 * Example:
 *
 * ```js
 * import fromDiagram from 'xstream/extra/fromDiagram'
 * import delay from 'xstream/extra/delay'
 *
 * const stream = fromDiagram('1----2--3--4----5|')
 *  .compose(delay(60))
 *
 * stream.addListener({
 *   next: i => console.log(i),
 *   error: err => console.error(err),
 *   complete: () => console.log('completed')
 * })
 * ```
 *
 * ```text
 * > 1  (after 60 ms)
 * > 2  (after 160 ms)
 * > 3  (after 220 ms)
 * > 4  (after 280 ms)
 * > 5  (after 380 ms)
 * > completed
 * ```
 *
 * @param {number} period The amount of silence required in milliseconds.
 * @return {Stream}
 */
function delay(period) {
    return function delayOperator(ins) {
        return new index_1.Stream(new DelayOperator(period, ins));
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = delay;
//# sourceMappingURL=delay.js.map

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var index_1 = __webpack_require__(0);
var empty = {};
var DropRepeatsOperator = (function () {
    function DropRepeatsOperator(ins, fn) {
        this.ins = ins;
        this.fn = fn;
        this.type = 'dropRepeats';
        this.out = null;
        this.v = empty;
    }
    DropRepeatsOperator.prototype._start = function (out) {
        this.out = out;
        this.ins._add(this);
    };
    DropRepeatsOperator.prototype._stop = function () {
        this.ins._remove(this);
        this.out = null;
        this.v = empty;
    };
    DropRepeatsOperator.prototype.isEq = function (x, y) {
        return this.fn ? this.fn(x, y) : x === y;
    };
    DropRepeatsOperator.prototype._n = function (t) {
        var u = this.out;
        if (!u)
            return;
        var v = this.v;
        if (v !== empty && this.isEq(t, v))
            return;
        this.v = Array.isArray(t) ? t.slice() : t;
        u._n(t);
    };
    DropRepeatsOperator.prototype._e = function (err) {
        var u = this.out;
        if (!u)
            return;
        u._e(err);
    };
    DropRepeatsOperator.prototype._c = function () {
        var u = this.out;
        if (!u)
            return;
        u._c();
    };
    return DropRepeatsOperator;
}());
exports.DropRepeatsOperator = DropRepeatsOperator;
/**
 * Drops consecutive duplicate values in a stream.
 *
 * Marble diagram:
 *
 * ```text
 * --1--2--1--1--1--2--3--4--3--3|
 *     dropRepeats
 * --1--2--1--------2--3--4--3---|
 * ```
 *
 * Example:
 *
 * ```js
 * import dropRepeats from 'xstream/extra/dropRepeats'
 *
 * const stream = xs.of(1, 2, 1, 1, 1, 2, 3, 4, 3, 3)
 *   .compose(dropRepeats())
 *
 * stream.addListener({
 *   next: i => console.log(i),
 *   error: err => console.error(err),
 *   complete: () => console.log('completed')
 * })
 * ```
 *
 * ```text
 * > 1
 * > 2
 * > 1
 * > 2
 * > 3
 * > 4
 * > 3
 * > completed
 * ```
 *
 * Example with a custom isEqual function:
 *
 * ```js
 * import dropRepeats from 'xstream/extra/dropRepeats'
 *
 * const stream = xs.of('a', 'b', 'a', 'A', 'B', 'b')
 *   .compose(dropRepeats((x, y) => x.toLowerCase() === y.toLowerCase()))
 *
 * stream.addListener({
 *   next: i => console.log(i),
 *   error: err => console.error(err),
 *   complete: () => console.log('completed')
 * })
 * ```
 *
 * ```text
 * > a
 * > b
 * > a
 * > B
 * > completed
 * ```
 *
 * @param {Function} isEqual An optional function of type
 * `(x: T, y: T) => boolean` that takes an event from the input stream and
 * checks if it is equal to previous event, by returning a boolean.
 * @return {Stream}
 */
function dropRepeats(isEqual) {
    if (isEqual === void 0) { isEqual = void 0; }
    return function dropRepeatsOperator(ins) {
        return new index_1.Stream(new DropRepeatsOperator(ins, isEqual));
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = dropRepeats;
//# sourceMappingURL=dropRepeats.js.map

/***/ }),
/* 64 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var xstream_run_1 = __webpack_require__(83);
var dom_1 = __webpack_require__(1);
var cyclic_router_1 = __webpack_require__(86);
var history_1 = __webpack_require__(133);
var xstream_1 = __webpack_require__(0);
var switch_path_1 = __webpack_require__(169);
var router_1 = __webpack_require__(177);
var routes_1 = __webpack_require__(178);
var layout_1 = __webpack_require__(175);
var history = cyclic_router_1.supportsHistory()
    ? [history_1.createHistory(), switch_path_1.default]
    : [history_1.createHashHistory(), switch_path_1.default];
function app(drivers) {
    var page = router_1.default(Object.assign({}, drivers, { routes: routes_1.default }));
    var layout = layout_1.Layout.run(drivers, page);
    var sinks = {
        DOM: layout.DOM,
        router: xstream_1.default.merge(page.router, layout.router),
    };
    return sinks;
}
xstream_run_1.run(app, {
    DOM: dom_1.makeDOMDriver(".app"),
    router: cyclic_router_1.makeRouterDriver.apply(null, history),
});


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var xstream_1 = __webpack_require__(0);
var xstream_adapter_1 = __webpack_require__(6);
var fromEvent_1 = __webpack_require__(23);
var BodyDOMSource = (function () {
    function BodyDOMSource(_runStreamAdapter, _name) {
        this._runStreamAdapter = _runStreamAdapter;
        this._name = _name;
    }
    BodyDOMSource.prototype.select = function (selector) {
        // This functionality is still undefined/undecided.
        return this;
    };
    BodyDOMSource.prototype.elements = function () {
        var runSA = this._runStreamAdapter;
        var out = runSA.remember(runSA.adapt(xstream_1.default.of(document.body), xstream_adapter_1.default.streamSubscribe));
        out._isCycleSource = this._name;
        return out;
    };
    BodyDOMSource.prototype.events = function (eventType, options) {
        if (options === void 0) { options = {}; }
        var stream;
        if (options && typeof options.useCapture === 'boolean') {
            stream = fromEvent_1.fromEvent(document.body, eventType, options.useCapture);
        }
        else {
            stream = fromEvent_1.fromEvent(document.body, eventType);
        }
        var out = this._runStreamAdapter.adapt(stream, xstream_adapter_1.default.streamSubscribe);
        out._isCycleSource = this._name;
        return out;
    };
    return BodyDOMSource;
}());
exports.BodyDOMSource = BodyDOMSource;
//# sourceMappingURL=BodyDOMSource.js.map

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var xstream_1 = __webpack_require__(0);
var xstream_adapter_1 = __webpack_require__(6);
var fromEvent_1 = __webpack_require__(23);
var DocumentDOMSource = (function () {
    function DocumentDOMSource(_runStreamAdapter, _name) {
        this._runStreamAdapter = _runStreamAdapter;
        this._name = _name;
    }
    DocumentDOMSource.prototype.select = function (selector) {
        // This functionality is still undefined/undecided.
        return this;
    };
    DocumentDOMSource.prototype.elements = function () {
        var runSA = this._runStreamAdapter;
        var out = runSA.remember(runSA.adapt(xstream_1.default.of(document), xstream_adapter_1.default.streamSubscribe));
        out._isCycleSource = this._name;
        return out;
    };
    DocumentDOMSource.prototype.events = function (eventType, options) {
        if (options === void 0) { options = {}; }
        var stream;
        if (options && typeof options.useCapture === 'boolean') {
            stream = fromEvent_1.fromEvent(document, eventType, options.useCapture);
        }
        else {
            stream = fromEvent_1.fromEvent(document, eventType);
        }
        var out = this._runStreamAdapter.adapt(stream, xstream_adapter_1.default.streamSubscribe);
        out._isCycleSource = this._name;
        return out;
    };
    return DocumentDOMSource;
}());
exports.DocumentDOMSource = DocumentDOMSource;
//# sourceMappingURL=DocumentDOMSource.js.map

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ScopeChecker_1 = __webpack_require__(38);
var utils_1 = __webpack_require__(15);
var matchesSelector;
try {
    matchesSelector = __webpack_require__(34);
}
catch (e) {
    matchesSelector = Function.prototype;
}
function toElArray(input) {
    return Array.prototype.slice.call(input);
}
var ElementFinder = (function () {
    function ElementFinder(namespace, isolateModule) {
        this.namespace = namespace;
        this.isolateModule = isolateModule;
    }
    ElementFinder.prototype.call = function (rootElement) {
        var namespace = this.namespace;
        if (namespace.join("") === "") {
            return rootElement;
        }
        var scope = utils_1.getScope(namespace);
        var scopeChecker = new ScopeChecker_1.ScopeChecker(scope, this.isolateModule);
        var selector = utils_1.getSelectors(namespace);
        var topNode = rootElement;
        var topNodeMatches = [];
        if (scope.length > 0) {
            topNode = this.isolateModule.getIsolatedElement(scope) || rootElement;
            if (selector && matchesSelector(topNode, selector)) {
                topNodeMatches.push(topNode);
            }
        }
        return toElArray(topNode.querySelectorAll(selector))
            .filter(scopeChecker.isStrictlyInRootScope, scopeChecker)
            .concat(topNodeMatches);
    };
    return ElementFinder;
}());
exports.ElementFinder = ElementFinder;
//# sourceMappingURL=ElementFinder.js.map

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ScopeChecker_1 = __webpack_require__(38);
var utils_1 = __webpack_require__(15);
var matchesSelector;
try {
    matchesSelector = __webpack_require__(34);
}
catch (e) {
    matchesSelector = Function.prototype;
}
var gDestinationId = 0;
function findDestinationId(arr, searchId) {
    var minIndex = 0;
    var maxIndex = arr.length - 1;
    var currentIndex;
    var currentElement;
    while (minIndex <= maxIndex) {
        currentIndex = (minIndex + maxIndex) / 2 | 0; // tslint:disable-line:no-bitwise
        currentElement = arr[currentIndex];
        var currentId = currentElement.destinationId;
        if (currentId < searchId) {
            minIndex = currentIndex + 1;
        }
        else if (currentId > searchId) {
            maxIndex = currentIndex - 1;
        }
        else {
            return currentIndex;
        }
    }
    return -1;
}
/**
 * Attaches an actual event listener to the DOM root element,
 * handles "destinations" (interested DOMSource output subjects), and bubbling.
 */
var EventDelegator = (function () {
    function EventDelegator(topElement, eventType, useCapture, isolateModule) {
        var _this = this;
        this.topElement = topElement;
        this.eventType = eventType;
        this.useCapture = useCapture;
        this.isolateModule = isolateModule;
        this.destinations = [];
        this.roof = topElement.parentElement;
        if (useCapture) {
            this.domListener = function (ev) { return _this.capture(ev); };
        }
        else {
            this.domListener = function (ev) { return _this.bubble(ev); };
        }
        topElement.addEventListener(eventType, this.domListener, useCapture);
    }
    EventDelegator.prototype.bubble = function (rawEvent) {
        if (!this.topElement.contains(rawEvent.currentTarget)) {
            return;
        }
        var ev = this.patchEvent(rawEvent);
        for (var el = ev.target; el && el !== this.roof; el = el.parentElement) {
            if (!this.topElement.contains(el)) {
                ev.stopPropagation();
            }
            if (ev.propagationHasBeenStopped) {
                return;
            }
            this.matchEventAgainstDestinations(el, ev);
        }
    };
    EventDelegator.prototype.matchEventAgainstDestinations = function (el, ev) {
        for (var i = 0, n = this.destinations.length; i < n; i++) {
            var dest = this.destinations[i];
            if (!dest.scopeChecker.isStrictlyInRootScope(el)) {
                continue;
            }
            if (matchesSelector(el, dest.selector)) {
                this.mutateEventCurrentTarget(ev, el);
                dest.subject._n(ev);
            }
        }
    };
    EventDelegator.prototype.capture = function (ev) {
        for (var i = 0, n = this.destinations.length; i < n; i++) {
            var dest = this.destinations[i];
            if (matchesSelector(ev.target, dest.selector)) {
                dest.subject._n(ev);
            }
        }
    };
    EventDelegator.prototype.addDestination = function (subject, namespace, destinationId) {
        var scope = utils_1.getScope(namespace);
        var selector = utils_1.getSelectors(namespace);
        var scopeChecker = new ScopeChecker_1.ScopeChecker(scope, this.isolateModule);
        this.destinations.push({ subject: subject, scopeChecker: scopeChecker, selector: selector, destinationId: destinationId });
    };
    EventDelegator.prototype.createDestinationId = function () {
        return gDestinationId++;
    };
    EventDelegator.prototype.removeDestinationId = function (destinationId) {
        var i = findDestinationId(this.destinations, destinationId);
        if (i >= 0) {
            this.destinations.splice(i, 1);
        }
    };
    EventDelegator.prototype.patchEvent = function (event) {
        var pEvent = event;
        pEvent.propagationHasBeenStopped = false;
        var oldStopPropagation = pEvent.stopPropagation;
        pEvent.stopPropagation = function stopPropagation() {
            oldStopPropagation.call(this);
            this.propagationHasBeenStopped = true;
        };
        return pEvent;
    };
    EventDelegator.prototype.mutateEventCurrentTarget = function (event, currentTargetElement) {
        try {
            Object.defineProperty(event, "currentTarget", {
                value: currentTargetElement,
                configurable: true,
            });
        }
        catch (err) {
            console.log("please use event.ownerTarget");
        }
        event.ownerTarget = currentTargetElement;
    };
    EventDelegator.prototype.updateTopElement = function (newTopElement) {
        this.topElement.removeEventListener(this.eventType, this.domListener, this.useCapture);
        newTopElement.addEventListener(this.eventType, this.domListener, this.useCapture);
        this.topElement = newTopElement;
    };
    return EventDelegator;
}());
exports.EventDelegator = EventDelegator;
//# sourceMappingURL=EventDelegator.js.map

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var xstream_1 = __webpack_require__(0);
var xstream_adapter_1 = __webpack_require__(6);
var HTMLSource = (function () {
    function HTMLSource(html$, runSA, _name) {
        this.runSA = runSA;
        this._name = _name;
        this._html$ = html$;
        this._empty$ = runSA.adapt(xstream_1.default.empty(), xstream_adapter_1.default.streamSubscribe);
    }
    HTMLSource.prototype.elements = function () {
        var out = this.runSA.adapt(this._html$, xstream_adapter_1.default.streamSubscribe);
        out._isCycleSource = this._name;
        return out;
    };
    HTMLSource.prototype.select = function (selector) {
        return new HTMLSource(xstream_1.default.empty(), this.runSA, this._name);
    };
    HTMLSource.prototype.events = function (eventType, options) {
        var out = this._empty$;
        out._isCycleSource = this._name;
        return out;
    };
    return HTMLSource;
}());
exports.HTMLSource = HTMLSource;
//# sourceMappingURL=HTMLSource.js.map

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var xstream_adapter_1 = __webpack_require__(6);
var DocumentDOMSource_1 = __webpack_require__(67);
var BodyDOMSource_1 = __webpack_require__(66);
var xstream_1 = __webpack_require__(0);
var ElementFinder_1 = __webpack_require__(68);
var fromEvent_1 = __webpack_require__(23);
var isolate_1 = __webpack_require__(74);
var EventDelegator_1 = __webpack_require__(69);
var utils_1 = __webpack_require__(15);
var matchesSelector;
try {
    matchesSelector = __webpack_require__(34);
}
catch (e) {
    matchesSelector = Function.prototype;
}
var eventTypesThatDontBubble = [
    "blur",
    "canplay",
    "canplaythrough",
    "change",
    "durationchange",
    "emptied",
    "ended",
    "focus",
    "load",
    "loadeddata",
    "loadedmetadata",
    "mouseenter",
    "mouseleave",
    "pause",
    "play",
    "playing",
    "ratechange",
    "reset",
    "scroll",
    "seeked",
    "seeking",
    "stalled",
    "submit",
    "suspend",
    "timeupdate",
    "unload",
    "volumechange",
    "waiting",
];
function determineUseCapture(eventType, options) {
    var result = false;
    if (typeof options.useCapture === 'boolean') {
        result = options.useCapture;
    }
    if (eventTypesThatDontBubble.indexOf(eventType) !== -1) {
        result = true;
    }
    return result;
}
function filterBasedOnIsolation(domSource, scope) {
    return function filterBasedOnIsolationOperator(rootElement$) {
        return rootElement$
            .fold(function shouldPass(state, element) {
            var hasIsolated = !!domSource._isolateModule.getIsolatedElement(scope);
            var shouldPass = hasIsolated && !state.hadIsolatedMutable;
            return { hadIsolatedMutable: hasIsolated, shouldPass: shouldPass, element: element };
        }, { hadIsolatedMutable: false, shouldPass: false, element: null })
            .drop(1)
            .filter(function (s) { return s.shouldPass; })
            .map(function (s) { return s.element; });
    };
}
var MainDOMSource = (function () {
    function MainDOMSource(_rootElement$, _sanitation$, _runStreamAdapter, _namespace, _isolateModule, _delegators, _name) {
        var _this = this;
        if (_namespace === void 0) { _namespace = []; }
        this._rootElement$ = _rootElement$;
        this._sanitation$ = _sanitation$;
        this._runStreamAdapter = _runStreamAdapter;
        this._namespace = _namespace;
        this._isolateModule = _isolateModule;
        this._delegators = _delegators;
        this._name = _name;
        this.__JANI_EVAKALLIO_WE_WILL_MISS_YOU_PLEASE_COME_BACK_EVENTUALLY = false;
        this.__JANI_EVAKALLIO_WE_WILL_MISS_YOU_PLEASE_COME_BACK_EVENTUALLY = true;
        this.isolateSource = isolate_1.isolateSource;
        this.isolateSink = function (sink, scope) {
            var existingScope = utils_1.getScope(_this._namespace);
            var deeperScope = [existingScope, scope].filter(function (x) { return !!x; }).join('-');
            return isolate_1.isolateSink(sink, deeperScope);
        };
    }
    MainDOMSource.prototype.elements = function () {
        var output$;
        if (this._namespace.length === 0) {
            output$ = this._rootElement$;
        }
        else {
            var elementFinder_1 = new ElementFinder_1.ElementFinder(this._namespace, this._isolateModule);
            output$ = this._rootElement$.map(function (el) { return elementFinder_1.call(el); });
        }
        var runSA = this._runStreamAdapter;
        var out = runSA.remember(runSA.adapt(output$, xstream_adapter_1.default.streamSubscribe));
        out._isCycleSource = this._name;
        return out;
    };
    Object.defineProperty(MainDOMSource.prototype, "namespace", {
        get: function () {
            return this._namespace;
        },
        enumerable: true,
        configurable: true
    });
    MainDOMSource.prototype.select = function (selector) {
        if (typeof selector !== 'string') {
            throw new Error("DOM driver's select() expects the argument to be a " +
                "string as a CSS selector");
        }
        if (selector === 'document') {
            return new DocumentDOMSource_1.DocumentDOMSource(this._runStreamAdapter, this._name);
        }
        if (selector === 'body') {
            return new BodyDOMSource_1.BodyDOMSource(this._runStreamAdapter, this._name);
        }
        var trimmedSelector = selector.trim();
        var childNamespace = trimmedSelector === ":root" ?
            this._namespace :
            this._namespace.concat(trimmedSelector);
        return new MainDOMSource(this._rootElement$, this._sanitation$, this._runStreamAdapter, childNamespace, this._isolateModule, this._delegators, this._name);
    };
    MainDOMSource.prototype.events = function (eventType, options) {
        if (options === void 0) { options = {}; }
        if (typeof eventType !== "string") {
            throw new Error("DOM driver's events() expects argument to be a " +
                "string representing the event type to listen for.");
        }
        var useCapture = determineUseCapture(eventType, options);
        var namespace = this._namespace;
        var scope = utils_1.getScope(namespace);
        var keyParts = [eventType, useCapture];
        if (scope) {
            keyParts.push(scope);
        }
        var key = keyParts.join('~');
        var domSource = this;
        var rootElement$;
        if (scope) {
            rootElement$ = this._rootElement$
                .compose(filterBasedOnIsolation(domSource, scope));
        }
        else {
            rootElement$ = this._rootElement$.take(2);
        }
        var event$ = rootElement$
            .map(function setupEventDelegatorOnTopElement(rootElement) {
            // Event listener just for the root element
            if (!namespace || namespace.length === 0) {
                return fromEvent_1.fromEvent(rootElement, eventType, useCapture);
            }
            // Event listener on the top element as an EventDelegator
            var delegators = domSource._delegators;
            var top = domSource._isolateModule.getIsolatedElement(scope) || rootElement;
            var delegator;
            if (delegators.has(key)) {
                delegator = delegators.get(key);
                delegator.updateTopElement(top);
            }
            else {
                delegator = new EventDelegator_1.EventDelegator(top, eventType, useCapture, domSource._isolateModule);
                delegators.set(key, delegator);
            }
            if (scope) {
                domSource._isolateModule.addEventDelegator(scope, delegator);
            }
            var destinationId = delegator.createDestinationId();
            var subject = xstream_1.default.create({
                start: function () { },
                stop: function () {
                    if ('requestIdleCallback' in window) {
                        requestIdleCallback(function () {
                            delegator.removeDestinationId(destinationId);
                        });
                    }
                    else {
                        delegator.removeDestinationId(destinationId);
                    }
                },
            });
            delegator.addDestination(subject, namespace, destinationId);
            return subject;
        })
            .flatten();
        var out = this._runStreamAdapter.adapt(event$, xstream_adapter_1.default.streamSubscribe);
        out._isCycleSource = domSource._name;
        return out;
    };
    MainDOMSource.prototype.dispose = function () {
        this._sanitation$.shamefullySendNext('');
        this._isolateModule.reset();
    };
    return MainDOMSource;
}());
exports.MainDOMSource = MainDOMSource;
//# sourceMappingURL=MainDOMSource.js.map

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var hyperscript_1 = __webpack_require__(24);
var classNameFromVNode_1 = __webpack_require__(151);
var selectorParser_1 = __webpack_require__(56);
var VNodeWrapper = (function () {
    function VNodeWrapper(rootElement) {
        this.rootElement = rootElement;
    }
    VNodeWrapper.prototype.call = function (vnode) {
        var _a = selectorParser_1.default(vnode.sel), selectorTagName = _a.tagName, selectorId = _a.id;
        var vNodeClassName = classNameFromVNode_1.default(vnode);
        var vNodeData = vnode.data || {};
        var vNodeDataProps = vNodeData.props || {};
        var _b = vNodeDataProps.id, vNodeId = _b === void 0 ? selectorId : _b;
        var isVNodeAndRootElementIdentical = vNodeId.toUpperCase() === this.rootElement.id.toUpperCase() &&
            selectorTagName.toUpperCase() === this.rootElement.tagName.toUpperCase() &&
            vNodeClassName.toUpperCase() === this.rootElement.className.toUpperCase();
        if (isVNodeAndRootElementIdentical) {
            return vnode;
        }
        var _c = this.rootElement, tagName = _c.tagName, id = _c.id, className = _c.className;
        var elementId = id ? "#" + id : "";
        var elementClassName = className ?
            "." + className.split(" ").join(".") : "";
        return hyperscript_1.h("" + tagName.toLowerCase() + elementId + elementClassName, {}, [
            vnode,
        ]);
    };
    return VNodeWrapper;
}());
exports.VNodeWrapper = VNodeWrapper;
//# sourceMappingURL=VNodeWrapper.js.map

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var hyperscript_1 = __webpack_require__(24);
function isValidString(param) {
    return typeof param === 'string' && param.length > 0;
}
function isSelector(param) {
    return isValidString(param) && (param[0] === '.' || param[0] === '#');
}
function createTagFunction(tagName) {
    return function hyperscript(first, b, c) {
        if (isSelector(first)) {
            if (typeof b !== 'undefined' && typeof c !== 'undefined') {
                return hyperscript_1.h(tagName + first, b, c);
            }
            else if (typeof b !== 'undefined') {
                return hyperscript_1.h(tagName + first, b);
            }
            else {
                return hyperscript_1.h(tagName + first, {});
            }
        }
        else if (!!b) {
            return hyperscript_1.h(tagName, first, b);
        }
        else if (!!first) {
            return hyperscript_1.h(tagName, first);
        }
        else {
            return hyperscript_1.h(tagName, {});
        }
    };
}
var SVG_TAG_NAMES = [
    'a', 'altGlyph', 'altGlyphDef', 'altGlyphItem', 'animate', 'animateColor',
    'animateMotion', 'animateTransform', 'circle', 'clipPath', 'colorProfile',
    'cursor', 'defs', 'desc', 'ellipse', 'feBlend', 'feColorMatrix',
    'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting',
    'feDisplacementMap', 'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB',
    'feFuncG', 'feFuncR', 'feGaussianBlur', 'feImage', 'feMerge', 'feMergeNode',
    'feMorphology', 'feOffset', 'fePointLight', 'feSpecularLighting',
    'feSpotlight', 'feTile', 'feTurbulence', 'filter', 'font', 'fontFace',
    'fontFaceFormat', 'fontFaceName', 'fontFaceSrc', 'fontFaceUri',
    'foreignObject', 'g', 'glyph', 'glyphRef', 'hkern', 'image', 'line',
    'linearGradient', 'marker', 'mask', 'metadata', 'missingGlyph', 'mpath',
    'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'script',
    'set', 'stop', 'style', 'switch', 'symbol', 'text', 'textPath', 'title',
    'tref', 'tspan', 'use', 'view', 'vkern',
];
var svg = createTagFunction('svg');
SVG_TAG_NAMES.forEach(function (tag) {
    svg[tag] = createTagFunction(tag);
});
var TAG_NAMES = [
    'a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base',
    'bdi', 'bdo', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption',
    'cite', 'code', 'col', 'colgroup', 'dd', 'del', 'dfn', 'dir', 'div', 'dl',
    'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html',
    'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend',
    'li', 'link', 'main', 'map', 'mark', 'menu', 'meta', 'nav', 'noscript',
    'object', 'ol', 'optgroup', 'option', 'p', 'param', 'pre', 'progress', 'q',
    'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small',
    'source', 'span', 'strong', 'style', 'sub', 'sup', 'table', 'tbody', 'td',
    'textarea', 'tfoot', 'th', 'thead', 'title', 'tr', 'u', 'ul', 'video',
];
var exported = { SVG_TAG_NAMES: SVG_TAG_NAMES, TAG_NAMES: TAG_NAMES, svg: svg, isSelector: isSelector, createTagFunction: createTagFunction };
TAG_NAMES.forEach(function (n) {
    exported[n] = createTagFunction(n);
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exported;
//# sourceMappingURL=hyperscript-helpers.js.map

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var utils_1 = __webpack_require__(15);
function isolateSource(source, scope) {
    return source.select(utils_1.SCOPE_PREFIX + scope);
}
exports.isolateSource = isolateSource;
function isolateSink(sink, scope) {
    return sink.map(function (vTree) {
        if (vTree.data && vTree.data.isolate) {
            var existingScope = vTree.data.isolate.replace(/(cycle|\-)/g, '');
            var _scope = scope.replace(/(cycle|\-)/g, '');
            if (isNaN(parseInt(existingScope))
                || isNaN(parseInt(_scope))
                || existingScope > _scope) {
                return vTree;
            }
        }
        vTree.data = vTree.data || {};
        vTree.data.isolate = scope;
        if (typeof vTree.key === 'undefined') {
            vTree.key = utils_1.SCOPE_PREFIX + scope;
        }
        return vTree;
    });
}
exports.isolateSink = isolateSink;
//# sourceMappingURL=isolate.js.map

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var MapPolyfill = __webpack_require__(48);
var IsolateModule = (function () {
    function IsolateModule(isolatedElements) {
        this.isolatedElements = isolatedElements;
        this.eventDelegators = new MapPolyfill();
    }
    IsolateModule.prototype.setScope = function (elm, scope) {
        this.isolatedElements.set(scope, elm);
    };
    IsolateModule.prototype.removeScope = function (scope) {
        this.isolatedElements.delete(scope);
    };
    IsolateModule.prototype.cleanupVNode = function (_a) {
        var data = _a.data, elm = _a.elm;
        data = data || {};
        var scope = data.isolate || '';
        var isCurrentElm = this.isolatedElements.get(scope) === elm;
        if (scope && isCurrentElm) {
            this.removeScope(scope);
            if (this.eventDelegators.get(scope)) {
                this.eventDelegators.set(scope, []);
            }
        }
    };
    IsolateModule.prototype.getIsolatedElement = function (scope) {
        return this.isolatedElements.get(scope);
    };
    IsolateModule.prototype.isIsolatedElement = function (elm) {
        var iterator = this.isolatedElements.entries();
        for (var result = iterator.next(); !!result.value; result = iterator.next()) {
            var _a = result.value, scope = _a[0], element = _a[1];
            if (elm === element) {
                return scope;
            }
        }
        return false;
    };
    IsolateModule.prototype.addEventDelegator = function (scope, eventDelegator) {
        var delegators = this.eventDelegators.get(scope);
        if (!delegators) {
            delegators = [];
            this.eventDelegators.set(scope, delegators);
        }
        delegators[delegators.length] = eventDelegator;
    };
    IsolateModule.prototype.reset = function () {
        this.isolatedElements.clear();
    };
    IsolateModule.prototype.createModule = function () {
        var self = this;
        return {
            create: function (oldVNode, vNode) {
                var _a = oldVNode.data, oldData = _a === void 0 ? {} : _a;
                var elm = vNode.elm, _b = vNode.data, data = _b === void 0 ? {} : _b;
                var oldScope = oldData.isolate || "";
                var scope = data.isolate || "";
                if (scope) {
                    if (oldScope) {
                        self.removeScope(oldScope);
                    }
                    self.setScope(elm, scope);
                    var delegators = self.eventDelegators.get(scope);
                    if (delegators) {
                        for (var i = 0, len = delegators.length; i < len; ++i) {
                            delegators[i].updateTopElement(elm);
                        }
                    }
                    else if (delegators === void 0) {
                        self.eventDelegators.set(scope, []);
                    }
                }
                if (oldScope && !scope) {
                    self.removeScope(scope);
                }
            },
            update: function (oldVNode, vNode) {
                var _a = oldVNode.data, oldData = _a === void 0 ? {} : _a;
                var elm = vNode.elm, _b = vNode.data, data = _b === void 0 ? {} : _b;
                var oldScope = oldData.isolate || "";
                var scope = data.isolate || "";
                if (scope && scope !== oldScope) {
                    if (oldScope) {
                        self.removeScope(oldScope);
                    }
                    self.setScope(elm, scope);
                }
                if (oldScope && !scope) {
                    self.removeScope(scope);
                }
            },
            remove: function (vNode, cb) {
                self.cleanupVNode(vNode);
                cb();
            },
            destroy: function (vNode) {
                self.cleanupVNode(vNode);
            },
        };
    };
    return IsolateModule;
}());
exports.IsolateModule = IsolateModule;
//# sourceMappingURL=isolateModule.js.map

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var snabbdom_1 = __webpack_require__(166);
var xstream_1 = __webpack_require__(0);
var MainDOMSource_1 = __webpack_require__(71);
var VNodeWrapper_1 = __webpack_require__(72);
var utils_1 = __webpack_require__(15);
var modules_1 = __webpack_require__(79);
var isolateModule_1 = __webpack_require__(75);
var transposition_1 = __webpack_require__(39);
var xstream_adapter_1 = __webpack_require__(6);
var MapPolyfill = __webpack_require__(48);
function makeDOMDriverInputGuard(modules) {
    if (!Array.isArray(modules)) {
        throw new Error("Optional modules option must be " +
            "an array for snabbdom modules");
    }
}
function domDriverInputGuard(view$) {
    if (!view$
        || typeof view$.addListener !== "function"
        || typeof view$.fold !== "function") {
        throw new Error("The DOM driver function expects as input a Stream of " +
            "virtual DOM elements");
    }
}
function makeDOMDriver(container, options) {
    if (!options) {
        options = {};
    }
    var transposition = options.transposition || false;
    var modules = options.modules || modules_1.default;
    var isolateModule = new isolateModule_1.IsolateModule((new MapPolyfill()));
    var patch = snabbdom_1.init([isolateModule.createModule()].concat(modules));
    var rootElement = utils_1.getElement(container);
    var vnodeWrapper = new VNodeWrapper_1.VNodeWrapper(rootElement);
    var delegators = new MapPolyfill();
    makeDOMDriverInputGuard(modules);
    function DOMDriver(vnode$, runStreamAdapter, name) {
        domDriverInputGuard(vnode$);
        var transposeVNode = transposition_1.makeTransposeVNode(runStreamAdapter);
        var preprocessedVNode$ = (transposition ? vnode$.map(transposeVNode).flatten() : vnode$);
        var sanitation$ = xstream_1.default.create();
        var rootElement$ = xstream_1.default.merge(preprocessedVNode$.endWhen(sanitation$), sanitation$)
            .map(function (vnode) { return vnodeWrapper.call(vnode); })
            .fold(patch, rootElement)
            .drop(1)
            .map(function unwrapElementFromVNode(vnode) { return vnode.elm; })
            .compose(function (stream) { return xstream_1.default.merge(stream, xstream_1.default.never()); }) // don't complete this stream
            .startWith(rootElement);
        rootElement$.addListener({ next: function () { }, error: function () { }, complete: function () { } });
        return new MainDOMSource_1.MainDOMSource(rootElement$, sanitation$, runStreamAdapter, [], isolateModule, delegators, name);
    }
    ;
    DOMDriver.streamAdapter = xstream_adapter_1.default;
    return DOMDriver;
}
exports.makeDOMDriver = makeDOMDriver;
//# sourceMappingURL=makeDOMDriver.js.map

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var xstream_adapter_1 = __webpack_require__(6);
var transposition_1 = __webpack_require__(39);
var HTMLSource_1 = __webpack_require__(70);
var toHTML = __webpack_require__(153);
var noop = function () { };
function makeHTMLDriver(effect, options) {
    if (!options) {
        options = {};
    }
    var transposition = options.transposition || false;
    function htmlDriver(vnode$, runStreamAdapter, name) {
        var transposeVNode = transposition_1.makeTransposeVNode(runStreamAdapter);
        var preprocessedVNode$ = (transposition ? vnode$.map(transposeVNode).flatten() : vnode$);
        var html$ = preprocessedVNode$.map(toHTML);
        html$.addListener({
            next: effect || noop,
            error: noop,
            complete: noop,
        });
        return new HTMLSource_1.HTMLSource(html$, runStreamAdapter, name);
    }
    ;
    htmlDriver.streamAdapter = xstream_adapter_1.default;
    return htmlDriver;
}
exports.makeHTMLDriver = makeHTMLDriver;
//# sourceMappingURL=makeHTMLDriver.js.map

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var xstream_adapter_1 = __webpack_require__(6);
var xstream_1 = __webpack_require__(0);
var SCOPE_PREFIX = '___';
var MockedDOMSource = (function () {
    function MockedDOMSource(_streamAdapter, _mockConfig) {
        this._streamAdapter = _streamAdapter;
        this._mockConfig = _mockConfig;
        if (_mockConfig.elements) {
            this._elements = _mockConfig.elements;
        }
        else {
            this._elements = _streamAdapter.adapt(xstream_1.default.empty(), xstream_adapter_1.default.streamSubscribe);
        }
    }
    MockedDOMSource.prototype.elements = function () {
        var out = this._elements;
        out._isCycleSource = 'MockedDOM';
        return out;
    };
    MockedDOMSource.prototype.events = function (eventType, options) {
        var mockConfig = this._mockConfig;
        var keys = Object.keys(mockConfig);
        var keysLen = keys.length;
        for (var i = 0; i < keysLen; i++) {
            var key = keys[i];
            if (key === eventType) {
                var out_1 = mockConfig[key];
                out_1._isCycleSource = 'MockedDOM';
                return out_1;
            }
        }
        var out = this._streamAdapter.adapt(xstream_1.default.empty(), xstream_adapter_1.default.streamSubscribe);
        out._isCycleSource = 'MockedDOM';
        return out;
    };
    MockedDOMSource.prototype.select = function (selector) {
        var mockConfig = this._mockConfig;
        var keys = Object.keys(mockConfig);
        var keysLen = keys.length;
        for (var i = 0; i < keysLen; i++) {
            var key = keys[i];
            if (key === selector) {
                return new MockedDOMSource(this._streamAdapter, mockConfig[key]);
            }
        }
        return new MockedDOMSource(this._streamAdapter, {});
    };
    MockedDOMSource.prototype.isolateSource = function (source, scope) {
        return source.select('.' + SCOPE_PREFIX + scope);
    };
    MockedDOMSource.prototype.isolateSink = function (sink, scope) {
        return sink.map(function (vnode) {
            if (vnode.sel && vnode.sel.indexOf(SCOPE_PREFIX + scope) !== -1) {
                return vnode;
            }
            else {
                vnode.sel += "." + SCOPE_PREFIX + scope;
                return vnode;
            }
        });
    };
    return MockedDOMSource;
}());
exports.MockedDOMSource = MockedDOMSource;
function mockDOMSource(streamAdapter, mockConfig) {
    return new MockedDOMSource(streamAdapter, mockConfig);
}
exports.mockDOMSource = mockDOMSource;
//# sourceMappingURL=mockDOMSource.js.map

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ClassModule = __webpack_require__(161);
exports.ClassModule = ClassModule;
var PropsModule = __webpack_require__(164);
exports.PropsModule = PropsModule;
var AttrsModule = __webpack_require__(160);
exports.AttrsModule = AttrsModule;
var EventsModule = __webpack_require__(162);
exports.EventsModule = EventsModule;
var StyleModule = __webpack_require__(165);
exports.StyleModule = StyleModule;
var HeroModule = __webpack_require__(163);
exports.HeroModule = HeroModule;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = [StyleModule, ClassModule, PropsModule, AttrsModule];
//# sourceMappingURL=modules.js.map

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var clickEvent = 'undefined' !== typeof document && document.ontouchstart ?
    'touchstart' : 'click';
function which(ev) {
    if (typeof window === 'undefined') {
        return false;
    }
    var e = ev || window.event;
    return e.which === null ? e.button : e.which;
}
function sameOrigin(href) {
    if (typeof window === 'undefined') {
        return false;
    }
    return href && href.indexOf(window.location.origin) === 0;
}
function makeClickListener(push) {
    return function clickListener(event) {
        if (which(event) !== 1) {
            return;
        }
        if (event.metaKey || event.ctrlKey || event.shiftKey) {
            return;
        }
        if (event.defaultPrevented) {
            return;
        }
        var element = event.target;
        while (element && element.nodeName !== 'A') {
            element = element.parentNode;
        }
        if (!element || element.nodeName !== 'A') {
            return;
        }
        if (element.hasAttribute('download') ||
            element.getAttribute('rel') === 'external') {
            return;
        }
        if (element.target) {
            return;
        }
        var link = element.getAttribute('href');
        if (link && link.indexOf('mailto:') > -1 || link.charAt(0) === '#') {
            return;
        }
        if (!sameOrigin(element.href)) {
            return;
        }
        event.preventDefault();
        var pathname = element.pathname, search = element.search, _a = element.hash, hash = _a === void 0 ? '' : _a;
        push(pathname + search + hash);
    };
}
function captureClicks(push) {
    var listener = makeClickListener(push);
    if (typeof window !== 'undefined') {
        document.addEventListener(clickEvent, listener, false);
    }
}
exports.captureClicks = captureClicks;
//# sourceMappingURL=captureClicks.js.map

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var captureClicks_1 = __webpack_require__(80);
function makeUpdateHistory(history) {
    return function updateHistory(location) {
        if (typeof location === 'string') {
            history.push(history.createLocation(location));
        }
        else if (typeof location === 'object') {
            // suport things like history.replace()
            var _a = location.type, type = _a === void 0 ? 'push' : _a;
            if (type === 'go') {
                history[type](location);
            }
            else {
                history[type](location);
            }
        }
        else {
            throw new Error('History Driver input must be a string or an ' +
                'object but received ${typeof url}');
        }
    };
}
function defaultOnErrorFn(err) {
    if (console && console.error !== void 0) {
        console.error(err);
    }
}
function makeHistoryDriver(history, options) {
    if (!history || typeof history !== 'object'
        || typeof history.createLocation !== 'function'
        || typeof history.createHref !== 'function'
        || typeof history.listen !== 'function'
        || typeof history.push !== 'function') {
        throw new TypeError('makeHistoryDriver requires an valid history object ' +
            'containing createLocation(), createHref(), push(), and listen() methods');
    }
    var capture = options && options.capture || false;
    var onError = options && options.onError || defaultOnErrorFn;
    return function historyDriver(sink$, runSA) {
        var _a = runSA.makeSubject(), observer = _a.observer, stream = _a.stream;
        var history$ = runSA.remember(stream
            .startWith(history.getCurrentLocation())
            .filter(Boolean));
        var unlisten = history.listen(function (location) {
            observer.next(location);
        });
        if (typeof history.addCompleteCallback === 'function'
            && typeof history.complete === 'function') {
            history.addCompleteCallback(function () {
                observer.complete();
            });
        }
        runSA.streamSubscribe(sink$, {
            next: makeUpdateHistory(history),
            error: onError,
            complete: function () {
                unlisten();
                observer.complete();
            },
        });
        if (capture) {
            captureClicks_1.captureClicks(function (pathname) {
                var location = history.createLocation(pathname);
                history.push(location);
            });
        }
        history$.createHref = function (href) { return history.createHref(href); };
        history$.createLocation = function (location) { return history.createLocation(location); };
        return history$;
    };
}
exports.makeHistoryDriver = makeHistoryDriver;
//# sourceMappingURL=makeHistoryDriver.js.map

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var util_1 = __webpack_require__(41);
var ServerHistory = (function () {
    function ServerHistory(currentLocation) {
        this.currentLocation = currentLocation;
        this.listeners = [];
    }
    ServerHistory.prototype.listen = function (listener) {
        this.listeners.push(listener);
        return function noop() { return void 0; };
    };
    ServerHistory.prototype.push = function (location) {
        var length = this.listeners.length;
        if (length === 0) {
            throw new Error('Must be given at least one listener before pushing');
        }
        for (var i = 0; i < length; ++i) {
            this.listeners[i](util_1.createLocation(location));
        }
    };
    ServerHistory.prototype.replace = function (location) {
        this.push(location);
    };
    ServerHistory.prototype.createHref = function (path) {
        return path;
    };
    ServerHistory.prototype.createLocation = function (location) {
        return util_1.createLocation(location);
    };
    ServerHistory.prototype.getCurrentLocation = function () {
        return this.currentLocation;
    };
    ServerHistory.prototype.addCompleteCallback = function (complete) {
        this._completeCallback = complete;
    };
    ServerHistory.prototype.complete = function () {
        this._completeCallback();
    };
    return ServerHistory;
}());
function createServerHistory(loc) {
    return new ServerHistory(loc ? util_1.createLocation(loc) : null);
}
exports.createServerHistory = createServerHistory;
//# sourceMappingURL=serverHistory.js.map

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var base_1 = __webpack_require__(84);
var xstream_adapter_1 = __webpack_require__(6);
/**
 * Takes a `main` function and circularly connects it to the given collection
 * of driver functions.
 *
 * **Example:**
 * ```js
 * import {run} from '@cycle/xstream-run';
 * const dispose = run(main, drivers);
 * // ...
 * dispose();
 * ```
 *
 * The `main` function expects a collection of "source" streams (returned from
 * drivers) as input, and should return a collection of "sink" streams (to be
 * given to drivers). A "collection of streams" is a JavaScript object where
 * keys match the driver names registered by the `drivers` object, and values
 * are the streams. Refer to the documentation of each driver to see more
 * details on what types of sources it outputs and sinks it receives.
 *
 * @param {Function} main a function that takes `sources` as input and outputs
 * `sinks`.
 * @param {Object} drivers an object where keys are driver names and values
 * are driver functions.
 * @return {Function} a dispose function, used to terminate the execution of the
 * Cycle.js program, cleaning up resources used.
 * @function run
 */
function run(main, drivers) {
    var _a = base_1.default(main, drivers, { streamAdapter: xstream_adapter_1.default }), run = _a.run, sinks = _a.sinks;
    if (typeof window !== 'undefined' && window['CyclejsDevTool_startGraphSerializer']) {
        window['CyclejsDevTool_startGraphSerializer'](sinks);
    }
    return run();
}
exports.run = run;
/**
 * A function that prepares the Cycle application to be executed. Takes a `main`
 * function and prepares to circularly connects it to the given collection of
 * driver functions. As an output, `Cycle()` returns an object with three
 * properties: `sources`, `sinks` and `run`. Only when `run()` is called will
 * the application actually execute. Refer to the documentation of `run()` for
 * more details.
 *
 * **Example:**
 * ```js
 * import Cycle from '@cycle/xstream-run';
 * const {sources, sinks, run} = Cycle(main, drivers);
 * // ...
 * const dispose = run(); // Executes the application
 * // ...
 * dispose();
 * ```
 *
 * @param {Function} main a function that takes `sources` as input and outputs
 * `sinks`.
 * @param {Object} drivers an object where keys are driver names and values
 * are driver functions.
 * @return {Object} an object with three properties: `sources`, `sinks` and
 * `run`. `sources` is the collection of driver sources, `sinks` is the
 * collection of driver sinks, these can be used for debugging or testing. `run`
 * is the function that once called will execute the application.
 * @function Cycle
 */
var Cycle = function (main, drivers) {
    var out = base_1.default(main, drivers, { streamAdapter: xstream_adapter_1.default });
    if (typeof window !== 'undefined' && window['CyclejsDevTool_startGraphSerializer']) {
        window['CyclejsDevTool_startGraphSerializer'](out.sinks);
    }
    return out;
};
Cycle.run = run;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Cycle;
//# sourceMappingURL=index.js.map

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function logToConsoleError(err) {
    var target = err.stack || err;
    if (console && console.error) {
        console.error(target);
    }
    else if (console && console.log) {
        console.log(target);
    }
}
function makeSinkProxies(drivers, streamAdapter) {
    var sinkProxies = {};
    for (var name_1 in drivers) {
        if (drivers.hasOwnProperty(name_1)) {
            var subject = streamAdapter.makeSubject();
            var driverStreamAdapter = drivers[name_1].streamAdapter || streamAdapter;
            var stream = driverStreamAdapter.adapt(subject.stream, streamAdapter.streamSubscribe);
            sinkProxies[name_1] = {
                stream: stream,
                observer: subject.observer,
            };
        }
    }
    return sinkProxies;
}
function callDrivers(drivers, sinkProxies, streamAdapter) {
    var sources = {};
    for (var name_2 in drivers) {
        if (drivers.hasOwnProperty(name_2)) {
            var driverOutput = drivers[name_2](sinkProxies[name_2].stream, streamAdapter, name_2);
            var driverStreamAdapter = drivers[name_2].streamAdapter;
            if (driverStreamAdapter && driverStreamAdapter.isValidStream(driverOutput)) {
                sources[name_2] = streamAdapter.adapt(driverOutput, driverStreamAdapter.streamSubscribe);
            }
            else {
                sources[name_2] = driverOutput;
            }
            if (sources[name_2] && typeof sources[name_2] === 'object') {
                sources[name_2]._isCycleSource = name_2;
            }
        }
    }
    return sources;
}
function replicateMany(sinks, sinkProxies, streamAdapter) {
    var sinkNames = Object.keys(sinks).filter(function (name) { return !!sinkProxies[name]; });
    var buffers = {};
    var replicators = {};
    sinkNames.forEach(function (name) {
        buffers[name] = { next: [], error: [], complete: [] };
        replicators[name] = {
            next: function (x) { return buffers[name].next.push(x); },
            error: function (x) { return buffers[name].error.push(x); },
            complete: function (x) { return buffers[name].complete.push(x); },
        };
    });
    var subscriptions = sinkNames.map(function (name) {
        return streamAdapter.streamSubscribe(sinks[name], {
            next: function (x) {
                replicators[name].next(x);
            },
            error: function (err) {
                logToConsoleError(err);
                replicators[name].error(err);
            },
            complete: function (x) {
                replicators[name].complete(x);
            },
        });
    });
    var disposeFunctions = subscriptions
        .filter(function (fn) { return typeof fn === 'function'; });
    sinkNames.forEach(function (name) {
        var observer = sinkProxies[name].observer;
        var next = observer.next;
        var error = observer.error;
        var complete = observer.complete;
        buffers[name].next.forEach(next);
        buffers[name].error.forEach(error);
        buffers[name].complete.forEach(complete);
        replicators[name].next = next;
        replicators[name].error = error;
        replicators[name].complete = complete;
    });
    return function () {
        disposeFunctions.forEach(function (dispose) { return dispose(); });
    };
}
function disposeSources(sources) {
    for (var k in sources) {
        if (sources.hasOwnProperty(k) && sources[k]
            && typeof sources[k].dispose === 'function') {
            sources[k].dispose();
        }
    }
}
var isObjectEmpty = function (obj) { return Object.keys(obj).length === 0; };
function Cycle(main, drivers, options) {
    if (typeof main !== "function") {
        throw new Error("First argument given to Cycle must be the 'main' " +
            "function.");
    }
    if (typeof drivers !== "object" || drivers === null) {
        throw new Error("Second argument given to Cycle must be an object " +
            "with driver functions as properties.");
    }
    if (isObjectEmpty(drivers)) {
        throw new Error("Second argument given to Cycle must be an object " +
            "with at least one driver function declared as a property.");
    }
    var streamAdapter = options.streamAdapter;
    if (!streamAdapter || isObjectEmpty(streamAdapter)) {
        throw new Error("Third argument given to Cycle must be an options object " +
            "with the streamAdapter key supplied with a valid stream adapter.");
    }
    var sinkProxies = makeSinkProxies(drivers, streamAdapter);
    var sources = callDrivers(drivers, sinkProxies, streamAdapter);
    var sinks = main(sources);
    if (typeof window !== 'undefined') {
        window.Cyclejs = { sinks: sinks };
    }
    var run = function () {
        var disposeReplication = replicateMany(sinks, sinkProxies, streamAdapter);
        return function () {
            disposeSources(sources);
            disposeReplication();
        };
    };
    return { sinks: sinks, sources: sources, run: run };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Cycle;
//# sourceMappingURL=index.js.map

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var util = __webpack_require__(88);
function isStrictlyInScope(namespace, path) {
    var pathParts = util.splitPath(path);
    return namespace.every(function (v, i) {
        return pathParts[i] === v;
    });
}
function getFilteredPath(namespace, path) {
    var pathParts = util.splitPath(path);
    return '/' + util.filterPath(pathParts, namespace);
}
var RouterSource = (function () {
    function RouterSource(history$, _namespace, _createHref, _runSA, _routeMatcher) {
        this.history$ = history$;
        this._namespace = _namespace;
        this._createHref = _createHref;
        this._runSA = _runSA;
        this._routeMatcher = _routeMatcher;
    }
    RouterSource.prototype.path = function (pathname) {
        var scopedNamespace = this._namespace.concat(util.splitPath(pathname));
        var scopedHistory$ = this._runSA.remember(this.history$
            .filter(function (_a) {
            var _path = _a.pathname;
            return isStrictlyInScope(scopedNamespace, _path);
        }));
        var createHref = this._createHref;
        return new RouterSource(scopedHistory$, scopedNamespace, createHref, this._runSA, this._routeMatcher);
    };
    RouterSource.prototype.define = function (routes, routeMatcher) {
        var _this = this;
        var namespace = this._namespace;
        var _createHref = this._createHref;
        var createHref = util.makeCreateHref(namespace, _createHref);
        var match$ = this._runSA.remember(this.history$
            .map(function (location) {
            var matcher = routeMatcher || _this._routeMatcher;
            var filteredPath = getFilteredPath(namespace, location.pathname);
            var _a = matcher(filteredPath, routes), path = _a.path, value = _a.value;
            return { path: path, value: value, location: location, createHref: createHref };
        }));
        match$.createHref = createHref;
        return match$;
    };
    RouterSource.prototype.createHref = function (path) {
        return util.makeCreateHref(this._namespace, this._createHref)(path);
    };
    return RouterSource;
}());
exports.RouterSource = RouterSource;
//# sourceMappingURL=RouterSource.js.map

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var makeRouterDriver_1 = __webpack_require__(87);
exports.makeRouterDriver = makeRouterDriver_1.makeRouterDriver;
var history_1 = __webpack_require__(40);
exports.supportsHistory = history_1.supportsHistory;
exports.createLocation = history_1.createLocation;
exports.createServerHistory = history_1.createServerHistory;
//# sourceMappingURL=index.js.map

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var history_1 = __webpack_require__(40);
var RouterSource_1 = __webpack_require__(85);
/**
 * Instantiates an new router driver function using the same arguments required
 * by @cycle/history.
 * @public
 * @method makeRouterDriver
 * @return {routerDriver} The router driver function
 */
function makeRouterDriver(history, routeMatcher, options) {
    var historyDriver = history_1.makeHistoryDriver(history, options);
    /**
     * The actual router driver.
     * @public
     * @typedef {routerDriver}
     * @name routerDriver
     * @method routerDriver
     * @param  {Stream<string|Location>} sink$ - This is the same input that the
     * history driver would expect.
     * @return {routerAPI}
     */
    return function routerDriver(sink$, runSA) {
        var history$ = runSA.remember(historyDriver(sink$, runSA));
        return new RouterSource_1.RouterSource(history$, [], history.createHref, runSA, routeMatcher);
    };
}
exports.makeRouterDriver = makeRouterDriver;
//# sourceMappingURL=makeRouterDriver.js.map

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function splitPath(path) {
    return path.split('/').filter(function (p) { return p.length > 0; });
}
exports.splitPath = splitPath;
function filterPath(pathParts, namespace) {
    return pathParts.filter(function (part) { return namespace.indexOf(part) < 0; }).join('/');
}
exports.filterPath = filterPath;
var startsWith = function (param, value) { return param[0] === value; };
var startsWith2 = function (param, value1, value2) {
    return param[0] === value1 && param[1] === value2;
};
function makeCreateHref(namespace, _createHref) {
    /**
     * Function used to create HREFs that are properly namespaced
     * @typedef {createHref}
     * @name createHref
     * @method createHref
     * @param  {string} path - the HREF that will be appended to the current
     * namespace
     * @return {string} a fully qualified HREF composed from the current
     * namespace and the path provided
     */
    return function createHref(path) {
        var fullPath = "" + namespace.join('/') + path;
        return startsWith(fullPath, '/') || startsWith2(fullPath, '#', '/')
            ? _createHref(fullPath)
            : _createHref('/' + fullPath);
    };
}
exports.makeCreateHref = makeCreateHref;
//# sourceMappingURL=util.js.map

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var copy       = __webpack_require__(99)
  , map        = __webpack_require__(107)
  , callable   = __webpack_require__(11)
  , validValue = __webpack_require__(7)

  , bind = Function.prototype.bind, defineProperty = Object.defineProperty
  , hasOwnProperty = Object.prototype.hasOwnProperty
  , define;

define = function (name, desc, bindTo) {
	var value = validValue(desc) && callable(desc.value), dgs;
	dgs = copy(desc);
	delete dgs.writable;
	delete dgs.value;
	dgs.get = function () {
		if (hasOwnProperty.call(this, name)) return value;
		desc.value = bind.call(value, (bindTo == null) ? this : this[bindTo]);
		defineProperty(this, name, desc);
		return this[name];
	};
	return dgs;
};

module.exports = function (props/*, bindTo*/) {
	var bindTo = arguments[1];
	return map(props, function (desc, name) {
		return define(name, desc, bindTo);
	});
};


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toPosInt = __webpack_require__(95)
  , value    = __webpack_require__(7)

  , indexOf = Array.prototype.indexOf
  , hasOwnProperty = Object.prototype.hasOwnProperty
  , abs = Math.abs, floor = Math.floor;

module.exports = function (searchElement/*, fromIndex*/) {
	var i, l, fromIndex, val;
	if (searchElement === searchElement) { //jslint: ignore
		return indexOf.apply(this, arguments);
	}

	l = toPosInt(value(this).length);
	fromIndex = arguments[1];
	if (isNaN(fromIndex)) fromIndex = 0;
	else if (fromIndex >= 0) fromIndex = floor(fromIndex);
	else fromIndex = toPosInt(this.length) - floor(abs(fromIndex));

	for (i = fromIndex; i < l; ++i) {
		if (hasOwnProperty.call(this, i)) {
			val = this[i];
			if (val !== val) return i; //jslint: ignore
		}
	}
	return -1;
};


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(92)()
	? Math.sign
	: __webpack_require__(93);


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
	var sign = Math.sign;
	if (typeof sign !== 'function') return false;
	return ((sign(10) === 1) && (sign(-20) === -1));
};


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (value) {
	value = Number(value);
	if (isNaN(value) || (value === 0)) return value;
	return (value > 0) ? 1 : -1;
};


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var sign = __webpack_require__(91)

  , abs = Math.abs, floor = Math.floor;

module.exports = function (value) {
	if (isNaN(value)) return 0;
	value = Number(value);
	if ((value === 0) || !isFinite(value)) return value;
	return sign(value) * floor(abs(value));
};


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toInteger = __webpack_require__(94)

  , max = Math.max;

module.exports = function (value) { return max(0, toInteger(value)); };


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Internal method, used by iteration functions.
// Calls a function for each key-value pair found in object
// Optionally takes compareFn to iterate object in specific order



var callable = __webpack_require__(11)
  , value    = __webpack_require__(7)

  , bind = Function.prototype.bind, call = Function.prototype.call, keys = Object.keys
  , propertyIsEnumerable = Object.prototype.propertyIsEnumerable;

module.exports = function (method, defVal) {
	return function (obj, cb/*, thisArg, compareFn*/) {
		var list, thisArg = arguments[2], compareFn = arguments[3];
		obj = Object(value(obj));
		callable(cb);

		list = keys(obj);
		if (compareFn) {
			list.sort((typeof compareFn === 'function') ? bind.call(compareFn, obj) : undefined);
		}
		if (typeof method !== 'function') method = list[method];
		return call.call(method, list, function (key, index) {
			if (!propertyIsEnumerable.call(obj, key)) return defVal;
			return call.call(cb, thisArg, obj[key], key, obj, index);
		});
	};
};


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
	var assign = Object.assign, obj;
	if (typeof assign !== 'function') return false;
	obj = { foo: 'raz' };
	assign(obj, { bar: 'dwa' }, { trzy: 'trzy' });
	return (obj.foo + obj.bar + obj.trzy) === 'razdwatrzy';
};


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var keys  = __webpack_require__(104)
  , value = __webpack_require__(7)

  , max = Math.max;

module.exports = function (dest, src/*, …srcn*/) {
	var error, i, l = max(arguments.length, 2), assign;
	dest = Object(value(dest));
	assign = function (key) {
		try { dest[key] = src[key]; } catch (e) {
			if (!error) error = e;
		}
	};
	for (i = 1; i < l; ++i) {
		src = arguments[i];
		keys(src).forEach(assign);
	}
	if (error !== undefined) throw error;
	return dest;
};


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assign = __webpack_require__(26)
  , value  = __webpack_require__(7);

module.exports = function (obj) {
	var copy = Object(value(obj));
	if (copy !== obj) return copy;
	return assign({}, obj);
};


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Workaround for http://code.google.com/p/v8/issues/detail?id=2804



var create = Object.create, shim;

if (!__webpack_require__(44)()) {
	shim = __webpack_require__(45);
}

module.exports = (function () {
	var nullObject, props, desc;
	if (!shim) return create;
	if (shim.level !== 1) return create;

	nullObject = {};
	props = {};
	desc = { configurable: false, enumerable: false, writable: true,
		value: undefined };
	Object.getOwnPropertyNames(Object.prototype).forEach(function (name) {
		if (name === '__proto__') {
			props[name] = { configurable: true, enumerable: false, writable: true,
				value: undefined };
			return;
		}
		props[name] = desc;
	});
	Object.defineProperties(nullObject, props);

	Object.defineProperty(shim, 'nullPolyfill', { configurable: false,
		enumerable: false, writable: false, value: nullObject });

	return function (prototype, props) {
		return create((prototype === null) ? nullObject : prototype, props);
	};
}());


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(96)('forEach');


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Deprecated



module.exports = function (obj) { return typeof obj === 'function'; };


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var map = { function: true, object: true };

module.exports = function (x) {
	return ((x != null) && map[typeof x]) || false;
};


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(105)()
	? Object.keys
	: __webpack_require__(106);


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
	try {
		Object.keys('primitive');
		return true;
	} catch (e) { return false; }
};


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var keys = Object.keys;

module.exports = function (object) {
	return keys(object == null ? object : Object(object));
};


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var callable = __webpack_require__(11)
  , forEach  = __webpack_require__(101)

  , call = Function.prototype.call;

module.exports = function (obj, cb/*, thisArg*/) {
	var o = {}, thisArg = arguments[2];
	callable(cb);
	forEach(obj, function (value, key, obj, index) {
		o[key] = call.call(cb, thisArg, value, key, obj, index);
	});
	return o;
};


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var forEach = Array.prototype.forEach, create = Object.create;

var process = function (src, obj) {
	var key;
	for (key in src) obj[key] = src[key];
};

module.exports = function (options/*, …options*/) {
	var result = create(null);
	forEach.call(arguments, function (options) {
		if (options == null) return;
		process(Object(options), result);
	});
	return result;
};


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var forEach = Array.prototype.forEach, create = Object.create;

module.exports = function (arg/*, …args*/) {
	var set = create(null);
	forEach.call(arguments, function (name) { set[name] = true; });
	return set;
};


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var str = 'razdwatrzy';

module.exports = function () {
	if (typeof str.contains !== 'function') return false;
	return ((str.contains('dwa') === true) && (str.contains('foo') === false));
};


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var indexOf = String.prototype.indexOf;

module.exports = function (searchString/*, position*/) {
	return indexOf.call(this, searchString, arguments[1]) > -1;
};


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var setPrototypeOf = __webpack_require__(19)
  , contains       = __webpack_require__(46)
  , d              = __webpack_require__(10)
  , Iterator       = __webpack_require__(28)

  , defineProperty = Object.defineProperty
  , ArrayIterator;

ArrayIterator = module.exports = function (arr, kind) {
	if (!(this instanceof ArrayIterator)) return new ArrayIterator(arr, kind);
	Iterator.call(this, arr);
	if (!kind) kind = 'value';
	else if (contains.call(kind, 'key+value')) kind = 'key+value';
	else if (contains.call(kind, 'key')) kind = 'key';
	else kind = 'value';
	defineProperty(this, '__kind__', d('', kind));
};
if (setPrototypeOf) setPrototypeOf(ArrayIterator, Iterator);

ArrayIterator.prototype = Object.create(Iterator.prototype, {
	constructor: d(ArrayIterator),
	_resolve: d(function (i) {
		if (this.__kind__ === 'value') return this.__list__[i];
		if (this.__kind__ === 'key+value') return [i, this.__list__[i]];
		return i;
	}),
	toString: d(function () { return '[object Array Iterator]'; })
});


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isArguments = __webpack_require__(25)
  , callable    = __webpack_require__(11)
  , isString    = __webpack_require__(27)
  , get         = __webpack_require__(114)

  , isArray = Array.isArray, call = Function.prototype.call
  , some = Array.prototype.some;

module.exports = function (iterable, cb/*, thisArg*/) {
	var mode, thisArg = arguments[2], result, doBreak, broken, i, l, char, code;
	if (isArray(iterable) || isArguments(iterable)) mode = 'array';
	else if (isString(iterable)) mode = 'string';
	else iterable = get(iterable);

	callable(cb);
	doBreak = function () { broken = true; };
	if (mode === 'array') {
		some.call(iterable, function (value) {
			call.call(cb, thisArg, value, doBreak);
			if (broken) return true;
		});
		return;
	}
	if (mode === 'string') {
		l = iterable.length;
		for (i = 0; i < l; ++i) {
			char = iterable[i];
			if ((i + 1) < l) {
				code = char.charCodeAt(0);
				if ((code >= 0xD800) && (code <= 0xDBFF)) char += iterable[++i];
			}
			call.call(cb, thisArg, char, doBreak);
			if (broken) break;
		}
		return;
	}
	result = iterable.next();

	while (!result.done) {
		call.call(cb, thisArg, result.value, doBreak);
		if (broken) return;
		result = iterable.next();
	}
};


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isArguments    = __webpack_require__(25)
  , isString       = __webpack_require__(27)
  , ArrayIterator  = __webpack_require__(112)
  , StringIterator = __webpack_require__(116)
  , iterable       = __webpack_require__(47)
  , iteratorSymbol = __webpack_require__(16).iterator;

module.exports = function (obj) {
	if (typeof iterable(obj)[iteratorSymbol] === 'function') return obj[iteratorSymbol]();
	if (isArguments(obj)) return new ArrayIterator(obj);
	if (isString(obj)) return new StringIterator(obj);
	return new ArrayIterator(obj);
};


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isArguments    = __webpack_require__(25)
  , isString       = __webpack_require__(27)
  , iteratorSymbol = __webpack_require__(16).iterator

  , isArray = Array.isArray;

module.exports = function (value) {
	if (value == null) return false;
	if (isArray(value)) return true;
	if (isString(value)) return true;
	if (isArguments(value)) return true;
	return (typeof value[iteratorSymbol] === 'function');
};


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Thanks @mathiasbynens
// http://mathiasbynens.be/notes/javascript-unicode#iterating-over-symbols



var setPrototypeOf = __webpack_require__(19)
  , d              = __webpack_require__(10)
  , Iterator       = __webpack_require__(28)

  , defineProperty = Object.defineProperty
  , StringIterator;

StringIterator = module.exports = function (str) {
	if (!(this instanceof StringIterator)) return new StringIterator(str);
	str = String(str);
	Iterator.call(this, str);
	defineProperty(this, '__length__', d('', str.length));

};
if (setPrototypeOf) setPrototypeOf(StringIterator, Iterator);

StringIterator.prototype = Object.create(Iterator.prototype, {
	constructor: d(StringIterator),
	_next: d(function () {
		if (!this.__list__) return;
		if (this.__nextIndex__ < this.__length__) return this.__nextIndex__++;
		this._unBind();
	}),
	_resolve: d(function (i) {
		var char = this.__list__[i], code;
		if (this.__nextIndex__ === this.__length__) return char;
		code = char.charCodeAt(0);
		if ((code >= 0xD800) && (code <= 0xDBFF)) return char + this.__list__[this.__nextIndex__++];
		return char;
	}),
	toString: d(function () { return '[object String Iterator]'; })
});


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
	var map, iterator, result;
	if (typeof Map !== 'function') return false;
	try {
		// WebKit doesn't support arguments and crashes
		map = new Map([['raz', 'one'], ['dwa', 'two'], ['trzy', 'three']]);
	} catch (e) {
		return false;
	}
	if (String(map) !== '[object Map]') return false;
	if (map.size !== 3) return false;
	if (typeof map.clear !== 'function') return false;
	if (typeof map.delete !== 'function') return false;
	if (typeof map.entries !== 'function') return false;
	if (typeof map.forEach !== 'function') return false;
	if (typeof map.get !== 'function') return false;
	if (typeof map.has !== 'function') return false;
	if (typeof map.keys !== 'function') return false;
	if (typeof map.set !== 'function') return false;
	if (typeof map.values !== 'function') return false;

	iterator = map.entries();
	result = iterator.next();
	if (result.done !== false) return false;
	if (!result.value) return false;
	if (result.value[0] !== 'raz') return false;
	if (result.value[1] !== 'one') return false;

	return true;
};


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Exports true if environment provides native `Map` implementation,
// whatever that is.



module.exports = (function () {
	if (typeof Map === 'undefined') return false;
	return (Object.prototype.toString.call(new Map()) === '[object Map]');
}());


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(109)('key',
	'value', 'key+value');


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var setPrototypeOf    = __webpack_require__(19)
  , d                 = __webpack_require__(10)
  , Iterator          = __webpack_require__(28)
  , toStringTagSymbol = __webpack_require__(16).toStringTag
  , kinds             = __webpack_require__(119)

  , defineProperties = Object.defineProperties
  , unBind = Iterator.prototype._unBind
  , MapIterator;

MapIterator = module.exports = function (map, kind) {
	if (!(this instanceof MapIterator)) return new MapIterator(map, kind);
	Iterator.call(this, map.__mapKeysData__, map);
	if (!kind || !kinds[kind]) kind = 'key+value';
	defineProperties(this, {
		__kind__: d('', kind),
		__values__: d('w', map.__mapValuesData__)
	});
};
if (setPrototypeOf) setPrototypeOf(MapIterator, Iterator);

MapIterator.prototype = Object.create(Iterator.prototype, {
	constructor: d(MapIterator),
	_resolve: d(function (i) {
		if (this.__kind__ === 'value') return this.__values__[i];
		if (this.__kind__ === 'key') return this.__list__[i];
		return [this.__list__[i], this.__values__[i]];
	}),
	_unBind: d(function () {
		this.__values__ = null;
		unBind.call(this);
	}),
	toString: d(function () { return '[object Map Iterator]'; })
});
Object.defineProperty(MapIterator.prototype, toStringTagSymbol,
	d('c', 'Map Iterator'));


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var clear          = __webpack_require__(43)
  , eIndexOf       = __webpack_require__(90)
  , setPrototypeOf = __webpack_require__(19)
  , callable       = __webpack_require__(11)
  , validValue     = __webpack_require__(7)
  , d              = __webpack_require__(10)
  , ee             = __webpack_require__(126)
  , Symbol         = __webpack_require__(16)
  , iterator       = __webpack_require__(47)
  , forOf          = __webpack_require__(113)
  , Iterator       = __webpack_require__(120)
  , isNative       = __webpack_require__(118)

  , call = Function.prototype.call
  , defineProperties = Object.defineProperties, getPrototypeOf = Object.getPrototypeOf
  , MapPoly;

module.exports = MapPoly = function (/*iterable*/) {
	var iterable = arguments[0], keys, values, self;
	if (!(this instanceof MapPoly)) throw new TypeError('Constructor requires \'new\'');
	if (isNative && setPrototypeOf && (Map !== MapPoly)) {
		self = setPrototypeOf(new Map(), getPrototypeOf(this));
	} else {
		self = this;
	}
	if (iterable != null) iterator(iterable);
	defineProperties(self, {
		__mapKeysData__: d('c', keys = []),
		__mapValuesData__: d('c', values = [])
	});
	if (!iterable) return self;
	forOf(iterable, function (value) {
		var key = validValue(value)[0];
		value = value[1];
		if (eIndexOf.call(keys, key) !== -1) return;
		keys.push(key);
		values.push(value);
	}, self);
	return self;
};

if (isNative) {
	if (setPrototypeOf) setPrototypeOf(MapPoly, Map);
	MapPoly.prototype = Object.create(Map.prototype, {
		constructor: d(MapPoly)
	});
}

ee(defineProperties(MapPoly.prototype, {
	clear: d(function () {
		if (!this.__mapKeysData__.length) return;
		clear.call(this.__mapKeysData__);
		clear.call(this.__mapValuesData__);
		this.emit('_clear');
	}),
	delete: d(function (key) {
		var index = eIndexOf.call(this.__mapKeysData__, key);
		if (index === -1) return false;
		this.__mapKeysData__.splice(index, 1);
		this.__mapValuesData__.splice(index, 1);
		this.emit('_delete', index, key);
		return true;
	}),
	entries: d(function () { return new Iterator(this, 'key+value'); }),
	forEach: d(function (cb/*, thisArg*/) {
		var thisArg = arguments[1], iterator, result;
		callable(cb);
		iterator = this.entries();
		result = iterator._next();
		while (result !== undefined) {
			call.call(cb, thisArg, this.__mapValuesData__[result],
				this.__mapKeysData__[result], this);
			result = iterator._next();
		}
	}),
	get: d(function (key) {
		var index = eIndexOf.call(this.__mapKeysData__, key);
		if (index === -1) return;
		return this.__mapValuesData__[index];
	}),
	has: d(function (key) {
		return (eIndexOf.call(this.__mapKeysData__, key) !== -1);
	}),
	keys: d(function () { return new Iterator(this, 'key'); }),
	set: d(function (key, value) {
		var index = eIndexOf.call(this.__mapKeysData__, key), emit;
		if (index === -1) {
			index = this.__mapKeysData__.push(key) - 1;
			emit = true;
		}
		this.__mapValuesData__[index] = value;
		if (emit) this.emit('_add', index, key);
		return this;
	}),
	size: d.gs(function () { return this.__mapKeysData__.length; }),
	values: d(function () { return new Iterator(this, 'value'); }),
	toString: d(function () { return '[object Map]'; })
}));
Object.defineProperty(MapPoly.prototype, Symbol.iterator, d(function () {
	return this.entries();
}));
Object.defineProperty(MapPoly.prototype, Symbol.toStringTag, d('c', 'Map'));


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var validTypes = { object: true, symbol: true };

module.exports = function () {
	var symbol;
	if (typeof Symbol !== 'function') return false;
	symbol = Symbol('test symbol');
	try { String(symbol); } catch (e) { return false; }

	// Return 'true' also for polyfills
	if (!validTypes[typeof Symbol.iterator]) return false;
	if (!validTypes[typeof Symbol.toPrimitive]) return false;
	if (!validTypes[typeof Symbol.toStringTag]) return false;

	return true;
};


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (x) {
	if (!x) return false;
	if (typeof x === 'symbol') return true;
	if (!x.constructor) return false;
	if (x.constructor.name !== 'Symbol') return false;
	return (x[x.constructor.toStringTag] === 'Symbol');
};


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// ES2015 Symbol polyfill for environments that do not support it (or partially support it)



var d              = __webpack_require__(10)
  , validateSymbol = __webpack_require__(125)

  , create = Object.create, defineProperties = Object.defineProperties
  , defineProperty = Object.defineProperty, objPrototype = Object.prototype
  , NativeSymbol, SymbolPolyfill, HiddenSymbol, globalSymbols = create(null)
  , isNativeSafe;

if (typeof Symbol === 'function') {
	NativeSymbol = Symbol;
	try {
		String(NativeSymbol());
		isNativeSafe = true;
	} catch (ignore) {}
}

var generateName = (function () {
	var created = create(null);
	return function (desc) {
		var postfix = 0, name, ie11BugWorkaround;
		while (created[desc + (postfix || '')]) ++postfix;
		desc += (postfix || '');
		created[desc] = true;
		name = '@@' + desc;
		defineProperty(objPrototype, name, d.gs(null, function (value) {
			// For IE11 issue see:
			// https://connect.microsoft.com/IE/feedbackdetail/view/1928508/
			//    ie11-broken-getters-on-dom-objects
			// https://github.com/medikoo/es6-symbol/issues/12
			if (ie11BugWorkaround) return;
			ie11BugWorkaround = true;
			defineProperty(this, name, d(value));
			ie11BugWorkaround = false;
		}));
		return name;
	};
}());

// Internal constructor (not one exposed) for creating Symbol instances.
// This one is used to ensure that `someSymbol instanceof Symbol` always return false
HiddenSymbol = function Symbol(description) {
	if (this instanceof HiddenSymbol) throw new TypeError('TypeError: Symbol is not a constructor');
	return SymbolPolyfill(description);
};

// Exposed `Symbol` constructor
// (returns instances of HiddenSymbol)
module.exports = SymbolPolyfill = function Symbol(description) {
	var symbol;
	if (this instanceof Symbol) throw new TypeError('TypeError: Symbol is not a constructor');
	if (isNativeSafe) return NativeSymbol(description);
	symbol = create(HiddenSymbol.prototype);
	description = (description === undefined ? '' : String(description));
	return defineProperties(symbol, {
		__description__: d('', description),
		__name__: d('', generateName(description))
	});
};
defineProperties(SymbolPolyfill, {
	for: d(function (key) {
		if (globalSymbols[key]) return globalSymbols[key];
		return (globalSymbols[key] = SymbolPolyfill(String(key)));
	}),
	keyFor: d(function (s) {
		var key;
		validateSymbol(s);
		for (key in globalSymbols) if (globalSymbols[key] === s) return key;
	}),

	// If there's native implementation of given symbol, let's fallback to it
	// to ensure proper interoperability with other native functions e.g. Array.from
	hasInstance: d('', (NativeSymbol && NativeSymbol.hasInstance) || SymbolPolyfill('hasInstance')),
	isConcatSpreadable: d('', (NativeSymbol && NativeSymbol.isConcatSpreadable) ||
		SymbolPolyfill('isConcatSpreadable')),
	iterator: d('', (NativeSymbol && NativeSymbol.iterator) || SymbolPolyfill('iterator')),
	match: d('', (NativeSymbol && NativeSymbol.match) || SymbolPolyfill('match')),
	replace: d('', (NativeSymbol && NativeSymbol.replace) || SymbolPolyfill('replace')),
	search: d('', (NativeSymbol && NativeSymbol.search) || SymbolPolyfill('search')),
	species: d('', (NativeSymbol && NativeSymbol.species) || SymbolPolyfill('species')),
	split: d('', (NativeSymbol && NativeSymbol.split) || SymbolPolyfill('split')),
	toPrimitive: d('', (NativeSymbol && NativeSymbol.toPrimitive) || SymbolPolyfill('toPrimitive')),
	toStringTag: d('', (NativeSymbol && NativeSymbol.toStringTag) || SymbolPolyfill('toStringTag')),
	unscopables: d('', (NativeSymbol && NativeSymbol.unscopables) || SymbolPolyfill('unscopables'))
});

// Internal tweaks for real symbol producer
defineProperties(HiddenSymbol.prototype, {
	constructor: d(SymbolPolyfill),
	toString: d('', function () { return this.__name__; })
});

// Proper implementation of methods exposed on Symbol.prototype
// They won't be accessible on produced symbol instances as they derive from HiddenSymbol.prototype
defineProperties(SymbolPolyfill.prototype, {
	toString: d(function () { return 'Symbol (' + validateSymbol(this).__description__ + ')'; }),
	valueOf: d(function () { return validateSymbol(this); })
});
defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toPrimitive, d('', function () {
	var symbol = validateSymbol(this);
	if (typeof symbol === 'symbol') return symbol;
	return symbol.toString();
}));
defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toStringTag, d('c', 'Symbol'));

// Proper implementaton of toPrimitive and toStringTag for returned symbol instances
defineProperty(HiddenSymbol.prototype, SymbolPolyfill.toStringTag,
	d('c', SymbolPolyfill.prototype[SymbolPolyfill.toStringTag]));

// Note: It's important to define `toPrimitive` as last one, as some implementations
// implement `toPrimitive` natively without implementing `toStringTag` (or other specified symbols)
// And that may invoke error in definition flow:
// See: https://github.com/medikoo/es6-symbol/issues/13#issuecomment-164146149
defineProperty(HiddenSymbol.prototype, SymbolPolyfill.toPrimitive,
	d('c', SymbolPolyfill.prototype[SymbolPolyfill.toPrimitive]));


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isSymbol = __webpack_require__(123);

module.exports = function (value) {
	if (!isSymbol(value)) throw new TypeError(value + " is not a symbol");
	return value;
};


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var d        = __webpack_require__(10)
  , callable = __webpack_require__(11)

  , apply = Function.prototype.apply, call = Function.prototype.call
  , create = Object.create, defineProperty = Object.defineProperty
  , defineProperties = Object.defineProperties
  , hasOwnProperty = Object.prototype.hasOwnProperty
  , descriptor = { configurable: true, enumerable: false, writable: true }

  , on, once, off, emit, methods, descriptors, base;

on = function (type, listener) {
	var data;

	callable(listener);

	if (!hasOwnProperty.call(this, '__ee__')) {
		data = descriptor.value = create(null);
		defineProperty(this, '__ee__', descriptor);
		descriptor.value = null;
	} else {
		data = this.__ee__;
	}
	if (!data[type]) data[type] = listener;
	else if (typeof data[type] === 'object') data[type].push(listener);
	else data[type] = [data[type], listener];

	return this;
};

once = function (type, listener) {
	var once, self;

	callable(listener);
	self = this;
	on.call(this, type, once = function () {
		off.call(self, type, once);
		apply.call(listener, this, arguments);
	});

	once.__eeOnceListener__ = listener;
	return this;
};

off = function (type, listener) {
	var data, listeners, candidate, i;

	callable(listener);

	if (!hasOwnProperty.call(this, '__ee__')) return this;
	data = this.__ee__;
	if (!data[type]) return this;
	listeners = data[type];

	if (typeof listeners === 'object') {
		for (i = 0; (candidate = listeners[i]); ++i) {
			if ((candidate === listener) ||
					(candidate.__eeOnceListener__ === listener)) {
				if (listeners.length === 2) data[type] = listeners[i ? 0 : 1];
				else listeners.splice(i, 1);
			}
		}
	} else {
		if ((listeners === listener) ||
				(listeners.__eeOnceListener__ === listener)) {
			delete data[type];
		}
	}

	return this;
};

emit = function (type) {
	var i, l, listener, listeners, args;

	if (!hasOwnProperty.call(this, '__ee__')) return;
	listeners = this.__ee__[type];
	if (!listeners) return;

	if (typeof listeners === 'object') {
		l = arguments.length;
		args = new Array(l - 1);
		for (i = 1; i < l; ++i) args[i - 1] = arguments[i];

		listeners = listeners.slice();
		for (i = 0; (listener = listeners[i]); ++i) {
			apply.call(listener, this, args);
		}
	} else {
		switch (arguments.length) {
		case 1:
			call.call(listeners, this);
			break;
		case 2:
			call.call(listeners, this, arguments[1]);
			break;
		case 3:
			call.call(listeners, this, arguments[1], arguments[2]);
			break;
		default:
			l = arguments.length;
			args = new Array(l - 1);
			for (i = 1; i < l; ++i) {
				args[i - 1] = arguments[i];
			}
			apply.call(listeners, this, args);
		}
	}
};

methods = {
	on: on,
	once: once,
	off: off,
	emit: emit
};

descriptors = {
	on: d(on),
	once: d(once),
	off: d(off),
	emit: d(emit)
};

base = defineProperties({}, descriptors);

module.exports = exports = function (o) {
	return (o == null) ? create(base) : defineProperties(Object(o), descriptors);
};
exports.methods = methods;


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var loopAsync = exports.loopAsync = function loopAsync(turns, work, callback) {
  var currentTurn = 0,
      isDone = false;
  var isSync = false,
      hasNext = false,
      doneArgs = void 0;

  var done = function done() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    isDone = true;

    if (isSync) {
      // Iterate instead of recursing if possible.
      doneArgs = args;
      return;
    }

    callback.apply(undefined, args);
  };

  var next = function next() {
    if (isDone) return;

    hasNext = true;

    if (isSync) return; // Iterate instead of recursing if possible.

    isSync = true;

    while (!isDone && currentTurn < turns && hasNext) {
      hasNext = false;
      work(currentTurn++, next, done);
    }

    isSync = false;

    if (isDone) {
      // This means the loop finished synchronously.
      callback.apply(undefined, _toConsumableArray(doneArgs));
      return;
    }

    if (currentTurn >= turns && hasNext) {
      isDone = true;
      callback();
    }
  };

  next();
};

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.replaceLocation = exports.pushLocation = exports.startListener = exports.getCurrentLocation = exports.go = exports.getUserConfirmation = undefined;

var _BrowserProtocol = __webpack_require__(29);

Object.defineProperty(exports, 'getUserConfirmation', {
  enumerable: true,
  get: function get() {
    return _BrowserProtocol.getUserConfirmation;
  }
});
Object.defineProperty(exports, 'go', {
  enumerable: true,
  get: function get() {
    return _BrowserProtocol.go;
  }
});

var _warning = __webpack_require__(14);

var _warning2 = _interopRequireDefault(_warning);

var _LocationUtils = __webpack_require__(12);

var _DOMUtils = __webpack_require__(17);

var _DOMStateStorage = __webpack_require__(49);

var _PathUtils = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HashChangeEvent = 'hashchange';

var getHashPath = function getHashPath() {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  var href = window.location.href;
  var index = href.indexOf('#');
  return index === -1 ? '' : href.substring(index + 1);
};

var pushHashPath = function pushHashPath(path) {
  return window.location.hash = path;
};

var replaceHashPath = function replaceHashPath(path) {
  var i = window.location.href.indexOf('#');

  window.location.replace(window.location.href.slice(0, i >= 0 ? i : 0) + '#' + path);
};

var ensureSlash = function ensureSlash() {
  var path = getHashPath();

  if ((0, _PathUtils.isAbsolutePath)(path)) return true;

  replaceHashPath('/' + path);

  return false;
};

var getCurrentLocation = exports.getCurrentLocation = function getCurrentLocation(queryKey) {
  var path = getHashPath();
  var key = (0, _PathUtils.getQueryStringValueFromPath)(path, queryKey);

  var state = void 0;
  if (key) {
    path = (0, _PathUtils.stripQueryStringValueFromPath)(path, queryKey);
    state = (0, _DOMStateStorage.readState)(key);
  }

  var init = (0, _PathUtils.parsePath)(path);
  init.state = state;

  return (0, _LocationUtils.createLocation)(init, undefined, key);
};

var prevLocation = void 0;

var startListener = exports.startListener = function startListener(listener, queryKey) {
  var handleHashChange = function handleHashChange() {
    if (!ensureSlash()) return; // Hash path must always begin with a /

    var currentLocation = getCurrentLocation(queryKey);

    if (prevLocation && currentLocation.key && prevLocation.key === currentLocation.key) return; // Ignore extraneous hashchange events

    prevLocation = currentLocation;

    listener(currentLocation);
  };

  ensureSlash();
  (0, _DOMUtils.addEventListener)(window, HashChangeEvent, handleHashChange);

  return function () {
    return (0, _DOMUtils.removeEventListener)(window, HashChangeEvent, handleHashChange);
  };
};

var updateLocation = function updateLocation(location, queryKey, updateHash) {
  var state = location.state;
  var key = location.key;

  var path = (0, _PathUtils.createPath)(location);

  if (state !== undefined) {
    path = (0, _PathUtils.addQueryStringValueToPath)(path, queryKey, key);
    (0, _DOMStateStorage.saveState)(key, state);
  }

  prevLocation = location;

  updateHash(path);
};

var pushLocation = exports.pushLocation = function pushLocation(location, queryKey) {
  return updateLocation(location, queryKey, function (path) {
    if (getHashPath() !== path) {
      pushHashPath(path);
    } else {
      process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(false, 'You cannot PUSH the same path using hash history') : void 0;
    }
  });
};

var replaceLocation = exports.replaceLocation = function replaceLocation(location, queryKey) {
  return updateLocation(location, queryKey, function (path) {
    if (getHashPath() !== path) replaceHashPath(path);
  });
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.replaceLocation = exports.pushLocation = exports.getCurrentLocation = exports.go = exports.getUserConfirmation = undefined;

var _BrowserProtocol = __webpack_require__(29);

Object.defineProperty(exports, 'getUserConfirmation', {
  enumerable: true,
  get: function get() {
    return _BrowserProtocol.getUserConfirmation;
  }
});
Object.defineProperty(exports, 'go', {
  enumerable: true,
  get: function get() {
    return _BrowserProtocol.go;
  }
});

var _LocationUtils = __webpack_require__(12);

var _PathUtils = __webpack_require__(8);

var getCurrentLocation = exports.getCurrentLocation = function getCurrentLocation() {
  return (0, _LocationUtils.createLocation)(window.location);
};

var pushLocation = exports.pushLocation = function pushLocation(location) {
  window.location.href = (0, _PathUtils.createPath)(location);
  return false; // Don't update location
};

var replaceLocation = exports.replaceLocation = function replaceLocation(location) {
  window.location.replace((0, _PathUtils.createPath)(location));
  return false; // Don't update location
};

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _invariant = __webpack_require__(18);

var _invariant2 = _interopRequireDefault(_invariant);

var _ExecutionEnvironment = __webpack_require__(30);

var _BrowserProtocol = __webpack_require__(29);

var BrowserProtocol = _interopRequireWildcard(_BrowserProtocol);

var _RefreshProtocol = __webpack_require__(129);

var RefreshProtocol = _interopRequireWildcard(_RefreshProtocol);

var _DOMUtils = __webpack_require__(17);

var _createHistory = __webpack_require__(31);

var _createHistory2 = _interopRequireDefault(_createHistory);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates and returns a history object that uses HTML5's history API
 * (pushState, replaceState, and the popstate event) to manage history.
 * This is the recommended method of managing history in browsers because
 * it provides the cleanest URLs.
 *
 * Note: In browsers that do not support the HTML5 history API full
 * page reloads will be used to preserve clean URLs. You can force this
 * behavior using { forceRefresh: true } in options.
 */
var createBrowserHistory = function createBrowserHistory() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  !_ExecutionEnvironment.canUseDOM ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, 'Browser history needs a DOM') : (0, _invariant2.default)(false) : void 0;

  var useRefresh = options.forceRefresh || !(0, _DOMUtils.supportsHistory)();
  var Protocol = useRefresh ? RefreshProtocol : BrowserProtocol;

  var getUserConfirmation = Protocol.getUserConfirmation;
  var getCurrentLocation = Protocol.getCurrentLocation;
  var pushLocation = Protocol.pushLocation;
  var replaceLocation = Protocol.replaceLocation;
  var go = Protocol.go;


  var history = (0, _createHistory2.default)(_extends({
    getUserConfirmation: getUserConfirmation }, options, {
    getCurrentLocation: getCurrentLocation,
    pushLocation: pushLocation,
    replaceLocation: replaceLocation,
    go: go
  }));

  var listenerCount = 0,
      stopListener = void 0;

  var startListener = function startListener(listener, before) {
    if (++listenerCount === 1) stopListener = BrowserProtocol.startListener(history.transitionTo);

    var unlisten = before ? history.listenBefore(listener) : history.listen(listener);

    return function () {
      unlisten();

      if (--listenerCount === 0) stopListener();
    };
  };

  var listenBefore = function listenBefore(listener) {
    return startListener(listener, true);
  };

  var listen = function listen(listener) {
    return startListener(listener, false);
  };

  return _extends({}, history, {
    listenBefore: listenBefore,
    listen: listen
  });
};

exports.default = createBrowserHistory;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _warning = __webpack_require__(14);

var _warning2 = _interopRequireDefault(_warning);

var _invariant = __webpack_require__(18);

var _invariant2 = _interopRequireDefault(_invariant);

var _ExecutionEnvironment = __webpack_require__(30);

var _DOMUtils = __webpack_require__(17);

var _HashProtocol = __webpack_require__(128);

var HashProtocol = _interopRequireWildcard(_HashProtocol);

var _createHistory = __webpack_require__(31);

var _createHistory2 = _interopRequireDefault(_createHistory);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DefaultQueryKey = '_k';

var createHashHistory = function createHashHistory() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  !_ExecutionEnvironment.canUseDOM ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, 'Hash history needs a DOM') : (0, _invariant2.default)(false) : void 0;

  var queryKey = options.queryKey;


  process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(queryKey !== false, 'Using { queryKey: false } no longer works. Instead, just don\'t ' + 'use location state if you don\'t want a key in your URL query string') : void 0;

  if (typeof queryKey !== 'string') queryKey = DefaultQueryKey;

  var getUserConfirmation = HashProtocol.getUserConfirmation;


  var getCurrentLocation = function getCurrentLocation() {
    return HashProtocol.getCurrentLocation(queryKey);
  };

  var pushLocation = function pushLocation(location) {
    return HashProtocol.pushLocation(location, queryKey);
  };

  var replaceLocation = function replaceLocation(location) {
    return HashProtocol.replaceLocation(location, queryKey);
  };

  var history = (0, _createHistory2.default)(_extends({
    getUserConfirmation: getUserConfirmation }, options, {
    getCurrentLocation: getCurrentLocation,
    pushLocation: pushLocation,
    replaceLocation: replaceLocation,
    go: HashProtocol.go
  }));

  var listenerCount = 0,
      stopListener = void 0;

  var startListener = function startListener(listener, before) {
    if (++listenerCount === 1) stopListener = HashProtocol.startListener(history.transitionTo, queryKey);

    var unlisten = before ? history.listenBefore(listener) : history.listen(listener);

    return function () {
      unlisten();

      if (--listenerCount === 0) stopListener();
    };
  };

  var listenBefore = function listenBefore(listener) {
    return startListener(listener, true);
  };

  var listen = function listen(listener) {
    return startListener(listener, false);
  };

  var goIsSupportedWithoutReload = (0, _DOMUtils.supportsGoWithoutReloadUsingHash)();

  var go = function go(n) {
    process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(goIsSupportedWithoutReload, 'Hash history go(n) causes a full page reload in this browser') : void 0;

    history.go(n);
  };

  var createHref = function createHref(path) {
    return '#' + history.createHref(path);
  };

  return _extends({}, history, {
    listenBefore: listenBefore,
    listen: listen,
    go: go,
    createHref: createHref
  });
};

exports.default = createHashHistory;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _warning = __webpack_require__(14);

var _warning2 = _interopRequireDefault(_warning);

var _invariant = __webpack_require__(18);

var _invariant2 = _interopRequireDefault(_invariant);

var _LocationUtils = __webpack_require__(12);

var _PathUtils = __webpack_require__(8);

var _createHistory = __webpack_require__(31);

var _createHistory2 = _interopRequireDefault(_createHistory);

var _Actions = __webpack_require__(20);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createStateStorage = function createStateStorage(entries) {
  return entries.filter(function (entry) {
    return entry.state;
  }).reduce(function (memo, entry) {
    memo[entry.key] = entry.state;
    return memo;
  }, {});
};

var createMemoryHistory = function createMemoryHistory() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  if (Array.isArray(options)) {
    options = { entries: options };
  } else if (typeof options === 'string') {
    options = { entries: [options] };
  }

  var getCurrentLocation = function getCurrentLocation() {
    var entry = entries[current];
    var path = (0, _PathUtils.createPath)(entry);

    var key = void 0,
        state = void 0;
    if (entry.key) {
      key = entry.key;
      state = readState(key);
    }

    var init = (0, _PathUtils.parsePath)(path);

    return (0, _LocationUtils.createLocation)(_extends({}, init, { state: state }), undefined, key);
  };

  var canGo = function canGo(n) {
    var index = current + n;
    return index >= 0 && index < entries.length;
  };

  var go = function go(n) {
    if (!n) return;

    if (!canGo(n)) {
      process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(false, 'Cannot go(%s) there is not enough history', n) : void 0;

      return;
    }

    current += n;
    var currentLocation = getCurrentLocation();

    // Change action to POP
    history.transitionTo(_extends({}, currentLocation, { action: _Actions.POP }));
  };

  var pushLocation = function pushLocation(location) {
    current += 1;

    if (current < entries.length) entries.splice(current);

    entries.push(location);

    saveState(location.key, location.state);
  };

  var replaceLocation = function replaceLocation(location) {
    entries[current] = location;
    saveState(location.key, location.state);
  };

  var history = (0, _createHistory2.default)(_extends({}, options, {
    getCurrentLocation: getCurrentLocation,
    pushLocation: pushLocation,
    replaceLocation: replaceLocation,
    go: go
  }));

  var _options = options;
  var entries = _options.entries;
  var current = _options.current;


  if (typeof entries === 'string') {
    entries = [entries];
  } else if (!Array.isArray(entries)) {
    entries = ['/'];
  }

  entries = entries.map(function (entry) {
    return (0, _LocationUtils.createLocation)(entry);
  });

  if (current == null) {
    current = entries.length - 1;
  } else {
    !(current >= 0 && current < entries.length) ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, 'Current index must be >= 0 and < %s, was %s', entries.length, current) : (0, _invariant2.default)(false) : void 0;
  }

  var storage = createStateStorage(entries);

  var saveState = function saveState(key, state) {
    return storage[key] = state;
  };

  var readState = function readState(key) {
    return storage[key];
  };

  return history;
};

exports.default = createMemoryHistory;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.locationsAreEqual = exports.Actions = exports.useQueries = exports.useBeforeUnload = exports.useBasename = exports.createMemoryHistory = exports.createHashHistory = exports.createHistory = undefined;

var _LocationUtils = __webpack_require__(12);

Object.defineProperty(exports, 'locationsAreEqual', {
  enumerable: true,
  get: function get() {
    return _LocationUtils.locationsAreEqual;
  }
});

var _createBrowserHistory = __webpack_require__(130);

var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);

var _createHashHistory2 = __webpack_require__(131);

var _createHashHistory3 = _interopRequireDefault(_createHashHistory2);

var _createMemoryHistory2 = __webpack_require__(132);

var _createMemoryHistory3 = _interopRequireDefault(_createMemoryHistory2);

var _useBasename2 = __webpack_require__(134);

var _useBasename3 = _interopRequireDefault(_useBasename2);

var _useBeforeUnload2 = __webpack_require__(135);

var _useBeforeUnload3 = _interopRequireDefault(_useBeforeUnload2);

var _useQueries2 = __webpack_require__(136);

var _useQueries3 = _interopRequireDefault(_useQueries2);

var _Actions2 = __webpack_require__(20);

var _Actions3 = _interopRequireDefault(_Actions2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.createHistory = _createBrowserHistory2.default;
exports.createHashHistory = _createHashHistory3.default;
exports.createMemoryHistory = _createMemoryHistory3.default;
exports.useBasename = _useBasename3.default;
exports.useBeforeUnload = _useBeforeUnload3.default;
exports.useQueries = _useQueries3.default;
exports.Actions = _Actions3.default;

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _runTransitionHook = __webpack_require__(32);

var _runTransitionHook2 = _interopRequireDefault(_runTransitionHook);

var _PathUtils = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var useBasename = function useBasename(createHistory) {
  return function () {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var history = createHistory(options);
    var basename = options.basename;


    var addBasename = function addBasename(location) {
      if (!location) return location;

      if (basename && location.basename == null) {
        if (location.pathname.indexOf(basename) === 0) {
          location.pathname = location.pathname.substring(basename.length);
          location.basename = basename;

          if (location.pathname === '') location.pathname = '/';
        } else {
          location.basename = '';
        }
      }

      return location;
    };

    var prependBasename = function prependBasename(location) {
      if (!basename) return location;

      var object = typeof location === 'string' ? (0, _PathUtils.parsePath)(location) : location;
      var pname = object.pathname;
      var normalizedBasename = basename.slice(-1) === '/' ? basename : basename + '/';
      var normalizedPathname = pname.charAt(0) === '/' ? pname.slice(1) : pname;
      var pathname = normalizedBasename + normalizedPathname;

      return _extends({}, location, {
        pathname: pathname
      });
    };

    // Override all read methods with basename-aware versions.
    var getCurrentLocation = function getCurrentLocation() {
      return addBasename(history.getCurrentLocation());
    };

    var listenBefore = function listenBefore(hook) {
      return history.listenBefore(function (location, callback) {
        return (0, _runTransitionHook2.default)(hook, addBasename(location), callback);
      });
    };

    var listen = function listen(listener) {
      return history.listen(function (location) {
        return listener(addBasename(location));
      });
    };

    // Override all write methods with basename-aware versions.
    var push = function push(location) {
      return history.push(prependBasename(location));
    };

    var replace = function replace(location) {
      return history.replace(prependBasename(location));
    };

    var createPath = function createPath(location) {
      return history.createPath(prependBasename(location));
    };

    var createHref = function createHref(location) {
      return history.createHref(prependBasename(location));
    };

    var createLocation = function createLocation(location) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return addBasename(history.createLocation.apply(history, [prependBasename(location)].concat(args)));
    };

    return _extends({}, history, {
      getCurrentLocation: getCurrentLocation,
      listenBefore: listenBefore,
      listen: listen,
      push: push,
      replace: replace,
      createPath: createPath,
      createHref: createHref,
      createLocation: createLocation
    });
  };
};

exports.default = useBasename;

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _invariant = __webpack_require__(18);

var _invariant2 = _interopRequireDefault(_invariant);

var _DOMUtils = __webpack_require__(17);

var _ExecutionEnvironment = __webpack_require__(30);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var startListener = function startListener(getPromptMessage) {
  var handleBeforeUnload = function handleBeforeUnload(event) {
    var message = getPromptMessage();

    if (typeof message === 'string') {
      (event || window.event).returnValue = message;
      return message;
    }

    return undefined;
  };

  (0, _DOMUtils.addEventListener)(window, 'beforeunload', handleBeforeUnload);

  return function () {
    return (0, _DOMUtils.removeEventListener)(window, 'beforeunload', handleBeforeUnload);
  };
};

/**
 * Returns a new createHistory function that can be used to create
 * history objects that know how to use the beforeunload event in web
 * browsers to cancel navigation.
 */
var useBeforeUnload = function useBeforeUnload(createHistory) {
  !_ExecutionEnvironment.canUseDOM ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, 'useBeforeUnload only works in DOM environments') : (0, _invariant2.default)(false) : void 0;

  return function (options) {
    var history = createHistory(options);

    var listeners = [];
    var stopListener = void 0;

    var getPromptMessage = function getPromptMessage() {
      var message = void 0;
      for (var i = 0, len = listeners.length; message == null && i < len; ++i) {
        message = listeners[i].call();
      }return message;
    };

    var listenBeforeUnload = function listenBeforeUnload(listener) {
      if (listeners.push(listener) === 1) stopListener = startListener(getPromptMessage);

      return function () {
        listeners = listeners.filter(function (item) {
          return item !== listener;
        });

        if (listeners.length === 0 && stopListener) {
          stopListener();
          stopListener = null;
        }
      };
    };

    return _extends({}, history, {
      listenBeforeUnload: listenBeforeUnload
    });
  };
};

exports.default = useBeforeUnload;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _queryString = __webpack_require__(150);

var _runTransitionHook = __webpack_require__(32);

var _runTransitionHook2 = _interopRequireDefault(_runTransitionHook);

var _LocationUtils = __webpack_require__(12);

var _PathUtils = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultStringifyQuery = function defaultStringifyQuery(query) {
  return (0, _queryString.stringify)(query).replace(/%20/g, '+');
};

var defaultParseQueryString = _queryString.parse;

/**
 * Returns a new createHistory function that may be used to create
 * history objects that know how to handle URL queries.
 */
var useQueries = function useQueries(createHistory) {
  return function () {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var history = createHistory(options);
    var stringifyQuery = options.stringifyQuery;
    var parseQueryString = options.parseQueryString;


    if (typeof stringifyQuery !== 'function') stringifyQuery = defaultStringifyQuery;

    if (typeof parseQueryString !== 'function') parseQueryString = defaultParseQueryString;

    var decodeQuery = function decodeQuery(location) {
      if (!location) return location;

      if (location.query == null) location.query = parseQueryString(location.search.substring(1));

      return location;
    };

    var encodeQuery = function encodeQuery(location, query) {
      if (query == null) return location;

      var object = typeof location === 'string' ? (0, _PathUtils.parsePath)(location) : location;
      var queryString = stringifyQuery(query);
      var search = queryString ? '?' + queryString : '';

      return _extends({}, object, {
        search: search
      });
    };

    // Override all read methods with query-aware versions.
    var getCurrentLocation = function getCurrentLocation() {
      return decodeQuery(history.getCurrentLocation());
    };

    var listenBefore = function listenBefore(hook) {
      return history.listenBefore(function (location, callback) {
        return (0, _runTransitionHook2.default)(hook, decodeQuery(location), callback);
      });
    };

    var listen = function listen(listener) {
      return history.listen(function (location) {
        return listener(decodeQuery(location));
      });
    };

    // Override all write methods with query-aware versions.
    var push = function push(location) {
      return history.push(encodeQuery(location, location.query));
    };

    var replace = function replace(location) {
      return history.replace(encodeQuery(location, location.query));
    };

    var createPath = function createPath(location) {
      return history.createPath(encodeQuery(location, location.query));
    };

    var createHref = function createHref(location) {
      return history.createHref(encodeQuery(location, location.query));
    };

    var createLocation = function createLocation(location) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var newLocation = history.createLocation.apply(history, [encodeQuery(location, location.query)].concat(args));

      if (location.query) newLocation.query = (0, _LocationUtils.createQuery)(location.query);

      return decodeQuery(newLocation);
    };

    return _extends({}, history, {
      getCurrentLocation: getCurrentLocation,
      listenBefore: listenBefore,
      listen: listen,
      push: push,
      replace: replace,
      createPath: createPath,
      createHref: createHref,
      createLocation: createLocation
    });
  };
};

exports.default = useQueries;

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * lodash 3.1.4 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var isArguments = __webpack_require__(53),
    isArray = __webpack_require__(54);

/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

/**
 * The base implementation of `_.flatten` with added support for restricting
 * flattening and specifying the start index.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {boolean} [isDeep] Specify a deep flatten.
 * @param {boolean} [isStrict] Restrict flattening to arrays-like objects.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, isDeep, isStrict, result) {
  result || (result = []);

  var index = -1,
      length = array.length;

  while (++index < length) {
    var value = array[index];
    if (isObjectLike(value) && isArrayLike(value) &&
        (isStrict || isArray(value) || isArguments(value))) {
      if (isDeep) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, isDeep, isStrict, result);
      } else {
        arrayPush(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

/**
 * Gets the "length" property value of `object`.
 *
 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
 * that affects Safari on at least iOS 8.1-8.3 ARM64.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {*} Returns the "length" value.
 */
var getLength = baseProperty('length');

/**
 * Checks if `value` is array-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 */
function isArrayLike(value) {
  return value != null && isLength(getLength(value));
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = baseFlatten;


/***/ }),
/* 138 */
/***/ (function(module, exports) {

/**
 * lodash 3.0.3 (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * The base implementation of `baseForIn` and `baseForOwn` which iterates
 * over `object` properties returned by `keysFunc` invoking `iteratee` for
 * each property. Iteratee functions may exit iteration early by explicitly
 * returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

/**
 * Creates a base function for methods like `_.forIn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

module.exports = baseFor;


/***/ }),
/* 139 */
/***/ (function(module, exports) {

/**
 * lodash 3.1.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * The base implementation of `_.indexOf` without support for binary searches.
 *
 * @private
 * @param {Array} array The array to search.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
  if (value !== value) {
    return indexOfNaN(array, fromIndex);
  }
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

/**
 * Gets the index at which the first occurrence of `NaN` is found in `array`.
 * If `fromRight` is provided elements of `array` are iterated from right to left.
 *
 * @private
 * @param {Array} array The array to search.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched `NaN`, else `-1`.
 */
function indexOfNaN(array, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 0 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    var other = array[index];
    if (other !== other) {
      return index;
    }
  }
  return -1;
}

module.exports = baseIndexOf;


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * lodash 3.0.3 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseIndexOf = __webpack_require__(139),
    cacheIndexOf = __webpack_require__(142),
    createCache = __webpack_require__(143);

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * The base implementation of `_.uniq` without support for callback shorthands
 * and `this` binding.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} [iteratee] The function invoked per iteration.
 * @returns {Array} Returns the new duplicate-value-free array.
 */
function baseUniq(array, iteratee) {
  var index = -1,
      indexOf = baseIndexOf,
      length = array.length,
      isCommon = true,
      isLarge = isCommon && length >= LARGE_ARRAY_SIZE,
      seen = isLarge ? createCache() : null,
      result = [];

  if (seen) {
    indexOf = cacheIndexOf;
    isCommon = false;
  } else {
    isLarge = false;
    seen = iteratee ? [] : result;
  }
  outer:
  while (++index < length) {
    var value = array[index],
        computed = iteratee ? iteratee(value, index, array) : value;

    if (isCommon && value === value) {
      var seenIndex = seen.length;
      while (seenIndex--) {
        if (seen[seenIndex] === computed) {
          continue outer;
        }
      }
      if (iteratee) {
        seen.push(computed);
      }
      result.push(value);
    }
    else if (indexOf(seen, computed, 0) < 0) {
      if (iteratee || isLarge) {
        seen.push(computed);
      }
      result.push(value);
    }
  }
  return result;
}

module.exports = baseUniq;


/***/ }),
/* 141 */
/***/ (function(module, exports) {

/**
 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * A specialized version of `baseCallback` which only supports `this` binding
 * and specifying the number of arguments to provide to `func`.
 *
 * @private
 * @param {Function} func The function to bind.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {number} [argCount] The number of arguments to provide to `func`.
 * @returns {Function} Returns the callback.
 */
function bindCallback(func, thisArg, argCount) {
  if (typeof func != 'function') {
    return identity;
  }
  if (thisArg === undefined) {
    return func;
  }
  switch (argCount) {
    case 1: return function(value) {
      return func.call(thisArg, value);
    };
    case 3: return function(value, index, collection) {
      return func.call(thisArg, value, index, collection);
    };
    case 4: return function(accumulator, value, index, collection) {
      return func.call(thisArg, accumulator, value, index, collection);
    };
    case 5: return function(value, other, key, object, source) {
      return func.call(thisArg, value, other, key, object, source);
    };
  }
  return function() {
    return func.apply(thisArg, arguments);
  };
}

/**
 * This method returns the first argument provided to it.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'user': 'fred' };
 *
 * _.identity(object) === object;
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = bindCallback;


/***/ }),
/* 142 */
/***/ (function(module, exports) {

/**
 * lodash 3.0.2 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * Checks if `value` is in `cache` mimicking the return signature of
 * `_.indexOf` by returning `0` if the value is found, else `-1`.
 *
 * @private
 * @param {Object} cache The cache to search.
 * @param {*} value The value to search for.
 * @returns {number} Returns `0` if `value` is found, else `-1`.
 */
function cacheIndexOf(cache, value) {
  var data = cache.data,
      result = (typeof value == 'string' || isObject(value)) ? data.set.has(value) : data.hash[value];

  return result ? 0 : -1;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

module.exports = cacheIndexOf;


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * lodash 3.1.2 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var getNative = __webpack_require__(50);

/** Native method references. */
var Set = getNative(global, 'Set');

/* Native method references for those with the same name as other `lodash` methods. */
var nativeCreate = getNative(Object, 'create');

/**
 *
 * Creates a cache object to store unique values.
 *
 * @private
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var length = values ? values.length : 0;

  this.data = { 'hash': nativeCreate(null), 'set': new Set };
  while (length--) {
    this.push(values[length]);
  }
}

/**
 * Adds `value` to the cache.
 *
 * @private
 * @name push
 * @memberOf SetCache
 * @param {*} value The value to cache.
 */
function cachePush(value) {
  var data = this.data;
  if (typeof value == 'string' || isObject(value)) {
    data.set.add(value);
  } else {
    data.hash[value] = true;
  }
}

/**
 * Creates a `Set` cache object to optimize linear searches of large arrays.
 *
 * @private
 * @param {Array} [values] The values to cache.
 * @returns {null|Object} Returns the new cache object if `Set` is supported, else `null`.
 */
function createCache(values) {
  return (nativeCreate && Set) ? new SetCache(values) : null;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

// Add functions to the `Set` cache.
SetCache.prototype.push = cachePush;

module.exports = createCache;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(37)))

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * lodash 3.2.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var root = __webpack_require__(33);

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match latin-1 supplementary letters (excluding mathematical operators). */
var reLatin1 = /[\xc0-\xd6\xd8-\xde\xdf-\xf6\xf8-\xff]/g;

/** Used to compose unicode character classes. */
var rsComboMarksRange = '\\u0300-\\u036f\\ufe20-\\ufe23',
    rsComboSymbolsRange = '\\u20d0-\\u20f0';

/** Used to compose unicode capture groups. */
var rsCombo = '[' + rsComboMarksRange + rsComboSymbolsRange + ']';

/**
 * Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
 * [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
 */
var reComboMark = RegExp(rsCombo, 'g');

/** Used to map latin-1 supplementary letters to basic latin letters. */
var deburredLetters = {
  '\xc0': 'A',  '\xc1': 'A', '\xc2': 'A', '\xc3': 'A', '\xc4': 'A', '\xc5': 'A',
  '\xe0': 'a',  '\xe1': 'a', '\xe2': 'a', '\xe3': 'a', '\xe4': 'a', '\xe5': 'a',
  '\xc7': 'C',  '\xe7': 'c',
  '\xd0': 'D',  '\xf0': 'd',
  '\xc8': 'E',  '\xc9': 'E', '\xca': 'E', '\xcb': 'E',
  '\xe8': 'e',  '\xe9': 'e', '\xea': 'e', '\xeb': 'e',
  '\xcC': 'I',  '\xcd': 'I', '\xce': 'I', '\xcf': 'I',
  '\xeC': 'i',  '\xed': 'i', '\xee': 'i', '\xef': 'i',
  '\xd1': 'N',  '\xf1': 'n',
  '\xd2': 'O',  '\xd3': 'O', '\xd4': 'O', '\xd5': 'O', '\xd6': 'O', '\xd8': 'O',
  '\xf2': 'o',  '\xf3': 'o', '\xf4': 'o', '\xf5': 'o', '\xf6': 'o', '\xf8': 'o',
  '\xd9': 'U',  '\xda': 'U', '\xdb': 'U', '\xdc': 'U',
  '\xf9': 'u',  '\xfa': 'u', '\xfb': 'u', '\xfc': 'u',
  '\xdd': 'Y',  '\xfd': 'y', '\xff': 'y',
  '\xc6': 'Ae', '\xe6': 'ae',
  '\xde': 'Th', '\xfe': 'th',
  '\xdf': 'ss'
};

/**
 * Used by `_.deburr` to convert latin-1 supplementary letters to basic latin letters.
 *
 * @private
 * @param {string} letter The matched letter to deburr.
 * @returns {string} Returns the deburred letter.
 */
function deburrLetter(letter) {
  return deburredLetters[letter];
}

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var Symbol = root.Symbol;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = Symbol ? symbolProto.toString : undefined;

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a string if it's not one. An empty string is returned
 * for `null` and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (value == null) {
    return '';
  }
  if (isSymbol(value)) {
    return Symbol ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Deburrs `string` by converting [latin-1 supplementary letters](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
 * to basic latin letters and removing [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
 *
 * @static
 * @memberOf _
 * @category String
 * @param {string} [string=''] The string to deburr.
 * @returns {string} Returns the deburred string.
 * @example
 *
 * _.deburr('déjà vu');
 * // => 'deja vu'
 */
function deburr(string) {
  string = toString(string);
  return string && string.replace(reLatin1, deburrLetter).replace(reComboMark, '');
}

module.exports = deburr;


/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * lodash 3.1.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var deburr = __webpack_require__(144),
    words = __webpack_require__(149);

/**
 * A specialized version of `_.reduce` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {boolean} [initAccum] Specify using the first element of `array` as the initial value.
 * @returns {*} Returns the accumulated value.
 */
function arrayReduce(array, iteratee, accumulator, initAccum) {
  var index = -1,
      length = array.length;

  if (initAccum && length) {
    accumulator = array[++index];
  }
  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }
  return accumulator;
}

/**
 * Creates a function like `_.camelCase`.
 *
 * @private
 * @param {Function} callback The function to combine each word.
 * @returns {Function} Returns the new compounder function.
 */
function createCompounder(callback) {
  return function(string) {
    return arrayReduce(words(deburr(string)), callback, '');
  };
}

/**
 * Converts `string` to [kebab case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles).
 *
 * @static
 * @memberOf _
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the kebab cased string.
 * @example
 *
 * _.kebabCase('Foo Bar');
 * // => 'foo-bar'
 *
 * _.kebabCase('fooBar');
 * // => 'foo-bar'
 *
 * _.kebabCase('__foo_bar__');
 * // => 'foo-bar'
 */
var kebabCase = createCompounder(function(result, word, index) {
  return result + (index ? '-' : '') + word.toLowerCase();
});

module.exports = kebabCase;


/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * lodash 3.1.2 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var getNative = __webpack_require__(50),
    isArguments = __webpack_require__(53),
    isArray = __webpack_require__(54);

/** Used to detect unsigned integer values. */
var reIsUint = /^\d+$/;

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/* Native method references for those with the same name as other `lodash` methods. */
var nativeKeys = getNative(Object, 'keys');

/**
 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

/**
 * Gets the "length" property value of `object`.
 *
 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
 * that affects Safari on at least iOS 8.1-8.3 ARM64.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {*} Returns the "length" value.
 */
var getLength = baseProperty('length');

/**
 * Checks if `value` is array-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 */
function isArrayLike(value) {
  return value != null && isLength(getLength(value));
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return value > -1 && value % 1 == 0 && value < length;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * A fallback implementation of `Object.keys` which creates an array of the
 * own enumerable property names of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function shimKeys(object) {
  var props = keysIn(object),
      propsLength = props.length,
      length = propsLength && object.length;

  var allowIndexes = !!length && isLength(length) &&
    (isArray(object) || isArguments(object));

  var index = -1,
      result = [];

  while (++index < propsLength) {
    var key = props[index];
    if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
var keys = !nativeKeys ? shimKeys : function(object) {
  var Ctor = object == null ? undefined : object.constructor;
  if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
      (typeof object != 'function' && isArrayLike(object))) {
    return shimKeys(object);
  }
  return isObject(object) ? nativeKeys(object) : [];
};

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  if (object == null) {
    return [];
  }
  if (!isObject(object)) {
    object = Object(object);
  }
  var length = object.length;
  length = (length && isLength(length) &&
    (isArray(object) || isArguments(object)) && length) || 0;

  var Ctor = object.constructor,
      index = -1,
      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
      result = Array(length),
      skipIndexes = length > 0;

  while (++index < length) {
    result[index] = (index + '');
  }
  for (var key in object) {
    if (!(skipIndexes && isIndex(key, length)) &&
        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = keys;


/***/ }),
/* 147 */
/***/ (function(module, exports) {

/**
 * lodash 3.6.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Native method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Creates a function that invokes `func` with the `this` binding of the
 * created function and arguments from `start` and beyond provided as an array.
 *
 * **Note:** This method is based on the [rest parameter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters).
 *
 * @static
 * @memberOf _
 * @category Function
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var say = _.restParam(function(what, names) {
 *   return what + ' ' + _.initial(names).join(', ') +
 *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
 * });
 *
 * say('hello', 'fred', 'barney', 'pebbles');
 * // => 'hello fred, barney, & pebbles'
 */
function restParam(func, start) {
  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  start = nativeMax(start === undefined ? (func.length - 1) : (+start || 0), 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        rest = Array(length);

    while (++index < length) {
      rest[index] = args[start + index];
    }
    switch (start) {
      case 0: return func.call(this, rest);
      case 1: return func.call(this, args[0], rest);
      case 2: return func.call(this, args[0], args[1], rest);
    }
    var otherArgs = Array(start + 1);
    index = -1;
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = rest;
    return func.apply(this, otherArgs);
  };
}

module.exports = restParam;


/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * lodash 3.1.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseFlatten = __webpack_require__(137),
    baseUniq = __webpack_require__(140),
    restParam = __webpack_require__(147);

/**
 * Creates an array of unique values, in order, of the provided arrays using
 * `SameValueZero` for equality comparisons.
 *
 * **Note:** [`SameValueZero`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
 * comparisons are like strict equality comparisons, e.g. `===`, except that
 * `NaN` matches `NaN`.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {...Array} [arrays] The arrays to inspect.
 * @returns {Array} Returns the new array of combined values.
 * @example
 *
 * _.union([1, 2], [4, 2], [2, 1]);
 * // => [1, 2, 4]
 */
var union = restParam(function(arrays) {
  return baseUniq(baseFlatten(arrays, false, true));
});

module.exports = union;


/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * lodash 3.2.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var root = __webpack_require__(33);

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f\\ufe20-\\ufe23',
    rsComboSymbolsRange = '\\u20d0-\\u20f0',
    rsDingbatRange = '\\u2700-\\u27bf',
    rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff',
    rsMathOpRange = '\\xac\\xb1\\xd7\\xf7',
    rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf',
    rsQuoteRange = '\\u2018\\u2019\\u201c\\u201d',
    rsSpaceRange = ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000',
    rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde',
    rsVarRange = '\\ufe0e\\ufe0f',
    rsBreakRange = rsMathOpRange + rsNonCharRange + rsQuoteRange + rsSpaceRange;

/** Used to compose unicode capture groups. */
var rsBreak = '[' + rsBreakRange + ']',
    rsCombo = '[' + rsComboMarksRange + rsComboSymbolsRange + ']',
    rsDigits = '\\d+',
    rsDingbat = '[' + rsDingbatRange + ']',
    rsLower = '[' + rsLowerRange + ']',
    rsMisc = '[^' + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + ']',
    rsFitz = '\\ud83c[\\udffb-\\udfff]',
    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
    rsNonAstral = '[^' + rsAstralRange + ']',
    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
    rsUpper = '[' + rsUpperRange + ']',
    rsZWJ = '\\u200d';

/** Used to compose unicode regexes. */
var rsLowerMisc = '(?:' + rsLower + '|' + rsMisc + ')',
    rsUpperMisc = '(?:' + rsUpper + '|' + rsMisc + ')',
    reOptMod = rsModifier + '?',
    rsOptVar = '[' + rsVarRange + ']?',
    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
    rsSeq = rsOptVar + reOptMod + rsOptJoin,
    rsEmoji = '(?:' + [rsDingbat, rsRegional, rsSurrPair].join('|') + ')' + rsSeq;

/** Used to match non-compound words composed of alphanumeric characters. */
var reBasicWord = /[a-zA-Z0-9]+/g;

/** Used to match complex or compound words. */
var reComplexWord = RegExp([
  rsUpper + '?' + rsLower + '+(?=' + [rsBreak, rsUpper, '$'].join('|') + ')',
  rsUpperMisc + '+(?=' + [rsBreak, rsUpper + rsLowerMisc, '$'].join('|') + ')',
  rsUpper + '?' + rsLowerMisc + '+',
  rsUpper + '+',
  rsDigits,
  rsEmoji
].join('|'), 'g');

/** Used to detect strings that need a more robust regexp to match words. */
var reHasComplexWord = /[a-z][A-Z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var Symbol = root.Symbol;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = Symbol ? symbolProto.toString : undefined;

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a string if it's not one. An empty string is returned
 * for `null` and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (value == null) {
    return '';
  }
  if (isSymbol(value)) {
    return Symbol ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Splits `string` into an array of its words.
 *
 * @static
 * @memberOf _
 * @category String
 * @param {string} [string=''] The string to inspect.
 * @param {RegExp|string} [pattern] The pattern to match words.
 * @param- {Object} [guard] Enables use as an iteratee for functions like `_.map`.
 * @returns {Array} Returns the words of `string`.
 * @example
 *
 * _.words('fred, barney, & pebbles');
 * // => ['fred', 'barney', 'pebbles']
 *
 * _.words('fred, barney, & pebbles', /[^, ]+/g);
 * // => ['fred', 'barney', '&', 'pebbles']
 */
function words(string, pattern, guard) {
  string = toString(string);
  pattern = guard ? undefined : pattern;

  if (pattern === undefined) {
    pattern = reHasComplexWord.test(string) ? reComplexWord : reBasicWord;
  }
  return string.match(pattern) || [];
}

module.exports = words;


/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strictUriEncode = __webpack_require__(168);
var objectAssign = __webpack_require__(55);

function encoderForArrayFormat(opts) {
	switch (opts.arrayFormat) {
		case 'index':
			return function (key, value, index) {
				return value === null ? [
					encode(key, opts),
					'[',
					index,
					']'
				].join('') : [
					encode(key, opts),
					'[',
					encode(index, opts),
					']=',
					encode(value, opts)
				].join('');
			};

		case 'bracket':
			return function (key, value) {
				return value === null ? encode(key, opts) : [
					encode(key, opts),
					'[]=',
					encode(value, opts)
				].join('');
			};

		default:
			return function (key, value) {
				return value === null ? encode(key, opts) : [
					encode(key, opts),
					'=',
					encode(value, opts)
				].join('');
			};
	}
}

function parserForArrayFormat(opts) {
	var result;

	switch (opts.arrayFormat) {
		case 'index':
			return function (key, value, accumulator) {
				result = /\[(\d*)]$/.exec(key);

				key = key.replace(/\[\d*]$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				}

				if (accumulator[key] === undefined) {
					accumulator[key] = {};
				}

				accumulator[key][result[1]] = value;
			};

		case 'bracket':
			return function (key, value, accumulator) {
				result = /(\[])$/.exec(key);

				key = key.replace(/\[]$/, '');

				if (!result || accumulator[key] === undefined) {
					accumulator[key] = value;
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};

		default:
			return function (key, value, accumulator) {
				if (accumulator[key] === undefined) {
					accumulator[key] = value;
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};
	}
}

function encode(value, opts) {
	if (opts.encode) {
		return opts.strict ? strictUriEncode(value) : encodeURIComponent(value);
	}

	return value;
}

function keysSorter(input) {
	if (Array.isArray(input)) {
		return input.sort();
	} else if (typeof input === 'object') {
		return keysSorter(Object.keys(input)).sort(function (a, b) {
			return Number(a) - Number(b);
		}).map(function (key) {
			return input[key];
		});
	}

	return input;
}

exports.extract = function (str) {
	return str.split('?')[1] || '';
};

exports.parse = function (str, opts) {
	opts = objectAssign({arrayFormat: 'none'}, opts);

	var formatter = parserForArrayFormat(opts);

	// Create an object with no prototype
	// https://github.com/sindresorhus/query-string/issues/47
	var ret = Object.create(null);

	if (typeof str !== 'string') {
		return ret;
	}

	str = str.trim().replace(/^(\?|#|&)/, '');

	if (!str) {
		return ret;
	}

	str.split('&').forEach(function (param) {
		var parts = param.replace(/\+/g, ' ').split('=');
		// Firefox (pre 40) decodes `%3D` to `=`
		// https://github.com/sindresorhus/query-string/pull/37
		var key = parts.shift();
		var val = parts.length > 0 ? parts.join('=') : undefined;

		// missing `=` should be `null`:
		// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
		val = val === undefined ? null : decodeURIComponent(val);

		formatter(decodeURIComponent(key), val, ret);
	});

	return Object.keys(ret).sort().reduce(function (result, key) {
		var val = ret[key];
		if (Boolean(val) && typeof val === 'object' && !Array.isArray(val)) {
			// Sort object keys, not values
			result[key] = keysSorter(val);
		} else {
			result[key] = val;
		}

		return result;
	}, Object.create(null));
};

exports.stringify = function (obj, opts) {
	var defaults = {
		encode: true,
		strict: true,
		arrayFormat: 'none'
	};

	opts = objectAssign(defaults, opts);

	var formatter = encoderForArrayFormat(opts);

	return obj ? Object.keys(obj).sort().map(function (key) {
		var val = obj[key];

		if (val === undefined) {
			return '';
		}

		if (val === null) {
			return encode(key, opts);
		}

		if (Array.isArray(val)) {
			var result = [];

			val.slice().forEach(function (val2) {
				if (val2 === undefined) {
					return;
				}

				result.push(formatter(key, val2, result.length));
			});

			return result.join('&');
		}

		return encode(key, opts) + '=' + encode(val, opts);
	}).filter(function (x) {
		return x.length > 0;
	}).join('&') : '';
};


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = classNameFromVNode;

var _selectorParser2 = __webpack_require__(56);

var _selectorParser3 = _interopRequireDefault(_selectorParser2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function classNameFromVNode(vNode) {
  var _selectorParser = (0, _selectorParser3.default)(vNode.sel);

  var cn = _selectorParser.className;


  if (!vNode.data) {
    return cn;
  }

  var _vNode$data = vNode.data;
  var dataClass = _vNode$data.class;
  var props = _vNode$data.props;


  if (dataClass) {
    var c = Object.keys(vNode.data.class).filter(function (cl) {
      return vNode.data.class[cl];
    });
    cn += ' ' + c.join(' ');
  }

  if (props && props.className) {
    cn += ' ' + props.className;
  }

  return cn.trim();
}

/***/ }),
/* 152 */
/***/ (function(module, exports) {


// All SVG children elements, not in this list, should self-close

module.exports = {
  // http://www.w3.org/TR/SVG/intro.html#TermContainerElement
  'a': true,
  'defs': true,
  'glyph': true,
  'g': true,
  'marker': true,
  'mask': true,
  'missing-glyph': true,
  'pattern': true,
  'svg': true,
  'switch': true,
  'symbol': true,

  // http://www.w3.org/TR/SVG/intro.html#TermDescriptiveElement
  'desc': true,
  'metadata': true,
  'title': true
};

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {


var init = __webpack_require__(154);

module.exports = init([__webpack_require__(155), __webpack_require__(156)]);

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {


var parseSelector = __webpack_require__(57);
var VOID_ELEMENTS = __webpack_require__(157);
var CONTAINER_ELEMENTS = __webpack_require__(152);

module.exports = function init(modules) {
  function parse(data) {
    return modules.reduce(function (arr, fn) {
      arr.push(fn(data));
      return arr;
    }, []).filter(function (result) {
      return result !== '';
    });
  }

  return function renderToString(vnode) {
    if (!vnode.sel && vnode.text) {
      return vnode.text;
    }

    vnode.data = vnode.data || {};

    // Support thunks
    if (typeof vnode.sel === 'string' && vnode.sel.slice(0, 5) === 'thunk') {
      vnode = vnode.data.fn.apply(null, vnode.data.args);
    }

    var tagName = parseSelector(vnode.sel).tagName;
    var attributes = parse(vnode);
    var svg = vnode.data.ns === 'http://www.w3.org/2000/svg';
    var tag = [];

    // Open tag
    tag.push('<' + tagName);
    if (attributes.length) {
      tag.push(' ' + attributes.join(' '));
    }
    if (svg && CONTAINER_ELEMENTS[tagName] !== true) {
      tag.push(' /');
    }
    tag.push('>');

    // Close tag, if needed
    if (VOID_ELEMENTS[tagName] !== true && !svg || svg && CONTAINER_ELEMENTS[tagName] === true) {
      if (vnode.data.props && vnode.data.props.innerHTML) {
        tag.push(vnode.data.props.innerHTML);
      } else if (vnode.text) {
        tag.push(vnode.text);
      } else if (vnode.children) {
        vnode.children.forEach(function (child) {
          tag.push(renderToString(child));
        });
      }
      tag.push('</' + tagName + '>');
    }

    return tag.join('');
  };
};

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {


var forOwn = __webpack_require__(52);
var escape = __webpack_require__(51);
var union = __webpack_require__(148);

var parseSelector = __webpack_require__(57);

// data.attrs, data.props, data.class

module.exports = function attributes(vnode) {
  var selector = parseSelector(vnode.sel);
  var parsedClasses = selector.className.split(' ');

  var attributes = [];
  var classes = [];
  var values = {};

  if (selector.id) {
    values.id = selector.id;
  }

  setAttributes(vnode.data.props, values);
  setAttributes(vnode.data.attrs, values); // `attrs` override `props`, not sure if this is good so

  if (vnode.data.class) {
    // Omit `className` attribute if `class` is set on vnode
    values.class = undefined;
  }
  forOwn(vnode.data.class, function (value, key) {
    if (value === true) {
      classes.push(key);
    }
  });
  classes = union(classes, values.class, parsedClasses).filter(function (x) {
    return x !== '';
  });

  if (classes.length) {
    values.class = classes.join(' ');
  }

  forOwn(values, function (value, key) {
    attributes.push(value === true ? key : key + '="' + escape(value) + '"');
  });

  return attributes.length ? attributes.join(' ') : '';
};

function setAttributes(values, target) {
  forOwn(values, function (value, key) {
    if (key === 'htmlFor') {
      target['for'] = value;
      return;
    }
    if (key === 'className') {
      target['class'] = value.split(' ');
      return;
    }
    if (key === 'innerHTML') {
      return;
    }
    target[key] = value;
  });
}

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var forOwn = __webpack_require__(52);
var escape = __webpack_require__(51);
var kebabCase = __webpack_require__(145);

// data.style

module.exports = function style(vnode) {
  var styles = [];
  var style = vnode.data.style || {};

  // merge in `delayed` properties
  if (style.delayed) {
    _extends(style, style.delayed);
  }

  forOwn(style, function (value, key) {
    // omit hook objects
    if (typeof value === 'string') {
      styles.push(kebabCase(key) + ': ' + escape(value));
    }
  });

  return styles.length ? 'style="' + styles.join('; ') + '"' : '';
};

/***/ }),
/* 157 */
/***/ (function(module, exports) {


// http://www.w3.org/html/wg/drafts/html/master/syntax.html#void-elements

module.exports = {
  area: true,
  base: true,
  br: true,
  col: true,
  embed: true,
  hr: true,
  img: true,
  input: true,
  keygen: true,
  link: true,
  meta: true,
  param: true,
  source: true,
  track: true,
  wbr: true
};

/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

var VNode = __webpack_require__(35);
var is = __webpack_require__(21);

function addNS(data, children) {
  data.ns = 'http://www.w3.org/2000/svg';
  if (children !== undefined) {
    for (var i = 0; i < children.length; ++i) {
      addNS(children[i].data, children[i].children);
    }
  }
}

module.exports = function h(sel, b, c) {
  var data = {}, children, text, i;
  if (c !== undefined) {
    data = b;
    if (is.array(c)) { children = c; }
    else if (is.primitive(c)) { text = c; }
  } else if (b !== undefined) {
    if (is.array(b)) { children = b; }
    else if (is.primitive(b)) { text = b; }
    else { data = b; }
  }
  if (is.array(children)) {
    for (i = 0; i < children.length; ++i) {
      if (is.primitive(children[i])) children[i] = VNode(undefined, undefined, undefined, children[i]);
    }
  }
  if (sel[0] === 's' && sel[1] === 'v' && sel[2] === 'g') {
    addNS(data, children);
  }
  return VNode(sel, data, children, text, undefined);
};


/***/ }),
/* 159 */
/***/ (function(module, exports) {

function createElement(tagName){
  return document.createElement(tagName);
}

function createElementNS(namespaceURI, qualifiedName){
  return document.createElementNS(namespaceURI, qualifiedName);
}

function createTextNode(text){
  return document.createTextNode(text);
}


function insertBefore(parentNode, newNode, referenceNode){
  parentNode.insertBefore(newNode, referenceNode);
}


function removeChild(node, child){
  node.removeChild(child);
}

function appendChild(node, child){
  node.appendChild(child);
}

function parentNode(node){
  return node.parentElement;
}

function nextSibling(node){
  return node.nextSibling;
}

function tagName(node){
  return node.tagName;
}

function setTextContent(node, text){
  node.textContent = text;
}

module.exports = {
  createElement: createElement,
  createElementNS: createElementNS,
  createTextNode: createTextNode,
  appendChild: appendChild,
  removeChild: removeChild,
  insertBefore: insertBefore,
  parentNode: parentNode,
  nextSibling: nextSibling,
  tagName: tagName,
  setTextContent: setTextContent
};


/***/ }),
/* 160 */
/***/ (function(module, exports) {

var booleanAttrs = ["allowfullscreen", "async", "autofocus", "autoplay", "checked", "compact", "controls", "declare", 
                "default", "defaultchecked", "defaultmuted", "defaultselected", "defer", "disabled", "draggable", 
                "enabled", "formnovalidate", "hidden", "indeterminate", "inert", "ismap", "itemscope", "loop", "multiple", 
                "muted", "nohref", "noresize", "noshade", "novalidate", "nowrap", "open", "pauseonexit", "readonly", 
                "required", "reversed", "scoped", "seamless", "selected", "sortable", "spellcheck", "translate", 
                "truespeed", "typemustmatch", "visible"];
    
var booleanAttrsDict = {};
for(var i=0, len = booleanAttrs.length; i < len; i++) {
  booleanAttrsDict[booleanAttrs[i]] = true;
}
    
function updateAttrs(oldVnode, vnode) {
  var key, cur, old, elm = vnode.elm,
      oldAttrs = oldVnode.data.attrs || {}, attrs = vnode.data.attrs || {};
  
  // update modified attributes, add new attributes
  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      // TODO: add support to namespaced attributes (setAttributeNS)
      if(!cur && booleanAttrsDict[key])
        elm.removeAttribute(key);
      else
        elm.setAttribute(key, cur);
    }
  }
  //remove removed attributes
  // use `in` operator since the previous `for` iteration uses it (.i.e. add even attributes with undefined value)
  // the other option is to remove all attributes with value == undefined
  for (key in oldAttrs) {
    if (!(key in attrs)) {
      elm.removeAttribute(key);
    }
  }
}

module.exports = {create: updateAttrs, update: updateAttrs};


/***/ }),
/* 161 */
/***/ (function(module, exports) {

function updateClass(oldVnode, vnode) {
  var cur, name, elm = vnode.elm,
      oldClass = oldVnode.data.class || {},
      klass = vnode.data.class || {};
  for (name in oldClass) {
    if (!klass[name]) {
      elm.classList.remove(name);
    }
  }
  for (name in klass) {
    cur = klass[name];
    if (cur !== oldClass[name]) {
      elm.classList[cur ? 'add' : 'remove'](name);
    }
  }
}

module.exports = {create: updateClass, update: updateClass};


/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

var is = __webpack_require__(21);

function arrInvoker(arr) {
  return function() {
    if (!arr.length) return;
    // Special case when length is two, for performance
    arr.length === 2 ? arr[0](arr[1]) : arr[0].apply(undefined, arr.slice(1));
  };
}

function fnInvoker(o) {
  return function(ev) { 
    if (o.fn === null) return;
    o.fn(ev); 
  };
}

function updateEventListeners(oldVnode, vnode) {
  var name, cur, old, elm = vnode.elm,
      oldOn = oldVnode.data.on || {}, on = vnode.data.on;
  if (!on) return;
  for (name in on) {
    cur = on[name];
    old = oldOn[name];
    if (old === undefined) {
      if (is.array(cur)) {
        elm.addEventListener(name, arrInvoker(cur));
      } else {
        cur = {fn: cur};
        on[name] = cur;
        elm.addEventListener(name, fnInvoker(cur));
      }
    } else if (is.array(old)) {
      // Deliberately modify old array since it's captured in closure created with `arrInvoker`
      old.length = cur.length;
      for (var i = 0; i < old.length; ++i) old[i] = cur[i];
      on[name]  = old;
    } else {
      old.fn = cur;
      on[name] = old;
    }
  }
  if (oldOn) {
    for (name in oldOn) {
      if (on[name] === undefined) {
        var old = oldOn[name];
        if (is.array(old)) {
          old.length = 0;
        }
        else {
          old.fn = null;
        }
      }
    }
  }
}

module.exports = {create: updateEventListeners, update: updateEventListeners};


/***/ }),
/* 163 */
/***/ (function(module, exports) {

var raf = (typeof window !== 'undefined' && window.requestAnimationFrame) || setTimeout;
var nextFrame = function(fn) { raf(function() { raf(fn); }); };

function setNextFrame(obj, prop, val) {
  nextFrame(function() { obj[prop] = val; });
}

function getTextNodeRect(textNode) {
  var rect;
  if (document.createRange) {
    var range = document.createRange();
    range.selectNodeContents(textNode);
    if (range.getBoundingClientRect) {
        rect = range.getBoundingClientRect();
    }
  }
  return rect;
}

function calcTransformOrigin(isTextNode, textRect, boundingRect) {
  if (isTextNode) {
    if (textRect) {
      //calculate pixels to center of text from left edge of bounding box
      var relativeCenterX = textRect.left + textRect.width/2 - boundingRect.left;
      var relativeCenterY = textRect.top + textRect.height/2 - boundingRect.top;
      return relativeCenterX + 'px ' + relativeCenterY + 'px';
    }
  }
  return '0 0'; //top left
}

function getTextDx(oldTextRect, newTextRect) {
  if (oldTextRect && newTextRect) {
    return ((oldTextRect.left + oldTextRect.width/2) - (newTextRect.left + newTextRect.width/2));
  }
  return 0;
}
function getTextDy(oldTextRect, newTextRect) {
  if (oldTextRect && newTextRect) {
    return ((oldTextRect.top + oldTextRect.height/2) - (newTextRect.top + newTextRect.height/2));
  }
  return 0;
}

function isTextElement(elm) {
  return elm.childNodes.length === 1 && elm.childNodes[0].nodeType === 3;
}

var removed, created;

function pre(oldVnode, vnode) {
  removed = {};
  created = [];
}

function create(oldVnode, vnode) {
  var hero = vnode.data.hero;
  if (hero && hero.id) {
    created.push(hero.id);
    created.push(vnode);
  }
}

function destroy(vnode) {
  var hero = vnode.data.hero;
  if (hero && hero.id) {
    var elm = vnode.elm;
    vnode.isTextNode = isTextElement(elm); //is this a text node?
    vnode.boundingRect = elm.getBoundingClientRect(); //save the bounding rectangle to a new property on the vnode
    vnode.textRect = vnode.isTextNode ? getTextNodeRect(elm.childNodes[0]) : null; //save bounding rect of inner text node
    var computedStyle = window.getComputedStyle(elm, null); //get current styles (includes inherited properties)
    vnode.savedStyle = JSON.parse(JSON.stringify(computedStyle)); //save a copy of computed style values
    removed[hero.id] = vnode;
  }
}

function post() {
  var i, id, newElm, oldVnode, oldElm, hRatio, wRatio,
      oldRect, newRect, dx, dy, origTransform, origTransition,
      newStyle, oldStyle, newComputedStyle, isTextNode,
      newTextRect, oldTextRect;
  for (i = 0; i < created.length; i += 2) {
    id = created[i];
    newElm = created[i+1].elm;
    oldVnode = removed[id];
    if (oldVnode) {
      isTextNode = oldVnode.isTextNode && isTextElement(newElm); //Are old & new both text?
      newStyle = newElm.style;
      newComputedStyle = window.getComputedStyle(newElm, null); //get full computed style for new element
      oldElm = oldVnode.elm;
      oldStyle = oldElm.style;
      //Overall element bounding boxes
      newRect = newElm.getBoundingClientRect();
      oldRect = oldVnode.boundingRect; //previously saved bounding rect
      //Text node bounding boxes & distances
      if (isTextNode) {
        newTextRect = getTextNodeRect(newElm.childNodes[0]);
        oldTextRect = oldVnode.textRect;
        dx = getTextDx(oldTextRect, newTextRect);
        dy = getTextDy(oldTextRect, newTextRect);
      } else {
        //Calculate distances between old & new positions
        dx = oldRect.left - newRect.left;
        dy = oldRect.top - newRect.top;
      }
      hRatio = newRect.height / (Math.max(oldRect.height, 1));
      wRatio = isTextNode ? hRatio : newRect.width / (Math.max(oldRect.width, 1)); //text scales based on hRatio
      // Animate new element
      origTransform = newStyle.transform;
      origTransition = newStyle.transition;
      if (newComputedStyle.display === 'inline') //inline elements cannot be transformed
        newStyle.display = 'inline-block';        //this does not appear to have any negative side effects
      newStyle.transition = origTransition + 'transform 0s';
      newStyle.transformOrigin = calcTransformOrigin(isTextNode, newTextRect, newRect);
      newStyle.opacity = '0';
      newStyle.transform = origTransform + 'translate('+dx+'px, '+dy+'px) ' +
                               'scale('+1/wRatio+', '+1/hRatio+')';
      setNextFrame(newStyle, 'transition', origTransition);
      setNextFrame(newStyle, 'transform', origTransform);
      setNextFrame(newStyle, 'opacity', '1');
      // Animate old element
      for (var key in oldVnode.savedStyle) { //re-apply saved inherited properties
        if (parseInt(key) != key) {
          var ms = key.substring(0,2) === 'ms';
          var moz = key.substring(0,3) === 'moz';
          var webkit = key.substring(0,6) === 'webkit';
      	  if (!ms && !moz && !webkit) //ignore prefixed style properties
        	  oldStyle[key] = oldVnode.savedStyle[key];
        }
      }
      oldStyle.position = 'absolute';
      oldStyle.top = oldRect.top + 'px'; //start at existing position
      oldStyle.left = oldRect.left + 'px';
      oldStyle.width = oldRect.width + 'px'; //Needed for elements who were sized relative to their parents
      oldStyle.height = oldRect.height + 'px'; //Needed for elements who were sized relative to their parents
      oldStyle.margin = 0; //Margin on hero element leads to incorrect positioning
      oldStyle.transformOrigin = calcTransformOrigin(isTextNode, oldTextRect, oldRect);
      oldStyle.transform = '';
      oldStyle.opacity = '1';
      document.body.appendChild(oldElm);
      setNextFrame(oldStyle, 'transform', 'translate('+ -dx +'px, '+ -dy +'px) scale('+wRatio+', '+hRatio+')'); //scale must be on far right for translate to be correct
      setNextFrame(oldStyle, 'opacity', '0');
      oldElm.addEventListener('transitionend', function(ev) {
        if (ev.propertyName === 'transform')
          document.body.removeChild(ev.target);
      });
    }
  }
  removed = created = undefined;
}

module.exports = {pre: pre, create: create, destroy: destroy, post: post};


/***/ }),
/* 164 */
/***/ (function(module, exports) {

function updateProps(oldVnode, vnode) {
  var key, cur, old, elm = vnode.elm,
      oldProps = oldVnode.data.props || {}, props = vnode.data.props || {};
  for (key in oldProps) {
    if (!props[key]) {
      delete elm[key];
    }
  }
  for (key in props) {
    cur = props[key];
    old = oldProps[key];
    if (old !== cur && (key !== 'value' || elm[key] !== cur)) {
      elm[key] = cur;
    }
  }
}

module.exports = {create: updateProps, update: updateProps};


/***/ }),
/* 165 */
/***/ (function(module, exports) {

var raf = (typeof window !== 'undefined' && window.requestAnimationFrame) || setTimeout;
var nextFrame = function(fn) { raf(function() { raf(fn); }); };

function setNextFrame(obj, prop, val) {
  nextFrame(function() { obj[prop] = val; });
}

function updateStyle(oldVnode, vnode) {
  var cur, name, elm = vnode.elm,
      oldStyle = oldVnode.data.style || {},
      style = vnode.data.style || {},
      oldHasDel = 'delayed' in oldStyle;
  for (name in oldStyle) {
    if (!style[name]) {
      elm.style[name] = '';
    }
  }
  for (name in style) {
    cur = style[name];
    if (name === 'delayed') {
      for (name in style.delayed) {
        cur = style.delayed[name];
        if (!oldHasDel || cur !== oldStyle.delayed[name]) {
          setNextFrame(elm.style, name, cur);
        }
      }
    } else if (name !== 'remove' && cur !== oldStyle[name]) {
      elm.style[name] = cur;
    }
  }
}

function applyDestroyStyle(vnode) {
  var style, name, elm = vnode.elm, s = vnode.data.style;
  if (!s || !(style = s.destroy)) return;
  for (name in style) {
    elm.style[name] = style[name];
  }
}

function applyRemoveStyle(vnode, rm) {
  var s = vnode.data.style;
  if (!s || !s.remove) {
    rm();
    return;
  }
  var name, elm = vnode.elm, idx, i = 0, maxDur = 0,
      compStyle, style = s.remove, amount = 0, applied = [];
  for (name in style) {
    applied.push(name);
    elm.style[name] = style[name];
  }
  compStyle = getComputedStyle(elm);
  var props = compStyle['transition-property'].split(', ');
  for (; i < props.length; ++i) {
    if(applied.indexOf(props[i]) !== -1) amount++;
  }
  elm.addEventListener('transitionend', function(ev) {
    if (ev.target === elm) --amount;
    if (amount === 0) rm();
  });
}

module.exports = {create: updateStyle, update: updateStyle, destroy: applyDestroyStyle, remove: applyRemoveStyle};


/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// jshint newcap: false
/* global require, module, document, Node */


var VNode = __webpack_require__(35);
var is = __webpack_require__(21);
var domApi = __webpack_require__(159);

function isUndef(s) { return s === undefined; }
function isDef(s) { return s !== undefined; }

var emptyNode = VNode('', {}, [], undefined, undefined);

function sameVnode(vnode1, vnode2) {
  return vnode1.key === vnode2.key && vnode1.sel === vnode2.sel;
}

function createKeyToOldIdx(children, beginIdx, endIdx) {
  var i, map = {}, key;
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) map[key] = i;
  }
  return map;
}

var hooks = ['create', 'update', 'remove', 'destroy', 'pre', 'post'];

function init(modules, api) {
  var i, j, cbs = {};

  if (isUndef(api)) api = domApi;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (modules[j][hooks[i]] !== undefined) cbs[hooks[i]].push(modules[j][hooks[i]]);
    }
  }

  function emptyNodeAt(elm) {
    return VNode(api.tagName(elm).toLowerCase(), {}, [], undefined, elm);
  }

  function createRmCb(childElm, listeners) {
    return function() {
      if (--listeners === 0) {
        var parent = api.parentNode(childElm);
        api.removeChild(parent, childElm);
      }
    };
  }

  function createElm(vnode, insertedVnodeQueue) {
    var i, data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) {
        i(vnode);
        data = vnode.data;
      }
    }
    var elm, children = vnode.children, sel = vnode.sel;
    if (isDef(sel)) {
      // Parse selector
      var hashIdx = sel.indexOf('#');
      var dotIdx = sel.indexOf('.', hashIdx);
      var hash = hashIdx > 0 ? hashIdx : sel.length;
      var dot = dotIdx > 0 ? dotIdx : sel.length;
      var tag = hashIdx !== -1 || dotIdx !== -1 ? sel.slice(0, Math.min(hash, dot)) : sel;
      elm = vnode.elm = isDef(data) && isDef(i = data.ns) ? api.createElementNS(i, tag)
                                                          : api.createElement(tag);
      if (hash < dot) elm.id = sel.slice(hash + 1, dot);
      if (dotIdx > 0) elm.className = sel.slice(dot+1).replace(/\./g, ' ');
      if (is.array(children)) {
        for (i = 0; i < children.length; ++i) {
          api.appendChild(elm, createElm(children[i], insertedVnodeQueue));
        }
      } else if (is.primitive(vnode.text)) {
        api.appendChild(elm, api.createTextNode(vnode.text));
      }
      for (i = 0; i < cbs.create.length; ++i) cbs.create[i](emptyNode, vnode);
      i = vnode.data.hook; // Reuse variable
      if (isDef(i)) {
        if (i.create) i.create(emptyNode, vnode);
        if (i.insert) insertedVnodeQueue.push(vnode);
      }
    } else {
      elm = vnode.elm = api.createTextNode(vnode.text);
    }
    return vnode.elm;
  }

  function addVnodes(parentElm, before, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      api.insertBefore(parentElm, createElm(vnodes[startIdx], insertedVnodeQueue), before);
    }
  }

  function invokeDestroyHook(vnode) {
    var i, j, data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) i(vnode);
      for (i = 0; i < cbs.destroy.length; ++i) cbs.destroy[i](vnode);
      if (isDef(i = vnode.children)) {
        for (j = 0; j < vnode.children.length; ++j) {
          invokeDestroyHook(vnode.children[j]);
        }
      }
    }
  }

  function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var i, listeners, rm, ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.sel)) {
          invokeDestroyHook(ch);
          listeners = cbs.remove.length + 1;
          rm = createRmCb(ch.elm, listeners);
          for (i = 0; i < cbs.remove.length; ++i) cbs.remove[i](ch, rm);
          if (isDef(i = ch.data) && isDef(i = i.hook) && isDef(i = i.remove)) {
            i(ch, rm);
          } else {
            rm();
          }
        } else { // Text node
          api.removeChild(parentElm, ch.elm);
        }
      }
    }
  }

  function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue) {
    var oldStartIdx = 0, newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, elmToMove, before;

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        api.insertBefore(parentElm, oldStartVnode.elm, api.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        api.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
        idxInOld = oldKeyToIdx[newStartVnode.key];
        if (isUndef(idxInOld)) { // New element
          api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
          newStartVnode = newCh[++newStartIdx];
        } else {
          elmToMove = oldCh[idxInOld];
          patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
          oldCh[idxInOld] = undefined;
          api.insertBefore(parentElm, elmToMove.elm, oldStartVnode.elm);
          newStartVnode = newCh[++newStartIdx];
        }
      }
    }
    if (oldStartIdx > oldEndIdx) {
      before = isUndef(newCh[newEndIdx+1]) ? null : newCh[newEndIdx+1].elm;
      addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function patchVnode(oldVnode, vnode, insertedVnodeQueue) {
    var i, hook;
    if (isDef(i = vnode.data) && isDef(hook = i.hook) && isDef(i = hook.prepatch)) {
      i(oldVnode, vnode);
    }
    var elm = vnode.elm = oldVnode.elm, oldCh = oldVnode.children, ch = vnode.children;
    if (oldVnode === vnode) return;
    if (!sameVnode(oldVnode, vnode)) {
      var parentElm = api.parentNode(oldVnode.elm);
      elm = createElm(vnode, insertedVnodeQueue);
      api.insertBefore(parentElm, elm, oldVnode.elm);
      removeVnodes(parentElm, [oldVnode], 0, 0);
      return;
    }
    if (isDef(vnode.data)) {
      for (i = 0; i < cbs.update.length; ++i) cbs.update[i](oldVnode, vnode);
      i = vnode.data.hook;
      if (isDef(i) && isDef(i = i.update)) i(oldVnode, vnode);
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue);
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) api.setTextContent(elm, '');
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        api.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      api.setTextContent(elm, vnode.text);
    }
    if (isDef(hook) && isDef(i = hook.postpatch)) {
      i(oldVnode, vnode);
    }
  }

  return function(oldVnode, vnode) {
    var i, elm, parent;
    var insertedVnodeQueue = [];
    for (i = 0; i < cbs.pre.length; ++i) cbs.pre[i]();

    if (isUndef(oldVnode.sel)) {
      oldVnode = emptyNodeAt(oldVnode);
    }

    if (sameVnode(oldVnode, vnode)) {
      patchVnode(oldVnode, vnode, insertedVnodeQueue);
    } else {
      elm = oldVnode.elm;
      parent = api.parentNode(elm);

      createElm(vnode, insertedVnodeQueue);

      if (parent !== null) {
        api.insertBefore(parent, vnode.elm, api.nextSibling(elm));
        removeVnodes(parent, [oldVnode], 0, 0);
      }
    }

    for (i = 0; i < insertedVnodeQueue.length; ++i) {
      insertedVnodeQueue[i].data.hook.insert(insertedVnodeQueue[i]);
    }
    for (i = 0; i < cbs.post.length; ++i) cbs.post[i]();
    return vnode;
  };
}

module.exports = {init: init};


/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

var h = __webpack_require__(158);

function copyToThunk(vnode, thunk) {
  thunk.elm = vnode.elm;
  vnode.data.fn = thunk.data.fn;
  vnode.data.args = thunk.data.args;
  thunk.data = vnode.data;
  thunk.children = vnode.children;
  thunk.text = vnode.text;
  thunk.elm = vnode.elm;
}

function init(thunk) {
  var i, cur = thunk.data;
  var vnode = cur.fn.apply(undefined, cur.args);
  copyToThunk(vnode, thunk);
}

function prepatch(oldVnode, thunk) {
  var i, old = oldVnode.data, cur = thunk.data, vnode;
  var oldArgs = old.args, args = cur.args;
  if (old.fn !== cur.fn || oldArgs.length !== args.length) {
    copyToThunk(cur.fn.apply(undefined, args), thunk);
  }
  for (i = 0; i < args.length; ++i) {
    if (oldArgs[i] !== args[i]) {
      copyToThunk(cur.fn.apply(undefined, args), thunk);
      return;
    }
  }
  copyToThunk(oldVnode, thunk);
}

module.exports = function(sel, key, fn, args) {
  if (args === undefined) {
    args = fn;
    fn = key;
    key = undefined;
  }
  return h(sel, {
    key: key,
    hook: {init: init, prepatch: prepatch},
    fn: fn,
    args: args
  });
};


/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function (str) {
	return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
		return '%' + c.charCodeAt(0).toString(16).toUpperCase();
	});
};


/***/ }),
/* 169 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(170);
/* harmony export (immutable) */ __webpack_exports__["default"] = switchPath;

function switchPathInputGuard(path, routes) {
    if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* isPattern */])(path)) {
        throw new Error("First parameter to switchPath must be a route path.");
    }
    if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isRouteDefinition */])(routes)) {
        throw new Error("Second parameter to switchPath must be an object " +
            "containing route patterns.");
    }
}
function validatePath(sourcePath, matchedPath) {
    var sourceParts = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["c" /* splitPath */])(sourcePath);
    var matchedParts = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["c" /* splitPath */])(matchedPath);
    for (var i = 0; i < matchedParts.length; ++i) {
        if (matchedParts[i] !== sourceParts[i]) {
            return null;
        }
    }
    return "/" + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* extractPartial */])(sourcePath, matchedPath);
}
function betterMatch(candidate, reference) {
    if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["e" /* isNotNull */])(candidate)) {
        return false;
    }
    if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["e" /* isNotNull */])(reference)) {
        return true;
    }
    if (!validatePath(candidate, reference)) {
        return false;
    }
    return candidate.length >= reference.length;
}
function matchesWithParams(sourcePath, pattern) {
    var sourceParts = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["c" /* splitPath */])(sourcePath);
    var patternParts = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["c" /* splitPath */])(pattern);
    var params = patternParts
        .map(function (part, i) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["f" /* isParam */])(part) ? sourceParts[i] : null; })
        .filter(__WEBPACK_IMPORTED_MODULE_0__util__["e" /* isNotNull */]);
    var matched = patternParts
        .every(function (part, i) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["f" /* isParam */])(part) || part === sourceParts[i]; });
    return matched ? params : [];
}
function getParamFnValue(paramFn, params) {
    var _paramFn = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isRouteDefinition */])(paramFn) ? paramFn["/"] : paramFn;
    return typeof _paramFn === "function" ? _paramFn.apply(void 0, params) : _paramFn;
}
function validate(_a) {
    var sourcePath = _a.sourcePath, matchedPath = _a.matchedPath, matchedValue = _a.matchedValue, routes = _a.routes;
    var path = matchedPath ? validatePath(sourcePath, matchedPath) : null;
    var value = matchedValue;
    if (!path) {
        path = routes["*"] ? sourcePath : null;
        value = path ? routes["*"] : null;
    }
    return { path: path, value: value };
}
function switchPath(sourcePath, routes) {
    switchPathInputGuard(sourcePath, routes);
    var matchedPath = null;
    var matchedValue = null;
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["g" /* traverseRoutes */])(routes, function matchPattern(pattern) {
        if (sourcePath.search(pattern) === 0 && betterMatch(pattern, matchedPath)) {
            matchedPath = pattern;
            matchedValue = routes[pattern];
        }
        var params = matchesWithParams(sourcePath, pattern).filter(Boolean);
        if (params.length > 0 && betterMatch(sourcePath, matchedPath)) {
            matchedPath = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* extractPartial */])(sourcePath, pattern);
            matchedValue = getParamFnValue(routes[pattern], params);
        }
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isRouteDefinition */])(routes[pattern]) && params.length === 0) {
            if (sourcePath !== "/") {
                var child = switchPath(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["h" /* unprefixed */])(sourcePath, pattern) || "/", routes[pattern]);
                var nestedPath = pattern + child.path;
                if (child.path !== null &&
                    betterMatch(nestedPath, matchedPath)) {
                    matchedPath = nestedPath;
                    matchedValue = child.value;
                }
            }
        }
    });
    return validate({ sourcePath: sourcePath, matchedPath: matchedPath, matchedValue: matchedValue, routes: routes });
}
//# sourceMappingURL=index.js.map

/***/ }),
/* 170 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = isPattern;
/* harmony export (immutable) */ __webpack_exports__["b"] = isRouteDefinition;
/* harmony export (immutable) */ __webpack_exports__["g"] = traverseRoutes;
/* harmony export (immutable) */ __webpack_exports__["e"] = isNotNull;
/* harmony export (immutable) */ __webpack_exports__["c"] = splitPath;
/* harmony export (immutable) */ __webpack_exports__["f"] = isParam;
/* harmony export (immutable) */ __webpack_exports__["d"] = extractPartial;
/* harmony export (immutable) */ __webpack_exports__["h"] = unprefixed;
function isPattern(candidate) {
    return candidate.charAt(0) === "/" || candidate === "*";
}
function isRouteDefinition(candidate) {
    return !candidate || typeof candidate !== "object" ?
        false : isPattern(Object.keys(candidate)[0]);
}
function traverseRoutes(routes, callback) {
    var keys = Object.keys(routes);
    for (var i = 0; i < keys.length; ++i) {
        var pattern = keys[i];
        if (pattern === "*")
            continue;
        callback(pattern);
    }
}
function isNotNull(candidate) {
    return candidate !== null;
}
function splitPath(path) {
    return path.split("/").filter(function (s) { return !!s; });
}
function isParam(candidate) {
    return candidate.match(/:\w+/) !== null;
}
function extractPartial(sourcePath, pattern) {
    var patternParts = splitPath(pattern);
    var sourceParts = splitPath(sourcePath);
    var matchedParts = [];
    for (var i = 0; i < patternParts.length; ++i) {
        matchedParts.push(sourceParts[i]);
    }
    return matchedParts.filter(isNotNull).join("/");
}
function unprefixed(fullString, prefix) {
    return fullString.split(prefix)[1];
}
//# sourceMappingURL=util.js.map

/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(172);


/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, module) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ponyfill = __webpack_require__(173);

var _ponyfill2 = _interopRequireDefault(_ponyfill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var root; /* global window */


if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (true) {
  root = module;
} else {
  root = Function('return this')();
}

var result = (0, _ponyfill2['default'])(root);
exports['default'] = result;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(37), __webpack_require__(60)(module)))

/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports['default'] = symbolObservablePonyfill;
function symbolObservablePonyfill(root) {
	var result;
	var _Symbol = root.Symbol;

	if (typeof _Symbol === 'function') {
		if (_Symbol.observable) {
			result = _Symbol.observable;
		} else {
			result = _Symbol('observable');
			_Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
};

/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var UI = __webpack_require__(58);
var xstream_1 = __webpack_require__(0);
// tslint:disable-next-line:no-unused-variable
var dom_1 = __webpack_require__(1);
var Index;
(function (Index) {
    function run(sources) {
        var vTree$ = xstream_1.default.of(dom_1.div(".centered", [
            UI.Container.render([
                UI.Grid.render({ centered: true }, [
                    UI.Row.render([
                        UI.Header.render({ size: UI.Size.Huge }, "Welcome.", {
                            subtext: "At the moment the docs are a WIP. Planned pages are scaffolded in the sidemenu."
                        }),
                    ])
                ])
            ])
        ]));
        return {
            DOM: vTree$,
            router: xstream_1.default.never()
        };
    }
    Index.run = run;
})(Index = exports.Index || (exports.Index = {}));


/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// tslint:disable-next-line:no-unused-variable
var xstream_1 = __webpack_require__(0);
// tslint:disable-next-line:no-unused-variable
var dom_1 = __webpack_require__(1);
var sidebar_1 = __webpack_require__(176);
var Layout;
(function (Layout) {
    function run(sources, page) {
        /*** Create components ***/
        var sidebar = sidebar_1.Sidebar.run(sources);
        /*** Compose view ***/
        var vTree$ = xstream_1.default.combine(sidebar.DOM, page.DOM)
            .map(function (_a) {
            var sidebar = _a[0], page = _a[1];
            return dom_1.div(".full.height", [
                dom_1.div(".content.pusher", [
                    sidebar,
                    page
                ]),
            ]);
        });
        return {
            DOM: vTree$,
            router: page.router
        };
    }
    Layout.run = run;
})(Layout = exports.Layout || (exports.Layout = {}));


/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var UI = __webpack_require__(58);
var xstream_1 = __webpack_require__(0);
// tslint:disable-next-line:no-unused-variable
var dom_1 = __webpack_require__(1);
var Sidebar;
(function (Sidebar) {
    function run(sources) {
        var currentPage$ = sources.router.history$.map(function (x) { return x.pathname; });
        var vTree$ = currentPage$.map(function (page) {
            return dom_1.div(".left.menu", [
                dom_1.div(".fixed", [
                    UI.Menu.render({
                        vertical: true, inverted: true,
                        attachment: UI.Attachment.None, size: UI.Size.Fluid
                    }, [{
                            header: true,
                            body: ["Introduction", UI.Menu.render({ submenu: true, }, [{
                                        link: true, href: "/", active: page === "/" || page === "/home",
                                        body: "About"
                                    }])]
                        },
                        {
                            header: true,
                            body: ["Elements", UI.Menu.render({ submenu: true, }, [{
                                        link: true, href: "/elements/button", active: page === "/elements/button",
                                        body: "Button"
                                    }, {
                                        link: true, href: "/elements/container", active: page === "/elements/container",
                                        body: "Container"
                                    }, {
                                        link: true, href: "/elements/divider", active: page === "/elements/divider",
                                        body: "Divider"
                                    }, {
                                        link: true, href: "/elements/header", active: page === "/elements/header",
                                        body: "Header"
                                    }, {
                                        link: true, href: "/elements/icon", active: page === "/elements/icon",
                                        body: "Icon"
                                    }, {
                                        link: true, href: "/elements/image", active: page === "/elements/image",
                                        body: "Image"
                                    }, {
                                        link: true, href: "/elements/label", active: page === "/elements/label",
                                        body: "Label"
                                    }, {
                                        link: true, href: "/elements/list", active: page === "/elements/list",
                                        body: "List"
                                    }, {
                                        link: true, href: "/elements/loader", active: page === "/elements/loader",
                                        body: "Loader"
                                    }, {
                                        link: true, href: "/elements/segment", active: page === "/elements/segment",
                                        body: "Segment"
                                    }, {
                                        link: true, href: "/elements/step", active: page === "/elements/step",
                                        body: "Step"
                                    }, {
                                        link: true, href: "/elements/textbox", active: page === "/elements/textbox",
                                        body: "Textbox"
                                    }])]
                        },
                        {
                            header: true,
                            body: ["Collections", UI.Menu.render({ submenu: true, }, [{
                                        link: true, href: "/collections/breadcrumb", active: page === "/collections/breadcrumb",
                                        body: "Breadcrumb"
                                    }, {
                                        link: true, href: "/collections/form", active: page === "/collections/form",
                                        body: "Form"
                                    }, {
                                        link: true, href: "/collections/grid", active: page === "/collections/grid",
                                        body: "Grid"
                                    }, {
                                        link: true, href: "/collections/menu", active: page === "/collections/menu",
                                        body: "Menu"
                                    }, {
                                        link: true, href: "/collections/message", active: page === "/collections/message",
                                        body: "Message"
                                    }, {
                                        link: true, href: "/collections/table", active: page === "/collections/table",
                                        body: "Table"
                                    }])]
                        },
                        {
                            header: true,
                            body: ["Modules", UI.Menu.render({ submenu: true, }, [{
                                        link: true, href: "/modules/checkbox", active: page === "/modules/checkbox",
                                        body: "Checkbox"
                                    }, {
                                        link: true, href: "/modules/dimmer", active: page === "/modules/dimmer",
                                        body: "Dimmer"
                                    }, {
                                        link: true, href: "/modules/dropdown", active: page === "/modules/dropdown",
                                        body: "Dropdown"
                                    }, {
                                        link: true, href: "/modules/modal", active: page === "/modules/modal",
                                        body: "Modal"
                                    }, {
                                        link: true, href: "/modules/popup", active: page === "/modules/popup",
                                        body: "Popup"
                                    }, {
                                        link: true, href: "/modules/progress", active: page === "/modules/progress",
                                        body: "Progress"
                                    }, {
                                        link: true, href: "/modules/transition", active: page === "/modules/transition",
                                        body: "Transition"
                                    }])]
                        },
                        {
                            header: true,
                            body: ["Views", UI.Menu.render({ submenu: true, }, [{
                                        link: true, href: "/views/statistic", active: page === "/views/statistic",
                                        body: "Statistic"
                                    }])]
                        }])
                ])
            ]);
        });
        return {
            DOM: vTree$,
            router: xstream_1.default.never()
        };
    }
    Sidebar.run = run;
})(Sidebar = exports.Sidebar || (exports.Sidebar = {}));


/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isolate_1 = __webpack_require__(2);
var xstream_1 = __webpack_require__(0);
var callPage = function (sources) {
    return function (_a) {
        var path = _a.path, value = _a.value;
        var pSources = Object.assign({}, sources, { router: sources.router.path(path) });
        var isolatedPage = isolate_1.default(value)(pSources);
        return isolatedPage;
    };
};
function propOrNever(key, x) {
    if (x.hasOwnProperty(key)) {
        return x[key];
    }
    return xstream_1.default.never();
}
function flattenByKey(key, stream) {
    return stream.map(function (x) { return propOrNever(key, x); }).flatten();
}
function ComponentRouter(sources) {
    var component$ = sources.router.define(sources.routes)
        .map(function (route) { return callPage(sources)(route); })
        .remember()
        .debug(function () { }); //State$ does not work without this line. Unable to reproduce in webpackbin.
    var pluck = function (key) { return flattenByKey(key, component$); };
    var sinks = {
        pluck: pluck,
        DOM: pluck("DOM"),
        router: pluck("router"),
    };
    return sinks;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (sources) { return isolate_1.default(ComponentRouter)(sources); };


/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var index_1 = __webpack_require__(174);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    "/": index_1.Index.run
};


/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dom_1 = __webpack_require__(1);
var xstream_1 = __webpack_require__(0);
var isolate_1 = __webpack_require__(2);
var Breadcrumb;
(function (Breadcrumb) {
    /**
     * An interactive Breadcrumb component for displaying a history of links.
     * Accepts the following properties in props$:
     *  arrow?: boolean - Styles the breadcrumb to use arrow icons.
     *  checvron?: boolean - Styles the breadcrumb to use chevron icons.
     * Expects the following type of content: Array of {}
     *   active?: boolean - Highlights the section as the current state.
     *   text?: string - The text for the section.
     *   href?: string - The location for the section to point towards.
     */
    function run(sources) {
        function main(sources) {
            sources.props$ = sources.props$ ? sources.props$ : xstream_1.default.of({});
            sources.content$ = sources.content$ ? sources.content$ : xstream_1.default.of([]);
            var breadcrumb$ = xstream_1.default.combine(sources.props$, sources.content$).map(function (_a) {
                var props = _a[0], content = _a[1];
                return render(props, content);
            });
            return {
                DOM: breadcrumb$,
                Events: function (type) { return sources.DOM.select(".breadcrumb").events(type); },
            };
        }
        var isolatedMain = isolate_1.default(main);
        return isolatedMain(sources);
    }
    Breadcrumb.run = run;
    /**
     * A static Breadcrumb component for displaying a history of links.
     * Accepts the following properties
     *  arrow?: boolean - Styles the breadcrumb to use arrow icons.
     *  checvron?: boolean - Styles the breadcrumb to use chevron icons.
     * Expects the following type of content: Array of {}
     *   active?: boolean - Highlights the section as the current state.
     *   text?: string - The text for the section.
     *   href?: string - The location for the section to point towards.
     */
    function render(pOrC, c) {
        if (pOrC === void 0) { pOrC = {}; }
        if (c === void 0) { c = []; }
        var props = isContent(pOrC) ? {} : pOrC;
        var content = isContent(pOrC) ? pOrC : c;
        var children = content.map(function (c) { return [
            section(c), divider(props)
        ]; }).reduce(function (a, n) { return a.concat(n); });
        children.splice(-1, 1);
        return dom_1.div({ props: { className: "ui breadcrumb" } }, children);
    }
    Breadcrumb.render = render;
    function section(section) {
        return section.active
            ? dom_1.div({ props: { className: "active section" } }, section.text)
            : dom_1.a({ props: { className: "section", href: section.href } }, section.text);
    }
    function divider(props) {
        return dom_1.span({ props: { className: "divider" } }, dividerIcon(props));
    }
    function dividerIcon(props) {
        if (props.arrow) {
            return dom_1.i({ props: { className: "right arrow icon divider" } });
        }
        if (props.chevron) {
            return dom_1.i({ props: { className: "right chevron icon divider" } });
        }
        return (" / ");
    }
    function isContent(propsOrContent) {
        return propsOrContent !== undefined && propsOrContent.push !== undefined;
    }
})(Breadcrumb = exports.Breadcrumb || (exports.Breadcrumb = {}));


/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var interfaces_1 = __webpack_require__(4);
var utils_1 = __webpack_require__(9);
var xstream_1 = __webpack_require__(0);
var isolate_1 = __webpack_require__(2);
var dom_1 = __webpack_require__(1);
var Field;
(function (Field) {
    /**
     * Wraps content in a Field suitable for the Form component.
     * Accepts the following properties in props$:
     *   width?: number - The width of the field in grid columns.
     *   inline?: boolean - Styles the label to be next to the field instead of above it.
     *   centered?: boolean - Styles the content of the field to be centered.
     *   required?: boolean - Styles the field to show it is mandatory.
     * Expects the following type of content in content$: {} of
     *   label?: DOMContent - The label for the field.
     *   body: DOMContent - The field input.
     */
    function run(sources) {
        function main(sources) {
            sources.props$ = sources.props$ ? sources.props$ : xstream_1.default.of({});
            sources.content$ = sources.content$ ? sources.content$ : xstream_1.default.of("");
            sources.extras$ = sources.extras$ ? sources.extras$ : xstream_1.default.of("");
            var vTree$ = xstream_1.default.combine(sources.props$, sources.content$, sources.extras$).map(function (_a) {
                var props = _a[0], content = _a[1], extra = _a[2];
                return render(props, content, extra);
            });
            return {
                DOM: vTree$,
                Events: function (type) { return sources.DOM.select(".field").events(type); },
            };
        }
        var isolatedMain = isolate_1.default(main);
        return isolatedMain(sources);
    }
    Field.run = run;
    /**
     * Wraps content in a Field suitable for the Form component.
     * Accepts the following properties:
     *   width?: number - The width of the field in grid columns.
     *   inline?: boolean - Styles the label to be next to the field instead of above it.
     *   centered?: boolean - Styles the content of the field to be centered.
     *   required?: boolean - Styles the field to show it is mandatory.
     * Expects the following type of content: {} of
     *   label?: DOMContent - The label for the field.
     *   body: DOMContent - The field input.
     */
    function render(pOrC, c, e) {
        if (pOrC === void 0) { pOrC = {}; }
        if (c === void 0) { c = ""; }
        if (e === void 0) { e = ""; }
        var props = interfaces_1.isDOMContent(pOrC) ? {} : pOrC;
        var content = interfaces_1.isDOMContent(pOrC) ? pOrC : c;
        var extra = interfaces_1.isDOMContent(pOrC) ? (c === "") ? e : c : e;
        return dom_1.div({ props: { className: getClassname(props) } }, [].concat(extra ? dom_1.label(extra) : "", content));
    }
    Field.render = render;
    function getClassname(props) {
        var className = "ui";
        if (props.width) {
            className += utils_1.numToText(props.width) + " wide";
        }
        if (props.inline) {
            className += " inline";
        }
        if (props.centered) {
            className += " centered";
        }
        if (props.required) {
            className += " required";
        }
        className += " field";
        return className;
    }
})(Field = exports.Field || (exports.Field = {}));


/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var interfaces_1 = __webpack_require__(4);
var utils_1 = __webpack_require__(9);
var xstream_1 = __webpack_require__(0);
var isolate_1 = __webpack_require__(2);
var dom_1 = __webpack_require__(1);
var Fields;
(function (Fields) {
    /**
     * Wraps multiple related Field components together.
     * Accepts the following properties in props$:
     *   label?: DOMContent - A label for the fields.
     *   equalWidth?: boolean - Divides fields in equal width.
     *   grouped?: boolean - Groups fields together for related choices.
     *   inline?: boolean - Styles the labels to be next to the fields instead of above them.
     * Expects the following type of content in content$: DOMContent
     */
    function run(sources) {
        function main(sources) {
            sources.props$ = sources.props$ ? sources.props$ : xstream_1.default.of({});
            sources.content$ = sources.content$ ? sources.content$ : xstream_1.default.of("");
            var vTree$ = xstream_1.default.combine(sources.props$, sources.content$).map(function (_a) {
                var props = _a[0], content = _a[1];
                return render(props, content);
            });
            return {
                DOM: vTree$,
                Events: function (type) { return sources.DOM.select(".fields").events(type); },
                value$: xstream_1.default.never()
            };
        }
        var isolatedMain = isolate_1.default(main);
        return isolatedMain(sources);
    }
    Fields.run = run;
    /**
     * Wraps multiple related Field components together.
     * Accepts the following properties:
     *   label?: DOMContent - A label for the fields.
     *   equalWidth?: boolean - Divides fields in equal width.
     *   grouped?: boolean - Groups fields together for related choices.
     *   inline?: boolean - Styles the labels to be next to the fields instead of above them.
     *   required?: boolean - Styles the the fields to make them appear mandetory.
     * Expects the following type of content: DOMContent
     */
    function render(pOrC, c) {
        if (pOrC === void 0) { pOrC = {}; }
        if (c === void 0) { c = ""; }
        var props = interfaces_1.isDOMContent(pOrC) ? {} : pOrC;
        var content = interfaces_1.isDOMContent(pOrC) ? pOrC : c;
        var lbl = props.label ? dom_1.label(props.label) : "";
        var children = content.length ? [lbl].concat(content) : [lbl, content];
        return dom_1.div({ props: { className: getClassname(props, content) } }, children);
    }
    Fields.render = render;
    function getClassname(props, content) {
        var className = "ui";
        if (props.equalWidth && content.length) {
            className += utils_1.numToText(content.length);
        }
        if (props.inline) {
            className += " inline";
        }
        if (props.grouped) {
            className += " grouped";
        }
        if (props.required) {
            className += " required";
        }
        className += " fields";
        return className;
    }
})(Fields = exports.Fields || (exports.Fields = {}));


/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var interfaces_1 = __webpack_require__(4);
var enums_1 = __webpack_require__(3);
var xstream_1 = __webpack_require__(0);
var isolate_1 = __webpack_require__(2);
var dom_1 = __webpack_require__(1);
var Form;
(function (Form) {
    /**
     * A form component for capturing groups of user input.
     * Accepts the following properties in props$:
     *   loading?: boolean - Styles the form with a loader.
     *   equalWidth?: boolean - Styles the form content to have equal widths per row.
     *   inverted?: boolean - Styles the form for dark backgrounds.
     *   size?: Size - The size of the form's content.
     * Expects the following type of content in content$: DOMContent
     */
    function run(sources) {
        function main(sources) {
            sources.props$ = sources.props$ ? sources.props$ : xstream_1.default.of({});
            sources.content$ = sources.content$ ? sources.content$ : xstream_1.default.of("");
            var vTree$ = xstream_1.default.combine(sources.props$, sources.content$)
                .map(function (_a) {
                var props = _a[0], content = _a[1];
                return render(props, content);
            });
            return {
                DOM: vTree$,
                Events: function (type) { return sources.DOM.select(".form").events(type); }
            };
        }
        var isolatedMain = isolate_1.default(main);
        return isolatedMain(sources);
    }
    Form.run = run;
    /**
     * A form component for capturing groups of user input.
     * Accepts the following properties:
     *   loading?: boolean - Styles the form with a loader.
     *   equalWidth?: boolean - Styles the form content to have equal widths per row.
     *   inverted?: boolean - Styles the form for dark backgrounds.
     *   size?: Size - The size of the form's content.
     * Expects the following type of content: DOMContent
     */
    function render(pOrC, c) {
        if (pOrC === void 0) { pOrC = {}; }
        if (c === void 0) { c = ""; }
        var props = interfaces_1.isDOMContent(pOrC) ? {} : pOrC;
        var content = interfaces_1.isDOMContent(pOrC) ? pOrC : c;
        return dom_1.div({ props: { className: getClassname(props) } }, content);
    }
    Form.render = render;
    function getClassname(props) {
        var className = "ui";
        if (props.loading) {
            className += " loading";
        }
        if (props.equalWidth) {
            className += " equal width";
        }
        if (props.inverted) {
            className += " inverted";
        }
        if (typeof (props.size) !== "undefined") {
            className += enums_1.Size.ToClassname(props.size);
        }
        className += " form";
        return className;
    }
})(Form = exports.Form || (exports.Form = {}));


/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__(182));
__export(__webpack_require__(180));
__export(__webpack_require__(181));


/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var interfaces_1 = __webpack_require__(4);
var enums_1 = __webpack_require__(3);
var utils_1 = __webpack_require__(9);
var xstream_1 = __webpack_require__(0);
var isolate_1 = __webpack_require__(2);
var dom_1 = __webpack_require__(1);
var Column;
(function (Column) {
    /**
     * Wraps content in a column suitable for the Grid component.
     * Accepts the following properties in props$:
     *   float?: Float - Wether the column should be left or right floated.
     *   width?: int - The default width of the column.
     *   mobile?: int - The width of the column on mobile devices.
     *   tablet?: int - The width of the column on tablet devices.
     *   computer?: int - The width of the column on computer devices.
     *   largescreen?: int - The width of the column on large screen devices.
     *   size?: Size - The size of the column.
     *   alignment?: VerticalAlignment - The vertical alignment of the column.
     *   textAlignment?: TextAlignment - The text alignment of the column.
     * Expects the following type of content in Content$: DOMContent
     */
    function run(sources) {
        function main(sources) {
            sources.props$ = sources.props$ ? sources.props$ : xstream_1.default.of({});
            sources.content$ = sources.content$ ? sources.content$ : xstream_1.default.of("");
            var vTree$ = xstream_1.default.combine(sources.props$, sources.content$).map(function (_a) {
                var props = _a[0], content = _a[1];
                return render(props, content);
            });
            return {
                DOM: vTree$,
                Events: function (type) { return sources.DOM.select(".column").events(type); },
            };
        }
        var isolatedMain = isolate_1.default(main);
        return isolatedMain(sources);
    }
    Column.run = run;
    /**
     * Wraps content in a column suitable for the Grid component.
     * Accepts the following properties:
     *   float?: Float - Wether the column should be left or right floated.
     *   width?: int - The default width of the column.
     *   mobile?: int - The width of the column on mobile devices.
     *   tablet?: int - The width of the column on tablet devices.
     *   computer?: int - The width of the column on computer devices.
     *   largescreen?: int - The width of the column on large screen devices.
     *   size?: Size - The size of the column.
     *   alignment?: VerticalAlignment - The vertical alignment of the column.
     *   textAlignment?: TextAlignment - The text alignment of the column.
     * Expects the following type of content: DOMContent
     */
    function render(pOrC, c) {
        if (pOrC === void 0) { pOrC = {}; }
        if (c === void 0) { c = ""; }
        var props = interfaces_1.isDOMContent(pOrC) ? {} : pOrC;
        var content = interfaces_1.isDOMContent(pOrC) ? pOrC : c;
        return dom_1.div({ props: { className: getClassname(props) } }, content);
    }
    Column.render = render;
    function getClassname(props) {
        var className = "ui";
        if (props.float && props.float === enums_1.Float.Right) {
            className += " right floated";
        }
        if (props.float && props.float === enums_1.Float.Left) {
            className += " left floated";
        }
        if (props.mobile) {
            className += utils_1.numToText(props.mobile) + " wide mobile";
        }
        if (props.tablet) {
            className += utils_1.numToText(props.tablet) + " wide tablet";
        }
        if (props.computer) {
            className += utils_1.numToText(props.computer) + " wide computer";
        }
        if (props.largescreen) {
            className += utils_1.numToText(props.largescreen) + " wide largescreen";
        }
        if (typeof (props.size) !== "undefined") {
            className += enums_1.Size.ToClassname(props.size);
        }
        if (typeof (props.alignment) !== "undefined") {
            className += enums_1.VerticalAlignment.ToClassname(props.alignment);
        }
        if (typeof (props.textAlignment) !== "undefined") {
            className += enums_1.TextAlignment.ToClassname(props.textAlignment);
        }
        if (props.width) {
            className += utils_1.numToText(props.width) + " wide";
        }
        className += " column";
        return className;
    }
})(Column = exports.Column || (exports.Column = {}));


/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var interfaces_1 = __webpack_require__(4);
var enums_1 = __webpack_require__(3);
var utils_1 = __webpack_require__(9);
var xstream_1 = __webpack_require__(0);
var isolate_1 = __webpack_require__(2);
var dom_1 = __webpack_require__(1);
var Grid;
(function (Grid) {
    /**
     * Wraps content in a column suitable for the Grid component.
     * Accepts the following properties in props$:
     *   equallyDivided?: boolean - Styles grid content to take up equal amounts of space.
     *   divided?: boolean - Use dividers to seperate content in the Grid.
     *   container? : boolean - Wraps the grid in a container.
     *   celled?: boolean - Divides the grid into cells.
     *   intCelled?: boolean - Divides the grid into cells with only internal dividers.
     *   padded?: boolean - Adds vertical and horizontal gutters to the grid.
     *   relaxed?: boolean - Increases the amount of negative space.
     *   centered?: boolean - Centers the content of the Grid.
     *   alignment?: VerticalAlignment: Determines the alignment of content in the Grid.
     *   textAlignment?: TextAlignment: Determines the text alignment of content in the Grid.
     * Expects the following type of content in content$: DOMContent
     */
    function run(sources) {
        function main(sources) {
            sources.props$ = sources.props$ ? sources.props$ : xstream_1.default.of({});
            sources.content$ = sources.content$ ? sources.content$ : xstream_1.default.of("");
            var vTree$ = xstream_1.default.combine(sources.props$, sources.content$)
                .map(function (_a) {
                var props = _a[0], content = _a[1];
                return render(props, content);
            });
            return {
                DOM: vTree$,
                Events: function (type) { return sources.DOM.select(".grid").events(type); },
            };
        }
        var isolatedMain = isolate_1.default(main);
        return isolatedMain(sources);
    }
    Grid.run = run;
    /**
     * Wraps content in a column suitable for the Grid component.
     * Accepts the following properties:
     *   equallyDivided?: boolean - Styles grid content to take up equal amounts of space.
     *   divided?: boolean - Use dividers to seperate content in the Grid.
     *   container? : boolean - Wraps the grid in a container.
     *   celled?: boolean - Divides the grid into cells.
     *   intCelled?: boolean - Divides the grid into cells with only internal dividers.
     *   padded?: boolean - Adds vertical and horizontal gutters to the grid.
     *   relaxed?: boolean - Increases the amount of negative space.
     *   centered?: boolean - Centers the content of the Grid.
     *   alignment?: VerticalAlignment: Determines the alignment of content in the Grid.
     *   textAlignment?: TextAlignment: Determines the text alignment of content in the Grid.
     * Expects the following type of content: DOMContent
     */
    function render(pOrC, c) {
        if (pOrC === void 0) { pOrC = {}; }
        if (c === void 0) { c = ""; }
        var props = interfaces_1.isDOMContent(pOrC) ? {} : pOrC;
        var content = interfaces_1.isDOMContent(pOrC) ? pOrC : c;
        return dom_1.div({ props: { className: getClassname(props, content) } }, content);
    }
    Grid.render = render;
    function getClassname(props, content) {
        var className = "ui";
        if (props.equallyDivided) {
            className += utils_1.numToText(content.length ? content.length : 1) + " column";
        }
        if (props.divided) {
            className += " divided";
        }
        if (props.container) {
            className += " container";
        }
        if (props.celled) {
            className += " celled";
        }
        if (props.intCelled) {
            className += " internally celled";
        }
        if (props.padded) {
            className += " padded";
        }
        if (props.relaxed) {
            className += " relaxed";
        }
        if (props.centered) {
            className += " centered";
        }
        if (typeof (props.alignment) !== "undefined") {
            className += enums_1.VerticalAlignment.ToClassname(props.alignment);
        }
        if (typeof (props.textAlignment) !== "undefined") {
            className += enums_1.TextAlignment.ToClassname(props.textAlignment);
        }
        className += " grid";
        return className;
    }
    Grid.getClassname = getClassname;
})(Grid = exports.Grid || (exports.Grid = {}));


/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__(185));
__export(__webpack_require__(187));
__export(__webpack_require__(184));


/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var interfaces_1 = __webpack_require__(4);
var utils_1 = __webpack_require__(9);
var xstream_1 = __webpack_require__(0);
var isolate_1 = __webpack_require__(2);
var dom_1 = __webpack_require__(1);
var Row;
(function (Row) {
    /**
     * Creates a Row component that wraps Column content.
     * Accepts the following properties in props$:
     *   stretched?: boolean - Ensures the columns are stretched to equal height.
     *   mobile?: boolean - Makes the row visible only on mobile devices.
     *   tablet?: boolean - Makes the row visible only on tablet devices.
     *   computer?: boolean - Makes the row visible only on computer devices.
     *   largescreen?: boolean - Makes the row visible only on largescreen devices.
     *   equallyDivided?: boolean - Makes each column of the row equal in width.
     * Expects the following type of content in content$: DOMContent
     */
    function run(sources) {
        function main(sources) {
            sources.props$ = sources.props$ ? sources.props$ : xstream_1.default.of({});
            sources.content$ = sources.content$ ? sources.content$ : xstream_1.default.of("");
            var vTree$ = xstream_1.default.combine(sources.props$, sources.content$).map(function (_a) {
                var props = _a[0], content = _a[1];
                return render(props, content);
            });
            return {
                DOM: vTree$,
                Events: function (type) { return sources.DOM.select(".row").events(type); },
            };
        }
        var isolatedMain = isolate_1.default(main);
        return isolatedMain(sources);
    }
    Row.run = run;
    /**
     * Creates a Row component that wraps Column content.
     * Accepts the following properties:
     *   stretched?: boolean - Ensures the columns are stretched to equal height.
     *   mobile?: boolean - Makes the row visible only on mobile devices.
     *   tablet?: boolean - Makes the row visible only on tablet devices.
     *   computer?: boolean - Makes the row visible only on computer devices.
     *   largescreen?: boolean - Makes the row visible only on largescreen devices.
     *   equallyDivided?: boolean - Makes each column of the row equal in width.
     * Expects the following type of content: DOMContent
     */
    function render(pOrC, c) {
        if (pOrC === void 0) { pOrC = {}; }
        if (c === void 0) { c = ""; }
        var props = interfaces_1.isDOMContent(pOrC) ? {} : pOrC;
        var content = interfaces_1.isDOMContent(pOrC) ? pOrC : c;
        return dom_1.div({ props: { className: getClassname(props, content) } }, content);
    }
    Row.render = render;
    function getClassname(props, content) {
        var className = "ui";
        if (props.stretched) {
            className += " stretched";
        }
        if (props.mobile) {
            className += " mobile only";
        }
        if (props.tablet) {
            className += " tablet only";
        }
        if (props.computer) {
            className += " computer only";
        }
        if (props.largescreen) {
            className += " largescreen only";
        }
        if (props.equallyDivided) {
            className += utils_1.numToText(content.length ? content.length : 1) + " column";
        }
        className += " row";
        return className;
    }
})(Row = exports.Row || (exports.Row = {}));


/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__(179));
__export(__webpack_require__(183));
__export(__webpack_require__(186));
__export(__webpack_require__(59));
__export(__webpack_require__(189));
__export(__webpack_require__(190));


/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var interfaces_1 = __webpack_require__(4);
var enums_1 = __webpack_require__(3);
var xstream_1 = __webpack_require__(0);
var isolate_1 = __webpack_require__(2);
var dom_1 = __webpack_require__(1);
var icon_1 = __webpack_require__(22);
var transition_1 = __webpack_require__(13);
var Message;
(function (Message) {
    /**
     * A message component to present messages to users.
     * Accepts the following properties in props$:
     *   on$?: Stream<boolean> - When to show/hide the message.
     *   closeable?: boolean - Provides a close icon for the message for dismissal.
     *   icon?: boolean - Formats the message to support an icon.
     *   floating?: boolean - Formats the message to float above related content.
     *   compact?: boolean - Formats a message to only occupy width needed by its content.
     *   attached?: boolean - Formats the message to appear attached to other content.
     *   size?: Size - The size of the message.
     *   color?: Color - The color of the message.
     * Expects the following type of content in content$: {}
     *   icon?: String|VNode - A message can have an icon signifying the type of message.
     *   header?: String|VNode - A message can have a header text.
     *   body?: String|VNode - A message can have additionaly body content.
     */
    function run(sources) {
        function main(sources) {
            sources.props$ = sources.props$ ? sources.props$ : xstream_1.default.of({});
            sources.content$ = sources.content$ ? sources.content$ : xstream_1.default.of("");
            var icon = icon_1.Icon.run({ DOM: sources.DOM, props$: xstream_1.default.of({ type: "close" }) });
            var close$ = icon.Events("click").mapTo(false);
            var vTree$ = xstream_1.default.combine(sources.props$, sources.content$, icon.DOM)
                .map(function (_a) {
                var props = _a[0], content = _a[1], closeIcon = _a[2];
                return dom_1.div({ props: { className: getClassname(props) } }, [
                    content.icon,
                    props.closeable ? closeIcon : "",
                    dom_1.div({ props: { className: "content" } }, [].concat(content.header ? dom_1.div({ props: { className: "header" } }, content.header) : "", content.body))
                ]);
            });
            var on$ = sources.props$.map(function (props) { return props.on$ ? props.on$ : xstream_1.default.of(true); }).flatten();
            var active$ = xstream_1.default.merge(on$, close$);
            var transition$ = active$.fold(function (prevAnim, active) { return prevAnim.direction === enums_1.Direction.None
                ? { animation: enums_1.Animation.None, direction: active ? enums_1.Direction.In : enums_1.Direction.Out }
                : { animation: enums_1.Animation.Fade, direction: active ? enums_1.Direction.In : enums_1.Direction.Out }; }, { animation: enums_1.Animation.None, direction: enums_1.Direction.None });
            var animatedVTree$ = transition_1.Transition.run({ DOM: sources.DOM, target$: vTree$, args$: transition$ }).DOM;
            return {
                DOM: animatedVTree$,
                Events: function (type) { return sources.DOM.select(".message").events(type); }
            };
        }
        var isolatedMain = isolate_1.default(main);
        return isolatedMain(sources);
    }
    Message.run = run;
    /**
     * A message component to present messages to users.
     * Accepts the following properties:
     *   on$?: Stream<boolean> - When to show/hide the message.
     *   closeable?: boolean - Provides a close icon for the message for dismissal.
     *   icon?: boolean - Formats the message to support an icon.
     *   floating?: boolean - Formats the message to float above related content.
     *   compact?: boolean - Formats a message to only occupy width needed by its content.
     *   attached?: boolean - Formats the message to appear attached to other content.
     *   size?: Size - The size of the message.
     *   color?: Color - The color of the message.
     * Expects the following type of content: {}
     *   icon?: String|VNode - A message can have an icon signifying the type of message.
     *   header?: String|VNode - A message can have a header text.
     *   body?: String|VNode - A message can have additionaly body content.
     */
    function render(pOrC, c) {
        if (pOrC === void 0) { pOrC = {}; }
        if (c === void 0) { c = {}; }
        var props = isContent(pOrC) ? {} : pOrC;
        var content = isContent(pOrC) ? pOrC : c;
        var closeIcon = icon_1.Icon.render({}, enums_1.IconType.Close);
        return dom_1.div({ props: { className: getClassname(props) } }, [
            content.icon ? icon_1.Icon.render(content.icon) : "",
            props.closeable ? closeIcon : "",
            dom_1.div({ props: { className: "content" } }, [].concat(content.header ? dom_1.div({ props: { className: "header" } }, content.header) : "", content.body))
        ]);
    }
    Message.render = render;
    function getClassname(props) {
        var className = "ui";
        if (props.icon) {
            className += " icon";
        }
        if (props.floating) {
            className += " floating";
        }
        if (props.compact) {
            className += " compact";
        }
        if (props.attached) {
            className += " attached";
        }
        if (typeof (props.size) !== "undefined") {
            className += enums_1.Size.ToClassname(props.size);
        }
        if (typeof (props.color) !== "undefined") {
            className += enums_1.Color.ToClassname(props.color);
        }
        className += " message";
        return className;
    }
    function isContent(content) {
        return content !== undefined && (interfaces_1.isDOMContent(content.icon) || interfaces_1.isDOMContent(content.header) || interfaces_1.isDOMContent(content.body));
    }
})(Message = exports.Message || (exports.Message = {}));


/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var interfaces_1 = __webpack_require__(4);
var enums_1 = __webpack_require__(3);
var xstream_1 = __webpack_require__(0);
var isolate_1 = __webpack_require__(2);
var dom_1 = __webpack_require__(1);
var Table;
(function (Table) {
    /**
     * A table component to show content in a table.
     * Accepts the following properties in props$:
     *   singleline?: boolean - Formats the content of the table to fit on a single line.
     *   fixed?: boolean - Stops resizing of table cells based on content.
     *   selectable?: boolean - Styles the rows of the table to be selectable.
     *   striped?: boolean - Styles the rows of the table to alternate colors.
     *   celled?: boolean - Divides each row into seperate cells.
     *   basic?: boolean - Reduces the complexity of the table.
     *   verybasic?: boolean - Reduces the complexity of the table by a lot.
     *   collapsing?: boolean - Makes the table only take up as much space as needed.
     *   padded?: boolean - Adds extra padding to the table content.
     *   verypadded?: boolean - Adds a lot of extra padding to the table content.
     *   compact?: boolean - Styles the table content to be more compact, to allow for more rows.
     *   verycompact?: boolean - Styles the table content to be greatly compacted.
     *   size?: Size - The size of the table content.
     *   color?: Color - The colour of the table.
     * Expects the following type of content in content$: {} of
     * 	headers: [DOMContent]
     * 	body: [[DomContent]]
     */
    function run(sources) {
        function main(sources) {
            sources.props$ = sources.props$ ? sources.props$ : xstream_1.default.of({});
            sources.content$ = sources.content$ ? sources.content$ : xstream_1.default.of({ body: [] });
            var vTree$ = xstream_1.default.combine(sources.props$, sources.content$).map(function (_a) {
                var props = _a[0], content = _a[1];
                return render(props, content);
            });
            return {
                DOM: vTree$,
                Events: function (type) { return sources.DOM.select(".table").events(type); }
            };
        }
        var isolatedMain = isolate_1.default(main);
        return isolatedMain(sources);
    }
    Table.run = run;
    /**
     * A table component to show content in a table.
     * Accepts the following properties in props$:
     *   singleline?: boolean - Formats the content of the table to fit on a single line.
     *   fixed?: boolean - Stops resizing of table cells based on content.
     *   selectable?: boolean - Styles the rows of the table to be selectable.
     *   striped?: boolean - Styles the rows of the table to alternate colors.
     *   celled?: boolean - Divides each row into seperate cells.
     *   basic?: boolean - Reduces the complexity of the table.
     *   verybasic?: boolean - Reduces the complexity of the table by a lot.
     *   collapsing?: boolean - Makes the table only take up as much space as needed.
     *   padded?: boolean - Adds extra padding to the table content.
     *   verypadded?: boolean - Adds a lot of extra padding to the table content.
     *   compact?: boolean - Styles the table content to be more compact, to allow for more rows.
     *   verycompact?: boolean - Styles the table content to be greatly compacted.
     *   size?: Size - The size of the table content.
     *   color?: Color - The colour of the table.
     * Expects the following type of content in content$: {} of
     * 	headers: [DOMContent]
     * 	body: [[DomContent]]
     */
    function render(pOrC, c) {
        if (pOrC === void 0) { pOrC = {}; }
        if (c === void 0) { c = { body: [] }; }
        var props = isContent(pOrC) ? {} : pOrC;
        var content = isContent(pOrC) ? pOrC : c;
        var header = content.header ? dom_1.thead([dom_1.tr(content.header.map(function (h) { return dom_1.th(h); }))]) : "";
        var footer;
        if (interfaces_1.isDOMContent(content.footer)) {
            footer = dom_1.tfoot(content.footer);
        }
        else {
            footer = content.footer ? dom_1.tfoot([dom_1.tr(content.footer.map(function (f) { return dom_1.th(f); }))]) : "";
        }
        return dom_1.table({ props: { className: getClassname(props) } }, [
            header,
            dom_1.tbody(content.body.map(function (r) { return dom_1.tr(r.map(function (c) { return dom_1.td(c); })); })),
            footer
        ]);
    }
    Table.render = render;
    function getClassname(props) {
        var className = "ui";
        if (props.singleline) {
            className += " single line";
        }
        if (props.fixed) {
            className += " fixed";
        }
        if (props.selectable) {
            className += " selectable";
        }
        if (props.striped) {
            className += " striped";
        }
        if (props.celled) {
            className += " celled";
        }
        if (props.basic) {
            className += " basic";
        }
        if (props.verybasic) {
            className += " very basic";
        }
        if (props.collapsing) {
            className += " collapsing";
        }
        if (props.padded) {
            className += " padded";
        }
        if (props.verypadded) {
            className += " very padded";
        }
        if (props.compact) {
            className += " compact";
        }
        if (props.verycompact) {
            className += " very compact";
        }
        if (typeof (props.size) !== "undefined") {
            className += enums_1.Size.ToClassname(props.size);
        }
        if (typeof (props.color) !== "undefined") {
            className += enums_1.Color.ToClassname(props.color);
        }
        className += " table";
        return className;
    }
    function isContent(content) {
        return content !== undefined && (content.body !== undefined &&
            (content.header !== undefined ||
                content.footer !== undefined));
    }
})(Table = exports.Table || (exports.Table = {}));


/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var interfaces_1 = __webpack_require__(4);
var enums_1 = __webpack_require__(3);
var xstream_1 = __webpack_require__(0);
var isolate_1 = __webpack_require__(2);
var dom_1 = __webpack_require__(1);
var Button;
(function (Button) {
    /**
     * An interactive button component for user interaction through clicking.
     * Accepts the following type of properties in props$:
     *   animated? : boolean - Allows for an animation in the button to show hidden content.
     *   verticalAnimated?: boolean - See animated. This animation is vertical.
     *   labeled?: boolean - Adds styling for labeled buttons.
     *   icon?: boolean - Adds styling for buttons with an icon.
     *   basic?: boolean - Styles the button to appear simpler.
     *   inverted?: boolean - Styles the button to appear on dark backgrounds.
     *   active?: boolean - Sets the button to the active state.
     *   disabled?: boolean - Styles the button to appear disabled.
     *   loading?: boolean - Styles the button show that it is loading / working.
     *   compact?: boolean - Styles the button for a tight fit.
     *   circular?: boolean - Styles the button to appear circular.
     *   fluid?: boolean - Styles the button to be as wide as possible.
     *   href?: string - Outputs the button as a link to to the href.
     *   attachment?: Attachment - Where the button should be attached to.
     *   size?: Size - The size of the button.
     *   float?: Float - The left or right float of the button.
     *   color?: Color - The color of the button.
     * Expects the following type of content in content$: {} of
     *   body?: DOMContent - The body content to display on the button.
     *   hidden?: DOMContent - The hidden content to display for animated buttons.
     */
    function run(sources) {
        function main(sources) {
            sources.props$ = sources.props$ ? sources.props$ : xstream_1.default.of({});
            sources.content$ = sources.content$ ? sources.content$ : xstream_1.default.of("");
            sources.extras$ = sources.extras$ ? sources.extras$ : xstream_1.default.of("");
            var vtree$ = xstream_1.default.combine(sources.props$, sources.content$, sources.extras$).map(function (_a) {
                var props = _a[0], content = _a[1], extras = _a[2];
                return render(props, content, extras);
            });
            return {
                DOM: vtree$,
                Events: function (type) { return sources.DOM.select(".ui.button").events(type); }
            };
        }
        var isolatedMain = isolate_1.default(main);
        return isolatedMain(sources);
    }
    Button.run = run;
    /**
     * A static button component for user interaction through clicking.
     * Accepts the following type of properties:
     *   animated? : boolean - Allows for an animation in the button to show hidden content.
     *   verticalAnimated?: boolean - See animated. This animation is vertical.
     *   labeled?: boolean - Adds styling for labeled buttons.
     *   icon?: boolean - Adds styling for buttons with an icon.
     *   basic?: boolean - Styles the button to appear simpler.
     *   inverted?: boolean - Styles the button to appear on dark backgrounds.
     *   active?: boolean - Sets the button to the active state.
     *   disabled?: boolean - Styles the button to appear disabled.
     *   loading?: boolean - Styles the button show that it is loading / working.
     *   compact?: boolean - Styles the button for a tight fit.
     *   circular?: boolean - Styles the button to appear circular.
     *   fluid?: boolean - Styles the button to be as wide as possible.
     *   href?: string - Outputs the button as a link to to the href.
     *   attachment?: Attachment - Where the button should be attached to.
     *   size?: Size - The size of the button.
     *   float?: Float - The left or right float of the button.
     *   color?: Color - The color of the button.
     * Expects the following type of content: {} of
     *   body?: DOMContent - The body content to display on the button.
     *   hidden?: DOMContent - The hidden content to display for animated buttons.
     */
    function render(pOrC, c, e) {
        if (pOrC === void 0) { pOrC = {}; }
        if (c === void 0) { c = ""; }
        if (e === void 0) { e = ""; }
        var props = interfaces_1.isDOMContent(pOrC) ? {} : pOrC;
        var content = interfaces_1.isDOMContent(pOrC) ? pOrC : c;
        var extra = interfaces_1.isDOMContent(pOrC) ? (c !== "") ? c : e : e;
        var children = extra
            ? [dom_1.div({ props: { className: "visible content" } }, content),
                dom_1.div({ props: { className: "hidden content" } }, extra)]
            : content;
        return props.href
            ? dom_1.a({ props: { href: props.href, className: getClassname(props) } }, children)
            : dom_1.div({ props: { className: getClassname(props) } }, children);
    }
    Button.render = render;
    function getClassname(props) {
        var className = "ui";
        if (props.animated) {
            className += " animated";
        }
        if (props.verticalAnimated) {
            className += " vertical.animated";
        }
        if (props.labeled) {
            className += " labeled";
        }
        if (props.rightlabeled) {
            className += " right labeled";
        }
        if (props.icon) {
            className += " icon";
        }
        if (props.basic) {
            className += " basic";
        }
        if (props.inverted) {
            className += " inverted";
        }
        if (props.active) {
            className += " active";
        }
        if (props.disabled) {
            className += " disabled";
        }
        if (props.loading) {
            className += " loading";
        }
        if (props.compact) {
            className += " compact";
        }
        if (props.circular) {
            className += " circular";
        }
        if (props.fluid) {
            className += " fluid";
        }
        if (typeof (props.attachment) !== "undefined") {
            className += enums_1.Attachment.ToClassname(props.attachment);
        }
        if (typeof (props.size) !== "undefined") {
            className += enums_1.Size.ToClassname(props.size);
        }
        if (typeof (props.float) !== "undefined") {
            className += enums_1.Float.ToClassname(props.float);
        }
        if (typeof (props.color) !== "undefined") {
            className += enums_1.Color.ToClassname(props.color);
        }
        className += " button";
        return className;
    }
})(Button = exports.Button || (exports.Button = {}));


/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var interfaces_1 = __webpack_require__(4);
var xstream_1 = __webpack_require__(0);
var isolate_1 = __webpack_require__(2);
var dom_1 = __webpack_require__(1);
var Container;
(function (Container) {
    /**
    * A responsive container component to host other content.
    * Does not accept any properties in props$.
    * Expects the following type of content in content$: DOMContent
    */
    function run(sources) {
        function main(sources) {
            sources.content$ = sources.content$ ? sources.content$ : xstream_1.default.of("");
            var vTree$ = sources.content$.map(function (content) { return render(content); });
            return {
                DOM: vTree$,
                Events: function (type) { return sources.DOM.select(".container").events(type); }
            };
        }
        var isolatedMain = isolate_1.default(main);
        return isolatedMain(sources);
    }
    Container.run = run;
    /**
    * A responsive container component to host other content.
    * Does not accept any properties.
    * Expects the following type of content: DOMContent
    */
    function render(pOrC, c) {
        if (pOrC === void 0) { pOrC = {}; }
        if (c === void 0) { c = ""; }
        // let props = isDOMContent(pOrC) ? {} : pOrC;
        var content = interfaces_1.isDOMContent(pOrC) ? pOrC : c;
        return dom_1.div({ props: { className: "ui container" } }, content);
    }
    Container.render = render;
})(Container = exports.Container || (exports.Container = {}));


/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var interfaces_1 = __webpack_require__(4);
var xstream_1 = __webpack_require__(0);
var isolate_1 = __webpack_require__(2);
var dom_1 = __webpack_require__(1);
var Divider;
(function (Divider) {
    /**
     * Creates a divider element to seperate content on page.
     * Accepts the following properties in props$:
     * 	content?: VNode - The content to add to the divider.
     * 	horizontal?: boolean - Needed to render text horizontally in the divider.
     * 	vertical?: boolean - Determines vertical/horizontal orientation of the divider.
     * 	inverted?: boolean - For dark backgrounds.
     * 	fitted?: boolean - Minimizes the space between divided content.
     * 	hidden?: boolean - Creates an invisible divider that divides the content.
     * 	section?: boolean - Provides greater margins for between divided content.
     * 	clearing?: boolean - Clears floated content.
     * Expects the following type of content in content$: DOMContent
     */
    function run(sources) {
        function main(sources) {
            sources.props$ = sources.props$ ? sources.props$ : xstream_1.default.of({});
            sources.content$ = sources.content$ ? sources.content$ : xstream_1.default.of("");
            var vTree$ = xstream_1.default.combine(sources.props$, sources.content$).map(function (_a) {
                var props = _a[0], content = _a[1];
                return render(props, content);
            });
            return {
                DOM: vTree$,
                Events: function (type) { return sources.DOM.select(".divider").events(type); }
            };
        }
        var isolatedMain = isolate_1.default(main);
        return isolatedMain(sources);
    }
    Divider.run = run;
    /**
     * Creates a divider element to seperate content on page.
     * Accepts the following properties:
     * 	content?: VNode - The content to add to the divider.
     * 	horizontal?: boolean - Needed to render text horizontally in the divider.
     * 	vertical?: boolean - Determines vertical/horizontal orientation of the divider.
     * 	inverted?: boolean - For dark backgrounds.
     * 	fitted?: boolean - Minimizes the space between divided content.
     * 	hidden?: boolean - Creates an invisible divider that divides the content.
     * 	section?: boolean - Provides greater margins for between divided content.
     * 	clearing?: boolean - Clears floated content.
     * Expects the following type of content: DOMContent
     */
    function render(pOrC, c) {
        if (pOrC === void 0) { pOrC = {}; }
        if (c === void 0) { c = ""; }
        var props = interfaces_1.isDOMContent(pOrC) ? {} : pOrC;
        var content = interfaces_1.isDOMContent(pOrC) ? pOrC : c;
        return dom_1.div({ props: { className: getClassName(props, content) } }, content);
    }
    Divider.render = render;
    function getClassName(props, content) {
        var className = "ui";
        if (props.vertical) {
            className += " vertical";
        }
        else if (props.horizontal) {
            className += " horizontal";
        }
        if (props.inverted) {
            className += " inverted";
        }
        if (props.fitted) {
            className += " fitted";
        }
        if (props.hidden) {
            className += " hidden";
        }
        if (props.section) {
            className += " section";
        }
        if (props.clearing) {
            className += " clearing";
        }
        if (props.header) {
            className += " header";
        }
        className += " divider";
        return className;
    }
})(Divider = exports.Divider || (exports.Divider = {}));


/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var interfaces_1 = __webpack_require__(4);
var enums_1 = __webpack_require__(3);
var xstream_1 = __webpack_require__(0);
var isolate_1 = __webpack_require__(2);
var dom_1 = __webpack_require__(1);
var Header;
(function (Header) {
    /**
     * Creates a header for important text.
     * Accepts the following properties in props$:
     *   icon?: boolean - Adds styling for icon headers.
     *   divider?: boolean - Adds styling for headers to seperate content.
     *   block?: boolean - Wraps header in a block.
     *   disabled?: boolean - Styling for disabled content.
     *   inverted?: boolean - Styling for dark backgrounds.
     *   attachment?: Attachment - Styling for headers attached to other content.
     *   float?: Float - Floats the header to the left or right.
     *   textAlignment?: TextAlignment - Text alignment of the header text.
     *   size?: Size - Determines the size of the header.
     *   color?: Color - The color of the header.
     * Expects the following type of content in content$: {} of
     *   text: DOMContent - The header text.
     *   subtext?: DOMContent- An optional sub-header to accompany the header.
     *   icon?: DOMContent - Optional image/icon content for the header.
     */
    function run(sources) {
        function main(sources) {
            sources.props$ = sources.props$ ? sources.props$ : xstream_1.default.of({});
            sources.content$ = sources.content$ ? sources.content$ : xstream_1.default.of("");
            sources.extras$ = sources.extras$ ? sources.extras$ : xstream_1.default.of({});
            var vTree$ = xstream_1.default.combine(sources.props$, sources.content$, sources.extras$).map(function (_a) {
                var props = _a[0], content = _a[1], extras = _a[2];
                return render(props, content, extras);
            });
            return {
                DOM: vTree$,
                Events: function (type) { return sources.DOM.select(".header").events(type); },
            };
        }
        var isolatedMain = isolate_1.default(main);
        return isolatedMain(sources);
    }
    Header.run = run;
    /**
     * Creates a header for important text.
     * Accepts the following properties:
     *   icon?: boolean - Adds styling for icon headers.
     *   divider?: boolean - Adds styling for headers to seperate content.
     *   block?: boolean - Wraps header in a block.
     *   disabled?: boolean - Styling for disabled content.
     *   inverted?: boolean - Styling for dark backgrounds.
     *   attachment?: Attachment - Styling for headers attached to other content.
     *   float?: Float - Floats the header to the left or right.
     *   textAlignment?: TextAlignment - Text alignment of the header text.
     *   size?: Size - Determines the size of the header.
     *   color?: Color - The color of the header.
     * Expects the following type of content: {} of
     *   text: DOMContent - The header text.
     *   subtext?: DOMContent- An optional sub-header to accompany the header.
     *   icon?: DOMContent - Optional image/icon content for the header.
     */
    function render(pOrCorE, cOrE, e) {
        if (pOrCorE === void 0) { pOrCorE = {}; }
        if (cOrE === void 0) { cOrE = {}; }
        if (e === void 0) { e = {}; }
        var props = interfaces_1.isDOMContent(pOrCorE) ? {} : isExtras(pOrCorE) ? {} : pOrCorE;
        var content = interfaces_1.isDOMContent(pOrCorE) ? pOrCorE : interfaces_1.isDOMContent(cOrE) ? cOrE : "";
        var extras = isExtras(pOrCorE) ? pOrCorE : isExtras(cOrE) ? cOrE : e;
        return dom_1.div({ props: { className: getClassname(props) } }, [
            extras.icon ? extras.icon : "",
            dom_1.div({ props: { className: "content" } }, [].concat(content, extras.subtext ? dom_1.div({ props: { className: "sub header" } }, extras.subtext) : ""))
        ]);
    }
    Header.render = render;
    function getClassname(props) {
        var className = "ui";
        if (props.icon) {
            className += " icon";
        }
        if (props.divider) {
            className += " divider";
        }
        if (props.block) {
            className += " block";
        }
        if (props.disabled) {
            className += " disabled";
        }
        if (props.inverted) {
            className += " inverted";
        }
        if (typeof (props.size) !== "undefined") {
            className += enums_1.Size.ToClassname(props.size);
        }
        if (typeof (props.attachment) !== "undefined") {
            className += enums_1.Attachment.ToClassname(props.attachment);
        }
        if (typeof (props.float) !== "undefined") {
            className += enums_1.Float.ToClassname(props.float);
        }
        if (typeof (props.textAlignment) !== "undefined") {
            className += enums_1.TextAlignment.ToClassname(props.textAlignment);
        }
        if (typeof (props.color) !== "undefined") {
            className += enums_1.Color.ToClassname(props.color);
        }
        className += " header";
        return className;
    }
    function isExtras(extra) {
        return extra !== undefined && (extra.subtext !== undefined
            || (extra.icon !== undefined && typeof (extra.icon) !== "boolean"));
    }
})(Header = exports.Header || (exports.Header = {}));


/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var enums_1 = __webpack_require__(3);
var isolate_1 = __webpack_require__(2);
var dom_1 = __webpack_require__(1);
var xstream_1 = __webpack_require__(0);
var Image;
(function (Image) {
    /**
     * An image component for displaying images.
     * Accepts the following properties in props$:
     *   href?: string - Styles the image as a link towards the location.
     *   hidden?: boolean - Hides the image.
     *   disabled?: boolean - Styles the image to appear disabled.
     *   avatar?: boolean - Styles the image for usage as an avatar.
     *   bordered?: boolean - Styles the image with a border.
     *   spaced?: boolean - Styles the image with extra spacing to seperate it from nearby content.
     *   circular?: boolean - Styles the image to be circular.
     *   rounded?: boolean - Styles the image to have rounded edges.
     *   float?: Float - The float orientation of the image.
     *   size?: Size - The size of the image.
     *   verticalAlignment?: VerticalAlignment - The vertical alignment of text nearby the image.
     * Expects the following type of content in content$: string - The src url.
     */
    function run(sources) {
        function main(sources) {
            sources.props$ = sources.props$ ? sources.props$ : xstream_1.default.of({});
            sources.content$ = sources.content$ ? sources.content$ : xstream_1.default.of("");
            var vTree$ = xstream_1.default.combine(sources.props$, sources.content$).map(function (_a) {
                var props = _a[0], content = _a[1];
                return render(props, content);
            });
            return {
                DOM: vTree$,
                Events: function (type) { return sources.DOM.select(".image").events(type); },
            };
        }
        var isolatedMain = isolate_1.default(main);
        return isolatedMain(sources);
    }
    Image.run = run;
    /**
     * An image component for displaying images.
     * Accepts the following properties:
     *   link?: boolean - Styles the image as a link.
     *   hidden?: boolean - Hides the image.
     *   disabled?: boolean - Styles the image to appear disabled.
     *   avatar?: boolean - Styles the image for usage as an avatar.
     *   bordered?: boolean - Styles the image with a border.
     *   spaced?: boolean - Styles the image with extra spacing to seperate it from nearby content.
     *   circular?: boolean - Styles the image to be circular.
     *   rounded?: boolean - Styles the image to have rounded edges.
     *   float?: Float - The float orientation of the image.
     *   size?: Size - The size of the image.
     *   verticalAlignment?: VerticalAlignment - The vertical alignment of text nearby the image.
     * Expects the following type of content: string - The src url.
     */
    function render(pOrC, c) {
        if (pOrC === void 0) { pOrC = {}; }
        if (c === void 0) { c = ""; }
        var props = typeof (pOrC) === "string" ? {} : pOrC;
        var content = typeof (pOrC) === "string" ? pOrC : c;
        var image = dom_1.img({ props: { className: getClassname(props), src: content } });
        return props.href ? dom_1.a({ props: { href: props.href } }, image) : image;
    }
    Image.render = render;
    function getClassname(props) {
        var className = "ui";
        if (props.href) {
            className += " link";
        }
        if (props.hidden) {
            className += " hidden";
        }
        if (props.disabled) {
            className += " disabled";
        }
        if (props.avatar) {
            className += " avatar";
        }
        if (props.bordered) {
            className += " bordered";
        }
        if (props.spaced) {
            className += " spaced";
        }
        if (props.circular) {
            className += " circular";
        }
        if (props.rounded) {
            className += " rounded";
        }
        if (typeof (props.float) !== "undefined") {
            className += enums_1.Float.ToClassname(props.float);
        }
        if (typeof (props.size) !== "undefined") {
            className += enums_1.Size.ToClassname(props.size);
        }
        if (typeof (props.verticalAlignment) !== "undefined") {
            className += enums_1.VerticalAlignment.ToClassname(props.verticalAlignment);
        }
        return className + " image";
    }
})(Image = exports.Image || (exports.Image = {}));


/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__(191));
__export(__webpack_require__(192));
__export(__webpack_require__(193));
__export(__webpack_require__(194));
__export(__webpack_require__(22));
__export(__webpack_require__(195));
__export(__webpack_require__(197));
__export(__webpack_require__(198));
__export(__webpack_require__(199));
__export(__webpack_require__(200));
__export(__webpack_require__(201));
__export(__webpack_require__(202));


/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var interfaces_1 = __webpack_require__(4);
var enums_1 = __webpack_require__(3);
var xstream_1 = __webpack_require__(0);
var isolate_1 = __webpack_require__(2);
var dom_1 = __webpack_require__(1);
var Label;
(function (Label) {
    /**
     * Creates a Label component to add information to certain content.
     * Accepts the following properties in props$:
     *   circular?: boolean - Styles the label to be circular.
     *   empty?: boolean - Styles the label for empty content.
     *   pointing?: boolean - Styles the label to be pointing towards nearby content.
     *   basic?: boolean - Styles the label to be minimalistic.
     *   leftCorner?: boolean - Attaches the label to the top-left corner of nearby content.
     *   rightCorner?: boolean - Attaches the label to the top-right corner of nearby content.
     *   tag?: boolean - Styles the label to look like a tag.
     *   ribbon?: boolean - Styles the label to look like a ribbon over the left side of content.
     *   invRibbon?: boolean - Styles the label to look like a ribbon over the right side of content.
     *   horizontal?: boolean - Styles the label for horizontal content.
     *   floating?: boolean - Styles the label to be floating over nearby content.
     *   attachment?: Attachment - Where the label should be attached to.
     *   size?: Size - The size of the label.
     *   color?: Color - The color of the label.
     * Expects the following type of content and extras: DOMContent
     */
    function run(sources) {
        function main(sources) {
            sources.props$ = sources.props$ ? sources.props$ : xstream_1.default.of({});
            sources.content$ = sources.content$ ? sources.content$ : xstream_1.default.of([]);
            sources.extras$ = sources.extras$ ? sources.extras$ : xstream_1.default.of([]);
            var vTree$ = xstream_1.default.combine(sources.props$, sources.content$, sources.extras$).map(function (_a) {
                var props = _a[0], content = _a[1], extras = _a[2];
                return render(props, content, extras);
            });
            return {
                DOM: vTree$,
                Events: function (type) { return sources.DOM.select(".label").events(type); }
            };
        }
        var isolatedMain = isolate_1.default(main);
        return isolatedMain(sources);
    }
    Label.run = run;
    /**
     * Creates a Label component to add information to certain content.
     * Accepts the following properties:
     *   circular?: boolean - Styles the label to be circular.
     *   empty?: boolean - Styles the label for empty content.
     *   pointing?: boolean - Styles the label to be pointing towards nearby content.
     *   basic?: boolean - Styles the label to be minimalistic.
     *   leftCorner?: boolean - Attaches the label to the top-left corner of nearby content.
     *   rightCorner?: boolean - Attaches the label to the top-right corner of nearby content.
     *   tag?: boolean - Styles the label to look like a tag.
     *   ribbon?: boolean - Styles the label to look like a ribbon over the left side of content.
     *   invRibbon?: boolean - Styles the label to look like a ribbon over the right side of content.
     *   horizontal?: boolean - Styles the label for horizontal content.
     *   floating?: boolean - Styles the label to be floating over nearby content.
     *   attachment?: Attachment - Where the label should be attached to.
     *   size?: Size - The size of the label.
     *   color?: Color - The color of the label.
     * Expects the following type of content and extras: DOMContent
     */
    function render(pOrC, c, e) {
        if (pOrC === void 0) { pOrC = {}; }
        if (c === void 0) { c = ""; }
        if (e === void 0) { e = ""; }
        var props = interfaces_1.isDOMContent(pOrC) ? {} : pOrC;
        var content = interfaces_1.isDOMContent(pOrC) ? pOrC : c;
        var detail = interfaces_1.isDOMContent(pOrC) ? c : e;
        return dom_1.div({ props: { className: getClassname(props) } }, [
            content,
            detail ? dom_1.div({ props: { className: "detail" } }, detail) : ""
        ]);
    }
    Label.render = render;
    function getClassname(props) {
        var className = "ui";
        if (props.circular) {
            className += " circular";
        }
        if (props.empty) {
            className += " empty";
        }
        if (props.pointing) {
            className += " pointing";
        }
        if (props.basic) {
            className += " basic";
        }
        if (props.leftCorner) {
            className += " left corner";
        }
        if (props.rightCorner) {
            className += " right corner";
        }
        if (props.tag) {
            className += " tag";
        }
        if (props.ribbon) {
            className += " ribbon";
        }
        if (props.invRibbon) {
            className += " right ribbon";
        }
        if (props.horizontal) {
            className += " horizontal";
        }
        if (props.floating) {
            className += " floating ";
        }
        if (typeof (props.attachment) !== "undefined") {
            className += enums_1.Attachment.ToClassname(props.attachment);
        }
        if (typeof (props.size) !== "undefined") {
            className += enums_1.Size.ToClassname(props.size);
        }
        if (typeof (props.color) !== "undefined") {
            className += enums_1.Color.ToClassname(props.color);
        }
        className += " label";
        return className;
    }
})(Label = exports.Label || (exports.Label = {}));


/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var enums_1 = __webpack_require__(3);
var xstream_1 = __webpack_require__(0);
var isolate_1 = __webpack_require__(2);
var dom_1 = __webpack_require__(1);
var List;
(function (List) {
    /**
     * Creates a List component for showing lists of content.
     * Accepts the following properties in props$:
     *   bulleted?: boolean - Displays list as a bulleted list.
     *   ordered?: boolean - Displays list as an ordered list.
     *   link?: boolean - Styling for lists with links.
     *   horizontal?: boolean - Displays list horizontally.
     *   inverted?: boolean - Styling for lists on dark backgrounds.
     *   selection?: boolean - Styling for lists meant to display a selection.
     *   animated?: boolean - Adds an animation to display currently selected item.
     *   relaxed?: boolean - Adds more negative space arround the list.
     *   divided?: boolean - Adds horizontal dividers between content of list.
     *   celled?: boolean - Wraps content of list in cells.
     *   size?: Size - The size of the list and its content.
     *   alignment?: VerticalAlignment - The vertical alignment of list's content.
     *   float?: Float - Wether the list should be left or right floating.
     * Expects the following type of content: Array of {}
     *   left?: DOMContent - Left floated content for the item.
     *   body?: DOMContent - Body content for the item.
     *   right?: DOMContent - Right floated content for the item.
     *   header?: DOMContent - Name of the list item
     *   description?: DOMContent - Description of the list item.
     *   href?: string - Link for link lists
     */
    function run(sources) {
        function main(sources) {
            sources.props$ = sources.props$ ? sources.props$ : xstream_1.default.of({});
            sources.content$ = sources.content$ ? sources.content$ : xstream_1.default.of([]);
            var vTree$ = xstream_1.default.combine(sources.props$, sources.content$).map(function (_a) {
                var props = _a[0], content = _a[1];
                return render(props, content);
            });
            return {
                DOM: vTree$,
                Events: function (type) { return sources.DOM.select(".list").events(type); },
                value$: xstream_1.default.never()
            };
        }
        var isolatedMain = isolate_1.default(main);
        return isolatedMain(sources);
    }
    List.run = run;
    /**
     * Creates a List component for showing lists of content.
     * Accepts the following properties in props$:
     *   bulleted?: boolean - Displays list as a bulleted list.
     *   ordered?: boolean - Displays list as an ordered list.
     *   link?: boolean - Styling for lists with links.
     *   horizontal?: boolean - Displays list horizontally.
     *   inverted?: boolean - Styling for lists on dark backgrounds.
     *   selection?: boolean - Styling for lists meant to display a selection.
     *   animated?: boolean - Adds an animation to display currently selected item.
     *   relaxed?: boolean - Adds more negative space arround the list.
     *   divided?: boolean - Adds horizontal dividers between content of list.
     *   celled?: boolean - Wraps content of list in cells.
     *   size?: Size - The size of the list and its content.
     *   alignment?: VerticalAlignment - The vertical alignment of list's content.
     *   float?: Float - Wether the list should be left or right floating.
     * Expects the following type of content: Array of {}
     *   left?: DOMContent - Left floated content for the item.
     *   body?: DOMContent - Body content for the item.
     *   right?: DOMContent - Right floated content for the item.
     *   header?: DOMContent - Name of the list item
     *   description?: DOMContent - Description of the list item.
     *   href?: string - Link for link lists
     */
    function render(pOrC, c) {
        if (pOrC === void 0) { pOrC = {}; }
        if (c === void 0) { c = []; }
        var props = (pOrC instanceof Array) ? {} : pOrC;
        var content = (pOrC instanceof Array) ? pOrC : c;
        return dom_1.div({ props: { className: getClassname(props) } }, content.map(function (_a) {
            var header = _a.header, icon = _a.icon, content = _a.content, description = _a.description, href = _a.href, left = _a.left, right = _a.right;
            var l = left ? dom_1.div({ props: { className: "left floated content" } }, left) : undefined;
            var r = right ? dom_1.div({ props: { className: "right floated content" } }, right) : undefined;
            var h = header ? dom_1.div({ props: { className: "header" } }, header) : undefined;
            var d = description ? dom_1.div({ props: { className: "description" } }, description) : undefined;
            var i = icon ? icon : "";
            var c = dom_1.div({ props: { className: "content" } }, [].concat(h, d, content));
            var children = [].concat(l, i, c, r);
            return href
                ? dom_1.a({ props: { className: "item" } }, { props: { href: href } }, children)
                : dom_1.div({ props: { className: "item" } }, children);
        }));
    }
    List.render = render;
    function getClassname(props) {
        var className = "ui";
        if (props.bulleted) {
            className += " bulleted";
        }
        if (props.ordered) {
            className += " ordered";
        }
        if (props.horizontal) {
            className += " horizontal";
        }
        if (props.inverted) {
            className += " inverted";
        }
        if (props.selection) {
            className += " selection";
        }
        if (props.animated) {
            className += " animated";
        }
        if (props.relaxed) {
            className += " relaxed";
        }
        if (props.divided) {
            className += " divided";
        }
        if (props.celled) {
            className += " celled";
        }
        if (typeof (props.size) !== "undefined") {
            className += enums_1.Size.ToClassname(props.size);
        }
        if (typeof (props.alignment) !== "undefined") {
            className += enums_1.VerticalAlignment.ToClassname(props.alignment);
        }
        if (typeof (props.float) !== "undefined") {
            className += enums_1.Float.ToClassname(props.float);
        }
        className += " list";
        return className;
    }
})(List = exports.List || (exports.List = {}));


/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var interfaces_1 = __webpack_require__(4);
var enums_1 = __webpack_require__(3);
var xstream_1 = __webpack_require__(0);
var isolate_1 = __webpack_require__(2);
var dom_1 = __webpack_require__(1);
var dimmer_1 = __webpack_require__(36);
var Loader;
(function (Loader) {
    /**
     * A loader component to show that certain content or a page is loading.
     * Accepts the following properties in props$:
     *   type: LoaderType - The type of loader to use. See exported enum.
     *   element?: Stream<VNode> - The element to mark as loaded. (Only used for type.Content)
     *   on$: Stream<boolean> - When to show/hide the loader. (Not used for inline, add disabled property instead.)
     *   centered?: boolean - Centers the loader spinner in its parent component.
     *   active?: boolean - Always shows the loader.
     *   disabled?: boolean - Always hides the loader.
     *   indeterminate?: boolean - Makes the loader spin indicate its unsure of how long a task will take.
     *   text?: boolean - Positions the loader to leave space for text.
     *   size?: Size - The size of the loader.
     * Expects the following type of content in content$ of: DOMContent
     */
    function run(sources) {
        function main(sources) {
            sources.props$ = sources.props$ ? sources.props$ : xstream_1.default.of({ type: LoaderType.Inline });
            sources.content$ = sources.content$ ? sources.content$ : xstream_1.default.of("");
            var props$ = sources.props$.remember();
            var vTree$ = xstream_1.default.combine(props$, sources.content$)
                .map(function (_a) {
                var props = _a[0], content = _a[1];
                return render(props, content);
            });
            var on$ = props$.map(function (props) { return props.on$; }).flatten();
            var target$ = props$.map(function (props) { return props.type === LoaderType.Page ? xstream_1.default.of("page") : props.element; }).flatten();
            var dimmer = dimmer_1.Dimmer.run({ DOM: sources.DOM, args$: on$, target$: target$, content$: vTree$ }, props$.map(function (props) { return props.inverted; }));
            var result$ = props$.map(function (props) { return props.type === LoaderType.Inline ? vTree$ : dimmer.DOM; }).flatten();
            return {
                DOM: result$,
                Events: function (type) { return sources.DOM.select(".loader").events(type); },
                value$: xstream_1.default.never()
            };
        }
        var isolatedMain = isolate_1.default(main);
        return isolatedMain(sources);
    }
    Loader.run = run;
    /**
     * A loader component to show that certain content or a page is loading.
     * Accepts the following properties:
     *   type: LoaderType - The type of loader to use. See exported enum.
     *   element?: Stream<VNode> - The element to mark as loaded. (Only used for type.Content)
     *   on$: Stream<boolean> - When to show/hide the loader. (Not used for inline, add disabled property instead.)
     *   centered?: boolean - Centers the loader spinner in its parent component.
     *   active?: boolean - Always shows the loader.
     *   disabled?: boolean - Always hides the loader.
     *   indeterminate?: boolean - Makes the loader spin indicate its unsure of how long a task will take.
     *   text?: boolean - Positions the loader to leave space for text.
     *   size?: Size - The size of the loader.
     * Expects the following type of content: DOMContent
     */
    function render(pOrC, c) {
        if (pOrC === void 0) { pOrC = { type: LoaderType.Page }; }
        if (c === void 0) { c = ""; }
        var props = interfaces_1.isDOMContent(pOrC) ? { type: LoaderType.Page } : pOrC;
        var content = interfaces_1.isDOMContent(pOrC) ? pOrC : c;
        return [dom_1.div({ props: { className: getClassname(props) } }, content)];
    }
    Loader.render = render;
    function getClassname(props) {
        var className = "ui";
        if (props.active) {
            className += " active";
        }
        if (props.centered) {
            className += " centered";
        }
        if (props.disabled) {
            className += " disabled";
        }
        if (props.indeterminate) {
            className += " indeterminate";
        }
        if (props.inverted) {
            className += " inverted";
        }
        if (props.text) {
            className += " text";
        }
        if (typeof (props.size) !== "undefined") {
            className += enums_1.Size.ToClassname(props.size);
        }
        className += LoaderType.ToClassname(props.type);
        return className;
    }
    var LoaderType;
    (function (LoaderType) {
        LoaderType[LoaderType["Inline"] = 0] = "Inline";
        LoaderType[LoaderType["Page"] = 1] = "Page";
        LoaderType[LoaderType["Content"] = 2] = "Content";
    })(LoaderType = Loader.LoaderType || (Loader.LoaderType = {}));
    (function (LoaderType) {
        function ToClassname(type) {
            switch (type) {
                case LoaderType.Inline: return " inline loader";
                case LoaderType.Page: return " loader";
                case LoaderType.Content: return " loader";
            }
        }
        LoaderType.ToClassname = ToClassname;
    })(LoaderType = Loader.LoaderType || (Loader.LoaderType = {}));
})(Loader = exports.Loader || (exports.Loader = {}));


/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var interfaces_1 = __webpack_require__(4);
var enums_1 = __webpack_require__(3);
var xstream_1 = __webpack_require__(0);
var isolate_1 = __webpack_require__(2);
var dom_1 = __webpack_require__(1);
var Segment;
(function (Segment) {
    /**
     * A segment component to divide up page content into segments.
     * Accepts the following properties in props$:
     *   raised?: boolean? - Styles the segment to appear floating above nearby content.
     *   stacked?: boolean? - Styles the segment to appear like a stack of papers.
     *   tallStacked?: boolean? - Styles the segment to appear like a tall stack of papers.
     *   piled?: boolean? - Styles the segment to appear like a pile of papers.
     *   vertical?: boolean? - Styles the segment content to be aligned as part of a vertical group.
     *   loading?: boolean? - Styles the segment with a loading icon.
     *   inverted?: boolean? - Styles the segment for dark content.
     *   padded?: boolean? - Increases the padding on the segment.
     *   veryPadded?: boolean - Increases the padding on the segment by a lot.
     *   compact?: boolean - Makes the segment take up only the space needed by its content.
     *   circular?: boolean - Styles the segment to be circular.
     *   clearing?: boolean - Clears floated content.
     *   basic?: boolean - Removes any special styling.
     *   color?: Color - The color of the segment.
     *   attachment?: Attachment - The attachment of the segment.
     *   float?: Float - Where the segment should float.
     *   textAlignment?: TextAlignment - The text alignment of the segment.
     * Expects the following type of content in content$: DOMContent
     */
    function run(sources) {
        function main(sources) {
            sources.props$ = sources.props$ ? sources.props$ : xstream_1.default.of({});
            sources.content$ = sources.content$ ? sources.content$ : xstream_1.default.of("");
            var vTree$ = xstream_1.default.combine(sources.props$, sources.content$).map(function (_a) {
                var props = _a[0], content = _a[1];
                return render(props, content);
            });
            return {
                DOM: vTree$,
                Events: function (type) { return sources.DOM.select(".segment").events(type); }
            };
        }
        var isolatedMain = isolate_1.default(main);
        return isolatedMain(sources);
    }
    Segment.run = run;
    /**
     * A segment component to divide up page content into segments.
     * Accepts the following properties:
     *   raised?: boolean? - Styles the segment to appear floating above nearby content.
     *   stacked?: boolean? - Styles the segment to appear like a stack of papers.
     *   tallStacked?: boolean? - Styles the segment to appear like a tall stack of papers.
     *   piled?: boolean? - Styles the segment to appear like a pile of papers.
     *   vertical?: boolean? - Styles the segment content to be aligned as part of a vertical group.
     *   loading?: boolean? - Styles the segment with a loading icon.
     *   inverted?: boolean? - Styles the segment for dark content.
     *   padded?: boolean? - Increases the padding on the segment.
     *   veryPadded?: boolean - Increases the padding on the segment by a lot.
     *   compact?: boolean - Makes the segment take up only the space needed by its content.
     *   circular?: boolean - Styles the segment to be circular.
     *   clearing?: boolean - Clears floated content.
     *   basic?: boolean - Removes any special styling.
     *   color?: Color - The color of the segment.
     *   attachment?: Attachment - The attachment of the segment.
     *   float?: Float - Where the segment should float.
     *   textAlignment?: TextAlignment - The text alignment of the segment.
     * Expects the following type of content : DOMContent
     */
    function render(pOrC, c) {
        if (pOrC === void 0) { pOrC = {}; }
        if (c === void 0) { c = ""; }
        var props = interfaces_1.isDOMContent(pOrC) ? {} : pOrC;
        var content = interfaces_1.isDOMContent(pOrC) ? pOrC : c;
        return dom_1.div({ props: { className: getClassname(props) } }, content);
    }
    Segment.render = render;
    function getClassname(props) {
        var className = "ui";
        if (props.raised) {
            className += " raised";
        }
        if (props.stacked) {
            className += " stacked";
        }
        if (props.tallStacked) {
            className += " tall stacked";
        }
        if (props.piled) {
            className += " piled";
        }
        if (props.vertical) {
            className += " vertical";
        }
        if (props.loading) {
            className += " loading";
        }
        if (props.inverted) {
            className += " inverted";
        }
        if (props.padded) {
            className += " padded";
        }
        if (props.veryPadded) {
            className += " very padded";
        }
        if (props.compact) {
            className += " compact";
        }
        if (props.circular) {
            className += " circular";
        }
        if (props.clearing) {
            className += " clearing";
        }
        if (props.basic) {
            className += " basic";
        }
        if (typeof (props.color) !== "undefined") {
            className += enums_1.Color.ToClassname(props.color);
        }
        if (typeof (props.attachment) !== "undefined") {
            className += enums_1.Attachment.ToClassname(props.attachment);
        }
        if (typeof (props.float) !== "undefined") {
            className += enums_1.Float.ToClassname(props.float);
        }
        if (typeof (props.textAlignment) !== "undefined") {
            className += enums_1.TextAlignment.ToClassname(props.textAlignment);
        }
        className += " segment";
        return className;
    }
})(Segment = exports.Segment || (exports.Segment = {}));


/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var enums_1 = __webpack_require__(3);
var utils_1 = __webpack_require__(9);
var xstream_1 = __webpack_require__(0);
var isolate_1 = __webpack_require__(2);
var dom_1 = __webpack_require__(1);
var Steps;
(function (Steps) {
    /**
     * A steps component to show the completion status of a series of activities.
     * Accepts the following properties in props$:
     *  link?: boolean - Styles to steps to display as a link.
     * 	vertical?: boolean - Styles the steps to align vertically.
     * 	stackable?: boolean - Lets the steps realign vertically on smaller screens.
     * 	evenlyDivided?: boolean - Arranges the steps to take up equal amount of width of their parent.
     * 	fluid?: boolean - Styles the steps to take up the full width of their parent.
     * 	size?: Size - The size of the steps.
     * 	attachment?: Attachment - Styles the steps to appear attached to nearby content.
     * Expects the following type of content in content$: Array of {}
     * 	icon?: DOMContent The icon to use for the step.
     * 	header?: DOMContent - The title for the step.
     * 	description?: DOMContent - The description for the step.
     * 	isCompleted?: boolean - Marks the step as completed.
     * 	isActive?: boolean - Marks the step as the current step.
     * 	isDisabled?: boolean - Marks the step as disabled.
     *  link?: boolean - Style the step to be clickable.
     */
    function run(sources) {
        function main(sources) {
            sources.props$ = sources.props$ ? sources.props$ : xstream_1.default.of({});
            sources.content$ = sources.content$ ? sources.content$ : xstream_1.default.of([]);
            var vTree$ = xstream_1.default.combine(sources.props$, sources.content$).map(function (_a) {
                var props = _a[0], content = _a[1];
                return render(props, content);
            });
            var evt = function (type) { return sources.DOM.select(".step").events(type); };
            return {
                DOM: vTree$,
                Events: evt,
                value$: xstream_1.default.never()
            };
        }
        var isolatedMain = isolate_1.default(main);
        return isolatedMain(sources);
    }
    Steps.run = run;
    /**
     * A steps component to show the completion status of a series of activities.
     * Accepts the following properties:
     *  link?: boolean - Styles to steps to display as a link.
     * 	vertical?: boolean - Styles the steps to align vertically.
     * 	stackable?: boolean - Lets the steps realign vertically on smaller screens.
     * 	evenlyDivided?: boolean - Arranges the steps to take up equal amount of width of their parent.
     * 	fluid?: boolean - Styles the steps to take up the full width of their parent.
     * 	size?: Size - The size of the steps.
     * 	attachment?: Attachment - Styles the steps to appear attached to nearby content.
     * Expects the following type of content: Array of {}
     * 	icon?: DOMContent The icon to use for the step.
     * 	header?: DOMContent - The title for the step.
     * 	description?: DOMContent - The description for the step.
     * 	isCompleted?: boolean - Marks the step as completed.
     * 	isActive?: boolean - Marks the step as the current step.
     * 	isDisabled?: boolean - Marks the step as disabled.
     *  link?: boolean - Style the step to be clickable.
     */
    function render(pOrC, c) {
        if (pOrC === void 0) { pOrC = {}; }
        if (c === void 0) { c = []; }
        var props = pOrC instanceof Array ? {} : pOrC;
        var content = pOrC instanceof Array ? pOrC : c;
        var children = content.map(function (_a, i) {
            var icon = _a.icon, header = _a.header, description = _a.description, isCompleted = _a.isCompleted, isActive = _a.isActive, isDisabled = _a.isDisabled, link = _a.link;
            return props.link
                ? dom_1.a({ props: { id: i, className: getStepClassname(isCompleted, isActive, isDisabled, link) } }, [
                    icon,
                    dom_1.div({ props: { className: "content" } }, [
                        dom_1.div({ props: { className: "title" } }, header),
                        dom_1.div({ props: { className: "description" } }, description)
                    ])
                ])
                : dom_1.div({ props: { id: i, className: getStepClassname(isCompleted, isActive, isDisabled, link) } }, [
                    icon,
                    dom_1.div({ props: { className: "content" } }, [
                        dom_1.div({ props: { className: "title" } }, header),
                        dom_1.div({ props: { className: "description" } }, description)
                    ])
                ]);
        });
        return dom_1.div({ props: { className: getClassname(props, content.length) } }, children);
    }
    Steps.render = render;
    function getStepClassname(isCompleted, isActive, isDisabled, link) {
        var className = "";
        if (isActive) {
            className += "active";
        }
        if (isCompleted) {
            className += " completed";
        }
        if (isDisabled) {
            className += " disabled";
        }
        if (link) {
            className += " link";
        }
        className += " step";
        return className;
    }
    function getClassname(props, length) {
        var className = "ui";
        if (props.vertical) {
            className += " vertical";
        }
        if (props.stackable) {
            className += " stackable";
        }
        if (props.fluid) {
            className += " fluid";
        }
        if (props.evenlyDivided) {
            className += utils_1.numToText(length);
        }
        if (typeof (props.size) !== "undefined") {
            className += enums_1.Size.ToClassname(props.size);
        }
        if (typeof (props.attachment) !== "undefined") {
            className += enums_1.Attachment.ToClassname(props.attachment);
        }
        className += " steps";
        return className;
    }
})(Steps = exports.Steps || (exports.Steps = {}));


/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var interfaces_1 = __webpack_require__(4);
var enums_1 = __webpack_require__(3);
var xstream_1 = __webpack_require__(0);
var isolate_1 = __webpack_require__(2);
var dom_1 = __webpack_require__(1);
var Textbox;
(function (Textbox) {
    /**
     * A textbox component for capturing user input.
     * Accepts the following properties in props$:
     *   initial?: string - The initial value of the textbox.
     *   placeholder?: string - The placeholder text of the textbox.
     *   icon?: boolean - Styles the textbox for displaying an icon in the textbox.
     *   labeled?: boolean - Styles the textbox for displaying a label in the textbox.
     *   action?: boolean - Styles the textbox for displaying an action component in the textbox.
     *   leftContent?: boolean - Adds content to the left side of the textbox.
     *   rightContent?: boolean - Adds content to the right side of the textbox.
     *   transparent?: boolean - Styles the textbox to appear transparent.
     *   inverted?: boolean - Styles the textbox for darker backgrounds.
     *   focus?: boolean - Styles the textbox to show it has focus.
     *   loading?: boolean - Styles the textbox with a loading icon.
     *   disabled?: boolean - Styles the textbox to appear disabled.
     *   color?: Color - The color of the textbox.
     *   size?: Size - The size of the textbox.
     * Expects the following type of content in content$: DOMContent
     */
    function run(sources) {
        function main(sources) {
            sources.props$ = sources.props$ ? sources.props$ : xstream_1.default.of({});
            sources.content$ = sources.content$ ? sources.content$ : xstream_1.default.of("");
            var evt = function (type) { return sources.DOM.select(".input").events(type); };
            var props$ = sources.props$.remember();
            // const initialValue$ = props$.map(props => props.initial);
            var newValue$ = evt("input").map(function (ev) { return ev.target.value; }).remember();
            // const value$ = xs.merge(initialValue$, newValue$);
            var vtree$ = xstream_1.default.combine(props$, sources.content$).map(function (_a) {
                var props = _a[0], content = _a[1];
                return render(props, content);
            });
            return {
                DOM: vtree$,
                Events: evt,
                value$: newValue$
            };
        }
        var isolatedMain = isolate_1.default(main);
        return isolatedMain(sources);
    }
    Textbox.run = run;
    /**
     * A textbox component for capturing user input.
     * Accepts the following properties:
     *   initial?: string - The initial value of the textbox.
     *   placeholder?: string - The placeholder text of the textbox.
     *   icon?: boolean - Styles the textbox for displaying an icon in the textbox.
     *   labeled?: boolean - Styles the textbox for displaying a label in the textbox.
     *   action?: boolean - Styles the textbox for displaying an action component in the textbox.
     *   leftContent?: boolean - Adds content to the left side of the textbox.
     *   rightContent?: boolean - Adds content to the right side of the textbox.
     *   transparent?: boolean - Styles the textbox to appear transparent.
     *   inverted?: boolean - Styles the textbox for darker backgrounds.
     *   focus?: boolean - Styles the textbox to show it has focus.
     *   loading?: boolean - Styles the textbox with a loading icon.
     *   disabled?: boolean - Styles the textbox to appear disabled.
     *   color?: Color - The color of the textbox.
     *   size?: Size - The size of the textbox.
     * Expects the following type of content: DOMContent
     */
    function render(pOrC, c) {
        if (pOrC === void 0) { pOrC = {}; }
        if (c === void 0) { c = ""; }
        var props = interfaces_1.isDOMContent(pOrC) ? {} : pOrC;
        var content = interfaces_1.isDOMContent(pOrC) ? pOrC : c;
        var textbox = props.large
            ? dom_1.textarea({ props: { value: props.initial, placeholder: props.placeholder } })
            : dom_1.input({ props: { type: props.type ? props.type : "text", value: props.initial, placeholder: props.placeholder } });
        return props.rightContent
            ? dom_1.div({ props: { className: getClassname(props) } }, [
                textbox,
                content
            ])
            : dom_1.div({ props: { className: getClassname(props) } }, [
                content,
                textbox
            ]);
    }
    Textbox.render = render;
    function getClassname(props) {
        var className = "ui";
        if (props.leftContent) {
            className += " left";
        }
        if (props.rightContent) {
            className += " right";
        }
        if (props.icon) {
            className += " icon";
        }
        if (props.labeled) {
            className += " labeled";
        }
        if (props.action) {
            className += " action";
        }
        if (props.transparent) {
            className += " transparent";
        }
        if (props.inverted) {
            className += " inverted";
        }
        if (props.focus) {
            className += " focus";
        }
        if (props.loading) {
            className += " loading";
        }
        if (props.disabled) {
            className += " disabled";
        }
        if (typeof (props.color) !== "undefined") {
            className += enums_1.Color.ToClassname(props.color);
        }
        if (typeof (props.size) !== "undefined") {
            className += enums_1.Size.ToClassname(props.size);
        }
        className += " input";
        return className;
    }
})(Textbox = exports.Textbox || (exports.Textbox = {}));


/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var IconType;
(function (IconType) {
    function ToClassname(type) {
        if (type < 0)
            return "";
        var name = IconType[type];
        return " " + name.match(/[A-Z][a-z]+/g).join(" ").toLowerCase();
    }
    IconType.ToClassname = ToClassname;
    function GetNames() {
        var names = [];
        for (var n in IconType) {
            if (typeof IconType[n] === 'number')
                names.push(n);
        }
        return names;
    }
    IconType.GetNames = GetNames;
})(IconType = exports.IconType || (exports.IconType = {}));
(function (IconType) {
    IconType[IconType["Search"] = 0] = "Search";
    IconType[IconType["MailOutline"] = 1] = "MailOutline";
    IconType[IconType["External"] = 2] = "External";
    IconType[IconType["Signal"] = 3] = "Signal";
    IconType[IconType["Setting"] = 4] = "Setting";
    IconType[IconType["Home"] = 5] = "Home";
    IconType[IconType["Inbox"] = 6] = "Inbox";
    IconType[IconType["Browser"] = 7] = "Browser";
    IconType[IconType["Tag"] = 8] = "Tag";
    IconType[IconType["Tags"] = 9] = "Tags";
    IconType[IconType["Calendar"] = 10] = "Calendar";
    IconType[IconType["Comment"] = 11] = "Comment";
    IconType[IconType["Comments"] = 12] = "Comments";
    IconType[IconType["Shop"] = 13] = "Shop";
    IconType[IconType["Privacy"] = 14] = "Privacy";
    IconType[IconType["Settings"] = 15] = "Settings";
    IconType[IconType["Trophy"] = 16] = "Trophy";
    IconType[IconType["Payment"] = 17] = "Payment";
    IconType[IconType["Feed"] = 18] = "Feed";
    IconType[IconType["AlarmOutline"] = 19] = "AlarmOutline";
    IconType[IconType["Tasks"] = 20] = "Tasks";
    IconType[IconType["Cloud"] = 21] = "Cloud";
    IconType[IconType["Lab"] = 22] = "Lab";
    IconType[IconType["Mail"] = 23] = "Mail";
    IconType[IconType["Idea"] = 24] = "Idea";
    IconType[IconType["Dashboard"] = 25] = "Dashboard";
    IconType[IconType["Sitemap"] = 26] = "Sitemap";
    IconType[IconType["Alarm"] = 27] = "Alarm";
    IconType[IconType["Terminal"] = 28] = "Terminal";
    IconType[IconType["Code"] = 29] = "Code";
    IconType[IconType["Protect"] = 30] = "Protect";
    IconType[IconType["CalendarOutline"] = 31] = "CalendarOutline";
    IconType[IconType["Ticket"] = 32] = "Ticket";
    IconType[IconType["ExternalSquare"] = 33] = "ExternalSquare";
    IconType[IconType["Map"] = 34] = "Map";
    IconType[IconType["Bug"] = 35] = "Bug";
    IconType[IconType["MailSquare"] = 36] = "MailSquare";
    IconType[IconType["History"] = 37] = "History";
    IconType[IconType["Options"] = 38] = "Options";
    IconType[IconType["CommentOutline"] = 39] = "CommentOutline";
    IconType[IconType["CommentsOutline"] = 40] = "CommentsOutline";
    IconType[IconType["TextTelephone"] = 41] = "TextTelephone";
    IconType[IconType["Find"] = 42] = "Find";
    IconType[IconType["Wifi"] = 43] = "Wifi";
    IconType[IconType["AlarmSlash"] = 44] = "AlarmSlash";
    IconType[IconType["AlarmSlashOutline"] = 45] = "AlarmSlashOutline";
    IconType[IconType["Copyright"] = 46] = "Copyright";
    IconType[IconType["At"] = 47] = "At";
    IconType[IconType["Eyedropper"] = 48] = "Eyedropper";
    IconType[IconType["PaintBrush"] = 49] = "PaintBrush";
    IconType[IconType["Heartbeat"] = 50] = "Heartbeat";
    IconType[IconType["Download"] = 51] = "Download";
    IconType[IconType["Repeat"] = 52] = "Repeat";
    IconType[IconType["Refresh"] = 53] = "Refresh";
    IconType[IconType["Lock"] = 54] = "Lock";
    IconType[IconType["Bookmark"] = 55] = "Bookmark";
    IconType[IconType["Print"] = 56] = "Print";
    IconType[IconType["Write"] = 57] = "Write";
    IconType[IconType["Theme"] = 58] = "Theme";
    IconType[IconType["Adjust"] = 59] = "Adjust";
    IconType[IconType["Edit"] = 60] = "Edit";
    IconType[IconType["ExternalShare"] = 61] = "ExternalShare";
    IconType[IconType["Ban"] = 62] = "Ban";
    IconType[IconType["MailForward"] = 63] = "MailForward";
    IconType[IconType["Share"] = 64] = "Share";
    IconType[IconType["Expand"] = 65] = "Expand";
    IconType[IconType["Compress"] = 66] = "Compress";
    IconType[IconType["Unhide"] = 67] = "Unhide";
    IconType[IconType["Hide"] = 68] = "Hide";
    IconType[IconType["Random"] = 69] = "Random";
    IconType[IconType["Retweet"] = 70] = "Retweet";
    IconType[IconType["SignOut"] = 71] = "SignOut";
    IconType[IconType["Pin"] = 72] = "Pin";
    IconType[IconType["SignIn"] = 73] = "SignIn";
    IconType[IconType["Upload"] = 74] = "Upload";
    IconType[IconType["Call"] = 75] = "Call";
    IconType[IconType["CallSquare"] = 76] = "CallSquare";
    IconType[IconType["RemoveBookmark"] = 77] = "RemoveBookmark";
    IconType[IconType["Unlock"] = 78] = "Unlock";
    IconType[IconType["Configure"] = 79] = "Configure";
    IconType[IconType["Filter"] = 80] = "Filter";
    IconType[IconType["Wizard"] = 81] = "Wizard";
    IconType[IconType["Undo"] = 82] = "Undo";
    IconType[IconType["Exchange"] = 83] = "Exchange";
    IconType[IconType["CloudDownload"] = 84] = "CloudDownload";
    IconType[IconType["CloudUpload"] = 85] = "CloudUpload";
    IconType[IconType["Reply"] = 86] = "Reply";
    IconType[IconType["ReplyAll"] = 87] = "ReplyAll";
    IconType[IconType["Erase"] = 88] = "Erase";
    IconType[IconType["UnlockAlternate"] = 89] = "UnlockAlternate";
    IconType[IconType["Archive"] = 90] = "Archive";
    IconType[IconType["Translate"] = 91] = "Translate";
    IconType[IconType["Recycle"] = 92] = "Recycle";
    IconType[IconType["Send"] = 93] = "Send";
    IconType[IconType["SendOutline"] = 94] = "SendOutline";
    IconType[IconType["ShareAlternate"] = 95] = "ShareAlternate";
    IconType[IconType["ShareAlternateSquare"] = 96] = "ShareAlternateSquare";
    IconType[IconType["Wait"] = 97] = "Wait";
    IconType[IconType["WriteSquare"] = 98] = "WriteSquare";
    IconType[IconType["ShareSquare"] = 99] = "ShareSquare";
    IconType[IconType["AddToCart"] = 100] = "AddToCart";
    IconType[IconType["InCart"] = 101] = "InCart";
    IconType[IconType["AddUser"] = 102] = "AddUser";
    IconType[IconType["RemoveUser"] = 103] = "RemoveUser";
    IconType[IconType["HelpCircle"] = 104] = "HelpCircle";
    IconType[IconType["InfoCircle"] = 105] = "InfoCircle";
    IconType[IconType["Warning"] = 106] = "Warning";
    IconType[IconType["WarningCircle"] = 107] = "WarningCircle";
    IconType[IconType["WarningSign"] = 108] = "WarningSign";
    IconType[IconType["Help"] = 109] = "Help";
    IconType[IconType["Info"] = 110] = "Info";
    IconType[IconType["Announcement"] = 111] = "Announcement";
    IconType[IconType["Birthday"] = 112] = "Birthday";
    IconType[IconType["Users"] = 113] = "Users";
    IconType[IconType["Doctor"] = 114] = "Doctor";
    IconType[IconType["Child"] = 115] = "Child";
    IconType[IconType["User"] = 116] = "User";
    IconType[IconType["Handicap"] = 117] = "Handicap";
    IconType[IconType["Student"] = 118] = "Student";
    IconType[IconType["Spy"] = 119] = "Spy";
    IconType[IconType["GridLayout"] = 120] = "GridLayout";
    IconType[IconType["ListLayout"] = 121] = "ListLayout";
    IconType[IconType["BlockLayout"] = 122] = "BlockLayout";
    IconType[IconType["Zoom"] = 123] = "Zoom";
    IconType[IconType["ZoomOut"] = 124] = "ZoomOut";
    IconType[IconType["ResizeVertical"] = 125] = "ResizeVertical";
    IconType[IconType["ResizeHorizontal"] = 126] = "ResizeHorizontal";
    IconType[IconType["Maximize"] = 127] = "Maximize";
    IconType[IconType["Crop"] = 128] = "Crop";
    IconType[IconType["Female"] = 129] = "Female";
    IconType[IconType["Male"] = 130] = "Male";
    IconType[IconType["Woman"] = 131] = "Woman";
    IconType[IconType["Man"] = 132] = "Man";
    IconType[IconType["NonBinaryTransgender"] = 133] = "NonBinaryTransgender";
    IconType[IconType["Intergender"] = 134] = "Intergender";
    IconType[IconType["Transgender"] = 135] = "Transgender";
    IconType[IconType["Lesbian"] = 136] = "Lesbian";
    IconType[IconType["Gay"] = 137] = "Gay";
    IconType[IconType["Heterosexual"] = 138] = "Heterosexual";
    IconType[IconType["OtherGender"] = 139] = "OtherGender";
    IconType[IconType["OtherGenderVertical"] = 140] = "OtherGenderVertical";
    IconType[IconType["OtherGenderHorizontal"] = 141] = "OtherGenderHorizontal";
    IconType[IconType["Neuter"] = 142] = "Neuter";
    IconType[IconType["Cocktail"] = 143] = "Cocktail";
    IconType[IconType["Road"] = 144] = "Road";
    IconType[IconType["Flag"] = 145] = "Flag";
    IconType[IconType["Book"] = 146] = "Book";
    IconType[IconType["Gift"] = 147] = "Gift";
    IconType[IconType["Leaf"] = 148] = "Leaf";
    IconType[IconType["Fire"] = 149] = "Fire";
    IconType[IconType["Plane"] = 150] = "Plane";
    IconType[IconType["Magnet"] = 151] = "Magnet";
    IconType[IconType["Legal"] = 152] = "Legal";
    IconType[IconType["Lemon"] = 153] = "Lemon";
    IconType[IconType["World"] = 154] = "World";
    IconType[IconType["Travel"] = 155] = "Travel";
    IconType[IconType["Shipping"] = 156] = "Shipping";
    IconType[IconType["Money"] = 157] = "Money";
    IconType[IconType["Lightning"] = 158] = "Lightning";
    IconType[IconType["Rain"] = 159] = "Rain";
    IconType[IconType["Treatment"] = 160] = "Treatment";
    IconType[IconType["Suitcase"] = 161] = "Suitcase";
    IconType[IconType["Bar"] = 162] = "Bar";
    IconType[IconType["FlagOutline"] = 163] = "FlagOutline";
    IconType[IconType["FlagCheckered"] = 164] = "FlagCheckered";
    IconType[IconType["Puzzle"] = 165] = "Puzzle";
    IconType[IconType["FireExtinguisher"] = 166] = "FireExtinguisher";
    IconType[IconType["Rocket"] = 167] = "Rocket";
    IconType[IconType["Anchor"] = 168] = "Anchor";
    IconType[IconType["Bullseye"] = 169] = "Bullseye";
    IconType[IconType["Sun"] = 170] = "Sun";
    IconType[IconType["Moon"] = 171] = "Moon";
    IconType[IconType["Fax"] = 172] = "Fax";
    IconType[IconType["LifeRing"] = 173] = "LifeRing";
    IconType[IconType["Bomb"] = 174] = "Bomb";
    IconType[IconType["Soccer"] = 175] = "Soccer";
    IconType[IconType["Calculator"] = 176] = "Calculator";
    IconType[IconType["Diamond"] = 177] = "Diamond";
    IconType[IconType["Crosshairs"] = 178] = "Crosshairs";
    IconType[IconType["Asterisk"] = 179] = "Asterisk";
    IconType[IconType["Certificate"] = 180] = "Certificate";
    IconType[IconType["Circle"] = 181] = "Circle";
    IconType[IconType["QuoteLeft"] = 182] = "QuoteLeft";
    IconType[IconType["QuoteRight"] = 183] = "QuoteRight";
    IconType[IconType["EllipsisHorizontal"] = 184] = "EllipsisHorizontal";
    IconType[IconType["EllipsisVertical"] = 185] = "EllipsisVertical";
    IconType[IconType["Cube"] = 186] = "Cube";
    IconType[IconType["Cubes"] = 187] = "Cubes";
    IconType[IconType["CircleNotched"] = 188] = "CircleNotched";
    IconType[IconType["CircleThin"] = 189] = "CircleThin";
    IconType[IconType["SquareOutline"] = 190] = "SquareOutline";
    IconType[IconType["Square"] = 191] = "Square";
    IconType[IconType["Checkmark"] = 192] = "Checkmark";
    IconType[IconType["Remove"] = 193] = "Remove";
    IconType[IconType["CheckmarkBox"] = 194] = "CheckmarkBox";
    IconType[IconType["Move"] = 195] = "Move";
    IconType[IconType["AddCircle"] = 196] = "AddCircle";
    IconType[IconType["MinusCircle"] = 197] = "MinusCircle";
    IconType[IconType["RemoveCircle"] = 198] = "RemoveCircle";
    IconType[IconType["CheckCircle"] = 199] = "CheckCircle";
    IconType[IconType["RemoveCircleOutline"] = 200] = "RemoveCircleOutline";
    IconType[IconType["CheckCircleOutline"] = 201] = "CheckCircleOutline";
    IconType[IconType["Plus"] = 202] = "Plus";
    IconType[IconType["Minus"] = 203] = "Minus";
    IconType[IconType["AddSquare"] = 204] = "AddSquare";
    IconType[IconType["Radio"] = 205] = "Radio";
    IconType[IconType["SelectedRadio"] = 206] = "SelectedRadio";
    IconType[IconType["MinusSquare"] = 207] = "MinusSquare";
    IconType[IconType["MinusSquareOutline"] = 208] = "MinusSquareOutline";
    IconType[IconType["CheckSquare"] = 209] = "CheckSquare";
    IconType[IconType["PlusSquareOutline"] = 210] = "PlusSquareOutline";
    IconType[IconType["ToggleOff"] = 211] = "ToggleOff";
    IconType[IconType["ToggleOn"] = 212] = "ToggleOn";
    IconType[IconType["Film"] = 213] = "Film";
    IconType[IconType["Sound"] = 214] = "Sound";
    IconType[IconType["Photo"] = 215] = "Photo";
    IconType[IconType["BarChart"] = 216] = "BarChart";
    IconType[IconType["CameraRetro"] = 217] = "CameraRetro";
    IconType[IconType["Newspaper"] = 218] = "Newspaper";
    IconType[IconType["AreaChart"] = 219] = "AreaChart";
    IconType[IconType["PieChart"] = 220] = "PieChart";
    IconType[IconType["LineChart"] = 221] = "LineChart";
    IconType[IconType["ArrowCircleOutlineDown"] = 222] = "ArrowCircleOutlineDown";
    IconType[IconType["ArrowCircleOutlineUp"] = 223] = "ArrowCircleOutlineUp";
    IconType[IconType["ChevronLeft"] = 224] = "ChevronLeft";
    IconType[IconType["ChevronRight"] = 225] = "ChevronRight";
    IconType[IconType["ArrowLeft"] = 226] = "ArrowLeft";
    IconType[IconType["ArrowRight"] = 227] = "ArrowRight";
    IconType[IconType["ArrowUp"] = 228] = "ArrowUp";
    IconType[IconType["ArrowDown"] = 229] = "ArrowDown";
    IconType[IconType["ChevronUp"] = 230] = "ChevronUp";
    IconType[IconType["ChevronDown"] = 231] = "ChevronDown";
    IconType[IconType["PointingRight"] = 232] = "PointingRight";
    IconType[IconType["PointingLeft"] = 233] = "PointingLeft";
    IconType[IconType["PointingUp"] = 234] = "PointingUp";
    IconType[IconType["PointingDown"] = 235] = "PointingDown";
    IconType[IconType["ArrowCircleLeft"] = 236] = "ArrowCircleLeft";
    IconType[IconType["ArrowCircleRight"] = 237] = "ArrowCircleRight";
    IconType[IconType["ArrowCircleUp"] = 238] = "ArrowCircleUp";
    IconType[IconType["ArrowCircleDown"] = 239] = "ArrowCircleDown";
    IconType[IconType["CaretDown"] = 240] = "CaretDown";
    IconType[IconType["CaretUp"] = 241] = "CaretUp";
    IconType[IconType["CaretLeft"] = 242] = "CaretLeft";
    IconType[IconType["CaretRight"] = 243] = "CaretRight";
    IconType[IconType["AngleDoubleLeft"] = 244] = "AngleDoubleLeft";
    IconType[IconType["AngleDoubleRight"] = 245] = "AngleDoubleRight";
    IconType[IconType["AngleDoubleUp"] = 246] = "AngleDoubleUp";
    IconType[IconType["AngleDoubleDown"] = 247] = "AngleDoubleDown";
    IconType[IconType["AngleLeft"] = 248] = "AngleLeft";
    IconType[IconType["AngleRight"] = 249] = "AngleRight";
    IconType[IconType["AngleUp"] = 250] = "AngleUp";
    IconType[IconType["AngleDown"] = 251] = "AngleDown";
    IconType[IconType["ChevronCircleLeft"] = 252] = "ChevronCircleLeft";
    IconType[IconType["ChevronCircleRight"] = 253] = "ChevronCircleRight";
    IconType[IconType["ChevronCircleUp"] = 254] = "ChevronCircleUp";
    IconType[IconType["ChevronCircleDown"] = 255] = "ChevronCircleDown";
    IconType[IconType["ToggleDown"] = 256] = "ToggleDown";
    IconType[IconType["ToggleUp"] = 257] = "ToggleUp";
    IconType[IconType["ToggleRight"] = 258] = "ToggleRight";
    IconType[IconType["LongArrowDown"] = 259] = "LongArrowDown";
    IconType[IconType["LongArrowUp"] = 260] = "LongArrowUp";
    IconType[IconType["LongArrowLeft"] = 261] = "LongArrowLeft";
    IconType[IconType["LongArrowRight"] = 262] = "LongArrowRight";
    IconType[IconType["ArrowCircleOutlineRight"] = 263] = "ArrowCircleOutlineRight";
    IconType[IconType["ArrowCircleOutlineLeft"] = 264] = "ArrowCircleOutlineLeft";
    IconType[IconType["ToggleLeft"] = 265] = "ToggleLeft";
    IconType[IconType["Power"] = 266] = "Power";
    IconType[IconType["Trash"] = 267] = "Trash";
    IconType[IconType["TrashOutline"] = 268] = "TrashOutline";
    IconType[IconType["DiskOutline"] = 269] = "DiskOutline";
    IconType[IconType["Desktop"] = 270] = "Desktop";
    IconType[IconType["Laptop"] = 271] = "Laptop";
    IconType[IconType["Tablet"] = 272] = "Tablet";
    IconType[IconType["Mobile"] = 273] = "Mobile";
    IconType[IconType["Game"] = 274] = "Game";
    IconType[IconType["Keyboard"] = 275] = "Keyboard";
    IconType[IconType["Plug"] = 276] = "Plug";
    IconType[IconType["Folder"] = 277] = "Folder";
    IconType[IconType["FolderOpen"] = 278] = "FolderOpen";
    IconType[IconType["LevelUp"] = 279] = "LevelUp";
    IconType[IconType["LevelDown"] = 280] = "LevelDown";
    IconType[IconType["File"] = 281] = "File";
    IconType[IconType["FileOutline"] = 282] = "FileOutline";
    IconType[IconType["FileText"] = 283] = "FileText";
    IconType[IconType["FileTextOutline"] = 284] = "FileTextOutline";
    IconType[IconType["FolderOutline"] = 285] = "FolderOutline";
    IconType[IconType["FolderOpenOutline"] = 286] = "FolderOpenOutline";
    IconType[IconType["FilePdfOutline"] = 287] = "FilePdfOutline";
    IconType[IconType["FileWordOutline"] = 288] = "FileWordOutline";
    IconType[IconType["FileExcelOutline"] = 289] = "FileExcelOutline";
    IconType[IconType["FilePowerpointOutline"] = 290] = "FilePowerpointOutline";
    IconType[IconType["FileImageOutline"] = 291] = "FileImageOutline";
    IconType[IconType["FileArchiveOutline"] = 292] = "FileArchiveOutline";
    IconType[IconType["FileAudioOutline"] = 293] = "FileAudioOutline";
    IconType[IconType["FileVideoOutline"] = 294] = "FileVideoOutline";
    IconType[IconType["FileCodeOutline"] = 295] = "FileCodeOutline";
    IconType[IconType["Barcode"] = 296] = "Barcode";
    IconType[IconType["Qrcode"] = 297] = "Qrcode";
    IconType[IconType["Fork"] = 298] = "Fork";
    IconType[IconType["Html5"] = 299] = "Html5";
    IconType[IconType["Css3"] = 300] = "Css3";
    IconType[IconType["Rss"] = 301] = "Rss";
    IconType[IconType["RssSquare"] = 302] = "RssSquare";
    IconType[IconType["Openid"] = 303] = "Openid";
    IconType[IconType["Database"] = 304] = "Database";
    IconType[IconType["Server"] = 305] = "Server";
    IconType[IconType["Heart"] = 306] = "Heart";
    IconType[IconType["Star"] = 307] = "Star";
    IconType[IconType["EmptyStar"] = 308] = "EmptyStar";
    IconType[IconType["ThumbsOutlineUp"] = 309] = "ThumbsOutlineUp";
    IconType[IconType["ThumbsOutlineDown"] = 310] = "ThumbsOutlineDown";
    IconType[IconType["StarHalf"] = 311] = "StarHalf";
    IconType[IconType["EmptyHeart"] = 312] = "EmptyHeart";
    IconType[IconType["Smile"] = 313] = "Smile";
    IconType[IconType["Frown"] = 314] = "Frown";
    IconType[IconType["Meh"] = 315] = "Meh";
    IconType[IconType["StarHalfEmpty"] = 316] = "StarHalfEmpty";
    IconType[IconType["ThumbsUp"] = 317] = "ThumbsUp";
    IconType[IconType["ThumbsDown"] = 318] = "ThumbsDown";
    IconType[IconType["Music"] = 319] = "Music";
    IconType[IconType["VideoPlayOutline"] = 320] = "VideoPlayOutline";
    IconType[IconType["VolumeOff"] = 321] = "VolumeOff";
    IconType[IconType["VolumeDown"] = 322] = "VolumeDown";
    IconType[IconType["VolumeUp"] = 323] = "VolumeUp";
    IconType[IconType["Record"] = 324] = "Record";
    IconType[IconType["StepBackward"] = 325] = "StepBackward";
    IconType[IconType["FastBackward"] = 326] = "FastBackward";
    IconType[IconType["Backward"] = 327] = "Backward";
    IconType[IconType["Play"] = 328] = "Play";
    IconType[IconType["Pause"] = 329] = "Pause";
    IconType[IconType["Stop"] = 330] = "Stop";
    IconType[IconType["Forward"] = 331] = "Forward";
    IconType[IconType["FastForward"] = 332] = "FastForward";
    IconType[IconType["StepForward"] = 333] = "StepForward";
    IconType[IconType["Eject"] = 334] = "Eject";
    IconType[IconType["Unmute"] = 335] = "Unmute";
    IconType[IconType["Mute"] = 336] = "Mute";
    IconType[IconType["VideoPlay"] = 337] = "VideoPlay";
    IconType[IconType["ClosedCaptioning"] = 338] = "ClosedCaptioning";
    IconType[IconType["Marker"] = 339] = "Marker";
    IconType[IconType["Coffee"] = 340] = "Coffee";
    IconType[IconType["Food"] = 341] = "Food";
    IconType[IconType["BuildingOutline"] = 342] = "BuildingOutline";
    IconType[IconType["Hospital"] = 343] = "Hospital";
    IconType[IconType["Emergency"] = 344] = "Emergency";
    IconType[IconType["FirstAid"] = 345] = "FirstAid";
    IconType[IconType["Military"] = 346] = "Military";
    IconType[IconType["H"] = 347] = "H";
    IconType[IconType["LocationArrow"] = 348] = "LocationArrow";
    IconType[IconType["SpaceShuttle"] = 349] = "SpaceShuttle";
    IconType[IconType["University"] = 350] = "University";
    IconType[IconType["Building"] = 351] = "Building";
    IconType[IconType["Paw"] = 352] = "Paw";
    IconType[IconType["Spoon"] = 353] = "Spoon";
    IconType[IconType["Car"] = 354] = "Car";
    IconType[IconType["Taxi"] = 355] = "Taxi";
    IconType[IconType["Tree"] = 356] = "Tree";
    IconType[IconType["Bicycle"] = 357] = "Bicycle";
    IconType[IconType["Bus"] = 358] = "Bus";
    IconType[IconType["Ship"] = 359] = "Ship";
    IconType[IconType["Motorcycle"] = 360] = "Motorcycle";
    IconType[IconType["StreetView"] = 361] = "StreetView";
    IconType[IconType["Hotel"] = 362] = "Hotel";
    IconType[IconType["Train"] = 363] = "Train";
    IconType[IconType["Subway"] = 364] = "Subway";
    IconType[IconType["Table"] = 365] = "Table";
    IconType[IconType["Columns"] = 366] = "Columns";
    IconType[IconType["Sort"] = 367] = "Sort";
    IconType[IconType["SortAscending"] = 368] = "SortAscending";
    IconType[IconType["SortDescending"] = 369] = "SortDescending";
    IconType[IconType["SortAlphabetAscending"] = 370] = "SortAlphabetAscending";
    IconType[IconType["SortAlphabetDescending"] = 371] = "SortAlphabetDescending";
    IconType[IconType["SortContentAscending"] = 372] = "SortContentAscending";
    IconType[IconType["SortContentDescending"] = 373] = "SortContentDescending";
    IconType[IconType["SortNumericAscending"] = 374] = "SortNumericAscending";
    IconType[IconType["SortNumericDescending"] = 375] = "SortNumericDescending";
    IconType[IconType["Font"] = 376] = "Font";
    IconType[IconType["Bold"] = 377] = "Bold";
    IconType[IconType["Italic"] = 378] = "Italic";
    IconType[IconType["TextHeight"] = 379] = "TextHeight";
    IconType[IconType["TextWidth"] = 380] = "TextWidth";
    IconType[IconType["AlignLeft"] = 381] = "AlignLeft";
    IconType[IconType["AlignCenter"] = 382] = "AlignCenter";
    IconType[IconType["AlignRight"] = 383] = "AlignRight";
    IconType[IconType["AlignJustify"] = 384] = "AlignJustify";
    IconType[IconType["List"] = 385] = "List";
    IconType[IconType["Outdent"] = 386] = "Outdent";
    IconType[IconType["Indent"] = 387] = "Indent";
    IconType[IconType["Linkify"] = 388] = "Linkify";
    IconType[IconType["Cut"] = 389] = "Cut";
    IconType[IconType["Copy"] = 390] = "Copy";
    IconType[IconType["Attach"] = 391] = "Attach";
    IconType[IconType["Save"] = 392] = "Save";
    IconType[IconType["Content"] = 393] = "Content";
    IconType[IconType["UnorderedList"] = 394] = "UnorderedList";
    IconType[IconType["OrderedList"] = 395] = "OrderedList";
    IconType[IconType["Strikethrough"] = 396] = "Strikethrough";
    IconType[IconType["Underline"] = 397] = "Underline";
    IconType[IconType["Paste"] = 398] = "Paste";
    IconType[IconType["Unlink"] = 399] = "Unlink";
    IconType[IconType["Superscript"] = 400] = "Superscript";
    IconType[IconType["Subscript"] = 401] = "Subscript";
    IconType[IconType["Header"] = 402] = "Header";
    IconType[IconType["Paragraph"] = 403] = "Paragraph";
    IconType[IconType["Euro"] = 404] = "Euro";
    IconType[IconType["Pound"] = 405] = "Pound";
    IconType[IconType["Dollar"] = 406] = "Dollar";
    IconType[IconType["Rupee"] = 407] = "Rupee";
    IconType[IconType["Yen"] = 408] = "Yen";
    IconType[IconType["Ruble"] = 409] = "Ruble";
    IconType[IconType["Won"] = 410] = "Won";
    IconType[IconType["Lira"] = 411] = "Lira";
    IconType[IconType["Shekel"] = 412] = "Shekel";
    IconType[IconType["Paypal"] = 413] = "Paypal";
    IconType[IconType["PaypalCard"] = 414] = "PaypalCard";
    IconType[IconType["GoogleWallet"] = 415] = "GoogleWallet";
    IconType[IconType["Visa"] = 416] = "Visa";
    IconType[IconType["Mastercard"] = 417] = "Mastercard";
    IconType[IconType["Discover"] = 418] = "Discover";
    IconType[IconType["AmericanExpress"] = 419] = "AmericanExpress";
    IconType[IconType["Stripe"] = 420] = "Stripe";
    IconType[IconType["TwitterSquare"] = 421] = "TwitterSquare";
    IconType[IconType["FacebookSquare"] = 422] = "FacebookSquare";
    IconType[IconType["LinkedinSquare"] = 423] = "LinkedinSquare";
    IconType[IconType["GithubSquare"] = 424] = "GithubSquare";
    IconType[IconType["Twitter"] = 425] = "Twitter";
    IconType[IconType["Facebook"] = 426] = "Facebook";
    IconType[IconType["Github"] = 427] = "Github";
    IconType[IconType["Pinterest"] = 428] = "Pinterest";
    IconType[IconType["PinterestSquare"] = 429] = "PinterestSquare";
    IconType[IconType["GooglePlusSquare"] = 430] = "GooglePlusSquare";
    IconType[IconType["GooglePlus"] = 431] = "GooglePlus";
    IconType[IconType["Linkedin"] = 432] = "Linkedin";
    IconType[IconType["GithubAlternate"] = 433] = "GithubAlternate";
    IconType[IconType["Maxcdn"] = 434] = "Maxcdn";
    IconType[IconType["Bitcoin"] = 435] = "Bitcoin";
    IconType[IconType["YoutubeSquare"] = 436] = "YoutubeSquare";
    IconType[IconType["Youtube"] = 437] = "Youtube";
    IconType[IconType["Xing"] = 438] = "Xing";
    IconType[IconType["XingSquare"] = 439] = "XingSquare";
    IconType[IconType["YoutubePlay"] = 440] = "YoutubePlay";
    IconType[IconType["Dropbox"] = 441] = "Dropbox";
    IconType[IconType["StackOverflow"] = 442] = "StackOverflow";
    IconType[IconType["Instagram"] = 443] = "Instagram";
    IconType[IconType["Flickr"] = 444] = "Flickr";
    IconType[IconType["Adn"] = 445] = "Adn";
    IconType[IconType["Bitbucket"] = 446] = "Bitbucket";
    IconType[IconType["BitbucketSquare"] = 447] = "BitbucketSquare";
    IconType[IconType["Tumblr"] = 448] = "Tumblr";
    IconType[IconType["TumblrSquare"] = 449] = "TumblrSquare";
    IconType[IconType["Apple"] = 450] = "Apple";
    IconType[IconType["Windows"] = 451] = "Windows";
    IconType[IconType["Android"] = 452] = "Android";
    IconType[IconType["Linux"] = 453] = "Linux";
    IconType[IconType["Dribbble"] = 454] = "Dribbble";
    IconType[IconType["Skype"] = 455] = "Skype";
    IconType[IconType["Foursquare"] = 456] = "Foursquare";
    IconType[IconType["Trello"] = 457] = "Trello";
    IconType[IconType["Gittip"] = 458] = "Gittip";
    IconType[IconType["Vk"] = 459] = "Vk";
    IconType[IconType["Weibo"] = 460] = "Weibo";
    IconType[IconType["Renren"] = 461] = "Renren";
    IconType[IconType["Pagelines"] = 462] = "Pagelines";
    IconType[IconType["StackExchange"] = 463] = "StackExchange";
    IconType[IconType["Vimeo"] = 464] = "Vimeo";
    IconType[IconType["Slack"] = 465] = "Slack";
    IconType[IconType["Wordpress"] = 466] = "Wordpress";
    IconType[IconType["Yahoo"] = 467] = "Yahoo";
    IconType[IconType["Google"] = 468] = "Google";
    IconType[IconType["Reddit"] = 469] = "Reddit";
    IconType[IconType["RedditSquare"] = 470] = "RedditSquare";
    IconType[IconType["StumbleuponCircle"] = 471] = "StumbleuponCircle";
    IconType[IconType["Stumbleupon"] = 472] = "Stumbleupon";
    IconType[IconType["Delicious"] = 473] = "Delicious";
    IconType[IconType["Digg"] = 474] = "Digg";
    IconType[IconType["PiedPiper"] = 475] = "PiedPiper";
    IconType[IconType["PiedPiperAlternate"] = 476] = "PiedPiperAlternate";
    IconType[IconType["Drupal"] = 477] = "Drupal";
    IconType[IconType["Joomla"] = 478] = "Joomla";
    IconType[IconType["Behance"] = 479] = "Behance";
    IconType[IconType["BehanceSquare"] = 480] = "BehanceSquare";
    IconType[IconType["Steam"] = 481] = "Steam";
    IconType[IconType["SteamSquare"] = 482] = "SteamSquare";
    IconType[IconType["Spotify"] = 483] = "Spotify";
    IconType[IconType["Deviantart"] = 484] = "Deviantart";
    IconType[IconType["Soundcloud"] = 485] = "Soundcloud";
    IconType[IconType["Vine"] = 486] = "Vine";
    IconType[IconType["Codepen"] = 487] = "Codepen";
    IconType[IconType["Jsfiddle"] = 488] = "Jsfiddle";
    IconType[IconType["Rebel"] = 489] = "Rebel";
    IconType[IconType["Empire"] = 490] = "Empire";
    IconType[IconType["GitSquare"] = 491] = "GitSquare";
    IconType[IconType["Git"] = 492] = "Git";
    IconType[IconType["HackerNews"] = 493] = "HackerNews";
    IconType[IconType["TencentWeibo"] = 494] = "TencentWeibo";
    IconType[IconType["Qq"] = 495] = "Qq";
    IconType[IconType["Wechat"] = 496] = "Wechat";
    IconType[IconType["Slideshare"] = 497] = "Slideshare";
    IconType[IconType["Twitch"] = 498] = "Twitch";
    IconType[IconType["Yelp"] = 499] = "Yelp";
    IconType[IconType["Lastfm"] = 500] = "Lastfm";
    IconType[IconType["LastfmSquare"] = 501] = "LastfmSquare";
    IconType[IconType["Ioxhost"] = 502] = "Ioxhost";
    IconType[IconType["Angellist"] = 503] = "Angellist";
    IconType[IconType["Meanpath"] = 504] = "Meanpath";
    IconType[IconType["Buysellads"] = 505] = "Buysellads";
    IconType[IconType["Connectdevelop"] = 506] = "Connectdevelop";
    IconType[IconType["Dashcube"] = 507] = "Dashcube";
    IconType[IconType["Forumbee"] = 508] = "Forumbee";
    IconType[IconType["Leanpub"] = 509] = "Leanpub";
    IconType[IconType["Sellsy"] = 510] = "Sellsy";
    IconType[IconType["Shirtsinbulk"] = 511] = "Shirtsinbulk";
    IconType[IconType["Simplybuilt"] = 512] = "Simplybuilt";
    IconType[IconType["Skyatlas"] = 513] = "Skyatlas";
    IconType[IconType["Whatsapp"] = 514] = "Whatsapp";
    IconType[IconType["Viacoin"] = 515] = "Viacoin";
    IconType[IconType["Medium"] = 516] = "Medium";
    IconType[IconType["Like"] = 517] = "Like";
    IconType[IconType["Favorite"] = 518] = "Favorite";
    IconType[IconType["Video"] = 519] = "Video";
    IconType[IconType["Check"] = 520] = "Check";
    IconType[IconType["Close"] = 521] = "Close";
    IconType[IconType["Cancel"] = 522] = "Cancel";
    IconType[IconType["Delete"] = 523] = "Delete";
    IconType[IconType["X"] = 524] = "X";
    IconType[IconType["UserTimes"] = 525] = "UserTimes";
    IconType[IconType["UserClose"] = 526] = "UserClose";
    IconType[IconType["UserCancel"] = 527] = "UserCancel";
    IconType[IconType["UserDelete"] = 528] = "UserDelete";
    IconType[IconType["UserX"] = 529] = "UserX";
    IconType[IconType["ZoomIn"] = 530] = "ZoomIn";
    IconType[IconType["Magnify"] = 531] = "Magnify";
    IconType[IconType["Shutdown"] = 532] = "Shutdown";
    IconType[IconType["Clock"] = 533] = "Clock";
    IconType[IconType["Time"] = 534] = "Time";
    IconType[IconType["PlayCircleOutline"] = 535] = "PlayCircleOutline";
    IconType[IconType["Headphone"] = 536] = "Headphone";
    IconType[IconType["Camera"] = 537] = "Camera";
    IconType[IconType["VideoCamera"] = 538] = "VideoCamera";
    IconType[IconType["Picture"] = 539] = "Picture";
    IconType[IconType["Pencil"] = 540] = "Pencil";
    IconType[IconType["Compose"] = 541] = "Compose";
    IconType[IconType["Point"] = 542] = "Point";
    IconType[IconType["Tint"] = 543] = "Tint";
    IconType[IconType["Signup"] = 544] = "Signup";
    IconType[IconType["PlusCircle"] = 545] = "PlusCircle";
    IconType[IconType["Dont"] = 546] = "Dont";
    IconType[IconType["Minimize"] = 547] = "Minimize";
    IconType[IconType["Add"] = 548] = "Add";
    IconType[IconType["Eye"] = 549] = "Eye";
    IconType[IconType["Attention"] = 550] = "Attention";
    IconType[IconType["Cart"] = 551] = "Cart";
    IconType[IconType["Shuffle"] = 552] = "Shuffle";
    IconType[IconType["Talk"] = 553] = "Talk";
    IconType[IconType["Chat"] = 554] = "Chat";
    IconType[IconType["ShoppingCart"] = 555] = "ShoppingCart";
    IconType[IconType["BarGraph"] = 556] = "BarGraph";
    IconType[IconType["AreaGraph"] = 557] = "AreaGraph";
    IconType[IconType["PieGraph"] = 558] = "PieGraph";
    IconType[IconType["LineGraph"] = 559] = "LineGraph";
    IconType[IconType["Key"] = 560] = "Key";
    IconType[IconType["Cogs"] = 561] = "Cogs";
    IconType[IconType["Discussions"] = 562] = "Discussions";
    IconType[IconType["LikeOutline"] = 563] = "LikeOutline";
    IconType[IconType["DislikeOutline"] = 564] = "DislikeOutline";
    IconType[IconType["HeartOutline"] = 565] = "HeartOutline";
    IconType[IconType["LogOut"] = 566] = "LogOut";
    IconType[IconType["ThumbTack"] = 567] = "ThumbTack";
    IconType[IconType["Winner"] = 568] = "Winner";
    IconType[IconType["BookmarkOutline"] = 569] = "BookmarkOutline";
    IconType[IconType["Phone"] = 570] = "Phone";
    IconType[IconType["PhoneSquare"] = 571] = "PhoneSquare";
    IconType[IconType["CreditCard"] = 572] = "CreditCard";
    IconType[IconType["HddOutline"] = 573] = "HddOutline";
    IconType[IconType["Bullhorn"] = 574] = "Bullhorn";
    IconType[IconType["Bell"] = 575] = "Bell";
    IconType[IconType["BellOutline"] = 576] = "BellOutline";
    IconType[IconType["BellSlash"] = 577] = "BellSlash";
    IconType[IconType["BellSlashOutline"] = 578] = "BellSlashOutline";
    IconType[IconType["HandOutlineRight"] = 579] = "HandOutlineRight";
    IconType[IconType["HandOutlineLeft"] = 580] = "HandOutlineLeft";
    IconType[IconType["HandOutlineUp"] = 581] = "HandOutlineUp";
    IconType[IconType["HandOutlineDown"] = 582] = "HandOutlineDown";
    IconType[IconType["Globe"] = 583] = "Globe";
    IconType[IconType["Wrench"] = 584] = "Wrench";
    IconType[IconType["Briefcase"] = 585] = "Briefcase";
    IconType[IconType["Group"] = 586] = "Group";
    IconType[IconType["Flask"] = 587] = "Flask";
    IconType[IconType["Sidebar"] = 588] = "Sidebar";
    IconType[IconType["Bars"] = 589] = "Bars";
    IconType[IconType["ListUl"] = 590] = "ListUl";
    IconType[IconType["ListOl"] = 591] = "ListOl";
    IconType[IconType["NumberedList"] = 592] = "NumberedList";
    IconType[IconType["Magic"] = 593] = "Magic";
    IconType[IconType["Truck"] = 594] = "Truck";
    IconType[IconType["Currency"] = 595] = "Currency";
    IconType[IconType["TriangleDown"] = 596] = "TriangleDown";
    IconType[IconType["Dropdown"] = 597] = "Dropdown";
    IconType[IconType["TriangleUp"] = 598] = "TriangleUp";
    IconType[IconType["TriangleLeft"] = 599] = "TriangleLeft";
    IconType[IconType["TriangleRight"] = 600] = "TriangleRight";
    IconType[IconType["Envelope"] = 601] = "Envelope";
    IconType[IconType["Conversation"] = 602] = "Conversation";
    IconType[IconType["Umbrella"] = 603] = "Umbrella";
    IconType[IconType["Clipboard"] = 604] = "Clipboard";
    IconType[IconType["Lightbulb"] = 605] = "Lightbulb";
    IconType[IconType["Ambulance"] = 606] = "Ambulance";
    IconType[IconType["Medkit"] = 607] = "Medkit";
    IconType[IconType["FighterJet"] = 608] = "FighterJet";
    IconType[IconType["Beer"] = 609] = "Beer";
    IconType[IconType["PlusSquare"] = 610] = "PlusSquare";
    IconType[IconType["Computer"] = 611] = "Computer";
    IconType[IconType["CircleOutline"] = 612] = "CircleOutline";
    IconType[IconType["Intersex"] = 613] = "Intersex";
    IconType[IconType["Asexual"] = 614] = "Asexual";
    IconType[IconType["Spinner"] = 615] = "Spinner";
    IconType[IconType["Gamepad"] = 616] = "Gamepad";
    IconType[IconType["StarHalfFull"] = 617] = "StarHalfFull";
    IconType[IconType["Question"] = 618] = "Question";
    IconType[IconType["Eraser"] = 619] = "Eraser";
    IconType[IconType["Microphone"] = 620] = "Microphone";
    IconType[IconType["MicrophoneSlash"] = 621] = "MicrophoneSlash";
    IconType[IconType["Shield"] = 622] = "Shield";
    IconType[IconType["Target"] = 623] = "Target";
    IconType[IconType["PlayCircle"] = 624] = "PlayCircle";
    IconType[IconType["PencilSquare"] = 625] = "PencilSquare";
    IconType[IconType["Compass"] = 626] = "Compass";
    IconType[IconType["Amex"] = 627] = "Amex";
    IconType[IconType["Eur"] = 628] = "Eur";
    IconType[IconType["Gbp"] = 629] = "Gbp";
    IconType[IconType["Usd"] = 630] = "Usd";
    IconType[IconType["Inr"] = 631] = "Inr";
    IconType[IconType["Cny"] = 632] = "Cny";
    IconType[IconType["Rmb"] = 633] = "Rmb";
    IconType[IconType["Jpy"] = 634] = "Jpy";
    IconType[IconType["Rouble"] = 635] = "Rouble";
    IconType[IconType["Rub"] = 636] = "Rub";
    IconType[IconType["Krw"] = 637] = "Krw";
    IconType[IconType["Btc"] = 638] = "Btc";
    IconType[IconType["Sheqel"] = 639] = "Sheqel";
    IconType[IconType["Ils"] = 640] = "Ils";
    IconType[IconType["Try"] = 641] = "Try";
    IconType[IconType["Zip"] = 642] = "Zip";
    IconType[IconType["DotCircleOutline"] = 643] = "DotCircleOutline";
    IconType[IconType["Sliders"] = 644] = "Sliders";
    IconType[IconType["Wi"] = 645] = "Wi";
    IconType[IconType["Graduation"] = 646] = "Graduation";
    IconType[IconType["Weixin"] = 647] = "Weixin";
    IconType[IconType["Binoculars"] = 648] = "Binoculars";
    IconType[IconType["Gratipay"] = 649] = "Gratipay";
    IconType[IconType["Genderless"] = 650] = "Genderless";
    IconType[IconType["Teletype"] = 651] = "Teletype";
    IconType[IconType["PowerCord"] = 652] = "PowerCord";
    IconType[IconType["Tty"] = 653] = "Tty";
    IconType[IconType["Cc"] = 654] = "Cc";
    IconType[IconType["PlusCart"] = 655] = "PlusCart";
    IconType[IconType["ArrowDownCart"] = 656] = "ArrowDownCart";
    IconType[IconType["Detective"] = 657] = "Detective";
    IconType[IconType["Venus"] = 658] = "Venus";
    IconType[IconType["Mars"] = 659] = "Mars";
    IconType[IconType["Mercury"] = 660] = "Mercury";
    IconType[IconType["VenusDouble"] = 661] = "VenusDouble";
    IconType[IconType["FemaleHomosexual"] = 662] = "FemaleHomosexual";
    IconType[IconType["MarsDouble"] = 663] = "MarsDouble";
    IconType[IconType["MaleHomosexual"] = 664] = "MaleHomosexual";
    IconType[IconType["VenusMars"] = 665] = "VenusMars";
    IconType[IconType["MarsStroke"] = 666] = "MarsStroke";
    IconType[IconType["MarsAlternate"] = 667] = "MarsAlternate";
    IconType[IconType["MarsVertical"] = 668] = "MarsVertical";
    IconType[IconType["MarsHorizontal"] = 669] = "MarsHorizontal";
    IconType[IconType["MarsStrokeVertical"] = 670] = "MarsStrokeVertical";
    IconType[IconType["MarsStrokeHorizontal"] = 671] = "MarsStrokeHorizontal";
    IconType[IconType["FacebookOfficial"] = 672] = "FacebookOfficial";
    IconType[IconType["PinterestOfficial"] = 673] = "PinterestOfficial";
    IconType[IconType["Bed"] = 674] = "Bed";
})(IconType = exports.IconType || (exports.IconType = {}));


/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__(188));
__export(__webpack_require__(196));
__export(__webpack_require__(207));
__export(__webpack_require__(211));
__export(__webpack_require__(4));
__export(__webpack_require__(3));


/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var interfaces_1 = __webpack_require__(4);
var xstream_1 = __webpack_require__(0);
var isolate_1 = __webpack_require__(2);
var dom_1 = __webpack_require__(1);
var Checkbox;
(function (Checkbox) {
    /**
    * Creates a checkbox element on the page.
    * Accepts the following properties in props$:
    *   readonly?: boolean - Styles the checkbox to appear read-only.
    *   checked?: boolean - Styles the checkbox to appear checked.
    *   disabled?: boolean - Styles the checkbox to appear disabled.
    *   fitted?: boolean - Styles the checkbox for tight fits with nearby content.
    *   radio?: string - Styles the checkbox to appear like a radio button belonging to the group.
    *   toggle?: boolean - Styles the checkbox to appear like a toggle.
    * Expects the following type of content in content$: DOMContent
    * @param {ComponentSources} sources The default component sources.
    */
    function run(sources) {
        function main(sources) {
            sources.props$ = sources.props$ ? sources.props$ : xstream_1.default.of({});
            sources.content$ = sources.content$ ? sources.content$ : xstream_1.default.of("");
            var evt = function (type) { return sources.DOM.select("input").events(type); };
            var clicked$ = evt("click");
            var props$ = sources.props$.remember();
            var checked$ = props$.map(function (props) {
                return clicked$.fold(function (acc, evt) { return evt.srcElement.checked; }, props.checked ? true : false);
            }).flatten().remember();
            // const renderProps$ =  xs.combine(props$, checked$).map(
            //   ([props, checked]) => Object.assign({}, props, {checked})
            // );
            var vTree$ = xstream_1.default.combine(props$, sources.content$).map(function (_a) {
                var props = _a[0], content = _a[1];
                return render(props, content);
            });
            return {
                DOM: vTree$,
                Events: evt,
                value$: checked$
            };
        }
        var isolatedMain = isolate_1.default(main);
        return isolatedMain(sources);
    }
    Checkbox.run = run;
    /**
    * Creates a checkbox element on the page.
    * Accepts the following properties in props$:
    *   readonly?: boolean - Styles the checkbox to appear read-only.
    *   checked?: boolean - Styles the checkbox to appear checked.
    *   disabled?: boolean - Styles the checkbox to appear disabled.
    *   fitted?: boolean - Styles the checkbox for tight fits with nearby content.
    *   radio?: string - Styles the checkbox to appear like a radio button belonging to the group.
    *   toggle?: boolean - Styles the checkbox to appear like a toggle.
    * Expects the following type of content in content$: DOMContent
    * @param {ComponentSources} sources The default component sources.
    */
    function render(pOrC, c) {
        if (pOrC === void 0) { pOrC = {}; }
        if (c === void 0) { c = ""; }
        var props = interfaces_1.isDOMContent(pOrC) ? {} : pOrC;
        var content = interfaces_1.isDOMContent(pOrC) ? pOrC : c;
        return dom_1.div({ props: { className: getClassName(props) } }, [
            dom_1.input({ props: {
                    type: props.radio ? "radio" : "checkbox",
                    name: props.name,
                    checked: props.checked,
                    disabled: props.readonly || props.disabled
                } }),
            dom_1.label({ props: { for: props.name } }, props.fitted ? "" : content)
        ]);
    }
    Checkbox.render = render;
    function getClassName(props) {
        var className = "ui";
        if (props.readonly) {
            className += " read-only";
        }
        if (props.checked) {
            className += " checked";
        }
        if (props.disabled) {
            className += " disabled";
        }
        if (props.fitted) {
            className += " fitted";
        }
        if (props.radio) {
            className += " radio";
        }
        if (props.toggle) {
            className += " toggle";
        }
        return className + " checkbox";
    }
})(Checkbox = exports.Checkbox || (exports.Checkbox = {}));


/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var enums_1 = __webpack_require__(3);
var xstream_1 = __webpack_require__(0);
var dropRepeats_1 = __webpack_require__(63);
var debounce_1 = __webpack_require__(61);
var concat_1 = __webpack_require__(213);
var isolate_1 = __webpack_require__(2);
var delay_1 = __webpack_require__(62);
var dom_1 = __webpack_require__(1);
var menu_1 = __webpack_require__(59);
var icon_1 = __webpack_require__(22);
var transition_1 = __webpack_require__(13);
var Dropdown;
(function (Dropdown) {
    /**
     * A dropdown component for capturing user input.
     * Accepts the following properties in props$:
     *  active?: boolean,
     *  initial?: any
     *  default?: string
     *  selection?: boolean
     *  inline?: boolean
     *  floating?: boolean
     *  loading?: boolean
     *  disabled?: boolean
     *  scrolling?: boolean
     *  search?: boolean
     *  compact?: boolean
     *  size?: Size
     *  color?: Color
     * Expects the following type of content in content$: Array of {
     *  body: DOMContent,
     *  value: any,
     *  header?: boolean,
     *  fitted?: boolean,
     *  disabled?: boolean,
     *  active?: boolean
     * }
     */
    function run(sources) {
        function main(sources) {
            var evt = function (type) { return sources.DOM.select(".dropdown").events(type); };
            sources.props$ = sources.props$ ? sources.props$ : xstream_1.default.of({});
            sources.content$ = sources.content$ ? sources.content$ : xstream_1.default.of([]);
            var props$ = sources.props$.remember();
            var itemClick$proxy = xstream_1.default.create();
            var value$proxy = xstream_1.default.create();
            var dropdownClick$ = evt("click")
                .filter(function (evt) { return !evt.srcElement.classList.contains("item"); })
                .mapTo(enums_1.Direction.In);
            var mouseleave$ = xstream_1.default.merge(evt("mouseleave").filter(function (evt) { return evt.srcElement.className.indexOf("icon") === -1; }), evt("mouseenter"))
                .map(function (evt) { return evt.type === "mouseenter" ? enums_1.Direction.In : enums_1.Direction.Out; })
                .compose(debounce_1.default(250))
                .filter(function (dir) { return dir === enums_1.Direction.Out; });
            var transition$ = xstream_1.default.merge(dropdownClick$, itemClick$proxy, mouseleave$)
                .startWith(enums_1.Direction.Out)
                .map(function (dir) { return ({
                animation: enums_1.Animation.Fade,
                direction: dir
            }); })
                .compose(dropRepeats_1.default(function (a, b) { return a.direction === b.direction
                && a.animation === b.animation; }))
                .drop(1)
                .startWith({ animation: enums_1.Animation.None, direction: enums_1.Direction.Out });
            var filter$ = sources.DOM.select("input").events("keyup")
                .map(function (ev) { return ev.target.value; })
                .startWith("");
            var filteredContent$ = xstream_1.default.combine(sources.content$, filter$).map(function (_a) {
                var content = _a[0], filter = _a[1];
                return content.filter(function (c) { return filterContent(c, filter); });
            }).remember();
            var content$ = xstream_1.default.combine(filteredContent$, value$proxy).map(function (_a) {
                var content = _a[0], value = _a[1];
                return content.map(function (item) { return item.value === value ? Object.assign({}, item, { active: true }) : item; });
            }).remember();
            var menu = menu_1.Menu.run({ DOM: sources.DOM, content$: content$ });
            var transitionedMenu = transition_1.Transition.run({ DOM: sources.DOM, target$: menu.DOM, args$: transition$ });
            var itemClick$ = evt("click").filter(function (x) { return x.target.classList.contains("item"); }).remember();
            itemClick$proxy.imitate(itemClick$.mapTo(enums_1.Direction.Out));
            var clickedId$ = itemClick$
                .map(function (ev) { return parseInt(ev.target.id); })
                .filter(function (n) { return !isNaN(n) && typeof (n) !== "undefined"; });
            var emittedValue$ = clickedId$.map(function (id) { return filteredContent$.map(function (items) { return items[id].value; }).take(1); }).flatten().remember();
            var initialValue$ = props$.map(function (props) { return props.initial; }).remember();
            value$proxy.imitate(xstream_1.default.merge(initialValue$, emittedValue$));
            var icon = icon_1.Icon.render({}, enums_1.IconType.Dropdown);
            var active$ = xstream_1.default.merge(transition$.filter(function (x) { return x.direction === enums_1.Direction.In; }).mapTo(true), transition$.filter(function (x) { return x.direction === enums_1.Direction.Out; }).compose(delay_1.default(250)).mapTo(false));
            var streams = xstream_1.default.combine(props$, active$, transitionedMenu.DOM, content$.map(function (content) { return content.filter(function (item) { return item.active; })[0]; }));
            var vtree$ = streams.map(function (_a) {
                var props = _a[0], active = _a[1], menu = _a[2], item = _a[3];
                return dom_1.div({ props: { className: getClassName(props, active) } }, [
                    getText(item, props),
                    props.search ? dom_1.input({ props: { className: "search" } }) : "",
                    icon, menu
                ]);
            }).remember();
            //Todo find cleaner way to clear input using snabbdom hooks?
            emittedValue$.map(function (_) { return vtree$.take(1); }).flatten().addListener(new ExecuteListener(function (vnode) {
                function clear() {
                    if (typeof (vnode.elm) !== "undefined") {
                        var elm = vnode.elm.getElementsByTagName("input");
                        if (elm[0] && elm[0].value !== "") {
                            {
                                console.log("Sending next");
                            }
                            elm[0].value = "";
                            filter$.shamefullySendNext("");
                        }
                    }
                    else {
                        setTimeout(clear, 100);
                    }
                }
                clear();
            }));
            return {
                DOM: vtree$,
                Events: evt,
                value$: concat_1.default(initialValue$, emittedValue$)
            };
        }
        var isolatedMain = isolate_1.default(main);
        return isolatedMain(sources);
    }
    Dropdown.run = run;
    /**
     * A dropdown component for capturing user input.
     * Accepts the following properties:
     *  active?: boolean,
     *  initial?: any
     *  default?: string
     *  selection?: boolean
     *  inline?: boolean
     *  floating?: boolean
     *  loading?: boolean
     *  disabled?: boolean
     *  scrolling?: boolean
     *  search?: boolean
     *  compact?: boolean
     *  size?: Size
     *  color?: Color
     * Expects the following type of content: Array of {
     *  body: DOMContent,
     *  value: any,
     *  header?: boolean,
     *  fitted?: boolean,
     *  disabled?: boolean,
     *  active?: boolean
     * }
     */
    function render(pOrC, c) {
        if (pOrC === void 0) { pOrC = {}; }
        if (c === void 0) { c = []; }
        var props = (pOrC instanceof Array) ? {} : pOrC;
        var content = (pOrC instanceof Array) ? pOrC : c;
        var icon = icon_1.Icon.render({}, enums_1.IconType.Dropdown);
        var menu = menu_1.Menu.render({}, content);
        var item = content.filter(function (item) { return item.active; })[0];
        return dom_1.div({ props: { className: getClassName(props) } }, [
            getText(item, props),
            props.search ? dom_1.input({ props: { className: "search" } }) : "",
            icon, menu
        ]);
    }
    Dropdown.render = render;
    function getClassName(props, active) {
        var className = "ui";
        if (props.rightAligned) {
            className += " right";
        }
        if (props.selection) {
            className += " selection";
        }
        if (props.inline) {
            className += " inline";
        }
        if (props.floating) {
            className += " floating";
        }
        if (props.loading) {
            className += " loading";
        }
        if (props.disabled) {
            className += " disabled";
        }
        if (props.scrolling) {
            className += " scrolling";
        }
        if (props.search) {
            className += " search";
        }
        if (props.compact) {
            className += " compact";
        }
        if (props.pointing) {
            className += " pointing";
        }
        if (active || props.active) {
            className += " active";
        }
        if (typeof (props.size) !== "undefined") {
            className += enums_1.Size.ToClassname(props.size);
        }
        if (typeof (props.color) !== "undefined") {
            className += enums_1.Color.ToClassname(props.color);
        }
        return className + " dropdown";
    }
    function getText(item, props) {
        if (typeof (props.static) !== "undefined") {
            return dom_1.div({ props: { className: "text" } }, props.static);
        }
        if (item === null) {
            return dom_1.div({ props: { className: "default text" } }, props.default);
        }
        return dom_1.div({ props: { className: "text" } }, item.body);
    }
    function filterContent(item, filter) {
        function f(node) {
            if (node.text) {
                return node.text.indexOf(filter) !== -1 || !filter;
            }
            else {
                for (var c in node.children) {
                    if (f(c)) {
                        return true;
                    }
                }
                return false;
            }
        }
        if (typeof (item.body === "string")) {
            return item.body.indexOf(filter) !== -1 || !filter;
        }
        if (!item.body.push) {
            return f(item.body);
        }
        for (var c in item.body.children) {
            if (f(c)) {
                return true;
            }
        }
        return false;
    }
    var ExecuteListener = (function () {
        function ExecuteListener(f) {
            this.f = f;
        }
        ExecuteListener.prototype.next = function (i) { this.f(i); };
        ExecuteListener.prototype.error = function (i) { };
        ExecuteListener.prototype.complete = function () { };
        return ExecuteListener;
    }());
})(Dropdown = exports.Dropdown || (exports.Dropdown = {}));


/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__(205));
__export(__webpack_require__(36));
__export(__webpack_require__(206));
__export(__webpack_require__(208));
__export(__webpack_require__(209));
__export(__webpack_require__(210));
__export(__webpack_require__(13));


/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isolate_1 = __webpack_require__(2);
var dom_1 = __webpack_require__(1);
var xstream_1 = __webpack_require__(0);
var enums_1 = __webpack_require__(3);
var dimmer_1 = __webpack_require__(36);
var icon_1 = __webpack_require__(22);
var transition_1 = __webpack_require__(13);
var Modal;
(function (Modal) {
    /**
     * A modal component for displaying content in a modal.
     * Accepts the following type of properties in props$:
     *   header: String - The header text for the component.
     *   on$: Stream<Boolean> - When to display the modal.
     * Expects the following type of content in content$: DOMContent
     */
    function run(sources) {
        function main(sources) {
            sources.props$ = sources.props$ ? sources.props$ : xstream_1.default.of({ on$: xstream_1.default.of(false) });
            sources.content$ = sources.content$ ? sources.content$ : xstream_1.default.of("");
            sources.actions$ = sources.actions$ ? sources.actions$ : xstream_1.default.of("");
            sources.target$ = sources.target$ ? sources.target$ : xstream_1.default.of("page");
            var closeIcon = icon_1.Icon.run({ DOM: sources.DOM, props$: xstream_1.default.of({ link: true }), content$: xstream_1.default.of(enums_1.IconType.Close) });
            var close$ = closeIcon.Events("click").mapTo(false);
            /*** Render modal ***/
            var dimmerclick$proxy = xstream_1.default.create();
            var on$ = xstream_1.default.merge(sources.on$, dimmerclick$proxy, close$).remember();
            var content$ = xstream_1.default.combine(sources.props$, sources.content$, sources.actions$, closeIcon.DOM).map(function (_a) {
                var props = _a[0], content = _a[1], actions = _a[2], icon = _a[3];
                return dom_1.div({ props: { className: "ui scrolling active modal" } }, [
                    icon,
                    dom_1.div({ props: { className: "header" } }, props.header),
                    dom_1.div({ props: { className: "content" } }, content),
                    actions ? dom_1.div({ props: { className: "actions" } }, actions) : ""
                ]);
            }).remember();
            /*** Animation ***/
            var transition$ = on$
                .fold(function (prevAnim, active) { return prevAnim.direction === enums_1.Direction.None
                ? ({ animation: enums_1.Animation.None, direction: active ? enums_1.Direction.In : enums_1.Direction.Out })
                : {
                    animation: enums_1.Animation.Fade, direction: active ? enums_1.Direction.In : enums_1.Direction.Out
                }; }, ({ animation: enums_1.Animation.None, direction: enums_1.Direction.None }));
            var animatedContent = transition_1.Transition.run({ DOM: sources.DOM, target$: content$, args$: transition$ });
            /*** Activate dimmer ***/
            var dimmerContent$ = animatedContent.DOM.map(function (x) { return [x]; });
            var dimmer = dimmer_1.Dimmer.run({ DOM: sources.DOM, target$: sources.target$, args$: on$, content$: dimmerContent$ }, sources.props$.map(function (x) { return x.inverted; }));
            var dimmerclick$ = dimmer.Events("mousedown")
                .filter(function (evt) { return evt.srcElement === evt.currentTarget; })
                .mapTo(false);
            dimmerclick$proxy.imitate(dimmerclick$);
            var fadeOutEnd$ = on$.map(function (active) { return !active ? dimmer.Events("animationend") : xstream_1.default.never(); }).flatten().mapTo(false);
            // const active$ = xs.merge(sources.on$, fadeOutEnd$).remember();
            return {
                active$: xstream_1.default.merge(sources.on$, fadeOutEnd$),
                DOM: dimmer.DOM,
                Events: animatedContent.Events
            };
        }
        var isolatedMain = isolate_1.default(main);
        return isolatedMain(sources);
    }
    Modal.run = run;
})(Modal = exports.Modal || (exports.Modal = {}));


/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var enums_1 = __webpack_require__(3);
var transition_1 = __webpack_require__(13);
var dom_1 = __webpack_require__(1);
var xstream_1 = __webpack_require__(0);
var isolate_1 = __webpack_require__(2);
var debounce_1 = __webpack_require__(61);
var dropRepeats_1 = __webpack_require__(63);
var delay_1 = __webpack_require__(62);
var Popup;
(function (Popup) {
    function run(sources) {
        function main(sources) {
            sources.args$ = sources.args$ ? sources.args$ : xstream_1.default.of({ active: false, attachment: PopupAttachment.BottomLeft });
            sources.content$ = sources.content$ ? sources.content$ : xstream_1.default.of("");
            var args$ = sources.args$.remember();
            var vTree$ = xstream_1.default.combine(args$, sources.content$).map(function (_a) {
                var args = _a[0], content = _a[1];
                return render(args, content);
            });
            var mouseleave$proxy = xstream_1.default.create();
            var mouseenter$proxy = xstream_1.default.create();
            var active$ = args$.map(function (arg) { return arg.active ? enums_1.Direction.In : enums_1.Direction.Out; }).drop(1);
            var timer$ = active$.map(function (dir) { return dir === enums_1.Direction.Out ? xstream_1.default.of(enums_1.Direction.Out)
                : xstream_1.default.of(enums_1.Direction.Out).compose(delay_1.default(1000)).endWhen(mouseenter$proxy); }).flatten();
            var transition$ = xstream_1.default.merge(active$, mouseleave$proxy, timer$)
                .map(function (dir) { return ({
                animation: enums_1.Animation.Fade,
                direction: dir
            }); })
                .compose(dropRepeats_1.default(function (a, b) { return a.direction === b.direction
                && a.animation === b.animation; }))
                .startWith({ animation: enums_1.Animation.None, direction: enums_1.Direction.Out });
            var animatedPopup = transition_1.Transition.run({ DOM: sources.DOM, target$: vTree$, args$: transition$ });
            var mouseenter$ = animatedPopup.Events("mouseenter");
            var mouseleave$ = xstream_1.default.merge(animatedPopup.Events("mouseleave"), mouseenter$)
                .map(function (evt) { return evt.type === "mouseenter" ? enums_1.Direction.In : enums_1.Direction.Out; })
                .compose(debounce_1.default(200))
                .filter(function (dir) { return dir === enums_1.Direction.Out; });
            mouseleave$proxy.imitate(mouseleave$);
            mouseenter$proxy.imitate(mouseenter$);
            var popup$ = animatedPopup.DOM.remember();
            return {
                DOM: popup$,
                Events: animatedPopup.Events,
                tether: xstream_1.default.combine(popup$, sources.target$, args$)
                    .map(function (_a) {
                    var element = _a[0], target = _a[1], args = _a[2];
                    return ({ element: element, target: target, args: args });
                })
            };
        }
        var isolatedMain = isolate_1.default(main);
        return isolatedMain(sources);
    }
    Popup.run = run;
    function render(args, content) {
        if (args === void 0) { args = { active: true, attachment: PopupAttachment.BottomLeft }; }
        if (content === void 0) { content = ""; }
        return dom_1.div({ props: { className: getClassname(args) } }, [
            args.header ? dom_1.div({ props: { className: "header" } }, args.header) : "",
            content
        ]);
    }
    Popup.render = render;
    function getClassname(props) {
        var className = "ui";
        if (props.wide) {
            className += " wide";
        }
        if (props.veryWide) {
            className += " very wide";
        }
        if (props.flowing) {
            className += " flowing";
        }
        if (props.inverted) {
            className += " inverted";
        }
        if (typeof (props.size) !== "undefined") {
            className += enums_1.Size.ToClassname(props.size);
        }
        className += PopupAttachment.ToClassname(props.attachment) + " popup";
        return className;
    }
    var PopupAttachment;
    (function (PopupAttachment) {
        PopupAttachment[PopupAttachment["TopLeft"] = 0] = "TopLeft";
        PopupAttachment[PopupAttachment["TopMiddle"] = 1] = "TopMiddle";
        PopupAttachment[PopupAttachment["TopRight"] = 2] = "TopRight";
        PopupAttachment[PopupAttachment["LeftCenter"] = 3] = "LeftCenter";
        PopupAttachment[PopupAttachment["RightCenter"] = 4] = "RightCenter";
        PopupAttachment[PopupAttachment["BottomLeft"] = 5] = "BottomLeft";
        PopupAttachment[PopupAttachment["BottomMiddle"] = 6] = "BottomMiddle";
        PopupAttachment[PopupAttachment["BottomRight"] = 7] = "BottomRight";
        PopupAttachment[PopupAttachment["Center"] = 8] = "Center";
    })(PopupAttachment = Popup.PopupAttachment || (Popup.PopupAttachment = {}));
    (function (PopupAttachment) {
        function ToClassname(attachment) {
            switch (attachment) {
                case PopupAttachment.TopLeft: return " top left";
                case PopupAttachment.TopMiddle: return " top center";
                case PopupAttachment.TopRight: return " top right";
                case PopupAttachment.LeftCenter: return " left center";
                case PopupAttachment.RightCenter: return " right center";
                case PopupAttachment.BottomLeft: return " bottom left";
                case PopupAttachment.BottomMiddle: return " bottom center";
                case PopupAttachment.BottomRight: return " bottom right";
                case PopupAttachment.Center: return " center";
                default: return " bottom left";
            }
        }
        PopupAttachment.ToClassname = ToClassname;
        function ToTether(attachment) {
            switch (attachment) {
                case PopupAttachment.TopLeft: return "top left";
                case PopupAttachment.TopMiddle: return "top center";
                case PopupAttachment.TopRight: return "top right";
                case PopupAttachment.LeftCenter: return "left middle";
                case PopupAttachment.RightCenter: return "right middle";
                case PopupAttachment.BottomLeft: return "bottom left";
                case PopupAttachment.BottomMiddle: return "bottom center";
                case PopupAttachment.BottomRight: return "bottom right";
                case PopupAttachment.Center: return "center";
                default: return "bottom left";
            }
        }
        PopupAttachment.ToTether = ToTether;
        function ToOppositeTether(attachment) {
            switch (attachment) {
                case PopupAttachment.TopLeft: return "bottom right";
                case PopupAttachment.TopMiddle: return "bottom center";
                case PopupAttachment.TopRight: return "bottom left";
                case PopupAttachment.LeftCenter: return "right middle";
                case PopupAttachment.RightCenter: return "left middle";
                case PopupAttachment.BottomLeft: return "top right";
                case PopupAttachment.BottomMiddle: return "top center";
                case PopupAttachment.BottomRight: return "top left";
                case PopupAttachment.Center: return "center";
                default: return "bottom left";
            }
        }
        PopupAttachment.ToOppositeTether = ToOppositeTether;
    })(PopupAttachment = Popup.PopupAttachment || (Popup.PopupAttachment = {}));
})(Popup = exports.Popup || (exports.Popup = {}));


/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var interfaces_1 = __webpack_require__(4);
var enums_1 = __webpack_require__(3);
var xstream_1 = __webpack_require__(0);
var isolate_1 = __webpack_require__(2);
var dom_1 = __webpack_require__(1);
var ProgressBar;
(function (ProgressBar) {
    /**
     * Creates a Label component to add information to certain content.
     * Accepts the following properties in props$:
     *   progress: number - The % of progress the progress bar should reflect.
     *   active?: boolean - Styles the progress bar to reflect activitiy.
     *   disabled?: boolean - Styles the progress bar to appear disabled.
     *   inverted?: boolean - Styles the progress bar for dark backgrounds.
     *   attachment?: Attachment - Where the progress bar should be attached to.
     *   size?: Size - The size of the progress bar.
     *   color?: Color - The color of the progress bar.
     * Expects the following type of content in content$: DOMContent
     */
    function run(sources) {
        function main(sources) {
            sources.props$ = sources.props$ ? sources.props$ : xstream_1.default.of({ progress: 0 });
            sources.content$ = sources.content$ ? sources.content$ : xstream_1.default.of([]);
            var vTree$ = xstream_1.default.combine(sources.props$, sources.content$).map(function (_a) {
                var props = _a[0], content = _a[1];
                return render(props, content);
            });
            return {
                DOM: vTree$,
                Events: function (type) { return sources.DOM.select(".progress").events(type); }
            };
        }
        var isolatedMain = isolate_1.default(main);
        return isolatedMain(sources);
    }
    ProgressBar.run = run;
    /**
     * Creates a Label component to add information to certain content.
     * Accepts the following propertiea:
     *   progress: number - The % of progress the progress bar should reflect.
     *   active?: boolean - Styles the progress bar to reflect activitiy.
     *   disabled?: boolean - Styles the progress bar to appear disabled.
     *   inverted?: boolean - Styles the progress bar for dark backgrounds.
     *   attachment?: Attachment - Where the progress bar should be attached to.
     *   size?: Size - The size of the progress bar.
     *   color?: Color - The color of the progress bar.
     * Expects the following type of content: DOMContent
     */
    function render(pOrC, c) {
        if (pOrC === void 0) { pOrC = { progress: 0 }; }
        if (c === void 0) { c = ""; }
        var props = interfaces_1.isDOMContent(pOrC) ? { progress: 0 } : pOrC;
        var content = interfaces_1.isDOMContent(pOrC) ? pOrC : c;
        return dom_1.div({ props: { className: getClassname(props) } }, [
            dom_1.div({ props: { className: "bar" } }, { style: { width: props.progress + "%" } }, [
                dom_1.div({ props: { className: "progress" } }, [props.progress + "%"])
            ]),
            dom_1.div({ props: { className: "label" } }, content)
        ]);
    }
    ProgressBar.render = render;
    function getClassname(props) {
        var className = "ui";
        if (props.active) {
            className += " active";
        }
        if (props.disabled) {
            className += " disabled";
        }
        if (props.inverted) {
            className += " inverted";
        }
        if (typeof (props.attachment) !== "undefined") {
            className += enums_1.Attachment.ToClassname(props.attachment);
        }
        if (typeof (props.size) !== "undefined") {
            className += enums_1.Size.ToClassname(props.size);
        }
        if (typeof (props.color) !== "undefined") {
            className += enums_1.Color.ToClassname(props.color);
        }
        className += " progress";
        return className;
    }
})(ProgressBar = exports.ProgressBar || (exports.ProgressBar = {}));


/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__(212));


/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var interfaces_1 = __webpack_require__(4);
var enums_1 = __webpack_require__(3);
var xstream_1 = __webpack_require__(0);
var isolate_1 = __webpack_require__(2);
var dom_1 = __webpack_require__(1);
var Statistic;
(function (Statistic) {
    /**
     * A statistic component to show statistics.
     * Accepts the following properties in props$:
     *   horizontal?: boolean - Styles the statistic to display horizontally.
     *   inverted?: boolean - Styles the statistic for a dark background.
     *   color?: Color - The color of the statistic.
     *   size?: Size - The size of the statistic.
     *   float?: Float - Where to float the statistic.
     * Expects the following type of content in content$: {} of
     *   value: String|VNode - The value for the statistic.
     *   label: String|VNode - The label for the statistic.
     *   isText?: boolean - Formats the statistic value for text based values.
     */
    function run(sources) {
        function main(sources) {
            sources.props$ = sources.props$ ? sources.props$ : xstream_1.default.of({});
            sources.content$ = sources.content$ ? sources.content$ : xstream_1.default.of("");
            sources.extras$ = sources.extras$ ? sources.extras$ : xstream_1.default.of("");
            var vTree$ = xstream_1.default.combine(sources.props$, sources.content$).map(function (_a) {
                var props = _a[0], content = _a[1];
                return render(props, content);
            });
            return {
                DOM: vTree$,
                Events: function (type) { return sources.DOM.select(".statistic").events(type); }
            };
        }
        var isolatedMain = isolate_1.default(main);
        return isolatedMain(sources);
    }
    Statistic.run = run;
    /**
     * A statistic component to show statistics.
     * Accepts the following properties:
     *   horizontal?: boolean - Styles the statistic to display horizontally.
     *   inverted?: boolean - Styles the statistic for a dark background.
     *   color?: Color - The color of the statistic.
     *   size?: Size - The size of the statistic.
     *   float?: Float - Where to float the statistic.
     * Expects the following type of content: {} of
     *   value: String|VNode - The value for the statistic.
     *   label: String|VNode - The label for the statistic.
     *   isText?: boolean - Formats the statistic value for text based values.
     */
    function render(pOrC, c, e) {
        if (pOrC === void 0) { pOrC = {}; }
        if (c === void 0) { c = ""; }
        if (e === void 0) { e = ""; }
        var props = interfaces_1.isDOMContent(pOrC) ? {} : pOrC;
        var content = interfaces_1.isDOMContent(pOrC) ? pOrC : c;
        var label = interfaces_1.isDOMContent(pOrC) ? c : e;
        return dom_1.div({ props: { className: getClassname(props) } }, [
            dom_1.div({ props: { className: props.text ? "text value" : "value" } }, content),
            dom_1.div({ props: { className: "label" } }, label)
        ]);
    }
    Statistic.render = render;
    function getClassname(props) {
        var className = "ui ";
        if (props.horizontal) {
            className += " horizontal";
        }
        if (props.inverted) {
            className += " inverted";
        }
        if (typeof (props.color) !== "undefined") {
            className += enums_1.Color.ToClassname(props.color);
        }
        if (typeof (props.size) !== "undefined") {
            className += enums_1.Size.ToClassname(props.size);
        }
        if (typeof (props.float) !== "undefined") {
            className += enums_1.Float.ToClassname(props.float);
        }
        className += " statistic";
        return className;
    }
})(Statistic = exports.Statistic || (exports.Statistic = {}));


/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var index_1 = __webpack_require__(0);
var ConcatProducer = (function () {
    function ConcatProducer(streams) {
        this.streams = streams;
        this.type = 'concat';
        this.out = null;
        this.i = 0;
    }
    ConcatProducer.prototype._start = function (out) {
        this.out = out;
        this.streams[this.i]._add(this);
    };
    ConcatProducer.prototype._stop = function () {
        var streams = this.streams;
        if (this.i < streams.length) {
            streams[this.i]._remove(this);
        }
        this.i = 0;
        this.out = null;
    };
    ConcatProducer.prototype._n = function (t) {
        var u = this.out;
        if (!u)
            return;
        u._n(t);
    };
    ConcatProducer.prototype._e = function (err) {
        var u = this.out;
        if (!u)
            return;
        u._e(err);
    };
    ConcatProducer.prototype._c = function () {
        var u = this.out;
        if (!u)
            return;
        var streams = this.streams;
        streams[this.i]._remove(this);
        if (++this.i < streams.length) {
            streams[this.i]._add(this);
        }
        else {
            u._c();
        }
    };
    return ConcatProducer;
}());
/**
 * Puts one stream after the other. *concat* is a factory that takes multiple
 * streams as arguments, and starts the `n+1`-th stream only when the `n`-th
 * stream has completed. It concatenates those streams together.
 *
 * Marble diagram:
 *
 * ```text
 * --1--2---3---4-|
 * ...............--a-b-c--d-|
 *           concat
 * --1--2---3---4---a-b-c--d-|
 * ```
 *
 * Example:
 *
 * ```js
 * import concat from 'xstream/extra/concat'
 *
 * const streamA = xs.of('a', 'b', 'c')
 * const streamB = xs.of(10, 20, 30)
 * const streamC = xs.of('X', 'Y', 'Z')
 *
 * const outputStream = concat(streamA, streamB, streamC)
 *
 * outputStream.addListener({
 *   next: (x) => console.log(x),
 *   error: (err) => console.error(err),
 *   complete: () => console.log('concat completed'),
 * })
 * ```
 *
 * @factory true
 * @param {Stream} stream1 A stream to concatenate together with other streams.
 * @param {Stream} stream2 A stream to concatenate together with other streams. Two
 * or more streams may be given as arguments.
 * @return {Stream}
 */
function concat() {
    var streams = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        streams[_i] = arguments[_i];
    }
    return new index_1.Stream(new ConcatProducer(streams));
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = concat;
//# sourceMappingURL=concat.js.map

/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var index_1 = __webpack_require__(0);
var FCIL = (function () {
    function FCIL(out, op) {
        this.out = out;
        this.op = op;
    }
    FCIL.prototype._n = function (t) {
        this.out._n(t);
    };
    FCIL.prototype._e = function (err) {
        this.out._e(err);
    };
    FCIL.prototype._c = function () {
        this.op.less();
    };
    return FCIL;
}());
var FlattenConcOperator = (function () {
    function FlattenConcOperator(ins) {
        this.ins = ins;
        this.type = 'flattenConcurrently';
        this.active = 1; // number of outers and inners that have not yet ended
        this.out = null;
    }
    FlattenConcOperator.prototype._start = function (out) {
        this.out = out;
        this.ins._add(this);
    };
    FlattenConcOperator.prototype._stop = function () {
        this.ins._remove(this);
        this.active = 1;
        this.out = null;
    };
    FlattenConcOperator.prototype.less = function () {
        if (--this.active === 0) {
            var u = this.out;
            if (!u)
                return;
            u._c();
        }
    };
    FlattenConcOperator.prototype._n = function (s) {
        var u = this.out;
        if (!u)
            return;
        this.active++;
        s._add(new FCIL(u, this));
    };
    FlattenConcOperator.prototype._e = function (err) {
        var u = this.out;
        if (!u)
            return;
        u._e(err);
    };
    FlattenConcOperator.prototype._c = function () {
        this.less();
    };
    return FlattenConcOperator;
}());
exports.FlattenConcOperator = FlattenConcOperator;
/**
 * Flattens a "stream of streams", handling multiple concurrent nested streams
 * simultaneously.
 *
 * If the input stream is a stream that emits streams, then this operator will
 * return an output stream which is a flat stream: emits regular events. The
 * flattening happens concurrently. It works like this: when the input stream
 * emits a nested stream, *flattenConcurrently* will start imitating that
 * nested one. When the next nested stream is emitted on the input stream,
 * *flattenConcurrently* will also imitate that new one, but will continue to
 * imitate the previous nested streams as well.
 *
 * Marble diagram:
 *
 * ```text
 * --+--------+---------------
 *   \        \
 *    \       ----1----2---3--
 *    --a--b----c----d--------
 *     flattenConcurrently
 * -----a--b----c-1--d-2---3--
 * ```
 *
 * @return {Stream}
 */
function flattenConcurrently(ins) {
    return new index_1.Stream(new FlattenConcOperator(ins));
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = flattenConcurrently;
//# sourceMappingURL=flattenConcurrently.js.map

/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(65);
module.exports = __webpack_require__(64);


/***/ })
/******/ ]);