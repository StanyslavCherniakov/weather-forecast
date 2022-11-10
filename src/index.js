import axios from 'axios';
import { throttle } from 'throttle-debounce';
import { debounce } from 'throttle-debounce';
import cities from './partials/ua.json';

const LSKEY = 'recent-cities';
const inputRef = document.querySelector('input');
const datalistRef = document.querySelector('#city');
const getBtn = document.querySelector('.get-weather');
const contentRef = document.querySelector('.content');
const btnList = document.querySelector('.btn-list');

const citiesData = {
  cities: [],
};

makeMarkUp(cities);

getBtn.addEventListener('click', onClick);
btnList.addEventListener('click', onBtnClick);

function onBtnClick(e) {
  if (!e.target.classList.contains('btn')) {
    return;
  }
  inputRef.value = e.target.textContent;
}

async function onClick() {
  const response = await getWeather(inputRef.value);
  console.log(response.data);
  makeWeatherMarkUp(response.data, inputRef.value);
  citiesData.cities.push(inputRef.value);
  console.log(citiesData);
  localStorage.setItem(LSKEY, JSON.stringify(citiesData));

  inputRef.value = '';
}
addRecentCities();

async function getWeather(city) {
  const coords = await axios.get(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=4e61d42aff974cc17d2ce0b25137b2df`
  );
  const countryUa = coords.data.filter(el => el.country === 'UA');
  const lat = countryUa[0].lat;
  const lon = countryUa[0].lon;
  const weather = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=4e61d42aff974cc17d2ce0b25137b2df&units=metric`
  );
  return weather;
}

function makeMarkUp(data) {
  const markUp = data
    .map(el => `<option value='${el.city}'></option>`)
    .join('');
  datalistRef.insertAdjacentHTML('beforeend', markUp);
}

function makeWeatherMarkUp(data, loc) {
  const date = new Date();
  const localDate = date.toLocaleTimeString();
  const weatherMarkUp = `<div class="wrap">
        <p class="location">Ukraine, ${loc}</p>
        <p class="temp">${data.main.temp} &#8451;</p>
        <p class="descr">${data.weather[0].description}</p>
        <p class="upd-time">Updated in ${localDate}</p>
       </div>
       <ul class="list">
        <li class="list__item">feels_like</li>
        <li class="list__item">wind</li>
        <li class="list__item">visibility</li>
      </ul>`;

  console.log(weatherMarkUp);

  contentRef.insertAdjacentHTML('beforeend', weatherMarkUp);
}

function addRecentCities() {
  const dataFromLs = localStorage.getItem(LSKEY);
  const citiesFromLs = JSON.parse(dataFromLs);
  citiesData.cities = citiesFromLs.cities;

  const markUpBtn = citiesData.cities
    .slice(-4)
    .map(el => `<li class="btn">${el}</li>`)
    .join('');
  console.log(markUpBtn);
  btnList.insertAdjacentHTML('beforeend', markUpBtn);
}
