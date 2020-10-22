document.querySelector('input').addEventListener('keyup', getData);

function getData(e) {
  if(e.target.value !== '') {
    const obj = new Github();
    const ui = new UI();

    const data = obj.getData(e.target.value, 
    function(data, status) {
      if(status === 200) {ui.displayProfile(data);}
      else {ui.error();}
    }, 
    function(data, status) {
      if(status === 200) {ui.displayRepo(data);}
      else {ui.error();}
    });

  } else {
    document.querySelector('.profile').style = 'display: none';
    document.querySelector('.profile').innerHTML = '';
  }
}