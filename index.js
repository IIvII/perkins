var Perkins = require('perkins');

var perkins = new Perkins({
    element : document.body,
    keyCodes : [32,65,90,69,73,79,80],
    onCharacter : function(perkinsEvent) {
	document.getElementById('braille').innerHTML = perkinsEvent.key;
    }
}).listen()
