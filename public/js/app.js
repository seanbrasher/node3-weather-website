const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const weatherIconImageTag = document.querySelector('#weatherIconImage');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault(); //don't reload the page

    const location = encodeURIComponent(search.value);
    
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch('/weather?address=' + location).then((response) => {
        //fetch this and then run this function
        response.json().then((data) =>{

            if(data.error) {                
                messageOne.textContent = data.error;
                return;
            }

            messageOne.textContent = 'Location: ' + data.location;
            messageTwo.textContent = 'Weather: ' + data.forecast + ' with temperature of ' + data.temperature ;
            weatherIconImageTag.src = data.weatherIcon;
        })
    })

})