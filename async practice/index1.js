let xhr = new XMLHttpRequest();

xhr.open('POST', 'https://api.random.org/json-rpc/1/invoke');

xhr.onload = function() {
	console.log(xhr.response);
}

xhr.send(JSON.stringify({
	'method': 'getIntegers'  
}));