(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Perkins = require('perkins');

var perkins = new Perkins({
    element: document.body,
    keyCodes: [32, 65, 90, 69, 73, 79, 80],
    onCharacter: function (perkinsEvent) {
        document.getElementById('braille').innerHTML = perkinsEvent.key;
    }
}).listen();

},{"perkins":2}],2:[function(require,module,exports){
function Perkins(options){
    this._keyCodes = options.keyCodes;
    this._element = options.element;
    this._onCharacter = options.onCharacter;
    this._states = {};
    this._keyDownBinded = this._down.bind(this);
    this._keyUpBinded = this._up.bind(this);
    return this;
}
// states :
// 0 : perkins key unused
// 1 : perkins dot used
// 2 : perkins dot down
Perkins.prototype._initStates = function(){
    this._keyCodes.map((function(kc){this._states[kc] = 0}).bind(this));
}
Perkins.prototype._nKeyDown = function(){
    var total = 0;
    this._keyCodes.forEach((function(kc){
	if (this._states[kc] == 2) total++;
    }).bind(this));
    return total;
}
Perkins.prototype._currentUnicodeChar = function(){	
    var total = 0x2800;
    this._keyCodes.forEach((function(kc,idx){
	if (this._states[kc] >= 1) total += Math.pow(2,idx-1);
    }).bind(this));
    return total;
}
Perkins.prototype._mkEvent = function(){
    var unicodeNum = this._currentUnicodeChar();
    return {
	code : unicodeNum,
	key : String.fromCharCode(unicodeNum),
	states : this._states
    }
}
Perkins.prototype._changeState = function(keyCode,value){
    this._states[keyCode] = value;
    var totalDown = this._nKeyDown();
    if (totalDown == 0){
	this._onCharacter(this._mkEvent());
	this._initStates();
    }
}
Perkins.prototype._down = function(event){
    event = event || window.event;
    var keyCode = event.keyCode || event.code;
    if (!(this._states[keyCode] === undefined)){
	if (this._states[keyCode] != 2){
	    this._changeState(keyCode,2);
	}
	event.preventDefault();
    }
}
Perkins.prototype._up = function(event){
    event = event || window.event;
    var keyCode = event.keyCode || event.code;
    if (!(this._states[keyCode] === undefined)){
	if ((this._states[keyCode]) == 2){
	    this._changeState(keyCode,1);
	}
	event.preventDefault();
    }
}
Perkins.prototype.keyInUse = function(key){
    return !(this._states[key] === undefined);
}
Perkins.prototype.listen = function(onNewChar){
    this._initStates();
    this._element.addEventListener("keydown",this._keyDownBinded, false);
    this._element.addEventListener("keyup",this._keyUpBinded , false);
    return this;
}
Perkins.prototype.unListen = function(){
    this._element.removeEventListener("keydown", this._keyDownBinded , false);
    this._element.removeEventListener("keyup", this._keyUpBinded, false);
    return this;
}
module.exports = Perkins;

},{}]},{},[1]);
