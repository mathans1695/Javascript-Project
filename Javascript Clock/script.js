const secondHand = document.getElementsByClassName('second-hand');
const hourHand = document.getElementsByClassName('hour-hand');
const minuteHand = document.getElementsByClassName('minute-hand');

function setDate() {
  const now = new Date();
  let seconds = (now.getSeconds() / 60) * 360,
      minutes = (now.getMinutes() / 60) * 360,
      hours = now.getHours();

  if (hours > 12) {
    hours -= 12;
  }

  hoursAngle = (hours / 12) * 360;
  
  secondHand[0].style.transform = `rotate(${seconds}deg)`;
  minuteHand[0].style.transform = `rotate(${minutes}deg)`;
  hourHand[0].style.transform = `rotate(${hoursAngle}deg)`;
}


setInterval(setDate, 1000);