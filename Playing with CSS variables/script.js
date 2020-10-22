const imgElem = document.querySelector('.propImg');
const inpElems = document.querySelectorAll('input');

inpElems[0].addEventListener('input', function(e) {
	imgElem.style.setProperty('--xPos', `${e.target.value}px`);
	imgElem.style.setProperty('--yPos', `${e.target.value}px`);
});

inpElems[1].addEventListener('input', function(e) {
	imgElem.style.setProperty('--blur', `${e.target.value}px`);
});

inpElems[2].addEventListener('input', function(e) {
	imgElem.style.setProperty('--propImgBorderColor', e.target.value);
});