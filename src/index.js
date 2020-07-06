require("babel-polyfill");

import Chart from 'chart.js';
import Markets from './markets';

// DOM Elements
const form = document.querySelector('form');
const coinInput = document.getElementById('coinInput');
const container = document.querySelector('.container-fluid');
const chartWrapper = document.getElementById('chartJS');
const notFound = document.getElementById('notFound');

const top5 = document.getElementById('top5');


const market = new Markets;

const updateUI = (data) => {


    const marketArr = data.ticker.markets;
    const label = marketArr.map(market => {
        return market.market;
    });
    
    const marketPrice = marketArr.map(market => {
        return market.price;
    });
   
    
    cardBase.innerHTML = `
        <h3 class="mb-2">${data.ticker.base}</h3>
        <div class="mb-0">Base</div>
    `;

    
    cardPrice.innerHTML = `
        <h3 class="mb-2">${data.ticker.price}</h3>
        <div class="mb-0">Price</div>
    `;

    cardVolume.innerHTML = `
        <h3 class="mb-2">${data.ticker.volume}</h3>
        <div class="mb-0">Volume</div>
    `;

    cardChange.innerHTML = `
        <h3 class="mb-2">${data.ticker.change}</h3>
        <div class="mb-0">24 Change</div>
    `;

    addData(chart, label, marketPrice);

    // hide graph if marketArr length is 0
    if(marketArr.length === 0){
        chartWrapper.classList.add('d-none');
    } else {
        chartWrapper.classList.remove('d-none')
    }

    // show container
    if(container.classList.contains('d-none')){
        container.classList.remove('d-none');
    }
  
    if(!notFound.classList.contains('d-none')){
        notFound.classList.add('d-none');
    }
    
}


const updateTopExchanges = (data) => {

    top5.innerHTML ="";
    
    data.ticker.markets.forEach(market => {
        top5.innerHTML += `
            <div  class="media">
                <div class="media-body text-center">
                    <strong>${market.market}</strong>
                    <p class="text-muted mb-0 py-1">Price: <span class="px-2 text-info">${market.price}</span> Volume: <span class="px-2 text-info">${market.volume}</span></p>
                </div>
            </div>
            <hr>
        `;
        
    })
  
};

// input field validation 

coinInput.addEventListener('input', e => {

    if (coinInput.validity.patternMismatch) {
        coinInput.setCustomValidity("Please enter a cryptocurrency code. Example for Bitcoin enter BTC.  Not case senstive");
      } else {
        coinInput.setCustomValidity("");
      }

});

// form 
form.addEventListener('submit', e => {
     //prevent default
     e.preventDefault();  

     if(!coinInput.validity.valid) {
        // Then we prevent the form from being sent by canceling the event
        event.preventDefault();
      }
    
    // getting the coin typed into the form, trimming whitespace and making uppercase
    const coin = form.coin.value.trim().toUpperCase();
    form.reset();

    market.getCoin(coin)
        .then(data => {
            updateUI(data);
            return market.getCoin(coin);
        })
        .catch(pairNotFound)
        .then(data => updateTopExchanges(data))
        

})

const pairNotFound = () => {
    if(notFound.classList.contains('d-none')){
        notFound.classList.remove('d-none');
    } 
}; 

// chart

const addData = (chart, label, data) => {
    chart.data.labels = label;
    chart.data.datasets[0].label = "USD";
    chart.data.datasets[0].data = data;
    chart.update();
}

var ctx = document.getElementById('markets').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
        labels: [''],
        datasets: [{
            label: 'My First dataset',
            backgroundColor: 'rgba(238, 130, 238)',
            borderColor: 'rgba(238, 130, 23)',
            data: [],
        }]
    },

    // Configuration options go here
    options: {}
});

