console.log("This is the client side javascript");

// fetch() function is a browser based API, that allows one to fetch information, JSON from a URL and display on the client side.

//Select the HTML elements from the web page. To get their values.
const weatherForm = document.querySelector('form'); 
const search = document.querySelector('input'); 
let messageOne = document.querySelector('#message-1');
let messageTwo = document.querySelector('#message-2');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Stop the weather web page from refreshing.
    const location = search.value;
    
    messageOne.textContent = 'Loading....'
    messageTwo.textContent = " "

    fetch('http://localhost:3000/weather?address=' + encodeURIComponent(location)).then((response) => {
        response.json().then((forecastData) => {
            if(forecastData.error){
                messageOne.textContent = forecastData.error;
            }else{
                messageOne.textContent = forecastData.location;
                messageTwo.textContent = forecastData.forecast;
            }
        })
   })

})