/**
 * @license
 * Copyright 2010-2022 Three.js Authors
 * SPDX-License-Identifier: MIT
 */

/*
three-kbrecordzz.js
rewritten version of three.js
rewritten by kbrecordzz
2024
*/

// THREE
!function(t, e) { e((t = "undefined" != typeof globalThis ? globalThis : t || self).THREE = {}) }

(this, (function(t)
{

"use strict";

const i = 100;
const n = 300;
const c = 1000;
const u = 1002;
const f = 1006;
const x = 1009;
const _ = 1012;
const y = 1014;
const M = 1015;

// EVENTDISPATCHER
class mt
{
	addEventListener(t, e)
	{
		void 0 === this._listeners && (this._listeners = {});
		const i = this._listeners;
		void 0 === i[t] && (i[t] = []),
		-1 === i[t].indexOf(e) && i[t].push(e)
        }
        hasEventListener(t, e)
	{
		if (void 0 === this._listeners) return !1;
		const i = this._listeners;
		return void 0 !== i[t] && -1 !== i[t].indexOf(e)
        }
        removeEventListener(t, e)
	{
		if (void 0 === this._listeners) return;
		const i = this._listeners[t];

		if (void 0 !== i)
	    	{
			const t = i.indexOf(e);
			-1 !== t && i.splice(t, 1)
            	}
        }
        dispatchEvent(t)
	{
		if (void 0 === this._listeners) return;
		const e = this._listeners[t.type];

		if (void 0 !== e)
		{
			t.target = this;
			const i = e.slice(0);
			for (let e = 0, n = i.length; e < n; e++) i[e].call(this, t);
			t.target = null
		}
        }
}

// PRE-CALCULATED VALUES
const vt = Math.PI / 180
const xt = 180 / Math.PI;

// GENERAL FUNCTIONS?
var uuid_count = 0;
function _t() { return uuid_count++; }
function Mt(t, e) { return (t % e + e) % e; }
function wt(t) { return 0 == (t & t - 1) && 0 !== t }	// helper function for rendering

// VECTOR2
class Et
{
        constructor(t=0, e=0)
	{
		Et.prototype.isVector2 = !0,
		this.x = t,
		this.y = e
        }
        clone()
	{
		return new this.constructor(this.x,this.y)
	}
}

// MATRIX3
    class Ct {
        constructor() {
            Ct.prototype.isMatrix3 = !0,
            this.elements = [1, 0, 0, 0, 1, 0, 0, 0, 1]
        }
        set(t, e, i, n, r, s, a, o, l) {
            const c = this.elements;
            return c[0] = t,
            c[1] = n,
            c[2] = a,
            c[3] = e,
            c[4] = r,
            c[5] = o,
            c[6] = i,
            c[7] = s,
            c[8] = l,
            this
        }
        identity() {
            return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1),
            this
        }
        copy(t) {
            const e = this.elements
              , i = t.elements;
            return e[0] = i[0],
            e[1] = i[1],
            e[2] = i[2],
            e[3] = i[3],
            e[4] = i[4],
            e[5] = i[5],
            e[6] = i[6],
            e[7] = i[7],
            e[8] = i[8],
            this
        }
        extractBasis(t, e, i) {
            return t.setFromMatrix3Column(this, 0),
            e.setFromMatrix3Column(this, 1),
            i.setFromMatrix3Column(this, 2),
            this
        }
        setFromMatrix4(t) {
            const e = t.elements;
            return this.set(e[0], e[4], e[8], e[1], e[5], e[9], e[2], e[6], e[10]),
            this
        }
        multiply(t) {
            return this.multiplyMatrices(this, t)
        }
        premultiply(t) {
            return this.multiplyMatrices(t, this)
        }
        multiplyMatrices(t, e) {
            const i = t.elements
              , n = e.elements
              , r = this.elements
              , s = i[0]
              , a = i[3]
              , o = i[6]
              , l = i[1]
              , c = i[4]
              , h = i[7]
              , u = i[2]
              , d = i[5]
              , p = i[8]
              , m = n[0]
              , f = n[3]
              , g = n[6]
              , v = n[1]
              , x = n[4]
              , _ = n[7]
              , y = n[2]
              , M = n[5]
              , b = n[8];
            return r[0] = s * m + a * v + o * y,
            r[3] = s * f + a * x + o * M,
            r[6] = s * g + a * _ + o * b,
            r[1] = l * m + c * v + h * y,
            r[4] = l * f + c * x + h * M,
            r[7] = l * g + c * _ + h * b,
            r[2] = u * m + d * v + p * y,
            r[5] = u * f + d * x + p * M,
            r[8] = u * g + d * _ + p * b,
            this
        }
        multiplyScalar(t) {
            const e = this.elements;
            return e[0] *= t,
            e[3] *= t,
            e[6] *= t,
            e[1] *= t,
            e[4] *= t,
            e[7] *= t,
            e[2] *= t,
            e[5] *= t,
            e[8] *= t,
            this
        }
        determinant() {
            const t = this.elements
              , e = t[0]
              , i = t[1]
              , n = t[2]
              , r = t[3]
              , s = t[4]
              , a = t[5]
              , o = t[6]
              , l = t[7]
              , c = t[8];
            return e * s * c - e * a * l - i * r * c + i * a * o + n * r * l - n * s * o
        }
        invert() {
            const t = this.elements
              , e = t[0]
              , i = t[1]
              , n = t[2]
              , r = t[3]
              , s = t[4]
              , a = t[5]
              , o = t[6]
              , l = t[7]
              , c = t[8]
              , h = c * s - a * l
              , u = a * o - c * r
              , d = l * r - s * o
              , p = e * h + i * u + n * d;
            if (0 === p)
                return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
            const m = 1 / p;
            return t[0] = h * m,
            t[1] = (n * l - c * i) * m,
            t[2] = (a * i - n * s) * m,
            t[3] = u * m,
            t[4] = (c * e - n * o) * m,
            t[5] = (n * r - a * e) * m,
            t[6] = d * m,
            t[7] = (i * o - l * e) * m,
            t[8] = (s * e - i * r) * m,
            this
        }
        transpose() {
            let t;
            const e = this.elements;
            return t = e[1],
            e[1] = e[3],
            e[3] = t,
            t = e[2],
            e[2] = e[6],
            e[6] = t,
            t = e[5],
            e[5] = e[7],
            e[7] = t,
            this
        }
        getNormalMatrix(t) {
            return this.setFromMatrix4(t).invert().transpose()
        }
        transposeIntoArray(t) {
            const e = this.elements;
            return t[0] = e[0],
            t[1] = e[3],
            t[2] = e[6],
            t[3] = e[1],
            t[4] = e[4],
            t[5] = e[7],
            t[6] = e[2],
            t[7] = e[5],
            t[8] = e[8],
            this
        }
        setUvTransform(t, e, i, n, r, s, a) {
            const o = Math.cos(r)
              , l = Math.sin(r);
            return this.set(i * o, i * l, -i * (o * s + l * a) + s + t, -n * l, n * o, -n * (-l * s + o * a) + a + e, 0, 0, 1),
            this
        }
        scale(t, e) {
            const i = this.elements;
            return i[0] *= t,
            i[3] *= t,
            i[6] *= t,
            i[1] *= e,
            i[4] *= e,
            i[7] *= e,
            this
        }
        rotate(t) {
            const e = Math.cos(t)
              , i = Math.sin(t)
              , n = this.elements
              , r = n[0]
              , s = n[3]
              , a = n[6]
              , o = n[1]
              , l = n[4]
              , c = n[7];
            return n[0] = e * r + i * o,
            n[3] = e * s + i * l,
            n[6] = e * a + i * c,
            n[1] = -i * r + e * o,
            n[4] = -i * s + e * l,
            n[7] = -i * a + e * c,
            this
        }
        translate(t, e) {
            const i = this.elements;
            return i[0] += t * i[2],
            i[3] += t * i[5],
            i[6] += t * i[8],
            i[1] += e * i[2],
            i[4] += e * i[5],
            i[7] += e * i[8],
            this
        }
        equals(t) {
            const e = this.elements
              , i = t.elements;
            for (let t = 0; t < 9; t++)
                if (e[t] !== i[t])
                    return !1;
            return !0
        }
        fromArray(t, e=0) {
            for (let i = 0; i < 9; i++)
                this.elements[i] = t[i + e];
            return this
        }
        toArray(t=[], e=0) {
            const i = this.elements;
            return t[e] = i[0],
            t[e + 1] = i[1],
            t[e + 2] = i[2],
            t[e + 3] = i[3],
            t[e + 4] = i[4],
            t[e + 5] = i[5],
            t[e + 6] = i[6],
            t[e + 7] = i[7],
            t[e + 8] = i[8],
            t
        }
        clone() {
            return (new this.constructor).fromArray(this.elements)
        }
    }

// går igenom en array baklänges, och returnera TRUE om någon post i array:en är större än 65535.
// den kanske kollar så att alla värden är inom en viss datatyps storlek, eller inom ett visst färg-format
function check_16or32bit_array(t)
{
	for (let e = t.length - 1; e >= 0; --e)
	{
		if (t[e] > 65535) return !0;
	}
	return !1;
}

// COLOR
t.Color = class
{
        constructor(t, e, i)
	{
            return this.isColor = !0,
            this.r = 1,
            this.g = 1,
            this.b = 1,
            void 0 === e && void 0 === i ? this.set(t) : this.setRGB(t, e, i)
        }
        set(t)
	{
            return t && t.isColor ? this.copy(t) : "number" == typeof t ? this.setHex(t) : "string" == typeof t && this.setStyle(t),
            this
        }
        setHex(t, e="srgb")
	{
            return t = Math.floor(t),
            this.r = (t >> 16 & 255) / 255,
            this.g = (t >> 8 & 255) / 255,
            this.b = (255 & t) / 255,
//            Ot.toWorkingColorSpace(this, e),
            this
        }
        setRGB(t, e, i, n="srgb-linear")
	{
            return this.r = t,
            this.g = e,
            this.b = i,
//            Ot.toWorkingColorSpace(this, n),
            this
        }
        clone()
	{
            return new this.constructor(this.r,this.g,this.b)
        }
        copy(t)
	{
            return this.r = t.r,
            this.g = t.g,
            this.b = t.b,
            this
        }
        multiplyScalar(t)
	{
            return this.r *= t,
            this.g *= t,
            this.b *= t,
            this
        }
}

// SOURCE
    class qt {
        constructor(t=null) {
            this.isSource = !0,
            this.uuid = _t(),
            this.data = t,
            this.version = 0
        }
        set needsUpdate(t) {
            !0 === t && this.version++
        }
    }

    let ttexture_id = 0;
// TEXTURE
    class Zt extends mt {
        constructor(t=Zt.DEFAULT_IMAGE, e=Zt.DEFAULT_MAPPING, i=1001, n=1001, r=1006, s=1008, a=1023, o=1009, l=1, c=3e3) {
            super(),
            this.isTexture = !0,
            Object.defineProperty(this, "id", {
                value: ttexture_id++
            }),
            this.uuid = _t(),
            this.name = "",
            this.source = new qt(t),
            this.mipmaps = [],
            this.mapping = e,
            this.wrapS = i,
            this.wrapT = n,
            this.magFilter = r,
            this.minFilter = s,
            this.anisotropy = l,
            this.format = a,
            this.internalFormat = null,
            this.type = o,
            this.offset = new Et(0,0),
            this.repeat = new Et(1,1),
            this.center = new Et(0,0),
            this.rotation = 0,
            this.matrixAutoUpdate = !0,
            this.matrix = new Ct,
            this.generateMipmaps = !0,
            this.premultiplyAlpha = !1,
            this.flipY = !0,
            this.unpackAlignment = 4,
            this.encoding = c,
            this.userData = {},
            this.version = 0,
            this.onUpdate = null,
            this.isRenderTargetTexture = !1,
            this.needsPMREMUpdate = !1
        }
        updateMatrix() {
            this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y)
        }
        transformUv(t) {
            if (this.mapping !== n)
                return t;
            if (t.applyMatrix3(this.matrix),
            t.x < 0 || t.x > 1)
                switch (this.wrapS) {
                case c:
                    t.x = t.x - Math.floor(t.x);
                    break;
                case h:
                    t.x = t.x < 0 ? 0 : 1;
                    break;
                case u:
                    1 === Math.abs(Math.floor(t.x) % 2) ? t.x = Math.ceil(t.x) - t.x : t.x = t.x - Math.floor(t.x)
                }
            if (t.y < 0 || t.y > 1)
                switch (this.wrapT) {
                case c:
                    t.y = t.y - Math.floor(t.y);
                    break;
                case h:
                    t.y = t.y < 0 ? 0 : 1;
                    break;
                case u:
                    1 === Math.abs(Math.floor(t.y) % 2) ? t.y = Math.ceil(t.y) - t.y : t.y = t.y - Math.floor(t.y)
                }
            return this.flipY && (t.y = 1 - t.y),
            t
        }
        set needsUpdate(t) {
            !0 === t && (this.version++,
            this.source.needsUpdate = !0)
        }
    }
    Zt.DEFAULT_IMAGE = null,
    Zt.DEFAULT_MAPPING = n;

// VECTOR4
    class Jt {
        constructor(t=0, e=0, i=0, n=1) {
            Jt.prototype.isVector4 = !0,
            this.x = t,
            this.y = e,
            this.z = i,
            this.w = n
        }
        set(t, e, i, n) {
            return this.x = t,
            this.y = e,
            this.z = i,
            this.w = n,
            this
        }
        copy(t) {
            return this.x = t.x,
            this.y = t.y,
            this.z = t.z,
            this.w = void 0 !== t.w ? t.w : 1,
            this
        }
        add(t) {
            return this.x += t.x,
            this.y += t.y,
            this.z += t.z,
            this.w += t.w,
            this
        }
        addScalar(t) {
            return this.x += t,
            this.y += t,
            this.z += t,
            this.w += t,
            this
        }
        addVectors(t, e) {
            return this.x = t.x + e.x,
            this.y = t.y + e.y,
            this.z = t.z + e.z,
            this.w = t.w + e.w,
            this
        }
        addScaledVector(t, e) {
            return this.x += t.x * e,
            this.y += t.y * e,
            this.z += t.z * e,
            this.w += t.w * e,
            this
        }
        sub(t) {
            return this.x -= t.x,
            this.y -= t.y,
            this.z -= t.z,
            this.w -= t.w,
            this
        }
        subScalar(t) {
            return this.x -= t,
            this.y -= t,
            this.z -= t,
            this.w -= t,
            this
        }
        subVectors(t, e) {
            return this.x = t.x - e.x,
            this.y = t.y - e.y,
            this.z = t.z - e.z,
            this.w = t.w - e.w,
            this
        }
        multiply(t) {
            return this.x *= t.x,
            this.y *= t.y,
            this.z *= t.z,
            this.w *= t.w,
            this
        }
        multiplyScalar(t) {
            return this.x *= t,
            this.y *= t,
            this.z *= t,
            this.w *= t,
            this
        }
        applyMatrix4(t) {
            const e = this.x
              , i = this.y
              , n = this.z
              , r = this.w
              , s = t.elements;
            return this.x = s[0] * e + s[4] * i + s[8] * n + s[12] * r,
            this.y = s[1] * e + s[5] * i + s[9] * n + s[13] * r,
            this.z = s[2] * e + s[6] * i + s[10] * n + s[14] * r,
            this.w = s[3] * e + s[7] * i + s[11] * n + s[15] * r,
            this
        }
        divideScalar(t) {
            return this.multiplyScalar(1 / t)
        }
        setAxisAngleFromQuaternion(t) {
            this.w = 2 * Math.acos(t.w);
            const e = Math.sqrt(1 - t.w * t.w);
            return e < 1e-4 ? (this.x = 1,
            this.y = 0,
            this.z = 0) : (this.x = t.x / e,
            this.y = t.y / e,
            this.z = t.z / e),
            this
        }
        setAxisAngleFromRotationMatrix(t) {
            let e, i, n, r;
            const s = .01
              , a = .1
              , o = t.elements
              , l = o[0]
              , c = o[4]
              , h = o[8]
              , u = o[1]
              , d = o[5]
              , p = o[9]
              , m = o[2]
              , f = o[6]
              , g = o[10];
            if (Math.abs(c - u) < s && Math.abs(h - m) < s && Math.abs(p - f) < s) {
                if (Math.abs(c + u) < a && Math.abs(h + m) < a && Math.abs(p + f) < a && Math.abs(l + d + g - 3) < a)
                    return this.set(1, 0, 0, 0),
                    this;
                e = Math.PI;
                const t = (l + 1) / 2
                  , o = (d + 1) / 2
                  , v = (g + 1) / 2
                  , x = (c + u) / 4
                  , _ = (h + m) / 4
                  , y = (p + f) / 4;
                return t > o && t > v ? t < s ? (i = 0,
                n = .707106781,
                r = .707106781) : (i = Math.sqrt(t),
                n = x / i,
                r = _ / i) : o > v ? o < s ? (i = .707106781,
                n = 0,
                r = .707106781) : (n = Math.sqrt(o),
                i = x / n,
                r = y / n) : v < s ? (i = .707106781,
                n = .707106781,
                r = 0) : (r = Math.sqrt(v),
                i = _ / r,
                n = y / r),
                this.set(i, n, r, e),
                this
            }
            let v = Math.sqrt((f - p) * (f - p) + (h - m) * (h - m) + (u - c) * (u - c));
            return Math.abs(v) < .001 && (v = 1),
            this.x = (f - p) / v,
            this.y = (h - m) / v,
            this.z = (u - c) / v,
            this.w = Math.acos((l + d + g - 1) / 2),
            this
        }
        min(t) {
            return this.x = Math.min(this.x, t.x),
            this.y = Math.min(this.y, t.y),
            this.z = Math.min(this.z, t.z),
            this.w = Math.min(this.w, t.w),
            this
        }
        max(t) {
            return this.x = Math.max(this.x, t.x),
            this.y = Math.max(this.y, t.y),
            this.z = Math.max(this.z, t.z),
            this.w = Math.max(this.w, t.w),
            this
        }
        clamp(t, e) {
            return this.x = Math.max(t.x, Math.min(e.x, this.x)),
            this.y = Math.max(t.y, Math.min(e.y, this.y)),
            this.z = Math.max(t.z, Math.min(e.z, this.z)),
            this.w = Math.max(t.w, Math.min(e.w, this.w)),
            this
        }
        clampScalar(t, e) {
            return this.x = Math.max(t, Math.min(e, this.x)),
            this.y = Math.max(t, Math.min(e, this.y)),
            this.z = Math.max(t, Math.min(e, this.z)),
            this.w = Math.max(t, Math.min(e, this.w)),
            this
        }
        clampLength(t, e) {
            const i = this.length();
            return this.divideScalar(i || 1).multiplyScalar(Math.max(t, Math.min(e, i)))
        }
        floor() {
            return this.x = Math.floor(this.x),
            this.y = Math.floor(this.y),
            this.z = Math.floor(this.z),
            this.w = Math.floor(this.w),
            this
        }
        ceil() {
            return this.x = Math.ceil(this.x),
            this.y = Math.ceil(this.y),
            this.z = Math.ceil(this.z),
            this.w = Math.ceil(this.w),
            this
        }
        round() {
            return this.x = Math.round(this.x),
            this.y = Math.round(this.y),
            this.z = Math.round(this.z),
            this.w = Math.round(this.w),
            this
        }
        roundToZero() {
            return this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x),
            this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y),
            this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z),
            this.w = this.w < 0 ? Math.ceil(this.w) : Math.floor(this.w),
            this
        }
        negate() {
            return this.x = -this.x,
            this.y = -this.y,
            this.z = -this.z,
            this.w = -this.w,
            this
        }
        dot(t) {
            return this.x * t.x + this.y * t.y + this.z * t.z + this.w * t.w
        }
        lengthSq() {
            return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
        }
        length() {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w)
        }
        manhattanLength() {
            return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w)
        }
        normalize() {
            return this.divideScalar(this.length() || 1)
        }
        setLength(t) {
            return this.normalize().multiplyScalar(t)
        }
        lerp(t, e) {
            return this.x += (t.x - this.x) * e,
            this.y += (t.y - this.y) * e,
            this.z += (t.z - this.z) * e,
            this.w += (t.w - this.w) * e,
            this
        }
        lerpVectors(t, e, i) {
            return this.x = t.x + (e.x - t.x) * i,
            this.y = t.y + (e.y - t.y) * i,
            this.z = t.z + (e.z - t.z) * i,
            this.w = t.w + (e.w - t.w) * i,
            this
        }
        equals(t) {
            return t.x === this.x && t.y === this.y && t.z === this.z && t.w === this.w
        }
        fromArray(t, e=0) {
            return this.x = t[e],
            this.y = t[e + 1],
            this.z = t[e + 2],
            this.w = t[e + 3],
            this
        }
        toArray(t=[], e=0) {
            return t[e] = this.x,
            t[e + 1] = this.y,
            t[e + 2] = this.z,
            t[e + 3] = this.w,
            t
        }
        fromBufferAttribute(t, e) {
            return this.x = t.getX(e),
            this.y = t.getY(e),
            this.z = t.getZ(e),
            this.w = t.getW(e),
            this
        }
        random() {
            return this.x = Math.random(),
            this.y = Math.random(),
            this.z = Math.random(),
            this.w = Math.random(),
            this
        }
        *[Symbol.iterator]() {
            yield this.x,
            yield this.y,
            yield this.z,
            yield this.w
        }
    }

// QUATERNION
    class te {
        constructor(t=0, e=0, i=0, n=1) {
            this.isQuaternion = !0,
            this._x = t,
            this._y = e,
            this._z = i,
            this._w = n
        }
        setFromEuler(t, e) {
            const i = t._x
              , n = t._y
              , r = t._z
              , s = t._order
              , a = Math.cos
              , o = Math.sin
              , l = a(i / 2)
              , c = a(n / 2)
              , h = a(r / 2)
              , u = o(i / 2)
              , d = o(n / 2)
              , p = o(r / 2);
            switch (s) {
            case "XYZ":
                this._x = u * c * h + l * d * p,
                this._y = l * d * h - u * c * p,
                this._z = l * c * p + u * d * h,
                this._w = l * c * h - u * d * p;
                break;
            case "YXZ":
                this._x = u * c * h + l * d * p,
                this._y = l * d * h - u * c * p,
                this._z = l * c * p - u * d * h,
                this._w = l * c * h + u * d * p;
                break;
            case "ZXY":
                this._x = u * c * h - l * d * p,
                this._y = l * d * h + u * c * p,
                this._z = l * c * p + u * d * h,
                this._w = l * c * h - u * d * p;
                break;
            case "ZYX":
                this._x = u * c * h - l * d * p,
                this._y = l * d * h + u * c * p,
                this._z = l * c * p - u * d * h,
                this._w = l * c * h + u * d * p;
                break;
            case "YZX":
                this._x = u * c * h + l * d * p,
                this._y = l * d * h + u * c * p,
                this._z = l * c * p - u * d * h,
                this._w = l * c * h - u * d * p;
                break;
            case "XZY":
                this._x = u * c * h - l * d * p,
                this._y = l * d * h - u * c * p,
                this._z = l * c * p + u * d * h,
                this._w = l * c * h + u * d * p;
                break;
            default:
                console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: " + s)
            }
            return !1 !== e && this._onChangeCallback(),
            this
        }
        setFromRotationMatrix(t) {
            const e = t.elements
              , i = e[0]
              , n = e[4]
              , r = e[8]
              , s = e[1]
              , a = e[5]
              , o = e[9]
              , l = e[2]
              , c = e[6]
              , h = e[10]
              , u = i + a + h;
            if (u > 0) {
                const t = .5 / Math.sqrt(u + 1);
                this._w = .25 / t,
                this._x = (c - o) * t,
                this._y = (r - l) * t,
                this._z = (s - n) * t
            } else if (i > a && i > h) {
                const t = 2 * Math.sqrt(1 + i - a - h);
                this._w = (c - o) / t,
                this._x = .25 * t,
                this._y = (n + s) / t,
                this._z = (r + l) / t
            } else if (a > h) {
                const t = 2 * Math.sqrt(1 + a - i - h);
                this._w = (r - l) / t,
                this._x = (n + s) / t,
                this._y = .25 * t,
                this._z = (o + c) / t
            } else {
                const t = 2 * Math.sqrt(1 + h - i - a);
                this._w = (s - n) / t,
                this._x = (r + l) / t,
                this._y = (o + c) / t,
                this._z = .25 * t
            }
            return this._onChangeCallback(),
            this
        }
        multiplyQuaternions(t, e) {
            const i = t._x
              , n = t._y
              , r = t._z
              , s = t._w
              , a = e._x
              , o = e._y
              , l = e._z
              , c = e._w;
            return this._x = i * c + s * a + n * l - r * o,
            this._y = n * c + s * o + r * a - i * l,
            this._z = r * c + s * l + i * o - n * a,
            this._w = s * c - i * a - n * o - r * l,
            this._onChangeCallback(),
            this
        }
        _onChange(t) {
            return this._onChangeCallback = t,
            this
        }
        _onChangeCallback() {}
        *[Symbol.iterator]() {
            yield this._x,
            yield this._y,
            yield this._z,
            yield this._w
        }
    }

// VECTOR3
    class ee {
        constructor(t=0, e=0, i=0) {
            ee.prototype.isVector3 = !0,
            this.x = t,
            this.y = e,
            this.z = i
        }
        set(t, e, i) {
            return void 0 === i && (i = this.z),
            this.x = t,
            this.y = e,
            this.z = i,
            this
        }
        setScalar(t) {
            return this.x = t,
            this.y = t,
            this.z = t,
            this
        }
        clone() {
            return new this.constructor(this.x,this.y,this.z)
        }
        copy(t) {
            return this.x = t.x,
            this.y = t.y,
            this.z = t.z,
            this
        }
        add(t) {
            return this.x += t.x,
            this.y += t.y,
            this.z += t.z,
            this
        }
        addScalar(t) {
            return this.x += t,
            this.y += t,
            this.z += t,
            this
        }
        addVectors(t, e) {
            return this.x = t.x + e.x,
            this.y = t.y + e.y,
            this.z = t.z + e.z,
            this
        }
        addScaledVector(t, e) {
            return this.x += t.x * e,
            this.y += t.y * e,
            this.z += t.z * e,
            this
        }
        sub(t) {
            return this.x -= t.x,
            this.y -= t.y,
            this.z -= t.z,
            this
        }
        subScalar(t) {
            return this.x -= t,
            this.y -= t,
            this.z -= t,
            this
        }
        subVectors(t, e) {
            return this.x = t.x - e.x,
            this.y = t.y - e.y,
            this.z = t.z - e.z,
            this
        }
        multiply(t) {
            return this.x *= t.x,
            this.y *= t.y,
            this.z *= t.z,
            this
        }
        multiplyScalar(t) {
            return this.x *= t,
            this.y *= t,
            this.z *= t,
            this
        }
        multiplyVectors(t, e) {
            return this.x = t.x * e.x,
            this.y = t.y * e.y,
            this.z = t.z * e.z,
            this
        }
        applyEuler(t) {
            return this.applyQuaternion(ne.setFromEuler(t))
        }
        applyAxisAngle(t, e) {
            return this.applyQuaternion(ne.setFromAxisAngle(t, e))
        }
        applyMatrix3(t) {
            const e = this.x
              , i = this.y
              , n = this.z
              , r = t.elements;
            return this.x = r[0] * e + r[3] * i + r[6] * n,
            this.y = r[1] * e + r[4] * i + r[7] * n,
            this.z = r[2] * e + r[5] * i + r[8] * n,
            this
        }
        applyNormalMatrix(t) {
            return this.applyMatrix3(t).normalize()
        }
        applyMatrix4(t) {
            const e = this.x
              , i = this.y
              , n = this.z
              , r = t.elements
              , s = 1 / (r[3] * e + r[7] * i + r[11] * n + r[15]);
            return this.x = (r[0] * e + r[4] * i + r[8] * n + r[12]) * s,
            this.y = (r[1] * e + r[5] * i + r[9] * n + r[13]) * s,
            this.z = (r[2] * e + r[6] * i + r[10] * n + r[14]) * s,
            this
        }
        applyQuaternion(t) {
            const e = this.x
              , i = this.y
              , n = this.z
              , r = t.x
              , s = t.y
              , a = t.z
              , o = t.w
              , l = o * e + s * n - a * i
              , c = o * i + a * e - r * n
              , h = o * n + r * i - s * e
              , u = -r * e - s * i - a * n;
            return this.x = l * o + u * -r + c * -a - h * -s,
            this.y = c * o + u * -s + h * -r - l * -a,
            this.z = h * o + u * -a + l * -s - c * -r,
            this
        }
        project(t) {
            return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)
        }
        unproject(t) {
            return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)
        }
        transformDirection(t) {
            const e = this.x
              , i = this.y
              , n = this.z
              , r = t.elements;
            return this.x = r[0] * e + r[4] * i + r[8] * n,
            this.y = r[1] * e + r[5] * i + r[9] * n,
            this.z = r[2] * e + r[6] * i + r[10] * n,
            this.normalize()
        }
        divide(t) {
            return this.x /= t.x,
            this.y /= t.y,
            this.z /= t.z,
            this
        }
        divideScalar(t) {
            return this.multiplyScalar(1 / t)
        }
        min(t) {
            return this.x = Math.min(this.x, t.x),
            this.y = Math.min(this.y, t.y),
            this.z = Math.min(this.z, t.z),
            this
        }
        max(t) {
            return this.x = Math.max(this.x, t.x),
            this.y = Math.max(this.y, t.y),
            this.z = Math.max(this.z, t.z),
            this
        }
        negate() {
            return this.x = -this.x,
            this.y = -this.y,
            this.z = -this.z,
            this
        }
        dot(t) {
            return this.x * t.x + this.y * t.y + this.z * t.z
        }
        lengthSq() {
            return this.x * this.x + this.y * this.y + this.z * this.z
        }
        length() {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
        }
        manhattanLength() {
            return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z)
        }
        normalize() {
            return this.divideScalar(this.length() || 1)
        }
        setLength(t) {
            return this.normalize().multiplyScalar(t)
        }
        distanceToSquared(t) {
            const e = this.x - t.x
              , i = this.y - t.y
              , n = this.z - t.z;
            return e * e + i * i + n * n
        }
        manhattanDistanceTo(t) {
            return Math.abs(this.x - t.x) + Math.abs(this.y - t.y) + Math.abs(this.z - t.z)
        }
        setFromMatrixPosition(t) {
            const e = t.elements;
            return this.x = e[12],
            this.y = e[13],
            this.z = e[14],
            this
        }
        setFromMatrixScale(t) {
            const e = this.setFromMatrixColumn(t, 0).length()
              , i = this.setFromMatrixColumn(t, 1).length()
              , n = this.setFromMatrixColumn(t, 2).length();
            return this.x = e,
            this.y = i,
            this.z = n,
            this
        }
        setFromMatrixColumn(t, e) {
            return this.fromArray(t.elements, 4 * e)
        }
        setFromMatrix3Column(t, e) {
            return this.fromArray(t.elements, 3 * e)
        }
        fromArray(t, e=0) {
            return this.x = t[e],
            this.y = t[e + 1],
            this.z = t[e + 2],
            this
        }
        toArray(t=[], e=0) {
            return t[e] = this.x,
            t[e + 1] = this.y,
            t[e + 2] = this.z,
            t
        }
        fromBufferAttribute(t, e) {
            return this.x = t.getX(e),
            this.y = t.getY(e),
            this.z = t.getZ(e),
            this
        }
        *[Symbol.iterator]() {
            yield this.x,
            yield this.y,
            yield this.z
        }
    }

// BOX3
    class re {
        constructor(t=new ee(1 / 0,1 / 0,1 / 0), e=new ee(-1 / 0,-1 / 0,-1 / 0)) {
            this.isBox3 = !0,
            this.min = t,
            this.max = e
        }
        set(t, e) {
            return this.min.copy(t),
            this.max.copy(e),
            this
        }
        setFromArray(t) {
            let e = 1 / 0
              , i = 1 / 0
              , n = 1 / 0
              , r = -1 / 0
              , s = -1 / 0
              , a = -1 / 0;
            for (let o = 0, l = t.length; o < l; o += 3) {
                const l = t[o]
                  , c = t[o + 1]
                  , h = t[o + 2];
                l < e && (e = l),
                c < i && (i = c),
                h < n && (n = h),
                l > r && (r = l),
                c > s && (s = c),
                h > a && (a = h)
            }
            return this.min.set(e, i, n),
            this.max.set(r, s, a),
            this
        }
        setFromBufferAttribute(t) {
            let e = 1 / 0
              , i = 1 / 0
              , n = 1 / 0
              , r = -1 / 0
              , s = -1 / 0
              , a = -1 / 0;
            for (let o = 0, l = t.count; o < l; o++) {
                const l = t.getX(o)
                  , c = t.getY(o)
                  , h = t.getZ(o);
                l < e && (e = l),
                c < i && (i = c),
                h < n && (n = h),
                l > r && (r = l),
                c > s && (s = c),
                h > a && (a = h)
            }
            return this.min.set(e, i, n),
            this.max.set(r, s, a),
            this
        }
        setFromPoints(t) {
            this.makeEmpty();
            for (let e = 0, i = t.length; e < i; e++)
                this.expandByPoint(t[e]);
            return this
        }
        setFromCenterAndSize(t, e) {
            const i = ae.copy(e).multiplyScalar(.5);
            return this.min.copy(t).sub(i),
            this.max.copy(t).add(i),
            this
        }
        setFromObject(t, e=!1) {
            return this.makeEmpty(),
            this.expandByObject(t, e)
        }
        makeEmpty() {
            return this.min.x = this.min.y = this.min.z = 1 / 0,
            this.max.x = this.max.y = this.max.z = -1 / 0,
            this
        }
        isEmpty() {
            return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z
        }
        getCenter(t) {
            return this.isEmpty() ? t.set(0, 0, 0) : t.addVectors(this.min, this.max).multiplyScalar(.5)
        }
        getSize(t) {
            return this.isEmpty() ? t.set(0, 0, 0) : t.subVectors(this.max, this.min)
        }
        expandByPoint(t) {
            return this.min.min(t),
            this.max.max(t),
            this
        }
        expandByVector(t) {
            return this.min.sub(t),
            this.max.add(t),
            this
        }
        expandByScalar(t) {
            return this.min.addScalar(-t),
            this.max.addScalar(t),
            this
        }
        expandByObject(t, e=!1) {
            t.updateWorldMatrix(!1, !1);
            const i = t.geometry;
            if (void 0 !== i)
                if (e && null != i.attributes && void 0 !== i.attributes.position) {
                    const e = i.attributes.position;
                    for (let i = 0, n = e.count; i < n; i++)
                        ae.fromBufferAttribute(e, i).applyMatrix4(t.matrixWorld),
                        this.expandByPoint(ae)
                } else
                    null === i.boundingBox && i.computeBoundingBox(),
                    oe.copy(i.boundingBox),
                    oe.applyMatrix4(t.matrixWorld),
                    this.union(oe);
            const n = t.children;
            for (let t = 0, i = n.length; t < i; t++)
                this.expandByObject(n[t], e);
            return this
        }
        containsPoint(t) {
            return !(t.x < this.min.x || t.x > this.max.x || t.y < this.min.y || t.y > this.max.y || t.z < this.min.z || t.z > this.max.z)
        }
        containsBox(t) {
            return this.min.x <= t.min.x && t.max.x <= this.max.x && this.min.y <= t.min.y && t.max.y <= this.max.y && this.min.z <= t.min.z && t.max.z <= this.max.z
        }
        getParameter(t, e) {
            return e.set((t.x - this.min.x) / (this.max.x - this.min.x), (t.y - this.min.y) / (this.max.y - this.min.y), (t.z - this.min.z) / (this.max.z - this.min.z))
        }
        intersectsBox(t) {
            return !(t.max.x < this.min.x || t.min.x > this.max.x || t.max.y < this.min.y || t.min.y > this.max.y || t.max.z < this.min.z || t.min.z > this.max.z)
        }
        intersectsSphere(t) {
            return this.clampPoint(t.center, ae),
            ae.distanceToSquared(t.center) <= t.radius * t.radius
        }
        intersectsPlane(t) {
            let e, i;
            return t.normal.x > 0 ? (e = t.normal.x * this.min.x,
            i = t.normal.x * this.max.x) : (e = t.normal.x * this.max.x,
            i = t.normal.x * this.min.x),
            t.normal.y > 0 ? (e += t.normal.y * this.min.y,
            i += t.normal.y * this.max.y) : (e += t.normal.y * this.max.y,
            i += t.normal.y * this.min.y),
            t.normal.z > 0 ? (e += t.normal.z * this.min.z,
            i += t.normal.z * this.max.z) : (e += t.normal.z * this.max.z,
            i += t.normal.z * this.min.z),
            e <= -t.constant && i >= -t.constant
        }
        clampPoint(t, e) {
            return e.copy(t).clamp(this.min, this.max)
        }
        distanceToPoint(t) {
            return ae.copy(t).clamp(this.min, this.max).sub(t).length()
        }
        getBoundingSphere(t) {
            return this.getCenter(t.center),
            t.radius = .5 * this.getSize(ae).length(),
            t
        }
        intersect(t) {
            return this.min.max(t.min),
            this.max.min(t.max),
            this.isEmpty() && this.makeEmpty(),
            this
        }
        union(t) {
            return this.min.min(t.min),
            this.max.max(t.max),
            this
        }
        applyMatrix4(t) {
            return this.isEmpty() || (se[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(t),
            se[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(t),
            se[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(t),
            se[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(t),
            se[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(t),
            se[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(t),
            se[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(t),
            se[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(t),
            this.setFromPoints(se)),
            this
        }
        translate(t) {
            return this.min.add(t),
            this.max.add(t),
            this
        }
        equals(t) {
            return t.min.equals(this.min) && t.max.equals(this.max)
        }
    }

// SPHERE
    class we {
        constructor(t=new ee, e=-1) {
            this.center = t,
            this.radius = e
        }
        copy(t) {
            return this.center.copy(t.center),
            this.radius = t.radius,
            this
        }
        applyMatrix4(t) {
            return this.center.applyMatrix4(t),
            this.radius = this.radius * t.getMaxScaleOnAxis(),
            this
        }
    }

// MATRIX4
    class Ie {
        constructor() {
            Ie.prototype.isMatrix4 = !0,
            this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
        }
        set(t, e, i, n, r, s, a, o, l, c, h, u, d, p, m, f) {
            const g = this.elements;
            return g[0] = t,
            g[4] = e,
            g[8] = i,
            g[12] = n,
            g[1] = r,
            g[5] = s,
            g[9] = a,
            g[13] = o,
            g[2] = l,
            g[6] = c,
            g[10] = h,
            g[14] = u,
            g[3] = d,
            g[7] = p,
            g[11] = m,
            g[15] = f,
            this
        }
        identity() {
            return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1),
            this
        }
        copy(t) {
            const e = this.elements
              , i = t.elements;
            return e[0] = i[0],
            e[1] = i[1],
            e[2] = i[2],
            e[3] = i[3],
            e[4] = i[4],
            e[5] = i[5],
            e[6] = i[6],
            e[7] = i[7],
            e[8] = i[8],
            e[9] = i[9],
            e[10] = i[10],
            e[11] = i[11],
            e[12] = i[12],
            e[13] = i[13],
            e[14] = i[14],
            e[15] = i[15],
            this
        }
        copyPosition(t) {
            const e = this.elements
              , i = t.elements;
            return e[12] = i[12],
            e[13] = i[13],
            e[14] = i[14],
            this
        }
        setFromMatrix3(t) {
            const e = t.elements;
            return this.set(e[0], e[3], e[6], 0, e[1], e[4], e[7], 0, e[2], e[5], e[8], 0, 0, 0, 0, 1),
            this
        }
        extractBasis(t, e, i) {
            return t.setFromMatrixColumn(this, 0),
            e.setFromMatrixColumn(this, 1),
            i.setFromMatrixColumn(this, 2),
            this
        }
        makeBasis(t, e, i) {
            return this.set(t.x, e.x, i.x, 0, t.y, e.y, i.y, 0, t.z, e.z, i.z, 0, 0, 0, 0, 1),
            this
        }
        extractRotation(t) {
            const e = this.elements
              , i = t.elements
              , n = 1 / De.setFromMatrixColumn(t, 0).length()
              , r = 1 / De.setFromMatrixColumn(t, 1).length()
              , s = 1 / De.setFromMatrixColumn(t, 2).length();
            return e[0] = i[0] * n,
            e[1] = i[1] * n,
            e[2] = i[2] * n,
            e[3] = 0,
            e[4] = i[4] * r,
            e[5] = i[5] * r,
            e[6] = i[6] * r,
            e[7] = 0,
            e[8] = i[8] * s,
            e[9] = i[9] * s,
            e[10] = i[10] * s,
            e[11] = 0,
            e[12] = 0,
            e[13] = 0,
            e[14] = 0,
            e[15] = 1,
            this
        }
        makeRotationFromEuler(t) {
            const e = this.elements
              , i = t.x
              , n = t.y
              , r = t.z
              , s = Math.cos(i)
              , a = Math.sin(i)
              , o = Math.cos(n)
              , l = Math.sin(n)
              , c = Math.cos(r)
              , h = Math.sin(r);
            if ("XYZ" === t.order) {
                const t = s * c
                  , i = s * h
                  , n = a * c
                  , r = a * h;
                e[0] = o * c,
                e[4] = -o * h,
                e[8] = l,
                e[1] = i + n * l,
                e[5] = t - r * l,
                e[9] = -a * o,
                e[2] = r - t * l,
                e[6] = n + i * l,
                e[10] = s * o
            } else if ("YXZ" === t.order) {
                const t = o * c
                  , i = o * h
                  , n = l * c
                  , r = l * h;
                e[0] = t + r * a,
                e[4] = n * a - i,
                e[8] = s * l,
                e[1] = s * h,
                e[5] = s * c,
                e[9] = -a,
                e[2] = i * a - n,
                e[6] = r + t * a,
                e[10] = s * o
            } else if ("ZXY" === t.order) {
                const t = o * c
                  , i = o * h
                  , n = l * c
                  , r = l * h;
                e[0] = t - r * a,
                e[4] = -s * h,
                e[8] = n + i * a,
                e[1] = i + n * a,
                e[5] = s * c,
                e[9] = r - t * a,
                e[2] = -s * l,
                e[6] = a,
                e[10] = s * o
            } else if ("ZYX" === t.order) {
                const t = s * c
                  , i = s * h
                  , n = a * c
                  , r = a * h;
                e[0] = o * c,
                e[4] = n * l - i,
                e[8] = t * l + r,
                e[1] = o * h,
                e[5] = r * l + t,
                e[9] = i * l - n,
                e[2] = -l,
                e[6] = a * o,
                e[10] = s * o
            } else if ("YZX" === t.order) {
                const t = s * o
                  , i = s * l
                  , n = a * o
                  , r = a * l;
                e[0] = o * c,
                e[4] = r - t * h,
                e[8] = n * h + i,
                e[1] = h,
                e[5] = s * c,
                e[9] = -a * c,
                e[2] = -l * c,
                e[6] = i * h + n,
                e[10] = t - r * h
            } else if ("XZY" === t.order) {
                const t = s * o
                  , i = s * l
                  , n = a * o
                  , r = a * l;
                e[0] = o * c,
                e[4] = -h,
                e[8] = l * c,
                e[1] = t * h + r,
                e[5] = s * c,
                e[9] = i * h - n,
                e[2] = n * h - i,
                e[6] = a * c,
                e[10] = r * h + t
            }
            return e[3] = 0,
            e[7] = 0,
            e[11] = 0,
            e[12] = 0,
            e[13] = 0,
            e[14] = 0,
            e[15] = 1,
            this
        }
        makeRotationFromQuaternion(t) {
            return this.compose(ze, t, Oe)
        }
        lookAt(t, e, i) {
            const n = this.elements;
            return Fe.subVectors(t, e),
            0 === Fe.lengthSq() && (Fe.z = 1),
            Fe.normalize(),
            Ue.crossVectors(i, Fe),
            0 === Ue.lengthSq() && (1 === Math.abs(i.z) ? Fe.x += 1e-4 : Fe.z += 1e-4,
            Fe.normalize(),
            Ue.crossVectors(i, Fe)),
            Ue.normalize(),
            Be.crossVectors(Fe, Ue),
            n[0] = Ue.x,
            n[4] = Be.x,
            n[8] = Fe.x,
            n[1] = Ue.y,
            n[5] = Be.y,
            n[9] = Fe.y,
            n[2] = Ue.z,
            n[6] = Be.z,
            n[10] = Fe.z,
            this
        }
//        multiply(t) {
  //          return this.multiplyMatrices(this, t)
    //    }
      //  premultiply(t) {
        //    return this.multiplyMatrices(t, this)
        //}
        multiplyMatrices(t, e) {
            const i = t.elements
              , n = e.elements
              , r = this.elements
              , s = i[0]
              , a = i[4]
              , o = i[8]
              , l = i[12]
              , c = i[1]
              , h = i[5]
              , u = i[9]
              , d = i[13]
              , p = i[2]
              , m = i[6]
              , f = i[10]
              , g = i[14]
              , v = i[3]
              , x = i[7]
              , _ = i[11]
              , y = i[15]
              , M = n[0]
              , b = n[4]
              , w = n[8]
              , S = n[12]
              , T = n[1]
              , A = n[5]
              , E = n[9]
              , C = n[13]
              , L = n[2]
              , R = n[6]
              , P = n[10]
              , I = n[14]
              , D = n[3]
              , N = n[7]
              , z = n[11]
              , O = n[15];
            return r[0] = s * M + a * T + o * L + l * D,
            r[4] = s * b + a * A + o * R + l * N,
            r[8] = s * w + a * E + o * P + l * z,
            r[12] = s * S + a * C + o * I + l * O,
            r[1] = c * M + h * T + u * L + d * D,
            r[5] = c * b + h * A + u * R + d * N,
            r[9] = c * w + h * E + u * P + d * z,
            r[13] = c * S + h * C + u * I + d * O,
            r[2] = p * M + m * T + f * L + g * D,
            r[6] = p * b + m * A + f * R + g * N,
            r[10] = p * w + m * E + f * P + g * z,
            r[14] = p * S + m * C + f * I + g * O,
            r[3] = v * M + x * T + _ * L + y * D,
            r[7] = v * b + x * A + _ * R + y * N,
            r[11] = v * w + x * E + _ * P + y * z,
            r[15] = v * S + x * C + _ * I + y * O,
            this
        }
        multiplyScalar(t) {
            const e = this.elements;
            return e[0] *= t,
            e[4] *= t,
            e[8] *= t,
            e[12] *= t,
            e[1] *= t,
            e[5] *= t,
            e[9] *= t,
            e[13] *= t,
            e[2] *= t,
            e[6] *= t,
            e[10] *= t,
            e[14] *= t,
            e[3] *= t,
            e[7] *= t,
            e[11] *= t,
            e[15] *= t,
            this
        }
        determinant() {
            const t = this.elements
              , e = t[0]
              , i = t[4]
              , n = t[8]
              , r = t[12]
              , s = t[1]
              , a = t[5]
              , o = t[9]
              , l = t[13]
              , c = t[2]
              , h = t[6]
              , u = t[10]
              , d = t[14];
            return t[3] * (+r * o * h - n * l * h - r * a * u + i * l * u + n * a * d - i * o * d) + t[7] * (+e * o * d - e * l * u + r * s * u - n * s * d + n * l * c - r * o * c) + t[11] * (+e * l * h - e * a * d - r * s * h + i * s * d + r * a * c - i * l * c) + t[15] * (-n * a * c - e * o * h + e * a * u + n * s * h - i * s * u + i * o * c)
        }
        transpose() {
            const t = this.elements;
            let e;
            return e = t[1],
            t[1] = t[4],
            t[4] = e,
            e = t[2],
            t[2] = t[8],
            t[8] = e,
            e = t[6],
            t[6] = t[9],
            t[9] = e,
            e = t[3],
            t[3] = t[12],
            t[12] = e,
            e = t[7],
            t[7] = t[13],
            t[13] = e,
            e = t[11],
            t[11] = t[14],
            t[14] = e,
            this
        }
        setPosition(t, e, i) {
            const n = this.elements;
            return t.isVector3 ? (n[12] = t.x,
            n[13] = t.y,
            n[14] = t.z) : (n[12] = t,
            n[13] = e,
            n[14] = i),
            this
        }
        invert() {
            const t = this.elements
              , e = t[0]
              , i = t[1]
              , n = t[2]
              , r = t[3]
              , s = t[4]
              , a = t[5]
              , o = t[6]
              , l = t[7]
              , c = t[8]
              , h = t[9]
              , u = t[10]
              , d = t[11]
              , p = t[12]
              , m = t[13]
              , f = t[14]
              , g = t[15]
              , v = h * f * l - m * u * l + m * o * d - a * f * d - h * o * g + a * u * g
              , x = p * u * l - c * f * l - p * o * d + s * f * d + c * o * g - s * u * g
              , _ = c * m * l - p * h * l + p * a * d - s * m * d - c * a * g + s * h * g
              , y = p * h * o - c * m * o - p * a * u + s * m * u + c * a * f - s * h * f
              , M = e * v + i * x + n * _ + r * y;
            if (0 === M)
                return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
            const b = 1 / M;
            return t[0] = v * b,
            t[1] = (m * u * r - h * f * r - m * n * d + i * f * d + h * n * g - i * u * g) * b,
            t[2] = (a * f * r - m * o * r + m * n * l - i * f * l - a * n * g + i * o * g) * b,
            t[3] = (h * o * r - a * u * r - h * n * l + i * u * l + a * n * d - i * o * d) * b,
            t[4] = x * b,
            t[5] = (c * f * r - p * u * r + p * n * d - e * f * d - c * n * g + e * u * g) * b,
            t[6] = (p * o * r - s * f * r - p * n * l + e * f * l + s * n * g - e * o * g) * b,
            t[7] = (s * u * r - c * o * r + c * n * l - e * u * l - s * n * d + e * o * d) * b,
            t[8] = _ * b,
            t[9] = (p * h * r - c * m * r - p * i * d + e * m * d + c * i * g - e * h * g) * b,
            t[10] = (s * m * r - p * a * r + p * i * l - e * m * l - s * i * g + e * a * g) * b,
            t[11] = (c * a * r - s * h * r - c * i * l + e * h * l + s * i * d - e * a * d) * b,
            t[12] = y * b,
            t[13] = (c * m * n - p * h * n + p * i * u - e * m * u - c * i * f + e * h * f) * b,
            t[14] = (p * a * n - s * m * n - p * i * o + e * m * o + s * i * f - e * a * f) * b,
            t[15] = (s * h * n - c * a * n + c * i * o - e * h * o - s * i * u + e * a * u) * b,
            this
        }
        scale(t) {
            const e = this.elements
              , i = t.x
              , n = t.y
              , r = t.z;
            return e[0] *= i,
            e[4] *= n,
            e[8] *= r,
            e[1] *= i,
            e[5] *= n,
            e[9] *= r,
            e[2] *= i,
            e[6] *= n,
            e[10] *= r,
            e[3] *= i,
            e[7] *= n,
            e[11] *= r,
            this
        }
        getMaxScaleOnAxis() {
            const t = this.elements
              , e = t[0] * t[0] + t[1] * t[1] + t[2] * t[2]
              , i = t[4] * t[4] + t[5] * t[5] + t[6] * t[6]
              , n = t[8] * t[8] + t[9] * t[9] + t[10] * t[10];
            return Math.sqrt(Math.max(e, i, n))
        }
        makeTranslation(t, e, i) {
            return this.set(1, 0, 0, t, 0, 1, 0, e, 0, 0, 1, i, 0, 0, 0, 1),
            this
        }
        makeRotationX(t) {
            const e = Math.cos(t)
              , i = Math.sin(t);
            return this.set(1, 0, 0, 0, 0, e, -i, 0, 0, i, e, 0, 0, 0, 0, 1),
            this
        }
        makeRotationY(t) {
            const e = Math.cos(t)
              , i = Math.sin(t);
            return this.set(e, 0, i, 0, 0, 1, 0, 0, -i, 0, e, 0, 0, 0, 0, 1),
            this
        }
        makeRotationZ(t) {
            const e = Math.cos(t)
              , i = Math.sin(t);
            return this.set(e, -i, 0, 0, i, e, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1),
            this
        }
        makeRotationAxis(t, e) {
            const i = Math.cos(e)
              , n = Math.sin(e)
              , r = 1 - i
              , s = t.x
              , a = t.y
              , o = t.z
              , l = r * s
              , c = r * a;
            return this.set(l * s + i, l * a - n * o, l * o + n * a, 0, l * a + n * o, c * a + i, c * o - n * s, 0, l * o - n * a, c * o + n * s, r * o * o + i, 0, 0, 0, 0, 1),
            this
        }
        makeScale(t, e, i) {
            return this.set(t, 0, 0, 0, 0, e, 0, 0, 0, 0, i, 0, 0, 0, 0, 1),
            this
        }
        makeShear(t, e, i, n, r, s) {
            return this.set(1, i, r, 0, t, 1, s, 0, e, n, 1, 0, 0, 0, 0, 1),
            this
        }
        compose(t, e, i) {
            const n = this.elements
              , r = e._x
              , s = e._y
              , a = e._z
              , o = e._w
              , l = r + r
              , c = s + s
              , h = a + a
              , u = r * l
              , d = r * c
              , p = r * h
              , m = s * c
              , f = s * h
              , g = a * h
              , v = o * l
              , x = o * c
              , _ = o * h
              , y = i.x
              , M = i.y
              , b = i.z;
            return n[0] = (1 - (m + g)) * y,
            n[1] = (d + _) * y,
            n[2] = (p - x) * y,
            n[3] = 0,
            n[4] = (d - _) * M,
            n[5] = (1 - (u + g)) * M,
            n[6] = (f + v) * M,
            n[7] = 0,
            n[8] = (p + x) * b,
            n[9] = (f - v) * b,
            n[10] = (1 - (u + m)) * b,
            n[11] = 0,
            n[12] = t.x,
            n[13] = t.y,
            n[14] = t.z,
            n[15] = 1,
            this
        }
        decompose(t, e, i) {
            const n = this.elements;
            let r = De.set(n[0], n[1], n[2]).length();
            const s = De.set(n[4], n[5], n[6]).length()
              , a = De.set(n[8], n[9], n[10]).length();
            this.determinant() < 0 && (r = -r),
            t.x = n[12],
            t.y = n[13],
            t.z = n[14],
            Ne.copy(this);
            const o = 1 / r
              , l = 1 / s
              , c = 1 / a;
            return Ne.elements[0] *= o,
            Ne.elements[1] *= o,
            Ne.elements[2] *= o,
            Ne.elements[4] *= l,
            Ne.elements[5] *= l,
            Ne.elements[6] *= l,
            Ne.elements[8] *= c,
            Ne.elements[9] *= c,
            Ne.elements[10] *= c,
            e.setFromRotationMatrix(Ne),
            i.x = r,
            i.y = s,
            i.z = a,
            this
        }
        makePerspective(t, e, i, n, r, s) {
            const a = this.elements
              , o = 2 * r / (e - t)
              , l = 2 * r / (i - n)
              , c = (e + t) / (e - t)
              , h = (i + n) / (i - n)
              , u = -(s + r) / (s - r)
              , d = -2 * s * r / (s - r);
            return a[0] = o,
            a[4] = 0,
            a[8] = c,
            a[12] = 0,
            a[1] = 0,
            a[5] = l,
            a[9] = h,
            a[13] = 0,
            a[2] = 0,
            a[6] = 0,
            a[10] = u,
            a[14] = d,
            a[3] = 0,
            a[7] = 0,
            a[11] = -1,
            a[15] = 0,
            this
        }
        makeOrthographic(t, e, i, n, r, s) {
            const a = this.elements
              , o = 1 / (e - t)
              , l = 1 / (i - n)
              , c = 1 / (s - r)
              , h = (e + t) * o
              , u = (i + n) * l
              , d = (s + r) * c;
            return a[0] = 2 * o,
            a[4] = 0,
            a[8] = 0,
            a[12] = -h,
            a[1] = 0,
            a[5] = 2 * l,
            a[9] = 0,
            a[13] = -u,
            a[2] = 0,
            a[6] = 0,
            a[10] = -2 * c,
            a[14] = -d,
            a[3] = 0,
            a[7] = 0,
            a[11] = 0,
            a[15] = 1,
            this
        }
        equals(t) {
            const e = this.elements
              , i = t.elements;
            for (let t = 0; t < 16; t++)
                if (e[t] !== i[t])
                    return !1;
            return !0
        }
        fromArray(t, e=0) {
            for (let i = 0; i < 16; i++)
                this.elements[i] = t[i + e];
            return this
        }
        toArray(t=[], e=0) {
            const i = this.elements;
            return t[e] = i[0],
            t[e + 1] = i[1],
            t[e + 2] = i[2],
            t[e + 3] = i[3],
            t[e + 4] = i[4],
            t[e + 5] = i[5],
            t[e + 6] = i[6],
            t[e + 7] = i[7],
            t[e + 8] = i[8],
            t[e + 9] = i[9],
            t[e + 10] = i[10],
            t[e + 11] = i[11],
            t[e + 12] = i[12],
            t[e + 13] = i[13],
            t[e + 14] = i[14],
            t[e + 15] = i[15],
            t
        }
    }

// EULER
    class Ve {
        constructor(t=0, e=0, i=0, n=Ve.DefaultOrder) {
            this.isEuler = !0,
            this._x = t,
            this._y = e,
            this._z = i,
            this._order = n
        }
        get x() {
            return this._x
        }
        set x(t) {
            this._x = t,
            this._onChangeCallback()
        }
        get y() {
            return this._y
        }
        set y(t) {
            this._y = t,
            this._onChangeCallback()
        }
        get z() {
            return this._z
        }
        set z(t) {
            this._z = t,
            this._onChangeCallback()
        }
        get order() {
            return this._order
        }
        set order(t) {
            this._order = t,
            this._onChangeCallback()
        }
        set(t, e, i, n=this._order) {
            return this._x = t,
            this._y = e,
            this._z = i,
            this._order = n,
            this._onChangeCallback(),
            this
        }
        setFromRotationMatrix(t, e=this._order, i=!0) {
            const n = t.elements
              , r = n[0]
              , s = n[4]
              , a = n[8]
              , o = n[1]
              , l = n[5]
              , c = n[9]
              , h = n[2]
              , u = n[6]
              , d = n[10];
            switch (e) {
            case "XYZ":
                this._y = Math.asin(yt(a, -1, 1)),
                Math.abs(a) < .9999999 ? (this._x = Math.atan2(-c, d),
                this._z = Math.atan2(-s, r)) : (this._x = Math.atan2(u, l),
                this._z = 0);
                break;
            case "YXZ":
                this._x = Math.asin(-yt(c, -1, 1)),
                Math.abs(c) < .9999999 ? (this._y = Math.atan2(a, d),
                this._z = Math.atan2(o, l)) : (this._y = Math.atan2(-h, r),
                this._z = 0);
                break;
            case "ZXY":
                this._x = Math.asin(yt(u, -1, 1)),
                Math.abs(u) < .9999999 ? (this._y = Math.atan2(-h, d),
                this._z = Math.atan2(-s, l)) : (this._y = 0,
                this._z = Math.atan2(o, r));
                break;
            case "ZYX":
                this._y = Math.asin(-yt(h, -1, 1)),
                Math.abs(h) < .9999999 ? (this._x = Math.atan2(u, d),
                this._z = Math.atan2(o, r)) : (this._x = 0,
                this._z = Math.atan2(-s, l));
                break;
            case "YZX":
                this._z = Math.asin(yt(o, -1, 1)),
                Math.abs(o) < .9999999 ? (this._x = Math.atan2(-c, l),
                this._y = Math.atan2(-h, r)) : (this._x = 0,
                this._y = Math.atan2(a, d));
                break;
            case "XZY":
                this._z = Math.asin(-yt(s, -1, 1)),
                Math.abs(s) < .9999999 ? (this._x = Math.atan2(u, l),
                this._y = Math.atan2(a, r)) : (this._x = Math.atan2(-c, d),
                this._y = 0);
                break;
            default:
                console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: " + e)
            }
            return this._order = e,
            !0 === i && this._onChangeCallback(),
            this
        }
        setFromQuaternion(t, e, i) {
            return ke.makeRotationFromQuaternion(t),
            this.setFromRotationMatrix(ke, e, i)
        }
        setFromVector3(t, e=this._order) {
            return this.set(t.x, t.y, t.z, e)
        }
        reorder(t) {
            return Ge.setFromEuler(this),
            this.setFromQuaternion(Ge, t)
        }
        equals(t) {
            return t._x === this._x && t._y === this._y && t._z === this._z && t._order === this._order
        }
        fromArray(t) {
            return this._x = t[0],
            this._y = t[1],
            this._z = t[2],
            void 0 !== t[3] && (this._order = t[3]),
            this._onChangeCallback(),
            this
        }
        toArray(t=[], e=0) {
            return t[e] = this._x,
            t[e + 1] = this._y,
            t[e + 2] = this._z,
            t[e + 3] = this._order,
            t
        }
        _onChange(t) {
            return this._onChangeCallback = t,
            this
        }
        _onChangeCallback() {}
        *[Symbol.iterator]() {
            yield this._x,
            yield this._y,
            yield this._z,
            yield this._order
        }
    }
    Ve.DefaultOrder = "XYZ",
    Ve.RotationOrders = ["XYZ", "YZX", "ZXY", "XZY", "YXZ", "ZYX"];

    let tobject3d_id = 0;
      const ei = {
        type: "added"
    }
      , ii = {
        type: "removed"
    };

// OBJECT3D
    class ni extends mt {
        constructor() {
            super(),
            this.isObject3D = !0,
            Object.defineProperty(this, "id", {
                value: tobject3d_id++
            }),
            this.uuid = _t(),
            this.name = "",
            this.type = "Object3D",
            this.parent = null,
            this.children = [],
            this.up = ni.DefaultUp.clone();
            const t = new ee
              , e = new Ve
              , i = new te
              , n = new ee(1,1,1);
            e._onChange((function() {
                i.setFromEuler(e, !1)
            }
            )),
            i._onChange((function() {
                e.setFromQuaternion(i, void 0, !1)
            }
            )),
            Object.defineProperties(this, {
                position: {
                    configurable: !0,
                    enumerable: !0,
                    value: t
                },
                rotation: {
                    configurable: !0,
                    enumerable: !0,
                    value: e
                },
                quaternion: {
                    configurable: !0,
                    enumerable: !0,
                    value: i
                },
                scale: {
                    configurable: !0,
                    enumerable: !0,
                    value: n
                },
                modelViewMatrix: {
                    value: new Ie
                },
                normalMatrix: {
                    value: new Ct
                }
            }),
            this.matrix = new Ie,
            this.matrixWorld = new Ie,
            this.matrixAutoUpdate = ni.DefaultMatrixAutoUpdate,
            this.matrixWorldNeedsUpdate = !1,
            this.visible = !0,
            this.castShadow = !1,
            this.receiveShadow = !1,
            this.frustumCulled = !0,
            this.renderOrder = 0,
            this.animations = [],
            this.userData = {}
        }
        onBeforeRender() {}
        onAfterRender() {}
        add(t) {
            if (arguments.length > 1) {
                for (let t = 0; t < arguments.length; t++)
                    this.add(arguments[t]);
                return this
            }
            return t === this ? (console.error("THREE.Object3D.add: object can't be added as a child of itself.", t),
            this) : (t && t.isObject3D ? (null !== t.parent && t.parent.remove(t),
            t.parent = this,
            this.children.push(t),
            t.dispatchEvent(ei)) : console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", t),
            this)
        }
        remove(t) {
            if (arguments.length > 1) {
                for (let t = 0; t < arguments.length; t++)
                    this.remove(arguments[t]);
                return this
            }
            const e = this.children.indexOf(t);
            return -1 !== e && (t.parent = null,
            this.children.splice(e, 1),
            t.dispatchEvent(ii)),
            this
        }
        updateMatrix() {
            this.matrix.compose(this.position, this.quaternion, this.scale),
            this.matrixWorldNeedsUpdate = !0
        }
        updateMatrixWorld(t) {
            this.matrixAutoUpdate && this.updateMatrix(),
            (this.matrixWorldNeedsUpdate || t) && (null === this.parent ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix),
            this.matrixWorldNeedsUpdate = !1,
            t = !0);
            const e = this.children;
            for (let i = 0, n = e.length; i < n; i++)
                e[i].updateMatrixWorld(t)
        }
        updateWorldMatrix(t, e) {
            const i = this.parent;
            if (!0 === t && null !== i && i.updateWorldMatrix(!0, !1),
            this.matrixAutoUpdate && this.updateMatrix(),
            null === this.parent ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix),
            !0 === e) {
                const t = this.children;
                for (let e = 0, i = t.length; e < i; e++)
                    t[e].updateWorldMatrix(!1, !0)
            }
        }
    }

    ni.DefaultUp = new ee(0,1,0),
    ni.DefaultMatrixAutoUpdate = !0;

// UINT16BUFFERATTRIBUTE
    class mi {
        constructor(t=new ee, e=new ee, i=new ee) {
            this.a = t,
            this.b = e,
            this.c = i
        }
        setFromPointsAndIndices(t, e, i, n) {
            return this.a.copy(t[e]),
            this.b.copy(t[i]),
            this.c.copy(t[n]),
            this
        }
        setFromAttributeAndIndices(t, e, i, n) {
            return this.a.fromBufferAttribute(t, e),
            this.b.fromBufferAttribute(t, i),
            this.c.fromBufferAttribute(t, n),
            this
        }
    }

    let tmaterial_id = 0;
// MATERIAL
    class gi extends mt {
        constructor() {
            super(),
            this.isMaterial = !0,
            Object.defineProperty(this, "id", {
                value: tmaterial_id++
            }),
            this.uuid = _t(),
            this.name = "",
            this.type = "Material",
            this.blending = 1,
            this.side = 0,
            this.vertexColors = !1,
            this.opacity = 1,
            this.transparent = !1,
            this.blendSrc = 204,
            this.blendDst = 205,
            this.blendEquation = i,
            this.blendSrcAlpha = null,
            this.blendDstAlpha = null,
            this.blendEquationAlpha = null,
            this.depthFunc = 3,
            this.depthTest = !0,
            this.depthWrite = !0,
            this.stencilWriteMask = 255,
            this.stencilFunc = 519,
            this.stencilRef = 0,
            this.stencilFuncMask = 255,
            this.stencilFail = 7680,
            this.stencilZFail = 7680,
            this.stencilZPass = 7680,
            this.stencilWrite = !1,
            this.clippingPlanes = null,
            this.clipIntersection = !1,
            this.clipShadows = !1,
            this.shadowSide = null,
            this.colorWrite = !0,
            this.precision = null,
            this.polygonOffset = !1,
            this.polygonOffsetFactor = 0,
            this.polygonOffsetUnits = 0,
            this.dithering = !1,
            this.alphaToCoverage = !1,
            this.premultipliedAlpha = !1,
            this.visible = !0,
            this.toneMapped = !0,
            this.userData = {},
            this.version = 0,
            this._alphaTest = 0
        }
        get alphaTest() {
            return this._alphaTest
        }
        set alphaTest(t) {
            this._alphaTest > 0 != t > 0 && this.version++,
            this._alphaTest = t
        }
        onBuild() {}
        onBeforeRender() {}
        onBeforeCompile() {}
        customProgramCacheKey() {
            return this.onBeforeCompile.toString()
        }
        setValues(t) {
            if (void 0 !== t)
                for (const e in t) {
                    const i = t[e];
                    if (void 0 === i) {
                        console.warn("THREE.Material: '" + e + "' parameter is undefined.");
                        continue
                    }
                    const n = this[e];
                    void 0 !== n ? n && n.isColor ? n.set(i) : n && n.isVector3 && i && i.isVector3 ? n.copy(i) : this[e] = i : console.warn("THREE." + this.type + ": '" + e + "' is not a property of this material.")
                }
        }
        clone() {
            return (new this.constructor).copy(this)
        }
        copy(t) {
            this.name = t.name,
            this.blending = t.blending,
            this.side = t.side,
            this.vertexColors = t.vertexColors,
            this.opacity = t.opacity,
            this.transparent = t.transparent,
            this.blendSrc = t.blendSrc,
            this.blendDst = t.blendDst,
            this.blendEquation = t.blendEquation,
            this.blendSrcAlpha = t.blendSrcAlpha,
            this.blendDstAlpha = t.blendDstAlpha,
            this.blendEquationAlpha = t.blendEquationAlpha,
            this.depthFunc = t.depthFunc,
            this.depthTest = t.depthTest,
            this.depthWrite = t.depthWrite,
            this.stencilWriteMask = t.stencilWriteMask,
            this.stencilFunc = t.stencilFunc,
            this.stencilRef = t.stencilRef,
            this.stencilFuncMask = t.stencilFuncMask,
            this.stencilFail = t.stencilFail,
            this.stencilZFail = t.stencilZFail,
            this.stencilZPass = t.stencilZPass,
            this.stencilWrite = t.stencilWrite;
            const e = t.clippingPlanes;
            let i = null;
            if (null !== e) {
                const t = e.length;
                i = new Array(t);
                for (let n = 0; n !== t; ++n)
                    i[n] = e[n].clone()
            }
            return this.clippingPlanes = i,
            this.clipIntersection = t.clipIntersection,
            this.clipShadows = t.clipShadows,
            this.shadowSide = t.shadowSide,
            this.colorWrite = t.colorWrite,
            this.precision = t.precision,
            this.polygonOffset = t.polygonOffset,
            this.polygonOffsetFactor = t.polygonOffsetFactor,
            this.polygonOffsetUnits = t.polygonOffsetUnits,
            this.dithering = t.dithering,
            this.alphaTest = t.alphaTest,
            this.alphaToCoverage = t.alphaToCoverage,
            this.premultipliedAlpha = t.premultipliedAlpha,
            this.visible = t.visible,
            this.toneMapped = t.toneMapped,
            this.userData = JSON.parse(JSON.stringify(t.userData)),
            this
        }
        dispose() {
            this.dispatchEvent({
                type: "dispose"
            })
        }
        set needsUpdate(t) {
            !0 === t && this.version++
        }
    }

// MESHBASICMATERIAL
    class vi extends gi {
        constructor(t) {
            super(),
            this.isMeshBasicMaterial = !0,
            this.type = "MeshBasicMaterial",
            this.color = new Ht(16777215),
            this.map = null,
            this.lightMap = null,
            this.lightMapIntensity = 1,
            this.aoMap = null,
            this.aoMapIntensity = 1,
            this.specularMap = null,
            this.alphaMap = null,
            this.envMap = null,
            this.combine = 0,
            this.reflectivity = 1,
            this.refractionRatio = .98,
            this.wireframe = !1,
            this.wireframeLinewidth = 1,
            this.wireframeLinecap = "round",
            this.wireframeLinejoin = "round",
            this.fog = !0,
            this.setValues(t)
        }
    }

// BUFFERATTRIBUTE
    class yi {
        constructor(t, e, i) {
            if (Array.isArray(t))
                throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
            this.isBufferAttribute = !0,
            this.name = "",
            this.array = t,
            this.itemSize = e,
            this.count = void 0 !== t ? t.length / e : 0,
            this.normalized = !0 === i,
            this.usage = 35044,
            this.updateRange = {
                offset: 0,
                count: -1
            },
            this.version = 0
        }
        onUploadCallback() {}
        set needsUpdate(t) {
            !0 === t && this.version++
        }
        set(t, e=0) {
            return this.array.set(t, e),
            this
        }
        getX(t) {
            return this.array[t * this.itemSize]
        }
        setX(t, e) {
            return this.array[t * this.itemSize] = e,
            this
        }
        getY(t) {
            return this.array[t * this.itemSize + 1]
        }
        setY(t, e) {
            return this.array[t * this.itemSize + 1] = e,
            this
        }
        getZ(t) {
            return this.array[t * this.itemSize + 2]
        }
        setZ(t, e) {
            return this.array[t * this.itemSize + 2] = e,
            this
        }
        getW(t) {
            return this.array[t * this.itemSize + 3]
        }
        setW(t, e) {
            return this.array[t * this.itemSize + 3] = e,
            this
        }
        setXY(t, e, i) {
            return t *= this.itemSize,
            this.array[t + 0] = e,
            this.array[t + 1] = i,
            this
        }
        setXYZ(t, e, i, n) {
            return t *= this.itemSize,
            this.array[t + 0] = e,
            this.array[t + 1] = i,
            this.array[t + 2] = n,
            this
        }
        setXYZW(t, e, i, n, r) {
            return t *= this.itemSize,
            this.array[t + 0] = e,
            this.array[t + 1] = i,
            this.array[t + 2] = n,
            this.array[t + 3] = r,
            this
        }
        onUpload(t) {
            return this.onUploadCallback = t,
            this
        }
    }

// UINT16BUFFERATTRIBUTE
    class Mi extends yi {
        constructor(t, e, i) {
            super(new Uint16Array(t), e, i)
        }
    }

// UINT32BUFFERATTRIBUTE
    class bi extends yi {
        constructor(t, e, i) {
            super(new Uint32Array(t), e, i)
        }
    }

// FLOAT32BUFFERATTRIBUTE
    class wi extends yi {
        constructor(t, e, i) {
            super(new Float32Array(t), e, i)
        }
    }

    let tbuffergeometry_id = 0;
      const tbox3 = new re
      , tvector3b = new ee;
// BUFFERGEOMETRY
    t.BufferGeometry = class extends mt {
        constructor() {
            super(),
            this.isBufferGeometry = !0,
            Object.defineProperty(this, "id", {
                value: tbuffergeometry_id++
            }),
            this.uuid = _t(),
            this.name = "",
            this.type = "BufferGeometry",
            this.index = null,
            this.attributes = {},
            this.morphAttributes = {},
            this.morphTargetsRelative = !1,
            this.groups = [],
            this.boundingBox = null,
            this.boundingSphere = null,
            this.drawRange = {
                start: 0,
                count: 1 / 0
            },
            this.userData = {}
        }
        getIndex() {
            return this.index
        }
        setIndex(t) {
            return Array.isArray(t) ? this.index = new (check_16or32bit_array(t) ? bi : Mi)(t,1) : this.index = t,
            this
        }
        getAttribute(t) {
            return this.attributes[t]
        }
        setAttribute(t, e) {
            return this.attributes[t] = e,
            this
        }
        deleteAttribute(t) {
            return delete this.attributes[t],
            this
        }
        hasAttribute(t) {
            return void 0 !== this.attributes[t]
        }
        addGroup(t, e, i=0) {
            this.groups.push({
                start: t,
                count: e,
                materialIndex: i
            })
        }
        applyMatrix4(t) {
            const e = this.attributes.position;
            void 0 !== e && (e.applyMatrix4(t),
            e.needsUpdate = !0);
            const i = this.attributes.normal;
            if (void 0 !== i) {
                const e = (new Ct).getNormalMatrix(t);
                i.applyNormalMatrix(e),
                i.needsUpdate = !0
            }
            const n = this.attributes.tangent;
            return void 0 !== n && (n.transformDirection(t),
            n.needsUpdate = !0),
            null !== this.boundingBox && this.computeBoundingBox(),
            null !== this.boundingSphere && this.computeBoundingSphere(),
            this
        }
        applyQuaternion(t) {
            return Ti.makeRotationFromQuaternion(t),
            this.applyMatrix4(Ti),
            this
        }
        rotateX(t) {
            return Ti.makeRotationX(t),
            this.applyMatrix4(Ti),
            this
        }
        rotateY(t) {
            return Ti.makeRotationY(t),
            this.applyMatrix4(Ti),
            this
        }
        rotateZ(t) {
            return Ti.makeRotationZ(t),
            this.applyMatrix4(Ti),
            this
        }
        translate(t, e, i) {
            return Ti.makeTranslation(t, e, i),
            this.applyMatrix4(Ti),
            this
        }
        scale(t, e, i) {
            return Ti.makeScale(t, e, i),
            this.applyMatrix4(Ti),
            this
        }
        center() {
            return this.computeBoundingBox(),
            this.boundingBox.getCenter(Ei).negate(),
            this.translate(Ei.x, Ei.y, Ei.z),
            this
        }
        setFromPoints(t) {
            const e = [];
            for (let i = 0, n = t.length; i < n; i++) {
                const n = t[i];
                e.push(n.x, n.y, n.z || 0)
            }
            return this.setAttribute("position", new wi(e,3)),
            this
        }
        computeBoundingBox() {
            null === this.boundingBox && (this.boundingBox = new re);
            const t = this.attributes.position
              , e = this.morphAttributes.position;
            if (t && t.isGLBufferAttribute)
                return console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".', this),
                void this.boundingBox.set(new ee(-1 / 0,-1 / 0,-1 / 0), new ee(1 / 0,1 / 0,1 / 0));
            if (void 0 !== t) {
                if (this.boundingBox.setFromBufferAttribute(t),
                e)
                    for (let t = 0, i = e.length; t < i; t++) {
                        const i = e[t];
                        tbox3.setFromBufferAttribute(i),
                        this.morphTargetsRelative ? (tvector3b.addVectors(this.boundingBox.min, tbox3.min),
                        this.boundingBox.expandByPoint(tvector3b),
                        tvector3b.addVectors(this.boundingBox.max, tbox3.max),
                        this.boundingBox.expandByPoint(tvector3b)) : (this.boundingBox.expandByPoint(tbox3.min),
                        this.boundingBox.expandByPoint(tbox3.max))
                    }
            } else
                this.boundingBox.makeEmpty();
            (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this)
        }
        computeBoundingSphere() {
            null === this.boundingSphere && (this.boundingSphere = new we);
            const t = this.attributes.position
              , e = this.morphAttributes.position;
            if (t && t.isGLBufferAttribute)
                return console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".', this),
                void this.boundingSphere.set(new ee, 1 / 0);
            if (t) {
                const i = this.boundingSphere.center;
                if (tbox3.setFromBufferAttribute(t),
                e)
                    for (let t = 0, i = e.length; t < i; t++) {
                        const i = e[t];
                        Li.setFromBufferAttribute(i),
                        this.morphTargetsRelative ? (tvector3b.addVectors(tbox3.min, Li.min),
                        tbox3.expandByPoint(tvector3b),
                        tvector3b.addVectors(tbox3.max, Li.max),
                        tbox3.expandByPoint(tvector3b)) : (tbox3.expandByPoint(Li.min),
                        tbox3.expandByPoint(Li.max))
                    }
                tbox3.getCenter(i);
                let n = 0;
                for (let e = 0, r = t.count; e < r; e++)
                    tvector3b.fromBufferAttribute(t, e),
                    n = Math.max(n, i.distanceToSquared(tvector3b));
                if (e)
                    for (let r = 0, s = e.length; r < s; r++) {
                        const s = e[r]
                          , a = this.morphTargetsRelative;
                        for (let e = 0, r = s.count; e < r; e++)
                            tvector3b.fromBufferAttribute(s, e),
                            a && (Ei.fromBufferAttribute(t, e),
                            tvector3b.add(Ei)),
                            n = Math.max(n, i.distanceToSquared(tvector3b))
                    }
                this.boundingSphere.radius = Math.sqrt(n),
                isNaN(this.boundingSphere.radius) && console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this)
            }
        }
        computeTangents() {
            const t = this.index
              , e = this.attributes;
            if (null === t || void 0 === e.position || void 0 === e.normal || void 0 === e.uv)
                return void console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");
            const i = t.array
              , n = e.position.array
              , r = e.normal.array
              , s = e.uv.array
              , a = n.length / 3;
            !1 === this.hasAttribute("tangent") && this.setAttribute("tangent", new yi(new Float32Array(4 * a),4));
            const o = this.getAttribute("tangent").array
              , l = []
              , c = [];
            for (let t = 0; t < a; t++)
                l[t] = new ee,
                c[t] = new ee;
            const h = new ee
              , u = new ee
              , d = new ee
              , p = new Et
              , m = new Et
              , f = new Et
              , g = new ee
              , v = new ee;
            function x(t, e, i) {
                h.fromArray(n, 3 * t),
                u.fromArray(n, 3 * e),
                d.fromArray(n, 3 * i),
                p.fromArray(s, 2 * t),
                m.fromArray(s, 2 * e),
                f.fromArray(s, 2 * i),
                u.sub(h),
                d.sub(h),
                m.sub(p),
                f.sub(p);
                const r = 1 / (m.x * f.y - f.x * m.y);
                isFinite(r) && (g.copy(u).multiplyScalar(f.y).addScaledVector(d, -m.y).multiplyScalar(r),
                v.copy(d).multiplyScalar(m.x).addScaledVector(u, -f.x).multiplyScalar(r),
                l[t].add(g),
                l[e].add(g),
                l[i].add(g),
                c[t].add(v),
                c[e].add(v),
                c[i].add(v))
            }
            let _ = this.groups;
            0 === _.length && (_ = [{
                start: 0,
                count: i.length
            }]);
            for (let t = 0, e = _.length; t < e; ++t) {
                const e = _[t]
                  , n = e.start;
                for (let t = n, r = n + e.count; t < r; t += 3)
                    x(i[t + 0], i[t + 1], i[t + 2])
            }
            const y = new ee
              , M = new ee
              , b = new ee
              , w = new ee;
            function S(t) {
                b.fromArray(r, 3 * t),
                w.copy(b);
                const e = l[t];
                y.copy(e),
                y.sub(b.multiplyScalar(b.dot(e))).normalize(),
                M.crossVectors(w, e);
                const i = M.dot(c[t]) < 0 ? -1 : 1;
                o[4 * t] = y.x,
                o[4 * t + 1] = y.y,
                o[4 * t + 2] = y.z,
                o[4 * t + 3] = i
            }
            for (let t = 0, e = _.length; t < e; ++t) {
                const e = _[t]
                  , n = e.start;
                for (let t = n, r = n + e.count; t < r; t += 3)
                    S(i[t + 0]),
                    S(i[t + 1]),
                    S(i[t + 2])
            }
        }
        computeVertexNormals() {
            const t = this.index
              , e = this.getAttribute("position");
            if (void 0 !== e) {
                let i = this.getAttribute("normal");
                if (void 0 === i)
                    i = new yi(new Float32Array(3 * e.count),3),
                    this.setAttribute("normal", i);
                else
                    for (let t = 0, e = i.count; t < e; t++)
                        i.setXYZ(t, 0, 0, 0);
                const n = new ee
                  , r = new ee
                  , s = new ee
                  , a = new ee
                  , o = new ee
                  , l = new ee
                  , c = new ee
                  , h = new ee;
                if (t)
                    for (let u = 0, d = t.count; u < d; u += 3) {
                        const d = t.getX(u + 0)
                          , p = t.getX(u + 1)
                          , m = t.getX(u + 2);
                        n.fromBufferAttribute(e, d),
                        r.fromBufferAttribute(e, p),
                        s.fromBufferAttribute(e, m),
                        c.subVectors(s, r),
                        h.subVectors(n, r),
                        c.cross(h),
                        a.fromBufferAttribute(i, d),
                        o.fromBufferAttribute(i, p),
                        l.fromBufferAttribute(i, m),
                        a.add(c),
                        o.add(c),
                        l.add(c),
                        i.setXYZ(d, a.x, a.y, a.z),
                        i.setXYZ(p, o.x, o.y, o.z),
                        i.setXYZ(m, l.x, l.y, l.z)
                    }
                else
                    for (let t = 0, a = e.count; t < a; t += 3)
                        n.fromBufferAttribute(e, t + 0),
                        r.fromBufferAttribute(e, t + 1),
                        s.fromBufferAttribute(e, t + 2),
                        c.subVectors(s, r),
                        h.subVectors(n, r),
                        c.cross(h),
                        i.setXYZ(t + 0, c.x, c.y, c.z),
                        i.setXYZ(t + 1, c.x, c.y, c.z),
                        i.setXYZ(t + 2, c.x, c.y, c.z);
                this.normalizeNormals(),
                i.needsUpdate = !0
            }
        }
        normalizeNormals() {
            const t = this.attributes.normal;
            for (let e = 0, i = t.count; e < i; e++)
                tvector3b.fromBufferAttribute(t, e),
                tvector3b.normalize(),
                t.setXYZ(e, tvector3b.x, tvector3b.y, tvector3b.z)
        }
        toNonIndexed() {
            function t(t, e) {
                const i = t.array
                  , n = t.itemSize
                  , r = t.normalized
                  , s = new i.constructor(e.length * n);
                let a = 0
                  , o = 0;
                for (let r = 0, l = e.length; r < l; r++) {
                    a = t.isInterleavedBufferAttribute ? e[r] * t.data.stride + t.offset : e[r] * n;
                    for (let t = 0; t < n; t++)
                        s[o++] = i[a++]
                }
                return new yi(s,n,r)
            }
            if (null === this.index)
                return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),
                this;
            const e = new Pi
              , i = this.index.array
              , n = this.attributes;
            for (const r in n) {
                const s = t(n[r], i);
                e.setAttribute(r, s)
            }
            const r = this.morphAttributes;
            for (const n in r) {
                const s = []
                  , a = r[n];
                for (let e = 0, n = a.length; e < n; e++) {
                    const n = t(a[e], i);
                    s.push(n)
                }
                e.morphAttributes[n] = s
            }
            e.morphTargetsRelative = this.morphTargetsRelative;
            const s = this.groups;
            for (let t = 0, i = s.length; t < i; t++) {
                const i = s[t];
                e.addGroup(i.start, i.count, i.materialIndex)
            }
            return e
        }
        dispose() {
            this.dispatchEvent({
                type: "dispose"
            })
        }
    }

// MESH
    class Zi extends ni {
        constructor(t=new Pi, e=new vi) {
            super(),
            this.isMesh = !0,
            this.type = "Mesh",
            this.geometry = t,
            this.material = e
        }
    }

// BOXGEOMETRY
    t.BoxGeometry = class extends t.BufferGeometry {
        constructor(t=1, e=1, i=1, n=1, r=1, s=1) {
            super(),
            this.type = "BoxGeometry",
            this.parameters = {
                width: t,
                height: e,
                depth: i,
                widthSegments: n,
                heightSegments: r,
                depthSegments: s
            };
            const a = this;
            n = Math.floor(n),
            r = Math.floor(r),
            s = Math.floor(s);
            const o = []
              , l = []
              , c = []
              , h = [];
            let u = 0
              , d = 0;
            function p(t, e, i, n, r, s, p, m, f, g, v) {
                const x = s / f
                  , _ = p / g
                  , y = s / 2
                  , M = p / 2
                  , b = m / 2
                  , w = f + 1
                  , S = g + 1;
                let T = 0
                  , A = 0;
                const E = new ee;
                for (let s = 0; s < S; s++) {
                    const a = s * _ - M;
                    for (let o = 0; o < w; o++) {
                        const u = o * x - y;
                        E[t] = u * n,
                        E[e] = a * r,
                        E[i] = b,
                        l.push(E.x, E.y, E.z),
                        E[t] = 0,
                        E[e] = 0,
                        E[i] = m > 0 ? 1 : -1,
                        c.push(E.x, E.y, E.z),
                        h.push(o / f),
                        h.push(1 - s / g),
                        T += 1
                    }
                }
                for (let t = 0; t < g; t++)
                    for (let e = 0; e < f; e++) {
                        const i = u + e + w * t
                          , n = u + e + w * (t + 1)
                          , r = u + (e + 1) + w * (t + 1)
                          , s = u + (e + 1) + w * t;
                        o.push(i, n, s),
                        o.push(n, r, s),
                        A += 6
                    }
                a.addGroup(d, A, v),
                d += A,
                u += T
            }
            p("z", "y", "x", -1, -1, i, e, t, s, r, 0),
            p("z", "y", "x", 1, -1, i, e, -t, s, r, 1),
            p("x", "z", "y", 1, 1, t, i, e, n, s, 2),
            p("x", "z", "y", 1, -1, t, i, -e, n, s, 3),
            p("x", "y", "z", 1, -1, t, e, i, n, r, 4),
            p("x", "y", "z", -1, -1, t, e, -i, n, r, 5),
            this.setIndex(o),
            this.setAttribute("position", new wi(l,3)),
            this.setAttribute("normal", new wi(c,3)),
            this.setAttribute("uv", new wi(h,2))
        }
    }

// något med uniforms?
// clone
    function $i(t) {
        const e = {};
        for (const i in t) {
            e[i] = {};
            for (const n in t[i]) {
                const r = t[i][n];
                r && (r.isColor || r.isMatrix3 || r.isMatrix4 || r.isVector2 || r.isVector3 || r.isVector4 || r.isTexture || r.isQuaternion) ? e[i][n] = r.clone() : Array.isArray(r) ? e[i][n] = r.slice() : e[i][n] = r
            }
        }
        return e
    }
// något med uniforms?
// merge
    function Qi(t) {
        const e = {};
        for (let i = 0; i < t.length; i++) {
            const n = $i(t[i]);
            for (const t in n)
                e[t] = n[t]
        }
        return e
    }
    const tn = {
        clone: $i,
        merge: Qi
    };

// SHADERMATERIAL
    class en extends gi {
        constructor(t) {
            super(),
            this.isShaderMaterial = !0,
            this.type = "ShaderMaterial",
            this.defines = {},
            this.uniforms = {},
            this.uniformsGroups = [],
            this.vertexShader = "void main() {\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",
            this.fragmentShader = "void main() {\n\tgl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}",
            this.linewidth = 1,
            this.wireframe = !1,
            this.wireframeLinewidth = 1,
            this.fog = !1,
            this.lights = !1,
            this.clipping = !1,
            this.extensions = {
                derivatives: !1,
                fragDepth: !1,
                drawBuffers: !1,
                shaderTextureLOD: !1
            },
            this.defaultAttributeValues = {
                color: [1, 1, 1],
                uv: [0, 0],
                uv2: [0, 0]
            },
            this.index0AttributeName = void 0,
            this.uniformsNeedUpdate = !1,
            this.glslVersion = null,
            void 0 !== t && this.setValues(t)
        }
    }

// PERSPECTIVECAMERA
    class rn extends ni {
        constructor(t=50, e=1, i=.1, n=2e3) {
            super(),
	    // CAMERA
            this.isCamera = !0,
            this.type = "Camera",
            this.matrixWorldInverse = new Ie,
            this.projectionMatrix = new Ie,
            this.projectionMatrixInverse = new Ie
	    // PERSPECTIVECAMERA
            this.isPerspectiveCamera = !0,
            this.type = "PerspectiveCamera",
            this.fov = t,
            this.zoom = 1,
            this.near = i,
            this.far = n,
            this.focus = 10,
            this.aspect = e,
            this.view = null,
            this.filmGauge = 35,
            this.filmOffset = 0,
            this.updateProjectionMatrix()
        }
	// CAMERA
        getWorldDirection(t) {
            this.updateWorldMatrix(!0, !1);
            const e = this.matrixWorld.elements;
            return t.set(-e[8], -e[9], -e[10]).normalize()
        }
        updateMatrixWorld(t) {
            super.updateMatrixWorld(t),
            this.matrixWorldInverse.copy(this.matrixWorld).invert()
        }
        updateWorldMatrix(t, e) {
            super.updateWorldMatrix(t, e),
            this.matrixWorldInverse.copy(this.matrixWorld).invert()
        }
	// PERSPECTIVECAMERA
        updateProjectionMatrix() {
            const t = this.near;
            let e = t * Math.tan(.5 * vt * this.fov) / this.zoom
              , i = 2 * e
              , n = this.aspect * i
              , r = -.5 * n;
            const s = this.view;
            if (null !== this.view && this.view.enabled) {
                const t = s.fullWidth
                  , a = s.fullHeight;
                r += s.offsetX * n / t,
                e -= s.offsetY * i / a,
                n *= s.width / t,
                i *= s.height / a
            }
            const a = this.filmOffset;
            0 !== a && (r += t * a / this.getFilmWidth()),
            this.projectionMatrix.makePerspective(r, r + n, e, e - i, t, this.far),
            this.projectionMatrixInverse.copy(this.projectionMatrix).invert()
        }
    }

// PLANE
    class dn {
        constructor(t=new ee(1,0,0), e=0) {
            this.isPlane = !0,
            this.normal = t,
            this.constant = e
        }
        set(t, e) {
            return this.normal.copy(t),
            this.constant = e,
            this
        }
        setComponents(t, e, i, n) {
            return this.normal.set(t, e, i),
            this.constant = n,
            this
        }
        normalize() {
            const t = 1 / this.normal.length();
            return this.normal.multiplyScalar(t),
            this.constant *= t,
            this
        }
        negate() {
            return this.constant *= -1,
            this.normal.negate(),
            this
        }
        distanceToPoint(t) {
            return this.normal.dot(t) + this.constant
        }
        distanceToSphere(t) {
            return this.distanceToPoint(t.center) - t.radius
        }
        projectPoint(t, e) {
            return e.copy(this.normal).multiplyScalar(-this.distanceToPoint(t)).add(t)
        }
        intersectLine(t, e) {
            const i = t.delta(cn)
              , n = this.normal.dot(i);
            if (0 === n)
                return 0 === this.distanceToPoint(t.start) ? e.copy(t.start) : null;
            const r = -(t.start.dot(this.normal) + this.constant) / n;
            return r < 0 || r > 1 ? null : e.copy(i).multiplyScalar(r).add(t.start)
        }
        intersectsLine(t) {
            const e = this.distanceToPoint(t.start)
              , i = this.distanceToPoint(t.end);
            return e < 0 && i > 0 || i < 0 && e > 0
        }
        intersectsBox(t) {
            return t.intersectsPlane(this)
        }
        intersectsSphere(t) {
            return t.intersectsPlane(this)
        }
        coplanarPoint(t) {
            return t.copy(this.normal).multiplyScalar(-this.constant)
        }
        applyMatrix4(t, e) {
            const i = e || un.getNormalMatrix(t)
              , n = this.coplanarPoint(cn).applyMatrix4(t)
              , r = this.normal.applyMatrix3(i).normalize();
            return this.constant = -n.dot(r),
            this
        }
        translate(t) {
            return this.constant -= t.dot(this.normal),
            this
        }
        equals(t) {
            return t.normal.equals(this.normal) && t.constant === this.constant
        }
    }

    const tsphere = new we
      , tvector3 = new ee;
// FRUSTUM
    class fn {
        constructor(t=new dn, e=new dn, i=new dn, n=new dn, r=new dn, s=new dn) {
            this.planes = [t, e, i, n, r, s]
        }
        set(t, e, i, n, r, s) {
            const a = this.planes;
            return a[0].copy(t),
            a[1].copy(e),
            a[2].copy(i),
            a[3].copy(n),
            a[4].copy(r),
            a[5].copy(s),
            this
        }
        setFromProjectionMatrix(t) {
            const e = this.planes
              , i = t.elements
              , n = i[0]
              , r = i[1]
              , s = i[2]
              , a = i[3]
              , o = i[4]
              , l = i[5]
              , c = i[6]
              , h = i[7]
              , u = i[8]
              , d = i[9]
              , p = i[10]
              , m = i[11]
              , f = i[12]
              , g = i[13]
              , v = i[14]
              , x = i[15];
            return e[0].setComponents(a - n, h - o, m - u, x - f).normalize(),
            e[1].setComponents(a + n, h + o, m + u, x + f).normalize(),
            e[2].setComponents(a + r, h + l, m + d, x + g).normalize(),
            e[3].setComponents(a - r, h - l, m - d, x - g).normalize(),
            e[4].setComponents(a - s, h - c, m - p, x - v).normalize(),
            e[5].setComponents(a + s, h + c, m + p, x + v).normalize(),
            this
        }
        intersectsObject(t) {
            const e = t.geometry;
            return null === e.boundingSphere && e.computeBoundingSphere(),
            tsphere.copy(e.boundingSphere).applyMatrix4(t.matrixWorld),
            this.intersectsSphere(tsphere)
        }
        intersectsSprite(t) {
            return tsphere.center.set(0, 0, 0),
            tsphere.radius = .7071067811865476,
            tsphere.applyMatrix4(t.matrixWorld),
            this.intersectsSphere(tsphere)
        }
        intersectsSphere(t) {
            const e = this.planes
              , i = t.center
              , n = -t.radius;
            for (let t = 0; t < 6; t++) {
                if (e[t].distanceToPoint(i) < n)
                    return !1
            }
            return !0
        }
        intersectsBox(t) {
            const e = this.planes;
            for (let i = 0; i < 6; i++) {
                const n = e[i];
                if (tvector3.x = n.normal.x > 0 ? t.max.x : t.min.x,
                tvector3.y = n.normal.y > 0 ? t.max.y : t.min.y,
                tvector3.z = n.normal.z > 0 ? t.max.z : t.min.z,
                n.distanceToPoint(tvector3) < 0)
                    return !1
            }
            return !0
        }
        containsPoint(t) {
            const e = this.planes;
            for (let i = 0; i < 6; i++)
                if (e[i].distanceToPoint(t) < 0)
                    return !1;
            return !0
        }
    }

// animation?
    function animationframe_controller() {
        let t = null
          , e = !1
          , i = null
          , n = null;
        function r(e, s) {
            i(e, s),
            n = t.requestAnimationFrame(r)
        }
        return {
            start: function() {
                !0 !== e && null !== i && (n = t.requestAnimationFrame(r),
                e = !0)
            },
            stop: function() {
                t.cancelAnimationFrame(n),
                e = !1
            },
            setAnimationLoop: function(t) {
                i = t
            },
            setContext: function(e) {
                t = e
            }
        }
    }

// något med rendering? bufferattributes?
    function vn(t, e) {
        const i = e.isWebGL2
          , n = new WeakMap;
        return {
            get: function(t) {
                return t.isInterleavedBufferAttribute && (t = t.data),
                n.get(t)
            },
            remove: function(e) {
                e.isInterleavedBufferAttribute && (e = e.data);
                const i = n.get(e);
                i && (t.deleteBuffer(i.buffer),
                n.delete(e))
            },
            update: function(e, r) {
                if (e.isGLBufferAttribute) {
                    const t = n.get(e);
                    return void ((!t || t.version < e.version) && n.set(e, {
                        buffer: e.buffer,
                        type: e.type,
                        bytesPerElement: e.elementSize,
                        version: e.version
                    }))
                }
                e.isInterleavedBufferAttribute && (e = e.data);
                const s = n.get(e);
                void 0 === s ? n.set(e, function(e, n) {
                    const r = e.array
                      , s = e.usage
                      , a = t.createBuffer();
                    let o;
                    if (t.bindBuffer(n, a),
                    t.bufferData(n, r, s),
                    e.onUploadCallback(),
                    r instanceof Float32Array)
                        o = 5126;
                    else if (r instanceof Uint16Array)
                        if (e.isFloat16BufferAttribute) {
                            if (!i)
                                throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");
                            o = 5131
                        } else
                            o = 5123;
                    else if (r instanceof Int16Array)
                        o = 5122;
                    else if (r instanceof Uint32Array)
                        o = 5125;
                    else if (r instanceof Int32Array)
                        o = 5124;
                    else if (r instanceof Int8Array)
                        o = 5120;
                    else if (r instanceof Uint8Array)
                        o = 5121;
                    else {
                        if (!(r instanceof Uint8ClampedArray))
                            throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: " + r);
                        o = 5121
                    }
                    return {
                        buffer: a,
                        type: o,
                        bytesPerElement: r.BYTES_PER_ELEMENT,
                        version: e.version
                    }
                }(e, r)) : s.version < e.version && (!function(e, n, r) {
                    const s = n.array
                      , a = n.updateRange;
                    t.bindBuffer(r, e),
                    -1 === a.count ? t.bufferSubData(r, 0, s) : (i ? t.bufferSubData(r, a.offset * s.BYTES_PER_ELEMENT, s, a.offset, a.count) : t.bufferSubData(r, a.offset * s.BYTES_PER_ELEMENT, s.subarray(a.offset, a.offset + a.count)),
                    a.count = -1)
                }(s.buffer, e, r),
                s.version = e.version)
            }
        }
    }

// PLANEGEOMETRY
    class xn extends t.BufferGeometry {
        constructor(t=1, e=1, i=1, n=1) {
            super(),
            this.type = "PlaneGeometry",
            this.parameters = {
                width: t,
                height: e,
                widthSegments: i,
                heightSegments: n
            };
            const r = t / 2
              , s = e / 2
              , a = Math.floor(i)
              , o = Math.floor(n)
              , l = a + 1
              , c = o + 1
              , h = t / a
              , u = e / o
              , d = []
              , p = []
              , m = []
              , f = [];
            for (let t = 0; t < c; t++) {
                const e = t * u - s;
                for (let i = 0; i < l; i++) {
                    const n = i * h - r;
                    p.push(n, -e, 0),
                    m.push(0, 0, 1),
                    f.push(i / a),
                    f.push(1 - t / o)
                }
            }
            for (let t = 0; t < o; t++)
                for (let e = 0; e < a; e++) {
                    const i = e + l * t
                      , n = e + l * (t + 1)
                      , r = e + 1 + l * (t + 1)
                      , s = e + 1 + l * t;
                    d.push(i, n, s),
                    d.push(n, r, s)
                }
            this.setIndex(d),
            this.setAttribute("position", new wi(p,3)),
            this.setAttribute("normal", new wi(m,3)),
            this.setAttribute("uv", new wi(f,2))
        }
    }

// SHADING
// detta är ett objekt bestående av en massa shaders

    const _n = {

// ALPHAMAP
        alphamap_fragment: "#ifdef USE_ALPHAMAP\n\tdiffuseColor.a *= texture2D( alphaMap, vUv ).g;\n#endif",

        alphamap_pars_fragment: "#ifdef USE_ALPHAMAP\n\tuniform sampler2D alphaMap;\n#endif",

        alphatest_fragment: "#ifdef USE_ALPHATEST\n\tif ( diffuseColor.a < alphaTest ) discard;\n#endif",

        alphatest_pars_fragment: "#ifdef USE_ALPHATEST\n\tuniform float alphaTest;\n#endif",

        aomap_fragment: "#ifdef USE_AOMAP\n\tfloat ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;\n\treflectedLight.indirectDiffuse *= ambientOcclusion;\n\t#if defined( USE_ENVMAP ) && defined( STANDARD )\n\t\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\t\treflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );\n\t#endif\n#endif",

        aomap_pars_fragment: "#ifdef USE_AOMAP\n\tuniform sampler2D aoMap;\n\tuniform float aoMapIntensity;\n#endif",

// ??
        begin_vertex: "vec3 transformed = vec3( position );",

        beginnormal_vertex: "vec3 objectNormal = vec3( normal );\n#ifdef USE_TANGENT\n\tvec3 objectTangent = vec3( tangent.xyz );\n#endif",

        bsdfs: "vec3 BRDF_Lambert( const in vec3 diffuseColor ) {\n\treturn RECIPROCAL_PI * diffuseColor;\n}\nvec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {\n\tfloat fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );\n\treturn f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );\n}\nfloat F_Schlick( const in float f0, const in float f90, const in float dotVH ) {\n\tfloat fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );\n\treturn f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );\n}\nvec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {\n\t\tfloat x = clamp( 1.0 - dotVH, 0.0, 1.0 );\n\t\tfloat x2 = x * x;\n\t\tfloat x5 = clamp( x * x2 * x2, 0.0, 0.9999 );\n\t\treturn ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );\n}\nfloat V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {\n\tfloat a2 = pow2( alpha );\n\tfloat gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n\tfloat gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n\treturn 0.5 / max( gv + gl, EPSILON );\n}\nfloat D_GGX( const in float alpha, const in float dotNH ) {\n\tfloat a2 = pow2( alpha );\n\tfloat denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;\n\treturn RECIPROCAL_PI * a2 / pow2( denom );\n}\nvec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 f0, const in float f90, const in float roughness ) {\n\tfloat alpha = pow2( roughness );\n\tvec3 halfDir = normalize( lightDir + viewDir );\n\tfloat dotNL = saturate( dot( normal, lightDir ) );\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\tfloat dotNH = saturate( dot( normal, halfDir ) );\n\tfloat dotVH = saturate( dot( viewDir, halfDir ) );\n\tvec3 F = F_Schlick( f0, f90, dotVH );\n\tfloat V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n\tfloat D = D_GGX( alpha, dotNH );\n\treturn F * ( V * D );\n}\n#ifdef USE_IRIDESCENCE\n\tvec3 BRDF_GGX_Iridescence( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 f0, const in float f90, const in float iridescence, const in vec3 iridescenceFresnel, const in float roughness ) {\n\t\tfloat alpha = pow2( roughness );\n\t\tvec3 halfDir = normalize( lightDir + viewDir );\n\t\tfloat dotNL = saturate( dot( normal, lightDir ) );\n\t\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\t\tfloat dotNH = saturate( dot( normal, halfDir ) );\n\t\tfloat dotVH = saturate( dot( viewDir, halfDir ) );\n\t\tvec3 F = mix( F_Schlick( f0, f90, dotVH ), iridescenceFresnel, iridescence );\n\t\tfloat V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n\t\tfloat D = D_GGX( alpha, dotNH );\n\t\treturn F * ( V * D );\n\t}\n#endif\nvec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {\n\tconst float LUT_SIZE = 64.0;\n\tconst float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;\n\tconst float LUT_BIAS = 0.5 / LUT_SIZE;\n\tfloat dotNV = saturate( dot( N, V ) );\n\tvec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );\n\tuv = uv * LUT_SCALE + LUT_BIAS;\n\treturn uv;\n}\nfloat LTC_ClippedSphereFormFactor( const in vec3 f ) {\n\tfloat l = length( f );\n\treturn max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );\n}\nvec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {\n\tfloat x = dot( v1, v2 );\n\tfloat y = abs( x );\n\tfloat a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;\n\tfloat b = 3.4175940 + ( 4.1616724 + y ) * y;\n\tfloat v = a / b;\n\tfloat theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;\n\treturn cross( v1, v2 ) * theta_sintheta;\n}\nvec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {\n\tvec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];\n\tvec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];\n\tvec3 lightNormal = cross( v1, v2 );\n\tif( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );\n\tvec3 T1, T2;\n\tT1 = normalize( V - N * dot( V, N ) );\n\tT2 = - cross( N, T1 );\n\tmat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );\n\tvec3 coords[ 4 ];\n\tcoords[ 0 ] = mat * ( rectCoords[ 0 ] - P );\n\tcoords[ 1 ] = mat * ( rectCoords[ 1 ] - P );\n\tcoords[ 2 ] = mat * ( rectCoords[ 2 ] - P );\n\tcoords[ 3 ] = mat * ( rectCoords[ 3 ] - P );\n\tcoords[ 0 ] = normalize( coords[ 0 ] );\n\tcoords[ 1 ] = normalize( coords[ 1 ] );\n\tcoords[ 2 ] = normalize( coords[ 2 ] );\n\tcoords[ 3 ] = normalize( coords[ 3 ] );\n\tvec3 vectorFormFactor = vec3( 0.0 );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );\n\tfloat result = LTC_ClippedSphereFormFactor( vectorFormFactor );\n\treturn vec3( result );\n}\nfloat G_BlinnPhong_Implicit( ) {\n\treturn 0.25;\n}\nfloat D_BlinnPhong( const in float shininess, const in float dotNH ) {\n\treturn RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );\n}\nvec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {\n\tvec3 halfDir = normalize( lightDir + viewDir );\n\tfloat dotNH = saturate( dot( normal, halfDir ) );\n\tfloat dotVH = saturate( dot( viewDir, halfDir ) );\n\tvec3 F = F_Schlick( specularColor, 1.0, dotVH );\n\tfloat G = G_BlinnPhong_Implicit( );\n\tfloat D = D_BlinnPhong( shininess, dotNH );\n\treturn F * ( G * D );\n}\n#if defined( USE_SHEEN )\nfloat D_Charlie( float roughness, float dotNH ) {\n\tfloat alpha = pow2( roughness );\n\tfloat invAlpha = 1.0 / alpha;\n\tfloat cos2h = dotNH * dotNH;\n\tfloat sin2h = max( 1.0 - cos2h, 0.0078125 );\n\treturn ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );\n}\nfloat V_Neubelt( float dotNV, float dotNL ) {\n\treturn saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );\n}\nvec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {\n\tvec3 halfDir = normalize( lightDir + viewDir );\n\tfloat dotNL = saturate( dot( normal, lightDir ) );\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\tfloat dotNH = saturate( dot( normal, halfDir ) );\n\tfloat D = D_Charlie( sheenRoughness, dotNH );\n\tfloat V = V_Neubelt( dotNV, dotNL );\n\treturn sheenColor * ( D * V );\n}\n#endif",

        bumpmap_pars_fragment: "#ifdef USE_BUMPMAP\n\tuniform sampler2D bumpMap;\n\tuniform float bumpScale;\n\tvec2 dHdxy_fwd() {\n\t\tvec2 dSTdx = dFdx( vUv );\n\t\tvec2 dSTdy = dFdy( vUv );\n\t\tfloat Hll = bumpScale * texture2D( bumpMap, vUv ).x;\n\t\tfloat dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;\n\t\tfloat dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;\n\t\treturn vec2( dBx, dBy );\n\t}\n\tvec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {\n\t\tvec3 vSigmaX = dFdx( surf_pos.xyz );\n\t\tvec3 vSigmaY = dFdy( surf_pos.xyz );\n\t\tvec3 vN = surf_norm;\n\t\tvec3 R1 = cross( vSigmaY, vN );\n\t\tvec3 R2 = cross( vN, vSigmaX );\n\t\tfloat fDet = dot( vSigmaX, R1 ) * faceDirection;\n\t\tvec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\n\t\treturn normalize( abs( fDet ) * surf_norm - vGrad );\n\t}\n#endif",

// CLIPPING PLANES
        clipping_planes_fragment: "#if NUM_CLIPPING_PLANES > 0\n\tvec4 plane;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {\n\t\tplane = clippingPlanes[ i ];\n\t\tif ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;\n\t}\n\t#pragma unroll_loop_end\n\t#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES\n\t\tbool clipped = true;\n\t\t#pragma unroll_loop_start\n\t\tfor ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {\n\t\t\tplane = clippingPlanes[ i ];\n\t\t\tclipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;\n\t\t}\n\t\t#pragma unroll_loop_end\n\t\tif ( clipped ) discard;\n\t#endif\n#endif",

        clipping_planes_pars_fragment: "#if NUM_CLIPPING_PLANES > 0\n\tvarying vec3 vClipPosition;\n\tuniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];\n#endif",

        clipping_planes_pars_vertex: "#if NUM_CLIPPING_PLANES > 0\n\tvarying vec3 vClipPosition;\n#endif",

        clipping_planes_vertex: "#if NUM_CLIPPING_PLANES > 0\n\tvClipPosition = - mvPosition.xyz;\n#endif",

// COLOR
        color_fragment: "#if defined( USE_COLOR_ALPHA )\n\tdiffuseColor *= vColor;\n#elif defined( USE_COLOR )\n\tdiffuseColor.rgb *= vColor;\n#endif",

        color_pars_fragment: "#if defined( USE_COLOR_ALPHA )\n\tvarying vec4 vColor;\n#elif defined( USE_COLOR )\n\tvarying vec3 vColor;\n#endif",

        color_pars_vertex: "#if defined( USE_COLOR_ALPHA )\n\tvarying vec4 vColor;\n#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )\n\tvarying vec3 vColor;\n#endif",

        color_vertex: "#if defined( USE_COLOR_ALPHA )\n\tvColor = vec4( 1.0 );\n#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )\n\tvColor = vec3( 1.0 );\n#endif\n#ifdef USE_COLOR\n\tvColor *= color;\n#endif\n#ifdef USE_INSTANCING_COLOR\n\tvColor.xyz *= instanceColor.xyz;\n#endif",

// ??
        common: "#define PI 3.141592653589793\n#define PI2 6.283185307179586\n#define PI_HALF 1.5707963267948966\n#define RECIPROCAL_PI 0.3183098861837907\n#define RECIPROCAL_PI2 0.15915494309189535\n#define EPSILON 1e-6\n#ifndef saturate\n#define saturate( a ) clamp( a, 0.0, 1.0 )\n#endif\n#define whiteComplement( a ) ( 1.0 - saturate( a ) )\nfloat pow2( const in float x ) { return x*x; }\nvec3 pow2( const in vec3 x ) { return x*x; }\nfloat pow3( const in float x ) { return x*x*x; }\nfloat pow4( const in float x ) { float x2 = x*x; return x2*x2; }\nfloat max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }\nfloat average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }\nhighp float rand( const in vec2 uv ) {\n\tconst highp float a = 12.9898, b = 78.233, c = 43758.5453;\n\thighp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );\n\treturn fract( sin( sn ) * c );\n}\n#ifdef HIGH_PRECISION\n\tfloat precisionSafeLength( vec3 v ) { return length( v ); }\n#else\n\tfloat precisionSafeLength( vec3 v ) {\n\t\tfloat maxComponent = max3( abs( v ) );\n\t\treturn length( v / maxComponent ) * maxComponent;\n\t}\n#endif\nstruct IncidentLight {\n\tvec3 color;\n\tvec3 direction;\n\tbool visible;\n};\nstruct ReflectedLight {\n\tvec3 directDiffuse;\n\tvec3 directSpecular;\n\tvec3 indirectDiffuse;\n\tvec3 indirectSpecular;\n};\nstruct GeometricContext {\n\tvec3 position;\n\tvec3 normal;\n\tvec3 viewDir;\n#ifdef USE_CLEARCOAT\n\tvec3 clearcoatNormal;\n#endif\n};\nvec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n\treturn normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n}\nvec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {\n\treturn normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );\n}\nmat3 transposeMat3( const in mat3 m ) {\n\tmat3 tmp;\n\ttmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );\n\ttmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );\n\ttmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );\n\treturn tmp;\n}\nfloat luminance( const in vec3 rgb ) {\n\tconst vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );\n\treturn dot( weights, rgb );\n}\nbool isPerspectiveMatrix( mat4 m ) {\n\treturn m[ 2 ][ 3 ] == - 1.0;\n}\nvec2 equirectUv( in vec3 dir ) {\n\tfloat u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;\n\tfloat v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n\treturn vec2( u, v );\n}",

        defaultnormal_vertex: "vec3 transformedNormal = objectNormal;\n#ifdef USE_INSTANCING\n\tmat3 m = mat3( instanceMatrix );\n\ttransformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );\n\ttransformedNormal = m * transformedNormal;\n#endif\ntransformedNormal = normalMatrix * transformedNormal;\n#ifdef FLIP_SIDED\n\ttransformedNormal = - transformedNormal;\n#endif\n#ifdef USE_TANGENT\n\tvec3 transformedTangent = ( modelViewMatrix * vec4( objectTangent, 0.0 ) ).xyz;\n\t#ifdef FLIP_SIDED\n\t\ttransformedTangent = - transformedTangent;\n\t#endif\n#endif",

// DISPLACEMENTMAP
        displacementmap_pars_vertex: "#ifdef USE_DISPLACEMENTMAP\n\tuniform sampler2D displacementMap;\n\tuniform float displacementScale;\n\tuniform float displacementBias;\n#endif",

        displacementmap_vertex: "#ifdef USE_DISPLACEMENTMAP\n\ttransformed += normalize( objectNormal ) * ( texture2D( displacementMap, vUv ).x * displacementScale + displacementBias );\n#endif",

// EMISSIVEMAP
        emissivemap_fragment: "#ifdef USE_EMISSIVEMAP\n\tvec4 emissiveColor = texture2D( emissiveMap, vUv );\n\ttotalEmissiveRadiance *= emissiveColor.rgb;\n#endif",

        emissivemap_pars_fragment: "#ifdef USE_EMISSIVEMAP\n\tuniform sampler2D emissiveMap;\n#endif",

// ??
        encodings_fragment: "gl_FragColor = linearToOutputTexel( gl_FragColor );",

        encodings_pars_fragment: "vec4 LinearToLinear( in vec4 value ) {\n\treturn value;\n}\nvec4 LinearTosRGB( in vec4 value ) {\n\treturn vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );\n}",

// ENVIRONMENTMAP
        envmap_fragment: "#ifdef USE_ENVMAP\n\t#ifdef ENV_WORLDPOS\n\t\tvec3 cameraToFrag;\n\t\tif ( isOrthographic ) {\n\t\t\tcameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );\n\t\t} else {\n\t\t\tcameraToFrag = normalize( vWorldPosition - cameraPosition );\n\t\t}\n\t\tvec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvec3 reflectVec = reflect( cameraToFrag, worldNormal );\n\t\t#else\n\t\t\tvec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );\n\t\t#endif\n\t#else\n\t\tvec3 reflectVec = vReflect;\n\t#endif\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tvec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\t\tvec4 envColor = textureCubeUV( envMap, reflectVec, 0.0 );\n\t#else\n\t\tvec4 envColor = vec4( 0.0 );\n\t#endif\n\t#ifdef ENVMAP_BLENDING_MULTIPLY\n\t\toutgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );\n\t#elif defined( ENVMAP_BLENDING_MIX )\n\t\toutgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );\n\t#elif defined( ENVMAP_BLENDING_ADD )\n\t\toutgoingLight += envColor.xyz * specularStrength * reflectivity;\n\t#endif\n#endif",

        envmap_common_pars_fragment: "#ifdef USE_ENVMAP\n\tuniform float envMapIntensity;\n\tuniform float flipEnvMap;\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tuniform samplerCube envMap;\n\t#else\n\t\tuniform sampler2D envMap;\n\t#endif\n\t\n#endif",

        envmap_pars_fragment: "#ifdef USE_ENVMAP\n\tuniform float reflectivity;\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )\n\t\t#define ENV_WORLDPOS\n\t#endif\n\t#ifdef ENV_WORLDPOS\n\t\tvarying vec3 vWorldPosition;\n\t\tuniform float refractionRatio;\n\t#else\n\t\tvarying vec3 vReflect;\n\t#endif\n#endif",

        envmap_pars_vertex: "#ifdef USE_ENVMAP\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )\n\t\t#define ENV_WORLDPOS\n\t#endif\n\t#ifdef ENV_WORLDPOS\n\t\t\n\t\tvarying vec3 vWorldPosition;\n\t#else\n\t\tvarying vec3 vReflect;\n\t\tuniform float refractionRatio;\n\t#endif\n#endif",

        envmap_physical_pars_fragment: "#if defined( USE_ENVMAP )\n\tvec3 getIBLIrradiance( const in vec3 normal ) {\n\t\t#if defined( ENVMAP_TYPE_CUBE_UV )\n\t\t\tvec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n\t\t\tvec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );\n\t\t\treturn PI * envMapColor.rgb * envMapIntensity;\n\t\t#else\n\t\t\treturn vec3( 0.0 );\n\t\t#endif\n\t}\n\tvec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {\n\t\t#if defined( ENVMAP_TYPE_CUBE_UV )\n\t\t\tvec3 reflectVec = reflect( - viewDir, normal );\n\t\t\treflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );\n\t\t\treflectVec = inverseTransformDirection( reflectVec, viewMatrix );\n\t\t\tvec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );\n\t\t\treturn envMapColor.rgb * envMapIntensity;\n\t\t#else\n\t\t\treturn vec3( 0.0 );\n\t\t#endif\n\t}\n#endif",

        envmap_vertex: "#ifdef USE_ENVMAP\n\t#ifdef ENV_WORLDPOS\n\t\tvWorldPosition = worldPosition.xyz;\n\t#else\n\t\tvec3 cameraToVertex;\n\t\tif ( isOrthographic ) {\n\t\t\tcameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );\n\t\t} else {\n\t\t\tcameraToVertex = normalize( worldPosition.xyz - cameraPosition );\n\t\t}\n\t\tvec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvReflect = reflect( cameraToVertex, worldNormal );\n\t\t#else\n\t\t\tvReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n\t\t#endif\n\t#endif\n#endif",

// FOG
        fog_vertex: "#ifdef USE_FOG\n\tvFogDepth = - mvPosition.z;\n#endif",

        fog_pars_vertex: "#ifdef USE_FOG\n\tvarying float vFogDepth;\n#endif",

        fog_fragment: "#ifdef USE_FOG\n\t#ifdef FOG_EXP2\n\t\tfloat fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );\n\t#else\n\t\tfloat fogFactor = smoothstep( fogNear, fogFar, vFogDepth );\n\t#endif\n\tgl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );\n#endif",

        fog_pars_fragment: "#ifdef USE_FOG\n\tuniform vec3 fogColor;\n\tvarying float vFogDepth;\n\t#ifdef FOG_EXP2\n\t\tuniform float fogDensity;\n\t#else\n\t\tuniform float fogNear;\n\t\tuniform float fogFar;\n\t#endif\n#endif",

// LIGHT
        lightmap_fragment: "#ifdef USE_LIGHTMAP\n\tvec4 lightMapTexel = texture2D( lightMap, vUv2 );\n\tvec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;\n\treflectedLight.indirectDiffuse += lightMapIrradiance;\n#endif",

        lightmap_pars_fragment: "#ifdef USE_LIGHTMAP\n\tuniform sampler2D lightMap;\n\tuniform float lightMapIntensity;\n#endif",

        lights_lambert_fragment: "LambertMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularStrength = specularStrength;",

        lights_lambert_pars_fragment: "varying vec3 vViewPosition;\nstruct LambertMaterial {\n\tvec3 diffuseColor;\n\tfloat specularStrength;\n};\nvoid RE_Direct_Lambert( const in IncidentLight directLight, const in GeometricContext geometry, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {\n\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\tvec3 irradiance = dotNL * directLight.color;\n\treflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in GeometricContext geometry, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\n#define RE_Direct\t\t\t\tRE_Direct_Lambert\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_Lambert\n#define Material_LightProbeLOD( material )\t(0)",

        lights_pars_begin: "uniform bool receiveShadow;\nuniform vec3 ambientLightColor;\nuniform vec3 lightProbe[ 9 ];\nvec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {\n\tfloat x = normal.x, y = normal.y, z = normal.z;\n\tvec3 result = shCoefficients[ 0 ] * 0.886227;\n\tresult += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;\n\tresult += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;\n\tresult += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;\n\tresult += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;\n\tresult += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;\n\tresult += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );\n\tresult += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;\n\tresult += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );\n\treturn result;\n}\nvec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {\n\tvec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n\tvec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );\n\treturn irradiance;\n}\nvec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {\n\tvec3 irradiance = ambientLightColor;\n\treturn irradiance;\n}\nfloat getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {\n\t#if defined ( PHYSICALLY_CORRECT_LIGHTS )\n\t\tfloat distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );\n\t\tif ( cutoffDistance > 0.0 ) {\n\t\t\tdistanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );\n\t\t}\n\t\treturn distanceFalloff;\n\t#else\n\t\tif ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {\n\t\t\treturn pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );\n\t\t}\n\t\treturn 1.0;\n\t#endif\n}\nfloat getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {\n\treturn smoothstep( coneCosine, penumbraCosine, angleCosine );\n}\n#if NUM_DIR_LIGHTS > 0\n\tstruct DirectionalLight {\n\t\tvec3 direction;\n\t\tvec3 color;\n\t};\n\tuniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];\n\tvoid getDirectionalLightInfo( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight light ) {\n\t\tlight.color = directionalLight.color;\n\t\tlight.direction = directionalLight.direction;\n\t\tlight.visible = true;\n\t}\n#endif\n#if NUM_POINT_LIGHTS > 0\n\tstruct PointLight {\n\t\tvec3 position;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t};\n\tuniform PointLight pointLights[ NUM_POINT_LIGHTS ];\n\tvoid getPointLightInfo( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight light ) {\n\t\tvec3 lVector = pointLight.position - geometry.position;\n\t\tlight.direction = normalize( lVector );\n\t\tfloat lightDistance = length( lVector );\n\t\tlight.color = pointLight.color;\n\t\tlight.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );\n\t\tlight.visible = ( light.color != vec3( 0.0 ) );\n\t}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\tstruct SpotLight {\n\t\tvec3 position;\n\t\tvec3 direction;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t\tfloat coneCos;\n\t\tfloat penumbraCos;\n\t};\n\tuniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];\n\tvoid getSpotLightInfo( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight light ) {\n\t\tvec3 lVector = spotLight.position - geometry.position;\n\t\tlight.direction = normalize( lVector );\n\t\tfloat angleCos = dot( light.direction, spotLight.direction );\n\t\tfloat spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );\n\t\tif ( spotAttenuation > 0.0 ) {\n\t\t\tfloat lightDistance = length( lVector );\n\t\t\tlight.color = spotLight.color * spotAttenuation;\n\t\t\tlight.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );\n\t\t\tlight.visible = ( light.color != vec3( 0.0 ) );\n\t\t} else {\n\t\t\tlight.color = vec3( 0.0 );\n\t\t\tlight.visible = false;\n\t\t}\n\t}\n#endif\n#if NUM_RECT_AREA_LIGHTS > 0\n\tstruct RectAreaLight {\n\t\tvec3 color;\n\t\tvec3 position;\n\t\tvec3 halfWidth;\n\t\tvec3 halfHeight;\n\t};\n\tuniform sampler2D ltc_1;\tuniform sampler2D ltc_2;\n\tuniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];\n#endif\n#if NUM_HEMI_LIGHTS > 0\n\tstruct HemisphereLight {\n\t\tvec3 direction;\n\t\tvec3 skyColor;\n\t\tvec3 groundColor;\n\t};\n\tuniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];\n\tvec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {\n\t\tfloat dotNL = dot( normal, hemiLight.direction );\n\t\tfloat hemiDiffuseWeight = 0.5 * dotNL + 0.5;\n\t\tvec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );\n\t\treturn irradiance;\n\t}\n#endif",

        lights_phong_fragment: "BlinnPhongMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularColor = specular;\nmaterial.specularShininess = shininess;\nmaterial.specularStrength = specularStrength;",

        lights_phong_pars_fragment: "varying vec3 vViewPosition;\nstruct BlinnPhongMaterial {\n\tvec3 diffuseColor;\n\tvec3 specularColor;\n\tfloat specularShininess;\n\tfloat specularStrength;\n};\nvoid RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\tvec3 irradiance = dotNL * directLight.color;\n\treflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n\treflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularShininess ) * material.specularStrength;\n}\nvoid RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\n#define RE_Direct\t\t\t\tRE_Direct_BlinnPhong\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_BlinnPhong\n#define Material_LightProbeLOD( material )\t(0)",

        lights_physical_fragment: "PhysicalMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );\nvec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );\nfloat geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );\nmaterial.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;\nmaterial.roughness = min( material.roughness, 1.0 );\n#ifdef IOR\n\tmaterial.ior = ior;\n\t#ifdef SPECULAR\n\t\tfloat specularIntensityFactor = specularIntensity;\n\t\tvec3 specularColorFactor = specularColor;\n\t\t#ifdef USE_SPECULARINTENSITYMAP\n\t\t\tspecularIntensityFactor *= texture2D( specularIntensityMap, vUv ).a;\n\t\t#endif\n\t\t#ifdef USE_SPECULARCOLORMAP\n\t\t\tspecularColorFactor *= texture2D( specularColorMap, vUv ).rgb;\n\t\t#endif\n\t\tmaterial.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );\n\t#else\n\t\tfloat specularIntensityFactor = 1.0;\n\t\tvec3 specularColorFactor = vec3( 1.0 );\n\t\tmaterial.specularF90 = 1.0;\n\t#endif\n\tmaterial.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );\n#else\n\tmaterial.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );\n\tmaterial.specularF90 = 1.0;\n#endif\n#ifdef USE_CLEARCOAT\n\tmaterial.clearcoat = clearcoat;\n\tmaterial.clearcoatRoughness = clearcoatRoughness;\n\tmaterial.clearcoatF0 = vec3( 0.04 );\n\tmaterial.clearcoatF90 = 1.0;\n\t#ifdef USE_CLEARCOATMAP\n\t\tmaterial.clearcoat *= texture2D( clearcoatMap, vUv ).x;\n\t#endif\n\t#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\t\tmaterial.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vUv ).y;\n\t#endif\n\tmaterial.clearcoat = saturate( material.clearcoat );\tmaterial.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );\n\tmaterial.clearcoatRoughness += geometryRoughness;\n\tmaterial.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );\n#endif\n#ifdef USE_IRIDESCENCE\n\tmaterial.iridescence = iridescence;\n\tmaterial.iridescenceIOR = iridescenceIOR;\n\t#ifdef USE_IRIDESCENCEMAP\n\t\tmaterial.iridescence *= texture2D( iridescenceMap, vUv ).r;\n\t#endif\n\t#ifdef USE_IRIDESCENCE_THICKNESSMAP\n\t\tmaterial.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vUv ).g + iridescenceThicknessMinimum;\n\t#else\n\t\tmaterial.iridescenceThickness = iridescenceThicknessMaximum;\n\t#endif\n#endif\n#ifdef USE_SHEEN\n\tmaterial.sheenColor = sheenColor;\n\t#ifdef USE_SHEENCOLORMAP\n\t\tmaterial.sheenColor *= texture2D( sheenColorMap, vUv ).rgb;\n\t#endif\n\tmaterial.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );\n\t#ifdef USE_SHEENROUGHNESSMAP\n\t\tmaterial.sheenRoughness *= texture2D( sheenRoughnessMap, vUv ).a;\n\t#endif\n#endif",

        lights_physical_pars_fragment: "struct PhysicalMaterial {\n\tvec3 diffuseColor;\n\tfloat roughness;\n\tvec3 specularColor;\n\tfloat specularF90;\n\t#ifdef USE_CLEARCOAT\n\t\tfloat clearcoat;\n\t\tfloat clearcoatRoughness;\n\t\tvec3 clearcoatF0;\n\t\tfloat clearcoatF90;\n\t#endif\n\t#ifdef USE_IRIDESCENCE\n\t\tfloat iridescence;\n\t\tfloat iridescenceIOR;\n\t\tfloat iridescenceThickness;\n\t\tvec3 iridescenceFresnel;\n\t\tvec3 iridescenceF0;\n\t#endif\n\t#ifdef USE_SHEEN\n\t\tvec3 sheenColor;\n\t\tfloat sheenRoughness;\n\t#endif\n\t#ifdef IOR\n\t\tfloat ior;\n\t#endif\n\t#ifdef USE_TRANSMISSION\n\t\tfloat transmission;\n\t\tfloat transmissionAlpha;\n\t\tfloat thickness;\n\t\tfloat attenuationDistance;\n\t\tvec3 attenuationColor;\n\t#endif\n};\nvec3 clearcoatSpecular = vec3( 0.0 );\nvec3 sheenSpecular = vec3( 0.0 );\nfloat IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\tfloat r2 = roughness * roughness;\n\tfloat a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;\n\tfloat b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;\n\tfloat DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );\n\treturn saturate( DG * RECIPROCAL_PI );\n}\nvec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\tconst vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );\n\tconst vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );\n\tvec4 r = roughness * c0 + c1;\n\tfloat a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;\n\tvec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;\n\treturn fab;\n}\nvec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {\n\tvec2 fab = DFGApprox( normal, viewDir, roughness );\n\treturn specularColor * fab.x + specularF90 * fab.y;\n}\n#ifdef USE_IRIDESCENCE\nvoid computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {\n#else\nvoid computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {\n#endif\n\tvec2 fab = DFGApprox( normal, viewDir, roughness );\n\t#ifdef USE_IRIDESCENCE\n\t\tvec3 Fr = mix( specularColor, iridescenceF0, iridescence );\n\t#else\n\t\tvec3 Fr = specularColor;\n\t#endif\n\tvec3 FssEss = Fr * fab.x + specularF90 * fab.y;\n\tfloat Ess = fab.x + fab.y;\n\tfloat Ems = 1.0 - Ess;\n\tvec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;\tvec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );\n\tsingleScatter += FssEss;\n\tmultiScatter += Fms * Ems;\n}\n#if NUM_RECT_AREA_LIGHTS > 0\n\tvoid RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\t\tvec3 normal = geometry.normal;\n\t\tvec3 viewDir = geometry.viewDir;\n\t\tvec3 position = geometry.position;\n\t\tvec3 lightPos = rectAreaLight.position;\n\t\tvec3 halfWidth = rectAreaLight.halfWidth;\n\t\tvec3 halfHeight = rectAreaLight.halfHeight;\n\t\tvec3 lightColor = rectAreaLight.color;\n\t\tfloat roughness = material.roughness;\n\t\tvec3 rectCoords[ 4 ];\n\t\trectCoords[ 0 ] = lightPos + halfWidth - halfHeight;\t\trectCoords[ 1 ] = lightPos - halfWidth - halfHeight;\n\t\trectCoords[ 2 ] = lightPos - halfWidth + halfHeight;\n\t\trectCoords[ 3 ] = lightPos + halfWidth + halfHeight;\n\t\tvec2 uv = LTC_Uv( normal, viewDir, roughness );\n\t\tvec4 t1 = texture2D( ltc_1, uv );\n\t\tvec4 t2 = texture2D( ltc_2, uv );\n\t\tmat3 mInv = mat3(\n\t\t\tvec3( t1.x, 0, t1.y ),\n\t\t\tvec3(\t\t0, 1,\t\t0 ),\n\t\t\tvec3( t1.z, 0, t1.w )\n\t\t);\n\t\tvec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );\n\t\treflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );\n\t\treflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );\n\t}\n#endif\nvoid RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\tvec3 irradiance = dotNL * directLight.color;\n\t#ifdef USE_CLEARCOAT\n\t\tfloat dotNLcc = saturate( dot( geometry.clearcoatNormal, directLight.direction ) );\n\t\tvec3 ccIrradiance = dotNLcc * directLight.color;\n\t\tclearcoatSpecular += ccIrradiance * BRDF_GGX( directLight.direction, geometry.viewDir, geometry.clearcoatNormal, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );\n\t#endif\n\t#ifdef USE_SHEEN\n\t\tsheenSpecular += irradiance * BRDF_Sheen( directLight.direction, geometry.viewDir, geometry.normal, material.sheenColor, material.sheenRoughness );\n\t#endif\n\t#ifdef USE_IRIDESCENCE\n\t\treflectedLight.directSpecular += irradiance * BRDF_GGX_Iridescence( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness );\n\t#else\n\t\treflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularF90, material.roughness );\n\t#endif\n\treflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {\n\t#ifdef USE_CLEARCOAT\n\t\tclearcoatSpecular += clearcoatRadiance * EnvironmentBRDF( geometry.clearcoatNormal, geometry.viewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );\n\t#endif\n\t#ifdef USE_SHEEN\n\t\tsheenSpecular += irradiance * material.sheenColor * IBLSheenBRDF( geometry.normal, geometry.viewDir, material.sheenRoughness );\n\t#endif\n\tvec3 singleScattering = vec3( 0.0 );\n\tvec3 multiScattering = vec3( 0.0 );\n\tvec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;\n\t#ifdef USE_IRIDESCENCE\n\t\tcomputeMultiscatteringIridescence( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );\n\t#else\n\t\tcomputeMultiscattering( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );\n\t#endif\n\tvec3 totalScattering = singleScattering + multiScattering;\n\tvec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );\n\treflectedLight.indirectSpecular += radiance * singleScattering;\n\treflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;\n\treflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;\n}\n#define RE_Direct\t\t\t\tRE_Direct_Physical\n#define RE_Direct_RectArea\t\tRE_Direct_RectArea_Physical\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_Physical\n#define RE_IndirectSpecular\t\tRE_IndirectSpecular_Physical\nfloat computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {\n\treturn saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );\n}",

        lights_fragment_begin: "\nGeometricContext geometry;\ngeometry.position = - vViewPosition;\ngeometry.normal = normal;\ngeometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );\n#ifdef USE_CLEARCOAT\n\tgeometry.clearcoatNormal = clearcoatNormal;\n#endif\n#ifdef USE_IRIDESCENCE\n\tfloat dotNVi = saturate( dot( normal, geometry.viewDir ) );\n\tif ( material.iridescenceThickness == 0.0 ) {\n\t\tmaterial.iridescence = 0.0;\n\t} else {\n\t\tmaterial.iridescence = saturate( material.iridescence );\n\t}\n\tif ( material.iridescence > 0.0 ) {\n\t\tmaterial.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );\n\t\tmaterial.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );\n\t}\n#endif\nIncidentLight directLight;\n#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )\n\tPointLight pointLight;\n\t#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0\n\tPointLightShadow pointLightShadow;\n\t#endif\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tpointLight = pointLights[ i ];\n\t\tgetPointLightInfo( pointLight, geometry, directLight );\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )\n\t\tpointLightShadow = pointLightShadows[ i ];\n\t\tdirectLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )\n\tSpotLight spotLight;\n\t#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0\n\tSpotLightShadow spotLightShadow;\n\t#endif\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tspotLight = spotLights[ i ];\n\t\tgetSpotLightInfo( spotLight, geometry, directLight );\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n\t\tspotLightShadow = spotLightShadows[ i ];\n\t\tdirectLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )\n\tDirectionalLight directionalLight;\n\t#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0\n\tDirectionalLightShadow directionalLightShadow;\n\t#endif\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tdirectionalLight = directionalLights[ i ];\n\t\tgetDirectionalLightInfo( directionalLight, geometry, directLight );\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )\n\t\tdirectionalLightShadow = directionalLightShadows[ i ];\n\t\tdirectLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )\n\tRectAreaLight rectAreaLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {\n\t\trectAreaLight = rectAreaLights[ i ];\n\t\tRE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if defined( RE_IndirectDiffuse )\n\tvec3 iblIrradiance = vec3( 0.0 );\n\tvec3 irradiance = getAmbientLightIrradiance( ambientLightColor );\n\tirradiance += getLightProbeIrradiance( lightProbe, geometry.normal );\n\t#if ( NUM_HEMI_LIGHTS > 0 )\n\t\t#pragma unroll_loop_start\n\t\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\t\t\tirradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry.normal );\n\t\t}\n\t\t#pragma unroll_loop_end\n\t#endif\n#endif\n#if defined( RE_IndirectSpecular )\n\tvec3 radiance = vec3( 0.0 );\n\tvec3 clearcoatRadiance = vec3( 0.0 );\n#endif",

        lights_fragment_maps: "#if defined( RE_IndirectDiffuse )\n\t#ifdef USE_LIGHTMAP\n\t\tvec4 lightMapTexel = texture2D( lightMap, vUv2 );\n\t\tvec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;\n\t\tirradiance += lightMapIrradiance;\n\t#endif\n\t#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )\n\t\tiblIrradiance += getIBLIrradiance( geometry.normal );\n\t#endif\n#endif\n#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )\n\tradiance += getIBLRadiance( geometry.viewDir, geometry.normal, material.roughness );\n\t#ifdef USE_CLEARCOAT\n\t\tclearcoatRadiance += getIBLRadiance( geometry.viewDir, geometry.clearcoatNormal, material.clearcoatRoughness );\n\t#endif\n#endif",

        lights_fragment_end: "#if defined( RE_IndirectDiffuse )\n\tRE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );\n#endif\n#if defined( RE_IndirectSpecular )\n\tRE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometry, material, reflectedLight );\n#endif",

// LOGARITHMIC DEPTH BUFFER
        logdepthbuf_fragment: "#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )\n\tgl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;\n#endif",

        logdepthbuf_pars_fragment: "#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )\n\tuniform float logDepthBufFC;\n\tvarying float vFragDepth;\n\tvarying float vIsPerspective;\n#endif",

        logdepthbuf_pars_vertex: "#ifdef USE_LOGDEPTHBUF\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvarying float vFragDepth;\n\t\tvarying float vIsPerspective;\n\t#else\n\t\tuniform float logDepthBufFC;\n\t#endif\n#endif",

        logdepthbuf_vertex: "#ifdef USE_LOGDEPTHBUF\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvFragDepth = 1.0 + gl_Position.w;\n\t\tvIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );\n\t#else\n\t\tif ( isPerspectiveMatrix( projectionMatrix ) ) {\n\t\t\tgl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;\n\t\t\tgl_Position.z *= gl_Position.w;\n\t\t}\n\t#endif\n#endif",

// MAP
        map_fragment: "#ifdef USE_MAP\n\tvec4 sampledDiffuseColor = texture2D( map, vUv );\n\t#ifdef DECODE_VIDEO_TEXTURE\n\t\tsampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );\n\t#endif\n\tdiffuseColor *= sampledDiffuseColor;\n#endif",

        map_pars_fragment: "#ifdef USE_MAP\n\tuniform sampler2D map;\n#endif",

        map_particle_fragment: "#if defined( USE_MAP ) || defined( USE_ALPHAMAP )\n\tvec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;\n#endif\n#ifdef USE_MAP\n\tdiffuseColor *= texture2D( map, uv );\n#endif\n#ifdef USE_ALPHAMAP\n\tdiffuseColor.a *= texture2D( alphaMap, uv ).g;\n#endif",

        map_particle_pars_fragment: "#if defined( USE_MAP ) || defined( USE_ALPHAMAP )\n\tuniform mat3 uvTransform;\n#endif\n#ifdef USE_MAP\n\tuniform sampler2D map;\n#endif\n#ifdef USE_ALPHAMAP\n\tuniform sampler2D alphaMap;\n#endif",

// MORPHCOLOR
        morphcolor_vertex: "#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )\n\tvColor *= morphTargetBaseInfluence;\n\tfor ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n\t\t#if defined( USE_COLOR_ALPHA )\n\t\t\tif ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];\n\t\t#elif defined( USE_COLOR )\n\t\t\tif ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];\n\t\t#endif\n\t}\n#endif",

        morphnormal_vertex: "#ifdef USE_MORPHNORMALS\n\tobjectNormal *= morphTargetBaseInfluence;\n\t#ifdef MORPHTARGETS_TEXTURE\n\t\tfor ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n\t\t\tif ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];\n\t\t}\n\t#else\n\t\tobjectNormal += morphNormal0 * morphTargetInfluences[ 0 ];\n\t\tobjectNormal += morphNormal1 * morphTargetInfluences[ 1 ];\n\t\tobjectNormal += morphNormal2 * morphTargetInfluences[ 2 ];\n\t\tobjectNormal += morphNormal3 * morphTargetInfluences[ 3 ];\n\t#endif\n#endif",

// MORPHTARGET
        morphtarget_pars_vertex: "#ifdef USE_MORPHTARGETS\n\tuniform float morphTargetBaseInfluence;\n\t#ifdef MORPHTARGETS_TEXTURE\n\t\tuniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];\n\t\tuniform sampler2DArray morphTargetsTexture;\n\t\tuniform ivec2 morphTargetsTextureSize;\n\t\tvec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {\n\t\t\tint texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;\n\t\t\tint y = texelIndex / morphTargetsTextureSize.x;\n\t\t\tint x = texelIndex - y * morphTargetsTextureSize.x;\n\t\t\tivec3 morphUV = ivec3( x, y, morphTargetIndex );\n\t\t\treturn texelFetch( morphTargetsTexture, morphUV, 0 );\n\t\t}\n\t#else\n\t\t#ifndef USE_MORPHNORMALS\n\t\t\tuniform float morphTargetInfluences[ 8 ];\n\t\t#else\n\t\t\tuniform float morphTargetInfluences[ 4 ];\n\t\t#endif\n\t#endif\n#endif",

        morphtarget_vertex: "#ifdef USE_MORPHTARGETS\n\ttransformed *= morphTargetBaseInfluence;\n\t#ifdef MORPHTARGETS_TEXTURE\n\t\tfor ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n\t\t\tif ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];\n\t\t}\n\t#else\n\t\ttransformed += morphTarget0 * morphTargetInfluences[ 0 ];\n\t\ttransformed += morphTarget1 * morphTargetInfluences[ 1 ];\n\t\ttransformed += morphTarget2 * morphTargetInfluences[ 2 ];\n\t\ttransformed += morphTarget3 * morphTargetInfluences[ 3 ];\n\t\t#ifndef USE_MORPHNORMALS\n\t\t\ttransformed += morphTarget4 * morphTargetInfluences[ 4 ];\n\t\t\ttransformed += morphTarget5 * morphTargetInfluences[ 5 ];\n\t\t\ttransformed += morphTarget6 * morphTargetInfluences[ 6 ];\n\t\t\ttransformed += morphTarget7 * morphTargetInfluences[ 7 ];\n\t\t#endif\n\t#endif\n#endif",

// NORMAL
        normal_fragment_begin: "float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;\n#ifdef FLAT_SHADED\n\tvec3 fdx = vec3( dFdx( vViewPosition.x ), dFdx( vViewPosition.y ), dFdx( vViewPosition.z ) );\n\tvec3 fdy = vec3( dFdy( vViewPosition.x ), dFdy( vViewPosition.y ), dFdy( vViewPosition.z ) );\n\tvec3 normal = normalize( cross( fdx, fdy ) );\n#else\n\tvec3 normal = normalize( vNormal );\n\t#ifdef DOUBLE_SIDED\n\t\tnormal = normal * faceDirection;\n\t#endif\n\t#ifdef USE_TANGENT\n\t\tvec3 tangent = normalize( vTangent );\n\t\tvec3 bitangent = normalize( vBitangent );\n\t\t#ifdef DOUBLE_SIDED\n\t\t\ttangent = tangent * faceDirection;\n\t\t\tbitangent = bitangent * faceDirection;\n\t\t#endif\n\t\t#if defined( TANGENTSPACE_NORMALMAP ) || defined( USE_CLEARCOAT_NORMALMAP )\n\t\t\tmat3 vTBN = mat3( tangent, bitangent, normal );\n\t\t#endif\n\t#endif\n#endif\nvec3 geometryNormal = normal;",

        normal_fragment_maps: "#ifdef OBJECTSPACE_NORMALMAP\n\tnormal = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n\t#ifdef FLIP_SIDED\n\t\tnormal = - normal;\n\t#endif\n\t#ifdef DOUBLE_SIDED\n\t\tnormal = normal * faceDirection;\n\t#endif\n\tnormal = normalize( normalMatrix * normal );\n#elif defined( TANGENTSPACE_NORMALMAP )\n\tvec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n\tmapN.xy *= normalScale;\n\t#ifdef USE_TANGENT\n\t\tnormal = normalize( vTBN * mapN );\n\t#else\n\t\tnormal = perturbNormal2Arb( - vViewPosition, normal, mapN, faceDirection );\n\t#endif\n#elif defined( USE_BUMPMAP )\n\tnormal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );\n#endif",

        normal_pars_fragment: "#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n\t#ifdef USE_TANGENT\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\t#endif\n#endif",

        normal_pars_vertex: "#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n\t#ifdef USE_TANGENT\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\t#endif\n#endif",

        normal_vertex: "#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n\t#ifdef USE_TANGENT\n\t\tvTangent = normalize( transformedTangent );\n\t\tvBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );\n\t#endif\n#endif",

        normalmap_pars_fragment: "#ifdef USE_NORMALMAP\n\tuniform sampler2D normalMap;\n\tuniform vec2 normalScale;\n#endif\n#ifdef OBJECTSPACE_NORMALMAP\n\tuniform mat3 normalMatrix;\n#endif\n#if ! defined ( USE_TANGENT ) && ( defined ( TANGENTSPACE_NORMALMAP ) || defined ( USE_CLEARCOAT_NORMALMAP ) )\n\tvec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm, vec3 mapN, float faceDirection ) {\n\t\tvec3 q0 = dFdx( eye_pos.xyz );\n\t\tvec3 q1 = dFdy( eye_pos.xyz );\n\t\tvec2 st0 = dFdx( vUv.st );\n\t\tvec2 st1 = dFdy( vUv.st );\n\t\tvec3 N = surf_norm;\n\t\tvec3 q1perp = cross( q1, N );\n\t\tvec3 q0perp = cross( N, q0 );\n\t\tvec3 T = q1perp * st0.x + q0perp * st1.x;\n\t\tvec3 B = q1perp * st0.y + q0perp * st1.y;\n\t\tfloat det = max( dot( T, T ), dot( B, B ) );\n\t\tfloat scale = ( det == 0.0 ) ? 0.0 : faceDirection * inversesqrt( det );\n\t\treturn normalize( T * ( mapN.x * scale ) + B * ( mapN.y * scale ) + N * mapN.z );\n\t}\n#endif",

// ??
        output_fragment: "#ifdef OPAQUE\ndiffuseColor.a = 1.0;\n#endif\n#ifdef USE_TRANSMISSION\ndiffuseColor.a *= material.transmissionAlpha + 0.1;\n#endif\ngl_FragColor = vec4( outgoingLight, diffuseColor.a );",

        packing: "vec3 packNormalToRGB( const in vec3 normal ) {\n\treturn normalize( normal ) * 0.5 + 0.5;\n}\nvec3 unpackRGBToNormal( const in vec3 rgb ) {\n\treturn 2.0 * rgb.xyz - 1.0;\n}\nconst float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;\nconst vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );\nconst vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );\nconst float ShiftRight8 = 1. / 256.;\nvec4 packDepthToRGBA( const in float v ) {\n\tvec4 r = vec4( fract( v * PackFactors ), v );\n\tr.yzw -= r.xyz * ShiftRight8;\treturn r * PackUpscale;\n}\nfloat unpackRGBAToDepth( const in vec4 v ) {\n\treturn dot( v, UnpackFactors );\n}\nvec4 pack2HalfToRGBA( vec2 v ) {\n\tvec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );\n\treturn vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );\n}\nvec2 unpackRGBATo2Half( vec4 v ) {\n\treturn vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );\n}\nfloat viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn ( viewZ + near ) / ( near - far );\n}\nfloat orthographicDepthToViewZ( const in float linearClipZ, const in float near, const in float far ) {\n\treturn linearClipZ * ( near - far ) - near;\n}\nfloat viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );\n}\nfloat perspectiveDepthToViewZ( const in float invClipZ, const in float near, const in float far ) {\n\treturn ( near * far ) / ( ( far - near ) * invClipZ - far );\n}",

        premultiplied_alpha_fragment: "#ifdef PREMULTIPLIED_ALPHA\n\tgl_FragColor.rgb *= gl_FragColor.a;\n#endif",

        project_vertex: "vec4 mvPosition = vec4( transformed, 1.0 );\n#ifdef USE_INSTANCING\n\tmvPosition = instanceMatrix * mvPosition;\n#endif\nmvPosition = modelViewMatrix * mvPosition;\ngl_Position = projectionMatrix * mvPosition;",

// DITHERING
        dithering_fragment: "#ifdef DITHERING\n\tgl_FragColor.rgb = dithering( gl_FragColor.rgb );\n#endif",

        dithering_pars_fragment: "#ifdef DITHERING\n\tvec3 dithering( vec3 color ) {\n\t\tfloat grid_position = rand( gl_FragCoord.xy );\n\t\tvec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );\n\t\tdither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );\n\t\treturn color + dither_shift_RGB;\n\t}\n#endif",

// SHADOWMAP
	shadowmap_pars_fragment: "#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\t\tuniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tstruct DirectionalLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\t\tuniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\t\tuniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHT_SHADOWS ];\n\t\tstruct SpotLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\t\tuniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\t\tuniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tstruct PointLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t\tfloat shadowCameraNear;\n\t\t\tfloat shadowCameraFar;\n\t\t};\n\t\tuniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];\n\t#endif\n\tfloat texture2DCompare( sampler2D depths, vec2 uv, float compare ) {\n\t\treturn step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );\n\t}\n\tvec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {\n\t\treturn unpackRGBATo2Half( texture2D( shadow, uv ) );\n\t}\n\tfloat VSMShadow (sampler2D shadow, vec2 uv, float compare ){\n\t\tfloat occlusion = 1.0;\n\t\tvec2 distribution = texture2DDistribution( shadow, uv );\n\t\tfloat hard_shadow = step( compare , distribution.x );\n\t\tif (hard_shadow != 1.0 ) {\n\t\t\tfloat distance = compare - distribution.x ;\n\t\t\tfloat variance = max( 0.00000, distribution.y * distribution.y );\n\t\t\tfloat softness_probability = variance / (variance + distance * distance );\t\t\tsoftness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );\t\t\tocclusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );\n\t\t}\n\t\treturn occlusion;\n\t}\n\tfloat getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n\t\tfloat shadow = 1.0;\n\t\tshadowCoord.xyz /= shadowCoord.w;\n\t\tshadowCoord.z += shadowBias;\n\t\tbvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );\n\t\tbool inFrustum = all( inFrustumVec );\n\t\tbvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );\n\t\tbool frustumTest = all( frustumTestVec );\n\t\tif ( frustumTest ) {\n\t\t#if defined( SHADOWMAP_TYPE_PCF )\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\tfloat dx0 = - texelSize.x * shadowRadius;\n\t\t\tfloat dy0 = - texelSize.y * shadowRadius;\n\t\t\tfloat dx1 = + texelSize.x * shadowRadius;\n\t\t\tfloat dy1 = + texelSize.y * shadowRadius;\n\t\t\tfloat dx2 = dx0 / 2.0;\n\t\t\tfloat dy2 = dy0 / 2.0;\n\t\t\tfloat dx3 = dx1 / 2.0;\n\t\t\tfloat dy3 = dy1 / 2.0;\n\t\t\tshadow = (\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )\n\t\t\t) * ( 1.0 / 17.0 );\n\t\t#elif defined( SHADOWMAP_TYPE_PCF_SOFT )\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\tfloat dx = texelSize.x;\n\t\t\tfloat dy = texelSize.y;\n\t\t\tvec2 uv = shadowCoord.xy;\n\t\t\tvec2 f = fract( uv * shadowMapSize + 0.5 );\n\t\t\tuv -= f * texelSize;\n\t\t\tshadow = (\n\t\t\t\ttexture2DCompare( shadowMap, uv, shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ), \n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),\n\t\t\t\t\t f.x ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ), \n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),\n\t\t\t\t\t f.x ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ), \n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),\n\t\t\t\t\t f.y ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ), \n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),\n\t\t\t\t\t f.y ) +\n\t\t\t\tmix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ), \n\t\t\t\t\t\t\ttexture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),\n\t\t\t\t\t\t\tf.x ),\n\t\t\t\t\t mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ), \n\t\t\t\t\t\t\ttexture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),\n\t\t\t\t\t\t\tf.x ),\n\t\t\t\t\t f.y )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#elif defined( SHADOWMAP_TYPE_VSM )\n\t\t\tshadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );\n\t\t#else\n\t\t\tshadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );\n\t\t#endif\n\t\t}\n\t\treturn shadow;\n\t}\n\tvec2 cubeToUV( vec3 v, float texelSizeY ) {\n\t\tvec3 absV = abs( v );\n\t\tfloat scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );\n\t\tabsV *= scaleToCube;\n\t\tv *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );\n\t\tvec2 planar = v.xy;\n\t\tfloat almostATexel = 1.5 * texelSizeY;\n\t\tfloat almostOne = 1.0 - almostATexel;\n\t\tif ( absV.z >= almostOne ) {\n\t\t\tif ( v.z > 0.0 )\n\t\t\t\tplanar.x = 4.0 - v.x;\n\t\t} else if ( absV.x >= almostOne ) {\n\t\t\tfloat signX = sign( v.x );\n\t\t\tplanar.x = v.z * signX + 2.0 * signX;\n\t\t} else if ( absV.y >= almostOne ) {\n\t\t\tfloat signY = sign( v.y );\n\t\t\tplanar.x = v.x + 2.0 * signY + 2.0;\n\t\t\tplanar.y = v.z * signY - 2.0;\n\t\t}\n\t\treturn vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );\n\t}\n\tfloat getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {\n\t\tvec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );\n\t\tvec3 lightToPosition = shadowCoord.xyz;\n\t\tfloat dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );\t\tdp += shadowBias;\n\t\tvec3 bd3D = normalize( lightToPosition );\n\t\t#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )\n\t\t\tvec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;\n\t\t\treturn (\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#else\n\t\t\treturn texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );\n\t\t#endif\n\t}\n#endif",

        shadowmap_pars_vertex: "#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\t\tuniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tstruct DirectionalLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\t\tuniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\t\tuniform mat4 spotShadowMatrix[ NUM_SPOT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHT_SHADOWS ];\n\t\tstruct SpotLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\t\tuniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\t\tuniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tstruct PointLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t\tfloat shadowCameraNear;\n\t\t\tfloat shadowCameraFar;\n\t\t};\n\t\tuniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];\n\t#endif\n#endif",

        shadowmap_vertex: "#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SPOT_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0\n\t\tvec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n\t\tvec4 shadowWorldPosition;\n\t#endif\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n\t\tshadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );\n\t\tvDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {\n\t\tshadowWorldPosition = worldPosition + vec4( shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias, 0 );\n\t\tvSpotShadowCoord[ i ] = spotShadowMatrix[ i ] * shadowWorldPosition;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n\t\tshadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );\n\t\tvPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n#endif",

        shadowmask_pars_fragment: "float getShadowMask() {\n\tfloat shadow = 1.0;\n\t#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\tDirectionalLightShadow directionalLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n\t\tdirectionalLight = directionalLightShadows[ i ];\n\t\tshadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\tSpotLightShadow spotLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {\n\t\tspotLight = spotLightShadows[ i ];\n\t\tshadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\tPointLightShadow pointLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n\t\tpointLight = pointLightShadows[ i ];\n\t\tshadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#endif\n\treturn shadow;\n}",

// SKINNING
        skinbase_vertex: "#ifdef USE_SKINNING\n\tmat4 boneMatX = getBoneMatrix( skinIndex.x );\n\tmat4 boneMatY = getBoneMatrix( skinIndex.y );\n\tmat4 boneMatZ = getBoneMatrix( skinIndex.z );\n\tmat4 boneMatW = getBoneMatrix( skinIndex.w );\n#endif",

        skinning_pars_vertex: "#ifdef USE_SKINNING\n\tuniform mat4 bindMatrix;\n\tuniform mat4 bindMatrixInverse;\n\tuniform highp sampler2D boneTexture;\n\tuniform int boneTextureSize;\n\tmat4 getBoneMatrix( const in float i ) {\n\t\tfloat j = i * 4.0;\n\t\tfloat x = mod( j, float( boneTextureSize ) );\n\t\tfloat y = floor( j / float( boneTextureSize ) );\n\t\tfloat dx = 1.0 / float( boneTextureSize );\n\t\tfloat dy = 1.0 / float( boneTextureSize );\n\t\ty = dy * ( y + 0.5 );\n\t\tvec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );\n\t\tvec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );\n\t\tvec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );\n\t\tvec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );\n\t\tmat4 bone = mat4( v1, v2, v3, v4 );\n\t\treturn bone;\n\t}\n#endif",

        skinning_vertex: "#ifdef USE_SKINNING\n\tvec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );\n\tvec4 skinned = vec4( 0.0 );\n\tskinned += boneMatX * skinVertex * skinWeight.x;\n\tskinned += boneMatY * skinVertex * skinWeight.y;\n\tskinned += boneMatZ * skinVertex * skinWeight.z;\n\tskinned += boneMatW * skinVertex * skinWeight.w;\n\ttransformed = ( bindMatrixInverse * skinned ).xyz;\n#endif",

        skinnormal_vertex: "#ifdef USE_SKINNING\n\tmat4 skinMatrix = mat4( 0.0 );\n\tskinMatrix += skinWeight.x * boneMatX;\n\tskinMatrix += skinWeight.y * boneMatY;\n\tskinMatrix += skinWeight.z * boneMatZ;\n\tskinMatrix += skinWeight.w * boneMatW;\n\tskinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;\n\tobjectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;\n\t#ifdef USE_TANGENT\n\t\tobjectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;\n\t#endif\n#endif",

// SPECULAR MAP
        specularmap_fragment: "float specularStrength;\n#ifdef USE_SPECULARMAP\n\tvec4 texelSpecular = texture2D( specularMap, vUv );\n\tspecularStrength = texelSpecular.r;\n#else\n\tspecularStrength = 1.0;\n#endif",
        specularmap_pars_fragment: "#ifdef USE_SPECULARMAP\n\tuniform sampler2D specularMap;\n#endif",

// TONEMAPPING
        tonemapping_fragment: "#if defined( TONE_MAPPING )\n\tgl_FragColor.rgb = toneMapping( gl_FragColor.rgb );\n#endif",

        tonemapping_pars_fragment: "#ifndef saturate\n#define saturate( a ) clamp( a, 0.0, 1.0 )\n#endif\nuniform float toneMappingExposure;\nvec3 LinearToneMapping( vec3 color ) {\n\treturn toneMappingExposure * color;\n}\nvec3 ReinhardToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\treturn saturate( color / ( vec3( 1.0 ) + color ) );\n}\nvec3 OptimizedCineonToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\tcolor = max( vec3( 0.0 ), color - 0.004 );\n\treturn pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );\n}\nvec3 RRTAndODTFit( vec3 v ) {\n\tvec3 a = v * ( v + 0.0245786 ) - 0.000090537;\n\tvec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;\n\treturn a / b;\n}\nvec3 ACESFilmicToneMapping( vec3 color ) {\n\tconst mat3 ACESInputMat = mat3(\n\t\tvec3( 0.59719, 0.07600, 0.02840 ),\t\tvec3( 0.35458, 0.90834, 0.13383 ),\n\t\tvec3( 0.04823, 0.01566, 0.83777 )\n\t);\n\tconst mat3 ACESOutputMat = mat3(\n\t\tvec3(\t1.60475, -0.10208, -0.00327 ),\t\tvec3( -0.53108,\t1.10813, -0.07276 ),\n\t\tvec3( -0.07367, -0.00605,\t1.07602 )\n\t);\n\tcolor *= toneMappingExposure / 0.6;\n\tcolor = ACESInputMat * color;\n\tcolor = RRTAndODTFit( color );\n\tcolor = ACESOutputMat * color;\n\treturn saturate( color );\n}\nvec3 CustomToneMapping( vec3 color ) { return color; }",

// TRANSMISSION
        transmission_fragment: "#ifdef USE_TRANSMISSION\n\tmaterial.transmission = transmission;\n\tmaterial.transmissionAlpha = 1.0;\n\tmaterial.thickness = thickness;\n\tmaterial.attenuationDistance = attenuationDistance;\n\tmaterial.attenuationColor = attenuationColor;\n\t#ifdef USE_TRANSMISSIONMAP\n\t\tmaterial.transmission *= texture2D( transmissionMap, vUv ).r;\n\t#endif\n\t#ifdef USE_THICKNESSMAP\n\t\tmaterial.thickness *= texture2D( thicknessMap, vUv ).g;\n\t#endif\n\tvec3 pos = vWorldPosition;\n\tvec3 v = normalize( cameraPosition - pos );\n\tvec3 n = inverseTransformDirection( normal, viewMatrix );\n\tvec4 transmission = getIBLVolumeRefraction(\n\t\tn, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,\n\t\tpos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,\n\t\tmaterial.attenuationColor, material.attenuationDistance );\n\tmaterial.transmissionAlpha = mix( material.transmissionAlpha, transmission.a, material.transmission );\n\ttotalDiffuse = mix( totalDiffuse, transmission.rgb, material.transmission );\n#endif",

        transmission_pars_fragment: "#ifdef USE_TRANSMISSION\n\tuniform float transmission;\n\tuniform float thickness;\n\tuniform float attenuationDistance;\n\tuniform vec3 attenuationColor;\n\t#ifdef USE_TRANSMISSIONMAP\n\t\tuniform sampler2D transmissionMap;\n\t#endif\n\t#ifdef USE_THICKNESSMAP\n\t\tuniform sampler2D thicknessMap;\n\t#endif\n\tuniform vec2 transmissionSamplerSize;\n\tuniform sampler2D transmissionSamplerMap;\n\tuniform mat4 modelMatrix;\n\tuniform mat4 projectionMatrix;\n\tvarying vec3 vWorldPosition;\n\tvec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {\n\t\tvec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );\n\t\tvec3 modelScale;\n\t\tmodelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );\n\t\tmodelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );\n\t\tmodelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );\n\t\treturn normalize( refractionVector ) * thickness * modelScale;\n\t}\n\tfloat applyIorToRoughness( const in float roughness, const in float ior ) {\n\t\treturn roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );\n\t}\n\tvec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {\n\t\tfloat framebufferLod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );\n\t\t#ifdef texture2DLodEXT\n\t\t\treturn texture2DLodEXT( transmissionSamplerMap, fragCoord.xy, framebufferLod );\n\t\t#else\n\t\t\treturn texture2D( transmissionSamplerMap, fragCoord.xy, framebufferLod );\n\t\t#endif\n\t}\n\tvec3 applyVolumeAttenuation( const in vec3 radiance, const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {\n\t\tif ( attenuationDistance == 0.0 ) {\n\t\t\treturn radiance;\n\t\t} else {\n\t\t\tvec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;\n\t\t\tvec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );\t\t\treturn transmittance * radiance;\n\t\t}\n\t}\n\tvec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,\n\t\tconst in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,\n\t\tconst in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,\n\t\tconst in vec3 attenuationColor, const in float attenuationDistance ) {\n\t\tvec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );\n\t\tvec3 refractedRayExit = position + transmissionRay;\n\t\tvec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );\n\t\tvec2 refractionCoords = ndcPos.xy / ndcPos.w;\n\t\trefractionCoords += 1.0;\n\t\trefractionCoords /= 2.0;\n\t\tvec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );\n\t\tvec3 attenuatedColor = applyVolumeAttenuation( transmittedLight.rgb, length( transmissionRay ), attenuationColor, attenuationDistance );\n\t\tvec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );\n\t\treturn vec4( ( 1.0 - F ) * attenuatedColor * diffuseColor, transmittedLight.a );\n\t}\n#endif",

// UV
        uv_pars_fragment: "#if ( defined( USE_UV ) && ! defined( UVS_VERTEX_ONLY ) )\n\tvarying vec2 vUv;\n#endif",

        uv_pars_vertex: "#ifdef USE_UV\n\t#ifdef UVS_VERTEX_ONLY\n\t\tvec2 vUv;\n\t#else\n\t\tvarying vec2 vUv;\n\t#endif\n\tuniform mat3 uvTransform;\n#endif",

        uv_vertex: "#ifdef USE_UV\n\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n#endif",

        uv2_pars_fragment: "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tvarying vec2 vUv2;\n#endif",

        uv2_pars_vertex: "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tattribute vec2 uv2;\n\tvarying vec2 vUv2;\n\tuniform mat3 uv2Transform;\n#endif",

        uv2_vertex: "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tvUv2 = ( uv2Transform * vec3( uv2, 1 ) ).xy;\n#endif",

// ??
        worldpos_vertex: "#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION )\n\tvec4 worldPosition = vec4( transformed, 1.0 );\n\t#ifdef USE_INSTANCING\n\t\tworldPosition = instanceMatrix * worldPosition;\n\t#endif\n\tworldPosition = modelMatrix * worldPosition;\n#endif",

// BACKGROUND
        background_vert: "varying vec2 vUv;\nuniform mat3 uvTransform;\nvoid main() {\n\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n\tgl_Position = vec4( position.xy, 1.0, 1.0 );\n}",

        background_frag: "uniform sampler2D t2D;\nvarying vec2 vUv;\nvoid main() {\n\tgl_FragColor = texture2D( t2D, vUv );\n\t#ifdef DECODE_VIDEO_TEXTURE\n\t\tgl_FragColor = vec4( mix( pow( gl_FragColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), gl_FragColor.rgb * 0.0773993808, vec3( lessThanEqual( gl_FragColor.rgb, vec3( 0.04045 ) ) ) ), gl_FragColor.w );\n\t#endif\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n}",

// MESHBASIC
        meshbasic_vert: "#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <morphcolor_vertex>\n\t#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinbase_vertex>\n\t\t#include <skinnormal_vertex>\n\t\t#include <defaultnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <fog_vertex>\n}",

        meshbasic_frag: "uniform vec3 diffuse;\nuniform float opacity;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\t#ifdef USE_LIGHTMAP\n\t\tvec4 lightMapTexel = texture2D( lightMap, vUv2 );\n\t\treflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;\n\t#else\n\t\treflectedLight.indirectDiffuse += vec3( 1.0 );\n\t#endif\n\t#include <aomap_fragment>\n\treflectedLight.indirectDiffuse *= diffuseColor.rgb;\n\tvec3 outgoingLight = reflectedLight.indirectDiffuse;\n\t#include <envmap_fragment>\n\t#include <output_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}",

// MESHLAMBERT
        meshlambert_vert: "#define LAMBERT\nvarying vec3 vViewPosition;\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <morphcolor_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}",

        meshlambert_frag: "#define LAMBERT\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_lambert_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_lambert_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n\t#include <envmap_fragment>\n\t#include <output_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}",

// MESH NORMAL
        meshnormal_vert: "#define NORMAL\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )\n\tvarying vec3 vViewPosition;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )\n\tvViewPosition = - mvPosition.xyz;\n#endif\n}",

        meshnormal_frag: "#define NORMAL\nuniform float opacity;\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )\n\tvarying vec3 vViewPosition;\n#endif\n#include <packing>\n#include <uv_pars_fragment>\n#include <normal_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\t#include <logdepthbuf_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\tgl_FragColor = vec4( packNormalToRGB( normal ), opacity );\n\t#ifdef OPAQUE\n\t\tgl_FragColor.a = 1.0;\n\t#endif\n}",

// MESH PHONG
        meshphong_vert: "#define PHONG\nvarying vec3 vViewPosition;\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <morphcolor_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}",

        meshphong_frag: "#define PHONG\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_phong_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_phong_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\t#include <envmap_fragment>\n\t#include <output_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}",

// POINTS
        points_vert: "uniform float size;\nuniform float scale;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <color_vertex>\n\t#include <morphcolor_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <project_vertex>\n\tgl_PointSize = size;\n\t#ifdef USE_SIZEATTENUATION\n\t\tbool isPerspective = isPerspectiveMatrix( projectionMatrix );\n\t\tif ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );\n\t#endif\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <fog_vertex>\n}",

        points_frag: "uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <color_pars_fragment>\n#include <map_particle_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_particle_fragment>\n\t#include <color_fragment>\n\t#include <alphatest_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\t#include <output_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n}",

// SPRITE
        sprite_vert: "uniform float rotation;\nuniform vec2 center;\n#include <common>\n#include <uv_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\tvec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );\n\tvec2 scale;\n\tscale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );\n\tscale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );\n\t#ifndef USE_SIZEATTENUATION\n\t\tbool isPerspective = isPerspectiveMatrix( projectionMatrix );\n\t\tif ( isPerspective ) scale *= - mvPosition.z;\n\t#endif\n\tvec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;\n\tvec2 rotatedPosition;\n\trotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;\n\trotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;\n\tmvPosition.xy += rotatedPosition;\n\tgl_Position = projectionMatrix * mvPosition;\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n}",

        sprite_frag: "uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\t#include <output_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}"

    }

// this is UniformsLib??
// this seem to set different variables (uniforms?) based on what type of... something
      , yn = {
        common: {
            diffuse: {
                value: new THREE.Color(16777215)
            },
            opacity: {
                value: 1
            },
            map: {
                value: null
            },
            uvTransform: {
                value: new Ct
            },
            uv2Transform: {
                value: new Ct
            },
            alphaMap: {
                value: null
            },
            alphaTest: {
                value: 0
            }
        },
        fog: {
            fogDensity: {
                value: 25e-5
            },
            fogNear: {
                value: 1
            },
            fogFar: {
                value: 2e3
            },
            fogColor: {
                value: new THREE.Color(16777215)
            }
        },
        lights: {
            ambientLightColor: {
                value: []
            },
            directionalLights: {
                value: [],
                properties: {
                    direction: {},
                    color: {}
                }
            },
            spotLights: {
                value: [],
                properties: {
                    color: {},
                    position: {},
                    direction: {},
                    distance: {},
                    coneCos: {},
                    penumbraCos: {},
                    decay: {}
                }
            },
            pointLights: {
                value: [],
                properties: {
                    color: {},
                    position: {},
                    decay: {},
                    distance: {}
                }
            },
        },
        points: {
            diffuse: {
                value: new THREE.Color(16777215)
            },
            opacity: {
                value: 1
            },
            size: {
                value: 1
            },
            scale: {
                value: 1
            },
            map: {
                value: null
            },
            alphaMap: {
                value: null
            },
            alphaTest: {
                value: 0
            },
            uvTransform: {
                value: new Ct
            }
        },
        sprite: {
            diffuse: {
                value: new THREE.Color(16777215)
            },
            opacity: {
                value: 1
            },
            center: {
                value: new Et(.5,.5)
            },
            rotation: {
                value: 0
            },
            map: {
                value: null
            },
            alphaMap: {
                value: null
            },
            alphaTest: {
                value: 0
            },
            uvTransform: {
                value: new Ct
            }
        }
    }

// this is ShaderLib??
// this is different "programs"(?) that has specific uniforms connected to them, and use one vertex shader and one fragment shader.
      , Mn = {
        basic: {
            uniforms: Qi([yn.common, yn.fog]),
            vertexShader: _n.meshbasic_vert,
            fragmentShader: _n.meshbasic_frag
        },
        lambert: {
            uniforms: Qi([yn.common, yn.fog, yn.lights, {
                emissive: {
                    value: new THREE.Color(0)
                }
            }]),
            vertexShader: _n.meshlambert_vert,
            fragmentShader: _n.meshlambert_frag
        },
        phong: {
		uniforms: Qi([yn.common, yn.fog, yn.lights, {
                emissive: {
                    value: new THREE.Color(0)
                },
                specular: {
                    value: new THREE.Color(1118481)
                },
                shininess: {
                    value: 30
                }
            }]),
            vertexShader: _n.meshphong_vert,
            fragmentShader: _n.meshphong_frag
        },
        standard: {
            uniforms: Qi([yn.common, yn.fog, yn.lights, {
                emissive: {
                    value: new THREE.Color(0)
                },
                roughness: {
                    value: 1
                },
                metalness: {
                    value: 0
                },
            }]),
            vertexShader: _n.meshphysical_vert,
            fragmentShader: _n.meshphysical_frag
        },
        points: {
            uniforms: Qi([yn.points, yn.fog]),
            vertexShader: _n.points_vert,
            fragmentShader: _n.points_frag
        },
        normal: {
            uniforms: Qi([yn.common, {
                opacity: {
                    value: 1
                }
            }]),
            vertexShader: _n.meshnormal_vert,
            fragmentShader: _n.meshnormal_frag
        },
        sprite: {
            uniforms: Qi([yn.sprite, yn.fog]),
            vertexShader: _n.sprite_vert,
            fragmentShader: _n.sprite_frag
        },
        background: {
            uniforms: {
                uvTransform: {
                    value: new Ct
                },
                t2D: {
                    value: null
                }
            },
            vertexShader: _n.background_vert,
            fragmentShader: _n.background_frag
        },
    };

// används i rendering? color, alpha?
    function bn(t, e, i, n, r, s)
    {
    }
// någon sorts class som används i rendering
    function wn(t, e, i, n) {
        const r = t.getParameter(34921)
          , s = n.isWebGL2 ? null : e.get("OES_vertex_array_object")
          , a = n.isWebGL2 || null !== s
          , o = {}
          , l = p(null);
        let c = l
          , h = !1;
// bind vertex array
        function u(e) {
            return n.isWebGL2 ? t.bindVertexArray(e) : s.bindVertexArrayOES(e)
        }
// delete vertex array
        function p(t) {
            const e = []
              , i = []
              , n = [];
            for (let t = 0; t < r; t++)
                e[t] = 0,
                i[t] = 0,
                n[t] = 0;
            return {
                geometry: null,
                program: null,
                wireframe: !1,
                newAttributes: e,
                enabledAttributes: i,
                attributeDivisors: n,
                object: t,
                attributes: {},
                index: null
            }
        }
// new attributes
        function m() {
            const t = c.newAttributes;
            for (let e = 0, i = t.length; e < i; e++)
                t[e] = 0
        }
        function f(t) {
            g(t, 0)
        }
        function g(i, r) {
// attributes
            const s = c.newAttributes
              , a = c.enabledAttributes
              , o = c.attributeDivisors;
            if (s[i] = 1,
            0 === a[i] && (t.enableVertexAttribArray(i),
            a[i] = 1),
            o[i] !== r) {
                (n.isWebGL2 ? t : e.get("ANGLE_instanced_arrays"))[n.isWebGL2 ? "vertexAttribDivisor" : "vertexAttribDivisorANGLE"](i, r),
                o[i] = r
            }
        }
// attributes
        function v() {
            const e = c.newAttributes
              , i = c.enabledAttributes;
            for (let n = 0, r = i.length; n < r; n++)
                i[n] !== e[n] && (t.disableVertexAttribArray(n),
                i[n] = 0)
        }
// vertexAttribPointer
        function x(e, i, r, s, a, o) {
            !0 !== n.isWebGL2 || 5124 !== r && 5125 !== r ? t.vertexAttribPointer(e, i, r, s, a, o) : t.vertexAttribIPointer(e, i, r, a, o)
        }
        function y() {
            l.geometry = null,
            l.program = null,
            l.wireframe = !1
        }
        return {
            setup: function(r, l, d, _, y) {
                let M = !1;
                if (a) {
                    const e = function(e, i, r) {
                        const a = !0 === r.wireframe;
                        let l = o[e.id];
                        void 0 === l && (l = {},
                        o[e.id] = l);
                        let c = l[i.id];
                        void 0 === c && (c = {},
                        l[i.id] = c);
                        let h = c[a];
                        void 0 === h && (h = p(n.isWebGL2 ? t.createVertexArray() : s.createVertexArrayOES()),
                        c[a] = h);
                        return h
                    }(_, d, l);
                    c !== e && (c = e,
                    u(c.object)),
                    M = function(t, e, i, n) {
                        const r = c.attributes
                          , s = e.attributes;
                        let a = 0;
                        const o = i.getAttributes();
                        for (const e in o) {
                            if (o[e].location >= 0) {
                                const i = r[e];
                                let n = s[e];
                                if (void 0 === n && ("instanceMatrix" === e && t.instanceMatrix && (n = t.instanceMatrix),
                                "instanceColor" === e && t.instanceColor && (n = t.instanceColor)),
                                void 0 === i)
                                    return !0;
                                if (i.attribute !== n)
                                    return !0;
                                if (n && i.data !== n.data)
                                    return !0;
                                a++
                            }
                        }
                        return c.attributesNum !== a || c.index !== n
                    }(r, _, d, y),
                    M && function(t, e, i, n) {
                        const r = {}
                          , s = e.attributes;
                        let a = 0;
                        const o = i.getAttributes();
                        for (const e in o) {
                            if (o[e].location >= 0) {
                                let i = s[e];
                                void 0 === i && ("instanceMatrix" === e && t.instanceMatrix && (i = t.instanceMatrix),
                                "instanceColor" === e && t.instanceColor && (i = t.instanceColor));
                                const n = {};
                                n.attribute = i,
                                i && i.data && (n.data = i.data),
                                r[e] = n,
                                a++
                            }
                        }
                        c.attributes = r,
                        c.attributesNum = a,
                        c.index = n
                    }(r, _, d, y)
                } else {
                    const t = !0 === l.wireframe;
                    c.geometry === _.id && c.program === d.id && c.wireframe === t || (c.geometry = _.id,
                    c.program = d.id,
                    c.wireframe = t,
                    M = !0)
                }
                null !== y && i.update(y, 34963),
                (M || h) && (h = !1,
                function(r, s, a, o) {
                    if (!1 === n.isWebGL2 && (r.isInstancedMesh || o.isInstancedBufferGeometry) && null === e.get("ANGLE_instanced_arrays"))
                        return;
                    m();
                    const l = o.attributes
                      , c = a.getAttributes()
                      , h = s.defaultAttributeValues;
                    for (const e in c) {
                        const n = c[e];
                        if (n.location >= 0) {
                            let s = l[e];
                            if (void 0 === s && ("instanceMatrix" === e && r.instanceMatrix && (s = r.instanceMatrix),
                            "instanceColor" === e && r.instanceColor && (s = r.instanceColor)),
                            void 0 !== s) {
                                const e = s.normalized
                                  , a = s.itemSize
                                  , l = i.get(s);
                                if (void 0 === l)
                                    continue;
                                const c = l.buffer
                                  , h = l.type
                                  , u = l.bytesPerElement;
                                if (s.isInterleavedBufferAttribute) {
                                    const i = s.data
                                      , l = i.stride
                                      , d = s.offset;
                                    if (i.isInstancedInterleavedBuffer) {
                                        for (let t = 0; t < n.locationSize; t++)
                                            g(n.location + t, i.meshPerAttribute);
                                        !0 !== r.isInstancedMesh && void 0 === o._maxInstanceCount && (o._maxInstanceCount = i.meshPerAttribute * i.count)
                                    } else
                                        for (let t = 0; t < n.locationSize; t++)
                                            f(n.location + t);
                                    t.bindBuffer(34962, c);
                                    for (let t = 0; t < n.locationSize; t++)
                                        x(n.location + t, a / n.locationSize, h, e, l * u, (d + a / n.locationSize * t) * u)
                                } else {
                                    if (s.isInstancedBufferAttribute) {
                                        for (let t = 0; t < n.locationSize; t++)
                                            g(n.location + t, s.meshPerAttribute);
                                        !0 !== r.isInstancedMesh && void 0 === o._maxInstanceCount && (o._maxInstanceCount = s.meshPerAttribute * s.count)
                                    } else
                                        for (let t = 0; t < n.locationSize; t++)
                                            f(n.location + t);
                                    t.bindBuffer(34962, c);
                                    for (let t = 0; t < n.locationSize; t++)
                                        x(n.location + t, a / n.locationSize, h, e, a * u, a / n.locationSize * t * u)
                                }
                            } else if (void 0 !== h) {
                                const i = h[e];
                                if (void 0 !== i)
                                    switch (i.length) {
                                    case 2:
                                        t.vertexAttrib2fv(n.location, i);
                                        break;
                                    case 3:
                                        t.vertexAttrib3fv(n.location, i);
                                        break;
                                    case 4:
                                        t.vertexAttrib4fv(n.location, i);
                                        break;
                                    default:
                                        t.vertexAttrib1fv(n.location, i)
                                    }
                            }
                        }
                    }
                    v()
                }(r, l, d, _),
                null !== y && t.bindBuffer(34963, i.get(y).buffer))
            },
            reset: _,
            resetDefaultState: y,
            initAttributes: m,
            enableAttribute: f,
            disableUnusedAttributes: v
        }
    }

function render_thing(t, e, i, n)
{
        const r = n.isWebGL2;
        let mode;
        this.setMode = function(t)
	{
            mode = t;
        }
        ,
	// !!!! WEBGL RENDER !!!!
        this.render = function(first, count)
	{
            t.drawArrays(mode, first, count);	// gl.drawArrays(mode, first, count)
        }
}

// någon sorts class som används i rendering
    function Tn(t, e, i) {
        let n;
// shader precision
        function r(e) {
            if ("highp" === e) {
                if (t.getShaderPrecisionFormat(35633, 36338).precision > 0 && t.getShaderPrecisionFormat(35632, 36338).precision > 0)
                    return "highp";
                e = "mediump"
            }
            return "mediump" === e && t.getShaderPrecisionFormat(35633, 36337).precision > 0 && t.getShaderPrecisionFormat(35632, 36337).precision > 0 ? "mediump" : "lowp"
        }
        const s = "undefined" != typeof WebGL2RenderingContext && t instanceof WebGL2RenderingContext || "undefined" != typeof WebGL2ComputeRenderingContext && t instanceof WebGL2ComputeRenderingContext;
        let a = void 0 !== i.precision ? i.precision : "highp";
        const o = r(a);
        o !== a && (console.warn("THREE.WebGLRenderer:", a, "not supported, using", o, "instead."),
        a = o);
        const l = s || e.has("WEBGL_draw_buffers")
          , c = !0 === i.logarithmicDepthBuffer
          , h = t.getParameter(34930)
          , u = t.getParameter(35660)
          , d = t.getParameter(3379)
          , p = t.getParameter(34076)
          , m = t.getParameter(34921)
          , f = t.getParameter(36347)
          , g = t.getParameter(36348)
          , v = t.getParameter(36349)
          , x = u > 0
          , _ = s || e.has("OES_texture_float");
        return {
            isWebGL2: s,
            drawBuffers: l,
            getMaxPrecision: r,
            precision: a,
            logarithmicDepthBuffer: c,
            maxTextures: h,
            maxVertexTextures: u,
            maxTextureSize: d,
            maxCubemapSize: p,
            maxAttributes: m,
            maxVertexUniforms: f,
            maxVaryings: g,
            maxFragmentUniforms: v,
            vertexTextures: x,
            floatFragmentTextures: _,
            floatVertexTextures: x && _,
            maxSamples: s ? t.getParameter(36183) : 0
        }
    }
// någon sorts class som används i rendering
    function An(t) {
        const e = this;
        let i = null
          , n = 0
          , r = !1
          , s = !1;
        const a = new dn
          , o = new Ct
          , l = {
            value: null,
            needsUpdate: !1
        };
// matrix
        function h(t, i, n, r) {
            const s = null !== t ? t.length : 0;
            let c = null;
            if (0 !== s) {
                if (c = l.value,
                !0 !== r || null === c) {
                    const e = n + 4 * s
                      , r = i.matrixWorldInverse;
                    o.getNormalMatrix(r),
                    (null === c || c.length < e) && (c = new Float32Array(e));
                    for (let e = 0, i = n; e !== s; ++e,
                    i += 4)
                        a.copy(t[e]).applyMatrix4(r, o),
                        a.normal.toArray(c, i),
                        c[i + 3] = a.constant
                }
                l.value = c,
                l.needsUpdate = !0
            }
            return e.numPlanes = s,
            e.numIntersection = 0,
            c
        }
        this.uniform = l,
        this.numPlanes = 0,
        this.numIntersection = 0,
        this.init = function(t, e, s) {
            const a = 0 !== t.length || e || 0 !== n || r;
            return r = e,
            i = h(t, s, 0),
            n = t.length,
            a
        }
    }
// någon sorts class som används i rendering. texture mapping?
    function En(t) {
        let e = new WeakMap;
        return {
            get: function(r) {
                if (r && r.isTexture && !1 === r.isRenderTargetTexture) {
                    const s = r.mapping;
                    if (s === a || s === o) {
                        if (e.has(r)) {
                            return i(e.get(r).texture, r.mapping)
                        }
                        {
                            const s = r.image;
                            if (s && s.height > 0) {
                                const a = new ln(s.height / 2);
                                return a.fromEquirectangularTexture(t, r),
                                e.set(r, a),
                                r.addEventListener("dispose", n),
                                i(a.texture, r.mapping)
                            }
                            return null
                        }
                    }
                }
                return r
            }
        }
    }
function Hn()
{
	// ska tas bort
}
// rendering?
    function Wn(t) {
        const e = {};
// different textures?
        function i(i) {
            if (void 0 !== e[i])
                return e[i];
            let n;
            switch (i) {
            case "WEBGL_depth_texture":
                n = t.getExtension("WEBGL_depth_texture") || t.getExtension("MOZ_WEBGL_depth_texture") || t.getExtension("WEBKIT_WEBGL_depth_texture");
                break;
            case "EXT_texture_filter_anisotropic":
                n = t.getExtension("EXT_texture_filter_anisotropic") || t.getExtension("MOZ_EXT_texture_filter_anisotropic") || t.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
                break;
            case "WEBGL_compressed_texture_s3tc":
                n = t.getExtension("WEBGL_compressed_texture_s3tc") || t.getExtension("MOZ_WEBGL_compressed_texture_s3tc") || t.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
                break;
            case "WEBGL_compressed_texture_pvrtc":
                n = t.getExtension("WEBGL_compressed_texture_pvrtc") || t.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");
                break;
            default:
                n = t.getExtension(i)
            }
            return e[i] = n,
            n
        }
        return {
            has: function(t) {
                return null !== i(t)
            },
            init: function(t) {
                t.isWebGL2 ? i("EXT_color_buffer_float") : (i("WEBGL_depth_texture"),
                i("OES_texture_float"),
                i("OES_texture_half_float"),
                i("OES_texture_half_float_linear"),
                i("OES_standard_derivatives"),
                i("OES_element_index_uint"),
                i("OES_vertex_array_object"),
                i("ANGLE_instanced_arrays")),
                i("OES_texture_float_linear"),
                i("EXT_color_buffer_half_float"),
                i("WEBGL_multisampled_render_to_texture")
            },
            get: function(t) {
                const e = i(t);
                return null === e && console.warn("THREE.WebGLRenderer: " + t + " extension not supported."),
                e
            }
        }
    }
// rendering?
    function jn(t, e, i, n) {
        const r = {}
          , s = new WeakMap;
        return {
            get: function(t, e) {
                return !0 === r[e.id] || (e.addEventListener("dispose", a),
                r[e.id] = !0,
                i.memory.geometries++),
                e
            },
            update: function(t) {
                const i = t.attributes;
                for (const t in i)
                    e.update(i[t], 34962);
                const n = t.morphAttributes;
                for (const t in n) {
                    const i = n[t];
                    for (let t = 0, n = i.length; t < n; t++)
                        e.update(i[t], 34962)
                }
            }
        }
    }
// render
    function qn(t, e, i, n) {
        const r = n.isWebGL2;
        let s, a, o;
        this.setMode = function(t) {
            s = t
        }
        ,
        this.setIndex = function(t) {
            a = t.type,
            o = t.bytesPerElement
        }
        ,
        this.render = function(e, n) {
            t.drawElements(s, n, a, e * o),
            i.update(n, s, 1)
        }
    }
// rendering
    function Xn(t) {
        const e = {
            frame: 0,
            calls: 0,
            triangles: 0,
            points: 0,
            lines: 0
        };
        return {
            memory: {
                geometries: 0,
                textures: 0
            },
            render: e,
            programs: null,
            autoReset: !0,
            reset: function() {
                e.frame++,
                e.calls = 0,
                e.triangles = 0,
                e.points = 0,
                e.lines = 0
            },
            update: function(t, i, n) {
                switch (e.calls++,
                i) {
                case 4:
                    e.triangles += n * (t / 3);
                    break;
                case 1:
                    e.lines += n * (t / 2);
                    break;
                case 3:
                    e.lines += n * (t - 1);
                    break;
                case 2:
                    e.lines += n * t;
                    break;
                case 0:
                    e.points += n * t;
                    break;
                }
            }
        }
    }
// rendering
    function Kn(t, e, i) {
        const n = {}
          , r = new Float32Array(8)
          , s = new WeakMap
          , a = new Jt
          , o = [];
        for (let t = 0; t < 8; t++)
            o[t] = [t, 0];
        return {
            update: function(l, c, h, u) {
                const d = l.morphTargetInfluences;
                if (!0 === e.isWebGL2) {
                    const p = c.morphAttributes.position || c.morphAttributes.normal || c.morphAttributes.color
                      , m = void 0 !== p ? p.length : 0;
                    let f = s.get(c);
                    if (void 0 === f || f.count !== m) {
                        void 0 !== f && f.texture.dispose();
                        const x = void 0 !== c.morphAttributes.position
                          , _ = void 0 !== c.morphAttributes.normal
                          , y = void 0 !== c.morphAttributes.color
                          , b = c.morphAttributes.position || []
                          , w = c.morphAttributes.normal || []
                          , S = c.morphAttributes.color || [];
                        let T = 0;
                        !0 === x && (T = 1),
                        !0 === _ && (T = 2),
                        !0 === y && (T = 3);
                        let A = c.attributes.position.count * T
                          , E = 1;
                        A > e.maxTextureSize && (E = Math.ceil(A / e.maxTextureSize),
                        A = e.maxTextureSize);
                        const C = new Float32Array(A * E * 4 * m)
                          , L = new $t(C,A,E,m);
                        L.type = M,
                        L.needsUpdate = !0;
                        const R = 4 * T;
                        for (let I = 0; I < m; I++) {
                            const D = b[I]
                              , N = w[I]
                              , z = S[I]
                              , O = A * E * 4 * I;
                            for (let U = 0; U < D.count; U++) {
                                const B = U * R;
                                !0 === x && (a.fromBufferAttribute(D, U),
                                !0 === D.normalized && Jn(a, D),
                                C[O + B + 0] = a.x,
                                C[O + B + 1] = a.y,
                                C[O + B + 2] = a.z,
                                C[O + B + 3] = 0),
                                !0 === _ && (a.fromBufferAttribute(N, U),
                                !0 === N.normalized && Jn(a, N),
                                C[O + B + 4] = a.x,
                                C[O + B + 5] = a.y,
                                C[O + B + 6] = a.z,
                                C[O + B + 7] = 0),
                                !0 === y && (a.fromBufferAttribute(z, U),
                                !0 === z.normalized && Jn(a, z),
                                C[O + B + 8] = a.x,
                                C[O + B + 9] = a.y,
                                C[O + B + 10] = a.z,
                                C[O + B + 11] = 4 === z.itemSize ? a.w : 1)
                            }
                        }
                        function P() {
                            L.dispose(),
                            s.delete(c),
                            c.removeEventListener("dispose", P)
                        }
                        f = {
                            count: m,
                            texture: L,
                            size: new Et(A,E)
                        },
                        s.set(c, f),
                        c.addEventListener("dispose", P)
                    }
                    let g = 0;
                    for (let F = 0; F < d.length; F++)
                        g += d[F];
                    const v = c.morphTargetsRelative ? 1 : 1 - g;
                    u.getUniforms().setValue(t, "morphTargetBaseInfluence", v),
                    u.getUniforms().setValue(t, "morphTargetInfluences", d),
                    u.getUniforms().setValue(t, "morphTargetsTexture", f.texture, i),
                    u.getUniforms().setValue(t, "morphTargetsTextureSize", f.size)
                } else {
                    const k = void 0 === d ? 0 : d.length;
                    let G = n[c.id];
                    if (void 0 === G || G.length !== k) {
                        G = [];
                        for (let q = 0; q < k; q++)
                            G[q] = [q, 0];
                        n[c.id] = G
                    }
                    for (let X = 0; X < k; X++) {
                        const Y = G[X];
                        Y[0] = X,
                        Y[1] = d[X]
                    }
                    G.sort(Zn);
                    for (let Z = 0; Z < 8; Z++)
                        Z < k && G[Z][1] ? (o[Z][0] = G[Z][0],
                        o[Z][1] = G[Z][1]) : (o[Z][0] = Number.MAX_SAFE_INTEGER,
                        o[Z][1] = 0);
                    o.sort(Yn);
                    const V = c.morphAttributes.position
                      , H = c.morphAttributes.normal;
                    let W = 0;
                    for (let J = 0; J < 8; J++) {
                        const K = o[J]
                          , $ = K[0]
                          , Q = K[1];
                        $ !== Number.MAX_SAFE_INTEGER && Q ? (V && c.getAttribute("morphTarget" + J) !== V[$] && c.setAttribute("morphTarget" + J, V[$]),
                        H && c.getAttribute("morphNormal" + J) !== H[$] && c.setAttribute("morphNormal" + J, H[$]),
                        r[J] = Q,
                        W += Q) : (V && !0 === c.hasAttribute("morphTarget" + J) && c.deleteAttribute("morphTarget" + J),
                        H && !0 === c.hasAttribute("morphNormal" + J) && c.deleteAttribute("morphNormal" + J),
                        r[J] = 0)
                    }
                    const j = c.morphTargetsRelative ? 1 : 1 - W;
                    u.getUniforms().setValue(t, "morphTargetBaseInfluence", j),
                    u.getUniforms().setValue(t, "morphTargetInfluences", r)
                }
            }
        }
    }
// rendering
    function $n(t, e, i, n) {
        let r = new WeakMap;
        function s(t) {
            const e = t.target;
            e.removeEventListener("dispose", s),
            i.remove(e.instanceMatrix),
            null !== e.instanceColor && i.remove(e.instanceColor)
        }
        return {
            update: function(t) {
                const a = n.render.frame
                  , o = t.geometry
                  , l = e.get(t, o);
                return r.get(l) !== a && (e.update(l),
                r.set(l, a)),
                t.isInstancedMesh && (!1 === t.hasEventListener("dispose", s) && t.addEventListener("dispose", s),
                i.update(t.instanceMatrix, 34962),
                null !== t.instanceColor && i.update(t.instanceColor, 34962)),
                l
            },
            dispose: function() {
                r = new WeakMap
            }
        }
    }
    const Qn = new Zt
      , nr = []
      , rr = []
      , sr = new Float32Array(16)
      , ar = new Float32Array(9)
      , or = new Float32Array(4);
// to array
    function lr(t, e, i) {
        const n = t[0];
        if (n <= 0 || n > 0)
            return t;
        const r = e * i;
        let s = nr[r];
        if (void 0 === s && (s = new Float32Array(r),
        nr[r] = s),
        0 !== e) {
            n.toArray(s, 0);
            for (let n = 1, r = 0; n !== e; ++n)
                r += i,
                t[n].toArray(s, r)
        }
        return s
    }
// loopa igenom något
    function cr(t, e) {
        if (t.length !== e.length)
            return !1;
        for (let i = 0, n = t.length; i < n; i++)
            if (t[i] !== e[i])
                return !1;
        return !0
    }
// loopa igenom något
    function hr(t, e) {
        for (let i = 0, n = e.length; i < n; i++)
            t[i] = e[i]
    }
// uniform?
    function dr(t, e) {
        const i = this.cache;
        i[0] !== e && (t.uniform1f(this.addr, e),
        i[0] = e)
    }
// uniform?
    function pr(t, e) {
        const i = this.cache;
        if (void 0 !== e.x)
            i[0] === e.x && i[1] === e.y || (t.uniform2f(this.addr, e.x, e.y),
            i[0] = e.x,
            i[1] = e.y);
        else {
            if (cr(i, e))
                return;
            t.uniform2fv(this.addr, e),
            hr(i, e)
        }
    }
// uniform?
    function mr(t, e) {
        const i = this.cache;
        if (void 0 !== e.x)
            i[0] === e.x && i[1] === e.y && i[2] === e.z || (t.uniform3f(this.addr, e.x, e.y, e.z),
            i[0] = e.x,
            i[1] = e.y,
            i[2] = e.z);
        else if (void 0 !== e.r)
            i[0] === e.r && i[1] === e.g && i[2] === e.b || (t.uniform3f(this.addr, e.r, e.g, e.b),
            i[0] = e.r,
            i[1] = e.g,
            i[2] = e.b);
        else {
            if (cr(i, e))
                return;
            t.uniform3fv(this.addr, e),
            hr(i, e)
        }
    }
// uniform?
    function vr(t, e) {
        const i = this.cache
          , n = e.elements;
        if (void 0 === n) {
            if (cr(i, e))
                return;
            t.uniformMatrix3fv(this.addr, !1, e),
            hr(i, e)
        } else {
            if (cr(i, n))
                return;
            ar.set(n),
            t.uniformMatrix3fv(this.addr, !1, ar),
            hr(i, n)
        }
    }
// uniform?
    function xr(t, e) {
        const i = this.cache
          , n = e.elements;
        if (void 0 === n) {
            if (cr(i, e))
                return;
            t.uniformMatrix4fv(this.addr, !1, e),
            hr(i, e)
        } else {
            if (cr(i, n))
                return;
            sr.set(n),
            t.uniformMatrix4fv(this.addr, !1, sr),
            hr(i, n)
        }
    }
// uniform?
    function Er(t, e, i) {
        const n = this.cache
          , r = i.allocateTextureUnit();
        n[0] !== r && (t.uniform1i(this.addr, r),
        n[0] = r),
        i.setTexture2D(e || Qn, r)
    }
// uniform
    function Dr(t, e) {
        const i = lr(e, this.size, 3);
        t.uniform3fv(this.addr, i)
    }
// ???
    class Jr {
        constructor(t, e, i) {
            this.id = t,
            this.addr = i,
            this.cache = [],
            this.setValue = function(t) {
                switch (t) {
                case 5126:
                    return dr;
                case 35664:
                    return pr;
                case 35665:
                    return mr;
                case 35666:
                    return fr;
                case 35674:
                    return gr;
                case 35675:
                    return vr;
                case 35676:
                    return xr;
                case 5124:
                case 35670:
                    return _r;
                case 35667:
                case 35671:
                    return yr;
                case 35668:
                case 35672:
                    return Mr;
                case 35669:
                case 35673:
                    return br;
                case 5125:
                    return wr;
                case 36294:
                    return Sr;
                case 36295:
                    return Tr;
                case 36296:
                    return Ar;
                case 35678:
                case 36198:
                case 36298:
                case 36306:
                case 35682:
                    return Er;
                case 35679:
                case 36299:
                case 36307:
                    return Cr;
                case 35680:
                case 36300:
                case 36308:
                case 36293:
                    return Lr;
                case 36289:
                case 36303:
                case 36311:
                case 36292:
                    return Rr
                }
            }(e.type)
        }
    }
// ???
    class Kr {
        constructor(t, e, i) {
            this.id = t,
            this.addr = i,
            this.cache = [],
            this.size = e.size,
            this.setValue = function(t) {
                switch (t) {
                case 5126:
                    return Pr;
                case 35664:
                    return Ir;
                case 35665:
                    return Dr;
                case 35666:
                    return Nr;
                case 35674:
                    return zr;
                case 35675:
                    return Or;
                case 35676:
                    return Ur;
                case 5124:
                case 35670:
                    return Br;
                case 35667:
                case 35671:
                    return Fr;
                case 35668:
                case 35672:
                    return kr;
                case 35669:
                case 35673:
                    return Gr;
                case 5125:
                    return Vr;
                case 36294:
                    return Hr;
                case 36295:
                    return Wr;
                case 36296:
                    return jr;
                case 35678:
                case 36198:
                case 36298:
                case 36306:
                case 35682:
                    return qr;
                case 35679:
                case 36299:
                case 36307:
                    return Xr;
                case 35680:
                case 36300:
                case 36308:
                case 36293:
                    return Yr;
                case 36289:
                case 36303:
                case 36311:
                case 36292:
                    return Zr
                }
            }(e.type)
        }
    }
// ???
    class $r {
        constructor(t) {
            this.id = t,
            this.seq = [],
            this.map = {}
        }
        setValue(t, e, i) {
            const n = this.seq;
            for (let r = 0, s = n.length; r !== s; ++r) {
                const s = n[r];
                s.setValue(t, e[s.id], i)
            }
        }
    }
    const Qr = /(\w+)(\])?(\[|\.)?/g;
// array?
    function ts(t, e) {
        t.seq.push(e),
        t.map[e.id] = e
    }
    function es(t, e, i) {
        const n = t.name
          , r = n.length;
        for (Qr.lastIndex = 0; ; ) {
            const s = Qr.exec(n)
              , a = Qr.lastIndex;
            let o = s[1];
            const l = "]" === s[2]
              , c = s[3];
            if (l && (o |= 0),
            void 0 === c || "[" === c && a + 2 === r) {
                ts(i, void 0 === c ? new Jr(o,t,e) : new Kr(o,t,e));
                break
            }
            {
                let t = i.map[o];
                void 0 === t && (t = new $r(o),
                ts(i, t)),
                i = t
            }
        }
    }

// WEBGLUNIFORMS
class is
{
        constructor(t, e)
	{
            this.seq = [],
            this.map = {};
            const i = t.getProgramParameter(e, 35718);
            for (let n = 0; n < i; ++n) {
                const i = t.getActiveUniform(e, n);
                es(i, t.getUniformLocation(e, i.name), this)
            }
        }
        setValue(t, e, i, n)
	{
            const r = this.map[e];
            void 0 !== r && r.setValue(t, i, n)
        }
        setOptional(t, e, i)
	{
            const n = e[i];
            void 0 !== n && this.setValue(t, i, n)
        }
        static upload(t, e, i, n)
	{
            for (let r = 0, s = e.length; r !== s; ++r) {
                const s = e[r]
                  , a = i[s.id];
                !1 !== a.needsUpdate && s.setValue(t, a.value, n)
            }
        }
        static seqWithValue(t, e)
	{
            const i = [];
            for (let n = 0, r = t.length; n !== r; ++n) {
                const r = t[n];
                r.id in e && i.push(r)
            }
            return i
        }
}

function create_and_compile_shader(t, e, i)
{
	const n = t.createShader(e);
	return t.shaderSource(n, i), t.compileShader(n), n
}

let rs = 0;

// shading
function as(t, e)
{
        const i = function(t) {
            switch (t) {
            case 3e3:
                return ["Linear", "( value )"];
            case ot:
                return ["sRGB", "( value )"];
            default:
                return console.warn("THREE.WebGLProgram: Unsupported encoding:", t),
                ["Linear", "( value )"]
            }
        }(e);
        return "vec4 " + t + "( vec4 value ) { return LinearTo" + i[0] + i[1] + "; }"
}

function ls(t)
{
        return "" !== t
}

// find and replace i string
    function cs(t, e) {
        return t.replace(/NUM_DIR_LIGHTS/g, e.numDirLights).replace(/NUM_SPOT_LIGHTS/g, e.numSpotLights).replace(/NUM_RECT_AREA_LIGHTS/g, e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, e.numPointLights).replace(/NUM_HEMI_LIGHTS/g, e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g, e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS/g, e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g, e.numPointLightShadows)
    }
// find and replace i string
    function hs(t, e) {
        return t.replace(/NUM_CLIPPING_PLANES/g, e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, e.numClippingPlanes - e.numClipIntersection)
    }
    const us = /^[ \t]*#include +<([\w\d./]+)>/gm;
// find and replace i string
    function ds(t) {
        return t.replace(us, ps)
    }
// ?
    function ps(t, e) {
        const i = _n[e];
        if (void 0 === i)
            throw new Error("Can not resolve #include <" + e + ">");
        return ds(i)
    }
    const ms = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
// find & replace
    function fs(t) {
        return t.replace(ms, gs)
    }
// string
    function gs(t, e, i, n) {
        let r = "";
        for (let t = parseInt(e); t < parseInt(i); t++)
            r += n.replace(/\[\s*i\s*\]/g, "[ " + t + " ]").replace(/UNROLLED_LOOP_INDEX/g, t);
        return r
    }
// string
    function vs(t) {
        let e = "precision " + t.precision + " float;\nprecision " + t.precision + " int;";
        return "highp" === t.precision ? e += "\n#define HIGH_PRECISION" : "mediump" === t.precision ? e += "\n#define MEDIUM_PRECISION" : "lowp" === t.precision && (e += "\n#define LOW_PRECISION"),
        e
    }
// shading
    function shading(t, e, i, n) {

	// context & shaders
        const a = t.getContext()
          , o = i.defines;
        let c = i.vertexShader
          , h = i.fragmentShader;

	// if not WEBGL2?
        const g = i.isWebGL2 ? "" : function(t) {
            return [t.extensionDerivatives || t.envMapCubeUVHeight || t.bumpMap || t.tangentSpaceNormalMap || t.clearcoatNormalMap || t.flatShading || "physical" === t.shaderID ? "#extension GL_OES_standard_derivatives : enable" : "", (t.extensionFragDepth || t.logarithmicDepthBuffer) && t.rendererExtensionFragDepth ? "#extension GL_EXT_frag_depth : enable" : "", t.extensionDrawBuffers && t.rendererExtensionDrawBuffers ? "#extension GL_EXT_draw_buffers : require" : "", (t.extensionShaderTextureLOD || t.envMap || t.transmission) && t.rendererExtensionShaderTextureLod ? "#extension GL_EXT_shader_texture_lod : enable" : ""].filter(ls).join("\n")
        }(i)

	// #define?
          , v = function(t) {
            const e = [];
            for (const i in t) {
                const n = t[i];
                !1 !== n && e.push("#define " + i + " " + n)
            }
            return e.join("\n")
        }(o)

	// create program
          , x = a.createProgram();

	// GLSL shading language version
        let _, y, M = i.glslVersion ? "#version " + i.glslVersion + "\n" : "";

        i.isRawShaderMaterial ? (_ = [v].filter(ls).join("\n"),

        _.length > 0 && (_ += "\n"),

        y = [g, v].filter(ls).join("\n"),

	// shading language?
        y.length > 0 && (y += "\n")) : (_ = [vs(i), "#define SHADER_NAME " + i.shaderName, v, i.instancing ? "#define USE_INSTANCING" : "", i.instancingColor ? "#define USE_INSTANCING_COLOR" : "", i.supportsVertexTextures ? "#define VERTEX_TEXTURES" : "", i.useFog && i.fog ? "#define USE_FOG" : "", i.useFog && i.fogExp2 ? "#define FOG_EXP2" : "", i.map ? "#define USE_MAP" : "", i.envMap ? "#define USE_ENVMAP" : "", i.envMap ? "#define " + p : "", i.lightMap ? "#define USE_LIGHTMAP" : "", i.aoMap ? "#define USE_AOMAP" : "", i.emissiveMap ? "#define USE_EMISSIVEMAP" : "", i.bumpMap ? "#define USE_BUMPMAP" : "", i.normalMap ? "#define USE_NORMALMAP" : "", i.normalMap && i.objectSpaceNormalMap ? "#define OBJECTSPACE_NORMALMAP" : "", i.normalMap && i.tangentSpaceNormalMap ? "#define TANGENTSPACE_NORMALMAP" : "", i.clearcoatMap ? "#define USE_CLEARCOATMAP" : "", i.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "", i.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "", i.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "", i.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "", i.displacementMap && i.supportsVertexTextures ? "#define USE_DISPLACEMENTMAP" : "", i.specularMap ? "#define USE_SPECULARMAP" : "", i.specularIntensityMap ? "#define USE_SPECULARINTENSITYMAP" : "", i.specularColorMap ? "#define USE_SPECULARCOLORMAP" : "", i.roughnessMap ? "#define USE_ROUGHNESSMAP" : "", i.metalnessMap ? "#define USE_METALNESSMAP" : "", i.alphaMap ? "#define USE_ALPHAMAP" : "", i.transmission ? "#define USE_TRANSMISSION" : "", i.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "", i.thicknessMap ? "#define USE_THICKNESSMAP" : "", i.sheenColorMap ? "#define USE_SHEENCOLORMAP" : "", i.sheenRoughnessMap ? "#define USE_SHEENROUGHNESSMAP" : "", i.vertexTangents ? "#define USE_TANGENT" : "", i.vertexColors ? "#define USE_COLOR" : "", i.vertexAlphas ? "#define USE_COLOR_ALPHA" : "", i.vertexUvs ? "#define USE_UV" : "", i.uvsVertexOnly ? "#define UVS_VERTEX_ONLY" : "", i.flatShading ? "#define FLAT_SHADED" : "", i.skinning ? "#define USE_SKINNING" : "", i.morphTargets ? "#define USE_MORPHTARGETS" : "", i.morphNormals && !1 === i.flatShading ? "#define USE_MORPHNORMALS" : "", i.morphColors && i.isWebGL2 ? "#define USE_MORPHCOLORS" : "", i.morphTargetsCount > 0 && i.isWebGL2 ? "#define MORPHTARGETS_TEXTURE" : "", i.morphTargetsCount > 0 && i.isWebGL2 ? "#define MORPHTARGETS_TEXTURE_STRIDE " + i.morphTextureStride : "", i.morphTargetsCount > 0 && i.isWebGL2 ? "#define MORPHTARGETS_COUNT " + i.morphTargetsCount : "", i.doubleSided ? "#define DOUBLE_SIDED" : "", i.flipSided ? "#define FLIP_SIDED" : "", i.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", i.shadowMapEnabled ? "#define " + u : "", i.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "", i.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", i.logarithmicDepthBuffer && i.rendererExtensionFragDepth ? "#define USE_LOGDEPTHBUF_EXT" : "", "uniform mat4 modelMatrix;", "uniform mat4 modelViewMatrix;", "uniform mat4 projectionMatrix;", "uniform mat4 viewMatrix;", "uniform mat3 normalMatrix;", "uniform vec3 cameraPosition;", "uniform bool isOrthographic;", "#ifdef USE_INSTANCING", "\tattribute mat4 instanceMatrix;", "#endif", "#ifdef USE_INSTANCING_COLOR", "\tattribute vec3 instanceColor;", "#endif", "attribute vec3 position;", "attribute vec3 normal;", "attribute vec2 uv;", "#ifdef USE_TANGENT", "\tattribute vec4 tangent;", "#endif", "#if defined( USE_COLOR_ALPHA )", "\tattribute vec4 color;", "#elif defined( USE_COLOR )", "\tattribute vec3 color;", "#endif", "#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )", "\tattribute vec3 morphTarget0;", "\tattribute vec3 morphTarget1;", "\tattribute vec3 morphTarget2;", "\tattribute vec3 morphTarget3;", "\t#ifdef USE_MORPHNORMALS", "\t\tattribute vec3 morphNormal0;", "\t\tattribute vec3 morphNormal1;", "\t\tattribute vec3 morphNormal2;", "\t\tattribute vec3 morphNormal3;", "\t#else", "\t\tattribute vec3 morphTarget4;", "\t\tattribute vec3 morphTarget5;", "\t\tattribute vec3 morphTarget6;", "\t\tattribute vec3 morphTarget7;", "\t#endif", "#endif", "#ifdef USE_SKINNING", "\tattribute vec4 skinIndex;", "\tattribute vec4 skinWeight;", "#endif", "\n"].filter(ls).join("\n"),

        y = [g, vs(i), "#define SHADER_NAME " + i.shaderName, v, i.useFog && i.fog ? "#define USE_FOG" : "", i.useFog && i.fogExp2 ? "#define FOG_EXP2" : "", i.map ? "#define USE_MAP" : "", i.matcap ? "#define USE_MATCAP" : "", i.envMap ? "#define USE_ENVMAP" : "", i.envMap ? "#define " + d : "", i.envMap ? "#define " + p : "", i.envMap ? "#define " + m : "", f ? "#define CUBEUV_TEXEL_WIDTH " + f.texelWidth : "", f ? "#define CUBEUV_TEXEL_HEIGHT " + f.texelHeight : "", f ? "#define CUBEUV_MAX_MIP " + f.maxMip + ".0" : "", i.lightMap ? "#define USE_LIGHTMAP" : "", i.aoMap ? "#define USE_AOMAP" : "", i.emissiveMap ? "#define USE_EMISSIVEMAP" : "", i.bumpMap ? "#define USE_BUMPMAP" : "", i.normalMap ? "#define USE_NORMALMAP" : "", i.normalMap && i.objectSpaceNormalMap ? "#define OBJECTSPACE_NORMALMAP" : "", i.normalMap && i.tangentSpaceNormalMap ? "#define TANGENTSPACE_NORMALMAP" : "", i.clearcoat ? "#define USE_CLEARCOAT" : "", i.clearcoatMap ? "#define USE_CLEARCOATMAP" : "", i.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "", i.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "", i.iridescence ? "#define USE_IRIDESCENCE" : "", i.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "", i.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "", i.specularMap ? "#define USE_SPECULARMAP" : "", i.specularIntensityMap ? "#define USE_SPECULARINTENSITYMAP" : "", i.specularColorMap ? "#define USE_SPECULARCOLORMAP" : "", i.roughnessMap ? "#define USE_ROUGHNESSMAP" : "", i.metalnessMap ? "#define USE_METALNESSMAP" : "", i.alphaMap ? "#define USE_ALPHAMAP" : "", i.alphaTest ? "#define USE_ALPHATEST" : "", i.sheen ? "#define USE_SHEEN" : "", i.sheenColorMap ? "#define USE_SHEENCOLORMAP" : "", i.sheenRoughnessMap ? "#define USE_SHEENROUGHNESSMAP" : "", i.transmission ? "#define USE_TRANSMISSION" : "", i.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "", i.thicknessMap ? "#define USE_THICKNESSMAP" : "", i.decodeVideoTexture ? "#define DECODE_VIDEO_TEXTURE" : "", i.vertexTangents ? "#define USE_TANGENT" : "", i.vertexColors || i.instancingColor ? "#define USE_COLOR" : "", i.vertexAlphas ? "#define USE_COLOR_ALPHA" : "", i.vertexUvs ? "#define USE_UV" : "", i.uvsVertexOnly ? "#define UVS_VERTEX_ONLY" : "", i.gradientMap ? "#define USE_GRADIENTMAP" : "", i.flatShading ? "#define FLAT_SHADED" : "", i.doubleSided ? "#define DOUBLE_SIDED" : "", i.flipSided ? "#define FLIP_SIDED" : "", i.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", i.shadowMapEnabled ? "#define " + u : "", i.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "", i.physicallyCorrectLights ? "#define PHYSICALLY_CORRECT_LIGHTS" : "", i.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", i.logarithmicDepthBuffer && i.rendererExtensionFragDepth ? "#define USE_LOGDEPTHBUF_EXT" : "", "uniform mat4 viewMatrix;", "uniform vec3 cameraPosition;", "uniform bool isOrthographic;", 0 !== i.toneMapping ? "#define TONE_MAPPING" : "", 0 !== i.toneMapping ? _n.tonemapping_pars_fragment : "", 0 !== i.toneMapping ? os("toneMapping", i.toneMapping) : "", i.dithering ? "#define DITHERING" : "", i.opaque ? "#define OPAQUE" : "", _n.encodings_pars_fragment, as("linearToOutputTexel", i.outputEncoding), i.useDepthPacking ? "#define DEPTH_PACKING " + i.depthPacking : "", "\n"].filter(ls).join("\n")),

        c = ds(c),
        c = cs(c, i),
        c = hs(c, i),
        h = ds(h),
        h = cs(h, i),
        h = hs(h, i),
        c = fs(c),
        h = fs(h),

        i.isWebGL2 && !0 !== i.isRawShaderMaterial && (M = "#version 300 es\n",		// 300 es = GLSL3. 100 = GLSL1

        _ = ["precision mediump sampler2DArray;", "#define attribute in", "#define varying out", "#define texture2D texture"].join("\n") + "\n" + _,

        y = ["#define varying in", i.glslVersion === "300 es" ? "" : "layout(location = 0) out highp vec4 pc_fragColor;", i.glslVersion === "300 es" ? "" : "#define gl_FragColor pc_fragColor", "#define gl_FragDepthEXT gl_FragDepth", "#define texture2D texture", "#define textureCube texture", "#define texture2DProj textureProj", "#define texture2DLodEXT textureLod", "#define texture2DProjLodEXT textureProjLod", "#define textureCubeLodEXT textureLod", "#define texture2DGradEXT textureGrad", "#define texture2DProjGradEXT textureProjGrad", "#define textureCubeGradEXT textureGrad"].join("\n") + "\n" + y);

        const b = M + y + h

	// create and compile shader
          , w = create_and_compile_shader(a, 35633, M + _ + c)
          , S = create_and_compile_shader(a, 35632, b);

	// attach shader
        if (a.attachShader(x, w),
        a.attachShader(x, S),

        void 0 !== i.index0AttributeName ? a.bindAttribLocation(x, 0, i.index0AttributeName) : !0 === i.morphTargets && a.bindAttribLocation(x, 0, "position"),

	// link program
        a.linkProgram(x),

	// check shader errors
        t.debug.checkShaderErrors) {
            const t = a.getProgramInfoLog(x).trim()
              , e = a.getShaderInfoLog(w).trim()
              , i = a.getShaderInfoLog(S).trim();
            let n = !0
              , r = !0;
            if (!1 === a.getProgramParameter(x, 35714)) {
                n = !1;
                const e = ss(a, w, "vertex")
                  , i = ss(a, S, "fragment");
                console.error("THREE.WebGLProgram: Shader Error " + a.getError() + " - VALIDATE_STATUS " + a.getProgramParameter(x, 35715) + "\n\nProgram Info Log: " + t + "\n" + e + "\n" + i)
            } else
                "" !== t ? console.warn("THREE.WebGLProgram: Program Info Log:", t) : "" !== e && "" !== i || (r = !1);
            r && (this.diagnostics = {
                runnable: n,
                programLog: t,
                vertexShader: {
                    log: e,
                    prefix: _
                },
                fragmentShader: {
                    log: i,
                    prefix: y
                }
            })
        }

        let T, A;

	// delete shader
        return a.deleteShader(w),
        a.deleteShader(S),

	// uniforms
        this.getUniforms = function() {
            return void 0 === T && (T = new is(a,x)),
            T
        }
        ,

	// attributes
        this.getAttributes = function() {
            return void 0 === A && (A = function(t, e) {
                const i = {}
                  , n = t.getProgramParameter(e, 35721);
                for (let r = 0; r < n; r++) {
                    const n = t.getActiveAttrib(e, r)
                      , s = n.name;
                    let a = 1;
                    35674 === n.type && (a = 2),
                    35675 === n.type && (a = 3),
                    35676 === n.type && (a = 4),
                    i[s] = {
                        type: n.type,
                        location: t.getAttribLocation(e, s),
                        locationSize: a
                    }
                }
                return i
            }(a, x)),
            A
        }
        ,
        this.destroy = function() {
            n.releaseStatesOfProgram(this),
            a.deleteProgram(x),
            this.program = void 0
        }
        ,
        this.name = i.shaderName,
        this.id = rs++,
        this.cacheKey = e,
        this.usedTimes = 1,
        this.program = x,
        this.vertexShader = w,
        this.fragmentShader = S,
        this
    }
    let _s = 0;
// shading?
    class ys {
        constructor() {
            this.shaderCache = new Map,
            this.materialCache = new Map
        }
    }
// shading?
    class Ms {
        constructor(t) {
            this.id = _s++,
            this.code = t,
            this.usedTimes = 0
        }
    }
// shading/rendering
    function bs(t, e, i, n, r, s, a) {
        //const o = new He
        const c = new ys
          , h = []
          , u = r.isWebGL2
          , d = r.logarithmicDepthBuffer
          , p = r.vertexTextures;
        let m = r.precision;
        const f = {
            MeshDepthMaterial: "depth",
            MeshDistanceMaterial: "distanceRGBA",
            MeshNormalMaterial: "normal",
            MeshBasicMaterial: "basic",
            MeshLambertMaterial: "lambert",
            MeshPhongMaterial: "phong",
            MeshStandardMaterial: "physical",
            PointsMaterial: "points",
            SpriteMaterial: "sprite"
        };
        return {
            getParameters: function(s, o, h, g, v) {
                const x = g.fog
                  , _ = v.geometry
                  , y = s.isMeshStandardMaterial ? g.environment : null
                  , M = (s.isMeshStandardMaterial ? i : e).get(s.envMap || y)
                  , b = M && M.mapping === l ? M.image.height : null
                  , w = f[s.type];
                null !== s.precision && (m = r.getMaxPrecision(s.precision),
                m !== s.precision && console.warn("THREE.WebGLProgram.getParameters:", s.precision, "not supported, using", m, "instead."));
                const S = _.morphAttributes.position || _.morphAttributes.normal || _.morphAttributes.color
                  , T = void 0 !== S ? S.length : 0;
                let A, E, C, L, R = 0;
                if (void 0 !== _.morphAttributes.position && (R = 1),
                void 0 !== _.morphAttributes.normal && (R = 2),
                void 0 !== _.morphAttributes.color && (R = 3),
                w) {
                    const t = Mn[w];
                    A = t.vertexShader,
                    E = t.fragmentShader
                } else
                    A = s.vertexShader,
                    E = s.fragmentShader,
                    c.update(s),
                    C = c.getVertexShaderID(s),
                    L = c.getFragmentShaderID(s);
                const P = t.getRenderTarget()
                  , I = s.alphaTest > 0
                  , D = s.clearcoat > 0
                  , N = s.iridescence > 0;
                return {
                    isWebGL2: u,
                    shaderID: w,
                    shaderName: s.type,
                    vertexShader: A,
                    fragmentShader: E,
                    defines: s.defines,
                    customVertexShaderID: C,
                    customFragmentShaderID: L,
                    isRawShaderMaterial: !0 === s.isRawShaderMaterial,
                    glslVersion: s.glslVersion,
                    precision: m,
                    instancing: !0 === v.isInstancedMesh,
                    instancingColor: !0 === v.isInstancedMesh && null !== v.instanceColor,
                    supportsVertexTextures: p,
                    outputEncoding: null === P ? t.outputEncoding : !0 === P.isXRRenderTarget ? P.texture.encoding : at,
                    map: !!s.map,
                    matcap: !!s.matcap,
                    envMap: !!M,
                    envMapMode: M && M.mapping,
                    envMapCubeUVHeight: b,
                    lightMap: !!s.lightMap,
                    aoMap: !!s.aoMap,
                    emissiveMap: !!s.emissiveMap,
                    bumpMap: !!s.bumpMap,
                    normalMap: !!s.normalMap,
                    objectSpaceNormalMap: 1 === s.normalMapType,
                    tangentSpaceNormalMap: 0 === s.normalMapType,
                    decodeVideoTexture: !!s.map && !0 === s.map.isVideoTexture && s.map.encoding === ot,
                    clearcoat: D,
                    clearcoatMap: D && !!s.clearcoatMap,
                    clearcoatRoughnessMap: D && !!s.clearcoatRoughnessMap,
                    clearcoatNormalMap: D && !!s.clearcoatNormalMap,
                    iridescence: N,
                    iridescenceMap: N && !!s.iridescenceMap,
                    iridescenceThicknessMap: N && !!s.iridescenceThicknessMap,
                    displacementMap: !!s.displacementMap,
                    roughnessMap: !!s.roughnessMap,
                    metalnessMap: !!s.metalnessMap,
                    specularMap: !!s.specularMap,
                    specularIntensityMap: !!s.specularIntensityMap,
                    specularColorMap: !!s.specularColorMap,
                    opaque: !1 === s.transparent && 1 === s.blending,
                    alphaMap: !!s.alphaMap,
                    alphaTest: I,
                    gradientMap: !!s.gradientMap,
                    sheen: s.sheen > 0,
                    sheenColorMap: !!s.sheenColorMap,
                    sheenRoughnessMap: !!s.sheenRoughnessMap,
                    transmission: s.transmission > 0,
                    transmissionMap: !!s.transmissionMap,
                    thicknessMap: !!s.thicknessMap,
                    combine: s.combine,
                    vertexTangents: !!s.normalMap && !!_.attributes.tangent,
                    vertexColors: s.vertexColors,
                    vertexAlphas: !0 === s.vertexColors && !!_.attributes.color && 4 === _.attributes.color.itemSize,
                    vertexUvs: !!(s.map || s.bumpMap || s.normalMap || s.specularMap || s.alphaMap || s.emissiveMap || s.roughnessMap || s.metalnessMap || s.clearcoatMap || s.clearcoatRoughnessMap || s.clearcoatNormalMap || s.iridescenceMap || s.iridescenceThicknessMap || s.displacementMap || s.transmissionMap || s.thicknessMap || s.specularIntensityMap || s.specularColorMap || s.sheenColorMap || s.sheenRoughnessMap),
                    uvsVertexOnly: !(s.map || s.bumpMap || s.normalMap || s.specularMap || s.alphaMap || s.emissiveMap || s.roughnessMap || s.metalnessMap || s.clearcoatNormalMap || s.iridescenceMap || s.iridescenceThicknessMap || s.transmission > 0 || s.transmissionMap || s.thicknessMap || s.specularIntensityMap || s.specularColorMap || s.sheen > 0 || s.sheenColorMap || s.sheenRoughnessMap || !s.displacementMap),
                    fog: !!x,
                    useFog: !0 === s.fog,
                    fogExp2: x && x.isFogExp2,
                    flatShading: !!s.flatShading,
                    sizeAttenuation: s.sizeAttenuation,
                    logarithmicDepthBuffer: d,
                    morphTargets: void 0 !== _.morphAttributes.position,
                    morphNormals: void 0 !== _.morphAttributes.normal,
                    morphColors: void 0 !== _.morphAttributes.color,
                    morphTargetsCount: T,
                    morphTextureStride: R,
                    numDirLights: o.directional.length,
                    numPointLights: o.point.length,
                    numSpotLights: o.spot.length,
                    numRectAreaLights: o.rectArea.length,
                    numHemiLights: o.hemi.length,
                    numDirLightShadows: o.directionalShadowMap.length,
                    numPointLightShadows: o.pointShadowMap.length,
                    numSpotLightShadows: o.spotShadowMap.length,
                    numClippingPlanes: a.numPlanes,
                    numClipIntersection: a.numIntersection,
                    dithering: s.dithering,
                    shadowMapEnabled: t.shadowMap.enabled && h.length > 0,
                    shadowMapType: t.shadowMap.type,
                    toneMapping: s.toneMapped ? t.toneMapping : 0,
                    physicallyCorrectLights: t.physicallyCorrectLights,
                    premultipliedAlpha: s.premultipliedAlpha,
                    doubleSided: 2 === s.side,
                    flipSided: 1 === s.side,
                    useDepthPacking: !!s.depthPacking,
                    depthPacking: s.depthPacking || 0,
                    index0AttributeName: s.index0AttributeName,
                    extensionDerivatives: s.extensions && s.extensions.derivatives,
                    extensionFragDepth: s.extensions && s.extensions.fragDepth,
                    extensionDrawBuffers: s.extensions && s.extensions.drawBuffers,
                    extensionShaderTextureLOD: s.extensions && s.extensions.shaderTextureLOD,
                    rendererExtensionFragDepth: u || n.has("EXT_frag_depth"),
                    rendererExtensionDrawBuffers: u || n.has("WEBGL_draw_buffers"),
                    rendererExtensionShaderTextureLod: u || n.has("EXT_shader_texture_lod"),
                    customProgramCacheKey: s.customProgramCacheKey()
                }
            },
            getProgramCacheKey: function(e) {
                const i = [];
                if (e.shaderID ? i.push(e.shaderID) : (i.push(e.customVertexShaderID),
                i.push(e.customFragmentShaderID)),
                void 0 !== e.defines)
                    for (const t in e.defines)
                        i.push(t),
                        i.push(e.defines[t]);
                return !1 === e.isRawShaderMaterial && (!function(t, e) {
                    t.push(e.precision),
                    t.push(e.outputEncoding),
                    t.push(e.envMapMode),
                    t.push(e.envMapCubeUVHeight),
                    t.push(e.combine),
                    t.push(e.vertexUvs),
                    t.push(e.fogExp2),
                    t.push(e.sizeAttenuation),
                    t.push(e.morphTargetsCount),
                    t.push(e.morphAttributeCount),
                    t.push(e.numDirLights),
                    t.push(e.numPointLights),
                    t.push(e.numSpotLights),
                    t.push(e.numHemiLights),
                    t.push(e.numRectAreaLights),
                    t.push(e.numDirLightShadows),
                    t.push(e.numPointLightShadows),
                    t.push(e.numSpotLightShadows),
                    t.push(e.shadowMapType),
                    t.push(e.toneMapping),
                    t.push(e.numClippingPlanes),
                    t.push(e.numClipIntersection),
                    t.push(e.depthPacking)
                }(i, e),
                function(t, e) {
                }(i, e),
                i.push(t.outputEncoding)),
                i.push(e.customProgramCacheKey),
                i.join()
            },
            getUniforms: function(t) {
                const e = f[t.type];
                let i;
                if (e) {
                    const t = Mn[e];
                    i = tn.clone(t.uniforms)
                } else
                    i = t.uniforms;
                return i
            },
            acquireProgram: function(e, i) {
                let n;
                for (let t = 0, e = h.length; t < e; t++) {
                    const e = h[t];
                    if (e.cacheKey === i) {
                        n = e,
                        ++n.usedTimes;
                        break
                    }
                }
                return void 0 === n && (n = new shading(t,i,e,s),
                h.push(n)),
                n
            },
            releaseProgram: function(t) {
                if (0 == --t.usedTimes) {
                    const e = h.indexOf(t);
                    h[e] = h[h.length - 1],
                    h.pop(),
                    t.destroy()
                }
            },
            releaseShaderCache: function(t) {
                c.remove(t)
            },
            programs: h,
            dispose: function() {
                c.dispose()
            }
        }
    }
// WeakMap
    function ws() {
        let t = new WeakMap;
        return {
            get: function(e) {
                let i = t.get(e);
                return void 0 === i && (i = {},
                t.set(e, i)),
                i
            },
        }
    }
// groupOrder?
    function Ss(t, e) {
        return t.groupOrder !== e.groupOrder ? t.groupOrder - e.groupOrder : t.renderOrder !== e.renderOrder ? t.renderOrder - e.renderOrder : t.material.id !== e.material.id ? t.material.id - e.material.id : t.z !== e.z ? t.z - e.z : t.id - e.id
    }
// groupOrder?
    function Ts(t, e) {
        return t.groupOrder !== e.groupOrder ? t.groupOrder - e.groupOrder : t.renderOrder !== e.renderOrder ? t.renderOrder - e.renderOrder : t.z !== e.z ? e.z - t.z : t.id - e.id
    }
// groupOrder?
    function As() {
        const t = [];
        let e = 0;
        const i = []
          , n = []
          , r = [];
        function s(i, n, r, s, a, o) {
            let l = t[e];
            return void 0 === l ? (l = {
                id: i.id,
                object: i,
                geometry: n,
                material: r,
                groupOrder: s,
                renderOrder: i.renderOrder,
                z: a,
                group: o
            },
            t[e] = l) : (l.id = i.id,
            l.object = i,
            l.geometry = n,
            l.material = r,
            l.groupOrder = s,
            l.renderOrder = i.renderOrder,
            l.z = a,
            l.group = o),
            e++,
            l
        }
        return {
            opaque: i,
            transmissive: n,
            transparent: r,
            init: function() {
                e = 0,
                i.length = 0,
                n.length = 0,
                r.length = 0
            },
            push: function(t, e, a, o, l, c) {
                const h = s(t, e, a, o, l, c);
                a.transmission > 0 ? n.push(h) : !0 === a.transparent ? r.push(h) : i.push(h)
            },
            unshift: function(t, e, a, o, l, c) {
                const h = s(t, e, a, o, l, c);
                a.transmission > 0 ? n.unshift(h) : !0 === a.transparent ? r.unshift(h) : i.unshift(h)
            },
            finish: function() {
                for (let i = e, n = t.length; i < n; i++) {
                    const e = t[i];
                    if (null === e.id)
                        break;
                    e.id = null,
                    e.object = null,
                    e.geometry = null,
                    e.material = null,
                    e.group = null
                }
            },
            sort: function(t, e) {
                i.length > 1 && i.sort(t || Ss),
                n.length > 1 && n.sort(e || Ts),
                r.length > 1 && r.sort(e || Ts)
            }
        }
    }
// ???
    function Es() {
        let t = new WeakMap;
        return {
            get: function(e, i) {
                let n;
                return !1 === t.has(e) ? (n = new As,
                t.set(e, [n])) : i >= t.get(e).length ? (n = new As,
                t.get(e).push(n)) : n = t.get(e)[i],
                n
            },
            dispose: function() {
                t = new WeakMap
            }
        }
    }
// lights
    function Cs() {
        const t = {};
        return {
            get: function(e) {
                if (void 0 !== t[e.id])
                    return t[e.id];
                let i;
                switch (e.type) {
                case "DirectionalLight":
                    i = {
                        direction: new ee,
                        color: new THREE.Color
                    };
                    break;
                case "SpotLight":
                    i = {
                        position: new ee,
                        direction: new ee,
                        color: new THREE.Color,
                        distance: 0,
                        coneCos: 0,
                        penumbraCos: 0,
                        decay: 0
                    };
                    break;
                case "PointLight":
                    i = {
                        position: new ee,
                        color: new THREE.Color,
                        distance: 0,
                        decay: 0
                    }
                }
                return t[e.id] = i,
                i
            }
        }
    }
    let Ls = 0;
// lights/shadows?
    function Ps(t, e) {
        const i = new Cs
          , n = function() {
            const t = {};
            return {
                get: function(e) {
                    if (void 0 !== t[e.id])
                        return t[e.id];
                    let i;
                    return t[e.id] = i,
                    i
                }
            }
        }()
          , r = {
            version: 0,
            hash: {
                directionalLength: -1,
                pointLength: -1,
                spotLength: -1,
                rectAreaLength: -1,
                hemiLength: -1,
                numDirectionalShadows: -1,
                numPointShadows: -1,
                numSpotShadows: -1
            },
            ambient: [0, 0, 0],
            probe: [],
            directional: [],
            directionalShadow: [],
            directionalShadowMap: [],
            directionalShadowMatrix: [],
            spot: [],
            spotShadow: [],
            spotShadowMap: [],
            spotShadowMatrix: [],
            rectArea: [],
            rectAreaLTC1: null,
            rectAreaLTC2: null,
            point: [],
            pointShadow: [],
            pointShadowMap: [],
            pointShadowMatrix: [],
            hemi: []
        };
        for (let t = 0; t < 9; t++)
            r.probe.push(new ee);
        const s = new ee
          , a = new Ie
          , o = new Ie;
        return {
            setup: function(s, a) {
                let o = 0
                  , l = 0
                  , c = 0;
                for (let t = 0; t < 9; t++)
                    r.probe[t].set(0, 0, 0);
                let h = 0
                  , u = 0
                  , d = 0
                  , p = 0
                  , m = 0
                  , f = 0
                  , g = 0
                  , v = 0;
                const x = !0 !== a ? Math.PI : 1;
                for (let t = 0, e = s.length; t < e; t++) {
                    const e = s[t]
                      , a = e.color
                      , _ = e.intensity
                      , y = e.distance
                      , M = e.shadow && e.shadow.map ? e.shadow.map.texture : null;
                    if (e.isAmbientLight)
                        o += a.r * _ * x,
                        l += a.g * _ * x,
                        c += a.b * _ * x;
                    else if (e.isLightProbe)
                        for (let t = 0; t < 9; t++)
                            r.probe[t].addScaledVector(e.sh.coefficients[t], _);
                    else if (e.isDirectionalLight) {
                        const t = i.get(e);
                        if (t.color.copy(e.color).multiplyScalar(e.intensity * x),
                        e.castShadow) {
                            const t = e.shadow
                              , i = n.get(e);
                            i.shadowBias = t.bias,
                            i.shadowNormalBias = t.normalBias,
                            i.shadowRadius = t.radius,
                            i.shadowMapSize = t.mapSize,
                            r.directionalShadow[h] = i,
                            r.directionalShadowMap[h] = M,
                            r.directionalShadowMatrix[h] = e.shadow.matrix,
                            f++
                        }
                        r.directional[h] = t,
                        h++
                    } else if (e.isSpotLight) {
                        const t = i.get(e);
                        if (t.position.setFromMatrixPosition(e.matrixWorld),
                        t.color.copy(a).multiplyScalar(_ * x),
                        t.distance = y,
                        t.coneCos = Math.cos(e.angle),
                        t.penumbraCos = Math.cos(e.angle * (1 - e.penumbra)),
                        t.decay = e.decay,
                        e.castShadow) {
                            const t = e.shadow
                              , i = n.get(e);
                            i.shadowBias = t.bias,
                            i.shadowNormalBias = t.normalBias,
                            i.shadowRadius = t.radius,
                            i.shadowMapSize = t.mapSize,
                            r.spotShadow[d] = i,
                            r.spotShadowMap[d] = M,
                            r.spotShadowMatrix[d] = e.shadow.matrix,
                            v++
                        }
                        r.spot[d] = t,
                        d++
                    } else if (e.isRectAreaLight) {
                        const t = i.get(e);
                        t.color.copy(a).multiplyScalar(_),
                        t.halfWidth.set(.5 * e.width, 0, 0),
                        t.halfHeight.set(0, .5 * e.height, 0),
                        r.rectArea[p] = t,
                        p++
                    } else if (e.isPointLight) {
                        const t = i.get(e);
                        if (t.color.copy(e.color).multiplyScalar(e.intensity * x),
                        t.distance = e.distance,
                        t.decay = e.decay,
                        e.castShadow) {
                            const t = e.shadow
                              , i = n.get(e);
                            i.shadowBias = t.bias,
                            i.shadowNormalBias = t.normalBias,
                            i.shadowRadius = t.radius,
                            i.shadowMapSize = t.mapSize,
                            i.shadowCameraNear = t.camera.near,
                            i.shadowCameraFar = t.camera.far,
                            r.pointShadow[u] = i,
                            r.pointShadowMap[u] = M,
                            r.pointShadowMatrix[u] = e.shadow.matrix,
                            g++
                        }
                        r.point[u] = t,
                        u++
                    } else if (e.isHemisphereLight) {
                        const t = i.get(e);
                        t.skyColor.copy(e.color).multiplyScalar(_ * x),
                        t.groundColor.copy(e.groundColor).multiplyScalar(_ * x),
                        r.hemi[m] = t,
                        m++
                    }
                }
                p > 0 && (e.isWebGL2 || !0 === t.has("OES_texture_float_linear") ? (r.rectAreaLTC1 = yn.LTC_FLOAT_1,
                r.rectAreaLTC2 = yn.LTC_FLOAT_2) : !0 === t.has("OES_texture_half_float_linear") ? (r.rectAreaLTC1 = yn.LTC_HALF_1,
                r.rectAreaLTC2 = yn.LTC_HALF_2) : console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),
                r.ambient[0] = o,
                r.ambient[1] = l,
                r.ambient[2] = c;
                const _ = r.hash;
                _.directionalLength === h && _.pointLength === u && _.spotLength === d && _.rectAreaLength === p && _.hemiLength === m && _.numDirectionalShadows === f && _.numPointShadows === g && _.numSpotShadows === v || (r.directional.length = h,
                r.spot.length = d,
                r.rectArea.length = p,
                r.point.length = u,
                r.hemi.length = m,
                r.directionalShadow.length = f,
                r.directionalShadowMap.length = f,
                r.pointShadow.length = g,
                r.pointShadowMap.length = g,
                r.spotShadow.length = v,
                r.spotShadowMap.length = v,
                r.directionalShadowMatrix.length = f,
                r.pointShadowMatrix.length = g,
                r.spotShadowMatrix.length = v,
                _.directionalLength = h,
                _.pointLength = u,
                _.spotLength = d,
                _.rectAreaLength = p,
                _.hemiLength = m,
                _.numDirectionalShadows = f,
                _.numPointShadows = g,
                _.numSpotShadows = v,
                r.version = Ls++)
            },
            setupView: function(t, e) {
                let i = 0
                  , n = 0
                  , l = 0
                  , c = 0
                  , h = 0;
                const u = e.matrixWorldInverse;
                for (let e = 0, d = t.length; e < d; e++) {
                    const d = t[e];
                    if (d.isDirectionalLight) {
                        const t = r.directional[i];
                        t.direction.setFromMatrixPosition(d.matrixWorld),
                        s.setFromMatrixPosition(d.target.matrixWorld),
                        t.direction.sub(s),
                        t.direction.transformDirection(u),
                        i++
                    } else if (d.isSpotLight) {
                        const t = r.spot[l];
                        t.position.setFromMatrixPosition(d.matrixWorld),
                        t.position.applyMatrix4(u),
                        t.direction.setFromMatrixPosition(d.matrixWorld),
                        s.setFromMatrixPosition(d.target.matrixWorld),
                        t.direction.sub(s),
                        t.direction.transformDirection(u),
                        l++
                    } else if (d.isRectAreaLight) {
                        const t = r.rectArea[c];
                        t.position.setFromMatrixPosition(d.matrixWorld),
                        t.position.applyMatrix4(u),
                        o.identity(),
                        a.copy(d.matrixWorld),
                        a.premultiply(u),
                        o.extractRotation(a),
                        t.halfWidth.set(.5 * d.width, 0, 0),
                        t.halfHeight.set(0, .5 * d.height, 0),
                        t.halfWidth.applyMatrix4(o),
                        t.halfHeight.applyMatrix4(o),
                        c++
                    } else if (d.isPointLight) {
                        const t = r.point[n];
                        t.position.setFromMatrixPosition(d.matrixWorld),
                        t.position.applyMatrix4(u),
                        n++
                    } else if (d.isHemisphereLight) {
                        const t = r.hemi[h];
                        t.direction.setFromMatrixPosition(d.matrixWorld),
                        t.direction.transformDirection(u),
                        h++
                    }
                }
            },
            state: r
        }
    }
// rendering lights?
    function Is(t, e) {
        const i = new Ps(t,e)
          , n = []
          , r = [];
        return {
            init: function() {
                n.length = 0,
                r.length = 0
            },
            state: {
                lightsArray: n,
                shadowsArray: r,
                lights: i
            },
            setupLights: function(t) {
                i.setup(n, t)
            },
            setupLightsView: function(t) {
                i.setupView(n, t)
            },
            pushLight: function(t) {
                n.push(t)
            },
        }
    }
// some kind of array... ?
    function Ds(t, e) {
        let i = new WeakMap;
        return {
            get: function(n, r=0) {
                let s;
                return !1 === i.has(n) ? (s = new Is(t,e),
                i.set(n, [s])) : r >= i.get(n).length ? (s = new Is(t,e),
                i.get(n).push(s)) : s = i.get(n)[r],
                s
            },
            dispose: function() {
                i = new WeakMap
            }
        }
    }
// rendering/shading?
    function Os(t, e, i) {
        let n = new fn;
        const r = new Et
          , s = new Et
          , a = new Jt
          , c = {}
          , h = i.maxTextureSize
          , u = {
            0: 1,
            1: 0,
            2: 2
        }
          , p = new en({
            defines: {
                VSM_SAMPLES: 8
            },
            uniforms: {
                shadow_pass: {
                    value: null
                },
                resolution: {
                    value: new Et
                },
                radius: {
                    value: 4
                }
            },
            vertexShader: "void main() {\n\tgl_Position = vec4( position, 1.0 );\n}",
            fragmentShader: "uniform sampler2D shadow_pass;\nuniform vec2 resolution;\nuniform float radius;\n#include <packing>\nvoid main() {\n\tconst float samples = float( VSM_SAMPLES );\n\tfloat mean = 0.0;\n\tfloat squared_mean = 0.0;\n\tfloat uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );\n\tfloat uvStart = samples <= 1.0 ? 0.0 : - 1.0;\n\tfor ( float i = 0.0; i < samples; i ++ ) {\n\t\tfloat uvOffset = uvStart + i * uvStride;\n\t\t#ifdef HORIZONTAL_PASS\n\t\t\tvec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );\n\t\t\tmean += distribution.x;\n\t\t\tsquared_mean += distribution.y * distribution.y + distribution.x * distribution.x;\n\t\t#else\n\t\t\tfloat depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );\n\t\t\tmean += depth;\n\t\t\tsquared_mean += depth * depth;\n\t\t#endif\n\t}\n\tmean = mean / samples;\n\tsquared_mean = squared_mean / samples;\n\tfloat std_dev = sqrt( squared_mean - mean * mean );\n\tgl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );\n}"
        })
          , m = p.clone();
        m.defines.HORIZONTAL_PASS = 1;
        const f = new THREE.BufferGeometry;
        f.setAttribute("position", new yi(new Float32Array([-1, -1, .5, 3, -1, .5, -1, 3, .5]),3));
        const g = new Zi(f,p)
          , v = this;

	// render buffer
        function x(i, n) {
            const s = e.update(g);
            p.defines.VSM_SAMPLES !== i.blurSamples && (p.defines.VSM_SAMPLES = i.blurSamples,
            m.defines.VSM_SAMPLES = i.blurSamples,
            p.needsUpdate = !0,
            m.needsUpdate = !0),
            null === i.mapPass && (i.mapPass = new Kt(r.x,r.y)),
            p.uniforms.shadow_pass.value = i.map.texture,
            p.uniforms.resolution.value = i.mapSize,
            p.uniforms.radius.value = i.radius,
            t.setRenderTarget(i.mapPass),
            t.clear(),
            t.renderBufferDirect(n, null, s, p, g, null),
            m.uniforms.shadow_pass.value = i.mapPass.texture,
            m.uniforms.resolution.value = i.mapSize,
            m.uniforms.radius.value = i.radius,
            t.setRenderTarget(i.map),
            t.clear(),
            t.renderBufferDirect(n, null, s, m, g, null)
        }
        function _(e, i, n, r, s, a) {
            let h = null;
            const d = !0 === n.isPointLight ? e.customDistanceMaterial : e.customDepthMaterial;
            if (h = void 0 !== d ? d : !0 === n.isPointLight ? l : o,
            t.localClippingEnabled && !0 === i.clipShadows && Array.isArray(i.clippingPlanes) && 0 !== i.clippingPlanes.length || i.displacementMap && 0 !== i.displacementScale || i.alphaMap && i.alphaTest > 0) {
                const t = h.uuid
                  , e = i.uuid;
                let n = c[t];
                void 0 === n && (n = {},
                c[t] = n);
                let r = n[e];
                void 0 === r && (r = h.clone(),
                n[e] = r),
                h = r
            }
            return h.visible = i.visible,
            h.wireframe = i.wireframe,
            h.side = 3 === a ? null !== i.shadowSide ? i.shadowSide : i.side : null !== i.shadowSide ? i.shadowSide : u[i.side],
            h.alphaMap = i.alphaMap,
            h.alphaTest = i.alphaTest,
            h.clipShadows = i.clipShadows,
            h.clippingPlanes = i.clippingPlanes,
            h.clipIntersection = i.clipIntersection,
            h.displacementMap = i.displacementMap,
            h.displacementScale = i.displacementScale,
            h.displacementBias = i.displacementBias,
            h.wireframeLinewidth = i.wireframeLinewidth,
            h.linewidth = i.linewidth,
            !0 === n.isPointLight && !0 === h.isMeshDistanceMaterial && (h.referencePosition.setFromMatrixPosition(n.matrixWorld),
            h.nearDistance = r,
            h.farDistance = s),
            h
        }

	// render buffer
        function y(i, r, s, a, o) {
            if (!1 === i.visible)
                return;
	    if ((i.isMesh || i.isLine || i.isPoints) && (i.castShadow || i.receiveShadow && 3 === o) && (!i.frustumCulled || n.intersectsObject(i))) {
                i.modelViewMatrix.multiplyMatrices(s.matrixWorldInverse, i.matrixWorld);
                const n = e.update(i)
                  , r = i.material;
                if (Array.isArray(r)) {
                    const e = n.groups;
                    for (let l = 0, c = e.length; l < c; l++) {
                        const c = e[l]
                          , h = r[c.materialIndex];
                        if (h && h.visible) {
                            const e = _(i, h, a, s.near, s.far, o);
                            t.renderBufferDirect(s, null, n, e, i, c)
                        }
                    }
                } else if (r.visible) {
                    const e = _(i, r, a, s.near, s.far, o);
                    t.renderBufferDirect(s, null, n, e, i, null)
                }
            }
            const l = i.children;
            for (let t = 0, e = l.length; t < e; t++)
                y(l[t], r, s, a, o)
        }

        this.enabled = !1,
        this.autoUpdate = !0,
        this.needsUpdate = !1,
        this.type = 1,

	// render
        this.render = function(e, i, o) {
            if (!1 === v.enabled)
                return;
            if (!1 === v.autoUpdate && !1 === v.needsUpdate)
                return;
            if (0 === e.length)
                return;
            const l = t.getRenderTarget()
              , c = t.getActiveCubeFace()
              , u = t.getActiveMipmapLevel()
              , p = t.state;
            p.setBlending(0),
            p.buffers.color.setClear(1, 1, 1, 1),
            p.buffers.depth.setTest(!0),
            p.setScissorTest(!1);
            for (let l = 0, c = e.length; l < c; l++) {
                const c = e[l]
                  , u = c.shadow;
                if (void 0 === u) {
                    console.warn("THREE.WebGLShadowMap:", c, "has no shadow.");
                    continue
                }
                if (!1 === u.autoUpdate && !1 === u.needsUpdate)
                    continue;
                r.copy(u.mapSize);
                const m = u.getFrameExtents();
                if (r.multiply(m),
                s.copy(u.mapSize),
                (r.x > h || r.y > h) && (r.x > h && (s.x = Math.floor(h / m.x),
                r.x = s.x * m.x,
                u.mapSize.x = s.x),
                r.y > h && (s.y = Math.floor(h / m.y),
                r.y = s.y * m.y,
                u.mapSize.y = s.y)),
                null === u.map) {
                    const t = 3 !== this.type ? {
                        minFilter: d,
                        magFilter: d
                    } : {};
                    u.map = new Kt(r.x,r.y,t),
                    u.map.texture.name = c.name + ".shadowMap",
                    u.camera.updateProjectionMatrix()
                }
                t.setRenderTarget(u.map),
                t.clear();
                const f = u.getViewportCount();
                for (let t = 0; t < f; t++) {
                    const e = u.getViewport(t);
                    a.set(s.x * e.x, s.y * e.y, s.x * e.z, s.y * e.w),
                    p.viewport(a),
                    u.updateMatrices(c, t),
                    n = u.getFrustum(),
                    y(i, o, u.camera, c, this.type)
                }
                !0 !== u.isPointLightShadow && 3 === this.type && x(u, o),
                u.needsUpdate = !1
            }
            v.needsUpdate = !1,
            t.setRenderTarget(l, c, u)
        }
    }
// rendering?
    function Us(t, e, n) {
        const r = n.isWebGL2;

	// color?
        const s = new function() {
            let e = !1;
            const i = new Jt;
            let n = null;
            const r = new Jt(0,0,0,0);
            return {
                setMask: function(i) {
                    n === i || e || (t.colorMask(i, i, i, i),
                    n = i)
                },
                setLocked: function(t) {
                    e = t
                },
                setClear: function(e, n, s, a, o) {
                    !0 === o && (e *= a,
                    n *= a,
                    s *= a),
                    i.set(e, n, s, a),
                    !1 === r.equals(i) && (t.clearColor(e, n, s, a),
                    r.copy(i))
                },
                reset: function() {
                    e = !1,
                    n = null,
                    r.set(-1, 0, 0, 0)
                }
            }
        }
          , a = new function() {
            let e = !1
              , i = null
              , n = null
              , r = null;
            return {
                setTest: function(t) {
                    t ? G(2929) : V(2929)
                },
                setMask: function(n) {
                    i === n || e || (t.depthMask(n),
                    i = n)
                },
                setFunc: function(e) {
                    if (n !== e) {
                        if (e)
                            switch (e) {
                            case 0:
                                t.depthFunc(512);
                                break;
                            case 1:
                                t.depthFunc(519);
                                break;
                            case 2:
                                t.depthFunc(513);
                                break;
                            case 3:
                            default:
                                t.depthFunc(515);
                                break;
                            case 4:
                                t.depthFunc(514);
                                break;
                            case 5:
                                t.depthFunc(518);
                                break;
                            case 6:
                                t.depthFunc(516);
                                break;
                            case 7:
                                t.depthFunc(517)
                            }
                        else
                            t.depthFunc(515);
                        n = e
                    }
                },
                setLocked: function(t) {
                    e = t
                },
                setClear: function(e) {
                    r !== e && (t.clearDepth(e),
                    r = e)
                },
                reset: function() {
                    e = !1,
                    i = null,
                    n = null,
                    r = null
                }
            }
        }
          , o = new function() {
            let e = !1
              , i = null
              , n = null
              , r = null
              , s = null
              , a = null
              , o = null
              , l = null
              , c = null;
            return {
                setTest: function(t) {
                    e || (t ? G(2960) : V(2960))
                },
                setMask: function(n) {
                    i === n || e || (t.stencilMask(n),
                    i = n)
                },
                setFunc: function(e, i, a) {
                    n === e && r === i && s === a || (t.stencilFunc(e, i, a),
                    n = e,
                    r = i,
                    s = a)
                },
                setOp: function(e, i, n) {
                    a === e && o === i && l === n || (t.stencilOp(e, i, n),
                    a = e,
                    o = i,
                    l = n)
                },
                setLocked: function(t) {
                    e = t
                },
                setClear: function(e) {
                    c !== e && (t.clearStencil(e),
                    c = e)
                },
                reset: function() {
                    e = !1,
                    i = null,
                    n = null,
                    r = null,
                    s = null,
                    a = null,
                    o = null,
                    l = null,
                    c = null
                }
            }
        }
          , l = new WeakMap
          , c = new WeakMap;
        let h = {}
          , u = {}
          , d = new WeakMap
          , p = []
          , m = null
          , f = !1
          , g = null
          , v = null
          , x = null
          , _ = null
          , y = null
          , M = null
          , b = null
          , w = !1
          , S = null
          , T = null
          , A = null
          , E = null
          , C = null;
        const L = t.getParameter(35661);
        let R = !1
          , P = 0;
        const I = t.getParameter(7938);
        -1 !== I.indexOf("WebGL") ? (P = parseFloat(/^WebGL (\d)/.exec(I)[1]),
        R = P >= 1) : -1 !== I.indexOf("OpenGL ES") && (P = parseFloat(/^OpenGL ES (\d)/.exec(I)[1]),
        R = P >= 2);
        let D = null
          , N = {};
        const z = t.getParameter(3088)
          , O = t.getParameter(2978)
          , U = (new Jt).fromArray(z)
          , B = (new Jt).fromArray(O);
        function F(e, i, n) {
            const r = new Uint8Array(4)
              , s = t.createTexture();
            t.bindTexture(e, s),
            t.texParameteri(e, 10241, 9728),
            t.texParameteri(e, 10240, 9728);
            for (let e = 0; e < n; e++)
                t.texImage2D(i + e, 0, 6408, 1, 1, 0, 6408, 5121, r);
            return s
        }
        const k = {};
        function G(e) {
            !0 !== h[e] && (t.enable(e),
            h[e] = !0)
        }
        function V(e) {
            !1 !== h[e] && (t.disable(e),
            h[e] = !1)
        }
        k[3553] = F(3553, 3553, 1),
        k[34067] = F(34067, 34069, 6),
        s.setClear(0, 0, 0, 1),
        a.setClear(1),
        o.setClear(0),
        G(2929),
        a.setFunc(3),
        q(!1),
        X(1),
        G(2884),
        j(0);
        const H = {
            [i]: 32774,
            101: 32778,
            102: 32779
        };
        if (r)
            H[103] = 32775,
            H[104] = 32776;
        else {
            const t = e.get("EXT_blend_minmax");
            null !== t && (H[103] = t.MIN_EXT,
            H[104] = t.MAX_EXT)
        }
        const W = {
            200: 0,
            201: 1,
            202: 768,
            204: 770,
            210: 776,
            208: 774,
            206: 772,
            203: 769,
            205: 771,
            209: 775,
            207: 773
        };
        function j(e, n, r, s, a, o, l, c) {
            if (0 !== e) {
                if (!1 === f && (G(3042),
                f = !0),
                5 === e)
                    a = a || n,
                    o = o || r,
                    l = l || s,
                    n === v && a === y || (t.blendEquationSeparate(H[n], H[a]),
                    v = n,
                    y = a),
                    r === x && s === _ && o === M && l === b || (t.blendFuncSeparate(W[r], W[s], W[o], W[l]),
                    x = r,
                    _ = s,
                    M = o,
                    b = l),
                    g = e,
                    w = null;
                else if (e !== g || c !== w) {
                    if (v === i && y === i || (t.blendEquation(32774),
                    v = i,
                    y = i),
                    c)
                        switch (e) {
                        case 1:
                            t.blendFuncSeparate(1, 771, 1, 771);
                            break;
                        case 2:
                            t.blendFunc(1, 1);
                            break;
                        case 3:
                            t.blendFuncSeparate(0, 769, 0, 1);
                            break;
                        case 4:
                            t.blendFuncSeparate(0, 768, 0, 770);
                            break;
                        }
                    else
                        switch (e) {
                        case 1:
                            t.blendFuncSeparate(770, 771, 1, 771);
                            break;
                        case 2:
                            t.blendFunc(770, 1);
                            break;
                        case 3:
                            t.blendFuncSeparate(0, 769, 0, 1);
                            break;
                        case 4:
                            t.blendFunc(0, 768);
                            break;
                        }
                    x = null,
                    _ = null,
                    M = null,
                    b = null,
                    g = e,
                    w = c
                }
            } else
                !0 === f && (V(3042),
                f = !1)
        }
// frontFace?
        function q(e) {
            S !== e && (e ? t.frontFace(2304) : t.frontFace(2305),
            S = e)
        }
// cullFace?
        function X(e) {
            0 !== e ? (G(2884),
            e !== T && (1 === e ? t.cullFace(1029) : 2 === e ? t.cullFace(1028) : t.cullFace(1032))) : V(2884),
            T = e
        }
// polygonOffset?
        function Y(e, i, n) {
            e ? (G(32823),
            E === i && C === n || (t.polygonOffset(i, n),
            E = i,
            C = n)) : V(32823)
        }
// activeTexture?
        function Z(e) {
            void 0 === e && (e = 33984 + L - 1),
            D !== e && (t.activeTexture(e),
            D = e)
        }
        return {
            buffers: {
                color: s,
                depth: a,
                stencil: o
            },
            enable: G,
            disable: V,
            bindFramebuffer: function(e, i) {
                return u[e] !== i && (t.bindFramebuffer(e, i),
                u[e] = i,
                r && (36009 === e && (u[36160] = i),
                36160 === e && (u[36009] = i)),
                !0)
            },
            drawBuffers: function(i, r) {
                let s = p
                  , a = !1;
                if (i)
                    if (s = d.get(r),
                    void 0 === s && (s = [],
                    d.set(r, s)),
                    i.isWebGLMultipleRenderTargets) {
                        const t = i.texture;
                        if (s.length !== t.length || 36064 !== s[0]) {
                            for (let e = 0, i = t.length; e < i; e++)
                                s[e] = 36064 + e;
                            s.length = t.length,
                            a = !0
                        }
                    } else
                        36064 !== s[0] && (s[0] = 36064,
                        a = !0);
                else
                    1029 !== s[0] && (s[0] = 1029,
                    a = !0);
                a && (n.isWebGL2 ? t.drawBuffers(s) : e.get("WEBGL_draw_buffers").drawBuffersWEBGL(s))
            },
            useProgram: function(e) {
                return m !== e && (t.useProgram(e),
                m = e,
                !0)
            },
            setBlending: j,
            setMaterial: function(t, e) {
                2 === t.side ? V(2884) : G(2884);
                let i = 1 === t.side;
                e && (i = !i),
                q(i),
                1 === t.blending && !1 === t.transparent ? j(0) : j(t.blending, t.blendEquation, t.blendSrc, t.blendDst, t.blendEquationAlpha, t.blendSrcAlpha, t.blendDstAlpha, t.premultipliedAlpha),
                a.setFunc(t.depthFunc),
                a.setTest(t.depthTest),
                a.setMask(t.depthWrite),
                s.setMask(t.colorWrite);
                const n = t.stencilWrite;
                o.setTest(n),
                n && (o.setMask(t.stencilWriteMask),
                o.setFunc(t.stencilFunc, t.stencilRef, t.stencilFuncMask),
                o.setOp(t.stencilFail, t.stencilZFail, t.stencilZPass)),
                Y(t.polygonOffset, t.polygonOffsetFactor, t.polygonOffsetUnits),
                !0 === t.alphaToCoverage ? G(32926) : V(32926)
            },
            setFlipSided: q,
            setCullFace: X,
            setLineWidth: function(e) {
                e !== A && (R && t.lineWidth(e),
                A = e)
            },
            setPolygonOffset: Y,
            setScissorTest: function(t) {
                t ? G(3089) : V(3089)
            },
            activeTexture: Z,
            bindTexture: function(e, i) {
                null === D && Z();
                let n = N[D];
                void 0 === n && (n = {
                    type: void 0,
                    texture: void 0
                },
                N[D] = n),
                n.type === e && n.texture === i || (t.bindTexture(e, i || k[e]),
                n.type = e,
                n.texture = i)
            },
            unbindTexture: function() {
                const e = N[D];
                void 0 !== e && void 0 !== e.type && (t.bindTexture(e.type, null),
                e.type = void 0,
                e.texture = void 0)
            },
            compressedTexImage2D: function() {
                try {
                    t.compressedTexImage2D.apply(t, arguments)
                } catch (t) {
                    console.error("THREE.WebGLState:", t)
                }
            },
            texImage2D: function() {
                try {
                    t.texImage2D.apply(t, arguments)
                } catch (t) {
                    console.error("THREE.WebGLState:", t)
                }
            },
            updateUBOMapping: function(e, i) {
                let n = c.get(i);
                void 0 === n && (n = new WeakMap,
                c.set(i, n));
                let r = n.get(e);
                void 0 === r && (r = t.getUniformBlockIndex(i, e.name),
                n.set(e, r))
            },
            uniformBlockBinding: function(e, i) {
                const n = c.get(i).get(e);
                l.get(e) !== n && (t.uniformBlockBinding(i, n, e.__bindingPointIndex),
                l.set(e, n))
            },
            texStorage2D: function() {
                try {
                    t.texStorage2D.apply(t, arguments)
                } catch (t) {
                    console.error("THREE.WebGLState:", t)
                }
            },
            texSubImage2D: function() {
                try {
                    t.texSubImage2D.apply(t, arguments)
                } catch (t) {
                    console.error("THREE.WebGLState:", t)
                }
            },
            compressedTexSubImage2D: function() {
                try {
                    t.compressedTexSubImage2D.apply(t, arguments)
                } catch (t) {
                    console.error("THREE.WebGLState:", t)
                }
            },
            scissor: function(e) {
                !1 === U.equals(e) && (t.scissor(e.x, e.y, e.z, e.w),
                U.copy(e))
            },
            viewport: function(e) {
                !1 === B.equals(e) && (t.viewport(e.x, e.y, e.z, e.w),
                B.copy(e))
            }
        }
    }
// rendering? textures?
    function Bs(t, e, i, n, r, s, a) {
        const o = r.isWebGL2
          , l = r.maxTextures
          , E = r.maxCubemapSize
          , C = r.maxTextureSize
          , L = r.maxSamples
          , R = e.has("WEBGL_multisampled_render_to_texture") ? e.get("WEBGL_multisampled_render_to_texture") : null
          , P = /OculusBrowser/g.test(navigator.userAgent)
          , I = new WeakMap;
        let D;
        const N = new WeakMap;
        let z = !1;
        try {
            z = "undefined" != typeof OffscreenCanvas && null !== new OffscreenCanvas(1,1).getContext("2d")
        } catch (t) {}

	// (offscreen) canvas?
        function O(t, e) {
            return z ? new OffscreenCanvas(t,e) : document.createElement("canvas")
        }

	// canvas?
        function U(t, e, i, n) {
            let r = 1;
            if ((t.width > n || t.height > n) && (r = n / Math.max(t.width, t.height)),
            r < 1 || !0 === e) {
                if ("undefined" != typeof HTMLImageElement && t instanceof HTMLImageElement || "undefined" != typeof HTMLCanvasElement && t instanceof HTMLCanvasElement || "undefined" != typeof ImageBitmap && t instanceof ImageBitmap) {
                    const n = e ? Tt : Math.floor
                      , s = n(r * t.width)
                      , a = n(r * t.height);
                    void 0 === D && (D = O(s, a));
                    const o = i ? O(s, a) : D;
                    o.width = s,
                    o.height = a;
                    return o.getContext("2d").drawImage(t, 0, 0, s, a),
                    console.warn("THREE.WebGLRenderer: Texture has been resized from (" + t.width + "x" + t.height + ") to (" + s + "x" + a + ")."),
                    o
                }
            }
            return t
        }
        function B(t) {
            return wt(t.width) && wt(t.height)
        }
// generateMipmaps?
        function F(t, e) {
            return t.generateMipmaps && e && t.minFilter !== d && t.minFilter !== f
        }
// generateMipmap
        function k(e) {
            t.generateMipmap(e)
        }
        function G(i, n, r, s, a=!1) {
            if (!1 === o)
                return n;
            if (null !== i) {
                if (void 0 !== t[i])
                    return t[i];
                console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '" + i + "'")
            }
            let l = n;
            return 6403 === n && (5126 === r && (l = 33326),
            5131 === r && (l = 33325),
            5121 === r && (l = 33321)),
            33319 === n && (5126 === r && (l = 33328),
            5131 === r && (l = 33327),
            5121 === r && (l = 33323)),
            6408 === n && (5126 === r && (l = 34836),
            5131 === r && (l = 34842),
            5121 === r && (l = s === 3001 && !1 === a ? 35907 : 32856),
            32819 === r && (l = 32854),
            32820 === r && (l = 32855)),
            33325 !== l && 33326 !== l && 33327 !== l && 33328 !== l && 34842 !== l && 34836 !== l || e.get("EXT_color_buffer_float"),
            l
        }
        function V(t, e, i) {
            return !0 === F(t, i) || t.isFramebufferTexture && t.minFilter !== d && t.minFilter !== f ? Math.log2(Math.max(e.width, e.height)) + 1 : void 0 !== t.mipmaps && t.mipmaps.length > 0 ? t.mipmaps.length : t.isCompressedTexture && Array.isArray(t.image) ? e.mipmaps.length : 1
        }
        function H(t) {
            return t === d || t === p || t === m ? 9728 : 9729
        }
        function j(e) {
            const i = e.target;
            i.removeEventListener("dispose", j),
            function(e) {
                const i = e.texture
                  , r = n.get(e)
                  , s = n.get(i);
                void 0 !== s.__webglTexture && (t.deleteTexture(s.__webglTexture),
                a.memory.textures--);
                e.depthTexture && e.depthTexture.dispose();
                if (e.isWebGLCubeRenderTarget)
                    for (let e = 0; e < 6; e++)
                        t.deleteFramebuffer(r.__webglFramebuffer[e]),
                        r.__webglDepthbuffer && t.deleteRenderbuffer(r.__webglDepthbuffer[e]);
                else {
                    if (t.deleteFramebuffer(r.__webglFramebuffer),
                    r.__webglDepthbuffer && t.deleteRenderbuffer(r.__webglDepthbuffer),
                    r.__webglMultisampledFramebuffer && t.deleteFramebuffer(r.__webglMultisampledFramebuffer),
                    r.__webglColorRenderbuffer)
                        for (let e = 0; e < r.__webglColorRenderbuffer.length; e++)
                            r.__webglColorRenderbuffer[e] && t.deleteRenderbuffer(r.__webglColorRenderbuffer[e]);
                    r.__webglDepthRenderbuffer && t.deleteRenderbuffer(r.__webglDepthRenderbuffer)
                }
                if (e.isWebGLMultipleRenderTargets)
                    for (let e = 0, r = i.length; e < r; e++) {
                        const r = n.get(i[e]);
                        r.__webglTexture && (t.deleteTexture(r.__webglTexture),
                        a.memory.textures--),
                        n.remove(i[e])
                    }
                n.remove(i),
                n.remove(e)
            }(i)
        }
// texture?
        function q(e) {
            const i = n.get(e);
            t.deleteTexture(i.__webglTexture);
            const r = e.source;
            delete N.get(r)[i.__cacheKey],
            a.memory.textures--
        }
        let X = 0;
        function Y(t, e) {
            const r = n.get(t);
            if (t.isVideoTexture && function(t) {
                const e = a.render.frame;
                I.get(t) !== e && (I.set(t, e),
                t.update())
            }(t),
            !1 === t.isRenderTargetTexture && t.version > 0 && r.__version !== t.version) {
                const i = t.image;
                if (null === i)
                    console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");
                else {
                    if (!1 !== i.complete)
                        return void Q(r, t, e);
                    console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete")
                }
            }
            i.activeTexture(33984 + e),
            i.bindTexture(3553, r.__webglTexture)
        }
        const Z = {
            [1000]: 10497,
            [1001]: 33071,
            [1002]: 33648
        }
          , J = {
            [1003]: 9728,
            [1004]: 9984,
            [1005]: 9986,
            [1006]: 9729,
            [1007]: 9985,
            [1008]: 9987
        };
        function K(i, s, a) {
            if (a ? (t.texParameteri(i, 10242, Z[s.wrapS]),
            t.texParameteri(i, 10243, Z[s.wrapT]),
            32879 !== i && 35866 !== i || t.texParameteri(i, 32882, Z[s.wrapR]),
            t.texParameteri(i, 10240, J[s.magFilter]),
            t.texParameteri(i, 10241, J[s.minFilter])) : (t.texParameteri(i, 10242, 33071),
            t.texParameteri(i, 10243, 33071),
            32879 !== i && 35866 !== i || t.texParameteri(i, 32882, 33071),
            s.wrapS === h && s.wrapT === h || console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),
            t.texParameteri(i, 10240, H(s.magFilter)),
            t.texParameteri(i, 10241, H(s.minFilter)),
            s.minFilter !== d && s.minFilter !== f && console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),
            !0 === e.has("EXT_texture_filter_anisotropic")) {
                const a = e.get("EXT_texture_filter_anisotropic");
                if (s.type === M && !1 === e.has("OES_texture_float_linear"))
                    return;
                if (!1 === o && s.type === b && !1 === e.has("OES_texture_half_float_linear"))
                    return;
                (s.anisotropy > 1 || n.get(s).__currentAnisotropy) && (t.texParameterf(i, a.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(s.anisotropy, r.getMaxAnisotropy())),
                n.get(s).__currentAnisotropy = s.anisotropy)
            }
        }
        function $(e, i) {
            let n = !1;
            void 0 === e.__webglInit && (e.__webglInit = !0,
            i.addEventListener("dispose", 37815));
            const r = i.source;
            let s = N.get(r);
            void 0 === s && (s = {},
            N.set(r, s));
            const o = function(t) {
                const e = [];
                return e.push(t.wrapS),
                e.push(t.wrapT),
                e.push(t.magFilter),
                e.push(t.minFilter),
                e.push(t.anisotropy),
                e.push(t.internalFormat),
                e.push(t.format),
                e.push(t.type),
                e.push(t.generateMipmaps),
                e.push(t.premultiplyAlpha),
                e.push(t.flipY),
                e.push(t.unpackAlignment),
                e.push(t.encoding),
                e.join()
            }(i);
            if (o !== e.__cacheKey) {
                void 0 === s[o] && (s[o] = {
                    texture: t.createTexture(),
                    usedTimes: 0
                },
                a.memory.textures++,
                n = !0),
                s[o].usedTimes++;
                const r = s[e.__cacheKey];
                void 0 !== r && (s[e.__cacheKey].usedTimes--,
                0 === r.usedTimes && q(i)),
                e.__cacheKey = o,
                e.__webglTexture = s[o].texture
            }
            return n
        }
        function Q(e, n, r) {
            let a = 3553;
            n.isDataArrayTexture && (a = 35866),
            n.isData3DTexture && (a = 32879);
            const l = $(e, n)
              , c = n.source;
            if (i.activeTexture(33984 + r),
            i.bindTexture(a, e.__webglTexture),
            c.version !== c.__currentVersion || !0 === l) {
                t.pixelStorei(37440, n.flipY),
                t.pixelStorei(37441, n.premultiplyAlpha),
                t.pixelStorei(3317, n.unpackAlignment),
                t.pixelStorei(37443, 0);
                const e = function(t) {
                    return !o && (t.wrapS !== h || t.wrapT !== h || t.minFilter !== d && t.minFilter !== f)
                }(n) && !1 === B(n.image);
                let r = U(n.image, e, !1, C);
                r = st(n, r);
                const u = B(r) || o
                  , p = s.convert(n.format, n.encoding);
                let m, g = s.convert(n.type), v = G(n.internalFormat, p, g, n.encoding, n.isVideoTexture);
                K(a, n, u);
                const x = n.mipmaps
                  , b = o && !0 !== n.isVideoTexture
                  , E = void 0 === c.__currentVersion || !0 === l
                  , L = V(n, r, u);
                if (n.isDepthTexture)
                    v = 6402,
                    o ? v = n.type === M ? 36012 : n.type === y ? 33190 : n.type === w ? 35056 : 33189 : n.type === M && console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),
                    n.format === T && 6402 === v && n.type !== _ && n.type !== y && (console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),
                    n.type = y,
                    g = s.convert(n.type)),
                    n.format === A && 6402 === v && (v = 34041,
                    n.type !== w && (console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),
                    n.type = w,
                    g = s.convert(n.type))),
                    E && (b ? i.texStorage2D(3553, 1, v, r.width, r.height) : i.texImage2D(3553, 0, v, r.width, r.height, 0, p, g, null));
                else if (n.isDataTexture)
                    if (x.length > 0 && u) {
                        b && E && i.texStorage2D(3553, L, v, x[0].width, x[0].height);
                        for (let t = 0, e = x.length; t < e; t++)
                            m = x[t],
                            b ? i.texSubImage2D(3553, t, 0, 0, m.width, m.height, p, g, m.data) : i.texImage2D(3553, t, v, m.width, m.height, 0, p, g, m.data);
                        n.generateMipmaps = !1
                    } else
                        b ? (E && i.texStorage2D(3553, L, v, r.width, r.height),
                        i.texSubImage2D(3553, 0, 0, 0, r.width, r.height, p, g, r.data)) : i.texImage2D(3553, 0, v, r.width, r.height, 0, p, g, r.data);
                else if (n.isCompressedTexture) {
                    b && E && i.texStorage2D(3553, L, v, x[0].width, x[0].height);
                    for (let t = 0, e = x.length; t < e; t++)
                        m = x[t],
                        n.format !== S ? null !== p ? b ? i.compressedTexSubImage2D(3553, t, 0, 0, m.width, m.height, p, m.data) : i.compressedTexImage2D(3553, t, v, m.width, m.height, 0, m.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : b ? i.texSubImage2D(3553, t, 0, 0, m.width, m.height, p, g, m.data) : i.texImage2D(3553, t, v, m.width, m.height, 0, p, g, m.data)
                } else if (n.isDataArrayTexture)
                    b ? (E && i.texStorage3D(35866, L, v, r.width, r.height, r.depth),
                    i.texSubImage3D(35866, 0, 0, 0, 0, r.width, r.height, r.depth, p, g, r.data)) : i.texImage3D(35866, 0, v, r.width, r.height, r.depth, 0, p, g, r.data);
                else if (n.isData3DTexture)
                    b ? (E && i.texStorage3D(32879, L, v, r.width, r.height, r.depth),
                    i.texSubImage3D(32879, 0, 0, 0, 0, r.width, r.height, r.depth, p, g, r.data)) : i.texImage3D(32879, 0, v, r.width, r.height, r.depth, 0, p, g, r.data);
                else if (n.isFramebufferTexture) {
                    if (E)
                        if (b)
                            i.texStorage2D(3553, L, v, r.width, r.height);
                        else {
                            let t = r.width
                              , e = r.height;
                            for (let n = 0; n < L; n++)
                                i.texImage2D(3553, n, v, t, e, 0, p, g, null),
                                t >>= 1,
                                e >>= 1
                        }
                } else if (x.length > 0 && u) {
                    b && E && i.texStorage2D(3553, L, v, x[0].width, x[0].height);
                    for (let t = 0, e = x.length; t < e; t++)
                        m = x[t],
                        b ? i.texSubImage2D(3553, t, 0, 0, p, g, m) : i.texImage2D(3553, t, v, p, g, m);
                    n.generateMipmaps = !1
                } else
                    b ? (E && i.texStorage2D(3553, L, v, r.width, r.height),
                    i.texSubImage2D(3553, 0, 0, 0, p, g, r)) : i.texImage2D(3553, 0, v, p, g, r);
                F(n, u) && k(a),
                c.__currentVersion = c.version,
                n.onUpdate && n.onUpdate(n)
            }
            e.__version = n.version
        }
        function tt(e, r, a, o, l) {
            const c = s.convert(a.format, a.encoding)
              , h = s.convert(a.type)
              , u = G(a.internalFormat, c, h, a.encoding);
            n.get(r).__hasExternalTextures || (32879 === l || 35866 === l ? i.texImage3D(l, 0, u, r.width, r.height, r.depth, 0, c, h, null) : i.texImage2D(l, 0, u, r.width, r.height, 0, c, h, null)),
            i.bindFramebuffer(36160, e),
            rt(r) ? R.framebufferTexture2DMultisampleEXT(36160, o, l, n.get(a).__webglTexture, 0, nt(r)) : t.framebufferTexture2D(36160, o, l, n.get(a).__webglTexture, 0),
            i.bindFramebuffer(36160, null)
        }
        function et(e, i, n) {
            if (t.bindRenderbuffer(36161, e),
            i.depthBuffer && !i.stencilBuffer) {
                let r = 33189;
                if (n || rt(i)) {
                    const e = i.depthTexture;
                    e && e.isDepthTexture && (e.type === M ? r = 36012 : e.type === y && (r = 33190));
                    const n = nt(i);
                    rt(i) ? R.renderbufferStorageMultisampleEXT(36161, n, r, i.width, i.height) : t.renderbufferStorageMultisample(36161, n, r, i.width, i.height)
                } else
                    t.renderbufferStorage(36161, r, i.width, i.height);
                t.framebufferRenderbuffer(36160, 36096, 36161, e)
            } else if (i.depthBuffer && i.stencilBuffer) {
                const r = nt(i);
                n && !1 === rt(i) ? t.renderbufferStorageMultisample(36161, r, 35056, i.width, i.height) : rt(i) ? R.renderbufferStorageMultisampleEXT(36161, r, 35056, i.width, i.height) : t.renderbufferStorage(36161, 34041, i.width, i.height),
                t.framebufferRenderbuffer(36160, 33306, 36161, e)
            } else {
                const e = !0 === i.isWebGLMultipleRenderTargets ? i.texture : [i.texture];
                for (let r = 0; r < e.length; r++) {
                    const a = e[r]
                      , o = s.convert(a.format, a.encoding)
                      , l = s.convert(a.type)
                      , c = G(a.internalFormat, o, l, a.encoding)
                      , h = nt(i);
                    n && !1 === rt(i) ? t.renderbufferStorageMultisample(36161, h, c, i.width, i.height) : rt(i) ? R.renderbufferStorageMultisampleEXT(36161, h, c, i.width, i.height) : t.renderbufferStorage(36161, c, i.width, i.height)
                }
            }
            t.bindRenderbuffer(36161, null)
        }
        function nt(t) {
            return Math.min(L, t.samples)
        }
        function st(t, i) {
            const n = t.encoding
              , r = t.format
              , s = t.type;
            return !0 === t.isCompressedTexture || !0 === t.isVideoTexture || t.format === 1035 || n !== 3e3 && (n === ot ? !1 === o ? !0 === e.has("EXT_sRGB") && r === S ? (t.format = 1035,
            t.minFilter = f,
            t.generateMipmaps = !1) : i = jt.sRGBToLinear(i) : r === S && s === x || console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.") : console.error("THREE.WebGLTextures: Unsupported texture encoding:", n)),
            i
        }
        this.allocateTextureUnit = function() {
            const t = X;
            return t >= l && console.warn("THREE.WebGLTextures: Trying to use " + t + " texture units while this GPU supports only " + l),
            X += 1,
            t
        }
        ,
        this.resetTextureUnits = function() {
            X = 0
        }
        ,
        this.setTexture2D = Y,
        this.setupDepthRenderbuffer = 2401,
        this.setupFrameBufferTexture = 2302,
        this.useMultisampledRTT = 2500
    }
// WEBGLUTILS
    function Fs(t, e, i) {
        const n = i.isWebGL2;
        return {
            convert: function(i, r=null) {
                let s;
                if (i === x)
                    return 5121;
                if (1017 === i)
                    return 32819;
                if (1018 === i)
                    return 32820;
                if (1010 === i)
                    return 5120;
                if (1011 === i)
                    return 5122;
                if (i === _)
                    return 5123;
                if (1013 === i)
                    return 5124;
                if (i === y)
                    return 5125;
                if (i === M)
                    return 5126;
                if (i === b)
                    return n ? 5131 : (s = e.get("OES_texture_half_float"),
                    null !== s ? s.HALF_FLOAT_OES : null);
                if (1021 === i)
                    return 6406;
                if (i === 1023)
                    return 6408;
                if (1024 === i)
                    return 6409;
                if (1025 === i)
                    return 6410;
                if (i === T)
                    return 6402;
                if (i === A)
                    return 34041;
                if (1028 === i)
                    return 6403;
                if (i === pt)
                    return s = e.get("EXT_sRGB"),
                    null !== s ? s.SRGB_ALPHA_EXT : null;
                if (1029 === i)
                    return 36244;
                if (1030 === i)
                    return 33319;
                if (1031 === i)
                    return 33320;
                if (1033 === i)
                    return 36249;
                if (i === E || i === C || i === L || i === R)
                    if (r === ot) {
                        if (s = e.get("WEBGL_compressed_texture_s3tc_srgb"),
                        null === s)
                            return null;
                        if (i === E)
                            return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;
                        if (i === C)
                            return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
                        if (i === L)
                            return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;
                        if (i === R)
                            return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT
                    } else {
                        if (s = e.get("WEBGL_compressed_texture_s3tc"),
                        null === s)
                            return null;
                        if (i === E)
                            return s.COMPRESSED_RGB_S3TC_DXT1_EXT;
                        if (i === C)
                            return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;
                        if (i === L)
                            return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;
                        if (i === R)
                            return s.COMPRESSED_RGBA_S3TC_DXT5_EXT
                    }
                if (i === P || i === I || i === D || i === N) {
                    if (s = e.get("WEBGL_compressed_texture_pvrtc"),
                    null === s)
                        return null;
                    if (i === P)
                        return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
                    if (i === I)
                        return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
                    if (i === D)
                        return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
                    if (i === N)
                        return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG
                }
                if (36196 === i)
                    return s = e.get("WEBGL_compressed_texture_etc1"),
                    null !== s ? s.COMPRESSED_RGB_ETC1_WEBGL : null;
                if (i === z || i === O) {
                    if (s = e.get("WEBGL_compressed_texture_etc"),
                    null === s)
                        return null;
                    if (i === z)
                        return r === ot ? s.COMPRESSED_SRGB8_ETC2 : s.COMPRESSED_RGB8_ETC2;
                    if (i === O)
                        return r === ot ? s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC : s.COMPRESSED_RGBA8_ETC2_EAC
                }
                if (i === U || i === B || i === F || i === k || i === G || i === V || i === H || i === W || i === j || i === q || i === X || i === Y || i === Z || i === J) {
                    if (s = e.get("WEBGL_compressed_texture_astc"),
                    null === s)
                        return null;
                    if (i === U)
                        return r === ot ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR : s.COMPRESSED_RGBA_ASTC_4x4_KHR;
                    if (i === B)
                        return r === ot ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR : s.COMPRESSED_RGBA_ASTC_5x4_KHR;
                    if (i === F)
                        return r === ot ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR : s.COMPRESSED_RGBA_ASTC_5x5_KHR;
                    if (i === k)
                        return r === ot ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR : s.COMPRESSED_RGBA_ASTC_6x5_KHR;
                    if (i === G)
                        return r === ot ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR : s.COMPRESSED_RGBA_ASTC_6x6_KHR;
                    if (i === V)
                        return r === ot ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR : s.COMPRESSED_RGBA_ASTC_8x5_KHR;
                    if (i === H)
                        return r === ot ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR : s.COMPRESSED_RGBA_ASTC_8x6_KHR;
                    if (i === W)
                        return r === ot ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR : s.COMPRESSED_RGBA_ASTC_8x8_KHR;
                    if (i === j)
                        return r === ot ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR : s.COMPRESSED_RGBA_ASTC_10x5_KHR;
                    if (i === q)
                        return r === ot ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR : s.COMPRESSED_RGBA_ASTC_10x6_KHR;
                    if (i === X)
                        return r === ot ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR : s.COMPRESSED_RGBA_ASTC_10x8_KHR;
                    if (i === Y)
                        return r === ot ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR : s.COMPRESSED_RGBA_ASTC_10x10_KHR;
                    if (i === Z)
                        return r === ot ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR : s.COMPRESSED_RGBA_ASTC_12x10_KHR;
                    if (i === J)
                        return r === ot ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR : s.COMPRESSED_RGBA_ASTC_12x12_KHR
                }
                if (i === K) {
                    if (s = e.get("EXT_texture_compression_bptc"),
                    null === s)
                        return null;
                    if (i === K)
                        return r === ot ? s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT : s.COMPRESSED_RGBA_BPTC_UNORM_EXT
                }
                return i === w ? n ? 34042 : (s = e.get("WEBGL_depth_texture"),
                null !== s ? s.UNSIGNED_INT_24_8_WEBGL : null) : void 0 !== t[i] ? t[i] : null
            }
        }
    }
// rendering?
    function qs(t, e) {
        function i(i, n) {
            i.opacity.value = n.opacity,
            n.color && i.diffuse.value.copy(n.color),
            n.emissive && i.emissive.value.copy(n.emissive).multiplyScalar(n.emissiveIntensity),
            n.map && (i.map.value = n.map),
            n.alphaMap && (i.alphaMap.value = n.alphaMap),
            n.bumpMap && (i.bumpMap.value = n.bumpMap,
            i.bumpScale.value = n.bumpScale,
            1 === n.side && (i.bumpScale.value *= -1)),
            n.displacementMap && (i.displacementMap.value = n.displacementMap,
            i.displacementScale.value = n.displacementScale,
            i.displacementBias.value = n.displacementBias),
            n.emissiveMap && (i.emissiveMap.value = n.emissiveMap),
            n.normalMap && (i.normalMap.value = n.normalMap,
            i.normalScale.value.copy(n.normalScale),
            1 === n.side && i.normalScale.value.negate()),
            n.specularMap && (i.specularMap.value = n.specularMap),
            n.alphaTest > 0 && (i.alphaTest.value = n.alphaTest);
            const r = e.get(n).envMap;
            if (r && (i.envMap.value = r,
            i.flipEnvMap.value = r.isCubeTexture && !1 === r.isRenderTargetTexture ? -1 : 1,
            i.reflectivity.value = n.reflectivity,
            i.ior.value = n.ior,
            i.refractionRatio.value = n.refractionRatio),
            n.lightMap) {
                i.lightMap.value = n.lightMap;
                const e = !0 !== t.physicallyCorrectLights ? Math.PI : 1;
                i.lightMapIntensity.value = n.lightMapIntensity * e
            }
            let s, a;
            n.aoMap && (i.aoMap.value = n.aoMap,
            i.aoMapIntensity.value = n.aoMapIntensity),
            n.map ? s = n.map : n.specularMap ? s = n.specularMap : n.displacementMap ? s = n.displacementMap : n.normalMap ? s = n.normalMap : n.bumpMap ? s = n.bumpMap : n.roughnessMap ? s = n.roughnessMap : n.metalnessMap ? s = n.metalnessMap : n.alphaMap ? s = n.alphaMap : n.emissiveMap ? s = n.emissiveMap : n.clearcoatMap ? s = n.clearcoatMap : n.clearcoatNormalMap ? s = n.clearcoatNormalMap : n.clearcoatRoughnessMap ? s = n.clearcoatRoughnessMap : n.iridescenceMap ? s = n.iridescenceMap : n.iridescenceThicknessMap ? s = n.iridescenceThicknessMap : n.specularIntensityMap ? s = n.specularIntensityMap : n.specularColorMap ? s = n.specularColorMap : n.transmissionMap ? s = n.transmissionMap : n.thicknessMap ? s = n.thicknessMap : n.sheenColorMap ? s = n.sheenColorMap : n.sheenRoughnessMap && (s = n.sheenRoughnessMap),
            void 0 !== s && (s.isWebGLRenderTarget && (s = s.texture),
            !0 === s.matrixAutoUpdate && s.updateMatrix(),
            i.uvTransform.value.copy(s.matrix)),
            n.aoMap ? a = n.aoMap : n.lightMap && (a = n.lightMap),
            void 0 !== a && (a.isWebGLRenderTarget && (a = a.texture),
            !0 === a.matrixAutoUpdate && a.updateMatrix(),
            i.uv2Transform.value.copy(a.matrix))
        }
        return {
            refreshFogUniforms: function(t, e) {
                t.fogColor.value.copy(e.color),
                e.isFog ? (t.fogNear.value = e.near,
                t.fogFar.value = e.far) : e.isFogExp2 && (t.fogDensity.value = e.density)
            },
            refreshMaterialUniforms: function(t, n, r, s, a) {
                n.isMeshBasicMaterial || n.isMeshLambertMaterial ? i(t, n) : n.isMeshToonMaterial ? (i(t, n),
                function(t, e) {
                    e.gradientMap && (t.gradientMap.value = e.gradientMap)
                }(t, n)) : n.isMeshPhongMaterial ? (i(t, n),
                function(t, e) {
                    t.specular.value.copy(e.specular),
                    t.shininess.value = Math.max(e.shininess, 1e-4)
                }(t, n)) : n.isMeshStandardMaterial ? (i(t, n),
                function(t, i) {
                    t.roughness.value = i.roughness,
                    t.metalness.value = i.metalness,
                    i.roughnessMap && (t.roughnessMap.value = i.roughnessMap);
                    i.metalnessMap && (t.metalnessMap.value = i.metalnessMap);
                    e.get(i).envMap && (t.envMapIntensity.value = i.envMapIntensity)
                }(t, n),
                n.isMeshPhysicalMaterial && function(t, e, i) {
                    t.ior.value = e.ior,
                    e.sheen > 0 && (t.sheenColor.value.copy(e.sheenColor).multiplyScalar(e.sheen),
                    t.sheenRoughness.value = e.sheenRoughness,
                    e.sheenColorMap && (t.sheenColorMap.value = e.sheenColorMap),
                    e.sheenRoughnessMap && (t.sheenRoughnessMap.value = e.sheenRoughnessMap));
                    e.clearcoat > 0 && (t.clearcoat.value = e.clearcoat,
                    t.clearcoatRoughness.value = e.clearcoatRoughness,
                    e.clearcoatMap && (t.clearcoatMap.value = e.clearcoatMap),
                    e.clearcoatRoughnessMap && (t.clearcoatRoughnessMap.value = e.clearcoatRoughnessMap),
                    e.clearcoatNormalMap && (t.clearcoatNormalScale.value.copy(e.clearcoatNormalScale),
                    t.clearcoatNormalMap.value = e.clearcoatNormalMap,
                    1 === e.side && t.clearcoatNormalScale.value.negate()));
                    e.iridescence > 0 && (t.iridescence.value = e.iridescence,
                    t.iridescenceIOR.value = e.iridescenceIOR,
                    t.iridescenceThicknessMinimum.value = e.iridescenceThicknessRange[0],
                    t.iridescenceThicknessMaximum.value = e.iridescenceThicknessRange[1],
                    e.iridescenceMap && (t.iridescenceMap.value = e.iridescenceMap),
                    e.iridescenceThicknessMap && (t.iridescenceThicknessMap.value = e.iridescenceThicknessMap));
                    e.transmission > 0 && (t.transmission.value = e.transmission,
                    t.transmissionSamplerMap.value = i.texture,
                    t.transmissionSamplerSize.value.set(i.width, i.height),
                    e.transmissionMap && (t.transmissionMap.value = e.transmissionMap),
                    t.thickness.value = e.thickness,
                    e.thicknessMap && (t.thicknessMap.value = e.thicknessMap),
                    t.attenuationDistance.value = e.attenuationDistance,
                    t.attenuationColor.value.copy(e.attenuationColor));
                    t.specularIntensity.value = e.specularIntensity,
                    t.specularColor.value.copy(e.specularColor),
                    e.specularIntensityMap && (t.specularIntensityMap.value = e.specularIntensityMap);
                    e.specularColorMap && (t.specularColorMap.value = e.specularColorMap)
                }(t, n, a)) : n.isMeshMatcapMaterial ? (i(t, n),
                function(t, e) {
                    e.matcap && (t.matcap.value = e.matcap)
                }(t, n)) : n.isMeshDepthMaterial ? i(t, n) : n.isMeshDistanceMaterial ? (i(t, n),
                function(t, e) {
                    t.referencePosition.value.copy(e.referencePosition),
                    t.nearDistance.value = e.nearDistance,
                    t.farDistance.value = e.farDistance
                }(t, n)) : n.isMeshNormalMaterial ? i(t, n) : n.isLineBasicMaterial ? (function(t, e) {
                    t.diffuse.value.copy(e.color),
                    t.opacity.value = e.opacity
                }(t, n),
                n.isLineDashedMaterial && function(t, e) {
                    t.dashSize.value = e.dashSize,
                    t.totalSize.value = e.dashSize + e.gapSize,
                    t.scale.value = e.scale
                }(t, n)) : n.isPointsMaterial ? function(t, e, i, n) {
                    t.diffuse.value.copy(e.color),
                    t.opacity.value = e.opacity,
                    t.size.value = e.size * i,
                    t.scale.value = .5 * n,
                    e.map && (t.map.value = e.map);
                    e.alphaMap && (t.alphaMap.value = e.alphaMap);
                    e.alphaTest > 0 && (t.alphaTest.value = e.alphaTest);
                    let r;
                    e.map ? r = e.map : e.alphaMap && (r = e.alphaMap);
                    void 0 !== r && (!0 === r.matrixAutoUpdate && r.updateMatrix(),
                    t.uvTransform.value.copy(r.matrix))
                }(t, n, r, s) : n.isSpriteMaterial ? function(t, e) {
                    t.diffuse.value.copy(e.color),
                    t.opacity.value = e.opacity,
                    t.rotation.value = e.rotation,
                    e.map && (t.map.value = e.map);
                    e.alphaMap && (t.alphaMap.value = e.alphaMap);
                    e.alphaTest > 0 && (t.alphaTest.value = e.alphaTest);
                    let i;
                    e.map ? i = e.map : e.alphaMap && (i = e.alphaMap);
                    void 0 !== i && (!0 === i.matrixAutoUpdate && i.updateMatrix(),
                    t.uvTransform.value.copy(i.matrix))
                }(t, n) : n.isShadowMaterial ? (t.color.value.copy(n.color),
                t.opacity.value = n.opacity) : n.isShaderMaterial && (n.uniformsNeedUpdate = !1)
            }
        }
    }
// rendering?
    function Xs(t, e, i, n) {
        let r = {}
          , s = {}
          , a = [];
        const o = i.isWebGL2 ? t.getParameter(35375) : 0;
        function l(t, e, i) {
            const n = t.value;
            if (void 0 === i[e])
                return i[e] = "number" == typeof n ? n : n.clone(),
                !0;
            if ("number" == typeof n) {
                if (i[e] !== n)
                    return i[e] = n,
                    !0
            } else {
                const t = i[e];
                if (!1 === t.equals(n))
                    return t.copy(n),
                    !0
            }
            return !1
        }
        function c(t) {
            const e = t.value
              , i = {
                boundary: 0,
                storage: 0
            };
            return "number" == typeof e ? (i.boundary = 4,
            i.storage = 4) : e.isVector2 ? (i.boundary = 8,
            i.storage = 8) : e.isVector3 || e.isColor ? (i.boundary = 16,
            i.storage = 12) : e.isVector4 ? (i.boundary = 16,
            i.storage = 16) : e.isMatrix3 ? (i.boundary = 48,
            i.storage = 48) : e.isMatrix4 ? (i.boundary = 64,
            i.storage = 64) : e.isTexture ? console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group.") : console.warn("THREE.WebGLRenderer: Unsupported uniform value type.", e),
            i
        }
        function h(e) {
            const i = e.target;
            i.removeEventListener("dispose", h);
            const n = a.indexOf(i.__bindingPointIndex);
            a.splice(n, 1),
            t.deleteBuffer(r[i.id]),
            delete r[i.id],
            delete s[i.id]
        }
        return {
            bind: function(t, e) {
                const i = e.program;
                n.uniformBlockBinding(t, i)
            },
            update: function(i, u) {
                let d = r[i.id];
                void 0 === d && (!function(t) {
                    const e = t.uniforms;
                    let i = 0;
                    const n = 16;
                    let r = 0;
                    for (let t = 0, s = e.length; t < s; t++) {
                        const s = e[t]
                          , a = c(s);
                        if (s.__data = new Float32Array(a.storage / Float32Array.BYTES_PER_ELEMENT),
                        s.__offset = i,
                        t > 0) {
                            r = i % n;
                            const t = n - r;
                            0 !== r && t - a.boundary < 0 && (i += n - r,
                            s.__offset = i)
                        }
                        i += a.storage
                    }
                    r = i % n,
                    r > 0 && (i += n - r);
                    t.__size = i,
                    t.__cache = {}
                }(i),
                d = function(e) {
                    const i = function() {
                        for (let t = 0; t < o; t++)
                            if (-1 === a.indexOf(t))
                                return a.push(t),
                                t;
                        return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),
                        0
                    }();
                    e.__bindingPointIndex = i;
                    const n = t.createBuffer()
                      , r = e.__size
                      , s = e.usage;
                    return t.bindBuffer(35345, n),
                    t.bufferData(35345, r, s),
                    t.bindBuffer(35345, null),
                    t.bindBufferBase(35345, i, n),
                    n
                }(i),
                r[i.id] = d,
                i.addEventListener("dispose", h));
                const p = u.program;
                n.updateUBOMapping(i, p);
                const m = e.render.frame;
                s[i.id] !== m && (!function(e) {
                    const i = r[e.id]
                      , n = e.uniforms
                      , s = e.__cache;
                    t.bindBuffer(35345, i);
                    for (let e = 0, i = n.length; e < i; e++) {
                        const i = n[e];
                        if (!0 === l(i, e, s)) {
                            const e = i.value
                              , n = i.__offset;
                            "number" == typeof e ? (i.__data[0] = e,
                            t.bufferSubData(35345, n, i.__data)) : (i.value.isMatrix3 ? (i.__data[0] = i.value.elements[0],
                            i.__data[1] = i.value.elements[1],
                            i.__data[2] = i.value.elements[2],
                            i.__data[3] = i.value.elements[0],
                            i.__data[4] = i.value.elements[3],
                            i.__data[5] = i.value.elements[4],
                            i.__data[6] = i.value.elements[5],
                            i.__data[7] = i.value.elements[0],
                            i.__data[8] = i.value.elements[6],
                            i.__data[9] = i.value.elements[7],
                            i.__data[10] = i.value.elements[8],
                            i.__data[11] = i.value.elements[0]) : e.toArray(i.__data),
                            t.bufferSubData(35345, n, i.__data))
                        }
                    }
                    t.bindBuffer(35345, null)
                }(i),
                s[i.id] = m)
            },
            dispose: function() {
                for (const e in r)
                    t.deleteBuffer(r[e]);
                a = [],
                r = {},
                s = {}
            }
        }
    }
// WEBGLRENDERER
    function Ys(t={}) {
        this.isWebGLRenderer = !0;

        const fcanvas = void 0 !== t.canvas ? t.canvas : function() {
            const t = document.createElement("canvas");
            return t.style.display = "block",
            t
        }()

          , i = void 0 !== t.context ? t.context : null
          , n = void 0 === t.depth || t.depth
          , r = void 0 === t.stencil || t.stencil
          , s = void 0 !== t.antialias && t.antialias
          , a = void 0 === t.premultipliedAlpha || t.premultipliedAlpha
          , o = void 0 !== t.preserveDrawingBuffer && t.preserveDrawingBuffer
          , l = void 0 !== t.powerPreference ? t.powerPreference : "default"
          , c = void 0 !== t.failIfMajorPerformanceCaveat && t.failIfMajorPerformanceCaveat;
        let h;
        h = null !== i ? i.getContextAttributes().alpha : void 0 !== t.alpha && t.alpha;
        let u = null
          , d = null;
        const p = []
          , m = [];
        this.domElement = fcanvas,
        this.debug = {
            checkShaderErrors: !0
        },
        this.autoClear = !0,
        this.autoClearColor = !0,
        this.autoClearDepth = !0,
        this.autoClearStencil = !0,
        this.sortObjects = !0,
        this.clippingPlanes = [],
        this.localClippingEnabled = !1,
        this.outputEncoding = 3e3,
        this.physicallyCorrectLights = !1,
        this.toneMapping = 0,
        this.toneMappingExposure = 1;
        const f = this;
        let g = !1
          , _ = 0
          , y = 0
          , w = null
          , T = -1
          , A = null;
        const E = new Jt		// Vector4
          , C = new Jt;			// Vector4
        let L = null
          , R = fcanvas.width
          , P = fcanvas.height
          , fpixelratio = 1
          , D = null
          , N = null;
        const z = new Jt(0,0,R,P)	// Vector4
          , O = new Jt(0,0,R,P);	// Vector4
        let U = !1;
        const vfrustum = new fn;	// Frustum
        let F = !1
          , k = !1
          , G = null;
        const V = new Ie		// Matrix4
          , H = new Et			// Vector2
          , W = new ee			// Vector3
          , j = {
            background: null,
            fog: null,
            environment: null,
            overrideMaterial: null,
            isScene: !0
        };

	// ?
        function q() {
            return null === w ? I : 1
        }

        let X, Y, Z, J, K, $, Q, tt, et, it, nt, rt, st, ot, lt, ct, ht, ut, dt, pt, mt, ft, gt, vt, xt = i;

	// canvas context?
        function return_context(t, i) {
            for (let n = 0; n < t.length; n++) {
                const r = t[n]
                  , s = fcanvas.getContext(r, i);
                if (null !== s)
                    return s
            }
            return null
        }

        try {
            const t = {
                alpha: !0,
                depth: n,
                stencil: r,
                antialias: s,
                premultipliedAlpha: a,
                preserveDrawingBuffer: o,
                powerPreference: l,
                failIfMajorPerformanceCaveat: c
            };
            if ("setAttribute"in fcanvas && fcanvas.setAttribute("data-engine", "three.js r144dev"),
            fcanvas.addEventListener("webglcontextlost", context_lost, !1),
            fcanvas.addEventListener("webglcontextrestored", context_restored, !1),
            fcanvas.addEventListener("webglcontextcreationerror", context_creationerror, !1),
            null === xt) {
                const e = ["webgl2", "webgl", "experimental-webgl"];
                if (!0 === f.isWebGL1Renderer && e.shift(),
                xt = return_context(e, t),
                null === xt)
                    throw return_context(e) ? new Error("Error creating WebGL context with your selected attributes.") : new Error("Error creating WebGL context.")
            }
            void 0 === xt.getShaderPrecisionFormat && (xt.getShaderPrecisionFormat = function() {
                return {
                    rangeMin: 1,
                    rangeMax: 1,
                    precision: 1
                }
            }
            )
        } catch (t) {
            throw console.error("THREE.WebGLRenderer: " + t.message),
            t
        }

            X = new Wn(xt),
            Y = new Tn(xt,X,t),
            X.init(Y),
            ft = new Fs(xt,X,Y),	// webglutils
            Z = new Us(xt,X,Y),
            J = new Xn,
            K = new ws,
            $ = new Bs(xt,X,Z,K,Y,ft,J),
            Q = new En(f),
            tt = new Hn(f),
            et = new vn(xt,Y),
            gt = new wn(xt,X,et,Y),
            it = new jn(xt,et,J,gt),
            nt = new $n(xt,it,et,J),
            dt = new Kn(xt,Y,$),
            ct = new An(K),
            rt = new bs(f,Q,tt,X,Y,gt,ct),
            st = new qs(f,K),
            ot = new Es,
            lt = new Ds(X,Y),
            ut = new bn(f,Q,Z,nt,h,a),
            ht = new Os(f,nt,Y),
            vt = new Xs(xt,J,Y,Z),
            pt = new render_thing(xt,X,J,Y),
            mt = new qn(xt,X,J,Y),
            J.programs = rt.programs,
            f.capabilities = Y,
            f.extensions = X,
            f.properties = K,
            f.renderLists = ot,
            f.shadowMap = ht,
            f.state = Z,
            f.info = J

// context lost?
        function context_lost(t) {
            t.preventDefault(),
            console.log("THREE.WebGLRenderer: Context Lost."),
            g = !0
        }

// context restored?
        function context_restored() {
            console.log("THREE.WebGLRenderer: Context Restored."),
            g = !1;
            const t = J.autoReset
              , e = ht.enabled
              , i = ht.autoUpdate
              , n = ht.needsUpdate
              , r = ht.type;
            yt(),
            J.autoReset = t,
            ht.enabled = e,
            ht.autoUpdate = i,
            ht.needsUpdate = n,
            ht.type = r
        }

// context could not be created?
        function context_creationerror(t) {
            console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ", t.statusMessage)
        }

	function shader_release(t)
	{
		const e = t.target;
		e.removeEventListener("dispose", shader_release),

		function(t)
		{
			(function(t)
			{
				const e = K.get(t).programs;
				void 0 !== e && (e.forEach((function(t)
				{
					rt.releaseProgram(t)
				}
				)),
				t.isShaderMaterial && rt.releaseShaderCache(t))
			}
			)(t),
			K.remove(t)
		}(e)
	}

        this.xr = Mt,
        this.getContext = function() {
            return xt
        }
        ,
        this.getContextAttributes = function() {
            return xt.getContextAttributes()
        }
        ,
        this.getPixelRatio = function() {
            return fpixelratio
        }
        ,
        this.setPixelRatio = function(t) {
            void 0 !== t && (fpixelratio = t,
            this.setSize(R, P, !1))
        }
        ,
        this.getSize = function(t) {
            return t.set(R, P)
        }
        ,
        this.setSize = function(t, i, n) {
            R = t,
            P = i,
            fcanvas.width = Math.floor(t * fpixelratio),
            fcanvas.height = Math.floor(i * fpixelratio),
            !1 !== n && (fcanvas.style.width = t + "px",
            fcanvas.style.height = i + "px"),
            this.setViewport(0, 0, t, i);
        }
        ,
        this.getDrawingBufferSize = function(t) {
            return t.set(R * fpixelratio, P * fpixelratio).floor()
        }
        ,
        this.setDrawingBufferSize = function(t, i, n) {
            R = t,
            P = i,
            fpixelratio = n,
            fcanvas.width = Math.floor(t * n),
            fcanvas.height = Math.floor(i * n),
            this.setViewport(0, 0, t, i)
        }
        ,
        this.getCurrentViewport = function(t) {
            return t.copy(E)
        }
        ,
        this.getViewport = function(t) {
            return t.copy(z)
        }
        ,
        this.setViewport = function(t, e, i, n) {
            t.isVector4 ? z.set(t.x, t.y, t.z, t.w) : z.set(t, e, i, n),
            Z.viewport(E.copy(z).multiplyScalar(fpixelratio).floor())
        }
        ,
        this.setOpaqueSort = function(t) {
            D = t
        }
        ,
        this.setTransparentSort = function(t) {
            N = t
        }
        ,
        this.clear = function(t=!0, e=!0, i=!0) {
            let n = 0;
            t && (n |= 16384),
            e && (n |= 256),
            i && (n |= 1024),
            xt.clear(n)
        }
        ,
        this.clearColor = function() {
            this.clear(!0, !1, !1)
        }
        ,
        this.clearDepth = function() {
            this.clear(!1, !0, !1)
        }
        ,
        this.clearStencil = function() {
            this.clear(!1, !1, !0)
        }
        ,
        this.dispose = function() {
            e.removeEventListener("webglcontextlost", bt, !1),
            e.removeEventListener("webglcontextrestored", wt, !1),
            e.removeEventListener("webglcontextcreationerror", St, !1),
            ot.dispose(),
            lt.dispose(),
            K.dispose(),
            Q.dispose(),
            tt.dispose(),
            nt.dispose(),
            gt.dispose(),
            vt.dispose(),
            rt.dispose(),
            Mt.dispose(),
            Mt.removeEventListener("sessionstart", fanimationframe_controller.stop),
            Mt.removeEventListener("sessionend", fanimationframe_controller.start),
            G && (G.dispose(),
            G = null),
            Pt.stop()
        }
        ,

        this.renderBufferDirect = function(t, e, i, n, r, s)
	{
            null === e && (e = j);
            const a = r.isMesh && r.matrixWorld.determinant() < 0;

            const o = function(t, e, i, n, r)
	    {
                !0 !== e.isScene && (e = j);
                $.resetTextureUnits();

                const s = e.fog
                  , a = null
                  , o = null === w ? f.outputEncoding : !0 === w.isXRRenderTarget ? w.texture.encoding : at
                  , l = Q.get(n.envMap || a)
                  , c = !0 === n.vertexColors && !!i.attributes.color && 4 === i.attributes.color.itemSize
                  , h = !!n.normalMap && !!i.attributes.tangent
                  , u = !!i.morphAttributes.position
                  , p = !!i.morphAttributes.normal
                  , m = !!i.morphAttributes.color
                  , g = 0
                  , v = i.morphAttributes.position || i.morphAttributes.normal || i.morphAttributes.color
                  , x = void 0 !== v ? v.length : 0
                  , _ = K.get(n)
                  , y = d.state.lights;

                if (!0 === F && (!0 === k || t !== A))
		{
                    const e = t === A && n.id === T;
                    ct.setState(n, t, e)
                }

                let M = !1;

                n.version === _.__version ? _.needsLights && _.lightsStateVersion !== y.state.version || _.outputEncoding !== o || r.isInstancedMesh && !1 === _.instancing ? M = !0 : r.isInstancedMesh || !0 !== _.instancing ? r.isSkinnedMesh && !1 === _.skinning ? M = !0 : r.isSkinnedMesh || !0 !== _.skinning ? _.envMap !== l || !0 === n.fog && _.fog !== s ? M = !0 : void 0 === _.numClippingPlanes || _.numClippingPlanes === ct.numPlanes && _.numIntersection === ct.numIntersection ? (_.vertexAlphas !== c || _.vertexTangents !== h || _.morphTargets !== u || _.morphNormals !== p || _.morphColors !== m || _.toneMapping !== g || !0 === Y.isWebGL2 && _.morphTargetsCount !== x) && (M = !0) : M = !0 : M = !0 : M = !0 : (M = !0,
                _.__version = n.version);

                let b = _.currentProgram;
                !0 === M && (b = render_setup(n, e, r));
                let S = !1
                  , E = !1
                  , C = !1;
                const L = b.getUniforms()
                  , R = _.uniforms;

                Z.useProgram(b.program) && (S = !0,
                E = !0,
                C = !0);
                n.id !== T && (T = n.id,
                E = !0);

                if (S || A !== t)
		{
                    if (L.setValue(xt, "projectionMatrix", t.projectionMatrix),
                    Y.logarithmicDepthBuffer && L.setValue(xt, "logDepthBufFC", 2 / (Math.log(t.far + 1) / Math.LN2)),
                    A !== t && (A = t,
                    E = !0,
                    C = !0),
                    n.isShaderMaterial || n.isMeshPhongMaterial || n.envMap)
		    {
                        const e = L.map.cameraPosition;
                        void 0 !== e && e.setValue(xt, W.setFromMatrixPosition(t.matrixWorld))
                    }
                    (n.isMeshPhongMaterial || n.isMeshLambertMaterial || n.isMeshBasicMaterial || n.isShaderMaterial) && L.setValue(xt, "isOrthographic", !0 === t.isOrthographicCamera),
                    (n.isMeshPhongMaterial || n.isMeshLambertMaterial || n.isMeshBasicMaterial || n.isShaderMaterial) && L.setValue(xt, "viewMatrix", t.matrixWorldInverse)
                }

                const D = i.morphAttributes;
                (void 0 !== D.position || void 0 !== D.normal || void 0 !== D.color && !0 === Y.isWebGL2) && dt.update(r, i, n, b);

                E && (L.setValue(xt, "toneMappingExposure", f.toneMappingExposure),
                _.needsLights && (z = C,
                (N = R).ambientLightColor.needsUpdate = z,
                N.directionalLights.needsUpdate = z,
                N.pointLights.needsUpdate = z,
                N.spotLights.needsUpdate = z),

                s && !0 === n.fog && st.refreshFogUniforms(R, s),
                st.refreshMaterialUniforms(R, n, fpixelratio, P, G),
                is.upload(xt, _.uniformsList, R, $));

                var N, z;
                n.isShaderMaterial && !0 === n.uniformsNeedUpdate && (is.upload(xt, _.uniformsList, R, $),
                n.uniformsNeedUpdate = !1);
                n.isSpriteMaterial && L.setValue(xt, "center", r.center);
                if (L.setValue(xt, "modelViewMatrix", r.modelViewMatrix),
                L.setValue(xt, "normalMatrix", r.normalMatrix),
                L.setValue(xt, "modelMatrix", r.matrixWorld),
                n.isShaderMaterial || n.isRawShaderMaterial)
		{
                    const t = n.uniformsGroups;
                    for (let e = 0, i = t.length; e < i; e++)
		    {
                        if (Y.isWebGL2)
			{
                            const i = t[e];
                            vt.update(i, b),
                            vt.bind(i, b)
                        }
			else
			{
                            console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")
			}
		    }
                }
                return b
            }(t, e, i, n, r);

            Z.setMaterial(n, a);
            let l = i.index;
            const c = i.attributes.position;

            if (null === l)
	    {
                if (void 0 === c || 0 === c.count)
                    return
            }
	    else if (0 === l.count)
	    {
                return;
	    }

            let h, u = 1;
            gt.setup(r, n, o, i, l);

            let p = pt;
            if (null !== l)	// sprite and background
	    {
		h = et.get(l);
                p = mt;
                p.setIndex(h);
	    }

            const m = null !== l ? l.count : c.count;
            const g = i.drawRange.start * u;
            const v = i.drawRange.count * u;
            const x = null !== s ? s.start * u : 0;
            const _ = null !== s ? s.count * u : 1 / 0;
            const y = Math.max(g, x);
            const M = Math.min(m, g + v, x + _) - 1;
            const b = Math.max(0, M - y + 1);

// !!!! MAIN THING !!!!

	    // b is number of vertices?
            if (0 !== b)
	    {
		if (r.isPoints) p.setMode(0);
		else p.setMode(4);
                p.render(y, b)
            }
        };

        let Ct = null;

        const fanimationframe_controller = new animationframe_controller;

	function render_step1(thing, fcamera, i, n)	// scene, camera, ?, object(s)
	{
		if (!1 === thing.visible) return;

		if (thing.isLight)
		{
			d.pushLight(thing);
		}
		else if (thing.isSprite && (!thing.frustumCulled || vfrustum.intersectsSprite(thing)))
		{
			n && W.setFromMatrixPosition(thing.matrixWorld).applyMatrix4(V);
			thing.material.visible && u.push(thing, nt.update(thing), thing.material, i, W.z, null)
	        }
		else if ((thing.isMesh || thing.isPoints) && (!thing.frustumCulled || vfrustum.intersectsObject(thing)))
		{
			n && W.setFromMatrixPosition(thing.matrixWorld).applyMatrix4(V);
			thing.material.visible && u.push(thing, nt.update(thing), thing.material, i, W.z, null);
		}

		for (let u = 0, s = thing.children.length; u < s; u++)
		{
	                render_step1(thing.children[u], fcamera, i, n);
		}
        }

	function gothrough(t, fscene, i)
	{
		const n = (!0 === fscene.isScene) ? fscene.overrideMaterial : null;

		for (let r = 0, s = t.length; r < s; r++)
		{
			const l = (null === n) ? t[r].material : n;

			t[r].object.modelViewMatrix.multiplyMatrices(i.matrixWorldInverse, t[r].object.matrixWorld);

			f.renderBufferDirect(i, fscene, t[r].geometry, l, t[r].object, t[r].group);
	        }
	}

        function render_setup(t, e, i) {
            !0 !== e.isScene && (e = j);
            const n = K.get(t)
              , r = d.state.lights
              , s = d.state.shadowsArray
              , a = r.state.version
              , o = rt.getParameters(t, r.state, s, e, i)
              , l = rt.getProgramCacheKey(o);
            let c = n.programs;
            n.environment = t.isMeshStandardMaterial ? e.environment : null,
            n.fog = e.fog,
            n.envMap = (t.isMeshStandardMaterial ? tt : Q).get(t.envMap || n.environment),
            void 0 === c && (t.addEventListener("dispose", shader_release),
            c = new Map,
            n.programs = c);
            let h = c.get(l);
            if (void 0 !== h) {
                if (n.currentProgram === h && n.lightsStateVersion === a)
                    return values(t, o),
                    h
            } else
                o.uniforms = rt.getUniforms(t),
                t.onBuild(i, o, f),
                t.onBeforeCompile(o, f),
                h = rt.acquireProgram(o, l),
                c.set(l, h),
                n.uniforms = o.uniforms;
            const u = n.uniforms;
            (t.isShaderMaterial || t.isRawShaderMaterial) && !0 !== t.clipping || (u.clippingPlanes = ct.uniform),
            values(t, o),
            n.needsLights = function(t) {
                return t.isMeshLambertMaterial || t.isMeshPhongMaterial || t.isMeshStandardMaterial || t.isShaderMaterial && !0 === t.lights
            }(t),
            n.lightsStateVersion = a,
            n.needsLights && (u.ambientLightColor.value = r.state.ambient,
            u.directionalLights.value = r.state.directional,
            u.spotLights.value = r.state.spot);
            const p = h.getUniforms()
              , m = is.seqWithValue(p.seq, u);
            return n.currentProgram = h,
            n.uniformsList = m,
            h
        }
// set some values?
        function values(t, e) {
            const i = K.get(t);
            i.outputEncoding = e.outputEncoding,
            i.instancing = e.instancing,
            i.skinning = e.skinning,
            i.morphTargets = e.morphTargets,
            i.morphNormals = e.morphNormals,
            i.morphColors = e.morphColors,
            i.morphTargetsCount = e.morphTargetsCount,
            i.numClippingPlanes = e.numClippingPlanes,
            i.numIntersection = e.numClipIntersection,
            i.vertexAlphas = e.vertexAlphas,
            i.vertexTangents = e.vertexTangents,
            i.toneMapping = e.toneMapping
        }
        fanimationframe_controller.setAnimationLoop((function(t) {
            Ct && Ct(t)
        }
        )),
        "undefined" != typeof self && fanimationframe_controller.setContext(self),
        this.setAnimationLoop = function(t) {
            Ct = t,
            Mt.setAnimationLoop(t),
            null === t ? fanimationframe_controller.stop() : fanimationframe_controller.start()
        }
        ,
// ----------------- //
// function render() //
// ----------------- //
        this.render = function(fscene, fcamera) {
	// check camera
            if (void 0 !== fcamera && !0 !== fcamera.isCamera)
                return void console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");
            if (!0 === g)
                return;
	// update "matrix world" if fscene.autoUpdate == true
            !0 === fscene.autoUpdate && fscene.updateMatrixWorld(),
	// update matrix world if something
            null === fcamera.parent && fcamera.updateMatrixWorld(),
            !0 === fscene.isScene && fscene.onBeforeRender(f, fscene, fcamera, w),
            d = lt.get(t, m.length),
            d.init(),
            m.push(d),
	// multiply projection matrix with inverse matrix world?
            V.multiplyMatrices(fcamera.projectionMatrix, fcamera.matrixWorldInverse),
            vfrustum.setFromProjectionMatrix(V),
            k = this.localClippingEnabled,
	// clipping planes?
            F = ct.init(this.clippingPlanes, k, fcamera),
            u = ot.get(fscene, p.length),
            u.init(),
            p.push(u),
	// sort objects?
            render_step1(fscene, fcamera, 0, f.sortObjects),
            u.finish(),
	// sort
            !0 === f.sortObjects && u.sort(D, N);
	// shadows
            !0 === F && ct.beginShadows();
            const i = d.state.shadowsArray;
	    ht.render(i, fscene, fcamera),
            !0 === F && ct.endShadows(),
            !0 === this.info.autoReset && this.info.reset(),
//            ut.render(u, fscene),
            d.setupLights(f.physicallyCorrectLights),

		d.setupLightsView(fcamera);

		u.opaque.length > 0 && gothrough(u.opaque, fscene, fcamera),
		u.transparent.length > 0 && gothrough(u.transparent, fscene, fcamera),



	//	Z.buffers.depth.setTest(!0),
	//	Z.buffers.depth.setMask(!0),
	//	Z.buffers.color.setMask(!0),
	//	Z.setPolygonOffset(!1)

            !0 === t.isScene && t.onAfterRender(f, fscene, fcamera),
            gt.resetDefaultState(),
            T = -1,
            A = null,
            m.pop(),
            d = m.length > 0 ? m[m.length - 1] : null,
            p.pop(),
            u = p.length > 0 ? p[p.length - 1] : null
        }
        ,
        this.getActiveMipmapLevel = function() {
            return y
        }
        ,
        this.getRenderTarget = function() {
            return w
        }
        ,
        this.initTexture = function(t) {
            t.isCubeTexture ? $.setTextureCube(t, 0) : t.isData3DTexture ? $.setTexture3D(t, 0) : t.isDataArrayTexture ? $.setTexture2DArray(t, 0) : $.setTexture2D(t, 0),
            Z.unbindTexture()
        }
        ,
        this.resetState = function() {
            _ = 0,
            y = 0,
            w = null,
            Z.reset(),
            gt.reset()
        }
        ,
        "undefined" != typeof __THREE_DEVTOOLS__ && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{
            detail: this
        }))
    }

// WEBGL1RENDERER
class Zs extends Ys
{
}
Zs.prototype.isWebGL1Renderer = !0;

// FOG
class Ks
{
        constructor(t, e=1, i=1e3)
	{
            this.isFog = !0,
            this.color = new THREE.Color(t),
            this.near = e,
            this.far = i
        }
}

// SCENE
class $s extends ni
{
        constructor()
	{
            super(),
            this.isScene = !0,
            this.background = null,
            this.environment = null,
            this.fog = null,
            this.overrideMaterial = null,
            this.autoUpdate = !0,
            "undefined" != typeof __THREE_DEVTOOLS__ && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{
                detail: this
            }))
        }
}

// INTERLEAVEDBUFFER
    class Qs {
        constructor(t, e) {
            this.isInterleavedBuffer = !0,
            this.array = t,
            this.stride = e,
            this.count = void 0 !== t ? t.length / e : 0,
            this.usage = 35044,
            this.updateRange = {
                offset: 0,
                count: -1
            },
            this.version = 0,
            this.uuid = _t()
        }
        onUploadCallback() {}
        set needsUpdate(t) {
            !0 === t && this.version++
        }
    }

// INTERLEAVEDBUFFERATTRIBUTE
    class ea {
        constructor(t, e, i, n=!1) {
            this.isInterleavedBufferAttribute = !0,
            this.name = "",
            this.data = t,
            this.itemSize = e,
            this.offset = i,
            this.normalized = !0 === n
        }
    }

// SPRITEMATERIAL
    class ia extends gi {
        constructor(t) {
            super(),
            this.isSpriteMaterial = !0,
            this.type = "SpriteMaterial",
            this.color = new THREE.Color(16777215),
            this.map = null,
            this.alphaMap = null,
            this.rotation = 0,
            this.sizeAttenuation = !0,
            this.transparent = !0,
            this.fog = !0,
            this.setValues(t)
        }
    }

    let tbuffergeometry;

// SPRITE
t.Sprite = class extends ni
{
        constructor(t)
	{
            if (super(),
            this.isSprite = !0,
            this.type = "Sprite",
            void 0 === tbuffergeometry)
	    {
                tbuffergeometry = new THREE.BufferGeometry;
                const t = new Float32Array([-.5, -.5, 0, 0, 0, .5, -.5, 0, 1, 0, .5, .5, 0, 1, 1, -.5, .5, 0, 0, 1])
                  , e = new Qs(t,5);
                tbuffergeometry.setIndex([0, 1, 2, 0, 2, 3]),
                tbuffergeometry.setAttribute("position", new ea(e,3,0,!1)),
                tbuffergeometry.setAttribute("uv", new ea(e,2,3,!1))
            }
            this.geometry = tbuffergeometry,
            this.material = void 0 !== t ? t : new ia,
            this.center = new Et(.5,.5)
        }
}

// POINTSMATERIAL
    class Za extends gi {
        constructor(t) {
            super(),
            this.isPointsMaterial = !0,
            this.type = "PointsMaterial",
            this.color = new THREE.Color(16777215),
            this.map = null,
            this.alphaMap = null,
            this.size = 1,
            this.sizeAttenuation = !0,
            this.fog = !0,
            this.setValues(t)
        }
    }

// POINTS
    class to extends ni {
        constructor(t=new Pi, e=new Za) {
            super(),
            this.isPoints = !0,
            this.type = "Points",
            this.geometry = t,
            this.material = e
        //    this.updateMorphTargets()
        }
    }

// CYLINDERGEOMETRY
    class Lo extends t.BufferGeometry {
        constructor(t=1, e=1, i=1, n=8, r=1, s=!1, a=0, o=2 * Math.PI) {
            super(),
            this.type = "CylinderGeometry",
            this.parameters = {
                radiusTop: t,
                radiusBottom: e,
                height: i,
                radialSegments: n,
                heightSegments: r,
                openEnded: s,
                thetaStart: a,
                thetaLength: o
            };
            const l = this;
            n = Math.floor(n),
            r = Math.floor(r);
            const c = []
              , h = []
              , u = []
              , d = [];
            let p = 0;
            const m = []
              , f = i / 2;
            let g = 0;
            function v(i) {
                const r = p
                  , s = new Et
                  , m = new ee;
                let v = 0;
                const x = !0 === i ? t : e
                  , _ = !0 === i ? 1 : -1;
                for (let t = 1; t <= n; t++)
                    h.push(0, f * _, 0),
                    u.push(0, _, 0),
                    d.push(.5, .5),
                    p++;
                const y = p;
                for (let t = 0; t <= n; t++) {
                    const e = t / n * o + a
                      , i = Math.cos(e)
                      , r = Math.sin(e);
                    m.x = x * r,
                    m.y = f * _,
                    m.z = x * i,
                    h.push(m.x, m.y, m.z),
                    u.push(0, _, 0),
                    s.x = .5 * i + .5,
                    s.y = .5 * r * _ + .5,
                    d.push(s.x, s.y),
                    p++
                }
                for (let t = 0; t < n; t++) {
                    const e = r + t
                      , n = y + t;
                    !0 === i ? c.push(n, n + 1, e) : c.push(n + 1, n, e),
                    v += 3
                }
                l.addGroup(g, v, !0 === i ? 1 : 2),
                g += v
            }
            !function() {
                const s = new ee
                  , v = new ee;
                let x = 0;
                const _ = (e - t) / i;
                for (let l = 0; l <= r; l++) {
                    const c = []
                      , g = l / r
                      , x = g * (e - t) + t;
                    for (let t = 0; t <= n; t++) {
                        const e = t / n
                          , r = e * o + a
                          , l = Math.sin(r)
                          , m = Math.cos(r);
                        v.x = x * l,
                        v.y = -g * i + f,
                        v.z = x * m,
                        h.push(v.x, v.y, v.z),
                        s.set(l, _, m).normalize(),
                        u.push(s.x, s.y, s.z),
                        d.push(e, 1 - g),
                        c.push(p++)
                    }
                    m.push(c)
                }
                for (let t = 0; t < n; t++)
                    for (let e = 0; e < r; e++) {
                        const i = m[e][t]
                          , n = m[e + 1][t]
                          , r = m[e + 1][t + 1]
                          , s = m[e][t + 1];
                        c.push(i, n, s),
                        c.push(n, r, s),
                        x += 6
                    }
                l.addGroup(g, x, 0),
                g += x
            }(),
            !1 === s && (t > 0 && v(!0),
            e > 0 && v(!1)),
            this.setIndex(c),
            this.setAttribute("position", new wi(h,3)),
            this.setAttribute("normal", new wi(u,3)),
            this.setAttribute("uv", new wi(d,2))
        }
    }

// SPHEREGEOMETRY
    class _l extends t.BufferGeometry {
        constructor(t=1, e=32, i=16, n=0, r=2 * Math.PI, s=0, a=Math.PI) {
            super(),
            this.type = "SphereGeometry",
            this.parameters = {
                radius: t,
                widthSegments: e,
                heightSegments: i,
                phiStart: n,
                phiLength: r,
                thetaStart: s,
                thetaLength: a
            },
            e = Math.max(3, Math.floor(e)),
            i = Math.max(2, Math.floor(i));
            const o = Math.min(s + a, Math.PI);
            let l = 0;
            const c = []
              , h = new ee
              , u = new ee
              , d = []
              , p = []
              , m = []
              , f = [];
            for (let d = 0; d <= i; d++) {
                const g = []
                  , v = d / i;
                let x = 0;
                0 == d && 0 == s ? x = .5 / e : d == i && o == Math.PI && (x = -.5 / e);
                for (let i = 0; i <= e; i++) {
                    const o = i / e;
                    h.x = -t * Math.cos(n + o * r) * Math.sin(s + v * a),
                    h.y = t * Math.cos(s + v * a),
                    h.z = t * Math.sin(n + o * r) * Math.sin(s + v * a),
                    p.push(h.x, h.y, h.z),
                    u.copy(h).normalize(),
                    m.push(u.x, u.y, u.z),
                    f.push(o + x, 1 - v),
                    g.push(l++)
                }
                c.push(g)
            }
            for (let t = 0; t < i; t++)
                for (let n = 0; n < e; n++) {
                    const e = c[t][n + 1]
                      , r = c[t][n]
                      , a = c[t + 1][n]
                      , l = c[t + 1][n + 1];
                    (0 !== t || s > 0) && d.push(e, r, l),
                    (t !== i - 1 || o < Math.PI) && d.push(r, a, l)
                }
            this.setIndex(d),
            this.setAttribute("position", new wi(p,3)),
            this.setAttribute("normal", new wi(m,3)),
            this.setAttribute("uv", new wi(f,2))
        }
    }

// MESHPHONGMATERIAL
    class Pl extends gi {
        constructor(t) {
            super(),
            this.isMeshPhongMaterial = !0,
            this.type = "MeshPhongMaterial",
            this.color = new THREE.Color(16777215),
            this.specular = new THREE.Color(1118481),
            this.shininess = 30,
            this.map = null,
            this.lightMap = null,
            this.lightMapIntensity = 1,
            this.aoMap = null,
            this.aoMapIntensity = 1,
            this.emissive = new THREE.Color(0),
            this.emissiveIntensity = 1,
            this.emissiveMap = null,
            this.bumpMap = null,
            this.bumpScale = 1,
            this.normalMap = null,
            this.normalMapType = 0,
            this.normalScale = new Et(1,1),
            this.displacementMap = null,
            this.displacementScale = 1,
            this.displacementBias = 0,
            this.specularMap = null,
            this.alphaMap = null,
            this.envMap = null,
            this.combine = 0,
            this.reflectivity = 1,
            this.refractionRatio = .98,
            this.wireframe = !1,
            this.wireframeLinewidth = 1,
            this.wireframeLinecap = "round",
            this.wireframeLinejoin = "round",
            this.flatShading = !1,
            this.fog = !0,
            this.setValues(t)
        }
    }

// MESHLAMBERTMATERIAL
    class Nl extends gi {
        constructor(t) {
            super(),
            this.isMeshLambertMaterial = !0,
            this.type = "MeshLambertMaterial",
            this.color = new THREE.Color(16777215),
            this.map = null,
            this.lightMap = null,
            this.lightMapIntensity = 1,
            this.aoMap = null,
            this.aoMapIntensity = 1,
            this.emissive = new THREE.Color(0),
            this.emissiveIntensity = 1,
            this.emissiveMap = null,
            this.bumpMap = null,
            this.bumpScale = 1,
            this.normalMap = null,
            this.normalMapType = 0,
            this.normalScale = new Et(1,1),
            this.displacementMap = null,
            this.displacementScale = 1,
            this.displacementBias = 0,
            this.specularMap = null,
            this.alphaMap = null,
            this.envMap = null,
            this.combine = 0,
            this.reflectivity = 1,
            this.refractionRatio = .98,
            this.wireframe = !1,
            this.wireframeLinewidth = 1,
            this.wireframeLinecap = "round",
            this.wireframeLinejoin = "round",
            this.flatShading = !1,
            this.fog = !0,
            this.setValues(t)
        }
    }

// files?
    const rc = {
        enabled: !1,
        files: {},
        add: function(t, e) {
            !1 !== this.enabled && (this.files[t] = e)
        },
        get: function(t) {
            if (!1 !== this.enabled)
                return this.files[t]
        },
        remove: function(t) {
            delete this.files[t]
        },
        clear: function() {
            this.files = {}
        }
    };

// LOADINGMANAGER
    class sc {
        constructor(t, e, i) {
            const n = this;
            let r, s = !1, a = 0, o = 0;
            const l = [];
            this.onStart = void 0,
            this.onLoad = t,
            this.onProgress = e,
            this.onError = i,
            this.itemStart = function(t) {
                o++,
                !1 === s && void 0 !== n.onStart && n.onStart(t, a, o),
                s = !0
            }
            ,
            this.itemEnd = function(t) {
                a++,
                void 0 !== n.onProgress && n.onProgress(t, a, o),
                a === o && (s = !1,
                void 0 !== n.onLoad && n.onLoad())
            }
            ,
            this.itemError = function(t) {
                void 0 !== n.onError && n.onError(t)
            }
            ,
            this.resolveURL = function(t) {
                return r ? r(t) : t
            }
            ,
            this.setURLModifier = function(t) {
                return r = t,
                this
            }
            ,
            this.addHandler = function(t, e) {
                return l.push(t, e),
                this
            }
            ,
            this.removeHandler = function(t) {
                const e = l.indexOf(t);
                return -1 !== e && l.splice(e, 2),
                this
            }
            ,
            this.getHandler = function(t) {
                for (let e = 0, i = l.length; e < i; e += 2) {
                    const i = l[e]
                      , n = l[e + 1];
                    if (i.global && (i.lastIndex = 0),
                    i.test(t))
                        return n
                }
                return null
            }
        }
    }

const tloadingmanager = new sc;

// LOADER
t.Loader = class
{
	constructor(t)
	{
		this.manager = void 0 !== t ? t : tloadingmanager,
		this.crossOrigin = "anonymous",
		this.withCredentials = !1,
		this.path = "",
		this.resourcePath = "",
		this.requestHeader = {}
	}
}

// IMAGELOADER
class uc extends t.Loader
{
        constructor(t)
	{
            super(t)
        }
        load(t, e, i, n)
	{
            void 0 !== this.path && (t = this.path + t),
            t = this.manager.resolveURL(t);
            const r = this
              , s = rc.get(t);
            if (void 0 !== s)
                return r.manager.itemStart(t),
                setTimeout((function() {
                    e && e(s),
                    r.manager.itemEnd(t)
                }
                ), 0),
                s;
            const a = document.createElement("img");
            function o()
	    {
                c(),
                rc.add(t, this),
                e && e(this),
                r.manager.itemEnd(t)
            }
            function l(e)
	    {
                c(),
                n && n(e),
                r.manager.itemError(t),
                r.manager.itemEnd(t)
            }
            function c()
	    {
                a.removeEventListener("load", o, !1),
                a.removeEventListener("error", l, !1)
            }
            return a.addEventListener("load", o, !1),
            a.addEventListener("error", l, !1),
            "data:" !== t.slice(0, 5) && void 0 !== this.crossOrigin && (a.crossOrigin = this.crossOrigin),
            r.manager.itemStart(t),
            a.src = t,
            a
        }
}

// LIGHT
    class dc extends ni {
        constructor(t, e=1) {
            super(),
            this.isLight = !0,
            this.type = "Light",
            this.color = new THREE.Color(t),
            this.intensity = e
        }
    }

// SPOTLIGHT
    class _c extends dc {
        constructor(t, e, i=0, n=Math.PI / 3, r=0, s=1) {
            super(t, e),
            this.isSpotLight = !0,
            this.type = "SpotLight",
            this.position.copy(ni.DefaultUp),
            this.updateMatrix(),
            this.target = new ni,
            this.distance = i,
            this.angle = n,
            this.penumbra = r,
            this.decay = s;
        }
    }

// POINTLIGHT
    class Sc extends dc {
        constructor(t, e, i=0, n=1) {
            super(t, e),
            this.isPointLight = !0,
            this.type = "PointLight",
            this.distance = i,
            this.decay = n;
        }
    }

// DIRECTIONALLIGHT
    class Ac extends dc {
        constructor(t, e) {
            super(t, e),
            this.isDirectionalLight = !0,
            this.type = "DirectionalLight",
            this.position.copy(ni.DefaultUp),
            this.updateMatrix(),
            this.target = new ni;
        }
    }

// AMBIENTLIGHT
    t.AmbientLight = class extends dc {
        constructor(t, e) {
            super(t, e),
            this.isAmbientLight = !0,
            this.type = "AmbientLight"
        }
    }

// UNIFORM
    class hh {
        constructor(t) {
            this.value = t
        }
    }

// NAMN
    t.FrontSide = 0,
    t.BackSide = 1,
    t.DoubleSide = 2,

    t.Box3 = re,
//    t.BoxGeometry = Ki,
    t.BufferAttribute = yi,
//    t.BufferGeometry = Pi,
    t.CylinderGeometry = Lo,
    t.DefaultLoadingManager = tloadingmanager,
    t.DirectionalLight = Ac,
    t.Euler = Ve,
    t.EventDispatcher = mt,
    t.Float16BufferAttribute = class extends yi {
        constructor(t, e, i) {
            super(new Uint16Array(t), e, i),
            this.isFloat16BufferAttribute = !0
        }
    }
    ,
    t.Float32BufferAttribute = wi,
    t.Float64BufferAttribute = class extends yi {
        constructor(t, e, i) {
            super(new Float64Array(t), e, i)
        }
    }
    ,
    t.Fog = Ks,
    t.Frustum = fn,
    t.GLBufferAttribute = class {
        constructor(t, e, i, n, r) {
            this.isGLBufferAttribute = !0,
            this.buffer = t,
            this.type = e,
            this.itemSize = i,
            this.elementSize = n,
            this.count = r,
            this.version = 0
        }
        set needsUpdate(t) {
            !0 === t && this.version++
        }
        setBuffer(t) {
            return this.buffer = t,
            this
        }
    }
    ,
    t.ImageLoader = uc,
    t.Int16BufferAttribute = class extends yi {
        constructor(t, e, i) {
            super(new Int16Array(t), e, i)
        }
    }
    ,
    t.Int32BufferAttribute = class extends yi {
        constructor(t, e, i) {
            super(new Int32Array(t), e, i)
        }
    }
    ,
    t.Int8BufferAttribute = class extends yi {
        constructor(t, e, i) {
            super(new Int8Array(t), e, i)
        }
    }
    ,
    t.InterleavedBuffer = Qs,
    t.InterleavedBufferAttribute = ea,
    t.Light = dc,
    t.LoadingManager = sc,
    t.Material = gi,
    t.Matrix3 = Ct,
    t.Matrix4 = Ie,
    t.Mesh = Zi,
    t.MeshBasicMaterial = vi,
    t.MeshLambertMaterial = Nl,
    t.MeshPhongMaterial = Pl,
    t.MirroredRepeatWrapping = u,
    t.Object3D = ni,
    t.PerspectiveCamera = rn,
    t.Plane = dn,
    t.PlaneGeometry = xn,
    t.PointLight = Sc,
    t.Points = to,
    t.PointsMaterial = Za,
    t.Quaternion = te,
    t.RepeatWrapping = c,
    t.Scene = $s,
    t.ShaderLib = Mn,
    t.ShaderMaterial = en,
    t.Source = qt,
    t.Sphere = we,
    t.SphereGeometry = _l,
    t.SpotLight = _c,
//    t.Sprite = ga,
    t.SpriteMaterial = ia,
    t.Texture = Zt,

t.TextureLoader = class extends t.Loader
{
        constructor(t)
	{
            super(t)
        }
        load(t, e, i, n)
	{
            const r = new Zt;
            const s = new uc(this.manager);

            return s.crossOrigin = this.crossOrigin,
            s.path = this.path,
            s.load(t, (function(t)
	    {
                r.image = t,
                r.needsUpdate = !0,
                void 0 !== e && e(r)
            }
            ), i, n),
            r
        }
}
    ,
    t.Uint16BufferAttribute = Mi,
    t.Uint32BufferAttribute = bi,
    t.Uniform = hh,
    t.UniformsLib = yn,
    t.Vector2 = Et,
    t.Vector3 = ee,
    t.WebGL1Renderer = Zs,
    t.WebGLRenderer = Ys,
    t.WebGLUtils = Fs

}
));
