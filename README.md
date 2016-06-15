# Perkins

6/8 dots [Perkins Brailler](https://en.wikipedia.org/wiki/Perkins_Brailler) for browsers.

## Usage

Create a Perkins Objet with given standard keyboard keys associated with a dom element 

	var perkins = new Perkins({
		
		// dom element receiving standard keyboard events 
		element : myTextArea,
		
		// keycode for dot1 dot2 dot3 dot4 dot5 dot6 
		keyCodes : [32,65,90,69,73,79,80],

	    // => handler for output braille character <=
		onCharacter : function(perkinsEvent) {
			console.log('braille character',perkinsEvent.key);
		}
			
	}).listen();

Remove the listener

	perkins.unlisten();

Check if given key is used by a Perkins object

	perkins.keyInUse(32);
	// returns true

