//Submit Event Listener
document.querySelector('#loan-form').addEventListener('submit', displayLoading);

function displayLoading(e) {
  document.querySelector('#loading').style.display = 'block';

  document.querySelector('#results').style.display = 'none';

  setTimeout(function() {
    document.querySelector('#loading').style.display = 'none';

    calculateEMI();
  }, 3000);

  e.preventDefault();
}

function calculateEMI() {
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');

  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const totalIns = parseInt(years.value) * 12;
  const interestPM = parseFloat(interest.value) / 100 / totalIns;
  const monthly = (parseInt(amount.value) * interestPM + (parseInt(amount.value) / totalIns)).toFixed(2);

  const total = (monthly * totalIns).toFixed(2);
  const totalInt = (interestPM * totalIns * parseInt(amount.value)).toFixed(2);

  if(isFinite(monthly)) {
    monthlyPayment.value = monthly;
    totalPayment.value = total;
    totalInterest.value = totalInt;
    document.querySelector('#results').style.display = 'block';
  } else {
    displayError('Please enter a valid amount');
  }
}

function displayError(error){
  const err = document.createElement('div');

  err.className = 'alert alert-danger';

  err.appendChild(document.createTextNode(error));
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');
  card.insertBefore(err, heading);

  setTimeout(function() {
    err.remove();
  }, 3000);
}