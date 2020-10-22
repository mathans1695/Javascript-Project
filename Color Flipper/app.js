let arrOfColor = ['red', 'green', 'blue', 'yellow', 'orange'];
let count = 0;
let spanElem = document.body.querySelector('.display_color_random');
let buttonElem = document.querySelector('.button');

document.addEventListener('DOMContentLoaded', function(e) {
  spanElem.innerHTML = arrOfColor[count].toUpperCase();
  spanElem.style.color = arrOfColor[count];

  document.body.style.backgroundColor = arrOfColor[count].toUpperCase();

  buttonElem.style.backgroundColor = arrOfColor[count];
  buttonElem.addEventListener('click', changeBackgroundColor);

  count++;
});


function changeBackgroundColor(e) {
  if(count === arrOfColor.length) {
    count = 0;
  } else {
    spanElem.innerHTML = arrOfColor[count].toUpperCase();
    spanElem.style.color = arrOfColor[count];

    document.body.style.backgroundColor = arrOfColor[count];

    buttonElem.style.backgroundColor = arrOfColor[count];
    count++;
  }
}