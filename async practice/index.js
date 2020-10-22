let count = 1;
if(count === 1) {
	shuffle();
}

let response;

function shuffle() {
	let xhr = new XMLHttpRequest();

	xhr.open('GET', 'https://deckofcardsapi.com/api/deck/new/shuffle');

	xhr.onload = function() {
		if(xhr.status === 200) {
			res = JSON.parse(xhr.response);
			response = res;
			
			const buttonElem = document.body.querySelector('button');
			buttonElem.addEventListener('click', function() {
				getDeck(response, handleResponse, displayCard);
			});
		} else {
			console.log('Error: ', xhr.status);
		}
	}

	xhr.onerror = function() {
		console.log('Network Error');
		console.log('Error:', xhr);
	}

	xhr.onprogress = function(event) {
		if(event.lengthComputable) {
			console.log('Loaded: %s Total: %s', event.loaded, event.total);
		} else {
			console.log('Loaded: ', event.loaded);
		}
	}

	xhr.send();
}

function getDeck(res, handleRes, display) {
	handleRes(res.deck_id, display);
}


function handleResponse(deck_id, display) {
	const url = `https://deckofcardsapi.com/api/deck/${deck_id}/draw/`;
	let xhr = new XMLHttpRequest();
	
	xhr.open('GET', url);
	xhr.onload = function() {
		if(xhr.status === 200) {
			display(JSON.parse(xhr.response), JSON.parse(xhr.response).remaining);
		} else {
			console.log('Error: ', xhr.status);
		}
	}
	
	xhr.onerror = function() {
		console.log('Network Error');
	}
	
	xhr.onprogress = function(event) {
		if(event.lengthComputable) {
			console.log('Loaded: %s Total: %s', event.loaded, event.total);
		} else {
			console.log('Loaded: %s', event.loaded);
		}
	}
	
	xhr.send();
}


function displayCard(res, remaining) {
	let min=-30;
	let max=50;
	let rand = Math.ceil(Math.random() * max) + min;
	
	if(remaining !== 0) {
		imgUrl = res.cards[0].image;
	
		const script = document.body.querySelector('script');
		const imgElem = document.createElement('img');
		imgElem.setAttribute('src', imgUrl);
		imgElem.setAttribute('alt', 'cards');
		imgElem.setAttribute('class', 'cards');
		
		imgElem.style.setProperty('--rotation', `${rand}deg`)
	
		document.body.insertBefore(imgElem, script);
	} else {
		document.body.querySelector('button').setAttribute('disabled', true);
	}
}