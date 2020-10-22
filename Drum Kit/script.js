const pressedKey = document.addEventListener('keyup', playAudio);
const keys = document.getElementsByClassName('key-des');


function playAudio(e) {
	if (e.key.toLowerCase() === 'a') {
		helper(0);
	} else if (e.key.toLowerCase() === 's') {
		helper(1);
	} else if (e.key.toLowerCase() === 'd') {
		helper(2);
	} else if (e.key.toLowerCase() === 'f') {
		helper(3);
	} else if (e.key.toLowerCase() === 'g') {
		helper(4);
	} else if (e.key.toLowerCase() === 'h') {
		helper(5);
	} else if (e.key.toLowerCase() === 'j') {
		helper(6);
	} else if (e.key.toLowerCase() === 'k') {
		helper(7);
	} else if (e.key.toLowerCase() === 'l') {
		helper(8);
	}
}

function helper(index) {
	const parentElem = keys[index];
	const audio = parentElem.querySelector('audio');
	
	parentElem.className += ' playing';
	audio.play();
	
	setTimeout(function() {
		parentElem.classList.remove('playing');
	}, 400);
}